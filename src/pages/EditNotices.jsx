// src/pages/EditNotice.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminLayout from "../components/AdminLayout";
import { Save, X, CheckCircle, Loader, Paperclip } from "lucide-react"; // 1. IMPORT Paperclip
import styled from "styled-components";
import theme from "../theme";

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

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4rem;
  gap: 1rem;
`;

// --- 2. ADD STYLES FOR FILE INPUT (copied from CreateNotice) ---
const FileInputGroup = styled.div`
  border: 2px dashed ${theme.colors.border};
  border-radius: 8px;
  padding: 1rem;
  text-align: center;
  margin-bottom: 1.5rem;
  background-color: ${theme.colors.bgLight}80;
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
  &:hover {
    background-color: ${theme.colors.bgLight};
  }
`;

const FileInput = styled.input`
  display: none;
`;

const FileName = styled.p`
  font-weight: 500;
  color: ${theme.colors.textMain};
  margin-top: 0.75rem;
`;
// --- END OF NEW STYLES ---

// --- EDIT NOTICE COMPONENT ---
const EditNotice = () => {
  const { id } = useParams(); // Get the notice ID from the URL
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    category: "General",
    content: "",
    isPinned: false,
  });
  
  // 3. ADD STATES FOR FILE HANDLING
  const [selectedFile, setSelectedFile] = useState(null);
  const [existingAttachment, setExistingAttachment] = useState(null); // To show what's already there
  const [loading, setLoading] = useState(true); // Start true to fetch data
  const [submitting, setSubmitting] = useState(false); // For submit button
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  

  // 1. Fetch the notice data on component load
  useEffect(() => {
    const fetchNotice = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await fetch(`http://localhost:5001/api/notices/${id}`);
        if (!response.ok) {
          throw new Error("Could not fetch notice data.");
        }
        const data = await response.json();
        // Set the form data with the fetched notice
        setFormData({
          title: data.title,
          category: data.category,
          content: data.content,
          isPinned: Boolean(data.isPinned), // 👈 --- 1. THE FIX: Force to boolean
        });

        // 4. SET THE EXISTING ATTACHMENT
        if (data.attachmentUrl) {
          setExistingAttachment(data.attachmentUrl);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNotice();
  }, [id]); // Re-run if ID changes

  const handleChange = (e) => {
    setError("");
    setSuccess("");
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };
  // 5. ADD HANDLER FOR FILE INPUT
  const handleFileChange = (e) => {
    setError("");
    setSuccess("");
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      setExistingAttachment(null); // Hide old attachment preview if new one is selected
    }
  };


  // 6. Handle the SUBMIT (PUT request with FormData)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    setSuccess("");

    // 7. MUST USE FORMDATA TO SEND FILES
    const updateData = new FormData();
    updateData.append("title", formData.title);
    updateData.append("content", formData.content);
    updateData.append("category", formData.category);
    updateData.append("isPinned", formData.isPinned);

    // Only append a new file if one was selected
    if (selectedFile) {
      updateData.append("attachment", selectedFile);
    }

    try {
      const response = await fetch(`http://localhost:5001/api/notices/${id}`, {
        method: "PUT",
        // DO NOT set 'Content-Type': 'application/json'
        body: updateData, // Send the FormData
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to update notice");
      }

      setSuccess("Notice updated successfully!");
      // After 2 seconds, go back to the manage notices page
      setTimeout(() => {
        navigate("/admin/notices");
      }, 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <LoadingContainer>
          <Loader size={24} />
          <p>Loading notice data...</p>
        </LoadingContainer>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <PageHeader>
        <PageTitle>Edit Notice</PageTitle>
      </PageHeader>

      <FormCard>
        <form onSubmit={handleSubmit}>
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
              required
              disabled={submitting}
            />
          </InputGroup>

          <FormGrid>
            <InputGroup>
              <Label>Category</Label>
              <Select
                name="category"
                value={formData.category}
                onChange={handleChange}
                disabled={submitting}
              >
                <option value="General">General</option>
                <option value="Exams">Exams</option>
                <option value="Placements">Placements</option>
                <option value="Events">Events</option>
                <option value="Holidays">Holidays</option>
              </Select>
            </InputGroup>
          </FormGrid>

          <InputGroup mb="1.5rem">
            <Label>Content *</Label>
            <Textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              required
              rows="6"
              disabled={submitting}
            />
          </InputGroup>

          {/* --- 8. ADD THE FILE INPUT UI --- */}
          <InputGroup mb="1.5rem">
            <Label>Attachment (Optional)</Label>
            <FileInputGroup>
              <FileInputLabel htmlFor="file-upload">
                <Paperclip size={18} />
                {selectedFile ? "Change file..." : "Choose new file..."}
              </FileInputLabel>
              <FileInput
                id="file-upload"
                type="file"
                accept="image/*,video/*,audio/*"
                onChange={handleFileChange}
                disabled={submitting}
              />
              {/* Show selected file OR existing file */}
              {selectedFile && (
                <FileName>Selected: {selectedFile.name}</FileName>
              )}
              {existingAttachment && (
                 <FileName>
                  Current: <a href={existingAttachment} target="_blank" rel="noopener noreferrer">View existing attachment</a>
                 </FileName>
              )}
            </FileInputGroup>
          </InputGroup>
          {/* --- END OF FILE INPUT --- */}
          
          <CheckboxGroup>
            <CheckboxInput
              type="checkbox"
              name="isPinned"
              checked={Boolean(formData.isPinned)}
              onChange={handleChange}
              disabled={submitting}
            />
            {/* 1. THESE SPANS WERE MISSING */}
            <span style={{ fontWeight: "600", color: theme.colors.primary }}>
              Pin this notice to the top
            </span>
            <span
              style={{ fontSize: "0.85rem", color: theme.colors.textLight }}
            >
              (Urgent or important announcements)
            </span>
          </CheckboxGroup>

          {/* 2. THE BUTTON GROUP WAS OUTSIDE THE CHECKBOX GROUP */}
          <ButtonGroup>
            <Button
              type="button"
              onClick={() => navigate("/admin/notices")}
              disabled={submitting}
            >
              <X size={18} /> Cancel
            </Button>
            <Button type="submit" $primary disabled={submitting}>
              <Save size={18} />
              {submitting ? "Saving..." : "Save Changes"}
            </Button>
          </ButtonGroup>
        </form>
      </FormCard>
    </AdminLayout>
  );
};

export default EditNotice;
