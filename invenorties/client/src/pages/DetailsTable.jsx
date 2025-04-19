import React, { useEffect, useState } from 'react';
import './DetailsTable.css';
import Header from '../components/Header';

const DetailsTable = () => {
  const [details, setDetails] = useState([]);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/inventories/details');
        const data = await response.json();
        setDetails(data);
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };

    fetchDetails();
  }, []);

  return (
        <div className='icontainer'>
          <Header />
    <div className="details-container">
      <h2>Inventory Action Logs</h2>
      <div className="table-wrapper">
        <table className="details-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Mobile</th>
              <th>Item</th>
              <th>Qty</th>
              <th>Action</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {details.map((entry) => (
              <tr key={entry._id}>
                <td data-label="Name">{entry.name}</td>
                <td data-label="Mobile">{entry.mobileNo}</td>
                <td data-label="Item">{entry.itemName}</td>
                <td data-label="Qty">{entry.quantity}</td>
                <td
                  data-label="Action"
                  className={entry.action === 'issue' ? 'issue' : 'receive'}
                >
                  {entry.action}
                </td>
                <td data-label="Date">{new Date(entry.dateTime).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
};

export default DetailsTable;
