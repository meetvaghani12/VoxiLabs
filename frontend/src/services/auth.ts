import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth'; // Backend server URL

export interface SignupData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone?: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    image?: string;
  };
}

const authService = {
  async signup(data: SignupData): Promise<{ message: string; email: string }> {
    const response = await axios.post(`${API_URL}/register`, data);
    return {
      message: response.data.message,
      email: data.email
    };
  },

  async verifyEmail(email: string, otp: string): Promise<{ message: string }> {
    const response = await axios.post(`${API_URL}/verify-email`, { email, otp });
    return response.data;
  },

  async resendOTP(email: string): Promise<{ message: string }> {
    const response = await axios.post(`${API_URL}/resend-otp`, { email });
    return response.data;
  },

  async login(data: LoginData): Promise<AuthResponse> {
    const response = await axios.post(`${API_URL}/login`, data);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  async googleLogin(code: string): Promise<AuthResponse> {
    const response = await axios.post(`${API_URL}/google/callback`, { code });
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  async initiateGoogleAuth(): Promise<string> {
    const response = await axios.get(`${API_URL}/google`);
    return response.data.authUrl;
  },

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getCurrentUser(): AuthResponse['user'] | null {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  getToken(): string | null {
    return localStorage.getItem('token');
  },

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
};

export default authService; 