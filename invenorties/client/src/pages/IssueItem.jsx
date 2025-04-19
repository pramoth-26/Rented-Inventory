import { useEffect, useState } from 'react';
import axios from 'axios';
import { jsPDF } from 'jspdf';
import { FaFilePdf } from 'react-icons/fa';
import Header from '../components/Header';

const styles = {

  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    width: '100vw',
    padding: '20px',
    backgroundColor: '#f4f4f9',
  },
  contentWrapper: {
    width: '90%',
    maxWidth: '1200px',
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '12px',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
  },
  heading: {
    fontSize: '26px',
    fontWeight: 'bold',
    marginBottom: '20px',
    color: '#333',
  },
  tableContainer: {
    width: '100%',
    overflowX: 'auto',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    borderRadius: '8px',
    overflow: 'hidden',
    backgroundColor: 'white',
  },
  thead: {
    backgroundColor: '#03dac6',
    color: 'white',
    fontSize: '18px',
  },
  thTd: {
    border: '1px solid #ddd',
    padding: '12px',
    textAlign: 'center',
    fontSize: '16px',
  },
  pdfIcon: {
    color: 'red',
    fontSize: '20px',
    cursor: 'pointer',
  },
  tbodyTr: {
    backgroundColor: 'white',
    transition: 'background 0.3s ease',
  },
};

const IssueItem = () => {
  const [issuedItems, setIssuedItems] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/issue')
      .then(res => setIssuedItems(res.data))
      .catch(err => console.error('Error fetching issued items:', err));
  }, []);

  // Function to generate and download PDF
  const generatePDF = (item) => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text('Issued Item Receipt', 70, 20);

    doc.setFontSize(12);
    doc.text(`Name: ${item.name}`, 20, 40);
    doc.text(`Mobile No: ${item.mobileNo}`, 20, 50);
    doc.text(`Item Name: ${item.itemName}`, 20, 60);
    doc.text(`Quantity: ${item.quantity}`, 20, 70);
    doc.text(`Issue Date & Time: ${new Date(item.issueDateTime).toLocaleString()}`, 20, 80);

    doc.save(`Issue_Receipt_${item.name}.pdf`);
  };

  return (
    <div style={styles.container}>
      <Header /><br /><br /><br /><br /><br />
      <div style={styles.contentWrapper}>
        <h2 style={styles.heading}>Issued Items</h2>
        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead style={styles.thead}>
              <tr>
                <th style={styles.thTd}>Name</th>
                <th style={styles.thTd}>Mobile No</th>
                <th style={styles.thTd}>Item Name</th>
                <th style={styles.thTd}>Quantity</th>
                <th style={styles.thTd}>Issue Date</th>
                <th style={styles.thTd}>Download PDF</th>
              </tr>
            </thead>
            <tbody>
              {issuedItems.map((item, index) => (
                <tr key={index} style={styles.tbodyTr} 
                    onMouseEnter={(e) => e.currentTarget.style.background = '#f1f1f1'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'white'}>
                  <td style={styles.thTd}>{item.name}</td>
                  <td style={styles.thTd}>{item.mobileNo}</td>
                  <td style={styles.thTd}>{item.itemName}</td>
                  <td style={styles.thTd}>{item.quantity}</td>
                  <td style={styles.thTd}>
                    {new Date(item.issueDateTime).toLocaleDateString()} - {new Date(item.issueDateTime).toLocaleTimeString()}
                  </td>
                  <td style={styles.thTd}>
                    <FaFilePdf style={styles.pdfIcon} onClick={() => generatePDF(item)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default IssueItem;
