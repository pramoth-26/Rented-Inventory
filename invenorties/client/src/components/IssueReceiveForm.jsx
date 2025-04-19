import React, { useState } from 'react';
import axios from 'axios';

const IssueReceiveForm = ({ onClose, inventoryItems, type }) => {
  const [name, setName] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [itemName, setItemName] = useState('');
  const [quantity, setQuantity] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = type === 'issue' ? '/api/inventories/issue' : '/api/inventories/receive';
      const response = await axios.post(`http://localhost:5000${endpoint}`, {
        itemName,
        quantity: parseInt(quantity, 10),
        name,
        mobileNo,
      });
      alert(response.data.message);
      onClose(); // Close the form
    } catch (error) {
      console.error('Error:', error);
      alert(`Error ${type === 'issue' ? 'issuing' : 'receiving'} item`);
    }
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.formContainer}>
        <h2>{type === 'issue' ? 'Issue Item' : 'Receive Item'}</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={styles.input}
            required
          />
          <input
            type="text"
            placeholder="Mobile No"
            value={mobileNo}
            onChange={(e) => setMobileNo(e.target.value)}
            style={styles.input}
            required
          />
          <select
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            style={styles.input}
            required
          >
            <option value="" disabled>Select Item</option>
            {inventoryItems.map((item) => (
              <option key={item._id} value={item.itemName}>
                {item.itemName} (Stock: {item.quantity})
              </option>
            ))}
          </select>
          <input
            type="number"
            placeholder="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            style={styles.input}
            required
          />
          <button type="submit" style={styles.button}>
            {type === 'issue' ? 'Issue' : 'Receive'}
          </button>
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

export default IssueReceiveForm;