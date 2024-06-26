// App.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './components/validation/AuthContext' // Adjust the import path to your AuthContext

import Layout from './pages/Layout';
import Home from './pages/Home';
import Accounts from './pages/AccountsPage';
import NoPage from './pages/NoPage';
import Turns from './pages/TurnsPage';
import Dashboard from './pages/Dashboard';


import './App.css';
import RequiresRewritePage from './pages/RequiresRewritePage';
import Creator from './pages/CreatorPage';
import JsonSelector from './pages/JsonSelector/JsonSelector';
import AnnotationRREC from './pages/AnnotationRREC/AnnotatorRREC';

const AppRoutes: React.FC = () => {
  const { isAuthenticated, loading } = useAuth();

  // Optionally handle loading state, e.g., showing a loading spinner
  if (loading) return <div>Loading...</div>;

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="account" element={<Accounts />} />
        <Route path="json-selector" element={<JsonSelector />} />
        <Route path="RREC-annotator" element={<AnnotationRREC />} />
        {/* Protect the Turns and Dashboard routes */}
       
        <Route path="require-rewrite" element={isAuthenticated ? <RequiresRewritePage /> : <Navigate replace to="/account" />} />
        <Route path="dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate replace to="/account" />} />
        <Route path="creator" element={isAuthenticated ? <Creator /> : <Navigate replace to="/account" />} />
        <Route path="*" element={<NoPage />} />
      </Route>
    </Routes>
  );
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
