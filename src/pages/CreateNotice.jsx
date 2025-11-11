import React, { useState } from 'react';
import AdminLayout from '../components/AdminLayout';
import { Save, X } from 'lucide-react';
import styled from 'styled-components'; // 1. Import
import theme from '../theme'; // 2. Import

// 3. REMOVE local theme object

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
`;

const FormCard = styled.div`
    background-color: ${theme.colors.white};
    padding: 2rem;
    border-radius: 12px;
    box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1);
`;

const FormGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
    margin-bottom: 1.5rem;

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
    }
`;

const InputGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-bottom: ${props => props.mb || 0};
`;

const Label = styled.label`
    font-weight: 600;
    font-size: 0.9rem;
    color: ${theme.colors.primary};
`;

const BaseInputStyles = `
    padding: 0.75rem;
    border-radius: 8px;
    border: 1px solid ${theme.colors.border};
    font-size: 1rem;
    font-family: inherit;
    color: ${theme.colors.textMain};
    background-color: ${theme.colors.white};

    &:focus {
        border-color: ${theme.colors.secondary};
        outline: none;
    }
`;

const Input = styled.input`
    ${BaseInputStyles}
    font-size: ${props => props.fontSize || '1rem'};
`;

const Select = styled.select`
    ${BaseInputStyles}
`;

const Textarea = styled.textarea`
    ${BaseInputStyles}
    resize: vertical;
`;

const CheckboxGroup = styled.label`
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem;
    border: 1px solid ${theme.colors.border};
    border-radius: 8px;
    cursor: pointer;
    margin-bottom: 2rem;
`;

const CheckboxInput = styled.input`
    width: 18px;
    height: 18px;
    accent-color: ${theme.colors.secondary};
`;

const Button = styled.button`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.5rem;
    background-color: ${props => props.primary ? theme.colors.secondary : 'transparent'};
    color: ${props => props.primary ? theme.colors.white : theme.colors.textLight};
    border: 1px solid ${props => props.primary ? 'transparent' : theme.colors.border};
    border-radius: 8px;
    font-weight: 600;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
        opacity: 0.9;
    }
`;

const ButtonGroup = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
`;


const CreateNotice = () => {
    const [formData, setFormData] = useState({
        title: '',
        category: 'General',
        content: '',
        isPinned: false,
        expiryDate: ''
    });

    const handleChange = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setFormData({ ...formData, [e.target.name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("New Notice Data:", formData);
        alert("Notice 'created'! (Need backend to actually save it)");
        setFormData({ title: '', category: 'General', content: '', isPinned: false, expiryDate: '' });
    };

    // 5. USE STYLED COMPONENTS IN JSX
    return (
        <AdminLayout activePage="create-notice">
            <PageHeader>
                <PageTitle>Create New Notice</PageTitle>
            </PageHeader>

            <FormCard>
                <form onSubmit={handleSubmit}>
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
                        />
                    </InputGroup>

                    <FormGrid>
                        <InputGroup>
                            <Label>Category</Label>
                            <Select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
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
                        />
                    </InputGroup>

                    <CheckboxGroup>
                        <CheckboxInput
                            type="checkbox"
                            name="isPinned"
                            checked={formData.isPinned}
                            onChange={handleChange}
                        />
                        <span style={{ fontWeight: '600', color: theme.colors.primary }}>
                            Pin this notice to the top
                        </span>
                        <span style={{ fontSize: '0.85rem', color: theme.colors.textLight }}>
                            (Urgent or important announcements)
                        </span>
                    </CheckboxGroup>

                    <ButtonGroup>
                        <Button type="button">
                            <X size={18} /> Cancel
                        </Button>
                        <Button type="submit" primary>
                            <Save size={18} /> Publish Notice
                        </Button>
                    </ButtonGroup>
                </form>
            </FormCard>
        </AdminLayout>
    );
};

export default CreateNotice;