
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Users, 
  UserPlus, 
  Video, 
  MessageSquare, 
  CheckCircle, 
  Clock, 
  Share2,
  Settings,
  Mail,HandshakeIcon
} from "lucide-react";
import { Link } from "react-router-dom";

const Collaboration = () => {
  const [inviteEmail, setInviteEmail] = useState("");

  const teamMembers = [
    { id: 1, name: "John Doe", email: "john@company.com", role: "Admin", status: "active" },
    { id: 2, name: "Jane Smith", email: "jane@company.com", role: "Editor", status: "active" },
    { id: 3, name: "Mike Johnson", email: "mike@company.com", role: "Viewer", status: "pending" }
  ];

  const sharedProjects = [
    {
      id: 1,
      title: "Product Launch Video",
      collaborators: 3,
      comments: 8,
      status: "in-review",
      updatedAt: "2 hours ago"
    },
    {
      id: 2, 
      title: "Marketing Campaign",
      collaborators: 2,
      comments: 3,
      status: "approved",
      updatedAt: "1 day ago"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved": return "bg-black text-white";
      case "in-review": return "bg-black/10 text-black";
      case "pending": return "bg-gray-100 text-black";
      default: return "bg-gray-100 text-black";
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-black rounded-lg flex items-center justify-center">
                <HandshakeIcon className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-black">
                VOXILABS
              </span>
            </Link>
            
            <div className="flex items-center space-x-4">
              <Link to="/dashboard">
                <Button variant="ghost">Dashboard</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-black mb-2">Team Collaboration</h1>
          <p className="text-black/60">Invite team members and collaborate on video projects</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Team Management */}
          <div className="lg:col-span-2 space-y-6">
            {/* Invite Section */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <UserPlus className="w-5 h-5 mr-2" />
                  Invite Team Members
                </CardTitle>
                <CardDescription>
                  Add new members to collaborate on your video projects
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-4">
                  <Input
                    placeholder="Enter email address"
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    className="flex-1"
                  />
                  <Button>
                    <Mail className="w-4 h-4 mr-2" />
                    Send Invite
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Team Members */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  Team Members ({teamMembers.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {teamMembers.map((member) => (
                    <div key={member.id} className="flex items-center justify-between p-4 bg-black/5 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <Avatar>
                          <AvatarFallback>
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-black">{member.name}</p>
                          <p className="text-sm text-black/60">{member.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline">{member.role}</Badge>
                        <Badge className={getStatusColor(member.status)}>
                          {member.status}
                        </Badge>
                        <Button variant="outline" size="sm">
                          <Settings className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Shared Projects */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Share2 className="w-5 h-5 mr-2" />
                  Shared Projects
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {sharedProjects.map((project) => (
                    <div key={project.id} className="p-4 bg-black/5 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-black">{project.title}</h3>
                        <Badge className={getStatusColor(project.status)}>
                          {project.status}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm text-black/60">
                        <div className="flex items-center space-x-4">
                          <span className="flex items-center">
                            <Users className="w-4 h-4 mr-1" />
                            {project.collaborators} collaborators
                          </span>
                          <span className="flex items-center">
                            <MessageSquare className="w-4 h-4 mr-1" />
                            {project.comments} comments
                          </span>
                        </div>
                        <span className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {project.updatedAt}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Activity & Settings */}
          <div className="space-y-6">
            {/* Recent Activity */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-black mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-black">Project approved</p>
                      <p className="text-xs text-black/60">Jane approved "Marketing Campaign"</p>
                      <p className="text-xs text-black/40">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <MessageSquare className="w-5 h-5 text-black mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-black">New comment</p>
                      <p className="text-xs text-black/60">Mike left a comment on "Product Launch"</p>
                      <p className="text-xs text-black/40">4 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <UserPlus className="w-5 h-5 text-black mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-black">Member joined</p>
                      <p className="text-xs text-black/60">Mike Johnson joined the team</p>
                      <p className="text-xs text-black/40">1 day ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Collaboration Settings */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle>Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-black">Email notifications</span>
                  <Button variant="outline" size="sm">Configure</Button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-black">Default permissions</span>
                  <Button variant="outline" size="sm">Manage</Button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-black">Project templates</span>
                  <Button variant="outline" size="sm">Create</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collaboration;
