
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Video, 
  Clock, 
  FileText, 
  HardDrive, 
  TrendingUp, 
  Eye, 
  Share2,
  Play,
  BarChart3,
  LayoutDashboard
} from "lucide-react";
import { Link } from "react-router-dom";

const Analytics = () => {
  const stats = [
    { label: "Total Videos", value: "127", change: "+12%", icon: Video },
    { label: "Generation Time", value: "45.2m", change: "-8%", icon: Clock },
    { label: "Words Used", value: "8,547", change: "+23%", icon: FileText },
    { label: "Storage Used", value: "2.3 GB", change: "+15%", icon: HardDrive }
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
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-5 h-5 sm:w-6 sm:h-6 bg-black rounded-lg flex items-center justify-center">
                <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <span className="text-lg sm:text-xl font-bold text-black">
                VOXILABS
              </span>
            </Link>
            
            <div className="flex items-center space-x-4">
              <Link to="/dashboard">
                <Button className="bg-black text-white hover:bg-gray-800 flex items-center gap-2 text-sm sm:text-base py-2 px-3 sm:px-4">
                  <LayoutDashboard className="w-4 h-4" />
                  Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-black mb-2">Analytics Dashboard</h1>
          <p className="text-sm sm:text-base text-black/60">Track your video performance and usage statistics</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            const isPositive = stat.change.startsWith('+');
            
            return (
              <Card key={index} className="border-0 shadow-sm">
                <CardContent className="p-3 sm:p-6">
                  <div className="flex items-center justify-between mb-2">
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-black" />
                    <Badge variant={isPositive ? "default" : "secondary"} className="text-xs">
                      {stat.change}
                    </Badge>
                  </div>
                  <p className="text-lg sm:text-2xl font-bold text-black">{stat.value}</p>
                  <p className="text-xs sm:text-sm text-black/60">{stat.label}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Left Column - Charts and Trends */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            {/* Monthly Usage */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center text-lg sm:text-xl">
                  <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  Monthly Usage
                </CardTitle>
                <CardDescription className="text-sm">Video creation and word usage over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 sm:space-y-4">
                  {monthlyData.map((data, index) => (
                    <div key={index} className="flex items-center justify-between text-sm">
                      <span className="font-medium w-8 sm:w-12">{data.month}</span>
                      <div className="flex-1 mx-2 sm:mx-4">
                        <div className="flex items-center space-x-2">
                          <div className="flex-1 bg-black/10 rounded-full h-1.5 sm:h-2">
                            <div 
                              className="bg-black h-1.5 sm:h-2 rounded-full" 
                              style={{ width: `${(data.videos / 25) * 100}%` }}
                            />
                          </div>
                          <span className="text-black/60 w-14 sm:w-16">{data.videos} videos</span>
                        </div>
                      </div>
                      <span className="text-black/60 w-16 sm:w-20">{data.words} words</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Usage Quota */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl">Usage Quota</CardTitle>
                <CardDescription className="text-sm">Current plan limits and usage</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 sm:space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-black">Words Used</span>
                    <span className="text-xs sm:text-sm text-black/60">8,547 / 10,000</span>
                  </div>
                  <div className="w-full bg-black/10 rounded-full h-1.5 sm:h-2">
                    <div className="bg-black h-1.5 sm:h-2 rounded-full" style={{ width: '85%' }} />
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-black">Storage Used</span>
                    <span className="text-xs sm:text-sm text-black/60">2.3 GB / 5 GB</span>
                  </div>
                  <div className="w-full bg-black/10 rounded-full h-1.5 sm:h-2">
                    <div className="bg-black h-1.5 sm:h-2 rounded-full" style={{ width: '46%' }} />
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-black">Videos This Month</span>
                    <span className="text-xs sm:text-sm text-black/60">25 / 50</span>
                  </div>
                  <div className="w-full bg-black/10 rounded-full h-1.5 sm:h-2">
                    <div className="bg-black h-1.5 sm:h-2 rounded-full" style={{ width: '50%' }} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Top Performing Videos */}
          <div>
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center text-lg sm:text-xl">
                  <Eye className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  Top Performing Videos
                </CardTitle>
                <CardDescription className="text-sm">Most viewed and shared content</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 sm:space-y-4">
                  {topVideos.map((video, index) => (
                    <div key={video.id} className="flex items-start space-x-3 p-2 sm:p-3 bg-black/5 rounded-lg">
                      <div className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 bg-black/10 rounded flex items-center justify-center">
                        <Play className="w-3 h-3 sm:w-4 sm:h-4 text-black" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs sm:text-sm font-medium text-black truncate">
                          {video.title}
                        </p>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge variant="outline" className="text-[10px] sm:text-xs">
                            {video.type}
                          </Badge>
                          <span className="text-[10px] sm:text-xs text-black/60">{video.duration}</span>
                        </div>
                        <div className="flex items-center space-x-4 mt-1 sm:mt-2 text-[10px] sm:text-xs text-black/60">
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
            <Card className="border-0 shadow-sm mt-4 sm:mt-6">
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 sm:space-y-3">
                <button className="w-full text-left p-2 sm:p-3 rounded-lg border hover:bg-black/5 transition-colors">
                  <div className="text-xs sm:text-sm font-medium text-black">Export Analytics</div>
                  <div className="text-[10px] sm:text-xs text-black/60">Download detailed reports</div>
                </button>
                <button className="w-full text-left p-2 sm:p-3 rounded-lg border hover:bg-black/5 transition-colors">
                  <div className="text-xs sm:text-sm font-medium text-black">Upgrade Plan</div>
                  <div className="text-[10px] sm:text-xs text-black/60">Increase your limits</div>
                </button>
                <button className="w-full text-left p-2 sm:p-3 rounded-lg border hover:bg-black/5 transition-colors">
                  <div className="text-xs sm:text-sm font-medium text-black">View Billing</div>
                  <div className="text-[10px] sm:text-xs text-black/60">Manage subscription</div>
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
