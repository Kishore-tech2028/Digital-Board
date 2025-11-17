// backend/routes.js

const express = require('express');
const { getDb } = require('./db');
const { ObjectId } = require('mongodb');
const bcrypt = require('bcryptjs'); 
const router = express.Router();
const multer = require('multer');
const path = require('path'); 

// --- 3. CONFIGURE MULTER STORAGE ---
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Make sure 'uploads' directory exists
  },
  filename: function (req, file, cb) {
    // Create a unique filename to avoid overwrites
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

// 4. CREATE MULTER UPLOAD MIDDLEWARE
const upload = multer({ storage: storage });

// --- 1. Admin Sign Up Endpoint  ---
router.post('/admin/signup', async (req, res) => {
  const db = getDb();
  const collection = db.collection('admins');

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    // Check if admin already exists
    const existingAdmin = await collection.findOne({ email: email });
    if (existingAdmin) {
      return res.status(409).json({ message: 'Email already in use' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Generate a unique board code (random 6-character string)
    const boardCode = Math.random().toString(36).substring(2, 8).toUpperCase();

    // Insert new admin
    const result = await collection.insertOne({
      email: email,
      password: hashedPassword,
      boardCode: boardCode
    });

    res.status(201).json({
      message: 'Admin account created successfully',
      adminId: result.insertedId
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error during signup' });
  }
});


// --- 2. Admin Login Endpoint (UPDATED with Security) ---
router.post('/admin/login', async (req, res) => {
  const db = getDb();
  const collection = db.collection('admins');

  const { email, password } = req.body;

  try {
    const admin = await collection.findOne({ email: email });

    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    // SECURITY UPDATE: Compare hashed passwords
    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Login is successful
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


// --- 3. Public Endpoint to get Notices ---
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


// --- 4. Admin Endpoint to CREATE a notice ---
router.post('/notices',upload.single('attachment'), async (req, res) => {
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
    isPinned: isPinned === 'true', // Check for the string "true"
    boardCode,
    date: new Date().toISOString() // Set the date to now
  };

  // 6. Check if a file was uploaded
  if (req.file) {
    // req.file contains file info (path, filename, mimetype, etc.)
    newNotice.attachmentUrl = `http://localhost:5001/uploads/${req.file.filename}`;
    newNotice.attachmentType = req.file.mimetype;
  }
  
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


// --- 5. Admin Endpoint to DELETE a notice ---
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


// --- 6. Admin Endpoint to GET a single notice (for editing) ---
router.get('/notices/:id', async (req, res) => {
  const db = getDb();
  const collection = db.collection('notices');
  const noticeId = req.params.id;

  if (!ObjectId.isValid(noticeId)) {
    return res.status(400).json({ message: 'Invalid Notice ID' });
  }

  try {
    const notice = await collection.findOne({ _id: new ObjectId(noticeId) });
    if (!notice) {
      return res.status(404).json({ message: 'Notice not found' });
    }
    res.status(200).json(notice);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error fetching notice' });
  }
});


// --- 7. Admin Endpoint to UPDATE a notice ---
router.put('/notices/:id', upload.single('attachment'), async (req, res) => {
  const db = getDb();
  const collection = db.collection('notices');
  const noticeId = req.params.id;

  if (!ObjectId.isValid(noticeId)) {
    return res.status(400).json({ message: 'Invalid Notice ID' });
  }

  // Get the updated data from the request body
  const { title, content, category, isPinned } = req.body;

  if (!title || !content || !category) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  // Define the updated document
  const updatedNotice = {
    title,
    content,
    category,
    isPinned: isPinned === 'true',
    // Note: We don't update boardCode or date
  };

  // 8. Check if a *new* file was uploaded to replace the old one
  if (req.file) {
    updatedNotice.attachmentUrl = `http://localhost:5001/uploads/${req.file.filename}`;
    updatedNotice.attachmentType = req.file.mimetype;
    // (Again, you could add logic here to delete the *old* file)
  }

  try {
    const result = await collection.updateOne(
      { _id: new ObjectId(noticeId) },
      { $set: updatedNotice } // Use $set to update fields
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: 'Notice not found' });
    }

    res.status(200).json({ message: 'Notice updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error updating notice' });
  }
});

// --- 8. NEW Admin Endpoint to GET Dashboard Stats ---
router.get('/admin/stats/:boardCode', async (req, res) => {
  const db = getDb();
  const collection = db.collection('notices');
  const { boardCode } = req.params;

  if (!boardCode) {
    return res.status(400).json({ message: 'Board code is required' });
  }

  try {
    // Use an aggregation pipeline to calculate all stats at once
    const stats = await collection.aggregate([
      { $match: { boardCode: boardCode } },
      {
        $facet: {
          "totalNotices": [
            { $count: "count" }
          ],
          "pinnedNotices": [
            { $match: { isPinned: true } },
            { $count: "count" }
          ],
          "categoryCounts": [
            { $group: { _id: "$category", count: { $sum: 1 } } },
            { $sort: { count: -1 } }
          ]
        }
      }
    ]).toArray();

    // Process the aggregation result into a clean object
    const result = {
      totalNotices: stats[0].totalNotices[0]?.count || 0,
      pinnedNotices: stats[0].pinnedNotices[0]?.count || 0,
      // categoryCounts will be: [{ _id: "Exams", count: 2 }, { _id: "General", count: 1 }]
      categoryCounts: stats[0].categoryCounts || [] 
    };

    res.status(200).json(result);

  } catch (err) {
    console.error('Error fetching stats:', err);
    res.status(500).json({ message: 'Server error fetching stats' });
  }
});



module.exports = router;