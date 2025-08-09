import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Or use Firebase if that's what you're using
import { toast, ToastContainer } from 'react-toastify';

const FoodAdmin = () => {
   
  const [foods, setFoods] = useState(["apple", "doughnut", "drink", "bread"]);
  const [formData, setFormData] = useState({
    name: '',
    category: 'snack',
    price: '',
    available: true,
  });

//   const fetchFoods = async () => {
//     try {
//       const res = await axios.get('/api/foods'); // Replace with your endpoint
//       setFoods(res.data);
//     } catch (error) {
//       console.error('Error fetching foods:', error);
//     }
//   };

  const handleInput = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  // Format the name (capitalize each word)
  const formattedName = formData.name
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');

  // Create a new formData object with the formatted name
  const formattedData = {
    ...formData,
    name: formattedName
  };

  try {
    await axios.post('http://localhost:6176/food/createfood', formattedData);
    console.log(formattedData);
    toast.success("Food item added successfully");
    setFormData({ name: '', category: 'snack', price: '', available: true });
  } catch (err) {
    console.error('Failed to add food:', err);
    toast.error("Could not add food item");
  }
};

  const handleImageUpload = (e, fieldName) => {
    const imageFile = e.target.files[0];
    if (!imageFile) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      setFormData((prev) => ({
        ...prev,
        [fieldName]: e.target.result,
      }));
    };
    reader.readAsDataURL(imageFile);
  };

  const handleDelete = async (id) => {
    // try {
    //   await axios.delete(`/api/foods/${id}`);
    //   fetchFoods();
    // } catch (err) {
    //   console.error('Failed to delete item:', err);
    // }
  };

  useEffect(() => {
    // fetchFoods();
  }, []);

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'snack':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        );
      case 'drink':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        );
      case 'combo':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        );
      default:
        return null;
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'snack': return 'from-orange-500/20 to-amber-500/20 border-orange-500/30 text-orange-400';
      case 'drink': return 'from-blue-500/20 to-cyan-500/20 border-blue-500/30 text-blue-400';
      case 'combo': return 'from-purple-500/20 to-pink-500/20 border-purple-500/30 text-purple-400';
      default: return 'from-gray-500/20 to-slate-500/20 border-gray-500/30 text-gray-400';
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-950 via-gray-950/70 to-slate-950">
      <div className="w-full px-4 py-6 sm:px-6 lg:px-8 xl:px-10">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-white via-amber-200 to-white bg-clip-text text-transparent">
                  Food & Drinks Admin
                </h1>
                <p className="text-sm sm:text-base text-slate-400">Manage your cinema's culinary offerings</p>
              </div>
            </div>
          </div>
        </div>

        {/* Add Food Form */}
        <div className="mb-10">
          <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 lg:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-white">Add New Item</h2>
            </div>

            <form onSubmit={handleSubmit} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {/* Name Input */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Item Name</label>
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter item name"
                    value={formData.name}
                    onChange={handleInput}
                    required
                    className="w-full bg-slate-900/50 border border-slate-700/50 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none transition-all duration-200"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Category Select */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Category</label>
                <div className="relative">
                  <select 
                    name="category" 
                    value={formData.category} 
                    onChange={handleInput} 
                    className="w-full bg-slate-900/50 border border-slate-700/50 rounded-xl px-4 py-3 text-white focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none transition-all duration-200 appearance-none"
                  >
                    <option value="snack">Snack</option>
                    <option value="drink">Drink</option>
                    <option value="combo">Combo</option>
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Price Input */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Price</label>
                <div className="relative">
                  <input
                    type="number"
                    name="price"
                    placeholder="0.00"
                    value={formData.price}
                    onChange={handleInput}
                    required
                    className="w-full bg-slate-900/50 border border-slate-700/50 rounded-xl px-4 py-3 pl-8 text-white placeholder-slate-400 focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none transition-all duration-200"
                  />
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-medium">₦</div>
                </div>
              </div>

              {/* Image Upload */}
              <div className="space-y-2 sm:col-span-2 lg:col-span-1">
                <label className="text-sm font-medium text-slate-300">Item Image</label>
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, "foodImage")}
                    required
                    className="w-full bg-slate-900/50 border border-slate-700/50 rounded-xl px-4 py-3 text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-emerald-500/20 file:text-emerald-400 hover:file:bg-emerald-500/30 file:cursor-pointer focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none transition-all duration-200"
                  />
                </div>
              </div>

              {/* Availability Toggle */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Availability</label>
                <div className="flex items-center gap-3">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      name="available"
                      checked={formData.available}
                      onChange={handleInput}
                      className="sr-only"
                    />
                    <div className={`w-11 h-6 rounded-full transition-colors duration-200 ${formData.available ? 'bg-emerald-500' : 'bg-slate-600'}`}>
                      <div className={`w-5 h-5 bg-white rounded-full transition-transform duration-200 transform ${formData.available ? 'translate-x-5' : 'translate-x-0.5'} mt-0.5`}></div>
                    </div>
                    <span className={`ml-3 text-sm font-medium ${formData.available ? 'text-emerald-400' : 'text-slate-400'}`}>
                      {formData.available ? 'Available' : 'Unavailable'}
                    </span>
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <div className="sm:col-span-2 lg:col-span-3">
                <button 
                  type="submit" 
                  className="w-full sm:w-auto bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-medium py-3 px-8 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-emerald-500/25 hover:scale-105 flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add Item to Menu
                </button>
              </div>
            </form>
          </div>
        </div>

        <ToastContainer/>

        {/* List of Items */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-white">Menu Items</h2>
            </div>
            <div className="bg-slate-800/40 px-3 py-1 rounded-full">
              <span className="text-sm text-slate-400">{foods.length} items</span>
            </div>
          </div>

          <div className="grid gap-4 sm:gap-6">
            {foods.map((food, index) => (
              <div
                key={food.id || index}
                className="group bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-4 sm:p-6 hover:bg-slate-800/60 hover:border-purple-500/30 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/10"
                style={{
                  animation: `slideIn 0.6s ease-out ${index * 0.1}s both`
                }}
              >
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                  {/* Image */}
                  <div className="flex-shrink-0 mx-auto sm:mx-0">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 bg-slate-700/50 rounded-2xl overflow-hidden border border-slate-600/50">
                      <img 
                        src={food.image || 'https://via.placeholder.com/96'} 
                        alt={food.name || food} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" 
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 space-y-2 text-center sm:text-left">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                      <div>
                        <h3 className="text-lg sm:text-xl font-semibold text-white group-hover:text-purple-400 transition-colors duration-200">
                          {food.name || food}
                        </h3>
                        
                        {/* Category Badge */}
                        <div className="flex items-center justify-center sm:justify-start gap-2 mt-1">
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border bg-gradient-to-r ${getCategoryColor(food.category || 'snack')}`}>
                            {getCategoryIcon(food.category || 'snack')}
                            {food.category || 'snack'}
                          </span>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4">
                        <div className="text-center sm:text-right">
                          <p className="text-2xl sm:text-3xl font-bold text-white">₦{food.price || '0'}</p>
                          <p className={`text-xs font-medium ${food.available !== false ? 'text-emerald-400' : 'text-red-400'}`}>
                            {food.available !== false ? 'Available' : 'Unavailable'}
                          </p>
                        </div>

                        {/* Delete Button */}
                        <button
                          onClick={() => handleDelete(food.id)}
                          className="w-10 h-10 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 text-red-400 hover:text-red-300 rounded-xl transition-all duration-200 hover:scale-105 flex items-center justify-center"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default FoodAdmin;