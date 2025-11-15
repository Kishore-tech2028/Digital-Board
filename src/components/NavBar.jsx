import React from "react";
import styled from "styled-components";
import theme from "../theme"; // We will now use the theme colors
import { Bell, User } from "lucide-react"; // Using Lucide for a cleaner icon

// --- STYLED COMPONENTS (Updated) ---

const Nav = styled.nav`
  /* New Colors & Style */
  background-color: ${theme.colors.surface};
  border-bottom: 1px solid ${theme.colors.border};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02);
  
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 2rem; /* Adjusted padding */
  height: 64px;
`;

const Logo = styled.a` // Changed to an <a> tag
  color: ${theme.colors.primary};
  font-size: 1.5rem;
  font-weight: 700;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const NavLinks = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
  gap: 0.5rem; /* Reduced gap */
  align-items: center;
`;

const NavLink = styled.a`
  color: ${theme.colors.textMain};
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s, color 0.2s;

  &:hover {
    background-color: ${theme.colors.bgLight};
  }
`;

const AdminButton = styled.a`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: ${theme.colors.bgLight};
  color: ${theme.colors.textMain};
  padding: 0.5rem 1rem;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.9rem;
  transition: background-color 0.2s, box-shadow 0.2s;

  &:hover {
    background-color: ${theme.colors.border};
    box-shadow: 0 1px 3px rgba(0,0,0,0.05);
  }
`;

const BoardCode = styled.span`
  padding: 0.5rem 1rem;
  color: ${theme.colors.textLight};
  font-size: 0.9rem;

  strong {
    color: ${theme.colors.primary};
  }
`;


export default function NavBar({ mode = "public", boardCode }) {
  return (
    <Nav>
      <Logo href="/">
        <Bell size={24} />
        NoticeBoard
      </Logo>

      <NavLinks>
        {mode === "public" && (
          <>
            <li>
              <NavLink href="/">Home</NavLink>
            </li>
            <li>
              <AdminButton href="/admin">
                <User size={16} />
                Admin Login
              </AdminButton>
            </li>
          </>
        )}

        {mode === "board" && (
          <>
            <li>
              <NavLink href="/">Change Code</NavLink>
            </li>
            <li>
              <BoardCode>
                Viewing: <strong>{boardCode}</strong>
              </BoardCode>
            </li>
          </>
        )}
      </NavLinks>
    </Nav>
  );
}