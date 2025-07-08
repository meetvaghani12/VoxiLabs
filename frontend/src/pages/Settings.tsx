
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  User, 
  Key, 
  Bell, 
  CreditCard, 
  Eye, 
  EyeOff, 
  Settings as SettingsIcon,
  Shield,
  Download,
  Copy
} from "lucide-react";
import { Link } from "react-router-dom";

const Settings = () => {
  const [showApiKey, setShowApiKey] = useState(false);
  const [notifications, setNotifications] = useState({
    videoComplete: true,
    weeklyReport: true,
    securityAlerts: true,
    marketingEmails: false
  });

  const billingHistory = [
    { date: "2024-01-15", amount: "$29.00", plan: "Creator Plan", status: "Paid" },
    { date: "2023-12-15", amount: "$29.00", plan: "Creator Plan", status: "Paid" },
    { date: "2023-11-15", amount: "$29.00", plan: "Creator Plan", status: "Paid" }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-black rounded-lg flex items-center justify-center">
                <SettingsIcon className="w-5 h-5 text-white" />
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

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-black mb-2">Account Settings</h1>
          <p className="text-black/60">Manage your account preferences and billing</p>
        </div>

        <div className="space-y-8">
          {/* Profile Settings */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="w-5 h-5 mr-2" />
                Profile Information
              </CardTitle>
              <CardDescription>Update your personal details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-6">
                <Avatar className="w-20 h-20">
                  <AvatarFallback className="text-lg">JD</AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <Button variant="outline" size="sm">Change Photo</Button>
                  <p className="text-xs text-black/60">JPG, PNG up to 2MB</p>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" defaultValue="John" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" defaultValue="Doe" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue="john@example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">Company</Label>
                  <Input id="company" defaultValue="Acme Corp" />
                </div>
              </div>
              
              <Button>
                Save Changes
              </Button>
            </CardContent>
          </Card>

          {/* Security Settings */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="w-5 h-5 mr-2" />
                Security
              </CardTitle>
              <CardDescription>Manage your password and security preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input id="currentPassword" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input id="newPassword" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input id="confirmPassword" type="password" />
                </div>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-black/5 rounded-lg">
                <div>
                  <p className="font-medium">Two-Factor Authentication</p>
                  <p className="text-sm text-black/60">Add an extra layer of security</p>
                </div>
                <Button>Enable</Button>
              </div>
              
              <Button>Update Password</Button>
            </CardContent>
          </Card>

          {/* API Keys */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Key className="w-5 h-5 mr-2" />
                API Keys
              </CardTitle>
              <CardDescription>Manage your API keys for external integrations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-black/5 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">Production API Key</span>
                  <Badge variant="outline">Active</Badge>
                </div>
                <div className="flex items-center space-x-2">
                  <Input
                    type={showApiKey ? "text" : "password"}
                    value="sk_live_abcd1234567890..."
                    readOnly
                    className="flex-1"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowApiKey(!showApiKey)}
                  >
                    {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                  <Button variant="outline" size="sm">
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              <Button>Generate New Key</Button>
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="w-5 h-5 mr-2" />
                Notification Preferences
              </CardTitle>
              <CardDescription>Choose what notifications you want to receive</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(notifications).map(([key, enabled]) => (
                <div key={key} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium capitalize text-black">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </p>
                    <p className="text-sm text-black/60">
                      {key === 'videoComplete' && 'Get notified when your videos are ready'}
                      {key === 'weeklyReport' && 'Receive weekly usage and analytics reports'}
                      {key === 'securityAlerts' && 'Important security and account alerts'}
                      {key === 'marketingEmails' && 'Product updates and feature announcements'}
                    </p>
                  </div>
                  <button
                    onClick={() => setNotifications({...notifications, [key]: !enabled})}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      enabled ? 'bg-black' : 'bg-black/20'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        enabled ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Billing & Subscription */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center">
                <CreditCard className="w-5 h-5 mr-2" />
                Billing & Subscription
              </CardTitle>
              <CardDescription>Manage your subscription and billing history</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 bg-black/5 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-black">Creator Plan</p>
                    <p className="text-sm text-black/60">$29/month • Next billing: Feb 15, 2024</p>
                  </div>
                  <div className="space-x-2">
                    <Link to="/pricing">
                      <Button variant="outline" size="sm">Upgrade</Button>
                    </Link>
                    <Button variant="outline" size="sm">Manage</Button>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-4">Billing History</h4>
                <div className="space-y-3">
                  {billingHistory.map((bill, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-black/5 rounded-lg">
                      <div>
                        <p className="font-medium text-black">{bill.plan}</p>
                        <p className="text-sm text-black/60">{bill.date}</p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="font-medium text-black">{bill.amount}</span>
                        <Badge className="bg-black text-white">{bill.status}</Badge>
                        <Button variant="ghost" size="sm">
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Settings;
