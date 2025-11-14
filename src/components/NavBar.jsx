// src/components/NavBar.jsx
import React from "react"; // Removed useState, useEffect
import styled from "styled-components";
import theme from "../theme";

// 1. REMOVE: import "../components/NavBar.css";

// 2. STYLED COMPONENTS (Unchanged)
const Nav = styled.nav`
  background-color: #333; // Keeping original color
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 20px;
  /* ... rest of styles */
`;

const Logo = styled.div`
  /* ... styles */
`;

const NavLinks = styled.ul`
  /* ... styles */
`;

const NavLink = styled.a`
  /* ... styles */
`;

const AvatarButton = styled.button`
  /* ... styles */
`;

const AvatarImg = styled.img`
  /* ... styles */
`;

const PersonIcon = ({ size = 20, fill = "#fff" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 12c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5z" fill={fill} />
    <path d="M4 20c0-2.761 4.477-5 8-5s8 2.239 8 5v1H4v-1z" fill={fill} />
  </svg>
);

// --- MODIFIED NAVBAR COMPONENT ---
export default function NavBar({ mode = "public", boardCode }) { // 1. Accept props
  
  // 2. Simplified handler to always go to admin login
  const goToAdminLogin = () => {
    window.location.href = "/admin";
  };

  return (
    <Nav>
      <Logo>MyApp</Logo>

      {/* 3. Conditional Links based on mode */}
      <NavLinks>
        {mode === "public" && (
          <>
            <li>
              <NavLink href="/">Home</NavLink>
            </li>
            <li>
              <NavLink href="/admin">Admin Login</NavLink>
            </li>
          </>
        )}

        {mode === "board" && (
          <>
            <li>
              <NavLink href="/">Home (Change Code)</NavLink>
            </li>
            {/* Display the board code user is viewing */}
            <li style={{ padding: '14px 16px', color: '#94a3b8' }}>
              Viewing: <strong>{boardCode}</strong>
            </li>
          </>
        )}
      </NavLinks>

      {/* 4. Avatar button now just links to admin login */}
      <AvatarButton
        onClick={goToAdminLogin}
        title={"Admin Login"}
      >
        <PersonIcon />
      </AvatarButton>
    </Nav>
  );
}