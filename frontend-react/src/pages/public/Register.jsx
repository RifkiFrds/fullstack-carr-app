import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, User, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../../api/api'

export default function Register() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [validation, setValidation] = useState([]);
    const [loading, setLoading] = useState(false);

    const register = async (e) => {
        e.preventDefault();
        setLoading(true);

        await api.post('/api/register', {
            name: name,
            email: email,
            password: password,
        })
            .then(() => {
                navigate("/login");
            })
            .catch(error => {
                setValidation(error.response?.data || { errors: [{ msg: 'Registration failed' }] });
                setLoading(false);
            })
    };

    return (
        <div className="min-h-screen gradient-bg flex items-center justify-center p-4">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
            </div>

            {/* Register Card */}
            <div className="relative w-full max-w-md z-10">
                {/* Glass Card */}
                <div className="glass rounded-2xl p-8 shadow-2xl">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
                        <p className="text-white/70">Join us and get started</p>
                    </div>

                    {/* Error Messages */}
                    {validation.errors && validation.errors.length > 0 && (
                        <div className="mb-4 p-4 glass rounded-lg border border-red-400/50 bg-red-500/10">
                            <div className="flex items-start space-x-3">
                                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                                <div className="space-y-1">
                                    {validation.errors.map((error, index) => (
                                        <p key={index} className="text-sm text-red-300">
                                            {error.path}: {error.msg}
                                        </p>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={register} className="space-y-4">
                        {/* Full Name Input */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-white/80">Full Name</label>
                            <div className="relative">
                                <User className="absolute left-3 top-3 w-5 h-5 text-white/50" />
                                <input
                                    type="text"
                                    placeholder="Enter your full name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="input-glass pl-10"
                                    required
                                />
                            </div>
                        </div>

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
                                    placeholder="Create a strong password"
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

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="btn-glass w-full bg-white/20 hover:bg-white/30 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg mt-6 transition-smooth"
                        >
                            {loading ? 'Creating Account...' : 'Create Account'}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-white/20"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 text-white/50 bg-transparent">Already have an account?</span>
                        </div>
                    </div>

                    {/* Sign In Link */}
                    <p className="text-center text-white/70 text-sm">
                        <Link to="/login" className="text-white font-semibold hover:text-white/90 transition-smooth">
                            Sign in here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
