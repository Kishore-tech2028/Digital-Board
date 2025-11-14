// src/pages/Admin.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import AdminLayout from '../components/AdminLayout.jsx';
import styled from 'styled-components';
import theme from '../theme.js';

const Container = styled.div`
    padding: 2rem;
    text-align: center;
`;
const Title = styled.h1`
    color: ${theme.colors.primary};
    margin-bottom: 1rem;
`;

// 1. ADD NEW STYLED COMPONENT
const BoardCodeDisplay = styled.div`
    background-color: ${theme.colors.white};
    padding: 1.5rem;
    border-radius: 8px;
    margin-top: 2rem;
    display: inline-block;
    box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1);
    border: 1px solid ${theme.colors.border};
`;

const BoardCodeLabel = styled.p`
    color: ${theme.colors.textLight};
    font-size: 0.9rem;
    margin-bottom: 0.5rem;
`;

const BoardCode = styled.code`
    color: ${theme.colors.primary};
    background-color: ${theme.colors.bgLight || '#f1f5f9'};
    padding: 0.5rem 1rem;
    border-radius: 6px;
    font-size: 1.25rem;
    font-weight: 700;
`;


export default function Admin() {
    // 2. GET BOARD CODE FROM SESSIONSTORAGE
    const boardCode = sessionStorage.getItem('adminBoardCode');

    // This logic is now more important
    const isAdminLoggedIn = !!boardCode; // Check if boardCode exists

    if (!isAdminLoggedIn) {
        // Redirect to /admin (login page) if not logged in
        return <Navigate to="/admin" />; 
    }

    return (
        <AdminLayout activePage="dashboard">
            <Container>
                <Title>Admin Dashboard</Title>
                <p>Welcome, Admin! Here you can manage your notice board.</p>

                {/* 3. DISPLAY THE BOARD CODE */}
                <BoardCodeDisplay>
                    <BoardCodeLabel>Share this code with your users:</BoardCodeLabel>
                    <BoardCode>{boardCode}</BoardCode>
                </BoardCodeDisplay>
            </Container>
        </AdminLayout>
    );
}