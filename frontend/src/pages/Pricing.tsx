
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, X, Star, Zap, Crown, IndianRupeeIcon } from "lucide-react";
import { Link } from "react-router-dom";

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(false);

  const plans = [
    {
      name: "Free",
      icon: Star,
      price: { monthly: 0, annual: 0 },
      description: "Perfect for getting started",
      features: [
        "50 words per month",
        "Basic AI voices",
        "720p video quality",
        "Watermark included",
        "Standard generation speed",
        "Email support"
      ],
      limitations: [
        "Limited voice selection",
        "No custom avatars",
        "No team collaboration"
      ],
      popular: false,
      cta: "Get Started Free"
    },
    {
      name: "Creator",
      icon: Zap,
      price: { monthly: 29, annual: 24 },
      description: "For content creators and small businesses",
      features: [
        "2,000 words per month",
        "Premium AI voices",
        "1080p video quality", 
        "No watermark",
        "Priority generation",
        "Custom voice cloning",
        "Basic avatars",
        "Email & chat support"
      ],
      limitations: [
        "Limited team members (3)",
        "Standard video templates"
      ],
      popular: true,
      cta: "Start Creating"
    },
    {
      name: "Pro",
      icon: Crown,
      price: { monthly: 79, annual: 65 },
      description: "For agencies and power users",
      features: [
        "10,000 words per month",
        "All premium voices",
        "4K video quality",
        "No watermark",
        "Fastest generation",
        "Unlimited voice cloning",
        "Premium avatars",
        "Team collaboration (10 members)",
        "Custom branding",
        "API access",
        "Priority support"
      ],
      limitations: [],
      popular: false,
      cta: "Go Pro"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50">
      {/* Navigation */}
      <nav className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-gradient-to-r from-black to-blue-600 rounded-lg flex items-center justify-center">
                <IndianRupeeIcon className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-black">
                VOXILABS
              </span>
            </Link>
            
            <div className="flex items-center space-x-4">
              <Link to="/dashboard">
                <Button variant="ghost">Dashboard</Button>
              </Link>
              <Link to="/login">
                <Button>Sign In</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Your Plan
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Start free, upgrade as you grow
          </p>
          
          {/* Billing Toggle */}
          <div className="flex items-center justify-center space-x-4 mb-8">
            <span className={`text-sm ${!isAnnual ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
              Monthly
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                isAnnual ? 'bg-purple-600' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  isAnnual ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <span className={`text-sm ${isAnnual ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
              Annual
            </span>
            {isAnnual && (
              <Badge className="bg-green-100 text-green-700">
                Save 20%
              </Badge>
            )}
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan) => {
            const Icon = plan.icon;
            const price = isAnnual ? plan.price.annual : plan.price.monthly;
            
            return (
              <Card key={plan.name} className={`relative border-0 shadow-lg ${
                plan.popular ? 'ring-2 ring-purple-600 transform scale-105' : ''
              }`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-purple-600 text-white px-4 py-1">
                      Most Popular
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto w-12 h-12 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-purple-600" />
                  </div>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">${price}</span>
                    {price > 0 && (
                      <span className="text-gray-500">
                        /{isAnnual ? 'year' : 'month'}
                      </span>
                    )}
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  <ul className="space-y-3">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <Check className="w-4 h-4 text-green-600 mr-3 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                    {plan.limitations.map((limitation, index) => (
                      <li key={index} className="flex items-center text-gray-500">
                        <X className="w-4 h-4 text-gray-400 mr-3 flex-shrink-0" />
                        <span className="text-sm">{limitation}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    className={`w-full ${
                      plan.popular 
                        ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700' 
                        : ''
                    }`}
                    variant={plan.popular ? 'default' : 'outline'}
                  >
                    {plan.cta}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* FAQ Section */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 mb-8">
            Need help choosing the right plan? <Link to="/contact" className="text-purple-600 hover:underline">Contact us</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
