import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import authService from "@/services/auth";

export const Navigation = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await authService.getCurrentUser();
        setIsAuthenticated(!!user);
      } catch (error) {
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  const handleLogout = async () => {
    try {
      await authService.logout();
      setIsAuthenticated(false);
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <nav className="flex items-center justify-between p-6 max-w-7xl mx-auto">
      <div className="flex items-center space-x-2">
        <Link to="/" className="text-xl font-bold text-black">
          VOXILABS
        </Link>
      </div>
      <div className="flex items-center space-x-4">
        {isAuthenticated ? (
          <>
            <Link to="/editor">
              <Button>Generate</Button>
            </Link>
            <Button variant="outline" onClick={handleLogout}>
              Logout
            </Button>
          </>
        ) : (
          <>
            <Link to="/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link to="/signup">
              <Button>Get Started Free</Button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}; 