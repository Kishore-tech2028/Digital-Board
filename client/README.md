📢 Digital Notice Board (Frontend)

A modern, responsive React application for managing and viewing digital notices. This frontend provides two distinct experiences: a public view for students/users to see notices via a simple access code, and a comprehensive admin panel for creating and managing content.

✨ Features

Role-Based Access:

Public View: Simple access code entry (no login required). View notices, search, and filter by category.

Admin Panel: Secure login/signup. Dashboard with statistics, notice creation, editing, and deletion.

Modern UI/UX:

Built with Styled Components for a consistent, professional theme.

Framer Motion animations for smooth page transitions and card interactions.

React Hot Toast for beautiful, non-intrusive notifications.

Lucide React for clean, modern icons.

Real-Time Interactions:

Instant search and filtering.

Modal confirmations for critical actions (like deleting notices).

🛠️ Tech Stack

Framework: React (Vite)

Styling: Styled Components

Routing: React Router DOM

Animations: Framer Motion

Icons: Lucide React

Notifications: React Hot Toast

HTTP Client: Native Fetch API

🚀 Getting Started

Prerequisites

Node.js (v14 or higher)

NPM or Yarn

Installation

Clone the repository:

git clone <your-repo-url>
cd <your-project-folder>


Install dependencies:

npm install


Run the development server:

npm run dev


Open in Browser:
Navigate to http://localhost:5173 (or the port shown in your terminal).

📂 Project Structure

src/
├── assets/             # Static assets (images, svgs)
├── components/         # Reusable UI components
│   ├── AdminLayout.jsx     # Sidebar layout for admin pages
│   ├── ConfirmationModal.jsx # Animated pop-up for deletions
│   ├── NavBar.jsx          # Responsive navigation bar
│   └── NoticeCard.jsx      # The main card component for notices
├── pages/              # Main application pages
│   ├── Admin.jsx           # Admin Dashboard with stats
│   ├── AdminLogin.jsx      # Login/Signup with swap animation
│   ├── CreateNotice.jsx    # Form to publish new notices
│   ├── Home.jsx            # Public landing page (code entry)
│   ├── ManageNotices.jsx   # Table view to edit/delete notices
│   └── PublicNoticeBoard.jsx # The viewer page for students
├── theme.js            # Centralized color palette and theme variables
├── App.jsx             # Main router and app configuration
└── main.jsx            # Entry point


🎨 Color Palette

The application uses a "Cool Teal" theme defined in src/theme.js:

Primary: #0f766e (Teal)

Secondary: #0e7490 (Cyan)

Urgent: #e11d48 (Rose - used for pinned notices and delete actions)

Background: #f8fafc (Light Slate)

🔗 Backend Connection

This frontend is configured to communicate with a backend running on http://localhost:5000. Ensure your backend server is running for full functionality.