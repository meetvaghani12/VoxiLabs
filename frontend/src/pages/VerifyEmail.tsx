import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import authService from "@/services/auth";

const VerifyEmail = () => {
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  if (!email) {
    navigate('/signup');
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (otp.length !== 6) {
      toast.error("Please enter a valid 6-digit code");
      return;
    }

    setIsLoading(true);

    try {
      await authService.verifyEmail(email, otp);
      toast.success("Email verified successfully!");
      navigate('/login');
    } catch (error: Error | unknown) {
      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as { response?: { data?: { message?: string } } };
        toast.error(axiosError.response?.data?.message || "Failed to verify email");
      } else {
        toast.error("Failed to verify email");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    try {
      await authService.resendOTP(email);
      toast.success("New verification code sent to your email");
    } catch (error: Error | unknown) {
      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as { response?: { data?: { message?: string } } };
        toast.error(axiosError.response?.data?.message || "Failed to resend code");
      } else {
        toast.error("Failed to resend code");
      }
    }
  };

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only allow numbers and limit to 6 digits
    if (value === '' || (/^\d+$/.test(value) && value.length <= 6)) {
      setOtp(value);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg border-0">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Verify Your Email</CardTitle>
          <CardDescription>
            We've sent a 6-digit verification code to {email}. Please enter it below.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Input
                type="text"
                inputMode="numeric"
                pattern="\d*"
                placeholder="Enter 6-digit code"
                value={otp}
                onChange={handleOtpChange}
                required
                disabled={isLoading}
                className="text-center text-3xl tracking-[0.75em] font-mono"
                maxLength={6}
                style={{ letterSpacing: '0.75em' }}
              />
            </div>
            <Button 
              type="submit" 
              className="w-full"
              disabled={isLoading || otp.length !== 6}
            >
              {isLoading ? "Verifying..." : "Verify Email"}
            </Button>
          </form>

          <div className="text-center">
            <p className="text-sm text-gray-500 mb-2">
              Didn't receive the code?
            </p>
            <Button
              variant="link"
              onClick={handleResendOTP}
              className="text-purple-600 hover:text-purple-700"
              disabled={isLoading}
            >
              Resend Code
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VerifyEmail; 