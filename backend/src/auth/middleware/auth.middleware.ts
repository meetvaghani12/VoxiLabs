import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Extend the Express Request interface
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
      };
    }
  }
}

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Get token from header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ message: 'Authentication required' });
      return;
    }

    const token = authHeader.split(' ')[1];

    // Verify token
    const decoded = verifyToken(token);
    if (!decoded) {
      res.status(401).json({ message: 'Invalid or expired token' });
      return;
    }

    // Check if session exists
    const session = await prisma.session.findUnique({
      where: {
        sessionToken: token,
      },
      include: {
        user: true,
      },
    });

    if (!session || session.expires < new Date()) {
      if (session) {
        // Clean up expired session
        await prisma.session.delete({
          where: { sessionToken: token },
        });
      }
      res.status(401).json({ message: 'Session expired or invalid' });
      return;
    }

    // Attach user to request
    req.user = {
      id: session.user.id,
      email: session.user.email,
    };

    next();
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(500).json({ message: 'Server error during authentication' });
  }
};