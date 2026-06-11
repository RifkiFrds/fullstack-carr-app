import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Plus, 
  Edit2, 
  Trash2, 
  X, 
  Search, 
  CheckCircle, 
  AlertCircle,
  Eye,
  Calendar,
  Layers
} from 'lucide-react';
import api from '../../api/api';
import { CATEGORY_SCHEMAS } from '../../utils/categorySchemas';

export default function ListingManagement() {
  const [listings, setListings] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Search filter
  const [searchVal, setSearchVal] = useState('');

  // Form Panel Drawer State
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [selectedCategorySlug, setSelectedCategorySlug] = useState('');
  
  // Common Form Fields
  const [commonFields, setCommonFields] = useState({
    title: '',
    description: '',
    imageUrl: ''
  });

  // Dynamic Metadata Fields
  const [metadataFields, setMetadataFields] = useState({});

  const [formError, setFormError] = useState('');
  const [formSubmitting, setFormSubmitting] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [listingsRes, categoriesRes] = await Promise.all([
        api.get('/listings?limit=100'),
        api.get('/categories')
      ]);

      if (listingsRes.data?.success) {
        setListings(listingsRes.data.data);
      }
      if (categoriesRes.data?.success) {
        setCategories(categoriesRes.data.data);
      }
      setError('');
    } catch (err) {
      console.error('Failed to load listings metadata:', err);
      setError('Could not connect to the database. Make sure the backend server is running.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Sync category changes to initialize dynamic inputs
  const handleCategoryChange = (slug) => {
    setSelectedCategorySlug(slug);
    
    // Initialize metadata fields from schema
    const schema = CATEGORY_SCHEMAS[slug] || [];
    const initialMeta = {};
    schema.forEach(field => {
      initialMeta[field.key] = field.type === 'boolean' ? false : '';
    });
    setMetadataFields(initialMeta);
  };

  // Open form for CREATE
  const handleOpenCreate = () => {
    setEditingId(null);
    setCommonFields({
      title: '',
      description: '',
      imageUrl: ''
    });
    
    // Default to first category if available
    if (categories.length > 0) {
      handleCategoryChange(categories[0].slug);
    } else {
      setSelectedCategorySlug('');
      setMetadataFields({});
    }

    setFormError('');
    setIsFormOpen(true);
  };

  // Open form for UPDATE
  const handleOpenEdit = (item) => {
    setEditingId(item.id);
    setCommonFields({
      title: item.title || '',
      description: item.description || '',
      imageUrl: item.imageUrl || ''
    });

    const slug = item.category?.slug || '';
    setSelectedCategorySlug(slug);

    // Populate metadata fields matching category schema
    const schema = CATEGORY_SCHEMAS[slug] || [];
    const itemMeta = item.metadata || {};
    const filledMeta = {};
    schema.forEach(field => {
      filledMeta[field.key] = itemMeta[field.key] !== undefined ? itemMeta[field.key] : (field.type === 'boolean' ? false : '');
    });
    setMetadataFields(filledMeta);

    setFormError('');
    setIsFormOpen(true);
  };

  // Handle DELETE
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this listing permanently?')) return;
    try {
      const response = await api.delete(`/listings/${id}`);
      if (response.data?.success) {
        setSuccessMsg('Listing removed successfully.');
        setListings(prev => prev.filter(item => item.id !== id));
        setTimeout(() => setSuccessMsg(''), 3000);
      }
    } catch (err) {
      console.error('Delete error:', err);
      alert('Delete failed. Verify connection status.');
    }
  };

  // Handle form updates for metadata fields
  const handleMetaChange = (key, value) => {
    setMetadataFields(prev => ({
      ...prev,
      [key]: value
    }));
  };

  // Handle Submit Form
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormSubmitting(true);
    setFormError('');

    // Resolve category Id
    const targetCategory = categories.find(c => c.slug === selectedCategorySlug);
    if (!targetCategory) {
      setFormError('Please select a valid category.');
      setFormSubmitting(false);
      return;
    }

    // Cast metadata values according to schema types
    const schema = CATEGORY_SCHEMAS[selectedCategorySlug] || [];
    const castedMetadata = {};
    
    schema.forEach(field => {
      const val = metadataFields[field.key];
      if (field.type === 'number') {
        castedMetadata[field.key] = val !== '' ? Number(val) : 0;
      } else if (field.type === 'boolean') {
        castedMetadata[field.key] = !!val;
      } else {
        castedMetadata[field.key] = val;
      }
    });

    const payload = {
      title: commonFields.title,
      description: commonFields.description,
      imageUrl: commonFields.imageUrl || undefined,
      categoryId: targetCategory.id,
      metadata: castedMetadata
    };

    try {
      if (editingId) {
        // PUT UPDATE
        const response = await api.put(`/listings/${editingId}`, payload);
        if (response.data?.success) {
          setSuccessMsg('Listing details updated.');
          setIsFormOpen(false);
          fetchData();
          setTimeout(() => setSuccessMsg(''), 3000);
        }
      } else {
        // POST CREATE
        const response = await api.post('/listings', payload);
        if (response.data?.success) {
          setSuccessMsg('New listing registered.');
          setIsFormOpen(false);
          fetchData();
          setTimeout(() => setSuccessMsg(''), 3000);
        }
      }
    } catch (err) {
      console.error('Failed to save listing record:', err);
      if (err.response?.data?.errors) {
        const errorsText = err.response.data.errors.map(e => e.msg).join(', ');
        setFormError(`Validation errors: ${errorsText}`);
      } else if (err.response?.data?.message) {
        setFormError(err.response.data.message);
      } else {
        setFormError('Failed to save listing data. Please check inputs.');
      }
    } finally {
      setFormSubmitting(false);
    }
  };

  const filteredListings = listings.filter(item => {
    const term = searchVal.toLowerCase();
    return item.title.toLowerCase().includes(term) || 
           (item.category?.name || '').toLowerCase().includes(term);
  });

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-950">Listings Management</h2>
          <p className="text-xs text-slate-400">Perform CRUD actions across all 10 listing categories dynamically.</p>
        </div>
        <button onClick={handleOpenCreate} className="btn-primary">
          <Plus className="w-4 h-4 mr-1.5" />
          Add Listing
        </button>
      </div>

      {/* Success alert */}
      {successMsg && (
        <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-lg text-sm text-emerald-700 flex items-center shadow-sm">
          <CheckCircle className="w-4.5 h-4.5 mr-2 text-emerald-600" />
          {successMsg}
        </div>
      )}

      {/* Error alert */}
      {error && (
        <div className="p-4 bg-rose-50 border border-rose-100 rounded-lg text-sm text-rose-600">
          {error}
        </div>
      )}

      {/* Filters */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder="Filter listings by name, category..."
          value={searchVal}
          onChange={(e) => setSearchVal(e.target.value)}
          className="input-minimal w-full pl-9"
        />
      </div>

      {/* Desktop Table View */}
      <div className="bg-white border border-slate-100 rounded-xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-10 space-y-4 animate-pulse">
            <div className="h-6 bg-slate-100 rounded w-1/4" />
            <div className="h-10 bg-slate-100 rounded" />
            <div className="h-10 bg-slate-100 rounded" />
          </div>
        ) : filteredListings.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 text-[10px] font-bold uppercase tracking-wider bg-slate-50/50">
                  <th className="py-4 px-6">ID</th>
                  <th className="py-4 px-6">Image</th>
                  <th className="py-4 px-6">Title</th>
                  <th className="py-4 px-6">Category</th>
                  <th className="py-4 px-6">Created Date</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700 text-sm">
                {filteredListings.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/20 transition-colors">
                    <td className="py-4 px-6 font-mono text-xs text-slate-400">{item.id}</td>
                    <td className="py-4 px-6">
                      <div className="w-10 h-8 rounded bg-slate-50 overflow-hidden border border-slate-200/50">
                        <img 
                          src={item.imageUrl || 'https://images.unsplash.com/photo-1549317661-bd32c8ce0afa?w=100'} 
                          alt="" 
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=100';
                          }}
                        />
                      </div>
                    </td>
                    <td className="py-4 px-6 font-semibold text-slate-900">{item.title}</td>
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 border border-indigo-100/30 text-indigo-600">
                        <Layers className="w-3 h-3 mr-1" />
                        {item.category?.name || 'Unassigned'}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-slate-400 text-xs flex items-center pt-5">
                      <Calendar className="w-3.5 h-3.5 mr-1" />
                      {new Date(item.createdAt).toLocaleDateString('id-ID')}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <Link 
                          to={`/listings/${item.id}`}
                          target="_blank"
                          className="p-1.5 text-slate-400 hover:text-slate-900 hover:bg-slate-50 rounded transition-colors"
                          title="View Listing Page"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <button 
                          onClick={() => handleOpenEdit(item)}
                          className="p-1.5 text-slate-400 hover:text-slate-900 hover:bg-slate-50 rounded transition-colors"
                          title="Edit Listing"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDelete(item.id)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded transition-colors"
                          title="Delete Listing"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 text-center text-slate-400 text-sm">
            No matching listings found. Add your first item registry.
          </div>
        )}
      </div>

      {/* CRUD Slider Panel Form */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-slate-950/15 backdrop-blur-xs"
            onClick={() => setIsFormOpen(false)}
          />

          {/* Form Content Side Drawer */}
          <div className="relative w-full max-w-lg bg-white border-l border-slate-100 h-full flex flex-col justify-between shadow-2xl p-6 overflow-y-auto z-10">
            <div className="space-y-6">
              {/* Header */}
              <div className="flex justify-between items-center border-b border-slate-50 pb-4">
                <h3 className="font-bold text-slate-900 text-base">
                  {editingId ? 'Edit Listing Registry' : 'Register New Listing'}
                </h3>
                <button 
                  onClick={() => setIsFormOpen(false)}
                  className="p-1.5 hover:bg-slate-100 rounded text-slate-400 hover:text-slate-900 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {formError && (
                <div className="p-3.5 bg-rose-50 border border-rose-100 rounded-lg text-xs text-rose-600 flex items-start">
                  <AlertCircle className="w-4 h-4 mr-1.5 flex-shrink-0 mt-0.5" />
                  <span>{formError}</span>
                </div>
              )}

              {/* Form elements */}
              <form id="listing-form" onSubmit={handleFormSubmit} className="space-y-5 text-xs">
                {/* Step 1: Category Selection */}
                <div className="space-y-1">
                  <label className="font-bold text-slate-400 uppercase tracking-wider">Step 1: Select Category</label>
                  <select
                    value={selectedCategorySlug}
                    onChange={(e) => handleCategoryChange(e.target.value)}
                    className="input-minimal w-full font-semibold text-slate-700 bg-white"
                    disabled={!!editingId} // Category is immutable during edits
                    required
                  >
                    <option value="" disabled>-- Choose a category --</option>
                    {categories.map(c => (
                      <option key={c.id} value={c.slug}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div className="border-t border-slate-50 pt-4" />

                {/* Step 2: Render Common Fields */}
                <div className="space-y-4">
                  <span className="font-bold text-slate-400 uppercase tracking-wider block">Step 2: Core Particulars</span>
                  
                  {/* Title */}
                  <div className="space-y-1">
                    <label className="font-bold text-slate-500 uppercase tracking-wider">Title</label>
                    <input
                      type="text"
                      value={commonFields.title}
                      onChange={(e) => setCommonFields(prev => ({ ...prev, title: e.target.value }))}
                      className="input-minimal w-full"
                      placeholder="Enter listing name"
                      required
                    />
                  </div>

                  {/* Image URL */}
                  <div className="space-y-1">
                    <label className="font-bold text-slate-500 uppercase tracking-wider">Image URL</label>
                    <input
                      type="url"
                      value={commonFields.imageUrl}
                      onChange={(e) => setCommonFields(prev => ({ ...prev, imageUrl: e.target.value }))}
                      className="input-minimal w-full"
                      placeholder="https://images.unsplash.com/..."
                    />
                  </div>

                  {/* Description */}
                  <div className="space-y-1">
                    <label className="font-bold text-slate-500 uppercase tracking-wider">Description</label>
                    <textarea
                      rows={3}
                      value={commonFields.description}
                      onChange={(e) => setCommonFields(prev => ({ ...prev, description: e.target.value }))}
                      className="input-minimal w-full resize-none"
                      placeholder="Provide detailed description..."
                      required
                    />
                  </div>
                </div>

                {/* Step 3: Render Dynamic Metadata fields */}
                {selectedCategorySlug && CATEGORY_SCHEMAS[selectedCategorySlug] && (
                  <div className="space-y-4 border-t border-slate-50 pt-4">
                    <span className="font-bold text-slate-400 uppercase tracking-wider block">Step 3: Category Metadata Details</span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {CATEGORY_SCHEMAS[selectedCategorySlug].map((field) => (
                        <div key={field.key} className="space-y-1">
                          <label className="font-bold text-slate-500 uppercase tracking-wider">{field.label}</label>
                          {field.type === 'boolean' ? (
                            <div className="flex items-center h-10 px-4 bg-slate-50 border border-slate-200 rounded-lg">
                              <input
                                type="checkbox"
                                checked={!!metadataFields[field.key]}
                                onChange={(e) => handleMetaChange(field.key, e.target.checked)}
                                className="w-4 h-4 text-slate-900 border-slate-300 rounded focus:ring-slate-400 cursor-pointer"
                              />
                              <span className="ml-2.5 text-xs text-slate-500 font-semibold">Yes, support delivery</span>
                            </div>
                          ) : (
                            <input
                              type={field.type === 'number' ? 'number' : 'text'}
                              value={metadataFields[field.key] !== undefined ? metadataFields[field.key] : ''}
                              onChange={(e) => handleMetaChange(field.key, e.target.value)}
                              className="input-minimal w-full"
                              placeholder={field.placeholder}
                              required={field.required}
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </form>
            </div>

            {/* Bottom Actions */}
            <div className="border-t border-slate-50 pt-4 flex space-x-3">
              <button 
                type="button" 
                onClick={() => setIsFormOpen(false)}
                className="btn-secondary flex-1"
                disabled={formSubmitting}
              >
                Cancel
              </button>
              <button 
                type="submit" 
                form="listing-form" 
                className="btn-primary flex-1"
                disabled={formSubmitting}
              >
                {formSubmitting ? 'Submitting...' : 'Save Registry'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
