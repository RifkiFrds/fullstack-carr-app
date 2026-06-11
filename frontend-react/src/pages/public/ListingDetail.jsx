import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Calendar, User, Mail, Phone, ShieldCheck, Compass, Info, Heart, Share2 } from 'lucide-react';

const MOCK_DETAILS = {
  1: {
    title: 'Tesla Model S Plaid',
    category: 'Automotive',
    price: '$89,990',
    location: 'Los Angeles, CA',
    description: 'The Tesla Model S Plaid is a high-performance luxury electric vehicle. Featuring a tri-motor all-wheel drive setup delivering 1,020 horsepower, it goes from 0-60 mph in just 1.99 seconds. This vehicle comes fully loaded with a cream premium interior, carbon fiber decor, yoke steering, and full self-driving capability computer.',
    image: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=300',
      'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&q=80&w=300',
      'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&q=80&w=300'
    ],
    seller: {
      name: 'Alex Rivera',
      phone: '+1 (555) 389-2810',
      email: 'alex.rivera@example.com',
      joined: 'Joined Dec 2023',
      rating: '4.9/5'
    },
    specs: [
      { label: 'Year', value: '2024' },
      { label: 'Condition', value: 'Excellent' },
      { label: 'Range', value: '396 miles' },
      { label: 'Color', value: 'Solid Black' },
      { label: 'Transmission', value: 'Automatic' }
    ]
  },
  2: {
    title: 'Modern Minimalist Villa',
    category: 'Real Estate',
    price: '$1,250,000',
    location: 'Miami, FL',
    description: 'Architectural masterpiece featuring clean lines, open floor plan, and soaring ceilings. This luxury modern residence includes 4 master suites, 4.5 custom designer bathrooms, state-of-the-art chef’s kitchen, infinity pool overlooking canal, and fully integrated smart home automation.',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=300',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=300',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=300'
    ],
    seller: {
      name: 'Sarah Chen',
      phone: '+1 (555) 902-1922',
      email: 'schen.realtor@example.com',
      joined: 'Joined Jun 2021',
      rating: '5.0/5'
    },
    specs: [
      { label: 'Type', value: 'Single Family' },
      { label: 'Bedrooms', value: '4' },
      { label: 'Bathrooms', value: '4.5' },
      { label: 'Area', value: '4,200 sqft' },
      { label: 'Year Built', value: '2023' }
    ]
  },
  3: {
    title: 'MacBook Pro 16" M3 Max',
    category: 'Electronics',
    price: '$3,499',
    location: 'San Francisco, CA',
    description: 'Apple MacBook Pro 16-inch featuring the revolutionary Apple M3 Max chip with 16-core CPU, 40-core GPU, 48GB unified memory, and 1TB super-fast SSD storage. Liquid Retina XDR display. Pristine condition with AppleCare+ active until December 2027.',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=300',
      'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&q=80&w=300'
    ],
    seller: {
      name: 'David Miller',
      phone: '+1 (555) 782-9013',
      email: 'dmtech@example.com',
      joined: 'Joined Jan 2025',
      rating: '4.8/5'
    },
    specs: [
      { label: 'Chip', value: 'Apple M3 Max' },
      { label: 'RAM', value: '48 GB' },
      { label: 'Storage', value: '1 TB SSD' },
      { label: 'Warranty', value: 'AppleCare+' },
      { label: 'Battery Health', value: '100%' }
    ]
  }
};

export default function ListingDetail() {
  const { id } = useParams();
  
  // Find or default to Tesla
  const detail = MOCK_DETAILS[id] || MOCK_DETAILS[1];

  return (
    <div className="space-y-8 py-4">
      {/* Breadcrumbs / Back button */}
      <div>
        <Link 
          to="/listings" 
          className="inline-flex items-center text-sm text-blue-300 hover:text-white transition-smooth group"
        >
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Listings
        </Link>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* Left Side: Images & Descriptions */}
        <div className="lg:col-span-8 space-y-6">
          {/* Hero Image */}
          <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden glass border border-white/10">
            <img 
              src={detail.image} 
              alt={detail.title} 
              className="w-full h-full object-cover"
            />
          </div>

          {/* Thumbnail Gallery */}
          <div className="flex gap-4">
            {detail.images?.map((url, index) => (
              <div key={index} className="w-24 h-18 rounded-lg overflow-hidden glass cursor-pointer hover:opacity-85 border border-white/5 transition-opacity">
                <img src={url} alt={`Preview ${index + 1}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>

          {/* Specifications */}
          <div className="glass rounded-2xl p-6 space-y-4">
            <h3 className="text-xl font-bold flex items-center">
              <Info className="w-5 h-5 mr-2 text-blue-300" />
              Specifications
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {detail.specs.map((spec, i) => (
                <div key={i} className="p-3 bg-white/5 rounded-lg border border-white/5">
                  <div className="text-xs text-white/50">{spec.label}</div>
                  <div className="text-sm font-semibold text-white mt-1">{spec.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="glass rounded-2xl p-6 space-y-4">
            <h3 className="text-xl font-bold">About this item</h3>
            <p className="text-white/70 leading-relaxed text-sm whitespace-pre-line">
              {detail.description}
            </p>
          </div>
        </div>

        {/* Right Side: Action widgets / Seller Details */}
        <div className="lg:col-span-4 space-y-6">
          {/* Purchase details widget */}
          <div className="glass rounded-2xl p-6 space-y-6">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-xs text-blue-300/80 font-bold uppercase tracking-wider block mb-1">
                  {detail.category}
                </span>
                <h2 className="text-2xl font-extrabold">{detail.title}</h2>
              </div>
              <div className="flex gap-2">
                <button className="p-2 rounded-lg glass hover:bg-white/15 transition-smooth">
                  <Heart className="w-4 h-4" />
                </button>
                <button className="p-2 rounded-lg glass hover:bg-white/15 transition-smooth">
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="p-4 bg-blue-500/10 rounded-xl border border-blue-500/20 text-center">
              <span className="text-xs text-white/60 block mb-1">Price Offer</span>
              <span className="text-3xl font-extrabold text-blue-200">{detail.price}</span>
            </div>

            <div className="flex items-center text-sm text-white/70">
              <MapPin className="w-4 h-4 mr-2 text-rose-400" />
              {detail.location}
            </div>

            <button className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-semibold shadow-lg shadow-blue-900/20 transition-smooth">
              Purchase Proposal
            </button>
          </div>

          {/* Seller Card */}
          <div className="glass rounded-2xl p-6 space-y-4">
            <h3 className="text-md font-bold text-white/90">Advertiser Contact</h3>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center font-bold text-white text-sm">
                {detail.seller.name[0]}
              </div>
              <div>
                <h4 className="font-bold text-sm">{detail.seller.name}</h4>
                <p className="text-xs text-white/50">{detail.seller.joined}</p>
              </div>
            </div>

            <div className="space-y-3 pt-3 border-t border-white/5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-white/50">Seller Score</span>
                <span className="font-bold text-blue-300">{detail.seller.rating}</span>
              </div>
              
              <div className="flex items-center text-sm text-white/80">
                <Mail className="w-4 h-4 mr-2.5 text-blue-300" />
                {detail.seller.email}
              </div>
              <div className="flex items-center text-sm text-white/80">
                <Phone className="w-4 h-4 mr-2.5 text-blue-300" />
                {detail.seller.phone}
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <a 
                href={`mailto:${detail.seller.email}`} 
                className="flex-1 text-center py-2 glass hover:bg-white/10 rounded-lg text-xs font-semibold transition-smooth"
              >
                Send Email
              </a>
              <a 
                href={`tel:${detail.seller.phone}`} 
                className="flex-1 text-center py-2 glass hover:bg-white/10 rounded-lg text-xs font-semibold transition-smooth"
              >
                Call
              </a>
            </div>
          </div>

          {/* Secure listing badge */}
          <div className="glass bg-teal-500/5 border border-teal-500/20 rounded-2xl p-4 flex items-start space-x-3">
            <ShieldCheck className="w-5 h-5 text-teal-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-teal-300">Verified Listing</h4>
              <p className="text-[11px] text-white/50 mt-0.5">This item listing meets all verification guidelines and security policies.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
