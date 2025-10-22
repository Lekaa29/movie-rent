import React, { useState, useEffect } from 'react';
import { reviewAPI } from '../services/api';
import { Star, Trash2, MessageSquare } from 'lucide-react';

const MyReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadReviews();
  }, []);

  const loadReviews = async () => {
    try {
      const response = await reviewAPI.getMyReviews();
      setReviews(response.data);
    } catch (error) {
      console.error('Error loading reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      try {
        await reviewAPI.delete(id);
        setMessage('Review deleted successfully!');
        loadReviews();
        setTimeout(() => setMessage(''), 3000);
      } catch (error) {
        setMessage('Failed to delete review');
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-white text-lg opacity-60">Loading...</div>
      </div>
    );
  }

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
            My Reviews
          </h1>
          <div className="w-32 h-1 bg-white opacity-20"></div>
        </div>

        {/* Reviews Grid */}
        {reviews.length === 0 ? (
          <div className="rounded-2xl p-12 border border-white border-opacity-20 text-center">
            <MessageSquare className="w-16 h-16 text-white opacity-20 mx-auto mb-4" />
            <p className="text-white text-lg opacity-60">You haven't written any reviews yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="rounded-2xl p-6 border border-white border-opacity-20 space-y-4 hover:border-opacity-30 transition-all duration-300 group"
              >
                {/* Title */}
                <h3 className="text-white text-xl font-medium leading-tight group-hover:opacity-80 transition-opacity duration-300">
                  {review.vhsTitle}
                </h3>

                {/* Rating */}
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < review.rating
                          ? 'text-yellow-400 fill-yellow-400'
                          : 'text-white opacity-20'
                      }`}
                    />
                  ))}
                </div>

                {/* Comment */}
                <p className="text-white opacity-80 leading-relaxed">
                  {review.comment}
                </p>

                {/* Date & Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-white border-opacity-10">
                  <span className="text-white text-sm opacity-60">
                    {new Date(review.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </span>

                  <button
                    onClick={() => handleDelete(review.id)}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg border border-red-400 border-opacity-30 text-red-400 hover:bg-red-500 hover:bg-opacity-20 transition-all duration-300 text-sm"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyReviews;