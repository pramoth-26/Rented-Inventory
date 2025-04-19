// IssueRentalBill.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const IssueRentalBill = () => {
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    mobile_no: '',
    item_name: '',
    quantity: 1,
  });

  useEffect(() => {
    // Fetch available items from backend API
    const fetchItems = async () => {
      try {
        const response = await axios.get('/api/items');
        setItems(response.data);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };
    fetchItems();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/issue-bill', formData);
      alert(response.data.message);
    } catch (error) {
      alert(error.response?.data?.message || 'Something went wrong!');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Issue Rental Bill</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block font-semibold mb-1">Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block font-semibold mb-1">Mobile No:</label>
            <input
              type="text"
              name="mobile_no"
              value={formData.mobile_no}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block font-semibold mb-1">Item Name:</label>
            <select
              name="item_name"
              value={formData.item_name}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            >
              <option value="">Select an item</option>
              {items.map((item, index) => (
                <option key={index} value={item.item_name}>
                  {item.item_name} (Available: {item.quantity})
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block font-semibold mb-1">Quantity:</label>
            <input
              type="number"
              name="quantity"
              min="1"
              value={formData.quantity}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
            Issue Bill
          </button>
        </form>
      </div>
    </div>
  );
};

export default IssueRentalBill;
