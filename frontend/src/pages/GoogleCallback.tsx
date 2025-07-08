import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import authService from '@/services/auth';
import { toast } from 'sonner';

const GoogleCallback = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Get the authorization code from URL search params
        const searchParams = new URLSearchParams(location.search);
        const code = searchParams.get('code');

        if (!code) {
          console.error('No authorization code found in URL');
          toast.error('Authentication failed: No authorization code');
          navigate('/login');
          return;
        }

        console.log('Received auth code:', code);

        // Exchange code for tokens
        const response = await authService.googleLogin(code);
        console.log('Google login response:', response);

        toast.success('Successfully logged in with Google!');
        navigate('/dashboard');
      } catch (error: any) {
        console.error('Google callback error:', error);
        toast.error(error.response?.data?.message || 'Failed to authenticate with Google');
        navigate('/login');
      }
    };

    handleCallback();
  }, [navigate, location]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
        <h2 className="text-2xl font-bold mb-4">Authenticating...</h2>
        <p className="text-gray-600">Please wait while we complete your Google sign-in.</p>
      </div>
    </div>
  );
};

export default GoogleCallback; 