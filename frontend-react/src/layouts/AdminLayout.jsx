import React, { useContext, useState, useEffect } from 'react';
import { NavLink, Link, Outlet, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  LogOut, 
  Home, 
  Menu, 
  X, 
  Car,
  Bell,
  SlidersHorizontal,
  Layers
} from 'lucide-react';
import { AuthContext } from '../contexts/AuthContext.jsx';
import Cookies from 'js-cookie';

export default function AdminLayout() {
  const { setIsAuthenticated } = useContext(AuthContext);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Listing Webki Dashboard';
  }, []);

  const handleLogout = () => {
    Cookies.remove('token');
    setIsAuthenticated(false);
    navigate('/admin/login');
  };

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/admin/dashboard' },
    { icon: SlidersHorizontal, label: 'Listings', path: '/admin/listings' },
    { icon: Layers, label: 'Categories', path: '/admin/categories' }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex">
      {/* Sidebar for Desktop */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200/80 flex flex-col justify-between transform transition-transform duration-200 md:translate-x-0 md:static ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div>
          {/* Header */}
          <div className="h-16 flex items-center justify-between px-6 border-b border-slate-100">
            <Link to="/admin/dashboard" className="flex items-center space-x-2.5">
              <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center text-white font-bold text-xs tracking-wider">
                LW
              </div>
              <span className="font-bold text-sm tracking-wide text-slate-900">
                Listing Webki
              </span>
            </Link>
            <button 
              className="md:hidden text-slate-400 hover:text-slate-900"
              onClick={() => setIsSidebarOpen(false)}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Items */}
          <nav className="p-4 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) => 
                    `flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-semibold transition-smooth ${
                      isActive 
                        ? 'bg-slate-900 text-white shadow-sm' 
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`
                  }
                >
                  <Icon className="w-4.5 h-4.5" />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-slate-100 space-y-1">
          <Link 
            to="/" 
            className="flex items-center space-x-3 px-4 py-2.5 rounded-lg text-sm font-semibold text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-smooth"
          >
            <Home className="w-4.5 h-4.5" />
            <span>Go to Site</span>
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg text-sm font-semibold text-rose-600 hover:bg-rose-50 hover:text-rose-700 transition-smooth text-left"
          >
            <LogOut className="w-4.5 h-4.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Mobile Drawer Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-slate-900/20 backdrop-blur-sm md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Container */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="h-16 bg-white border-b border-slate-200/80 sticky top-0 z-30 flex items-center justify-between px-6">
          <div className="flex items-center space-x-4">
            <button 
              className="md:hidden text-slate-500 hover:text-slate-900"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="text-sm font-bold uppercase tracking-wider text-slate-400">Management Dashboard</h1>
          </div>

          <div className="flex items-center space-x-4">
            <button className="p-2 text-slate-400 hover:text-slate-600 rounded-full transition-smooth">
              <Bell className="w-5 h-5" />
            </button>
            <div className="h-6 w-px bg-slate-200" />
            <div className="flex items-center space-x-2">
              <div className="w-7 h-7 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs">
                A
              </div>
              <span className="hidden sm:inline text-xs font-semibold text-slate-600">Administrator</span>
            </div>
          </div>
        </header>

        {/* Content Panel */}
        <main className="flex-grow p-6 md:p-10 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>

        {/* Admin Footer */}
        <footer className="bg-white border-t border-slate-200/80 py-4 px-6 text-center text-slate-400 text-xs flex flex-col sm:flex-row justify-between items-center gap-2">
          <span>Powered by Listing Webki</span>
          <span>Built with ❤️ by Muhamad Rifki Firdaus</span>
        </footer>
      </div>
    </div>
  );
}
