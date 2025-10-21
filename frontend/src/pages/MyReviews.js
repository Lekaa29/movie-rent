import React, { useState, useEffect } from 'react';
import { reviewAPI } from '../services/api';

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

  if (loading) return <div style={styles.container}>Loading...</div>;

  return (
    <div style={styles.container}>
      <h1>My Reviews</h1>
      {message && <div style={styles.message}>{message}</div>}

      {reviews.length === 0 ? (
        <p>You haven't written any reviews yet.</p>
      ) : (
        <div style={styles.reviewsList}>
          {reviews.map((review) => (
            <div key={review.id} style={styles.reviewCard}>
              <h3>{review.vhsTitle}</h3>
              <div style={styles.rating}>
                {'⭐'.repeat(review.rating)}
              </div>
              <p>{review.comment}</p>
              <small>{new Date(review.createdAt).toLocaleDateString()}</small>
              <button onClick={() => handleDelete(review.id)} style={styles.deleteButton}>
                Delete Review
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '2rem',
  },
  message: {
    padding: '1rem',
    marginBottom: '1rem',
    backgroundColor: '#d4edda',
    color: '#155724',
    borderRadius: '4px',
    textAlign: 'center',
  },
  reviewsList: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '1.5rem',
  },
  reviewCard: {
    padding: '1.5rem',
    backgroundColor: 'white',
    border: '1px solid #ddd',
    borderRadius: '8px',
  },
  rating: {
    color: '#f39c12',
    fontSize: '1.2rem',
    margin: '0.5rem 0',
  },
  deleteButton: {
    marginTop: '1rem',
    padding: '0.5rem 1rem',
    backgroundColor: '#e74c3c',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default MyReviews;