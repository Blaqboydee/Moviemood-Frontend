import React, { useEffect, useState } from 'react';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const user = JSON.parse(localStorage.getItem('user'));
  const userEmail = user?.email;
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (!userEmail) {
      setError("User email not found. Please log in.");
      setLoading(false);
      return;
    }

    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_URL}/bookings/user/${encodeURIComponent(userEmail)}`);
        if (!response.ok) {
          throw new Error(`Error fetching orders: ${response.statusText}`);
        }
        const json = await response.json();
        setOrders(json.data || []);
      } catch (err) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userEmail]);

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'confirmed': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      case 'pending': return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      case 'cancelled': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950/30 to-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-300 text-lg font-medium">Loading your cinema experience...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-red-950/30 to-slate-950 flex items-center justify-center">
        <div className="bg-slate-800/80 backdrop-blur-xl border border-red-500/20 rounded-2xl p-8 max-w-md mx-4">
          <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-white text-center mb-2">Something went wrong</h3>
          <p className="text-red-400 text-center">{error}</p>
        </div>
      </div>
    );
  }

  if (!orders.length) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950/30 to-slate-950 flex items-center justify-center">
        <div className="text-center max-w-md mx-4">
          <div className="w-24 h-24 bg-slate-800/50 rounded-full flex items-center justify-center mx-auto mb-6 border border-slate-700/50">
            <svg className="w-12 h-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-white mb-3">No Orders Yet</h3>
          <p className="text-slate-400 leading-relaxed">Start your cinema journey by booking your first movie experience!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-950/70 to-slate-950">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mt-20 mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
              My Orders
            </h1>
          </div>
          <p className="text-slate-400 ml-11">Your cinema booking history and experiences</p>
        </div>

        {/* Orders Grid */}
        <div className="space-y-6">
          {orders.map((order, index) => (
            <div 
              key={order._id}
              className="group bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-4 lg:p-6 hover:bg-slate-800/60 hover:border-purple-500/30 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/10"
              style={{
                animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
              }}
            >
              {/* Order Header */}
              <div className="flex items-start justify-between mb-4 gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg lg:text-xl font-semibold text-white truncate">#{order._id.slice(-6).toUpperCase()}</h3>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(order.bookingStatus)}`}>
                      {order.bookingStatus}
                    </span>
                  </div>
                  <p className="text-slate-400 text-xs lg:text-sm">
                    {new Date(order.bookedAt).toLocaleDateString('en-US', { 
                      month: 'short',
                      day: 'numeric'
                    })} • {new Date(order.bookedAt).toLocaleTimeString('en-US', {
                      hour: 'numeric',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-xl lg:text-3xl font-bold text-white">₦{order.totalPrice?.toLocaleString()}</p>
                </div>
              </div>

              {/* Compact Info Grid - Mobile Optimized */}
              <div className="space-y-3 mb-4">
                {/* Movie & Show Info */}
                <div className="bg-slate-900/50 rounded-lg p-3 border border-slate-700/30">
                  <div className="space-y-2 text-sm "><div className="flex justify-between">
                      <span className="text-slate-400 text-xs lg:text-[15px]"lg:mb-2 >Movie Title</span>
                      <span className="text-white font-mono text-xs truncate ml-2 lg:text-[15px]"lg:mb-2 >{order.title || 'N/A'}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-slate-400 text-xs lg:text-[15px]"lg:mb-2 >Movie ID</span>
                      <span className="text-white font-mono text-xs truncate ml-2 lg:text-[15px]"lg:mb-2 >{order.showtimeId?.movieId || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400 text-xs lg:text-[15px]"lg:mb-2 >Show Date</span>
                      <span className="text-white text-xs ml-2 lg:text-[15px]"lg:mb-2 >{order.showtimeId?.date || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400 text-xs lg:text-[15px]"lg:mb-2 >Show Time</span>
                      <span className="text-white font-medium text-xs ml-2 lg:text-[15px]"lg:mb-2 >{order.showtimeId?.time || 'N/A'}</span>
                    </div>
                  </div>
                </div>

                {/* Seats - Compact */}
                <div className="bg-slate-900/50 rounded-lg p-3 border border-slate-700/30">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-emerald-400 text-xs lg:text-[15px] lg:mb-2 font-medium flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      </svg>
                      Seats
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {order.alphanumericSeats.slice(0, 4).map(seat => (
                      <span key={seat} className="bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded text-xs lg:text-[15px] lg:mb-2 font-mono border border-emerald-500/30">
                        {seat}
                      </span>
                    ))}
                    {order.alphanumericSeats.length > 4 && (
                      <span className="text-slate-400 text-xs self-center">+{order.alphanumericSeats.length - 4} more</span>
                    )}
                  </div>
                </div>

                {/* Food and Drinks - Compact */}
                {order.foodanddrinks?.length > 0 && (
                  <div className="bg-slate-900/50 rounded-lg p-3 border border-slate-700/30">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-amber-400 text-xs lg:text-[15px] lg:mb-2 font-medium flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                        </svg>
                        Food & Drinks
                      </span>
                      <span className="text-xs lg:text-[15px] lg:mb-2  text-slate-400">{order.foodanddrinks.length} items</span>
                    </div>
                    <div className="space-y-1">
                      {order.foodanddrinks.slice(0, 2).map(item => (
                        <div key={item.foodId} className="flex justify-between items-center lg:text-[15px] lg:mb-2 text-xs">
                          <span className="text-white truncate lg:text-[15px] lg:mb-2 flex-1 mr-2">{item.name} x{item.quantity}</span>
                          <span className="text-amber-400 font-medium lg:text-[15px] lg:mb-2 flex-shrink-0">₦{item.price.toLocaleString()}</span>
                        </div>
                      ))}
                      {order.foodanddrinks.length > 2 && (
                        <div className="text-slate-400 text-xs">+{order.foodanddrinks.length - 2} more items</div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
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

export default MyOrders;