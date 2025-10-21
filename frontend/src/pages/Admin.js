import React, { useState, useEffect } from 'react';
import { vhsAPI, rentalAPI } from '../services/api';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('vhs');
  const [vhsList, setVhsList] = useState([]);
  const [rentals, setRentals] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    director: '',
    genre: '',
    releaseYear: '',
    description: '',
    totalCopies: '',
    dailyRentalPrice: '',
    coverImageUrl: '',
  });
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (activeTab === 'vhs') loadVhs();
    if (activeTab === 'rentals') loadRentals();
  }, [activeTab]);

  const loadVhs = async () => {
    try {
      const response = await vhsAPI.getAll();
      setVhsList(response.data);
    } catch (error) {
      console.error('Error loading VHS:', error);
    }
  };

  const loadRentals = async () => {
    try {
      const response = await rentalAPI.getAll();
      setRentals(response.data);
    } catch (error) {
      console.error('Error loading rentals:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        ...formData,
        releaseYear: parseInt(formData.releaseYear),
        totalCopies: parseInt(formData.totalCopies),
        dailyRentalPrice: parseFloat(formData.dailyRentalPrice),
      };

      if (editingId) {
        await vhsAPI.update(editingId, data);
        setMessage('VHS updated successfully!');
      } else {
        await vhsAPI.create(data);
        setMessage('VHS created successfully!');
      }

      resetForm();
      loadVhs();
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Operation failed');
    }
  };

  const handleEdit = (vhs) => {
    setFormData({
      title: vhs.title,
      director: vhs.director || '',
      genre: vhs.genre || '',
      releaseYear: vhs.releaseYear || '',
      description: vhs.description || '',
      totalCopies: vhs.totalCopies,
      dailyRentalPrice: vhs.dailyRentalPrice,
      coverImageUrl: vhs.coverImageUrl || '',
    });
    setEditingId(vhs.id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this VHS?')) {
      try {
        await vhsAPI.delete(id);
        setMessage('VHS deleted successfully!');
        loadVhs();
        setTimeout(() => setMessage(''), 3000);
      } catch (error) {
        setMessage('Failed to delete VHS');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      director: '',
      genre: '',
      releaseYear: '',
      description: '',
      totalCopies: '',
      dailyRentalPrice: '',
      coverImageUrl: '',
    });
    setEditingId(null);
  };

  return (
    <div style={styles.container}>
      <h1>Admin Dashboard</h1>
      {message && <div style={styles.message}>{message}</div>}

      <div style={styles.tabs}>
        <button
          onClick={() => setActiveTab('vhs')}
          style={activeTab === 'vhs' ? styles.activeTab : styles.tab}
        >
          Manage VHS
        </button>
        <button
          onClick={() => setActiveTab('rentals')}
          style={activeTab === 'rentals' ? styles.activeTab : styles.tab}
        >
          View Rentals
        </button>
      </div>

      {activeTab === 'vhs' && (
        <>
          <div style={styles.formSection}>
            <h2>{editingId ? 'Edit VHS' : 'Add New VHS'}</h2>
            <form onSubmit={handleSubmit} style={styles.form}>
              <input
                type="text"
                placeholder="Title *"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                style={styles.input}
                required
              />
              <input
                type="text"
                placeholder="Director"
                value={formData.director}
                onChange={(e) => setFormData({ ...formData, director: e.target.value })}
                style={styles.input}
              />
              <input
                type="text"
                placeholder="Genre"
                value={formData.genre}
                onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
                style={styles.input}
              />
              <input
                type="number"
                placeholder="Release Year"
                value={formData.releaseYear}
                onChange={(e) => setFormData({ ...formData, releaseYear: e.target.value })}
                style={styles.input}
              />
              <textarea
                placeholder="Description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                style={styles.textarea}
              />
              <input
                type="number"
                placeholder="Total Copies *"
                value={formData.totalCopies}
                onChange={(e) => setFormData({ ...formData, totalCopies: e.target.value })}
                style={styles.input}
                required
              />
              <input
                type="number"
                step="0.01"
                placeholder="Daily Rental Price *"
                value={formData.dailyRentalPrice}
                onChange={(e) => setFormData({ ...formData, dailyRentalPrice: e.target.value })}
                style={styles.input}
                required
              />
              <input
                type="text"
                placeholder="Cover Image URL"
                value={formData.coverImageUrl}
                onChange={(e) => setFormData({ ...formData, coverImageUrl: e.target.value })}
                style={styles.input}
              />
              <div style={styles.buttonGroup}>
                <button type="submit" style={styles.submitButton}>
                  {editingId ? 'Update' : 'Create'}
                </button>
                {editingId && (
                  <button type="button" onClick={resetForm} style={styles.cancelButton}>
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>

          <div style={styles.listSection}>
            <h2>VHS List</h2>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Title</th>
                  <th style={styles.th}>Director</th>
                  <th style={styles.th}>Genre</th>
                  <th style={styles.th}>Copies</th>
                  <th style={styles.th}>Price</th>
                  <th style={styles.th}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {vhsList.map((vhs) => (
                  <tr key={vhs.id}>
                    <td style={styles.td}>{vhs.title}</td>
                    <td style={styles.td}>{vhs.director}</td>
                    <td style={styles.td}>{vhs.genre}</td>
                    <td style={styles.td}>{vhs.availableCopies}/{vhs.totalCopies}</td>
                    <td style={styles.td}>${vhs.dailyRentalPrice}</td>
                    <td style={styles.td}>
                      <button onClick={() => handleEdit(vhs)} style={styles.editButton}>
                        Edit
                      </button>
                      <button onClick={() => handleDelete(vhs.id)} style={styles.deleteButton}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {activeTab === 'rentals' && (
        <div style={styles.listSection}>
          <h2>All Rentals</h2>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>User</th>
                <th style={styles.th}>VHS</th>
                <th style={styles.th}>Rental Date</th>
                <th style={styles.th}>Due Date</th>
                <th style={styles.th}>Status</th>
                <th style={styles.th}>Price</th>
              </tr>
            </thead>
            <tbody>
              {rentals.map((rental) => (
                <tr key={rental.id}>
                  <td style={styles.td}>{rental.username}</td>
                  <td style={styles.td}>{rental.vhsTitle}</td>
                  <td style={styles.td}>{new Date(rental.rentalDate).toLocaleDateString()}</td>
                  <td style={styles.td}>{new Date(rental.dueDate).toLocaleDateString()}</td>
                  <td style={styles.td}>
                    <span style={rental.status === 'ACTIVE' ? styles.activeStatus : styles.returnedStatus}>
                      {rental.status}
                    </span>
                  </td>
                  <td style={styles.td}>${rental.totalPrice}</td>
                </tr>
              ))}
            </tbody>
          </table>
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
  tabs: {
    display: 'flex',
    gap: '1rem',
    marginBottom: '2rem',
  },
  tab: {
    padding: '0.75rem 1.5rem',
    backgroundColor: '#fff',
    color: '#333',
    border: '1px solid #ddd',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  activeTab: {
    padding: '0.75rem 1.5rem',
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  formSection: {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '8px',
    marginBottom: '2rem',
    border: '1px solid #ddd',
  },
  form: {
    display: 'grid',
    gap: '1rem',
  },
  input: {
    padding: '0.75rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '1rem',
  },
  textarea: {
    padding: '0.75rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '1rem',
    minHeight: '100px',
  },
  buttonGroup: {
    display: 'flex',
    gap: '1rem',
  },
  submitButton: {
    padding: '0.75rem 1.5rem',
    backgroundColor: '#2ecc71',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  cancelButton: {
    padding: '0.75rem 1.5rem',
    backgroundColor: '#95a5a6',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  listSection: {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '8px',
    border: '1px solid #ddd',
    overflowX: 'auto',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  th: {
    textAlign: 'left',
    padding: '0.75rem',
    borderBottom: '2px solid #ddd',
    backgroundColor: '#f8f9fa',
  },
  td: {
    padding: '0.75rem',
    borderBottom: '1px solid #ddd',
  },
  editButton: {
    padding: '0.5rem 1rem',
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginRight: '0.5rem',
  },
  deleteButton: {
    padding: '0.5rem 1rem',
    backgroundColor: '#e74c3c',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  activeStatus: {
    color: '#2ecc71',
    fontWeight: 'bold',
  },
  returnedStatus: {
    color: '#95a5a6',
    fontWeight: 'bold',
  },
};

export default Admin;