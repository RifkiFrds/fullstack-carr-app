import React, { useEffect, useState } from 'react';
import { Layers } from 'lucide-react';
import api from '../../api/api';

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get('/categories');
        if (response.data && response.data.success) {
          setCategories(response.data.data);
        } else {
          setError('Failed to retrieve categories.');
        }
      } catch (err) {
        console.error('Error fetching categories:', err);
        setError('Unable to load categories. Please check database connection.');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-slate-950">Categories (Read Only)</h2>
        <p className="text-xs text-slate-400">View all categories configured in the backend database.</p>
      </div>

      {error && (
        <div className="p-4 bg-rose-50 border border-rose-100 rounded-lg text-sm text-rose-600">
          {error}
        </div>
      )}

      {/* Categories Table */}
      <div className="bg-white border border-slate-100 rounded-xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-10 space-y-4 animate-pulse">
            <div className="h-6 bg-slate-100 rounded w-1/4" />
            <div className="h-10 bg-slate-100 rounded" />
            <div className="h-10 bg-slate-100 rounded" />
          </div>
        ) : categories.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 text-[10px] font-bold uppercase tracking-wider bg-slate-50/50">
                  <th className="py-4 px-6">ID</th>
                  <th className="py-4 px-6">Name</th>
                  <th className="py-4 px-6">Slug</th>
                  <th className="py-4 px-6">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700 text-sm">
                {categories.map((cat) => (
                  <tr key={cat.id} className="hover:bg-slate-50/20 transition-colors">
                    <td className="py-4 px-6 font-mono text-xs text-slate-400">{cat.id}</td>
                    <td className="py-4 px-6 font-semibold text-slate-950 flex items-center space-x-2">
                      <Layers className="w-4 h-4 text-slate-400" />
                      <span>{cat.name}</span>
                    </td>
                    <td className="py-4 px-6 text-slate-500 font-mono text-xs">{cat.slug}</td>
                    <td className="py-4 px-6 text-slate-500">{cat.description || 'No description provided'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 text-center text-slate-400 text-sm">
            No categories populated in the database.
          </div>
        )}
      </div>
    </div>
  );
}
