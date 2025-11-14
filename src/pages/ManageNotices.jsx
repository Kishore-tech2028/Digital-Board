// src/pages/ManageNotices.jsx
import React, { useState, useEffect } from "react";
import AdminLayout from "../components/AdminLayout";
import { ListCollapse, Search, Edit, Trash2 } from "lucide-react";
import styled from "styled-components";
import theme from "../theme";

// --- STYLED COMPONENTS (borrowed from ManageUser.jsx) ---
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
  overflow-x: auto;
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

const CategoryBadge = styled.span`
  background-color: ${props => props.category === "Exams" ? "#fef3c7" : "#e0f2fe"};
  color: ${props => props.category === "Exams" ? "#92400e" : "#075985"};
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

const ActionCell = styled(Td)`
  display: flex;
  gap: 0.5rem;
`;

const ErrorMessage = styled.p`
    color: ${theme.colors.urgent || '#ef4444'};
`;

// --- MAIN COMPONENT ---
function ManageNotices() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // Function to fetch notices
  const fetchNotices = async () => {
    setLoading(true);
    setError("");
    const boardCode = sessionStorage.getItem('adminBoardCode');
    if (!boardCode) {
        setError("Admin not logged in.");
        setLoading(false);
        return;
    }

    try {
        // We can use the same public endpoint to get the notices
        const response = await fetch(`http://localhost:5000/api/board/${boardCode}/notices`);
        if (!response.ok) {
            throw new Error('Failed to fetch notices');
        }
        const data = await response.json();
        setNotices(data);
    } catch (err) {
        setError(err.message);
    } finally {
        setLoading(false);
    }
  };

  // Fetch notices on component mount
  useEffect(() => {
    fetchNotices();
  }, []);

  // Function to delete a notice
  const handleDelete = async (noticeId) => {
    if (!window.confirm("Are you sure you want to delete this notice?")) {
        return;
    }

    try {
        const response = await fetch(`http://localhost:5000/api/notices/${noticeId}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.message || 'Failed to delete notice');
        }

        // Refresh the notice list after deletion
        fetchNotices();

    } catch (err) {
        setError(err.message);
    }
  };

  const filteredNotices = notices.filter(
    (n) =>
      n.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      n.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout activePage="notices">
      <PageHeader>
        <PageTitle>
          <ListCollapse size={28} />
          Manage Notices
        </PageTitle>
      </PageHeader>

      <Card>
        <SearchWrapper>
          <Search size={20} color={theme.colors.textLight} />
          <SearchInput
            type="text"
            placeholder="Search notices by title or content..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchWrapper>

        {loading && <p>Loading notices...</p>}
        {error && <ErrorMessage>{error}</ErrorMessage>}

        <Table>
          <thead>
            <tr>
              <Th>Title</Th>
              <Th>Category</Th>
              <Th>Date</Th>
              <Th>Actions</Th>
            </tr>
          </thead>
          <tbody>
            {!loading && !error && filteredNotices.map((notice) => (
                <tr key={notice._id}>
                  <Td style={{ fontWeight: "600" }}>{notice.title}</Td>
                  <Td>
                    <CategoryBadge category={notice.category}>{notice.category}</CategoryBadge>
                  </Td>
                  <Td>{new Date(notice.date).toLocaleDateString()}</Td>
                  <ActionCell>
                    <IconButton
                      color={theme.colors.secondary}
                      onClick={() => alert(`Editing not implemented yet.`)}
                      title="Edit Notice"
                    >
                      <Edit size={18} />
                    </IconButton>
                    <IconButton
                      color={theme.colors.urgent}
                      onClick={() => handleDelete(notice._id)}
                      title="Delete Notice"
                    >
                      <Trash2 size={18} />
                    </IconButton>
                  </ActionCell>
                </tr>
              ))}
          </tbody>
        </Table>
        {!loading && !error && filteredNotices.length === 0 && (
            <p style={{ textAlign: 'center', padding: '2rem' }}>No notices found.</p>
        )}
      </Card>
    </AdminLayout>
  );
};

export default ManageNotices;