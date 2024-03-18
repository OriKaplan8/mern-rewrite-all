import React, { useEffect } from 'react';
import api from '../../api';
import { useNavigate } from 'react-router-dom';
import Bearer from './Bearer';

const UserCheck = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkToken = async () => {
      const jwtToken = localStorage.getItem('jwtToken');
      if (jwtToken) {
        const config = Bearer();
        try {
          await api.get('/auth/isjwtvalid', config)
          
          
          // If the token is valid, you might not need to do anything here
          // Or you can navigate to a dashboard or home page
        }
         catch (error) {
          // If the token is invalid or the request fails, redirect to login
          localStorage.removeItem('jwtToken'); // Consider removing the token if it's invalid
          navigate('/account');
          
        }
      } else {
        navigate('/account'); // Redirect to login page if token is not found
        
      }
    };

    checkToken();
  }, [navigate]); // Dependency array to ensure effect runs once or when navigate changes

  return null; // This component does not render anything
};

export default UserCheck;
