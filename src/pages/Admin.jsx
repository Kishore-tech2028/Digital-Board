import React from 'react';
import { Navigate } from 'react-router-dom';
import AdminLayout from '../components/AdminLayout.jsx'; // 1. IMPORT ADMINLAYOUT
import styled from 'styled-components';
import theme from '../theme.js'; // Import theme for consistency

const Container = styled.div`
    padding: 2rem;
    text-align: center;
`;
const Title = styled.h1`
    color: ${theme.colors.primary};
    margin-bottom: 1rem;
`;
export default function Admin() {
    const isAdminLoggedIn = true; // Replace with actual authentication logic

    if (!isAdminLoggedIn) {
        return <Navigate to="/admin" />;
    }
    return (
        // 2. WRAP IN ADMINLAYOUT INSTEAD OF NAVBAR
        <AdminLayout activePage="dashboard">
            <Container>
                <Title>Admin Dashboard</Title>
                <p>Welcome, Admin! Here you can manage the application.</p>
            </Container>
        </AdminLayout>
    );
}