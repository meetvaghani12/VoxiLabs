import { Request, Response } from 'express';
import { InferenceClient } from "@huggingface/inference";
import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import fs from 'fs/promises';

const prisma = new PrismaClient();
const client = new InferenceClient(process.env.HF_TOKEN || '');

interface BlobLike {
  arrayBuffer(): Promise<ArrayBuffer>;
}

export const generateVideo = async (req: Request, res: Response): Promise<void> => {
  try {
    const { prompt, title } = req.body;
    const userId = req.user?.id; // Assuming you have user data in request

    if (!prompt) {
      res.status(400).json({ message: 'Prompt is required' });
      return;
    }

    if (!userId) {
      res.status(401).json({ message: 'User not authenticated' });
      return;
    }

    if (!process.env.HF_TOKEN) {
      res.status(500).json({ message: 'Hugging Face token not configured' });
      return;
    }

    // Create video record in database with initial status
    const video = await prisma.video.create({
      data: {
        title: title || 'Untitled Video',
        prompt,
        status: 'processing',
        userId
      }
    });

    console.log('Generating video with prompt:', prompt);

    // Generate video using Hugging Face
    const response = await client.textToVideo({
      provider: "novita",
      model: "Wan-AI/Wan2.1-T2V-14B",
      inputs: prompt
    });

    // The response should be a Blob or ArrayBuffer
    if (!response) {
      await prisma.video.update({
        where: { id: video.id },
        data: { status: 'failed' }
      });
      throw new Error('No response received from Hugging Face API');
    }

    // Convert response to Buffer if it's not already
    let videoBuffer: Buffer;
    if (response instanceof Uint8Array) {
      videoBuffer = Buffer.from(response);
    } else if (response instanceof ArrayBuffer) {
      videoBuffer = Buffer.from(new Uint8Array(response));
    } else if (typeof response === 'object' && 'arrayBuffer' in response && 
               typeof (response as BlobLike).arrayBuffer === 'function') {
      // Handle Blob-like objects
      const arrayBuffer = await (response as BlobLike).arrayBuffer();
      videoBuffer = Buffer.from(new Uint8Array(arrayBuffer));
    } else {
      await prisma.video.update({
        where: { id: video.id },
        data: { status: 'failed' }
      });
      throw new Error('Unexpected response format from Hugging Face API');
    }

    console.log('Received video data of size:', videoBuffer.length, 'bytes');

    // Create videos directory if it doesn't exist
    const videosDir = path.join(__dirname, '../../public/videos');
    await fs.mkdir(videosDir, { recursive: true });

    // Save video file
    const filename = `${uuidv4()}.mp4`;
    const filePath = path.join(videosDir, filename);
    await fs.writeFile(filePath, videoBuffer);

    // Update video record with URL and status
    await prisma.video.update({
      where: { id: video.id },
      data: {
        url: `/videos/${filename}`,
        status: 'completed'
      }
    });

    // Set appropriate headers for video streaming
    res.setHeader('Content-Type', 'video/mp4');
    res.setHeader('Content-Length', videoBuffer.length);
    res.setHeader('Content-Disposition', 'inline; filename="generated-video.mp4"');

    // Send the video buffer
    res.send(videoBuffer);
  } catch (error) {
    console.error('Video generation error:', error);
    res.status(500).json({ 
      message: 'Failed to generate video',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// Get all videos for a user
export const getUserVideos = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({ message: 'User not authenticated' });
      return;
    }

    const videos = await prisma.video.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' }
    });

    res.json(videos);
  } catch (error) {
    console.error('Error fetching user videos:', error);
    res.status(500).json({ 
      message: 'Failed to fetch videos',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// Get a single video by ID
export const getVideo = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({ message: 'User not authenticated' });
      return;
    }

    const video = await prisma.video.findFirst({
      where: {
        id,
        userId
      }
    });

    if (!video) {
      res.status(404).json({ message: 'Video not found' });
      return;
    }

    res.json(video);
  } catch (error) {
    console.error('Error fetching video:', error);
    res.status(500).json({ 
      message: 'Failed to fetch video',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// Delete a video
export const deleteVideo = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({ message: 'User not authenticated' });
      return;
    }

    const video = await prisma.video.findFirst({
      where: {
        id,
        userId
      }
    });

    if (!video) {
      res.status(404).json({ message: 'Video not found' });
      return;
    }

    // Delete video file if it exists
    if (video.url) {
      const filePath = path.join(__dirname, '../../public', video.url);
      try {
        await fs.unlink(filePath);
      } catch (error) {
        console.error('Error deleting video file:', error);
      }
    }

    // Delete video record
    await prisma.video.delete({
      where: { id }
    });

    res.json({ message: 'Video deleted successfully' });
  } catch (error) {
    console.error('Error deleting video:', error);
    res.status(500).json({ 
      message: 'Failed to delete video',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}; 