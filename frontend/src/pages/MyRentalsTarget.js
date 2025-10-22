import React, { useState, useEffect } from 'react';
import { rentalAPI } from '../services/api';

const MyRentals = () => {
  const [rentals, setRentals] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

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

  if (loading) return <div style={styles.container}>Loading...</div>;

  return (
    <div style={styles.container}>
      <h1>My Rentals</h1>
      {message && <div style={styles.message}>{message}</div>}
      
      <div style={styles.filterButtons}>
        <button 
          onClick={() => setFilter('all')}
          style={filter === 'all' ? styles.activeButton : styles.button}
        >
          All Rentals
        </button>
        <button 
          onClick={() => setFilter('active')}
          style={filter === 'active' ? styles.activeButton : styles.button}
        >
          Active Rentals
        </button>
      </div>

      {rentals.length === 0 ? (
        <p>No rentals found.</p>
      ) : (
        <div style={styles.rentalsList}>
          {rentals.map((rental) => (
            <div key={rental.id} style={styles.rentalCard}>
              <h3>{rental.vhsTitle}</h3>
              <p><strong>Rental Date:</strong> {new Date(rental.rentalDate).toLocaleDateString()}</p>
              <p><strong>Due Date:</strong> {new Date(rental.dueDate).toLocaleDateString()}</p>
              {rental.returnDate && (
                <p><strong>Return Date:</strong> {new Date(rental.returnDate).toLocaleDateString()}</p>
              )}
              <p><strong>Total Price:</strong> ${rental.totalPrice}</p>
              <p><strong>Status:</strong> 
                <span style={rental.status === 'ACTIVE' ? styles.activeStatus : styles.returnedStatus}>
                  {rental.status}
                </span>
              </p>
              {rental.status === 'ACTIVE' && (
                <button onClick={() => handleReturn(rental.id)} style={styles.returnButton}>
                  Return VHS
                </button>
              )}
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
  filterButtons: {
    display: 'flex',
    gap: '1rem',
    marginBottom: '2rem',
  },
  button: {
    padding: '0.75rem 1.5rem',
    backgroundColor: '#fff',
    color: '#333',
    border: '1px solid #ddd',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  activeButton: {
    padding: '0.75rem 1.5rem',
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  rentalsList: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '1.5rem',
  },
  rentalCard: {
    padding: '1.5rem',
    backgroundColor: 'white',
    border: '1px solid #ddd',
    borderRadius: '8px',
  },
  activeStatus: {
    color: '#2ecc71',
    fontWeight: 'bold',
    marginLeft: '0.5rem',
  },
  returnedStatus: {
    color: '#95a5a6',
    fontWeight: 'bold',
    marginLeft: '0.5rem',
  },
  returnButton: {
    marginTop: '1rem',
    padding: '0.5rem 1rem',
    backgroundColor: '#e74c3c',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default MyRentals;