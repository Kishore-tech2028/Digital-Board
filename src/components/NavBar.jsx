import React, { useState, useEffect } from "react";
import styled from "styled-components";
import theme from "../theme"; // Import theme for consistency

// 1. REMOVE: import "../components/NavBar.css";

// 2. DEFINE STYLED COMPONENTS
const Nav = styled.nav`
  background-color: #333; // Keeping original color
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 20px;

  @media screen and (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Logo = styled.div`
  color: #fff;
  font-size: 24px;
  text-decoration: none;
  font-weight: bold;
`;

const NavLinks = styled.ul`
  display: flex;
  gap: 15px;
  list-style: none;
  margin: 0;
  padding: 0;

  @media screen and (max-width: 600px) {
    flex-direction: column;
    width: 100%;
    margin-top: 10px;
  }
`;

const NavLink = styled.a`
  color: #fff;
  text-decoration: none;
  padding: 14px 16px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #575757;
    border-radius: 4px;
  }

  @media screen and (max-width: 600px) {
    width: 100%;
    text-align: left;
    padding: 10px 0;
  }
`;

// Add avatar styled components and small person SVG fallback
const AvatarButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  padding: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border: 2px solid rgba(255, 255, 255, 0.12);
  background-color: rgba(255, 255, 255, 0.06);
  cursor: pointer;
  transition: transform 0.12s ease, box-shadow 0.12s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.12);
  }
`;

const AvatarImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

// Minimal person icon wrapper so it scales nicely
const PersonIcon = ({ size = 20, fill = "#fff" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden
    focusable="false"
  >
    <path d="M12 12a4 4 0 100-8 4 4 0 000 8z" fill={fill} />
    <path d="M4 20a8 8 0 0116 0" fill={fill} opacity="0.9" />
  </svg>
);

export default function NavBar() {
  // 3. USE STYLED COMPONENTS IN JSX
  const [user, setUser] = useState(null);
  useEffect(() => {
    try {
      const raw = localStorage.getItem("user");
      if (raw) setUser(JSON.parse(raw));
    } catch (e) {
      /* ignore parse errors */
    }
  }, []);

  const goToSignIn = () => {
    // simple navigation to sign in page
    window.location.href = "users/sign";
  };

  return (
    <Nav>
      <Logo>MyApp</Logo>
      <NavLinks>
        <li>
          <NavLink href="/">Home</NavLink>
        </li>
        <li>
          <NavLink href="/admin">Admin Login</NavLink>
        </li>
        <li>
          <NavLink href="/users">User Home</NavLink>
        </li>
        <li>
          <NavLink href="/admin/users">Manage Users</NavLink>
        </li>
      </NavLinks>

      {/* Replace trailing Logo placeholder with the clickable circular avatar */}
      <AvatarButton
        onClick={goToSignIn}
        title={user?.name ? `Signed in as ${user.name}` : "Sign in"}
      >
        {user?.photoUrl ? (
          <AvatarImg src={user.photoUrl} alt={user.name || "User avatar"} />
        ) : (
          <PersonIcon />
        )}
      </AvatarButton>
       
    </Nav>
  );
}
