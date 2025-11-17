import React from 'react';
import styled, { css } from 'styled-components';
import theme from "../theme";
import pin_image from "../assets/pinned.png"

// --- STYLED COMPONENTS ---

const Card = styled.div`
    background-color: ${theme.colors.surface};
    border-radius: 12px;
    padding: 1.5rem;
    margin-bottom: 1.5rem;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.05), 0 2px 4px -2px rgb(0 0 0 / 0.05);
    border: 1px solid ${theme.colors.border};
    position: relative;

    /* This adds the border based on isPinned */
    /* Note: $isPinned uses a $ to show it's a styled-component prop */
    border-left: 5px solid ${props => 
        props.$isPinned ? theme.colors.urgent : theme.colors.secondary};

    /* --- ✨ HERE IS THE ANIMATION --- */
    transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
    &:hover {
        transform: translateY(-4px) scale(1.01);
        box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.07), 0 4px 6px -4px rgb(0 0 0 / 0.07);
    }
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 1rem;
`;

const Title = styled.h3`
    font-size: 1.25rem;
    font-weight: 700;
    color: ${theme.colors.textMain};
    margin: 0;
    padding-right: 2rem; /* Space for pin icon */
`;

const Meta = styled.div`
    display: flex;
    flex-wrap: wrap; /* Allow wrapping on small screens */
    gap: 1rem;
    font-size: 0.875rem;
    color: ${theme.colors.textLight};
    margin-bottom: 1rem;
`;

const MetaItem = styled.span`
    display: flex;
    align-items: center;
    gap: 0.35rem;
`;

// Helper function for category colors
const getCategoryStyle = (category) => {
  switch (category) {
    case "Exams":
      return css`
        background-color: #fef3c7;
        color: #92400e;
      `;
    case "Placements":
      return css`
        background-color: #dcfce7;
        color: #166534;
      `;
    default:
      return css`
        background-color: #e0f2fe;
        color: #075985;
      `;
  }
};

const CategoryBadge = styled.span`
    padding: 0.25rem 0.75rem;
    border-radius: 9999px;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    display: inline-flex;
    align-items: center;
    /* Use the $category prop to set colors */
    ${(props) => getCategoryStyle(props.$category)}
`;

const PinBadge = styled.div`
    position: absolute;
    top: 1rem;
    right: 1rem;
    color: ${theme.colors.urgent};
`;

const Content = styled.p`
    color: ${theme.colors.textMain};
    line-height: 1.7;
    margin: 0;
`;

// --- 1. NEW COMPONENT FOR ATTACHMENTS ---
const AttachmentWrapper = styled.div`
  margin-top: 1.5rem;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid ${theme.colors.border};
  background-color: ${theme.colors.bgLight};

  img, video {
    display: block;
    width: 100%;
    height: auto;
    max-height: 450px; // Set a max height
    object-fit: cover;
  }

  audio {
    display: block;
    width: 100%;
    padding: 0.5rem;
  }
`;

// --- SVG ICONS (moved outside component for performance) ---
const PinIcon = ({ size = 16, fill = "currentColor" }) => (
    <img width={size} height={size} src={pin_image}>
    </img>
);

const CalendarIcon = ({ size = 16, fill = "currentColor" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="5" width="18" height="16" rx="2" stroke={fill} fill="none" />
      <path d="M16 3v4M8 3v4" stroke={fill} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M7 11h3M14 11h3M7 15h3M14 15h3" stroke={fill} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
);

// --- 2. RENDER ATTACHMENT FUNCTION ---
const renderAttachment = (notice) => {
  if (!notice.attachmentUrl || !notice.attachmentType) {
    return null;
  }

  const { attachmentType, attachmentUrl } = notice;

  if (attachmentType.startsWith("image")) {
    return <img src={attachmentUrl} alt={notice.title} loading="lazy" />;
  }

  if (attachmentType.startsWith("video")) {
    return <video controls width="100%" src={attachmentUrl} />;
  }

  if (attachmentType.startsWith("audio")) {
    return <audio controls src={attachmentUrl} />;
  }

  return null; // Fallback for unsupported types
};

// --- NOTICE CARD COMPONENT ---
export default function NoticeCard({ notice }) {
  // Format date simply
  const formattedDate = new Date(notice.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <Card $isPinned={notice.isPinned}>
      {notice.isPinned && (
        <PinBadge title="Pinned Notice">
          <PinIcon size={20} fill={theme.colors.urgent} />
        </PinBadge>
      )}

      <Header>
        <Title>{notice.title}</Title>
      </Header>

      <Meta>
        <MetaItem>
          <CalendarIcon size={16} />
          {formattedDate}
        </MetaItem>
        <CategoryBadge $category={notice.category}>
          {notice.category}
        </CategoryBadge>
      </Meta>
      
      {/* --- 3. ADD THE ATTACHMENT HERE --- */}
      {notice.attachmentUrl && (
        <AttachmentWrapper>
          {renderAttachment(notice)}
        </AttachmentWrapper>
      )}

      <Content>
        {notice.content}
      </Content>
    </Card>
  );
}