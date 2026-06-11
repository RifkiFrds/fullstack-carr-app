import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Layers, 
  ListCollapse, 
  ArrowUpRight, 
  MapPin,
  ClipboardList,
  Github,
  Linkedin,
  GraduationCap,
  User
} from 'lucide-react';
import api from '../../api/api';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalListings: 0,
    totalCategories: 0,
    latestListings: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [listingsRes, categoriesRes] = await Promise.all([
          api.get('/listings?limit=100'),
          api.get('/categories')
        ]);

        const listings = listingsRes.data?.success ? listingsRes.data.data : [];
        const categories = categoriesRes.data?.success ? categoriesRes.data.data : [];

        setStats({
          totalListings: listings.length,
          totalCategories: categories.length,
          latestListings: listings.slice(0, 5)
        });
      } catch (err) {
        console.error('Error fetching dashboard statistics:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const kpis = [
    { 
      label: 'Total Listings', 
      value: stats.totalListings, 
      detail: 'Across all categories', 
      icon: ClipboardList, 
      color: 'text-slate-900 bg-slate-100',
      link: '/admin/listings'
    },
    { 
      label: 'Total Categories', 
      value: stats.totalCategories, 
      detail: 'Read-only tags catalog', 
      icon: Layers, 
      color: 'text-indigo-600 bg-indigo-50',
      link: '/admin/categories'
    }
  ];

  return (
    <div className="space-y-10">
      {/* Header banner */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-950">Listing Webki Dashboard</h2>
          <p className="text-xs text-slate-400">Manage vehicle listings efficiently.</p>
        </div>
        <div className="flex items-center space-x-3">
          <Link to="/admin/listings" className="btn-secondary">
            <ListCollapse className="w-4 h-4 mr-2" />
            Manage Listings
          </Link>
        </div>
      </div>

      {/* KPIs Grid */}
      <div className="grid sm:grid-cols-2 gap-6">
        {kpis.map((kpi, i) => {
          const Icon = kpi.icon;
          return (
            <Link key={i} to={kpi.link} className="bg-white border border-slate-100 p-6 rounded-xl flex items-center justify-between shadow-sm hover:shadow-md transition-smooth">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{kpi.label}</span>
                <div className="text-2xl font-extrabold text-slate-900">{kpi.value}</div>
                <p className="text-[11px] text-slate-400">{kpi.detail}</p>
              </div>
              <div className={`p-3.5 rounded-lg ${kpi.color}`}>
                <Icon className="w-5 h-5" />
              </div>
            </Link>
          );
        })}
      </div>

      {/* Main Grid: Listings & Developer Profile Card */}
      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Latest Listings */}
        <div className="lg:col-span-7 bg-white border border-slate-100 rounded-xl shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-50 flex items-center justify-between">
            <h3 className="font-bold text-sm text-slate-900">Latest Listings</h3>
            <Link to="/admin/listings" className="text-xs font-semibold text-slate-500 hover:text-slate-900 flex items-center transition-colors">
              <span>View All</span>
              <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
            </Link>
          </div>

          {loading ? (
            <div className="p-6 space-y-4 animate-pulse">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-12 bg-slate-100 rounded" />
              ))}
            </div>
          ) : stats.latestListings.length > 0 ? (
            <div className="divide-y divide-slate-100">
              {stats.latestListings.map((item) => {
                const meta = item.metadata || {};
                const priceVal = meta.price || meta.salary || meta.ticketPrice || meta.pricePerMonth || meta.pricePerYear || 'N/A';
                const formattedPrice = typeof priceVal === 'number' 
                  ? new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(priceVal)
                  : priceVal;

                return (
                  <div key={item.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-9 rounded bg-slate-100 overflow-hidden flex-shrink-0 border border-slate-200/50">
                        <img 
                          src={item.imageUrl || 'https://images.unsplash.com/photo-1549317661-bd32c8ce0afa?w=120'} 
                          alt="" 
                          className="w-full h-full object-cover" 
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=120';
                          }}
                        />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm">{item.title}</h4>
                        <p className="text-slate-400 text-xs flex items-center mt-0.5">
                          <MapPin className="w-3 h-3 mr-1" />
                          {meta.location || 'N/A'}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-6">
                      <span className="font-bold text-slate-700 text-sm">{formattedPrice}</span>
                      <span className="text-[10px] font-bold text-indigo-500 bg-indigo-50 border border-indigo-100/30 px-2.5 py-0.5 rounded uppercase tracking-wider">
                        {item.category?.name || 'Item'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="p-12 text-center text-slate-400 text-sm">
              No listings found in the database. Go to Listing Management to create your first item.
            </div>
          )}
        </div>

        {/* Developer Profile Card */}
        <div className="lg:col-span-5 bg-white border border-slate-100 rounded-xl shadow-sm overflow-hidden p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-50 pb-4">
            <h3 className="font-bold text-sm text-slate-900 flex items-center">
              <User className="w-4 h-4 mr-2 text-slate-500" />
              Developer Profile
            </h3>
          </div>

          <div className="flex items-start space-x-4">
            <div className="w-16 h-16 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xl flex-shrink-0 border border-slate-200">
              MRF
            </div>
            <div className="space-y-1">
              <h4 className="font-bold text-slate-900 text-base">Muhamad Rifki Firdaus</h4>
              <p className="text-xs text-indigo-600 font-semibold">Frontend Developer & System Creator</p>
              <div className="text-[11px] text-slate-400 flex items-center pt-1">
                <GraduationCap className="w-3.5 h-3.5 mr-1 text-slate-400" />
                <span>Universitas Muhammadiyah Tangerang</span>
              </div>
            </div>
          </div>

          <p className="text-slate-500 text-xs leading-relaxed border-t border-slate-50 pt-4">
            Muhamad Rifki Firdaus is the creator and developer of CarKi and Listing Webki. This project was built as a modern vehicle marketplace platform with a responsive frontend, REST API backend, and dashboard management system.
          </p>

          <div className="flex gap-3 pt-2">
            <a 
              href="https://github.com/RifkiFrds" 
              target="_blank" 
              rel="noreferrer"
              className="btn-secondary flex-1 py-2 flex items-center justify-center space-x-2 text-xs font-bold"
            >
              <Github className="w-4 h-4 text-slate-700" />
              <span>GitHub</span>
            </a>
            <a 
              href="https://www.linkedin.com/in/rifkifrds" 
              target="_blank" 
              rel="noreferrer"
              className="btn-secondary flex-1 py-2 flex items-center justify-center space-x-2 text-xs font-bold"
            >
              <Linkedin className="w-4 h-4 text-slate-700" />
              <span>LinkedIn</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
