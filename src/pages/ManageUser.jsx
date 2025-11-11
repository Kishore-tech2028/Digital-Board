import React, { useState } from "react";
import AdminLayout from "../components/AdminLayout";
import { Users, Search, Edit, Trash2, UserPlus } from "lucide-react";

// Borrowing theme colors from your other admin files
const theme = {
  colors: {
    primary: "#0f172a",
    secondary: "#3b82f6",
    white: "#ffffff",
    border: "#e2e8f0",
    textMain: "#334155",
    textLight: "#64748b",
    danger: "#ef4444",
  },
};

// --- DUMMY DATA ---
// In a real app, this would come from your backend/database
const DUMMY_USERS = [
  { id: 1, name: "Alice Admin", email: "alice@college.edu", role: "Admin" },
  { id: 2, name: "Bob Faculty", email: "bob@college.edu", role: "User" },
  { id: 3, name: "Charlie Staff", email: "charlie@college.edu", role: "User" },
];

function ManageUsers()  {
  const [users, setUsers] = useState(DUMMY_USERS);
  const [searchTerm, setSearchTerm] = useState("");

  // --- STYLES ---
  const pageHeaderStyle = {
    marginBottom: "2rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  };
  const pageTitleStyle = {
    fontSize: "1.8rem",
    color: theme.colors.primary,
    fontWeight: "700",
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
  };
  const cardStyle = {
    backgroundColor: theme.colors.white,
    padding: "2rem",
    borderRadius: "12px",
    boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1)",
  };
  const searchBarStyle = {
    display: "flex",
    alignItems: "center",
    backgroundColor: theme.colors.white,
    border: `1px solid ${theme.colors.border}`,
    borderRadius: "8px",
    padding: "0.75rem 1rem",
    marginBottom: "1.5rem",
  };
  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
    textAlign: "left",
  };
  const thStyle = {
    padding: "0.75rem 1rem",
    borderBottom: `2px solid ${theme.colors.border}`,
    color: theme.colors.textLight,
    fontSize: "0.8rem",
    textTransform: "uppercase",
  };
  const tdStyle = {
    padding: "1rem",
    borderBottom: `1px solid ${theme.colors.border}`,
    color: theme.colors.textMain,
    verticalAlign: "middle",
  };
  const roleBadgeStyle = (role) => ({
    backgroundColor: role === "Admin" ? "#dbeafe" : "#f1f5f9",
    color: role === "Admin" ? "#1e40af" : theme.colors.textMain,
    padding: "0.25rem 0.75rem",
    borderRadius: "99px",
    fontSize: "0.8rem",
    fontWeight: "600",
  });
  const iconButtonStyle = (color = theme.colors.textLight) => ({
    background: "transparent",
    border: "none",
    cursor: "pointer",
    padding: "0.5rem",
    borderRadius: "50%",
    color: color,
    display: "inline-flex",
    alignItems: "center",
  });
  const primaryBtnStyle = {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    padding: "0.6rem 1.25rem",
    backgroundColor: theme.colors.secondary,
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontWeight: "600",
    fontSize: "0.9rem",
    cursor: "pointer",
  };

  return (
    <AdminLayout activePage="users">
      <div style={pageHeaderStyle}>
        <h1 style={pageTitleStyle}>
          <Users size={28} />
          Manage Users
        </h1>
        <button
          style={primaryBtnStyle}
          onClick={() => alert("Open 'Create New User' modal...")}
        >
          <UserPlus size={18} />
          Add New User
        </button>
      </div>

      <div style={cardStyle}>
        {/* SEARCH BAR */}
        <div style={searchBarStyle}>
          <Search
            size={20}
            color={theme.colors.textLight}
            style={{ marginRight: "0.75rem" }}
          />
          <input
            type="text"
            placeholder="Search users by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              border: "none",
              outline: "none",
              fontSize: "1rem",
              width: "100%",
              color: theme.colors.textMain,
            }}
          />
        </div>

        {/* USER TABLE */}
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Name</th>
              <th style={thStyle}>Email</th>
              <th style={thStyle}>Role</th>
              <th style={thStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users
              .filter(
                (u) =>
                  u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  u.email.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((user) => (
                <tr key={user.id}>
                  <td style={{ ...tdStyle, fontWeight: "600" }}>{user.name}</td>
                  <td style={tdStyle}>{user.email}</td>
                  <td style={tdStyle}>
                    <span style={roleBadgeStyle(user.role)}>{user.role}</span>
                  </td>
                  <td style={{ ...tdStyle, display: "flex", gap: "0.5rem" }}>
                    <button
                      style={iconButtonStyle(theme.colors.secondary)}
                      onClick={() =>
                        alert(`Editing user ${user.id}... (Open edit modal)`)
                      }
                      title="Edit User"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      style={iconButtonStyle(theme.colors.danger)}
                      onClick={() =>
                        alert(`Deleting user ${user.id}... (Show confirmation)`)
                      }
                      title="Delete User"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};

export default ManageUsers;
