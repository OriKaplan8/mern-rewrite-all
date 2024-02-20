import React from 'react';
import Account from '../components/userDetails/Account';
import { AuthProvider, useAuth } from '../components/validation/AuthContext';
import Profile from '../components/userDetails/Profile';

// A wrapper component to consume the AuthContext
const AccountWrapper = () => {
  const { isAuthenticated } = useAuth(); // Use the useAuth hook to access the isAuthenticated value

  if (!isAuthenticated) {
    console.log('Not authenticated');
    console.log(isAuthenticated)
    // Optionally, redirect or return null
    // You might want to redirect to a login page if not authenticated
    // useNavigate() hook from react-router-dom can be used for redirection
    return <Account />; // Or any other placeholder you'd like to show
  }

  // If authenticated, render the Account component
  return <Profile />;
};

const Accounts = () => {
  return (
    <div>
      <AuthProvider> {/* Provide the auth context */}
        <AccountWrapper /> {/* Use the wrapper to conditionally render Account */}
      </AuthProvider>
    </div>
  );
};

export default Accounts;
