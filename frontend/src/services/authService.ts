const TOKEN_KEY = 'auth_token';

export const getAuthToken = (): string | null => {
  try {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) return null;
    
    // Verify token format (should be a non-empty string)
    if (typeof token !== 'string' || token.trim() === '') {
      removeAuthToken();
      return null;
    }

    return token;
  } catch (error) {
    console.error('Error reading auth token:', error);
    return null;
  }
};

export const setAuthToken = (token: string): void => {
  try {
    if (!token || typeof token !== 'string' || token.trim() === '') {
      throw new Error('Invalid token format');
    }
    localStorage.setItem(TOKEN_KEY, token);
  } catch (error) {
    console.error('Error setting auth token:', error);
    removeAuthToken();
  }
};

export const removeAuthToken = (): void => {
  try {
    localStorage.removeItem(TOKEN_KEY);
  } catch (error) {
    console.error('Error removing auth token:', error);
  }
};

export const isAuthenticated = (): boolean => {
  return !!getAuthToken();
}; 