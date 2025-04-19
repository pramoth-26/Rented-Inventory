import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import './Issuerecive.css';
import Swal from 'sweetalert2';

const IssuePage = () => {
  const [name, setName] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [itemName, setItemName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [inventoryItems, setInventoryItems] = useState([]);
  const navigate = useNavigate();

  // Fetch inventory items from the server
  useEffect(() => {
    const fetchInventoryItems = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/inventories');
        setInventoryItems(response.data);
      } catch (error) {
        console.error('Error fetching inventory items:', error);
      }
    };
    fetchInventoryItems();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
  e.preventDefault();
  if (!itemName || !quantity) {
    alert('Please select an item and enter a quantity.');
    return;
  }

  try {
    const payload = {
      name,
      mobileNo,
      itemName,
      quantity: parseInt(quantity, 10),
    };
    console.log('Sending payload:', payload); // Log the payload

    const response = await axios.post('http://localhost:5000/api/inventories/issue', payload);
    Swal.fire({
      title: 'Success!',
      text: 'Item has been issued.',
      icon: 'success',
      confirmButtonText: 'OK'
    });
    setName('');
    setMobileNo('');
    setItemName('');
    setQuantity('');
    // navigate('/'); // Redirect to home after issuing
  } catch (error) {
    console.error('Error issuing bill:', error.response?.data || error.message); // Log the error
    alert('Error issuing bill');
  }
};

  return (
    <div className='icontainer'>
      <Header />
      <div className='icontent'><br />
      <h1>Issue Bill</h1><br /><br />
        
        <form onSubmit={handleSubmit} className='iform'>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className='iinput'
            required
          />
          <input
            type="text"
            placeholder="Mobile No"
            value={mobileNo}
            onChange={(e) => setMobileNo(e.target.value)}
            className='iinput'
            pattern="[0-9]{10}"
            required
          />

          <h3>Select Item</h3>
          <select
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            className='iinput'
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
            className='iinput'
            required
          />

          <button type="submit" className='ibutton'>
            Issue Bill
          </button>
        </form>
      </div>
    </div>
  );
};

export default IssuePage;