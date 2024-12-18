// routes.js
'use strict';
const express = require('express');
const router = express.Router();
const path = require('path');

// Route for serving static files directly from the public directory
router.use(express.static(path.join(__dirname, 'public')));

// Specific routes if needed
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });
  
// Specific routes if needed
router.get('/styles.css', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'css', 'styles.css'));
});

router.get('/veramono.ttf', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'fonts', 'veramono.ttf'));
});

// Example of handling paths starting with a specific prefix
router.get('/tkd.*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'js', req.path));
});

router.get('/splash.jpg', (req, res) => {
  res.set({
    'Cache-Control': 'public, max-age=85400',
    'Expires': new Date(Date.now() + 2592000000).toUTCString(),
    'Content-Type': 'image/jpeg'
  });
  res.sendFile(path.join(__dirname, 'public', req.path));
});

router.get('/favicon.ico', (req, res) => {
  res.status(204).send(); // 204 No Content
});

router.post('/create-character', (req, res) => {
  // Extract character creation data from request body
  const { name, race, classType } = req.body;

  // Validate input here if necessary
  if (!name || !race || !classType) {
    return res.status(400).send('Missing character details');
  }

  try {
    // Create a new character using your CharacterManager
    const newCharacter = new CharacterManager().createCharacter(name, race, classType);

    // Here you would typically save this character to your database or game state
    // For example:
    // await newCharacter.save(); // Assuming you have a method to save to a database

    console.log(`Created new character: ${name}`);
    res.status(201).send('Character created successfully');
  } catch (error) {
    console.error('Error creating character:', error);
    res.status(500).send('Error creating character');
  }
});

module.exports = router;