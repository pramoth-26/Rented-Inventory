const express = require('express');
const mongoose = require('mongoose');
const Inventory = require('../models/Inventory');
const Variety = require('../models/Variety');
const Issue = require('../models/Issue');
const Receive = require('../models/Receive');
const router = express.Router();

// Add a new item to the inventory
router.post('/inventories', async (req, res) => {
  const { itemName, quantity, variety } = req.body;

  try {
    const newItem = new Inventory({ itemName, quantity, variety });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(500).json({ message: 'Error adding item', error: err.message });
  }
});

router.post('/ReturnInventories', async (req, res) => {
  const { itemName, quantity } = req.body;

  try {
    if (quantity <= 0) {
      return res.status(400).json({ message: 'Quantity must be positive' });
    }

    // Find the issued item
    const issuedItem = await Issue.findOne({ itemName });
    if (!issuedItem) {
      return res.status(404).json({ message: 'Issued item not found' });
    }

    // Check if returning quantity is valid
    if (quantity > issuedItem.quantity) {
      return res.status(400).json({ message: 'Return quantity exceeds issued quantity' });
    }

    // Reduce the issued quantity or remove if it's fully returned
    if (quantity === issuedItem.quantity) {
      await Issue.deleteOne({ itemName }); // Fully returned, remove entry
    } else {
      await Issue.updateOne(
        { itemName },
        { $inc: { quantity: -quantity } } // Reduce the issued quantity
      );
    }

    // Update inventory
    const updatedItem = await Inventory.findOneAndUpdate(
      { itemName },
      { $inc: { quantity: quantity } },
      { new: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ message: 'Item not found in inventory' });
    }

    res.status(200).json({ 
      message: 'Item returned successfully',
      item: updatedItem
    });

  } catch (err) {
    res.status(500).json({ message: 'Error processing return', error: err.message });
  }
});


// Get all inventory items
router.get('/inventories', async (req, res) => {
  try {
    const items = await Inventory.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching inventory items', error: err.message });
  }
});

// Add a new variety
router.post('/varieties', async (req, res) => {
  const { varietyName } = req.body;

  try {
    const newVariety = new Variety({ varietyName });
    await newVariety.save();
    res.status(201).json(newVariety);
  } catch (err) {
    res.status(500).json({ message: 'Error adding variety', error: err.message });
  }
});

// Get all varieties
router.get('/varieties', async (req, res) => {
  try {
    const varieties = await Variety.find();
    res.json(varieties);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching varieties', error: err.message });
  }
});


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
router.get('/issue', async (req, res) => {
  const issues = await Issue.find();
  res.json(issues);
});



router.post('/inventories/receive', async (req, res) => {
  const { itemId, quantity } = req.body;

  try {
    const issue = await Issue.findById(itemId);
    if (!issue) return res.status(404).json({ message: 'Issued item not found' });

    if (quantity > issue.quantity) {
      return res.status(400).json({ message: 'Return quantity exceeds issued quantity' });
    }

    // Update inventory
    const inventoryItem = await Inventory.findOne({ itemName: issue.itemName });
    if (inventoryItem) {
      inventoryItem.quantity += quantity;
      await inventoryItem.save();
    } else {
      await Inventory.create({ itemName: issue.itemName, quantity });
    }

    // Update or remove from issues
    if (issue.quantity === quantity) {
      await Issue.findByIdAndDelete(itemId);
    } else {
      issue.quantity -= quantity;
      await issue.save();
    }

    res.json({ message: 'Item received successfully' });
  } catch (error) {
    console.error('Receive error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


router.post('/inventories/issue', async (req, res) => {
  const { name, mobileNo, itemName, quantity } = req.body;

  if (!name || !mobileNo || !itemName || !quantity || quantity <= 0) {
    return res.status(400).json({ message: 'Invalid input data' });
  }

  try {
    // Check inventory
    const inventoryItem = await Inventory.findOne({ itemName });

    if (!inventoryItem) {
      return res.status(404).json({ message: 'Item not found in inventory' });
    }

    if (inventoryItem.quantity < quantity) {
      return res.status(400).json({ message: 'Insufficient inventory quantity' });
    }

    // Create a new issue
    const newIssue = new Issue({ name, mobileNo, itemName, quantity });
    await newIssue.save();

    // Reduce inventory
    inventoryItem.quantity -= quantity;
    await inventoryItem.save();

    res.status(201).json({ message: 'Item issued successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error issuing item', error: error.message });
  }
});


module.exports = router;