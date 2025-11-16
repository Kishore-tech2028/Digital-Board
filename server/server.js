const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { connectToDb, getDb } = require('./db');
const routes = require('./routes'); 

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); 

// --- API Routes ---
// 2. TELL EXPRESS TO USE THE ROUTES FILE
// All routes in routes.js will be prefixed with /api
app.use('/api', routes);

// --- Start the Server & Connect to DB ---
async function startServer() {
  await connectToDb();

  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}

startServer();