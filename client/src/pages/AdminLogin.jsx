import React, { useState } from 'react';
import { Lock, Mail, UserPlus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Nav from '../components/NavBar.jsx';
import styled from 'styled-components';
import theme from '../theme.js';

// --- STYLED COMPONENTS (from your file) ---
const Container = styled.div` 
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 90vh; // Use min-height
    padding: 2rem 0;
`;
const Card = styled.div`
    width: 420px;
    max-width: calc(100vw - 40px);
    background: ${theme.colors.surface || '#ffffff'};
    padding: 2.25rem;
    border-radius: 12px;
    box-shadow: 0 10px 30px rgba(2,6,23,0.08);
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
`;

const Header = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 0.5rem;
    margin-bottom: 0.5rem;
`;

const IconContainer = styled.div`
    width: 56px;
    height: 56px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${theme.colors.primary || '#0ea5a4'};
    color: ${theme.colors.onPrimary || '#fff'};
    box-shadow: 0 6px 18px rgba(2,6,23,0.06);
`;

const Title = styled.h2`
    margin: 0;
    font-size: 1.25rem;
    color: ${theme.colors.title || '#0f172a'};
    font-weight: 600;
`;

const Subtitle = styled.p`
    margin: 0;
    font-size: 0.95rem;
    color: ${theme.colors.muted || '#6b7280'};
`;

const InputGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.375rem;
    margin-bottom: 0.5rem;
`;

const Label = styled.label`
    font-size: 0.85rem;
    color: ${theme.colors.muted || '#6b7280'};
    font-weight: 500;
`;

const InputWrapper = styled.div`
    position: relative;
    display: flex;
    align-items: center;
`;

const InputIcon = styled.div`
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    align-items: center;
    color: ${theme.colors.muted || '#9ca3af'};
    pointer-events: none;
`;

const Input = styled.input`
    width: 100%;
    padding: 0.6rem 0.9rem 0.6rem 2.6rem;
    height: 44px;
    border: 1px solid ${theme.colors.border || '#e6e9ef'};
    border-radius: 8px;
    background: ${theme.colors.inputBg || '#fff'};
    color: ${theme.colors.text || '#0f172a'};
    font-size: 0.95rem;
    outline: none;
    transition: border-color 0.15s ease, box-shadow 0.12s ease;

    &:focus {
        border-color: ${theme.colors.primary || '#0ea5a4'};
        box-shadow: 0 4px 14px rgba(14,165,164,0.08);
    }

    &::placeholder {
        color: ${theme.colors.muted || '#9ca3af'};
    }
`;

const Button = styled.button`
    width: 100%;
    padding: 0.85rem 1rem;
    margin-top: 0.5rem;
    border: none;
    border-radius: 8px;
    background: ${theme.colors.primary || '#0ea5a4'};
    color: ${theme.colors.onPrimary || '#ffffff'};
    font-weight: 600;
    font-size: 0.98rem;
    cursor: pointer;
    transition: opacity 0.12s ease, transform 0.08s ease;
    display: inline-flex;
    align-items: center;
    justify-content: center;

    &:hover:not(:disabled) {
        transform: translateY(-1px);
    }

    &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }
`;

const ErrorMessage = styled.p`
    color: ${theme.colors.urgent || '#ef4444'};
    font-size: 0.9rem;
    text-align: center;
    margin-bottom: 0.5rem; // Adjusted margin
`;

const SuccessMessage = styled.p`
    color: #166534; // green-800
    background-color: #dcfce7; // green-100
    padding: 0.75rem;
    border-radius: 8px;
    font-size: 0.9rem;
    text-align: center;
    margin-bottom: 0.5rem; // Adjusted margin
`;

const ToggleButton = styled.button`
    background: none;
    border: none;
    color: ${theme.colors.secondary || theme.colors.muted};
    text-decoration: underline;
    cursor: pointer;
    font-size: 0.9rem;
    margin-top: 1rem; // Adjusted margin
    width: 100%;
    
    &:hover {
        color: ${theme.colors.primary};
    }
`;


const AdminLogin = () => {
    // --- 1. ADD STATE FOR LOGIN/SIGNUP MODE ---
    const [isLoginMode, setIsLoginMode] = useState(true);

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(''); // For signup success
    const navigate = useNavigate();

    const handleChange = (e) => {
        setError('');
        setSuccess('');
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // --- 2. COMBINED handleSubmit FUNCTION ---
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        // Determine which endpoint to call
        const endpoint = isLoginMode ? '/api/admin/login' : '/api/admin/signup';

        try {
            const response = await fetch(`http://localhost:5001${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'An error occurred');
            }

            if (isLoginMode) {
                // --- LOGIN SUCCESSFUL ---
                console.log('Login successful:', data);
                sessionStorage.setItem('adminBoardCode', data.boardCode);
                navigate('/admin/dashboard');
            } else {
                // --- SIGNUP SUCCESSFUL ---
                setSuccess('Account created! Please log in.');
                setIsLoginMode(true); // Flip back to login mode
                setFormData({ email: formData.email, password: '' }); // Keep email, clear pass
            }

        } catch (err) {
            console.error(err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // --- 3. TOGGLE MODE HANDLER ---
    const toggleMode = () => {
        setIsLoginMode(!isLoginMode);
        setError('');
        setSuccess('');
        setFormData({ email: '', password: '' }); // Clear form
    };

    return (
        <>
            <nav>
                <Nav />
            </nav>
            <Container>
                <Card>
                    {/* --- 4. DYNAMIC HEADER --- */}
                    <Header>
                        <IconContainer>
                            {isLoginMode ? (
                                <Lock size={24} color={'#fff'} />
                            ) : (
                                <UserPlus size={24} color={'#fff'} />
                            )}
                        </IconContainer>
                        <Title>{isLoginMode ? 'Admin Login' : 'Admin Sign Up'}</Title>
                        <Subtitle>
                            {isLoginMode ? 'Please sign in to continue' : 'Create a new admin account'}
                        </Subtitle>
                    </Header>

                    <form onSubmit={handleSubmit}>
                        {/* 5. SHOW SUCCESS/ERROR MESSAGES */}
                        {error && <ErrorMessage>{error}</ErrorMessage>}
                        {success && <SuccessMessage>{success}</SuccessMessage>}
                        
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

                        {/* --- 6. DYNAMIC BUTTON TEXT --- */}
                        <Button type="submit" disabled={loading}>
                            {loading
                                ? (isLoginMode ? 'Signing In...' : 'Creating Account...')
                                : (isLoginMode ? 'Sign In to Dashboard' : 'Create Account')
                            }
                        </Button>
                    </form>

                    {/* --- 7. TOGGLE BUTTON --- */}
                    <ToggleButton onClick={toggleMode} disabled={loading}>
                        {isLoginMode
                            ? "Need an account? Sign Up"
                            : "Already have an account? Log In"
                        }
                    </ToggleButton>
                </Card>
            </Container>
        </>
    );
};

export default AdminLogin;