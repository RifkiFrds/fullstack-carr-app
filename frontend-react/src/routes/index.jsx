import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext.jsx';

// Import layouts
import PublicLayout from '../layouts/PublicLayout.jsx';
import AdminLayout from '../layouts/AdminLayout.jsx';

// Import public pages
import Home from '../pages/public/Home.jsx';
import CarDetail from '../pages/public/CarDetail.jsx';

// Import admin pages
import AdminLogin from '../pages/admin/Login.jsx';
import AdminDashboard from '../pages/admin/Dashboard.jsx';
import ListingManagement from '../pages/admin/ListingManagement.jsx';
import Categories from '../pages/admin/Categories.jsx';

export default function AppRoutes() {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <Routes>
      {/* Public Routes wrapped in PublicLayout */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/listings/:id" element={<CarDetail />} />
      </Route>

      {/* Admin Login - Standalone, redirects to dashboard if authenticated */}
      <Route path="/admin/login" element={
        isAuthenticated ? <Navigate to="/admin/dashboard" replace /> : <AdminLogin />
      } />

      {/* Admin Management Routes wrapped in AdminLayout */}
      <Route path="/admin" element={
        isAuthenticated ? <AdminLayout /> : <Navigate to="/admin/login" replace />
      }>
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="listings" element={<ListingManagement />} />
        <Route path="categories" element={<Categories />} />
        
        {/* Index fallback for /admin */}
        <Route index element={<Navigate to="dashboard" replace />} />
      </Route>

      {/* Catch-all redirect to Home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
