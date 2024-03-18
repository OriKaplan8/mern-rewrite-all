// AuthContext.tsx
import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import api from '../../api';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
  isAuthenticated: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyToken = async () => {
      const jwtToken = localStorage.getItem('jwtToken');
      if (jwtToken) {
        try {
          // Assuming Bearer function returns axios configuration with headers
          const config = { headers: { Authorization: `Bearer ${jwtToken}` } };
          await api.get('/auth/isjwtvalid', config);
          setIsAuthenticated(true);
        } catch (error) {
          localStorage.removeItem('jwtToken');
          setIsAuthenticated(false);
          
        }
      } else {
        
      }
      setLoading(false);
    };

    verifyToken();
  }, [navigate]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
