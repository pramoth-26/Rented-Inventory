import React, { useState } from 'react';
import axios from 'axios';

const AddVarietyForm = ({ onClose, onAddVariety }) => {
  const [varietyName, setVarietyName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/varieties', {
        varietyName,
      });
      onAddVariety(response.data); // Notify parent component
      
       onClose(); // Close the form
    } catch (error) {
      console.error('Error adding variety:', error);
      alert('Error adding variety');
    }
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.formContainer}>
        <h2>Add New Variety</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            placeholder="Variety Name"
            value={varietyName}
            onChange={(e) => setVarietyName(e.target.value)}
            style={styles.input}
            required
          />
          <button type="submit" style={styles.button}>Add Variety</button>
          <button type="button" onClick={onClose} style={styles.cancelButton}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  formContainer: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    width: '300px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  input: {
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '16px',
  },
  button: {
    padding: '10px',
    backgroundColor: '#333',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
  },
  cancelButton: {
    padding: '10px',
    backgroundColor: '#ccc',
    color: '#333',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
  },
};

export default AddVarietyForm;