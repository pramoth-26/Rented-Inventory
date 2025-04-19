import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import AddForm from '../components/AddForm';
import axios from 'axios';

const Home = () => {
  const [showOptions, setShowOptions] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [varieties, setVarieties] = useState([]);
  const [inventoryItems, setInventoryItems] = useState([]);

  // Fetch varieties from the server
  useEffect(() => {
    const fetchVarieties = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/varieties');
        setVarieties(response.data);
      } catch (error) {
        console.error('Error fetching varieties:', error);
      }
    };
    fetchVarieties();
  }, []);

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

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  const handleAddItem = (newItem) => {
    setInventoryItems([...inventoryItems, newItem]); // Update the inventory items list
  };

  const handleAddVariety = (newVariety) => {
    setVarieties([...varieties, newVariety]); // Update the varieties list
  };

  return (
    <div style={styles.container}>
      <Header />
      <div style={styles.content}><br /><br /><br />
        <h1 style={styles.title}>Inventory Stocks</h1>

        {/* Display inventory items */}
        <div style={styles.inventoryList}>
          <h2>Inventory Items</h2>
          {inventoryItems.length === 0 ? (
            <p>No items found.</p>
          ) : (
            <table style={styles.table}>
              <thead>
                <tr>
                  <th>Item Name</th>
                  <th>Quantity</th>
                  <th>Variety</th>
                </tr>
              </thead>
              <tbody>
                {inventoryItems.map((item) => (
                  <tr key={item._id}>
                    <td>{item.itemName}</td>
                    <td>{item.quantity}</td>
                    <td>{item.variety}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        
      </div>

      {/* Floating + icon with options */}
      <div style={styles.floatingButton} onClick={() => setShowAddForm(true)}>
        <span style={styles.plusIcon}>+</span>
        
      
      </div>

      {/* Unified popup form for adding a new item or variety */}
      {showAddForm && (
        <AddForm
          onClose={() => setShowAddForm(false)}
          onAddItem={handleAddItem}
          onAddVariety={handleAddVariety}
          varieties={varieties}
        />
      )}
    </div>
    
  );
};
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    width: '100vw',
    position: 'relative',
    padding: '20px',
    boxSizing: 'border-box',
    backgroundColor: '#f8f9fa',
  },
  content: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    maxWidth: '1200px',
    margin: 'auto',
  },
  title: {
    fontSize: '2.5rem',
    marginBottom: '20px',
    color: '#1f2937',
    textAlign: 'center',
    fontWeight: '700',
  },
  subtitle: {
    fontSize: '1.2rem',
    color: '#4b5563',
    marginBottom: '40px',
    textAlign: 'center',
    fontWeight: '500',
  },
  inventoryList: {
    width: '90vw',
    minwidth: '9000px',
    maxWidth: '1000px',
    backgroundColor: '#ffffff',
    padding: '25px',
    borderRadius: '12px',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
    overflowX: 'auto',
    transition: 'all 0.3s ease-in-out',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    border: '1px solid #e5e7eb',
    padding: '12px',
    textAlign: 'left',
  },
  th: {
    backgroundColor: '#6366f1',
    color: '#ffffff',
    padding: '12px',
    textAlign: 'left',
    fontSize: '1rem',
  },
  td: {
    padding: '10px',
    borderBottom: '1px solid #e5e7eb',
    fontSize: '0.95rem',
  },
  floatingButton: {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    backgroundColor: '#6366f1',
    color: '#ffffff',
    width: '55px',
    height: '55px',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)',
    zIndex: 1000,
    transition: 'transform 0.2s ease-in-out',
  },
  floatingButtonHover: {
    transform: 'scale(1.1)',
  },
  plusIcon: {
    fontSize: '26px',
    fontWeight: 'bold',
  },
  options: {
    position: 'absolute',
    bottom: '70px',
    right: '10px',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 3px 10px rgba(0, 0, 0, 0.2)',
    padding: '12px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  option: {
    padding: '12px',
    borderRadius: '6px',
    backgroundColor: 'rgba(99, 102, 241, 0.9)',
    color: '#ffffff',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease-in-out',
    textAlign: 'center',
  },
  'option:hover': {
    backgroundColor: '#4f46e5',
  },

  /*** 📌 RESPONSIVE DESIGN ***/
  '@media (max-width: 1024px)': {
    content: {
      width: '95%',
      padding: '15px',
    },
    title: {
      fontSize: '2rem',
    },
    subtitle: {
      fontSize: '1.1rem',
    },
    inventoryList: {
      width: '95%',
      padding: '20px',
    },
    th: {
      fontSize: '0.95rem',
      padding: '10px',
    },
    td: {
      fontSize: '0.9rem',
      padding: '8px',
    },
  },

  '@media (max-width: 768px)': {
    icontainer: {
      width: '100%',
      padding: '10px',
    },
    content: {
      width: '100%',
      padding: '10px',
    },
    title: {
      fontSize: '1.8rem',
    },
    subtitle: {
      fontSize: '1rem',
    },
    inventoryList: {
      width: '100%',
      padding: '15px',
    },
    table: {
      fontSize: '0.9rem',
    },
    th: {
      fontSize: '0.85rem',
      padding: '8px',
    },
    td: {
      fontSize: '0.8rem',
      padding: '6px',
    },
    floatingButton: {
      width: '45px',
      height: '45px',
      bottom: '15px',
      right: '15px',
    },
    plusIcon: {
      fontSize: '22px',
    },
    options: {
      bottom: '50px',
      right: '5px',
    },
    option: {
      padding: '10px',
      fontSize: '14px',
    },
  },

  '@media (max-width: 480px)': {
    title: {
      fontSize: '1.6rem',
    },
    subtitle: {
      fontSize: '0.9rem',
    },
    inventoryList: {
      width: '100%',
      padding: '12px',
      borderRadius: '6px',
      boxShadow: 'none',
    },
    table: {
      fontSize: '0.85rem',
    },
    th: {
      fontSize: '0.8rem',
      padding: '6px',
    },
    td: {
      fontSize: '0.75rem',
      padding: '5px',
    },
    floatingButton: {
      width: '40px',
      height: '40px',
      bottom: '10px',
      right: '10px',
    },
    plusIcon: {
      fontSize: '20px',
    },
    options: {
      bottom: '40px',
    },
    option: {
      padding: '8px',
      fontSize: '12px',
    },
  },
};





export default Home;