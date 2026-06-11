import React, { useContext, useEffect } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { Car } from 'lucide-react';
import { AuthContext } from '../contexts/AuthContext.jsx';

export default function PublicLayout() {
  const { isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    document.title = 'CarKi - Modern Car Marketplace';
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between">
      {/* Navigation */}
      <nav className="bg-white border-b border-slate-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2.5 group">
            <div className="w-9 h-9 bg-slate-900 rounded-lg flex items-center justify-center text-white transition-transform group-hover:scale-105">
              <Car className="w-5 h-5" />
            </div>
            <span className="font-bold text-lg tracking-tight text-slate-900">
              CarKi
            </span>
          </Link>
          
          {/* Navigation Links */}
          <div className="flex items-center space-x-8">
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                `text-sm font-semibold tracking-wide transition-smooth ${isActive ? 'text-slate-900 border-b-2 border-slate-900 pb-1' : 'text-slate-500 hover:text-slate-900'}`
              }
            >
              Home
            </NavLink>

            {isAuthenticated ? (
              <Link
                to="/admin/dashboard"
                className="text-sm font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 px-4 py-2 rounded-lg transition-smooth"
              >
                Dashboard
              </Link>
            ) : (
              <Link
                to="/admin/login"
                className="text-sm font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 px-4 py-2 rounded-lg transition-smooth"
              >
                Admin
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow max-w-7xl mx-auto w-full px-6 py-10">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-100 py-10 mt-auto text-slate-400 text-sm">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <Car className="w-4 h-4 text-slate-300" />
            <span className="font-semibold text-slate-700">CarKi</span>
            <span className="text-slate-300">|</span>
            <span>Modern Car Marketplace Platform</span>
          </div>
          <div>
            <p>&copy; 2026 CarKi. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
