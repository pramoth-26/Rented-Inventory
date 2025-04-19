import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import axios from 'axios';
import './Issuerecive.css';
import Swal from 'sweetalert2';

const ReceivePage = () => {
  const [issuedItems, setIssuedItems] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState('');
  const [returnQuantity, setReturnQuantity] = useState('');

  // Fetch issues from server
  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/issue');
        console.log('Fetched Issues:', response.data); // <=== Add this
        setIssuedItems(response.data);
      } catch (error) {
        console.error('Error fetching issues:', error);
      }
    };
  
    fetchIssues();
  }, []);
  

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const selectedItem = issuedItems.find(item => item._id === selectedItemId);
    if (!selectedItem || !returnQuantity || returnQuantity <= 0) {
      alert('Please select an item and enter a valid quantity.');
      return;
    }
  
    if (parseInt(returnQuantity) > selectedItem.quantity) {
      alert(`Cannot return more than issued quantity (${selectedItem.quantity})`);
      return;
    }
  
    try {
      const res = await axios.post('http://localhost:5000/api/ReturnInventories', {
        itemName: selectedItem.itemName,
        quantity: parseInt(returnQuantity),
      });
  
      Swal.fire({
        title: 'Success!',
        text: 'Item Returned Successfully.',
        icon: 'success',
        confirmButtonText: 'OK'
      });
      setReturnQuantity('');
      setSelectedItemId('');
  
      // Refresh issued items after returning
      const refreshed = await axios.get('http://localhost:5000/api/issue');
      setIssuedItems(refreshed.data);
  
    } catch (error) {
      console.error('Error returning item:', error);
      alert(error.response?.data?.message || 'Failed to return item.');
    }
  };
  

  return (
    <div className="icontainer">
      <Header />
      <div className="icontent">
        <br />
        <h1>Receive Item</h1>
        <br />
        
        <form className="iform" style={styles.form} onSubmit={handleSubmit}>
          <select
            style={styles.input}
            required
            value={selectedItemId}
            onChange={(e) => setSelectedItemId(e.target.value)}
          >
            <option value="">Select Item</option>
            {/* <option value="" disabled>Select Issued Item</option> */}
            {issuedItems.length > 0 ? (
  issuedItems.map((item) => (
    <option key={item._id} value={item._id}>
      {item.itemName} - Qty: {item.quantity} - To: {item.name}
    </option>
  ))
) : (
  <option disabled>No issued items available</option>
)}
          </select>

          <input
            type="number"
            placeholder="Return Quantity"
            style={styles.input}
            min="1"
            required
            value={returnQuantity}
            onChange={(e) => setReturnQuantity(e.target.value)}
          />

          <button type="submit" style={styles.button}>
            Receive Item
          </button>
        </form>
      </div>
    </div>
  );
};

const styles = {
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
      maxWidth: '350px',
      marginTop: '20px',
      width: '100%', // Ensures it adjusts for smaller screens
    },
    input: {
      padding: '10px',
      borderRadius: '6px',
      border: '1px solid #ccc',
      fontSize: '16px',
      width: '100%', // Ensures inputs take full width on small screens
      boxSizing: 'border-box',
    },
    button: {
      padding: '10px',
      backgroundColor: '#333',
      color: '#fff',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      fontSize: '16px',
      width: '100%', // Ensures button adjusts responsively
      transition: 'background 0.3s ease',
    },
    '@media (max-width: 480px)': {
      form: {
        maxWidth: '90%', // Makes form take more space on smaller screens
      },
      input: {
        fontSize: '14px', // Slightly smaller font for small screens
        padding: '8px',
      },
      button: {
        fontSize: '14px',
        padding: '8px',
      },
    },
  };
  


export default ReceivePage;
