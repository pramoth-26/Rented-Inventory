const express = require('express');
const router = express.Router();
const Inventory = require('../models/Inventory');
const Issue = require('../models/Issue');

router.post('/', async (req, res) => {
    const { itemId, quantity } = req.body;

    try {
        // Find the issued item
        const issuedItem = await Issue.findById(itemId);
        if (!issuedItem) {
            return res.status(404).json({ message: 'Issued item not found' });
        }

        if (issuedItem.quantity < quantity) {
            return res.status(400).json({ message: 'Return quantity exceeds issued quantity' });
        }

        // Update or add to inventories table
        const inventoryItem = await Inventory.findOne({ itemname: issuedItem.itemname });
        if (inventoryItem) {
            inventoryItem.quantity += quantity;
            await inventoryItem.save();
        } else {
            await Inventory.create({ itemname: issuedItem.itemname, quantity });
        }

        // Update issues table
        issuedItem.quantity -= quantity;
        if (issuedItem.quantity === 0) {
            await Issue.findByIdAndDelete(itemId);
        } else {
            await issuedItem.save();
        }

        res.json({ message: 'Item successfully returned to inventory' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
