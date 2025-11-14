import React, { useState } from 'react';
import AdminLayout from '../components/AdminLayout';
import { Save, X, CheckCircle } from 'lucide-react'; // 1. Add CheckCircle
import styled from 'styled-components';
import theme from '../theme';

// --- STYLED COMPONENTS (Unchanged) ---
const PageHeader = styled.div` /* ... */ `;
const PageTitle = styled.h1` /* ... */ `;
const FormCard = styled.div` /* ... */ `;
const FormGrid = styled.div` /* ... */ `;
const InputGroup = styled.div` /* ... */ `;
const Label = styled.label` /* ... */ `;
const BaseInputStyles = ` /* ... */ `;
const Input = styled.input` /* ... */ `;
const Select = styled.select` /* ... */ `;
const Textarea = styled.textarea` /* ... */ `;
const CheckboxGroup = styled.label` /* ... */ `;
const CheckboxInput = styled.input` /* ... */ `;
const Button = styled.button` /* ... */ `;
const ButtonGroup = styled.div` /* ... */ `;

// 2. ADD MESSAGE STYLES
const Message = styled.p`
    margin-bottom: 1.5rem;
    padding: 1rem;
    border-radius: 8px;
    font-weight: 600;
    font-size: 0.9rem;
    
    &.error {
        background-color: #fee2e2; // red-100
        color: ${theme.colors.urgent || '#ef4444'};
    }

    &.success {
        background-color: #dcfce7; // green-100
        color: #166534; // green-800
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
`;


const CreateNotice = () => {
    const [formData, setFormData] = useState({
        title: '',
        category: 'General',
        content: '',
        isPinned: false,
        expiryDate: '' // Note: our backend doesn't use this yet, but that's okay
    });

    // 3. ADD STATES FOR API CALLS
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        setError('');
        setSuccess('');
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setFormData({ ...formData, [e.target.name]: value });
    };

    // 4. REPLACE handleSubmit
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        // Get the boardCode saved during login
        const boardCode = sessionStorage.getItem('adminBoardCode');
        if (!boardCode) {
            setError('Could not find admin board code. Please log in again.');
            setLoading(false);
            return;
        }

        const noticeData = {
            ...formData,
            boardCode: boardCode // Add the boardCode to the notice
        };
        
        try {
            const response = await fetch('http://localhost:5000/api/notices', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(noticeData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to create notice');
            }

            // Success!
            setSuccess('Notice published successfully!');
            // Clear the form
            setFormData({ title: '', category: 'General', content: '', isPinned: false, expiryDate: '' });

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

                    <CheckboxGroup>
                        <CheckboxInput
                            type="checkbox"
                            name="isPinned"
                            checked={formData.isPinned}
                            onChange={handleChange}
                            disabled={loading}
                        />
                        <span style={{ fontWeight: '600', color: theme.colors.primary }}>
                            Pin this notice to the top
                        </span>
                        <span style={{ fontSize: '0.85rem', color: theme.colors.textLight }}>
                            (Urgent or important announcements)
                        </span>
                    </CheckboxGroup>

                    <ButtonGroup>
                        <Button type="button" disabled={loading}>
                            <X size={18} /> Cancel
                        </Button>
                        <Button type="submit" primary disabled={loading}>
                            <Save size={18} /> 
                            {loading ? 'Publishing...' : 'Publish Notice'}
                        </Button>
                    </ButtonGroup>
                </form>
            </FormCard>
        </AdminLayout>
    );
};

export default CreateNotice;