🛡️ Digital Notice Board (Backend)

A robust REST API built with Node.js, Express, and MongoDB to power the Digital Notice Board application. It handles authentication, data persistence, and business logic for notices and admin management.

⚡ Key Features

Authentication:

Admin Signup & Login using BCrypt for secure password hashing.

Session management via secure token/ID handling.

CRUD Operations:

Full Create, Read, Update, and Delete capabilities for Notices.

Public read-only access for specific board codes.

Advanced Aggregation:

GET /stats endpoint uses MongoDB Aggregation Pipelines to calculate dashboard metrics (total notices, category distribution) in a single database query.

Security:

Input validation for all endpoints.

CORS enabled for frontend communication.

Environment variable management for sensitive credentials.

🛠️ Tech Stack

Runtime: Node.js

Framework: Express.js

Database: MongoDB (Native Driver)

Security: BCrypt.js (Password Hashing), CORS

Utilities: Dotenv, Nodemon

🚀 Getting Started

Prerequisites

Node.js (v14 or higher)

MongoDB (Local instance running on port 27017 OR MongoDB Atlas URI)

Installation

Navigate to the backend folder:

cd backend
# or create the folder if setting up from scratch
mkdir backend && cd backend


Install dependencies:

npm install


Configure Environment Variables:
Create a .env file in the root of the backend folder:

MONGO_URI="mongodb://localhost:27017/webprodb"
PORT=5000


Run the Server:

# For development (auto-restarts on save)
npm run dev

# For production
npm start


📡 API Endpoints

Auth Routes

POST /api/admin/signup - Create a new admin account.

POST /api/admin/login - Authenticate an admin.

Notice Routes (Public)

GET /api/board/:boardCode/notices - Fetch all notices for a specific board.

Notice Routes (Admin)

POST /api/notices - Create a new notice.

GET /api/notices/:id - Get details of a single notice.

PUT /api/notices/:id - Update an existing notice.

DELETE /api/notices/:id - Permanently delete a notice.

GET /api/admin/stats/:boardCode - Get dashboard statistics.

🗄️ Database Schema (Conceptual)

Collection: admins

{
  "_id": "ObjectId",
  "email": "string",
  "password": "hashed_string",
  "boardCode": "string (unique)"
}


Collection: notices

{
  "_id": "ObjectId",
  "title": "string",
  "content": "string",
  "category": "string",
  "isPinned": "boolean",
  "date": "ISO Date String",
  "boardCode": "string (linked to admin)"
}
