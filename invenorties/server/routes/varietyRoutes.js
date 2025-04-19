const express = require('express');
const Variety = require('../models/Variety');
const router = express.Router();

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

module.exports = router;