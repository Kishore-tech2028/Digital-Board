import React, { useState } from "react";
import AdminLayout from "../components/AdminLayout";
import { Save, X, CheckCircle, Paperclip } from "lucide-react"; // 1. Add CheckCircle, Paperclip
import styled from "styled-components";
import theme from "../theme";

// --- STYLED COMPONENTS (Unchanged) ---
// --- STYLED COMPONENTS ---
const PageHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 0 1.5rem 0;
  gap: 1rem;
`;

const PageTitle = styled.h1`
  margin: 0;
  font-size: 1.6rem;
  font-weight: 700;
  color: ${theme.colors.primary};
`;

/* Card containing the form */
const FormCard = styled.div`
  background: ${theme.colors.cardBackground || "#ffffff"};
  padding: 1.75rem;
  border-radius: 12px;
  box-shadow: 0 6px 18px rgba(12, 15, 20, 0.06);
  max-width: 900px;
  width: 100%;
  margin: 0 auto;
`;

/* Two column grid used for category/expiry etc */
const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1rem;
`;

/* Simple input group with optional bottom margin prop (mb) */
const InputGroup = styled.div`
  margin-bottom: ${(props) => props.mb || "1rem"};
  display: flex;
  flex-direction: column;
`;

/* Label text */
const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 700;
  color: ${theme.colors.text || "#111827"};
  font-size: 0.95rem;
`;

/* Base input styles reused by input/select/textarea */
const BaseInputStyles = `
    width: 100%;
    box-sizing: border-box;
    padding: 0.65rem 0.8rem;
    border-radius: 8px;
    border: 1px solid ${theme.colors.border || "#e5e7eb"};
    background: ${theme.colors.inputBackground || "#fff"};
    color: ${theme.colors.text || "#111827"};
    font-size: ${(props) => props.fontSize || "1rem"};
    outline: none;
    transition: border-color 0.12s ease, box-shadow 0.12s ease;

    &:focus {
        border-color: ${theme.colors.primary};
        box-shadow: 0 0 0 4px rgba(59,130,246,0.06);
    }

    &::placeholder {
        color: ${theme.colors.textLight || "#9ca3af"};
    }

    &:disabled {
        opacity: 0.7;
        cursor: not-allowed;
        background: ${theme.colors.inputDisabled || "#f9fafb"};
    }
`;

const Input = styled.input`
  ${BaseInputStyles}
`;

const Select = styled.select`
  ${BaseInputStyles}
  appearance: none;
  background-image: linear-gradient(
      45deg,
      transparent 50%,
      ${theme.colors.textLight || "#9ca3af"} 50%
    ),
    linear-gradient(
      135deg,
      ${theme.colors.textLight || "#9ca3af"} 50%,
      transparent 50%
    );
  background-position: calc(100% - 18px) calc(1rem + 2px),
    calc(100% - 13px) calc(1rem + 2px);
  background-size: 6px 6px, 6px 6px;
  background-repeat: no-repeat;
  padding-right: 2.25rem;
`;

/* Multi-line textarea */
const Textarea = styled.textarea`
  ${BaseInputStyles}
  resize: vertical;
  min-height: 140px;
`;

/* Checkbox group: checkbox + two spans (title and smaller description) */
const CheckboxGroup = styled.label`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0.5rem 1rem;
  align-items: start;
  margin: 0.75rem 0 1.25rem 0;

  & > span:first-of-type {
    font-weight: 700;
    color: ${theme.colors.primary};
    align-self: center;
  }

  & > span:last-of-type {
    grid-column: 2 / 3;
    color: ${theme.colors.textLight || "#6b7280"};
    font-size: 0.85rem;
  }
`;

/* Checkbox input */
const CheckboxInput = styled.input`
  width: 18px;
  height: 18px;
  margin: 0;
  accent-color: ${theme.colors.primary};
  cursor: pointer;
`;

/* Buttons */
const Button = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.6rem 0.9rem;
  border-radius: 8px;
  font-weight: 700;
  font-size: 0.95rem;
  border: 1px solid transparent;
  cursor: pointer;
  transition: background-color 0.12s ease, transform 0.06s ease,
    opacity 0.12s ease;

  ${(props) =>
    props.$primary
      ? `
        background: ${theme.colors.primary};
        color: ${theme.colors.onPrimary || "#ffffff"};
        &:hover { filter: brightness(0.95); }
        &:active { transform: translateY(1px); }
    `
      : `
        background: transparent;
        color: ${theme.colors.primary};
        border-color: ${theme.colors.border || "rgba(0,0,0,0.08)"};
        &:hover { background: ${theme.colors.hover || "#f3f4f6"}; }
    `}

  &:disabled {
    opacity: 0.65;
    cursor: not-allowed;
    transform: none;
  }
`;

/* Group for action buttons aligned to the right */
const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  margin-top: 0.75rem;
`;

// 2. ADD MESSAGE STYLES
const Message = styled.p`
  margin-bottom: 1.5rem;
  padding: 1rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.9rem;

  &.error {
    background-color: #fee2e2; // red-100
    color: ${theme.colors.urgent || "#ef4444"};
  }

  &.success {
    background-color: #dcfce7; // green-100
    color: #166534; // green-800
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`;

// --- NEW: STYLES FOR FILE INPUT ---
const FileInputGroup = styled.div`
  border: 2px dashed ${theme.colors.border};
  border-radius: 8px;
  padding: 1rem;
  text-align: center;
  margin-bottom: 1.5rem;
  background-color: ${theme.colors.bgLight}80; // 50% opacity
`;

const FileInputLabel = styled.label`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1rem;
  background-color: ${theme.colors.white};
  color: ${theme.colors.primary};
  border: 1px solid ${theme.colors.border};
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${theme.colors.bgLight};
  }
`;

const FileInput = styled.input`
  display: none; // The actual input is hidden
`;

const FileName = styled.p`
  font-weight: 500;
  color: ${theme.colors.textMain};
  margin-top: 0.75rem;
`;
// --- END OF NEW STYLES ---

const CreateNotice = () => {
  const [formData, setFormData] = useState({
    title: "",
    category: "General",
    content: "",
    isPinned: false,
    expiryDate: "", // Note: our backend doesn't use this yet, but that's okay
  });

  
  // 3. ADD STATES FOR API CALLS
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setError("");
    setSuccess("");
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  // 3. ADD HANDLER FOR FILE INPUT
  const handleFileChange = (e) => {
    setError("");
    setSuccess("");
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };
  
  // 4. REPLACE handleSubmit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    // Get the boardCode saved during login
    const boardCode = sessionStorage.getItem("adminBoardCode");
    if (!boardCode) {
      setError("Could not find admin board code. Please log in again.");
      setLoading(false);
      return;
    }

    // 4. MUST USE FORMDATA TO SEND FILES
    const postData = new FormData();
    postData.append("title", formData.title);
    postData.append("content", formData.content);
    postData.append("category", formData.category);
    postData.append("isPinned", formData.isPinned);
    postData.append("boardCode", boardCode);
    
    // Add file only if one is selected
    if (selectedFile) {
      postData.append("attachment", selectedFile);
    }
    // Note: We don't send expiryDate as backend doesn't use it
    try {
      // 5. SUBMIT THE FORMDATA
      const response = await fetch("http://localhost:5001/api/notices", {
        method: "POST",
        // DO NOT set 'Content-Type': 'application/json'
        // Browser will auto-set it to 'multipart/form-data'
        body: postData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to create notice");
      }

      // Success!
      setSuccess("Notice published successfully!");
      // Clear the form
      setFormData({
        title: "",
        category: "General",
        content: "",
        isPinned: false,
        expiryDate: "",
      });
      setSelectedFile(null); // Clear the file

    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout activePage="create-notice">
      <PageHeader>
        <PageTitle>Create New Notice</PageTitle>
      </PageHeader>

      <FormCard>
        <form onSubmit={handleSubmit}>
          {/* 5. SHOW MESSAGES */}
          {error && <Message className="error">{error}</Message>}
          {success && (
            <Message className="success">
              <CheckCircle size={18} /> {success}
            </Message>
          )}

          <InputGroup mb="1.5rem">
            <Label>Notice Title *</Label>
            <Input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., Mid-Sem Exam Schedule"
              required
              fontSize="1.1rem"
              disabled={loading}
            />
          </InputGroup>

          <FormGrid>
            <InputGroup>
              <Label>Category</Label>
              <Select
                name="category"
                value={formData.category}
                onChange={handleChange}
                disabled={loading}
              >
                <option value="General">General</option>
                <option value="Exams">Exams</option>
                <option value="Placements">Placements</option>
                <option value="Events">Events</option>
                <option value="Holidays">Holidays</option>
              </Select>
            </InputGroup>
            <InputGroup>
              <Label>Expiry Date (Optional)</Label>
              <Input
                type="date"
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleChange}
                disabled={loading}
              />
            </InputGroup>
          </FormGrid>

          <InputGroup mb="1.5rem">
            <Label>Content *</Label>
            <Textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              placeholder="Write the full details of the notice here..."
              required
              rows="6"
              disabled={loading}
            />
          </InputGroup>
          
          {/* --- 6. ADD THE FILE INPUT UI --- */}
          <InputGroup mb="1.5rem">
            <Label>Attachment (Optional)</Label>
            <FileInputGroup>
              <FileInputLabel htmlFor="file-upload">
                <Paperclip size={18} />
                {selectedFile ? "Change file..." : "Choose a file..."}
              </FileInputLabel>
              <FileInput
                id="file-upload"
                type="file"
                accept="image/*,video/*,audio/*"
                onChange={handleFileChange}
                disabled={loading}
              />
              {selectedFile && (
                <FileName>Selected: {selectedFile.name}</FileName>
              )}
            </FileInputGroup>
          </InputGroup>
          {/* --- END OF FILE INPUT --- */}

          <CheckboxGroup>
            <CheckboxInput
              type="checkbox"
              name="isPinned"
              checked={formData.isPinned}
              onChange={handleChange}
              disabled={loading}
            />
            <span style={{ fontWeight: "600", color: theme.colors.primary }}>
              Pin this notice to the top
            </span>
            <span
              style={{ fontSize: "0.85rem", color: theme.colors.textLight }}
            >
              (Urgent or important announcements)
            </span>
          </CheckboxGroup>

          <ButtonGroup>
            <Button type="button" disabled={loading}>
              <X size={18} /> Cancel
            </Button>
            <Button type="submit" $primary disabled={loading}>
              <Save size={18} />
              {loading ? "Publishing..." : "Publish Notice"}
            </Button>
          </ButtonGroup>
        </form>
      </FormCard>
    </AdminLayout>
  );
};

export default CreateNotice;
