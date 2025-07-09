import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { 
  Video, 
  Play, 
  Download, 
  Share, 
  Mic, 
  User, 
  Image,
  Zap,
  ArrowLeft,
  Save,
  Settings,
  Volume2,
  Loader2
} from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { Navigation } from "@/components/Navigation";

const BACKEND_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const Editor = () => {
  const [script, setScript] = useState("");
  const [selectedVoice, setSelectedVoice] = useState("sarah");
  const [selectedAvatar, setSelectedAvatar] = useState("professional");
  const [selectedBackground, setSelectedBackground] = useState("office");
  const [isGenerating, setIsGenerating] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const voices = [
    { id: "sarah", name: "Sarah", language: "English (US)", accent: "Professional" },
    { id: "james", name: "James", language: "English (UK)", accent: "British" },
    { id: "maria", name: "Maria", language: "Spanish", accent: "Natural" },
    { id: "hiroshi", name: "Hiroshi", language: "Japanese", accent: "Friendly" }
  ];

  const avatars = [
    { id: "professional", name: "Professional Woman", style: "Realistic" },
    { id: "casual", name: "Casual Man", style: "Realistic" },
    { id: "teacher", name: "Teacher", style: "Animated" },
    { id: "presenter", name: "Presenter", style: "3D" }
  ];

  const backgrounds = [
    { id: "office", name: "Modern Office", category: "Professional" },
    { id: "studio", name: "Video Studio", category: "Professional" },
    { id: "classroom", name: "Classroom", category: "Educational" },
    { id: "nature", name: "Nature Scene", category: "Outdoor" }
  ];

  const handleGenerate = async () => {
    if (!script.trim()) {
      toast.error("Please enter a script first");
      return;
    }

    setIsGenerating(true);
    try {
      // Get the token from localStorage
      const token = localStorage.getItem('token');
      
      if (!token) {
        throw new Error('You must be logged in to generate videos');
      }

      const response = await fetch(`${BACKEND_URL}/generate-video`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ 
          prompt: script,
          voice: selectedVoice,
          avatar: selectedAvatar,
          background: selectedBackground
        }),
      });

      if (!response.ok) {
        if (response.status === 401) {
          // Handle unauthorized error specifically
          throw new Error('Your session has expired. Please log in again.');
        }
        throw new Error(`Failed to generate video: ${response.status} ${response.statusText}`);
      }

      // Log response headers to debug content type
      console.log('Response headers:', Object.fromEntries(response.headers.entries()));
      
      const contentType = response.headers.get('content-type');
      console.log('Content-Type:', contentType);

      const blob = await response.blob();
      console.log('Blob size:', blob.size, 'bytes');
      console.log('Blob type:', blob.type);

      // Check for minimum valid video size (10KB)
      if (blob.size < 10000) {
        throw new Error(`Received invalid video data: file size too small (${blob.size} bytes). The server might have returned an error.`);
      }

      if (!contentType?.includes('video/')) {
        throw new Error(`Invalid content type received: ${contentType}. Expected a video format.`);
      }

      // Create blob URL with explicit video MIME type if not set
      const blobType = blob.type || 'video/mp4';
      const videoBlob = new Blob([blob], { type: blobType });
      const url = URL.createObjectURL(videoBlob);
      
      console.log('Created video URL:', url);
      setVideoUrl(url);
      
      // Clean up previous video URL to prevent memory leaks
      if (videoRef.current) {
        videoRef.current.src = url;
        videoRef.current.load(); // Force video element to load new source
        
        // Add event listeners to debug video loading
        videoRef.current.onloadeddata = () => {
          console.log('Video loaded successfully');
        };
        videoRef.current.onerror = (e) => {
          console.error('Video loading error:', videoRef.current?.error);
          toast.error('Error loading video: ' + videoRef.current?.error?.message);
        };
      }

      toast.success("Video generated successfully!");
    } catch (error) {
      console.error('Generation error:', error);
      toast.error(error instanceof Error ? error.message : "Failed to generate video. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  // Clean up blob URLs when component unmounts
  useEffect(() => {
    return () => {
      if (videoUrl) {
        URL.revokeObjectURL(videoUrl);
      }
    };
  }, [videoUrl]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Text To Video */}
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4">Text To Video</h2>
              <div className="space-y-4">
                <Textarea
                  placeholder="Enter your script here... (e.g., A young man walking on the street)"
                  value={script}
                  onChange={(e) => setScript(e.target.value)}
                  className="min-h-[200px] resize-none"
                  disabled={isGenerating}
                />
                <Button 
                  className="w-full"
                  onClick={handleGenerate}
                  disabled={isGenerating}
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating Video...
                    </>
                  ) : (
                    'Generate Video'
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Video Preview */}
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4">Preview</h2>
              <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                {videoUrl ? (
                  <video
                    ref={videoRef}
                    src={videoUrl}
                    controls
                    className="w-full h-full object-contain"
                  >
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-500">
                    {isGenerating ? (
                      <div className="flex flex-col items-center">
                        <Loader2 className="h-8 w-8 animate-spin mb-2" />
                        <p>Generating your video...</p>
                      </div>
                    ) : (
                      <p>Your video preview will appear here</p>
                    )}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Editor;
