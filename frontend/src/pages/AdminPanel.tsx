
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Shield, 
  Users, 
  AlertTriangle, 
  Activity, 
  Search,
  MoreVertical,
  Ban,
  CheckCircle,
  XCircle,
  TrendingUp,
  Database,
  Settings
} from "lucide-react";
import { Link } from "react-router-dom";

const AdminPanel = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const adminStats = [
    { label: "Total Users", value: "2,847", change: "+12%", icon: Users, color: "text-blue-600" },
    { label: "Active Subscriptions", value: "1,243", change: "+8%", icon: TrendingUp, color: "text-green-600" },
    { label: "Videos Generated", value: "18,394", change: "+25%", icon: Activity, color: "text-purple-600" },
    { label: "Issues Reported", value: "23", change: "-15%", icon: AlertTriangle, color: "text-red-600" }
  ];

  const users = [
    { 
      id: 1, 
      name: "John Doe", 
      email: "john@example.com", 
      plan: "Creator", 
      status: "active", 
      videosGenerated: 45,
      joinDate: "2024-01-15",
      lastActive: "2 hours ago"
    },
    { 
      id: 2, 
      name: "Jane Smith", 
      email: "jane@company.com", 
      plan: "Pro", 
      status: "active", 
      videosGenerated: 128,
      joinDate: "2023-11-20",
      lastActive: "1 day ago"
    },
    { 
      id: 3, 
      name: "Mike Johnson", 
      email: "mike@startup.io", 
      plan: "Free", 
      status: "suspended", 
      videosGenerated: 12,
      joinDate: "2024-01-10",
      lastActive: "1 week ago"
    }
  ];

  const systemAlerts = [
    { type: "error", message: "High server load detected", time: "5 min ago", severity: "high" },
    { type: "warning", message: "Storage usage at 85%", time: "1 hour ago", severity: "medium" },
    { type: "info", message: "Scheduled maintenance completed", time: "2 hours ago", severity: "low" }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-700";
      case "suspended": return "bg-red-100 text-red-700";
      case "pending": return "bg-yellow-100 text-yellow-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high": return "bg-red-100 text-red-700";
      case "medium": return "bg-yellow-100 text-yellow-700";
      case "low": return "bg-blue-100 text-blue-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50">
      {/* Navigation */}
      <nav className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                VOXILABS Admin
              </span>
            </Link>
            
            <div className="flex items-center space-x-4">
              <Badge className="bg-red-100 text-red-700">Admin Access</Badge>
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Panel</h1>
          <p className="text-gray-600">Manage users, monitor system health, and oversee platform operations</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {adminStats.map((stat, index) => {
            const Icon = stat.icon;
            const isPositive = stat.change.startsWith('+');
            
            return (
              <Card key={index} className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                    <Badge variant={isPositive ? "default" : "secondary"} className="text-xs">
                      {stat.change}
                    </Badge>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - User Management */}
          <div className="lg:col-span-2 space-y-6">
            {/* User Management */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  User Management
                </CardTitle>
                <CardDescription>Monitor and manage user accounts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      placeholder="Search users..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Button variant="outline">Export</Button>
                </div>

                <div className="space-y-4">
                  {users.map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <Avatar>
                          <AvatarFallback>
                            {user.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-sm text-gray-500">{user.email}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge variant="outline" className="text-xs">{user.plan}</Badge>
                            <span className="text-xs text-gray-500">{user.videosGenerated} videos</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={getStatusColor(user.status)}>
                          {user.status}
                        </Badge>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* System Health */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Database className="w-5 h-5 mr-2" />
                  System Health
                </CardTitle>
                <CardDescription>Monitor system performance and resources</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Server CPU</span>
                    <span className="text-sm text-gray-600">45%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full" style={{ width: '45%' }} />
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Memory Usage</span>
                    <span className="text-sm text-gray-600">67%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-gradient-to-r from-yellow-500 to-orange-500 h-2 rounded-full" style={{ width: '67%' }} />
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Storage</span>
                    <span className="text-sm text-gray-600">85%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-gradient-to-r from-red-500 to-pink-500 h-2 rounded-full" style={{ width: '85%' }} />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">99.9%</p>
                    <p className="text-xs text-gray-500">Uptime</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600">245ms</p>
                    <p className="text-xs text-gray-500">Avg Response</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-purple-600">1.2M</p>
                    <p className="text-xs text-gray-500">Requests/day</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Alerts & Actions */}
          <div className="space-y-6">
            {/* System Alerts */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertTriangle className="w-5 h-5 mr-2" />
                  System Alerts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {systemAlerts.map((alert, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                        alert.type === 'error' ? 'bg-red-100' : 
                        alert.type === 'warning' ? 'bg-yellow-100' : 'bg-blue-100'
                      }`}>
                        {alert.type === 'error' && <XCircle className="w-4 h-4 text-red-600" />}
                        {alert.type === 'warning' && <AlertTriangle className="w-4 h-4 text-yellow-600" />}
                        {alert.type === 'info' && <CheckCircle className="w-4 h-4 text-blue-600" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">
                          {alert.message}
                        </p>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge className={getSeverityColor(alert.severity)} variant="outline">
                            {alert.severity}
                          </Badge>
                          <span className="text-xs text-gray-500">{alert.time}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start" variant="outline">
                  <Ban className="w-4 h-4 mr-2" />
                  Suspend User
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Settings className="w-4 h-4 mr-2" />
                  System Settings
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Database className="w-4 h-4 mr-2" />
                  Database Backup
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Activity className="w-4 h-4 mr-2" />
                  View Logs
                </Button>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span>New user registered</span>
                    <span className="text-gray-500">2m ago</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Subscription upgraded</span>
                    <span className="text-gray-500">15m ago</span>
                  </div>
                  <div className="flex justify-between">
                    <span>System maintenance</span>
                    <span className="text-gray-500">1h ago</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Payment processed</span>
                    <span className="text-gray-500">2h ago</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
