import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { startOfMonth, endOfMonth } from 'date-fns';

const prisma = new PrismaClient();

export const getDashboardStats = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({ message: 'User not authenticated' });
      return;
    }

    // Get total videos count
    const totalVideos = await prisma.video.count({
      where: { userId }
    });

    // Get this month's videos
    const now = new Date();
    const monthStart = startOfMonth(now);
    const monthEnd = endOfMonth(now);
    
    const monthlyVideos = await prisma.video.count({
      where: {
        userId,
        createdAt: {
          gte: monthStart,
          lte: monthEnd
        }
      }
    });

    // Get all videos for duration calculation
    const videos = await prisma.video.findMany({
      where: { userId },
      select: {
        duration: true
      }
    });

    // Calculate total duration in minutes
    const totalDuration = videos.reduce((acc, video) => {
      return acc + (video.duration || 0);
    }, 0);

    res.json({
      totalVideos,
      monthlyVideos,
      totalDuration: Math.round(totalDuration), // Round to nearest minute
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    res.status(500).json({ 
      message: 'Failed to fetch dashboard stats',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

export const getRecentProjects = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    const { search, sort = 'date' } = req.query;

    if (!userId) {
      res.status(401).json({ message: 'User not authenticated' });
      return;
    }

    // Build the where clause
    const where = {
      userId,
      ...(search ? {
        title: {
          contains: search as string,
          mode: 'insensitive' as const
        }
      } : {})
    };

    // Build the orderBy clause
    const orderBy = {
      ...(sort === 'title' ? { title: 'asc' as const } : {}),
      ...(sort === 'duration' ? { duration: 'desc' as const } : {}),
      ...(sort === 'date' ? { createdAt: 'desc' as const } : {})
    };

    const projects = await prisma.video.findMany({
      where,
      orderBy,
      select: {
        id: true,
        title: true,
        duration: true,
        createdAt: true,
        status: true,
        url: true
      }
    });

    res.json(projects);
  } catch (error) {
    console.error('Error fetching recent projects:', error);
    res.status(500).json({ 
      message: 'Failed to fetch recent projects',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}; 