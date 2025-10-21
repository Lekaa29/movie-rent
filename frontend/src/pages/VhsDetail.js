import React, { useState } from 'react';
import { Star, Calendar, Film, User, Clock, Package } from 'lucide-react';

const VhsDetail = () => {
  const [rentalDays, setRentalDays] = useState(3);
  const [reviewForm, setReviewForm] = useState({ rating: 5, comment: '' });
  const [message, setMessage] = useState('');

  // Sample data for demo
  const vhs = {
    id: 1,
    title: "The Shawshank Redemption",
    director: "Frank Darabont",
    genre: "Drama",
    releaseYear: 1994,
    description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency. A timeless tale of hope and friendship that has captivated audiences for decades.",
    coverImageUrl: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800&h=1200&fit=crop",
    dailyRentalPrice: 2.99,
    availableCopies: 3,
    totalCopies: 5,
    averageRating: 4.8,
    reviewCount: 127
  };

  const reviews = [
    {
      id: 1,
      username: "MovieBuff92",
      rating: 5,
      comment: "An absolute masterpiece! The VHS quality brings a nostalgic charm to this already perfect film.",
      createdAt: "2024-01-15"
    },
    {
      id: 2,
      username: "ClassicFilmFan",
      rating: 4,
      comment: "Great condition tape. The movie is phenomenal and watching it on VHS is a unique experience.",
      createdAt: "2024-01-10"
    }
  ];

  const totalPrice = (vhs.dailyRentalPrice * rentalDays).toFixed(2);

  const handleRent = () => {
    setMessage('VHS rented successfully!');
    setTimeout(() => setMessage(''), 3000);
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    setMessage('Review submitted successfully!');
    setReviewForm({ rating: 5, comment: '' });
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Message Banner */}
      {message && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-top duration-500">
          <div className="px-6 py-3 rounded-full backdrop-blur-md bg-green-500 bg-opacity-20 border border-green-400 border-opacity-30 text-green-300">
            {message}
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6 py-24">
        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 mb-16">
          {/* Image */}
          <div className="lg:col-span-2">
            <div className="sticky top-24">
              <div className="relative aspect-[2/3] rounded-2xl overflow-hidden border border-white border-opacity-20">
                {vhs.coverImageUrl ? (
                  <img 
                    src={vhs.coverImageUrl} 
                    alt={vhs.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
                    <span className="text-slate-600 text-sm uppercase tracking-wider">No Image</span>
                  </div>
                )}
                
                {/* Availability Badge */}
                <div className="absolute top-6 right-6">
                  <div className="px-4 py-2 rounded-full backdrop-blur-md bg-green-500 bg-opacity-20 text-green-300 border border-green-400 border-opacity-30">
                    <span className="text-sm font-medium">{vhs.availableCopies} Available</span>
                  </div>
                </div>

                {/* Rating Badge */}
                {vhs.averageRating > 0 && (
                  <div className="absolute top-6 left-6">
                    <div className="px-4 py-2 rounded-full backdrop-blur-md bg-white bg-opacity-10 border border-white border-opacity-20 flex items-center gap-2">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <span className="text-white text-sm font-medium">
                        {vhs.averageRating.toFixed(1)}
                      </span>
                      <span className="text-white text-sm opacity-60">
                        ({vhs.reviewCount})
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Info */}
          <div className="lg:col-span-3 space-y-8">
            {/* Title & Genre */}
            <div>
              <div className="inline-block mb-4">
                <span className="text-xs uppercase tracking-wider px-3 py-1.5 rounded-full border border-white border-opacity-30 text-white opacity-60">
                  {vhs.genre}
                </span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight leading-tight">
                {vhs.title}
              </h1>
            </div>

            {/* Meta Info */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-white opacity-60">
                  <User className="w-4 h-4" />
                  <span className="text-xs uppercase tracking-wider">Director</span>
                </div>
                <p className="text-white font-medium">{vhs.director}</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-white opacity-60">
                  <Calendar className="w-4 h-4" />
                  <span className="text-xs uppercase tracking-wider">Year</span>
                </div>
                <p className="text-white font-medium">{vhs.releaseYear}</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-white opacity-60">
                  <Package className="w-4 h-4" />
                  <span className="text-xs uppercase tracking-wider">Copies</span>
                </div>
                <p className="text-white font-medium">{vhs.availableCopies} / {vhs.totalCopies}</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-white opacity-60">
                  <Film className="w-4 h-4" />
                  <span className="text-xs uppercase tracking-wider">Price</span>
                </div>
                <p className="text-white font-medium">${vhs.dailyRentalPrice}/day</p>
              </div>
            </div>

            {/* Description */}
            <div className="rounded-2xl p-6 border border-white border-opacity-20">
              <h3 className="text-xs uppercase tracking-wider text-white opacity-60 mb-4">Description</h3>
              <p className="text-white text-lg leading-relaxed opacity-80">
                {vhs.description}
              </p>
            </div>

            {/* Rental Section */}
            {vhs.availableCopies > 0 && (
              <div className="rounded-2xl p-8 border border-white border-opacity-20 space-y-6">
                <h3 className="text-xs uppercase tracking-wider text-white opacity-60">Rent This VHS</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Clock className="w-5 h-5 text-white opacity-60" />
                    <label className="flex items-center gap-4 flex-1">
                      <span className="text-white text-sm">Number of days:</span>
                      <input
                        type="number"
                        min="1"
                        max="30"
                        value={rentalDays}
                        onChange={(e) => setRentalDays(parseInt(e.target.value) || 1)}
                        className="w-24 px-4 py-2 bg-transparent border border-white border-opacity-30 rounded-xl text-white focus:outline-none focus:border-opacity-50 transition-all duration-300"
                      />
                    </label>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-white border-opacity-10">
                    <span className="text-white text-lg">Total Price:</span>
                    <span className="text-white text-3xl font-bold">${totalPrice}</span>
                  </div>

                  <button 
                    onClick={handleRent}
                    className="w-full py-4 rounded-xl bg-white text-black font-medium hover:bg-opacity-90 transition-all duration-300 text-sm uppercase tracking-wider"
                  >
                    Rent Now
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Reviews Section */}
        <div className="space-y-8">
          <h2 className="text-3xl font-bold text-white tracking-tight">Reviews</h2>

          {/* Write Review Form */}
          <div className="rounded-2xl p-8 border border-white border-opacity-20 space-y-6">
            <h3 className="text-xs uppercase tracking-wider text-white opacity-60">Write a Review</h3>
            
            <form onSubmit={handleSubmitReview} className="space-y-6">
              <div>
                <label className="block text-sm text-white opacity-80 mb-3">Rating</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map(num => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setReviewForm({ ...reviewForm, rating: num })}
                      className="transition-all duration-300"
                    >
                      <Star 
                        className={`w-8 h-8 ${
                          num <= reviewForm.rating 
                            ? 'text-yellow-400 fill-yellow-400' 
                            : 'text-white opacity-20'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm text-white opacity-80 mb-3">Comment</label>
                <textarea
                  value={reviewForm.comment}
                  onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
                  rows="4"
                  className="w-full px-4 py-3 bg-transparent border border-white border-opacity-30 rounded-xl text-white focus:outline-none focus:border-opacity-50 transition-all duration-300 resize-none"
                  placeholder="Share your thoughts about this VHS..."
                />
              </div>

              <button 
                type="submit"
                className="px-8 py-3 rounded-xl bg-white text-black font-medium hover:bg-opacity-90 transition-all duration-300 text-sm uppercase tracking-wider"
              >
                Submit Review
              </button>
            </form>
          </div>

          {/* Reviews List */}
          <div className="space-y-4">
            {reviews.length === 0 ? (
              <div className="rounded-2xl p-12 border border-white border-opacity-20 text-center">
                <p className="text-white opacity-60">No reviews yet. Be the first to review!</p>
              </div>
            ) : (
              reviews.map((review) => (
                <div 
                  key={review.id}
                  className="rounded-2xl p-6 border border-white border-opacity-20 space-y-3"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-white font-medium">{review.username}</p>
                      <p className="text-white text-sm opacity-60">
                        {new Date(review.createdAt).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </p>
                    </div>
                    <div className="flex gap-1">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-white opacity-80 leading-relaxed">
                    {review.comment}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VhsDetail;