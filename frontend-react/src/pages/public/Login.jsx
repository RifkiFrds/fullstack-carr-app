import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../api/api';

export default function Login() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [validation, setValidation] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        await api.post('/api/login', {
            email: email,
            password: password,
        })
            .then((response) => {
                localStorage.setItem('token', response.data.token);
                navigate("/admin/dashboard");
            })
            .catch(error => {
                setValidation(error.response?.data?.errors || [{ msg: 'Login failed' }]);
                setLoading(false);
            })
    };

    return (
        <div className="min-h-screen gradient-bg flex items-center justify-center p-4">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-0 left-0 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
            </div>

            {/* Login Card */}
            <div className="relative w-full max-w-md z-10">
                {/* Glass Card */}
                <div className="glass rounded-2xl p-8 shadow-2xl">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
                        <p className="text-white/70">Sign in to your account</p>
                    </div>

                    {/* Error Messages */}
                    {validation.length > 0 && (
                        <div className="mb-4 p-4 glass rounded-lg border border-red-400/50 bg-red-500/10">
                            <div className="flex items-start space-x-3">
                                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                                <div className="space-y-1">
                                    {validation.map((error, index) => (
                                        <p key={index} className="text-sm text-red-300">
                                            {error.msg}
                                        </p>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Email Input */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-white/80">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-3 w-5 h-5 text-white/50" />
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="input-glass pl-10"
                                    required
                                />
                            </div>
                        </div>

                        {/* Password Input */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-white/80">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-3 w-5 h-5 text-white/50" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="input-glass pl-10 pr-10"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-3 text-white/50 hover:text-white/80 transition-smooth"
                                >
                                    {showPassword ? (
                                        <EyeOff className="w-5 h-5" />
                                    ) : (
                                        <Eye className="w-5 h-5" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Remember & Forgot Password */}
                        <div className="flex items-center justify-between text-sm">
                            <label className="flex items-center cursor-pointer">
                                <input type="checkbox" className="w-4 h-4 rounded" />
                                <span className="ml-2 text-white/70">Remember me</span>
                            </label>
                            <Link to="#" className="text-white/70 hover:text-white transition-smooth">
                                Forgot password?
                            </Link>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="btn-glass w-full bg-white/20 hover:bg-white/30 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg mt-6 transition-smooth"
                        >
                            {loading ? 'Signing In...' : 'Sign In'}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-white/20"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 text-white/50 bg-transparent">Or continue with</span>
                        </div>
                    </div>

                    {/* Social Buttons */}
                    <div className="grid grid-cols-2 gap-4">
                        <button type="button" className="glass py-2 rounded-lg text-white/80 hover:bg-white/20 transition-smooth text-sm font-medium">
                            Google
                        </button>
                        <button type="button" className="glass py-2 rounded-lg text-white/80 hover:bg-white/20 transition-smooth text-sm font-medium">
                            GitHub
                        </button>
                    </div>

                    {/* Footer */}
                    <p className="text-center text-white/70 text-sm mt-6">
                        Don't have an account?{' '}
                        <Link to="/register" className="text-white font-semibold hover:text-white/90 transition-smooth">
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
