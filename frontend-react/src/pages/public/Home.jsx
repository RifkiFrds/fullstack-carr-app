import React from 'react';
import { ArrowRight, Zap, Shield, Rocket } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
    const features = [
        {
            icon: Zap,
            title: 'Lightning Fast',
            description: 'Built with modern technologies for exceptional performance'
        },
        {
            icon: Shield,
            title: 'Secure',
            description: 'Enterprise-grade security with encrypted data handling'
        },
        {
            icon: Rocket,
            title: 'Scalable',
            description: 'Ready to grow with your business needs'
        }
    ];

    return (
        <div className="min-h-screen gradient-bg text-white">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-0 left-0 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
                <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
            </div>

            {/* Navigation */}
            <nav className="relative z-10 backdrop-blur-md bg-white/5 border-b border-white/10">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <Rocket className="w-8 h-8" />
                        <span className="text-2xl font-bold">Fullstack Project</span>
                    </div>
                    <div className="flex items-center space-x-4">
                        <Link
                            to="/login"
                            className="glass px-6 py-2 rounded-lg hover:bg-white/20 transition-smooth"
                        >
                            Sign In
                        </Link>
                        <Link
                            to="/register"
                            className="glass px-6 py-2 rounded-lg bg-white/20 hover:bg-white/30 transition-smooth"
                        >
                            Sign Up
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative z-10 max-w-7xl mx-auto px-6 py-20 md:py-32">
                <div className="text-center space-y-8">
                    {/* Badge */}
                    <div className="inline-block">
                        <div className="glass px-4 py-2 rounded-full text-sm font-medium">
                            ✨ Welcome to the future of web development
                        </div>
                    </div>

                    {/* Main Heading */}
                    <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                        Build Amazing<br />
                        <span className="bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 bg-clip-text text-transparent">
                            Full Stack Apps
                        </span>
                    </h1>

                    {/* Subheading */}
                    <p className="text-xl text-white/70 max-w-2xl mx-auto">
                        Experience a modern, clean, and intuitive interface built with React, Express, and cutting-edge web technologies.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
                        <Link
                            to="/register"
                            className="glass px-8 py-4 rounded-lg font-semibold group hover:bg-white/20 transition-smooth flex items-center space-x-2"
                        >
                            <span>Get Started</span>
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <button className="glass px-8 py-4 rounded-lg font-semibold hover:bg-white/20 transition-smooth border border-white/20">
                            Watch Demo
                        </button>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="relative z-10 max-w-7xl mx-auto px-6 py-20">
                <h2 className="text-4xl font-bold text-center mb-16">Why Choose Us?</h2>
                <div className="grid md:grid-cols-3 gap-8">
                    {features.map((feature, idx) => {
                        const Icon = feature.icon;
                        return (
                            <div key={idx} className="glass p-8 rounded-2xl hover:bg-white/20 transition-smooth group">
                                <div className="mb-4 inline-block p-3 glass rounded-lg group-hover:bg-white/20">
                                    <Icon className="w-8 h-8" />
                                </div>
                                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                                <p className="text-white/70">{feature.description}</p>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* Stats Section */}
            <section className="relative z-10 max-w-7xl mx-auto px-6 py-20">
                <div className="glass rounded-2xl p-12 md:p-16">
                    <div className="grid md:grid-cols-3 gap-8 text-center">
                        <div>
                            <p className="text-4xl font-bold mb-2">10K+</p>
                            <p className="text-white/70">Active Users</p>
                        </div>
                        <div>
                            <p className="text-4xl font-bold mb-2">99.9%</p>
                            <p className="text-white/70">Uptime</p>
                        </div>
                        <div>
                            <p className="text-4xl font-bold mb-2">24/7</p>
                            <p className="text-white/70">Support</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="relative z-10 border-t border-white/10 backdrop-blur-md bg-white/5">
                <div className="max-w-7xl mx-auto px-6 py-12">
                    <div className="grid md:grid-cols-4 gap-8 mb-8">
                        <div>
                            <h3 className="font-semibold mb-4">Product</h3>
                            <ul className="space-y-2 text-white/70">
                                <li><a href="#" className="hover:text-white transition-smooth">Features</a></li>
                                <li><a href="#" className="hover:text-white transition-smooth">Pricing</a></li>
                                <li><a href="#" className="hover:text-white transition-smooth">Security</a></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-4">Company</h3>
                            <ul className="space-y-2 text-white/70">
                                <li><a href="#" className="hover:text-white transition-smooth">About</a></li>
                                <li><a href="#" className="hover:text-white transition-smooth">Blog</a></li>
                                <li><a href="#" className="hover:text-white transition-smooth">Careers</a></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-4">Resources</h3>
                            <ul className="space-y-2 text-white/70">
                                <li><a href="#" className="hover:text-white transition-smooth">Docs</a></li>
                                <li><a href="#" className="hover:text-white transition-smooth">API</a></li>
                                <li><a href="#" className="hover:text-white transition-smooth">Support</a></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-4">Legal</h3>
                            <ul className="space-y-2 text-white/70">
                                <li><a href="#" className="hover:text-white transition-smooth">Privacy</a></li>
                                <li><a href="#" className="hover:text-white transition-smooth">Terms</a></li>
                                <li><a href="#" className="hover:text-white transition-smooth">Contact</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-white/10 pt-8 text-center text-white/50">
                        <p>&copy; 2025 AppName. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
