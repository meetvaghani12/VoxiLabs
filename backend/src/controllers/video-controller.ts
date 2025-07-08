import { Request, Response } from 'express';
import { InferenceClient } from "@huggingface/inference";

const client = new InferenceClient(process.env.HF_TOKEN || '');

interface BlobLike {
  arrayBuffer(): Promise<ArrayBuffer>;
}

export const generateVideo = async (req: Request, res: Response): Promise<void> => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      res.status(400).json({ message: 'Prompt is required' });
      return;
    }

    if (!process.env.HF_TOKEN) {
      res.status(500).json({ message: 'Hugging Face token not configured' });
      return;
    }

    console.log('Generating video with prompt:', prompt);

    // Generate video using Hugging Face
    const response = await client.textToVideo({
      provider: "novita",
      model: "Wan-AI/Wan2.1-T2V-14B",
      inputs: prompt
    });

    // The response should be a Blob or ArrayBuffer
    if (!response) {
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
      throw new Error('Unexpected response format from Hugging Face API');
    }

    console.log('Received video data of size:', videoBuffer.length, 'bytes');

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