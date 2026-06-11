import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Tag, Calendar, Compass, Shield, ArrowRight } from 'lucide-react';
import api from '../../api/api';

const BRANDS = ['All', 'Toyota', 'Honda', 'Daihatsu', 'Tesla', 'BMW'];

export default function Home() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [searchVal, setSearchVal] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('All');

  const fetchListings = async () => {
    setLoading(true);
    try {
      // Build API query parameters. Always lock to vehicles category ("kendaraan")
      let query = '?category=kendaraan';
      
      const searchTerms = [];
      if (searchVal) searchTerms.push(searchVal);
      if (selectedBrand !== 'All') searchTerms.push(selectedBrand);
      
      if (searchTerms.length > 0) {
        query += `&search=${encodeURIComponent(searchTerms.join(' '))}`;
      }

      const response = await api.get(`/listings${query}`);
      if (response.data && response.data.success) {
        setListings(response.data.data);
      } else {
        setListings([]);
      }
      setError(null);
    } catch (err) {
      console.error('Failed to fetch listings:', err);
      setError('Could not connect to database. Please make sure the backend server is running.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchListings();
  }, [selectedBrand]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchListings();
  };

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center max-w-3xl mx-auto space-y-6 pt-4">
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
          Find Your <br />
          <span className="text-slate-500 font-normal">Dream Car Today</span>
        </h1>
        <p className="text-slate-500 text-lg leading-relaxed max-w-xl mx-auto">
          Browse quality vehicles from trusted listings.
        </p>
      </section>

      {/* Search & Brand Filter Panel */}
      <section className="max-w-4xl mx-auto space-y-6">
        {/* Search Bar */}
        <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-grow">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by model, brand, description..."
              className="input-minimal w-full pl-11"
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
            />
          </div>
          <button type="submit" className="btn-primary px-8">
            Search
          </button>
        </form>

        {/* Brand Tags */}
        <div className="flex items-center space-x-3.5 overflow-x-auto scrollbar-none justify-center">
          {BRANDS.map(brand => (
            <button
              key={brand}
              onClick={() => setSelectedBrand(brand)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold tracking-wide transition-smooth border ${
                (selectedBrand === brand)
                  ? 'bg-slate-900 border-slate-900 text-white'
                  : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
              }`}
            >
              {brand}
            </button>
          ))}
        </div>
      </section>

      {/* Car Listings Grid */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <h2 className="text-xl font-bold tracking-tight text-slate-900">Available Listings</h2>
          <span className="text-xs text-slate-400 font-medium">Showing {listings.length} vehicles</span>
        </div>

        {error && (
          <div className="p-4 bg-rose-50 border border-rose-100 rounded-lg text-sm text-rose-600 text-center max-w-md mx-auto">
            {error}
          </div>
        )}

        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="card-minimal animate-pulse space-y-4 p-4">
                <div className="aspect-[16/10] bg-slate-100 rounded-lg w-full" />
                <div className="h-5 bg-slate-100 rounded w-2/3" />
                <div className="h-4 bg-slate-100 rounded w-1/2" />
                <div className="h-4 bg-slate-100 rounded w-1/3" />
              </div>
            ))}
          </div>
        ) : listings.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {listings.map((car) => {
              const meta = car.metadata || {};
              const formattedPrice = typeof meta.price === 'number' 
                ? new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(meta.price)
                : meta.price || 'Contact Seller';

              return (
                <div key={car.id} className="card-minimal flex flex-col justify-between group">
                  <div>
                    {/* Image */}
                    <div className="aspect-[16/10] bg-slate-50 relative overflow-hidden border-b border-slate-100">
                      <img
                        src={car.imageUrl || 'https://images.unsplash.com/photo-1549317661-bd32c8ce0afa?w=600'}
                        alt={car.title}
                        className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = 'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=600';
                        }}
                      />
                    </div>

                    {/* Meta Specs */}
                    <div className="p-5 space-y-2">
                      <div className="flex items-center justify-between text-[11px] font-bold tracking-wider text-slate-400 uppercase">
                        <span>{meta.brand || 'Vehicle'}</span>
                        {meta.year && (
                          <span className="flex items-center">
                            <Calendar className="w-3 h-3 mr-1" />
                            {meta.year}
                          </span>
                        )}
                      </div>
                      
                      <h3 className="font-bold text-slate-800 line-clamp-1 group-hover:text-slate-900 transition-colors">
                        {car.title}
                      </h3>

                      <p className="text-slate-400 text-xs flex items-center">
                        <MapPin className="w-3.5 h-3.5 mr-1" />
                        {meta.location || 'Indonesia'}
                      </p>
                    </div>
                  </div>

                  {/* Pricing and Action */}
                  <div className="px-5 pb-5 pt-3 flex items-center justify-between border-t border-slate-50">
                    <span className="font-extrabold text-slate-900">{formattedPrice}</span>
                    <Link
                      to={`/listings/${car.id}`}
                      className="text-xs font-bold text-slate-700 hover:text-slate-900 flex items-center space-x-1 hover:translate-x-0.5 transition-transform"
                    >
                      <span>Details</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20 bg-white border border-slate-100 rounded-xl max-w-lg mx-auto space-y-4">
            <h3 className="font-bold text-lg text-slate-700">No cars found</h3>
            <p className="text-slate-400 text-sm max-w-xs mx-auto">We couldn't find any listings matching your parameters.</p>
          </div>
        )}
      </section>
    </div>
  );
}
