# Chapter 3: OTP & Email Utilities

Welcome back to the VoxiLabs tutorial! In the [previous chapter](02_authentication_system_.md), we explored the VoxiLabs Authentication System, understanding how it helps users sign up, log in, and stay secure. We learned about hashing passwords, managing user sessions with JWTs, and even signing in with Google.

Now, let's zoom in on a crucial part of that authentication system: the **OTP & Email Utilities**. These are like the app's dedicated "post office" combined with a "secure temporary safe." They ensure that important digital messages and codes get delivered on time and securely.

## Why Do We Need OTP & Email Utilities?

Imagine you just signed up for VoxiLabs. To make sure it's *really* you and not someone faking your email, VoxiLabs needs to send a secret code to your email address that only *you* can access. This secret code is a **One-Time Password (OTP)**.

This is a central use case for our OTP & Email Utilities. They solve the problem of:
*   **Verifying Identity:** Sending a temporary, secret code (OTP) to confirm a user's email address or phone number.
*   **Security for Important Actions:** Like resetting a password or verifying a login attempt from a new device.
*   **Communicating with Users:** Sending general notifications or important updates.

Without these utilities, VoxiLabs wouldn't be able to confirm your identity securely, making the entire authentication process much weaker.

## Key Concepts of OTP & Email Utilities

Let's break down the core ideas behind these utilities:

1.  **What is an OTP?**
    *   An OTP stands for **One-Time Password**. It's a temporary numeric or alphanumeric code that is valid for a single login session or transaction, and for a very short period (e.g., 5-10 minutes).
    *   **Analogy:** Think of an OTP like a temporary key to a locked box. Once you use the key, or if it expires, it can't be used again. This makes it very secure because even if someone intercepts it, it quickly becomes useless.

2.  **Why Send Emails?**
    *   Emails are the primary way VoxiLabs delivers these OTPs and other important messages (like password reset links, account notifications).
    *   **Analogy:** This is our app's "post office." It handles the packaging (email content) and delivery (sending the email) of digital messages.

3.  **Why Redis for OTP Storage?**
    *   OTPs are **temporary** and need to be stored *very quickly* and *securely* for a short time. We don't want them in our main, slower database (like PostgreSQL) because they expire quickly and constantly change.
    *   **Redis** is a super-fast, in-memory database often used for temporary data like session tokens, caches, and yes, OTPs.
    *   **Analogy:** Redis is like a "secure, temporary safe" that automatically self-destructs its contents after a set time. It's perfect for holding OTPs, which are designed to be short-lived secrets.

## How VoxiLabs Uses These Utilities

Let's revisit the email verification example from the [Authentication System](02_authentication_system_.md) chapter.

When a user registers on VoxiLabs, here's how the backend uses these utilities:

1.  **Generate OTP:** The system first creates a unique 6-digit code.
2.  **Store OTP:** This code is then saved in Redis, linked to the user's email, and given an expiry time (e.g., 10 minutes).
3.  **Send Email:** Finally, an email containing this OTP is sent to the user's registered email address.

```typescript
// Simplified from backend/src/auth/controller/auth-controller.ts
import { generateOTP, storeOTP } from '../utils/login-utils'; // OTP helpers
import { sendVerificationEmail } from '../utils/mail'; // Email sender

// Inside the register function of auth-controller
export const register = async (req, res) => {
  const { email, firstName } = req.body;
  // ... (check if user exists, hash password, create user in main DB) ...

  const otp = await generateOTP(email); // Output: a string like "123456"
  await storeOTP(email, otp); // Output: OTP saved in Redis, returns nothing on success
  await sendVerificationEmail(email, otp, firstName); // Output: Email sent, returns nothing on success

  res.status(201).json({ message: 'Check email for verification.' });
};
```
**Explanation:** This snippet shows the "manager" (the `register` function) orchestrating the process. It calls `generateOTP` to get a code, `storeOTP` to put it in our fast, temporary Redis safe, and `sendVerificationEmail` to deliver it to the user.

When the user later enters the OTP to verify their email:

```typescript
// Simplified from backend/src/auth/controller/auth-controller.ts
import { verifyOTP } from '../utils/login-utils'; // OTP helper

// Inside the verifyEmail function of auth-controller
export const verifyEmail = async (req, res) => {
  const { email, otp } = req.body;

  const isValid = await verifyOTP(email, otp); // Output: true or false
  if (!isValid) {
    res.status(400).json({ message: 'Invalid code' }); return;
  }

  // ... (update user's email verification status in main DB) ...
  res.status(200).json({ message: 'Email verified successfully' });
};
```
**Explanation:** Here, the `verifyEmail` function calls `verifyOTP`. This function checks if the entered OTP matches the one in Redis and if it's still valid (not expired). If it's all good, the user's email is marked as verified.

## Under the Hood: How OTP & Email Utilities Work

Let's look deeper into how these "post office" and "secure safe" parts of VoxiLabs are built.

### High-Level Flow: Sending and Verifying an OTP

Here’s a simplified sequence of how an OTP is generated, sent, and verified for email verification:

```mermaid
sequenceDiagram
    participant UC as User
    participant VF as VoxiLabs Frontend
    participant VB as VoxiLabs Backend (Auth Controller)
    participant OEU as OTP & Email Utilities
    participant RS as Redis (OTP Storage)
    participant ES as Email Service
    participant DB as Database (User Data)

    UC->>VF: Signs up (provides email)
    VF->>VB: Sends Signup Request
    VB->>OEU: Request to Generate OTP
    OEU->>DB: Get User's Secret (for better OTPs)
    DB-->>OEU: User Secret
    OEU-->>VB: OTP Generated (e.g., "123456")
    VB->>OEU: Request to Store OTP
    OEU->>RS: Store "otp:email" with expiry
    RS-->>OEU: Confirmation
    OEU-->>VB: OTP Stored
    VB->>OEU: Request to Send Email
    OEU->>ES: Send Email with OTP
    ES-->>UC: Delivers Email
    VB-->>VF: "Check email" message
    VF-->>UC: Shows message
    UC->>UC: Retrieves OTP from email
    UC->>VF: Enters OTP and Clicks Verify
    VF->>VB: Sends Verify OTP Request
    VB->>OEU: Request to Verify OTP
    OEU->>RS: Retrieve "otp:email"
    RS-->>OEU: Stored OTP and Expiry
    OEU->>OEU: Checks OTP match and expiry
    OEU->>RS: Delete "otp:email" (on success)
    RS-->>OEU: Confirmation
    OEU-->>VB: Verification Result (true/false)
    VB->>DB: Update User Status (verified)
    DB-->>VB: Confirmation
    VB-->>VF: "Email Verified!"
    VF-->>UC: Shows success and redirects
```

### The Backend Components in Detail

The core logic for OTP and Email utilities lives in these files:

#### 1. The "Time Keeper": `backend/src/utils/date-time.ts`

This small utility file helps us handle dates and times, especially for setting and checking expiry times for OTPs.

```typescript
// backend/src/utils/date-time.ts
export const addMinutes = (date: Date, minutes: number): Date => {
  return new Date(date.getTime() + minutes * 60000);
};

export const isExpired = (expiryDate: Date): boolean => {
  return new Date() > expiryDate;
};

export const getExpiryTime = (minutes: number = 10): Date => {
  return addMinutes(new Date(), minutes);
};
```
**Explanation:**
*   `addMinutes`: Takes a date and adds a certain number of minutes to it. This helps us calculate the future expiry time.
*   `isExpired`: Checks if a given `expiryDate` has already passed compared to the current time.
*   `getExpiryTime`: A convenient function to get an expiry date `X` minutes from now (defaulting to 10 minutes, perfect for OTPs).

#### 2. The "OTP Creator and Manager": `backend/src/utils/login-utils.ts`

This file is responsible for generating, storing, and verifying OTPs. It interacts with Redis.

```typescript
// backend/src/utils/login-utils.ts (simplified)
import { Redis } from 'ioredis'; // For temporary storage of OTPs
import { getExpiryTime, isExpired } from './date-time'; // Our time helpers

const redis = new Redis({ /* ... Redis connection details */ }); // Connect to Redis

export const generateOTP = async (email: string): Promise<string> => {
  // In VoxiLabs, this uses a user's secret for stronger OTPs.
  // For simplicity, imagine it just makes a random 6-digit number:
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const storeOTP = async (email: string, otp: string): Promise<void> => {
  const key = `otp:${email}`; // Unique key for this email's OTP
  const expiryTime = getExpiryTime(10); // OTP expires in 10 minutes

  await redis.set(key, JSON.stringify({ otp, expiryTime: expiryTime.toISOString() }));
  await redis.expire(key, 10 * 60); // Tell Redis to delete key after 10 minutes (in seconds)
};

export const verifyOTP = async (email: string, providedOTP: string): Promise<boolean> => {
  const key = `otp:${email}`;
  const storedData = await redis.get(key); // Get OTP from Redis

  if (!storedData) return false; // No OTP found
  const { otp, expiryTime } = JSON.parse(storedData);

  if (isExpired(new Date(expiryTime))) { // Check if expired using our helper
    await redis.del(key); // Clear expired OTP
    return false;
  }
  if (otp !== providedOTP) return false; // Check if codes match

  await redis.del(key); // Delete OTP after successful use for security
  return true;
};
```
**Explanation:**
*   `generateOTP`: Creates the actual 6-digit code. In a real system like VoxiLabs, it might use a more advanced method (like a hash based on a user's secret) to make it even harder to guess.
*   `storeOTP`: This is where Redis comes in! It saves the OTP and its calculated expiry time. The `redis.expire` command is crucial as it tells Redis to automatically delete the OTP after 10 minutes, making it "self-destructing."
*   `verifyOTP`: This function retrieves the OTP from Redis. It uses `isExpired` to check if the OTP is still fresh and then compares it with what the user provided. If both checks pass, it deletes the OTP from Redis (so it can't be reused) and confirms success.

#### 3. The "Post Office": `backend/src/utils/mail.ts`

This file handles sending the actual emails, including the templates for different types of messages.

```typescript
// backend/src/utils/mail.ts (simplified)
import nodemailer from 'nodemailer'; // Tool to send emails

// Configure mail transporter (connects to an email sending service like Gmail)
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true', // Use SSL/TLS for secure connection
  auth: {
    user: process.env.SMTP_USER, // Your email
    pass: process.env.SMTP_PASS, // Your email password/app password
  },
});

export const sendVerificationEmail = async (
  email: string,
  otp: string,
  firstName: string,
  isLogin: boolean = false,
  isPasswordReset: boolean = false
): Promise<void> => {
  let subject: string;
  let htmlContent: string;

  // Different email content based on purpose
  if (isPasswordReset) {
    subject = 'Reset Your Password';
    htmlContent = `<p>Hello ${firstName}, your password reset link is: <a href="${process.env.FRONTEND_URL}/reset-password?token=${otp}">Reset Password</a></p>`;
  } else if (isLogin) {
    subject = 'Login Verification Code';
    htmlContent = `<p>Hello ${firstName}, your login code is: <strong>${otp}</strong></p>`;
  } else { // Default: Email Verification
    subject = 'Verify Your Email Address';
    htmlContent = `<p>Hello ${firstName}, your verification code is: <strong>${otp}</strong></p>`;
  }

  const mailOptions = {
    from: `"VoxiLabs" <${process.env.SMTP_USER}>`, // Sender
    to: email, // Recipient
    subject, // Email subject
    html: htmlContent, // Email content (can be rich HTML)
  };

  try {
    await transporter.sendMail(mailOptions); // Send the email!
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send email');
  }
};
```
**Explanation:**
*   **Nodemailer:** This is a popular library for sending emails from Node.js applications. It's configured to connect to an external email service (like Gmail, SendGrid, etc.) using `transporter`.
*   `sendVerificationEmail`: This function is versatile! It takes the recipient's email, the `otp` (or a reset token), and the user's `firstName`. It then intelligently crafts the email's subject and content (`htmlContent`) based on whether it's for `password reset`, `login verification`, or `email verification`.
*   **Mail Options:** Sets up who the email is `from`, `to`, its `subject`, and the `html` content.
*   **Sending:** Finally, `transporter.sendMail(mailOptions)` attempts to send the email.

Here's a quick look at the different types of emails `sendVerificationEmail` can send:

| Purpose            | `isLogin` | `isPasswordReset` | Subject                        | Content Includes      |
| :----------------- | :-------- | :---------------- | :----------------------------- | :-------------------- |
| **Email Verification** | `false`   | `false`           | "Verify Your Email Address"    | 6-digit OTP code      |
| **Login Verification** | `true`    | `false`           | "Login Verification Code"      | 6-digit OTP code      |
| **Password Reset** | `false`   | `true`            | "Reset Your Password"          | Password reset *link* |

#### 4. How the "Manager" (Auth Controller) Uses Them: `backend/src/auth/controller/auth-controller.ts`

We've already seen snippets of how the `auth-controller` uses these utilities. Let's look at one more example: the `forgotPassword` flow, which uses a reset token (like an OTP) and an email:

```typescript
// backend/src/auth/controller/auth-controller.ts (simplified forgotPassword)
import { sendVerificationEmail } from '../utils/mail'; // Email sender
import crypto from 'crypto'; // For generating secure random strings

export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  // ... (find user by email) ...

  // Generate a random, unique token for password reset
  const resetToken = crypto.randomBytes(32).toString('hex');

  // Store this resetToken in the database, linked to the user, with an expiry
  // (This part is handled by Prisma ORM for VerificationToken in Chapter 7)
  // Example: await createVerificationToken({ identifier: email, token: resetToken, expires: ... });

  // Send the password reset email with the special token/link
  await sendVerificationEmail(email, resetToken, user.firstName, false, true);

  res.status(200).json({ message: 'Password reset instructions sent to your email' });
};
```
**Explanation:** The `forgotPassword` function generates a `resetToken` (which is similar in concept to an OTP but typically longer and used in a URL). It then stores this token (usually in the main database with a longer expiry than an OTP, e.g., 1 hour, because it's a password *reset link*, not just a code). Finally, it uses `sendVerificationEmail` with the `isPasswordReset: true` flag to send the user a specialized email containing this reset link.

## Conclusion

In this chapter, we've explored the VoxiLabs OTP & Email Utilities, understanding their crucial role in securing user accounts and enabling important communication. We learned about One-Time Passwords (OTPs), why email is essential for delivery, and how Redis acts as a super-fast, temporary safe for these codes. We saw how the system generates, stores, verifies, and sends these codes, ensuring a smooth and secure user experience for account verification, login, and password resets.

Now that we understand how users are securely managed and communicated with, it's time to dive into what makes VoxiLabs unique: its ability to create content! Next, we'll explore the [Video Generation Service](04_video_generation_service_.md).

---