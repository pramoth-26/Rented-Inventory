import { useState, useEffect } from "react";
import axios from "axios";

const Receive = () => {
  const [issuedItems, setIssuedItems] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState("");
  const [returnQuantity, setReturnQuantity] = useState("");

  // Fetch issued items from backend
  useEffect(() => {
    const fetchIssuedItems = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/issue");
        setIssuedItems(res.data);
      } catch (error) {
        console.error("Error fetching issued items:", error);
      }
    };
    fetchIssuedItems();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedItemId || !returnQuantity || returnQuantity <= 0) {
      alert("Please select an item and enter a valid quantity.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/inventories", {
        itemId: selectedItemId,
        quantity: parseInt(returnQuantity),
      });

      alert(res.data.message || "Item received successfully!");
      setReturnQuantity("");
      setSelectedItemId("");

      // Refresh issued items list
      const refreshed = await axios.get("http://localhost:5000/api/issue");
      setIssuedItems(refreshed.data);
    } catch (error) {
      console.error("Error receiving item:", error);
      alert("Failed to receive item.");
    }
  };

  return (
  <>
          <Header />
    <div className="container">
      <h2>Receive Item</h2>
      <form onSubmit={handleSubmit}>
        <label> Select Item to Return: </label>
        <select
          value={selectedItemId}
          onChange={(e) => setSelectedItemId(e.target.value)}
          required
        >
          <option value="">Select an item</option>
          {issuedItems.map((item) => (
            <option key={item._id} value={item._id}>
              {item.itemname} (Issued: {item.quantity})
            </option>
          ))}
        </select>

        <label> Enter Quantity to Return: </label>
        <input
          type="number"
          value={returnQuantity}
          onChange={(e) => setReturnQuantity(e.target.value)}
          min="1"
          required
        />

        <button type="submit">Receive Item</button>
      </form>
    </div>
    </>
  );
};

export default Receive;
