const express = require('express');
const router = express.Router();
const Issue = require('../models/Issue');
const Inventory = require('../models/Inventory');



// Receive item
router.post('/receive', async (req, res) => {
  const { itemName, quantity } = req.body;
  const issue = await Issue.findOne({ itemName });

  if (!issue) return res.status(404).json({ error: 'Issue not found' });

  // Add back to inventory
  let inventoryItem = await Inventory.findOne({ name: itemName });
  if (inventoryItem) {
    inventoryItem.quantity += quantity;
    await inventoryItem.save();
  }

  issue.quantity -= quantity;
  if (issue.quantity <= 0) await issue.remove();
  else await issue.save();

  res.json({ message: 'Item received successfully' });
});

// Get all issued items
router.get('/', async (req, res) => {
  const issues = await Issue.find();
  res.json(issues);
});

module.exports = router;
