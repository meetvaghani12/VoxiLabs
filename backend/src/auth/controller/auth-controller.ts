import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';
import { generateOTP, verifyOTP, storeOTP } from '../utils/login-utils';
import { sendVerificationEmail } from '../utils/mail';
import { generateToken, verifyToken } from "../utils/jwt"
import crypto from 'crypto';

import { 
  findUserByEmail, 
  createUser, 
  updateUser,
  createSession,
  deleteSession,
  createVerificationToken
} from '../db/user';

const prisma = new PrismaClient();

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { 
      firstName, 
      lastName, 
      email, 
      password, 
      phone,
    } = req.body;

    // Check if user already exists
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      res.status(400).json({ message: 'User already exists with this email' });
      return;
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Generate 2FA secret
    const twoFactorSecret = crypto.randomBytes(32).toString('hex');

    // Create user
    await createUser({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phone,
      twoFactorSecret,
    });

    // Generate and store OTP
    const otp = await generateOTP(email);
    await storeOTP(email, otp);

    // Send verification email with OTP
    await sendVerificationEmail(email, otp, firstName);

    res.status(201).json({
      message: 'User registered successfully. Please check your email for verification code.',
      email: email
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error during registration' });
  }
};

export const verifyEmail = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, otp } = req.body;

    // Verify OTP
    const isValid = await verifyOTP(email, otp);
    if (!isValid) {
      res.status(400).json({ message: 'Invalid verification code' });
      return;
    }

    // Update user's email verification status
    await updateUser(email, {
      emailVerified: new Date(),
    });

    res.status(200).json({ message: 'Email verified successfully' });
  } catch (error) {
    console.error('Email verification error:', error);
    res.status(500).json({ message: 'Server error during email verification' });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await findUserByEmail(email);
    if (!user) {
      res.status(400).json({ message: 'Invalid credentials' });
      return;
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(400).json({ message: 'Invalid credentials' });
      return;
    }

    // Check if email is verified
    if (!user.emailVerified) {
      // Generate and store OTP
      const otp = await generateOTP(email);
      await storeOTP(email, otp);
      
      // Send verification email with OTP
      await sendVerificationEmail(email, otp, user.firstName);
      
      res.status(400).json({ 
        message: 'Email not verified. A verification code has been sent to your email.',
        email: email
      });
      return;
    }

    // Create session and return token
    const token = generateToken({
      userId: user.id,  // Changed from id to userId
      email: user.email,
    });

    // Create session
    await createSession({
      sessionToken: token,
      userId: user.id,
      expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
    });

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        image: user.image,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
};

export const resendOTP = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email } = req.body;

    // Find user
    const user = await findUserByEmail(email);
    if (!user) {
      res.status(400).json({ message: 'User not found' });
      return;
    }

    // Generate new OTP
    const otp = await generateOTP(email);
    await storeOTP(email, otp);
    await sendVerificationEmail(email, otp, user.firstName);

    res.status(200).json({ message: 'OTP resent successfully' });
  } catch (error) {
    console.error('Resend OTP error:', error);
    res.status(500).json({ message: 'Server error while resending OTP' });
  }
};

export const verifyLoginOTP = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, otp } = req.body;

    // Find user
    const user = await findUserByEmail(email);
    if (!user) {
      res.status(400).json({ message: 'User not found' });
      return;
    }

    // Verify OTP
    const isValid = await verifyOTP(email, otp);
    if (!isValid) {
      res.status(400).json({ message: 'Invalid or expired OTP' });
      return;
    }

    // Generate JWT token
    const token = generateToken({
      userId: user.id,  // Changed from id to userId
      email: user.email,
    });

    // Create session
    await prisma.session.create({
      data: {
        sessionToken: token,
        userId: user.id,
        expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
      },
    });

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        image: user.image,
      },
    });
  } catch (error) {
    console.error('OTP verification error:', error);
    res.status(500).json({ message: 'Server error during OTP verification' });
  }
};

export const logout = async (req: Request, res: Response): Promise<void> => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (token) {
      await deleteSession(token);
    }
    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ message: 'Server error during logout' });
  }
};

export const forgotPassword = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email } = req.body;

    // Find user
    const user = await findUserByEmail(email);
    if (!user) {
      res.status(400).json({ message: 'User not found' });
      return;
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    await createVerificationToken({
      identifier: email,
      token: resetToken,
      expires: new Date(Date.now() + 1 * 60 * 60 * 1000), // 1 hour
    });
    
    // Send password reset email
    await sendVerificationEmail(email, resetToken, user.firstName, false, true);

    res.status(200).json({ message: 'Password reset instructions sent to your email' });
  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({ message: 'Server error during password reset request' });
  }
};

export const resetPassword = async (req: Request, res: Response): Promise<void> => {
  try {
    const { token, newPassword } = req.body;

    // Verify token
    const decoded = verifyToken(token);
    if (!decoded) {
      res.status(400).json({ message: 'Invalid or expired token' });
      return;
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update user password
    await updateUser(decoded.email, {
      password: hashedPassword,
    });

    res.status(200).json({ message: 'Password reset successful' });
  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({ message: 'Server error during password reset' });
  }
};

