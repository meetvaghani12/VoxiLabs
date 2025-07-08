
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Video, 
  Clock, 
  FileText, 
  HardDrive, 
  TrendingUp, 
  Eye, 
  Share2,
  Play,
  BarChart3
} from "lucide-react";
import { Link } from "react-router-dom";

const Analytics = () => {
  const stats = [
    { label: "Total Videos", value: "127", change: "+12%", icon: Video, color: "text-blue-600" },
    { label: "Generation Time", value: "45.2m", change: "-8%", icon: Clock, color: "text-green-600" },
    { label: "Words Used", value: "8,547", change: "+23%", icon: FileText, color: "text-purple-600" },
    { label: "Storage Used", value: "2.3 GB", change: "+15%", icon: HardDrive, color: "text-orange-600" }
  ];

  const topVideos = [
    { id: 1, title: "Product Demo 2024", views: 1247, shares: 34, duration: "2:45", type: "Demo" },
    { id: 2, title: "Tutorial: Getting Started", views: 892, shares: 28, duration: "4:12", type: "Tutorial" },
    { id: 3, title: "Company Introduction", views: 634, shares: 19, duration: "1:30", type: "Corporate" },
    { id: 4, title: "Feature Announcement", views: 521, shares: 15, duration: "3:20", type: "Announcement" },
    { id: 5, title: "Customer Testimonial", views: 387, shares: 12, duration: "2:15", type: "Testimonial" }
  ];

  const monthlyData = [
    { month: "Jan", videos: 8, words: 1200 },
    { month: "Feb", videos: 12, words: 1800 },
    { month: "Mar", videos: 15, words: 2300 },
    { month: "Apr", videos: 18, words: 2800 },
    { month: "May", videos: 22, words: 3200 },
    { month: "Jun", videos: 25, words: 3600 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50">
      {/* Navigation */}
      <nav className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                VOXILABS
              </span>
            </Link>
            
            <div className="flex items-center space-x-4">
              <Link to="/dashboard">
                <button className="px-4 py-2 text-gray-600 hover:text-gray-900">Dashboard</button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Analytics Dashboard</h1>
          <p className="text-gray-600">Track your video performance and usage statistics</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
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
          {/* Left Column - Charts and Trends */}
          <div className="lg:col-span-2 space-y-6">
            {/* Monthly Usage */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Monthly Usage
                </CardTitle>
                <CardDescription>Video creation and word usage over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {monthlyData.map((data, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm font-medium w-12">{data.month}</span>
                      <div className="flex-1 mx-4">
                        <div className="flex items-center space-x-2">
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full" 
                              style={{ width: `${(data.videos / 25) * 100}%` }}
                            />
                          </div>
                          <span className="text-sm text-gray-600 w-16">{data.videos} videos</span>
                        </div>
                      </div>
                      <span className="text-sm text-gray-500 w-20">{data.words} words</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Usage Quota */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle>Usage Quota</CardTitle>
                <CardDescription>Current plan limits and usage</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Words Used</span>
                    <span className="text-sm text-gray-600">8,547 / 10,000</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full" style={{ width: '85%' }} />
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Storage Used</span>
                    <span className="text-sm text-gray-600">2.3 GB / 5 GB</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full" style={{ width: '46%' }} />
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Videos This Month</span>
                    <span className="text-sm text-gray-600">25 / 50</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full" style={{ width: '50%' }} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Top Performing Videos */}
          <div className="space-y-6">
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Eye className="w-5 h-5 mr-2" />
                  Top Performing Videos
                </CardTitle>
                <CardDescription>Most viewed and shared content</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topVideos.map((video, index) => (
                    <div key={video.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-purple-100 to-blue-100 rounded flex items-center justify-center">
                        <Play className="w-4 h-4 text-purple-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {video.title}
                        </p>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            {video.type}
                          </Badge>
                          <span className="text-xs text-gray-500">{video.duration}</span>
                        </div>
                        <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                          <span className="flex items-center">
                            <Eye className="w-3 h-3 mr-1" />
                            {video.views}
                          </span>
                          <span className="flex items-center">
                            <Share2 className="w-3 h-3 mr-1" />
                            {video.shares}
                          </span>
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
                <button className="w-full text-left p-3 rounded-lg border hover:bg-gray-50 transition-colors">
                  <div className="text-sm font-medium">Export Analytics</div>
                  <div className="text-xs text-gray-500">Download detailed reports</div>
                </button>
                <button className="w-full text-left p-3 rounded-lg border hover:bg-gray-50 transition-colors">
                  <div className="text-sm font-medium">Upgrade Plan</div>
                  <div className="text-xs text-gray-500">Increase your limits</div>
                </button>
                <button className="w-full text-left p-3 rounded-lg border hover:bg-gray-50 transition-colors">
                  <div className="text-sm font-medium">View Billing</div>
                  <div className="text-xs text-gray-500">Manage subscription</div>
                </button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
