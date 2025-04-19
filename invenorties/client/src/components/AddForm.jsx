import React, { useState } from 'react';
import axios from 'axios';

const AddForm = ({ onClose, onAddItem, onAddVariety, varieties }) => {
  const [formType, setFormType] = useState('item'); // 'item' or 'variety'
  const [itemName, setItemName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [variety, setVariety] = useState('');
  const [varietyName, setVarietyName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formType === 'item') {
        const response = await axios.post('http://localhost:5000/api/inventories', {
          itemName,
          quantity: parseInt(quantity, 10),
          variety,
        });
        onAddItem(response.data); // Notify parent component
      } else if (formType === 'variety') {
        const response = await axios.post('http://localhost:5000/api/varieties', {
          varietyName,
        });
        onAddVariety(response.data); // Notify parent component
      }
       onClose(); // Close the form
    } catch (error) {
      console.error('Error:', error);
      alert(`Error adding ${formType}`);
    }
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.formContainer}>
        <h2>{formType === 'item' ? 'Add New Item' : 'Add New Variety'}</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          {formType === 'item' ? (
            <>
              <input
                type="text"
                placeholder="Item Name"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                style={styles.input}
                required
              />
              <input
                type="number"
                placeholder="Quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                style={styles.input}
                required
              />
              <select
                value={variety}
                onChange={(e) => setVariety(e.target.value)}
                style={styles.input}
                required
              >
                <option value="" disabled>Select Variety</option>
                {varieties.map((v) => (
                  <option key={v._id} value={v.varietyName}>
                    {v.varietyName}
                  </option>
                ))}
              </select>
            </>
          ) : (
            <input
              type="text"
              placeholder="Variety Name"
              value={varietyName}
              onChange={(e) => setVarietyName(e.target.value)}
              style={styles.input}
              required
            />
          )}
          <button type="submit" style={styles.button}>
            {formType === 'item' ? 'Add Item' : 'Add Variety'}
          </button>
          <button type="button" onClick={onClose} style={styles.cancelButton}>
            Cancel
          </button>
        </form>
        <button
          type="button"
          onClick={() => setFormType(formType === 'item' ? 'variety' : 'item')}
          style={styles.toggleButton}
        >
          Switch to {formType === 'item' ? 'Add Variety' : 'Add Item'}
        </button>
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
  toggleButton: {
    marginTop: '10px',
    padding: '10px',
    backgroundColor: '#666',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
    width: '100%',
  },
};

export default AddForm;