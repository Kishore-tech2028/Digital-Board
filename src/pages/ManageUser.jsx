import React, { useState } from "react";
import AdminLayout from "../components/AdminLayout";
import { Users, Search, Edit, Trash2, UserPlus } from "lucide-react";
import styled from "styled-components"; // 1. Import
import theme from "../theme"; // 2. Import

// 3. REMOVE local theme object

// --- DUMMY DATA ---
const DUMMY_USERS = [
  { id: 1, name: "Alice Admin", email: "alice@college.edu", role: "Admin" },
  { id: 2, name: "Bob Faculty", email: "bob@college.edu", role: "User" },
  { id: 3, name: "Charlie Staff", email: "charlie@college.edu", role: "User" },
];

// 4. DEFINE STYLED COMPONENTS
const PageHeader = styled.div`
  margin-bottom: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const PageTitle = styled.h1`
  font-size: 1.8rem;
  color: ${theme.colors.primary};
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const Card = styled.div`
  background-color: ${theme.colors.white};
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1);
  overflow-x: auto; // For table on small screens
`;

const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: ${theme.colors.white};
  border: 1px solid ${theme.colors.border};
  border-radius: 8px;
  padding: 0.75rem 1rem;
  margin-bottom: 1.5rem;
`;

const SearchInput = styled.input`
  border: none;
  outline: none;
  font-size: 1rem;
  width: 100%;
  color: ${theme.colors.textMain};
  margin-left: 0.75rem;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: left;
`;

const Th = styled.th`
  padding: 0.75rem 1rem;
  border-bottom: 2px solid ${theme.colors.border};
  color: ${theme.colors.textLight};
  font-size: 0.8rem;
  text-transform: uppercase;
`;

const Td = styled.td`
  padding: 1rem;
  border-bottom: 1px solid ${theme.colors.border};
  color: ${theme.colors.textMain};
  vertical-align: middle;
`;

const RoleBadge = styled.span`
  background-color: ${props => props.role === "Admin" ? "#dbeafe" : "#f1f5f9"};
  color: ${props => props.role === "Admin" ? "#1e40af" : theme.colors.textMain};
  padding: 0.25rem 0.75rem;
  border-radius: 99px;
  font-size: 0.8rem;
  font-weight: 600;
`;

const IconButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  color: ${props => props.color || theme.colors.textLight};
  display: inline-flex;
  align-items: center;
  transition: background-color 0.2s;

  &:hover {
    background-color: rgba(0,0,0,0.05);
  }
`;

const PrimaryButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1.25rem;
  background-color: ${theme.colors.secondary};
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    opacity: 0.9;
  }
`;

const ActionCell = styled(Td)`
  display: flex;
  gap: 0.5rem;
`;

function ManageUsers() {
  const [users, setUsers] = useState(DUMMY_USERS);
  const [searchTerm, setSearchTerm] = useState("");

  // 5. USE STYLED COMPONENTS IN JSX
  return (
    <AdminLayout activePage="users">
      <PageHeader>
        <PageTitle>
          <Users size={28} />
          Manage Users
        </PageTitle>
        <PrimaryButton
          onClick={() => alert("Open 'Create New User' modal...")}
        >
          <UserPlus size={18} />
          Add New User
        </PrimaryButton>
      </PageHeader>

      <Card>
        <SearchWrapper>
          <Search size={20} color={theme.colors.textLight} />
          <SearchInput
            type="text"
            placeholder="Search users by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchWrapper>

        <Table>
          <thead>
            <tr>
              <Th>Name</Th>
              <Th>Email</Th>
              <Th>Role</Th>
              <Th>Actions</Th>
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
                  <Td style={{ fontWeight: "600" }}>{user.name}</Td>
                  <Td>{user.email}</Td>
                  <Td>
                    <RoleBadge role={user.role}>{user.role}</RoleBadge>
                  </Td>
                  <ActionCell>
                    <IconButton
                      color={theme.colors.secondary}
                      onClick={() =>
                        alert(`Editing user ${user.id}... (Open edit modal)`)
                      }
                      title="Edit User"
                    >
                      <Edit size={18} />
                    </IconButton>
                    <IconButton
                      color={theme.colors.urgent}
                      onClick={() =>
                        alert(`Deleting user ${user.id}... (Show confirmation)`)
                      }
                      title="Delete User"
                    >
                      <Trash2 size={18} />
                    </IconButton>
                  </ActionCell>
                </tr>
              ))}
          </tbody>
        </Table>
      </Card>
    </AdminLayout>
  );
};

export default ManageUsers;