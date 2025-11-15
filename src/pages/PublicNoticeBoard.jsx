// src/pages/PublicNoticeBoard.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { Bell, Search } from "lucide-react"; // 1. IMPORT Search icon
import { motion } from "framer-motion"; // 2. IMPORT Framer Motion
import NavBar from "../components/NavBar";
import NoticeCard from "../components/NoticeCard";
import theme from "../theme";

// --- STYLED COMPONENTS ---
const Page = styled.div`
  min-height: calc(100vh - 64px);
  padding: 2rem 1rem;
  /* Updated Background */
  background-color: ${theme.colors.bgLight};
  background-image: linear-gradient(
    180deg,
    ${theme.colors.bgLight} 0%,
    #f0f9ff 100%
  );
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
`;

const Container = styled.div`
  max-width: 960px;
  margin: 0 auto;
`;

const BoardHeader = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1.25rem;
  flex-wrap: wrap;
  padding: 1.75rem;
  background: ${theme.colors.surface || "#ffffff"};
  border-radius: 12px;
  box-shadow: 0 6px 18px rgba(15, 23, 42, 0.06);
  border: 1px solid ${theme.colors.border || "#e6edf3"};
`;

const BoardTitle = styled.h1`
  margin: 0;
  font-size: clamp(1.25rem, 2.6vw, 1.8rem);
  line-height: 1.1;
  color: ${theme.colors.textMain};
  font-weight: 700;
`;

const BoardCode = styled.p`
  margin: 0;
  color: ${theme.colors.textLight};
  font-size: 0.95rem;
  white-space: nowrap;

  strong {
    color: ${theme.colors.primary};
    font-weight: 700;
  }
`;

// 3. ADD SEARCH BAR STYLES (copied from ManageNotices)
const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: ${theme.colors.white};
  border: 1px solid ${theme.colors.border};
  border-radius: 8px;
  padding: 0.75rem 1rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1);
`;

const SearchInput = styled.input`
  border: none;
  outline: none;
  font-size: 1rem;
  width: 100%;
  color: ${theme.colors.textMain};
  margin-left: 0.75rem;
  background-color: transparent;
`;

const NoNotices = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 2.25rem;
  border-radius: 10px;
  border: 1px dashed ${theme.colors.border || "#e6edf3"};
  color: ${theme.colors.textLight || "#6b7280"};
  margin-top: 2rem;

  h3 {
    margin: 0;
    font-size: 1.05rem;
    color: ${theme.colors.textMain};
  }
  p {
    margin: 0;
  }
`;

// 4. DEFINE ANIMATION VARIANTS
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

export default function PublicNoticeBoard() {
  const { boardCode } = useParams();
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState(""); // 5. ADD SEARCH STATE

  useEffect(() => {
    const fetchNotices = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await fetch(
          `http://localhost:5000/api/board/${boardCode}/notices`
        );
        if (!response.ok) {
          throw new Error("Could not fetch notices. Check the board code.");
        }
        const data = await response.json();
        setNotices(data);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchNotices();
  }, [boardCode]);

  // 6. ADD FILTERING LOGIC
  const filteredNotices = notices
    .filter((notice) => {
      const title = (notice.title || "").toLowerCase();
      const content = (notice.content || "").toLowerCase();
      const term = searchTerm.toLowerCase();
      return title.includes(term) || content.includes(term);
    })
    .sort((a, b) => {
      // Sort pinned notices to the top
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      // Then sort by date
      return new Date(b.date) - new Date(a.date);
    });

  return (
    <>
      <NavBar mode="board" boardCode={boardCode} />
      <Page>
        <Container>
          <BoardHeader>
            <BoardTitle>Notice Board</BoardTitle>
            <BoardCode>
              Viewing: <strong>{boardCode}</strong>
            </BoardCode>
          </BoardHeader>

          {/* 7. ADD THE SEARCH BAR */}
          <SearchWrapper>
            <Search size={20} color={theme.colors.textLight} />
            <SearchInput
              type="text"
              placeholder="Search notices..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </SearchWrapper>

          {loading && <p style={{ textAlign: "center" }}>Loading notices...</p>}
          {error && (
            <p style={{ textAlign: "center", color: "red" }}>{error}</p>
          )}

          {!loading && !error && filteredNotices.length > 0 && (
            <div>
              {/* 8. MAP OVER filteredNotices AND ADD ANIMATION WRAPPER */}
              {filteredNotices.map((notice) => (
                <motion.div
                  key={notice._id}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible" // Animates when it enters the screen
                  viewport={{ once: true, amount: 0.3 }} // Triggers once, at 30% visibility
                >
                  <NoticeCard notice={notice} />
                </motion.div>
              ))}
            </div>
          )}

          {/* 9. UPDATE "NO NOTICES" LOGIC */}
          {!loading && !error && filteredNotices.length === 0 && (
            <NoNotices>
              <Bell size={48} />
              {searchTerm ? (
                <>
                  <h3>No notices match "{searchTerm}"</h3>
                  <p>Try searching for a different keyword.</p>
                </>
              ) : (
                <>
                  <h3>No notices found for this board.</h3>
                  <p>This board may be empty or the code might be incorrect.</p>
                </>
              )}
            </NoNotices>
          )}
        </Container>
      </Page>
    </>
  );
}
