import React, { useState } from 'react';
import { Lock, Mail } from 'lucide-react';
import Nav from '../components/NavBar.jsx'
// You would import standard theme variables here in a real setup
const theme = {
    colors: {
        primary: "#0f172a",
        secondary: "#3b82f6",
        white: "#ffffff",
        border: "#e2e8f0",
        textLight: "#64748b"
    }
};

const AdminLogin = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted:", formData);
        alert("Login logic will be connected to backend later!");
    };

    // STYLES
    const containerStyle = {
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem'
    };

    const cardStyle = {
        backgroundColor: theme.colors.white,
        padding: '2.5rem',
        borderRadius: '16px',
        boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
        width: '100%',
        maxWidth: '400px',
        border: `1px solid ${theme.colors.border}`
    };

    const headerStyle = {
        textAlign: 'center',
        marginBottom: '2rem'
    };

    const iconContainerStyle = {
        backgroundColor: '#dbeafe', // Light blue bg for icon
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto 1rem'
    };

    const inputGroupStyle = {
        marginBottom: '1.25rem'
    };

    const labelStyle = {
        display: 'block',
        marginBottom: '0.5rem',
        fontWeight: '600',
        color: theme.colors.primary,
        fontSize: '0.9rem'
    };

    const inputWrapperStyle = {
        position: 'relative',
        display: 'flex',
        alignItems: 'center'
    };

    const inputIconStyle = {
        position: 'absolute',
        left: '12px',
        color: theme.colors.textLight,
        pointerEvents: 'none' // Clicks pass through to the input
    };

    const inputStyle = {
        width: '100%',
        padding: '0.75rem 1rem 0.75rem 2.5rem', // Extra left padding for icon
        borderRadius: '8px',
        border: `2px solid ${theme.colors.border}`,
        fontSize: '1rem',
        outline: 'none',
        transition: 'border-color 0.2s'
    };

    const buttonStyle = {
        width: '100%',
        padding: '0.875rem',
        backgroundColor: theme.colors.primary,
        color: theme.colors.white,
        border: 'none',
        borderRadius: '8px',
        fontWeight: 'bold',
        fontSize: '1rem',
        marginTop: '1rem',
        transition: 'background-color 0.2s'
    };

    return (
        <>
        <nav>

        <Nav />
        </nav>
        <div style={containerStyle}>
            <div style={cardStyle}>
                <div style={headerStyle}>
                    <div style={iconContainerStyle}>
                        <Lock size={24} color={theme.colors.secondary} />
                    </div>
                    <h2 style={{ fontSize: '1.5rem', color: theme.colors.primary, fontWeight: '800' }}>Welcome Back</h2>
                    <p style={{ color: theme.colors.textLight, marginTop: '0.5rem' }}>Please sign in to continue</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div style={inputGroupStyle}>
                        <label htmlFor="email" style={labelStyle}>Email Address</label>
                        <div style={inputWrapperStyle}>
                            <Mail size={18} style={inputIconStyle} />
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="admin@college.edu"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                style={inputStyle}
                                // Add simple focus effect inline for now
                                onFocus={(e) => e.target.style.borderColor = theme.colors.secondary}
                                onBlur={(e) => e.target.style.borderColor = theme.colors.border}
                            />
                        </div>
                    </div>

                    <div style={inputGroupStyle}>
                        <label htmlFor="password" style={labelStyle}>Password</label>
                        <div style={inputWrapperStyle}>
                            <Lock size={18} style={inputIconStyle} />
                            <input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                style={inputStyle}
                                onFocus={(e) => e.target.style.borderColor = theme.colors.secondary}
                                onBlur={(e) => e.target.style.borderColor = theme.colors.border}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        style={buttonStyle}
                        onMouseOver={(e) => e.target.style.backgroundColor = theme.colors.secondary}
                        onMouseOut={(e) => e.target.style.backgroundColor = theme.colors.primary}
                    >
                        Sign In to Dashboard
                    </button>
                </form>
            </div>
        </div>
    </>
    );
};

export default AdminLogin;