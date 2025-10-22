import React, { useState, useEffect } from 'react';
import { Calendar, DollarSign, Package, CheckCircle, Clock } from 'lucide-react';
import { rentalAPI } from '../services/api';

const MyRentals = () => {
  const [filter, setFilter] = useState('all');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [rentals, setRentals] = useState([]);


  

  // Helper: days remaining
  const getDaysRemaining = (dueDate) => {
      const today = new Date();
      const due = new Date(dueDate);
      const diffTime = due - today;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays;
    };

   const getPrice = (rental) => {
  const totalPrice = parseFloat(rental.totalPrice);
  
  if (isNaN(totalPrice) || totalPrice === 0) {
    console.error('Invalid or missing totalPrice:', rental.totalPrice);
    return 0;
  }
  
  const rentalDate = new Date(rental.rentalDate);
  const dueDate = new Date(rental.dueDate);
  const returnDate = rental.returnDate ? new Date(rental.returnDate) : new Date();

  // Reset time to midnight for accurate day calculation (matching LocalDate behavior)
  rentalDate.setHours(0, 0, 0, 0);
  dueDate.setHours(0, 0, 0, 0);
  returnDate.setHours(0, 0, 0, 0);

  // Calculate the number of days in the original rental period
  const daysRented = Math.max(
    1,
    Math.floor((dueDate - rentalDate) / (1000 * 60 * 60 * 24))
  );
  
  // Calculate daily price from total
  const dailyPrice = totalPrice / daysRented;

  // Base rental cost
  const basePrice = totalPrice;

  // Calculate late fee if overdue
  let lateFee = 0;
  if (returnDate > dueDate) {
    const daysLate = Math.floor((returnDate - dueDate) / (1000 * 60 * 60 * 24));
    const lateFeePerDay = dailyPrice * 0.2; // 20% per day late
    lateFee = daysLate * lateFeePerDay;
  }

  return basePrice + lateFee;
};
  useEffect(() => {
      loadRentals();
    }, [filter]);
  
    const loadRentals = async () => {
      try {
        const response = filter === 'active' 
          ? await rentalAPI.getMyActiveRentals()
          : await rentalAPI.getMyRentals();
        setRentals(response.data);
      } catch (error) {
        console.error('Error loading rentals:', error);
      } finally {
        setLoading(false);
      }
    };
  
    const handleReturn = async (id) => {
      try {
        await rentalAPI.return(id);
        setMessage('VHS returned successfully!');
        loadRentals();
        setTimeout(() => setMessage(''), 3000);
      } catch (error) {
        setMessage(error.response?.data?.message || 'Failed to return VHS');
      }
    };
  
    if (loading) return <div>Loading...</div>;
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Message Banner */}
      {message && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50">
          <div className="px-6 py-3 rounded-full backdrop-blur-md bg-green-500 bg-opacity-20 border border-green-400 border-opacity-30 text-green-300">
            {message}
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6 py-24">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            My Rentals
          </h1>
          <div className="w-32 h-1 bg-white opacity-20"></div>
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-4 mb-12">
          <button
            onClick={() => setFilter('all')}
            className={`px-6 py-3 rounded-xl text-sm uppercase tracking-wider font-medium transition-all duration-300 ${
              filter === 'all'
                ? 'bg-white text-black'
                : 'border border-white border-opacity-30 text-white opacity-60 hover:opacity-100'
            }`}
          >
            All Rentals
          </button>
          <button
            onClick={() => setFilter('active')}
            className={`px-6 py-3 rounded-xl text-sm uppercase tracking-wider font-medium transition-all duration-300 ${
              filter === 'active'
                ? 'bg-white text-black'
                : 'border border-white border-opacity-30 text-white opacity-60 hover:opacity-100'
            }`}
          >
            Active Rentals
          </button>
        </div>

        {/* Rentals Grid */}
        {rentals.length === 0 ? (
          <div className="rounded-2xl p-12 border border-white border-opacity-20 text-center">
            <Package className="w-16 h-16 text-white opacity-20 mx-auto mb-4" />
            <p className="text-white text-lg opacity-60">No rentals found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rentals.map((rental) => {
              const daysRemaining = rental.status === 'ACTIVE' ? getDaysRemaining(rental.dueDate) : null;
              const isOverdue = daysRemaining !== null && daysRemaining < 0;
              
              return (
                <div
                  key={rental.id}
                  className="rounded-2xl p-6 border border-white border-opacity-20 space-y-6 hover:border-opacity-30 transition-all duration-300 relative overflow-hidden group"
                >
                  {/* Status Badge */}
                  <div className="absolute top-6 right-6">
                    <div className={`px-3 py-1.5 rounded-full backdrop-blur-md text-xs uppercase tracking-wider font-medium ${
                      rental.status === 'ACTIVE'
                        ? 'bg-green-500 bg-opacity-20 text-green-300 border border-green-400 border-opacity-30'
                        : 'bg-slate-500 bg-opacity-20 text-slate-300 border border-slate-400 border-opacity-30'
                    }`}>
                      {rental.status === 'ACTIVE' ? (
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-3 h-3" />
                          Active
                        </span>
                      ) : (
                        <span className="flex items-center gap-1.5">
                          <CheckCircle className="w-3 h-3" />
                          Returned
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Title */}
                  <div className="pr-24">
                    <h3 className="text-white text-xl font-medium leading-tight">
                      {rental.vhsTitle}
                    </h3>
                  </div>

                  {/* Details */}
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Calendar className="w-4 h-4 text-white opacity-40 mt-0.5 flex-shrink-0" />
                      <div className="flex-1">
                        <p className="text-xs uppercase tracking-wider text-white opacity-60 mb-1">
                          Rental Date
                        </p>
                        <p className="text-white text-sm">
                          {new Date(rental.rentalDate).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Calendar className="w-4 h-4 text-white opacity-40 mt-0.5 flex-shrink-0" />
                      <div className="flex-1">
                        <p className="text-xs uppercase tracking-wider text-white opacity-60 mb-1">
                          Due Date
                        </p>
                        <p className={`text-sm font-medium ${
                          isOverdue ? 'text-red-400' : 'text-white'
                        }`}>
                          {new Date(rental.dueDate).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </p>
                        {rental.status === 'ACTIVE' && daysRemaining !== null && (
                          <p className={`text-xs mt-1 ${
                            isOverdue
                              ? 'text-red-400'
                              : daysRemaining <= 2
                              ? 'text-yellow-400'
                              : 'text-white opacity-60'
                          }`}>
                            {isOverdue
                              ? `Overdue by ${Math.abs(daysRemaining)} days`
                              : `${daysRemaining} days remaining`}
                          </p>
                        )}
                      </div>
                    </div>

                    {rental.returnDate && (
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-4 h-4 text-white opacity-40 mt-0.5 flex-shrink-0" />
                        <div className="flex-1">
                          <p className="text-xs uppercase tracking-wider text-white opacity-60 mb-1">
                            Return Date
                          </p>
                          <p className="text-white text-sm">
                            {new Date(rental.returnDate).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            })}
                          </p>
                        </div>
                      </div>
                    )}

                    <div className="flex items-start gap-3 pt-3 border-t border-white border-opacity-10">
                      <DollarSign className="w-4 h-4 text-white opacity-40 mt-0.5 flex-shrink-0" />
                      <div className="flex-1">
                        <p className="text-xs uppercase tracking-wider text-white opacity-60 mb-1">
                          Total Price
                        </p>
                        <p className={`text-lg font-bold ${isOverdue ? 'text-red-400' : 'text-white'}`}>
                          ${getPrice(rental).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Return Button */}
                  {rental.status === 'ACTIVE' && (
                    <button
                      onClick={() => handleReturn(rental.id)}
                      className="w-full py-3 rounded-xl border border-white border-opacity-30 text-white hover:bg-white hover:text-black transition-all duration-300 text-sm uppercase tracking-wider font-medium"
                    >
                      Return VHS
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyRentals;