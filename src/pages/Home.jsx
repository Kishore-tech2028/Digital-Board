// src/pages/Home.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import theme from "../theme";
import NavBar from "../components/NavBar.jsx";

// --- New Styled Components ---
const HomeContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 4rem 2rem;
    text-align: center;
    min-height: 60vh;
`;

const Title = styled.h1`
    color: ${theme.colors.primary};
    margin-bottom: 1rem;
    font-size: 2.5rem;
`;

const Subtitle = styled.h2`
    color: ${theme.colors.secondary};
    margin-bottom: 2.5rem;
    font-size: 1.2rem;
    font-weight: 500;
`;

const AccessForm = styled.form`
    display: flex;
    gap: 0.5rem;
    width: 100%;
    max-width: 400px;
    margin-bottom: 2rem;
`;

const CodeInput = styled.input`
    flex: 1;
    padding: 0.75rem 1rem;
    border-radius: 8px;
    border: 2px solid ${theme.colors.border};
    font-size: 1rem;
    font-family: inherit;
    &:focus {
        border-color: ${theme.colors.secondary};
        outline: none;
    }
`;

const JoinButton = styled.button`
    padding: 0.75rem 1.5rem;
    background-color: ${theme.colors.primary};
    color: ${theme.colors.white};
    border: none;
    border-radius: 8px;
    font-weight: bold;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.2s;
    &:hover {
        background-color: ${theme.colors.secondary};
    }
`;

// --- Updated Home Component ---
export default function Home() {
    const [code, setCode] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (code.trim()) {
            // Navigate to the new public board page
            navigate(`/board/${code.trim()}`);
        }
    };

    return(
        <>
            <NavBar />
            <HomeContainer> 
                <Title>Digital Notice Board</Title>
                <Subtitle>Enter an access code to view a board.</Subtitle>
                
                <AccessForm onSubmit={handleSubmit}>
                    <CodeInput
                        type="text"
                        placeholder="Enter board code (e.g., CS-101)"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                    />
                    <JoinButton type="submit">
                        View Board
                    </JoinButton>
                </AccessForm>
                
            </HomeContainer>
        </>
    );
}