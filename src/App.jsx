import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import Home from './pages/Home.jsx';
import AdminLogin from './pages/AdminLogin.jsx';
import CreateNotice from './pages/CreateNotice.jsx';
import HomeUser from './pages/HomeUser.jsx';
import ManageUsers from './pages/ManageUser.jsx'; // 1. IMPORT IT HERE

// Styled Container for the main content
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
          <Route path="/login" element={<AdminLogin />} />
          <Route path="/admin/createNotice" element={<CreateNotice />} />
          <Route path="/users" element={<HomeUser />} />
          <Route path="/admin/users" element={<ManageUsers />} />
        </Routes>
      </AppContainer>
    </Router>
  );
}

export default App;