// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import Home from './pages/Home.jsx';
import AdminLogin from './pages/AdminLogin.jsx';
import CreateNotice from './pages/CreateNotice.jsx';
import HomeUser from './pages/HomeUser.jsx';
// 1. REMOVE ManageUsers
// import ManageUsers from './pages/ManageUser.jsx';
// 2. ADD ManageNotices (we will create this next)
import ManageNotices from './pages/ManageNotices.jsx';
import Admin from './pages/Admin.jsx';
import UserSign from './pages/UserSign.jsx';
import PublicNoticeBoard from './pages/PublicNoticeBoard.jsx'; // Make sure this is here

const AppContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

function App() {
  return (
    <Router>
      <AppContainer>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/board/:boardCode" element={<PublicNoticeBoard />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<Admin />} />
          <Route path="/admin/createNotice" element={<CreateNotice />} />
          {/* 3. UPDATE THE ROUTE */}
          <Route path="/admin/notices" element={<ManageNotices />} />

          {/* Old routes (you can remove these if no longer needed) */}
          <Route path="/users" element={<HomeUser />} />
          <Route path="/users/sign" element={<UserSign />} />
        </Routes>
      </AppContainer>
    </Router>
  );
}

export default App;