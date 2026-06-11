import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Tag, Grid, List, Compass, Star } from 'lucide-react';

const MOCK_LISTINGS = [
  {
    id: 1,
    title: 'Tesla Model S Plaid',
    category: 'Automotive',
    price: '$89,990',
    location: 'Los Angeles, CA',
    rating: 4.9,
    reviews: 18,
    image: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=400',
    tag: 'Featured'
  },
  {
    id: 2,
    title: 'Modern Minimalist Villa',
    category: 'Real Estate',
    price: '$1,250,000',
    location: 'Miami, FL',
    rating: 5.0,
    reviews: 24,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=400',
    tag: 'Exclusive'
  },
  {
    id: 3,
    title: 'MacBook Pro 16" M3 Max',
    category: 'Electronics',
    price: '$3,499',
    location: 'San Francisco, CA',
    rating: 4.8,
    reviews: 42,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=400',
    tag: 'Trending'
  },
  {
    id: 4,
    title: 'Hasselblad X2D 100C',
    category: 'Electronics',
    price: '$8,199',
    location: 'New York, NY',
    rating: 4.9,
    reviews: 9,
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=400',
    tag: 'New'
  },
  {
    id: 5,
    title: 'Porsche 911 GT3 RS',
    category: 'Automotive',
    price: '$223,800',
    location: 'Stuttgart, DE',
    rating: 5.0,
    reviews: 31,
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=400',
    tag: 'Featured'
  },
  {
    id: 6,
    title: 'Luxury Overwater Bungalow',
    category: 'Real Estate',
    price: '$1,800 / night',
    location: 'Bora Bora, PY',
    rating: 4.9,
    reviews: 15,
    image: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&q=80&w=400',
    tag: 'Trending'
  }
];

const CATEGORIES = ['All', 'Automotive', 'Real Estate', 'Electronics'];

export default function Listings() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [viewMode, setViewMode] = useState('grid'); // grid or list

  const filteredListings = MOCK_LISTINGS.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-8 py-6">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Catalog Explorer</h1>
          <p className="text-white/60 text-sm mt-1">Browse premium items listed globally on our decentralized portal.</p>
        </div>
        
        <div className="flex items-center space-x-2">
          <button 
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-lg transition-smooth ${viewMode === 'grid' ? 'bg-blue-600/30 text-blue-300' : 'glass hover:bg-white/10'}`}
          >
            <Grid className="w-5 h-5" />
          </button>
          <button 
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-lg transition-smooth ${viewMode === 'list' ? 'bg-blue-600/30 text-blue-300' : 'glass hover:bg-white/10'}`}
          >
            <List className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Filter and Search controls */}
      <div className="grid md:grid-cols-12 gap-4">
        {/* Search */}
        <div className="md:col-span-8 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 w-5 h-5" />
          <input
            type="text"
            placeholder="Search by title, location or keywords..."
            className="input-glass pl-12 pr-4 py-3"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        {/* Category select for smaller devices or custom drop */}
        <div className="md:col-span-4 flex items-center space-x-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          {CATEGORIES.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-smooth ${
                selectedCategory === category 
                  ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' 
                  : 'glass hover:bg-white/15'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Grid or List of items */}
      {filteredListings.length > 0 ? (
        <div className={viewMode === 'grid' 
          ? "grid sm:grid-cols-2 lg:grid-cols-3 gap-6" 
          : "space-y-4"
        }>
          {filteredListings.map((listing) => (
            <div 
              key={listing.id}
              className={`glass rounded-2xl overflow-hidden hover:bg-white/15 hover:-translate-y-1 transition-all duration-300 group flex ${
                viewMode === 'grid' ? 'flex-col' : 'flex-col md:flex-row items-center p-4 gap-6'
              }`}
            >
              {/* Image & tag */}
              <div className={`relative overflow-hidden ${
                viewMode === 'grid' ? 'aspect-[4/3] w-full' : 'w-full md:w-48 h-36 rounded-xl flex-shrink-0'
              }`}>
                <img 
                  src={listing.image} 
                  alt={listing.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-xs font-semibold px-2.5 py-1 rounded-md text-blue-300 border border-white/10">
                  {listing.tag}
                </span>
              </div>

              {/* Details */}
              <div className="p-5 flex-grow flex flex-col justify-between w-full">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wider text-blue-300/80 flex items-center">
                      <Compass className="w-3.5 h-3.5 mr-1" />
                      {listing.category}
                    </span>
                    <div className="flex items-center space-x-1 text-yellow-400">
                      <Star className="w-4 h-4 fill-yellow-400" />
                      <span className="text-xs font-semibold text-white">{listing.rating}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-bold line-clamp-1 group-hover:text-blue-300 transition-colors">
                    {listing.title}
                  </h3>

                  <p className="text-white/60 text-sm flex items-center">
                    <MapPin className="w-4 h-4 mr-1 text-rose-400" />
                    {listing.location}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 mt-4 border-t border-white/5">
                  <div className="text-lg font-extrabold text-blue-100">{listing.price}</div>
                  <Link
                    to={`/listings/${listing.id}`}
                    className="glass px-4 py-2 rounded-lg text-xs font-semibold hover:bg-white/20 hover:text-white transition-smooth"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="glass rounded-2xl p-16 text-center space-y-4">
          <div className="inline-block p-4 glass rounded-full">
            <Search className="w-8 h-8 text-white/50" />
          </div>
          <h3 className="text-xl font-bold">No listings found</h3>
          <p className="text-white/60 max-w-sm mx-auto">We couldn't find anything matching "{searchQuery}" in our records.</p>
        </div>
      )}
    </div>
  );
}
