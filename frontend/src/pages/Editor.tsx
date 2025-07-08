
import { useState } from "react";
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
  Volume2
} from "lucide-react";
import { Link } from "react-router-dom";

const Editor = () => {
  const [script, setScript] = useState("");
  const [selectedVoice, setSelectedVoice] = useState("sarah");
  const [selectedAvatar, setSelectedAvatar] = useState("professional");
  const [selectedBackground, setSelectedBackground] = useState("office");

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50">
      {/* Navigation */}
      <nav className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/dashboard" className="flex items-center text-gray-600 hover:text-purple-600">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Dashboard
              </Link>
              <Separator orientation="vertical" className="h-6" />
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                  <Video className="w-5 h-5 text-white" />
                </div>
                <span className="font-semibold">Video Editor</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Save className="w-4 h-4 mr-2" />
                Save Draft
              </Button>
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                <Zap className="w-4 h-4 mr-2" />
                Generate Video
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Editor Panel */}
          <div className="lg:col-span-2 space-y-6">
            {/* Script Editor */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Mic className="w-5 h-5 mr-2 text-purple-600" />
                  Script Editor
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Enter your script here... The AI will automatically break it into scenes and generate matching visuals."
                  value={script}
                  onChange={(e) => setScript(e.target.value)}
                  className="min-h-[200px] text-base leading-relaxed"
                />
                <div className="flex items-center justify-between mt-4 text-sm text-gray-500">
                  <span>{script.length} characters</span>
                  <span>~{Math.ceil(script.length / 150)} seconds video</span>
                </div>
              </CardContent>
            </Card>

            {/* Scene Preview */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Play className="w-5 h-5 mr-2 text-purple-600" />
                  Preview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-gradient-to-br from-purple-100 to-blue-100 rounded-lg flex items-center justify-center border-2 border-dashed border-purple-300">
                  <div className="text-center">
                    <Play className="w-16 h-16 text-purple-600 mx-auto mb-4" />
                    <p className="text-lg text-gray-600 mb-2">AI Video Preview</p>
                    <p className="text-sm text-gray-500">Enter your script and click preview to see the magic</p>
                    <Button className="mt-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                      <Play className="w-4 h-4 mr-2" />
                      Generate Preview
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Settings Panel */}
          <div className="space-y-6">
            {/* Voice Settings */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Volume2 className="w-5 h-5 mr-2 text-purple-600" />
                  Voice Settings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="voices" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="voices">AI Voices</TabsTrigger>
                    <TabsTrigger value="clone">Clone Voice</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="voices" className="space-y-3 mt-4">
                    {voices.map((voice) => (
                      <div
                        key={voice.id}
                        className={`p-3 rounded-lg border cursor-pointer transition-all ${
                          selectedVoice === voice.id 
                            ? "border-purple-500 bg-purple-50" 
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                        onClick={() => setSelectedVoice(voice.id)}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">{voice.name}</p>
                            <p className="text-sm text-gray-500">{voice.language}</p>
                          </div>
                          <Badge variant="outline">{voice.accent}</Badge>
                        </div>
                      </div>
                    ))}
                  </TabsContent>
                  
                  <TabsContent value="clone" className="mt-4">
                    <div className="text-center p-6 border-2 border-dashed border-gray-300 rounded-lg">
                      <Mic className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-sm text-gray-600 mb-4">Upload audio sample to clone your voice</p>
                      <Button variant="outline" size="sm">
                        Upload Audio
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Avatar Settings */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <User className="w-5 h-5 mr-2 text-purple-600" />
                  Avatar
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {avatars.map((avatar) => (
                  <div
                    key={avatar.id}
                    className={`p-3 rounded-lg border cursor-pointer transition-all ${
                      selectedAvatar === avatar.id 
                        ? "border-purple-500 bg-purple-50" 
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => setSelectedAvatar(avatar.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{avatar.name}</p>
                        <p className="text-sm text-gray-500">{avatar.style}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Background Settings */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Image className="w-5 h-5 mr-2 text-purple-600" />
                  Background
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {backgrounds.map((bg) => (
                  <div
                    key={bg.id}
                    className={`p-3 rounded-lg border cursor-pointer transition-all ${
                      selectedBackground === bg.id 
                        ? "border-purple-500 bg-purple-50" 
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => setSelectedBackground(bg.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{bg.name}</p>
                        <p className="text-sm text-gray-500">{bg.category}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-lg py-6">
                <Zap className="w-5 h-5 mr-2" />
                Generate Final Video
              </Button>
              
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
                <Button variant="outline">
                  <Share className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editor;
