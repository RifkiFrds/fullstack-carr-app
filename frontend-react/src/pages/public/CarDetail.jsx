import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Calendar, Compass, ShieldCheck, Mail, Phone } from 'lucide-react';
import api from '../../api/api';

export default function CarDetail() {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCarDetail = async () => {
      setLoading(true);
      try {
        const response = await api.get(`/listings/${id}`);
        if (response.data && response.data.success) {
          setCar(response.data.data);
        } else {
          setError('Listing details not found.');
        }
      } catch (err) {
        console.error('Error fetching listing details:', err);
        setError('Listing could not be retrieved from the database.');
      } finally {
        setLoading(false);
      }
    };

    fetchCarDetail();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto py-12 space-y-8 animate-pulse">
        <div className="h-6 bg-slate-200 rounded w-24" />
        <div className="aspect-[16/9] bg-slate-200 rounded-2xl w-full" />
        <div className="h-8 bg-slate-200 rounded w-1/3" />
        <div className="h-4 bg-slate-200 rounded w-2/3" />
      </div>
    );
  }

  if (error || !car) {
    return (
      <div className="max-w-md mx-auto text-center py-20 space-y-6">
        <div className="p-4 bg-rose-50 border border-rose-100 rounded-lg text-sm text-rose-600">
          {error || 'Listing not found.'}
        </div>
        <Link to="/" className="btn-secondary inline-flex">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Listings
        </Link>
      </div>
    );
  }

  const meta = car.metadata || {};
  const formattedPrice = typeof meta.price === 'number' 
    ? new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(meta.price)
    : meta.price || 'Contact Seller';

  const specs = [
    { label: 'Brand', value: meta.brand || 'N/A' },
    { label: 'Year', value: meta.year || 'N/A' },
    { label: 'Location', value: meta.location || 'N/A' },
    { label: 'Fuel Type', value: meta.fuel || 'Bensin' },
    { label: 'Transmission', value: meta.transmission || 'Manual' }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-4">
      {/* Back button */}
      <div>
        <Link 
          to="/" 
          className="inline-flex items-center text-sm font-semibold text-slate-500 hover:text-slate-900 transition-smooth group"
        >
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-0.5 transition-transform" />
          Back to Listings
        </Link>
      </div>

      <div className="grid md:grid-cols-12 gap-8 items-start">
        {/* Left Side: Images & Descriptions */}
        <div className="md:col-span-8 space-y-8">
          {/* Main Photo */}
          <div className="aspect-[16/10] w-full bg-slate-100 rounded-2xl overflow-hidden border border-slate-200/60 shadow-sm">
            <img 
              src={car.imageUrl || 'https://images.unsplash.com/photo-1549317661-bd32c8ce0afa?w=800'} 
              alt={car.title} 
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=800';
              }}
            />
          </div>

          {/* Specifications */}
          <div className="bg-white border border-slate-100 rounded-xl p-6 space-y-4 shadow-sm">
            <h3 className="text-md font-bold tracking-tight text-slate-950 uppercase border-b border-slate-50 pb-2">
              Specifications
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {specs.map((spec, i) => (
                <div key={i} className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                  <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{spec.label}</div>
                  <div className="text-sm font-bold text-slate-800 mt-0.5">{spec.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="bg-white border border-slate-100 rounded-xl p-6 space-y-3 shadow-sm">
            <h3 className="text-md font-bold tracking-tight text-slate-950 uppercase border-b border-slate-50 pb-2">
              Description
            </h3>
            <p className="text-slate-600 leading-relaxed text-sm whitespace-pre-line">
              {car.description}
            </p>
          </div>
        </div>

        {/* Right Side: Price card / Contacts */}
        <div className="md:col-span-4 space-y-6">
          <div className="bg-white border border-slate-100 rounded-xl p-6 space-y-5 shadow-sm">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                {meta.brand || 'Vehicle'}
              </span>
              <h2 className="text-xl font-bold text-slate-900 leading-tight">{car.title}</h2>
            </div>

            <div className="p-4 bg-slate-50 rounded-lg text-center border border-slate-100">
              <span className="text-[10px] text-slate-400 font-bold uppercase block mb-1">Price Offer</span>
              <span className="text-2xl font-extrabold text-slate-900">{formattedPrice}</span>
            </div>

            <div className="flex items-center text-xs text-slate-500">
              <MapPin className="w-4 h-4 mr-1.5 text-rose-500" />
              {meta.location || 'Indonesia'}
            </div>
          </div>

          {/* Contact Seller Info */}
          <div className="bg-white border border-slate-100 rounded-xl p-6 space-y-4 shadow-sm">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Contact Seller</h4>
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-sm">
                S
              </div>
              <div>
                <h5 className="font-bold text-xs text-slate-800">Premium Seller</h5>
                <p className="text-[10px] text-slate-400">Verified User</p>
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t border-slate-50 text-xs text-slate-600">
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-2 text-slate-400" />
                <span>info@carki.com</span>
              </div>
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-2 text-slate-400" />
                <span>+62 821-3456-7890</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
