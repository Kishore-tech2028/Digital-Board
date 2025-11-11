import React, { useState } from 'react';
import AdminLayout from '../components/AdminLayout';
import { Save, X } from 'lucide-react';

const theme = {
    colors: {
        primary: "#0f172a",
        secondary: "#3b82f6",
        white: "#ffffff",
        border: "#e2e8f0",
        textMain: "#334155"
    }
};

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
        // Reset form after 'success'
        setFormData({ title: '', category: 'General', content: '', isPinned: false, expiryDate: '' });
    };

    // --- STYLES (keeping it simple for brevity, similar to standard CSS classes) ---
    const pageHeaderStyle = { marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' };
    const pageTitleStyle = { fontSize: '1.8rem', color: theme.colors.primary, fontWeight: '700' };
    const formCardStyle = { backgroundColor: theme.colors.white, padding: '2rem', borderRadius: '12px', boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)' };
    const formGridStyle = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' };
    const inputGroupStyle = { display: 'flex', flexDirection: 'column', gap: '0.5rem' };
    const labelStyle = { fontWeight: '600', fontSize: '0.9rem', color: theme.colors.primary };
    const inputStyle = { padding: '0.75rem', borderRadius: '8px', border: `1px solid ${theme.colors.border}`, fontSize: '1rem', fontFamily: 'inherit' };
    const checkboxGroupStyle = { display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem', border: `1px solid ${theme.colors.border}`, borderRadius: '8px', cursor: 'pointer' };

    const primaryBtnStyle = {
        display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.5rem',
        backgroundColor: theme.colors.secondary, color: 'white', border: 'none', borderRadius: '8px',
        fontWeight: '600', fontSize: '1rem'
    };

    return (
        <AdminLayout activePage="create-notice">
            <div style={pageHeaderStyle}>
                <h1 style={pageTitleStyle}>Create New Notice</h1>
            </div>

            <div style={formCardStyle}>
                <form onSubmit={handleSubmit}>
                    <div style={inputGroupStyle}>
                        <label style={labelStyle}>Notice Title *</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="e.g., Mid-Sem Exam Schedule"
                            required
                            style={{ ...inputStyle, fontSize: '1.1rem', marginBottom: '1.5rem' }}
                        />
                    </div>

                    <div style={formGridStyle}>
                        <div style={inputGroupStyle}>
                            <label style={labelStyle}>Category</label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                style={inputStyle}
                            >
                                <option value="General">General</option>
                                <option value="Exams">Exams</option>
                                <option value="Placements">Placements</option>
                                <option value="Events">Events</option>
                                <option value="Holidays">Holidays</option>
                            </select>
                        </div>
                        <div style={inputGroupStyle}>
                            <label style={labelStyle}>Expiry Date (Optional)</label>
                            <input
                                type="date"
                                name="expiryDate"
                                value={formData.expiryDate}
                                onChange={handleChange}
                                style={inputStyle}
                            />
                        </div>
                    </div>

                    <div style={{ ...inputGroupStyle, marginBottom: '1.5rem' }}>
                        <label style={labelStyle}>Content *</label>
                        <textarea
                            name="content"
                            value={formData.content}
                            onChange={handleChange}
                            placeholder="Write the full details of the notice here..."
                            required
                            rows="6"
                            style={{ ...inputStyle, resize: 'vertical' }}
                        />
                    </div>

                    {/* Checkbox for "Pinning" the notice */}
                    <div style={{ marginBottom: '2rem' }}>
                         <label style={checkboxGroupStyle}>
                            <input
                                type="checkbox"
                                name="isPinned"
                                checked={formData.isPinned}
                                onChange={handleChange}
                                style={{ width: '18px', height: '18px', accentColor: theme.colors.secondary }}
                            />
                            <span style={{ fontWeight: '600', color: theme.colors.primary }}>
                                Pin this notice to the top
                            </span>
                            <span style={{ fontSize: '0.85rem', color: '#64748b' }}>
                                (Urgent or important announcements)
                            </span>
                        </label>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                        <button type="button" style={{ ...primaryBtnStyle, backgroundColor: 'transparent', color: '#64748b', border: `1px solid ${theme.colors.border}` }}>
                            <X size={18} /> Cancel
                        </button>
                        <button type="submit" style={primaryBtnStyle}>
                            <Save size={18} /> Publish Notice
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
};

export default CreateNotice;