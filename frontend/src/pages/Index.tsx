import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Play, Zap, Globe, Mic, Video, Users, Star } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { useEffect, useState } from "react";
import authService from "@/services/auth";

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await authService.getCurrentUser();
        setIsAuthenticated(!!user);
      } catch (error) {
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  const handleGetStarted = () => {
    if (isAuthenticated) {
      navigate('/editor');
    } else {
      navigate('/signup');
    }
  };

  return (
    <div className="min-h-screen bg-white font-manrope">
      {/* Navigation */}
      <Navigation />

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 text-center">
        <Badge className="mb-6 bg-black text-white hover:bg-gray-800 font-manrope">
         Now with Instant Text-to-Video Magic
        </Badge>
        <h1 className="text-2xl md:text-6xl font-bold mb-6 text-black leading-tight font-sora">
          The most realistic Text to Video AI
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
          Turn your ideas into videos with nothing but text. Our AI platform transforms your words into polished video content — no hassle, no tools.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button size="lg" className="text-lg px-8 py-6 bg-black text-white hover:bg-gray-800" onClick={handleGetStarted}>
            {isAuthenticated ? 'Start Creating' : 'Start Creating Free'}
          </Button>
          <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-2 border-black text-black hover:bg-gray-100">
            Watch Demo
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-black font-sora">Powerful AI Features</h2>
          <p className="text-xl text-gray-600">Everything you need to create professional videos</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="border border-black shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardHeader>
              <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-black font-sora">Text to Video</CardTitle>
              <CardDescription className="text-gray-600">
                Transform any text script into engaging videos with AI-generated scenes and animations
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border border-black shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardHeader>
              <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mb-4">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-black font-sora">Multilingual Voices</CardTitle>
              <CardDescription className="text-gray-600">
                100+ realistic AI voices in 50+ languages powered by ElevenLabs technology
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border border-black shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardHeader>
              <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mb-4">
                <Mic className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-black font-sora">Voice Cloning</CardTitle>
              <CardDescription className="text-gray-600">
                Clone your own voice or create custom AI voices with just a few audio samples
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border border-black shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardHeader>
              <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mb-4">
                <Video className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-black font-sora">Lip-Sync Avatars</CardTitle>
              <CardDescription className="text-gray-600">
                Photorealistic avatars with perfect lip-sync matching your chosen voice
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border border-black shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardHeader>
              <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-black font-sora">Team Collaboration</CardTitle>
              <CardDescription className="text-gray-600">
                Share projects, get feedback, and collaborate with your team in real-time
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border border-black shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardHeader>
              <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mb-4">
                <Star className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-black font-sora">Professional Quality</CardTitle>
              <CardDescription className="text-gray-600">
                Export in 4K resolution with multiple formats: MP4, GIF, WebM
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-black font-sora">Loved by creators worldwide</h2>
            <p className="text-xl text-gray-600">Join thousands of content creators, educators, and marketers</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border border-black shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-black fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6">
                  "VOXILABS has revolutionized my content creation process. I can now create professional videos in minutes instead of hours."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center text-white font-bold font-sora">
                    H
                  </div>
                  <div className="ml-3">
                    <p className="font-semibold text-black font-sora">Hetvi Vaghasiya</p>
                    <p className="text-sm text-gray-500">YouTuber, 2M subscribers</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-black shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-black fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6">
                  "The multilingual support is incredible. I can create educational content for students around the world."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center text-white font-bold font-sora">
                    Y
                  </div>
                  <div className="ml-3">
                    <p className="font-semibold text-black font-sora">Yash Nathani</p>
                    <p className="text-sm text-gray-500">Online Educator</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-black shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-black fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6">
                  "Voice cloning feature is a game-changer. My brand's voice is now consistent across all videos."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center text-white font-bold font-sora">
                    I
                  </div>
                  <div className="ml-3">
                    <p className="font-semibold text-black font-sora">Isha Dungrani</p>
                    <p className="text-sm text-gray-500">Marketing Director</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                
                <span className="text-xl font-bold font-sora">VOXILABS</span>
              </div>
              <p className="text-gray-400">
                Transform text into professional videos with AI
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 font-sora">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Features</li>
                <li>Pricing</li>
                <li>API</li>
                <li>Documentation</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 font-sora">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li>About</li>
                <li>Blog</li>
                <li>Careers</li>
                <li>Contact</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 font-sora">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Help Center</li>
                <li>Community</li>
                <li>Status</li>
                <li>Privacy</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2025 VOXILABS. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
