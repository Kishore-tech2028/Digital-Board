// backend/routes.js

const express = require('express');
const { getDb } = require('./db');
const { ObjectId } = require('mongodb');

const router = express.Router();

// --- 1. Admin Login Endpoint ---
router.post('/admin/login', async (req, res) => {
  const db = getDb();
  const collection = db.collection('admins');

  const { email, password } = req.body;

  // --- SECURITY WARNING ---
  // We are checking passwords in plain text.
  // This is VERY INSECURE for a real app.
  // A real app must "hash" and "salt" passwords.
  // For now, this is okay for testing.

  try {
    const admin = await collection.findOne({ email: email });

    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    if (admin.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Login is successful
    // In the future, we would send a JSON Web Token (JWT) here
    res.status(200).json({
      message: 'Login successful',
      adminId: admin._id,
      boardCode: admin.boardCode // Send the boardCode to the admin
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error during login' });
  }
});


// --- 2. Public Endpoint to get Notices ---
router.get('/board/:boardCode/notices', async (req, res) => {
  const db = getDb();
  const collection = db.collection('notices');

  try {
    const boardCode = req.params.boardCode;

    // Find all notices that match the boardCode
    const notices = await collection.find({ boardCode: boardCode }).toArray();

    if (!notices || notices.length === 0) {
      // Send an empty array instead of an error, it's friendlier
      return res.status(200).json([]);
    }

    res.status(200).json(notices);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error fetching notices' });
  }
});
router.post('/notices', async (req, res) => {
  const db = getDb();
  const collection = db.collection('notices');

  // Get the notice data from the frontend
  const { title, content, category, isPinned, boardCode } = req.body;

  if (!title || !content || !category || !boardCode) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  // Create the new notice document
  const newNotice = {
    title,
    content,
    category,
    isPinned: Boolean(isPinned), // Ensure it's a boolean
    boardCode,
    date: new Date().toISOString() // Set the date to now
  };

  try {
    const result = await collection.insertOne(newNotice);
    res.status(201).json({ 
        message: 'Notice created successfully',
        insertedId: result.insertedId 
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error creating notice' });
  }
});

router.delete('/notices/:id', async (req, res) => {
  const db = getDb();
  const collection = db.collection('notices');
  const noticeId = req.params.id;

  // Validate the ID
  if (!ObjectId.isValid(noticeId)) {
    return res.status(400).json({ message: 'Invalid Notice ID' });
  }

  try {
    const result = await collection.deleteOne({ _id: new ObjectId(noticeId) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Notice not found' });
    }

    res.status(200).json({ message: 'Notice deleted successfully' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error deleting notice' });
  }
});

module.exports = router;