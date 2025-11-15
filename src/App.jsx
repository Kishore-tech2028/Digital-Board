// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styled from "styled-components"; // 1. Import styled-components
import { Toaster } from "react-hot-toast";
import theme from "./theme";
// Page imports
import Home from "./pages/Home.jsx";
import AdminLogin from "./pages/AdminLogin.jsx";
import CreateNotice from "./pages/CreateNotice.jsx";
import ManageNotices from "./pages/ManageNotices.jsx";
import Admin from "./pages/Admin.jsx";
import PublicNoticeBoard from "./pages/PublicNoticeBoard.jsx";
// 2. Corrected file name (was EditNotices.jsx)
import EditNotice from "./pages/EditNotices.jsx";

// 3. Define AppContainer
const AppContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

function App() {
  return (
    <Router>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: theme.colors.textMain,
            color: theme.colors.white,
          },
        }}
      />
      <AppContainer>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/board/:boardCode" element={<PublicNoticeBoard />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<Admin />} />
          <Route path="/admin/createNotice" element={<CreateNotice />} />
          <Route path="/admin/notices" element={<ManageNotices />} />

          {/* Edit Route */}
          <Route path="/admin/edit/:id" element={<EditNotice />} />
        </Routes>
      </AppContainer>
    </Router>
  );
}

export default App;
