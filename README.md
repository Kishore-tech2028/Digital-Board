# Campus Digital Notice Board

A modern, full-stack (MERN) application designed to digitize college campus announcements. This platform allows administrators to post, manage, and pin important notices while providing students with a clean, searchable interface to stay updated.

# 🚀 Features

User Dashboard: Browse notices by category (Exams, Placements, Events, etc.).

Search & Filter: Real-time searching and category-based filtering of announcements.

Admin Portal: Secure dashboard for authorized staff to manage notices and users.

Notice Management: Create, edit, and delete notices with expiry dates.

Pinned Announcements: Highlight urgent news at the top of the feed.

Responsive Design: Fully functional on mobile, tablet, and desktop devices.

# 🛠️ Tech Stack

Frontend: React.js, Styled Components, Lucide React (Icons), React Router.

Backend: Node.js, Express.js.

Database: MongoDB (Native Driver).

Authentication: JSON Web Tokens (JWT) & Bcrypt.js.

 # 💻 Getting Started

Prerequisites

Node.js installed on your machine.

MongoDB Community Server installed and running locally.

Installation

Clone the repository:

git clone [https://github.com/your-username/digital-notice-board.git](https://github.com/your-username/digital-notice-board.git)
cd digital-notice-board


Setup the Server:

cd server
npm install


Create a .env file in the server folder:

MONGO_URI=mongodb://127.0.0.1:27017/digitalNoticeBoard
JWT_SECRET=your_random_secret_string_here
PORT=5000


Start the backend:

npm run dev


Setup the Client:

cd ../client
npm install
npm run dev


# 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated.

Fork the Project.

Create your Feature Branch (git checkout -b feature/AmazingFeature).

Commit your Changes (git commit -m 'Add some AmazingFeature').

Push to the Branch (git push origin feature/AmazingFeature).

Open a Pull Request.

Areas for Contribution:

[ ] Integration with a real backend API (currently using dummy data in some components).

[ ] Image/PDF upload support for notices using Multer.

[ ] Email notifications for urgent pinned notices.

[ ] Dark mode toggle.
