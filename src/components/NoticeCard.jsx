import theme from "../theme";

// Add simple inline icon components to avoid missing reference errors
function Pin({ size = 16, fill = "currentColor" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M14.8 2.2c-1.1-.6-2.5-.2-3.2.9L6.3 11.7a2 2 0 00.4 2.5l5.6 4.7a1 1 0 001.3-1.4l-1.5-3.1 3.2-3.2 2.1 2.1a1 1 0 001.4-1.4L17.9 6.6c-.6-.8-.3-1.9.5-2.5l.4-.3a1 1 0 00-.4-1.8l-3.6-.8z"
        fill={fill}
      />
    </svg>
  );
}

function Calendar({ size = 16, fill = "currentColor" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <rect
        x="3"
        y="5"
        width="18"
        height="16"
        rx="2"
        stroke={fill}
        fill="none"
      />
      <path
        d="M16 3v4M8 3v4"
        stroke={fill}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M7 11h3M14 11h3M7 15h3M14 15h3"
        stroke={fill}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

// --- NOTICE CARD COMPONENT ---
export default function NoticeCard({ notice }) {
  // Styles specific to this component
  const cardStyle = {
    backgroundColor: theme.colors.white,
    borderRadius: "12px",
    padding: "1.5rem",
    marginBottom: "1.5rem",
    boxShadow:
      "0 4px 6px -1px rgb(0 0 0 / 0.05), 0 2px 4px -2px rgb(0 0 0 / 0.05)",
    border: `1px solid ${theme.colors.border}`,
    // Dynamic border color based on 'isPinned' status
    borderLeft: notice.isPinned
      ? `5px solid ${theme.colors.urgent}`
      : `5px solid ${theme.colors.secondary}`,
    position: "relative",
    transition: "transform 0.2s ease-in-out",
  };

  const headerStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "1rem",
  };

  const titleStyle = {
    fontSize: "1.25rem",
    fontWeight: "700",
    color: theme.colors.primary,
    marginRight: "1rem",
    // Ensure title doesn't overlap with pin icon if present
    maxWidth: notice.isPinned ? "90%" : "100%",
  };

  const metaStyle = {
    display: "flex",
    gap: "1rem",
    fontSize: "0.875rem",
    color: theme.colors.textLight,
    marginBottom: "1rem",
  };

  const metaItemStyle = {
    display: "flex",
    alignItems: "center",
    gap: "0.35rem",
  };

  // Dynamic styles for different categories
  const getCategoryStyle = (category) => {
    switch (category) {
      case "Exams":
        return { bg: "#fef3c7", color: "#92400e" }; // Yellow/Brown
      case "Placements":
        return { bg: "#dcfce7", color: "#166534" }; // Green
      default:
        return { bg: "#e0f2fe", color: "#075985" }; // Blue (Events/Other)
    }
  };
  const catColors = getCategoryStyle(notice.category);

  const categoryBadgeStyle = {
    backgroundColor: catColors.bg,
    color: catColors.color,
    padding: "0.25rem 0.75rem",
    borderRadius: "9999px",
    fontSize: "0.75rem",
    fontWeight: "600",
    textTransform: "uppercase",
    display: "inline-flex",
    alignItems: "center",
  };

  const pinBadgeStyle = {
    position: "absolute",
    top: "1rem",
    right: "1rem",
    color: theme.colors.urgent,
  };

  return (
    <div style={cardStyle}>
      {/* Render Pin Icon only if notice.isPinned is true */}
      {notice.isPinned && (
        <div style={pinBadgeStyle} title="Pinned Notice">
          <Pin size={20} fill={theme.colors.urgent} />
        </div>
      )}

      <div style={headerStyle}>
        <h3 style={titleStyle}>{notice.title}</h3>
      </div>

      <div style={metaStyle}>
        <span style={metaItemStyle}>
          <Calendar size={16} />
          {notice.date}
        </span>
        <span style={categoryBadgeStyle}>{notice.category}</span>
      </div>

      <p style={{ color: theme.colors.textMain, lineHeight: "1.7" }}>
        {notice.content}
      </p>
    </div>
  );
}
