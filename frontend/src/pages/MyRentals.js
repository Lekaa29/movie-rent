import React, { useState } from 'react';
import { Calendar, DollarSign, Package, CheckCircle, Clock } from 'lucide-react';

const MyRentals = () => {
  const [filter, setFilter] = useState('all');
  const [message, setMessage] = useState('');

  // Sample data for demo
  const allRentals = [
    {
      id: 1,
      vhsTitle: "The Shawshank Redemption",
      rentalDate: "2024-01-10",
      dueDate: "2024-01-17",
      returnDate: null,
      totalPrice: 20.93,
      status: "ACTIVE"
    },
    {
      id: 2,
      vhsTitle: "Pulp Fiction",
      rentalDate: "2024-01-05",
      dueDate: "2024-01-10",
      returnDate: "2024-01-09",
      totalPrice: 14.95,
      status: "RETURNED"
    },
    {
      id: 3,
      vhsTitle: "The Matrix",
      rentalDate: "2024-01-15",
      dueDate: "2024-01-20",
      returnDate: null,
      totalPrice: 17.94,
      status: "ACTIVE"
    },
    {
      id: 4,
      vhsTitle: "Blade Runner",
      rentalDate: "2023-12-20",
      dueDate: "2023-12-25",
      returnDate: "2023-12-24",
      totalPrice: 17.45,
      status: "RETURNED"
    }
  ];

  const rentals = filter === 'active' 
    ? allRentals.filter(r => r.status === 'ACTIVE')
    : allRentals;

  const handleReturn = (id) => {
    setMessage('VHS returned successfully!');
    setTimeout(() => setMessage(''), 3000);
  };

  const getDaysRemaining = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

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
                        <p className="text-white text-lg font-bold">
                          ${rental.totalPrice.toFixed(2)}
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