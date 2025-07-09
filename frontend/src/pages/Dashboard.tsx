
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Plus, 
  Video, 
  Search, 
  Download, 
  Share, 
  Trash2, 
  Edit, 
  Play,
  Calendar,
  Clock,
  User,
  Settings
} from "lucide-react";
import { Link } from "react-router-dom";

interface VideoProject {
  id: string;
  title: string;
  duration: string;
  createdAt: string;
  status: "completed" | "processing" | "draft";
  thumbnail: string;
}

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("date");

  // Mock data for demonstration
  const projects: VideoProject[] = [
    {
      id: "1",
      title: "Product Demo Video",
      duration: "2:45",
      createdAt: "2024-01-15",
      status: "completed",
      thumbnail: "demo-thumb"
    },
    {
      id: "2", 
      title: "Marketing Campaign",
      duration: "1:30",
      createdAt: "2024-01-14",
      status: "processing",
      thumbnail: "marketing-thumb"
    },
    {
      id: "3",
      title: "Educational Content",
      duration: "4:12",
      createdAt: "2024-01-13",
      status: "completed",
      thumbnail: "edu-thumb"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-black text-white";
      case "processing": return "bg-black/10 text-black";
      case "draft": return "bg-black/5 text-black";
      default: return "bg-black/5 text-black";
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-xl font-bold text-black">
                VOXILABS
              </span>
            </Link>
            
            <div className="flex items-center space-x-4">
              <Link to="/analytics">
                <Button variant="ghost" size="sm">Analytics</Button>
              </Link>
              <Link to="/collaboration">
                <Button variant="ghost" size="sm">Team</Button>
              </Link>
              <Link to="/pricing">
                <Button variant="ghost" size="sm">Pricing</Button>
              </Link>
              <Link to="/settings">
                <Button variant="ghost" size="sm">
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </Button>
              </Link>
              <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-black mb-2">Welcome back!</h1>
          <p className="text-black/60">Create amazing AI videos in minutes</p>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-black/60">Total Videos</p>
                  <p className="text-2xl font-bold text-black">12</p>
                </div>
                <Video className="w-8 h-8 text-black" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-black/60">This Month</p>
                  <p className="text-2xl font-bold text-black">5</p>
                </div>
                <Calendar className="w-8 h-8 text-black" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-black/60">Total Duration</p>
                  <p className="text-2xl font-bold text-black">28m</p>
                </div>
                <Clock className="w-8 h-8 text-black" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <Link to="/editor" className="block">
                <div className="flex items-center justify-between text-black">
                  <div>
                    <p className="text-sm text-black/60">New Project</p>
                    <p className="text-lg font-semibold">Create Video</p>
                  </div>
                  <Plus className="w-8 h-8" />
                </div>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Projects Section */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h2 className="text-2xl font-bold text-black">Your Projects</h2>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-black/40" />
                <Input
                  placeholder="Search projects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border rounded-md text-sm text-black bg-white"
              >
                <option value="date">Sort by Date</option>
                <option value="title">Sort by Title</option>
                <option value="duration">Sort by Duration</option>
              </select>
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <Card key={project.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="aspect-video bg-black/5 flex items-center justify-center">
                  <Play className="w-12 h-12 text-black" />
                </div>
                
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-semibold text-lg truncate text-black">{project.title}</h3>
                    <Badge className={getStatusColor(project.status)}>
                      {project.status}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center text-sm text-black/60 mb-4">
                    <Clock className="w-4 h-4 mr-1" />
                    {project.duration}
                    <span className="mx-2">•</span>
                    {new Date(project.createdAt).toLocaleDateString()}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Button size="sm" variant="outline">
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </Button>
                    </div>
                    
                    <div className="flex items-center space-x-1">
                      <Button size="sm" variant="ghost">
                        <Download className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="ghost">
                        <Share className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="ghost">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Empty State */}
          {projects.length === 0 && (
            <Card className="border-2 border-dashed border-black/20 p-12 text-center">
              <Video className="w-16 h-16 text-black/40 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-black mb-2">No projects yet</h3>
              <p className="text-black/60 mb-6">Create your first AI video to get started</p>
              <Link to="/editor">
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Create New Video
                </Button>
              </Link>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
