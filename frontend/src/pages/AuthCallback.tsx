import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'sonner';

const AuthCallback = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get('token');
    const error = searchParams.get('error');

    if (error) {
      toast.error(decodeURIComponent(error));
      navigate('/login');
      return;
    }

    if (!token) {
      toast.error('No authentication token received');
      navigate('/login');
      return;
    }

    // Store the token
    localStorage.setItem('token', token);

    toast.success('Successfully logged in with Google!');
    navigate('/dashboard');
  }, [navigate, location]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
        <h2 className="text-2xl font-bold mb-4">Completing Authentication...</h2>
        <p className="text-gray-600">Please wait while we finish setting up your account.</p>
      </div>
    </div>
  );
};

export default AuthCallback; 