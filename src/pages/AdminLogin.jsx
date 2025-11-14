// src/pages/AdminLogin.jsx
import React, { useState } from 'react';
import { Lock, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // 1. IMPORT useNavigate
import Nav from '../components/NavBar.jsx';
import styled from 'styled-components';
import theme from '../theme';

// --- STYLED COMPONENTS (Unchanged) ---
const Container = styled.div` /* ... */ `;
const Card = styled.div` /* ... */ `;
const Header = styled.div` /* ... */ `;
const IconContainer = styled.div` /* ... */ `;
const Title = styled.h2` /* ... */ `;
const Subtitle = styled.p` /* ... */ `;
const InputGroup = styled.div` /* ... */ `;
const Label = styled.label` /* ... */ `;
const InputWrapper = styled.div` /* ... */ `;
const InputIcon = styled.div` /* ... */ `;
const Input = styled.input` /* ... */ `;
const Button = styled.button` /* ... */ `;

// 4. ADD A SIMPLE ERROR MESSAGE STYLE
const ErrorMessage = styled.p`
    color: ${theme.colors.urgent || '#ef4444'};
    font-size: 0.9rem;
    text-align: center;
    margin-top: 1rem;
`;


const AdminLogin = () => {
    const [formData, setFormData] = useState({
        email: 'admin@college.edu', // Pre-filled for easy testing
        password: 'password123'    // Pre-filled for easy testing
    });
    // 5. ADD NEW STATES
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate(); // 6. GET THE NAVIGATE FUNCTION

    const handleChange = (e) => {
        setError(''); // Clear error on change
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // 7. REPLACE THE handleSubmit FUNCTION
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await fetch('http://localhost:5000/api/admin/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                // Handle login failure (e.g., 401, 404)
                throw new Error(data.message || 'Login failed');
            }

            // --- LOGIN SUCCESSFUL ---
            console.log('Login successful:', data);
            
            // Store admin info (e.g., boardCode) in sessionStorage
            // sessionStorage is cleared when the browser tab is closed
            sessionStorage.setItem('adminBoardCode', data.boardCode);
            
            // Redirect to the admin dashboard
            navigate('/admin/dashboard');

        } catch (err) {
            console.error(err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <nav>
                <Nav />
            </nav>
            <Container>
                <Card>
                    <Header>
                        <IconContainer>
                            <Lock size={24} color={theme.colors.secondary} />
                        </IconContainer>
                        <Title>Admin Login</Title>
                        <Subtitle>Please sign in to continue</Subtitle>
                    </Header>

                    <form onSubmit={handleSubmit}>
                        <InputGroup>
                            <Label htmlFor="email">Email Address</Label>
                            <InputWrapper>
                                <InputIcon>
                                    <Mail size={18} />
                                </InputIcon>
                                <Input
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="admin@college.edu"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </InputWrapper>
                        </InputGroup>

                        <InputGroup>
                            <Label htmlFor="password">Password</Label>
                            <InputWrapper>
                                <InputIcon>
                                    <Lock size={18} />
                                </InputIcon>
                                <Input
                                    type="password"
                                    id="password"
                                    name="password"
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                            </InputWrapper>
                        </InputGroup>

                        {/* 8. SHOW ERROR MESSAGE */}
                        {error && <ErrorMessage>{error}</ErrorMessage>}

                        <Button type="submit" disabled={loading}>
                            {loading ? 'Signing In...' : 'Sign In to Dashboard'}
                        </Button>
                    </form>
                </Card>
            </Container>
        </>
    );
};

export default AdminLogin;