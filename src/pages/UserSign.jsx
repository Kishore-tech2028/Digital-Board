import React, { useState } from 'react';
import { Lock, Mail } from 'lucide-react';
import Nav from '../components/NavBar.jsx';
import styled from 'styled-components'; // 1. Import styled-components
import theme from '../theme'; // 2. Import central theme

// 3. REMOVE local theme object

// 4. DEFINE STYLED COMPONENTS
const Container = styled.div`
    min-height: 80vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
`;

const Card = styled.div`
    background-color: ${theme.colors.white};
    padding: 2.5rem;
    border-radius: 16px;
    box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
    width: 100%;
    max-width: 400px;
    border: 1px solid ${theme.colors.border};
`;

const Header = styled.div`
    text-align: center;
    margin-bottom: 2rem;
`;

const IconContainer = styled.div`
    background-color: #dbeafe; // light blue bg
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 1rem;
`;

const Title = styled.h2`
    font-size: 1.5rem;
    color: ${theme.colors.primary};
    font-weight: 800;
`;

const Subtitle = styled.p`
    color: ${theme.colors.textLight};
    margin-top: 0.5rem;
`;

const InputGroup = styled.div`
    margin-bottom: 1.25rem;
`;

const Label = styled.label`
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 600;
    color: ${theme.colors.primary};
    font-size: 0.9rem;
`;

const InputWrapper = styled.div`
    position: relative;
    display: flex;
    align-items: center;
`;

const InputIcon = styled.div`
    position: absolute;
    left: 12px;
    color: ${theme.colors.textLight};
    pointer-events: none;
`;

const Input = styled.input`
    width: 100%;
    padding: 0.75rem 1rem 0.75rem 2.5rem; // Extra left padding for icon
    border-radius: 8px;
    border: 2px solid ${theme.colors.border};
    font-size: 1rem;
    outline: none;
    transition: border-color 0.2s;

    &:focus {
        border-color: ${theme.colors.secondary};
    }
`;

const Button = styled.button`
    width: 100%;
    padding: 0.875rem;
    background-color: ${theme.colors.primary};
    color: ${theme.colors.white};
    border: none;
    border-radius: 8px;
    font-weight: bold;
    font-size: 1rem;
    margin-top: 1rem;
    transition: background-color 0.2s;
    cursor: pointer;

    &:hover {
        background-color: ${theme.colors.secondary};
    }
`;


const UserSign = () => {
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

    // 5. USE STYLED COMPONENTS IN JSX
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
                        <Title>Welcome Back</Title>
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

                        <Button type="submit">
                            Sign In to Dashboard
                        </Button>
                    </form>
                </Card>
            </Container>
        </>
    );
};

export default UserSign;