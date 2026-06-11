import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, Mail, Eye, EyeOff, ShieldAlert, ArrowLeft } from 'lucide-react';
import { AuthContext } from '../../contexts/AuthContext.jsx';
import api from '../../api/api';
import Cookies from 'js-cookie';

export default function AdminLogin() {
  const navigate = useNavigate();
  const { setIsAuthenticated } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  
  // Set default credentials matching seed data for easy admin login
  const [email, setEmail] = useState('admin@platform.com');
  const [password, setPassword] = useState('admin123');
  
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const response = await api.post('/auth/login', { email, password });
      
      const token = response.data?.token || response.data?.data?.token;
      
      if (token) {
        // Save token in cookie
        Cookies.set('token', token, { expires: 1 });
        setIsAuthenticated(true);
        navigate('/admin/dashboard');
      } else {
        setErrorMsg('Authentication failed: Token not found.');
      }
    } catch (err) {
      console.error('Login error:', err);
      if (err.response && err.response.data && err.response.data.message) {
        setErrorMsg(err.response.data.message);
      } else {
        setErrorMsg('Unable to connect to the login service. Make sure the backend is running.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <div>
          <Link to="/" className="inline-flex items-center text-xs font-semibold text-slate-400 hover:text-slate-800 transition-smooth">
            <ArrowLeft className="w-4 h-4 mr-1.5" />
            Back to Public Site
          </Link>
        </div>

        <div className="bg-white border border-slate-100 rounded-xl p-8 shadow-sm space-y-6">
          <div className="text-center space-y-2">
            <div className="inline-flex p-3 bg-slate-100 rounded-lg text-slate-900 mb-2">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-slate-950">Admin Console</h1>
            <p className="text-xs text-slate-400">Authenticate to access listings command board</p>
          </div>

          {errorMsg && (
            <div className="p-3 bg-rose-50 border border-rose-100 rounded-lg text-xs text-rose-600">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-minimal w-full pl-10"
                  placeholder="admin@platform.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-minimal w-full pl-10 pr-10"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-2.5 mt-6"
            >
              {loading ? 'Authenticating...' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
