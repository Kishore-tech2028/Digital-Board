import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import AdminLayout from '../components/AdminLayout.jsx';
import styled, { keyframes } from 'styled-components';
import theme from '../theme.js';
import { ClipboardList, Pin, LayoutGrid, Loader } from 'lucide-react';

// --- STYLED COMPONENTS ---

const Container = styled.div`
    padding: 2rem;
`;

const Title = styled.h1`
    color: ${theme.colors.textMain};
    margin-bottom: 0.5rem;
    font-size: 1.8rem;
`;

const Subtitle = styled.p`
    color: ${theme.colors.textLight};
    font-size: 1rem;
    margin-top: 0;
    margin-bottom: 1rem;
`;

/* Centered share code block */
const BoardCodeDisplay = styled.div`
    background-color: ${theme.colors.surface};
    padding: 1.25rem 1.75rem;
    border-radius: 12px;
    margin: 0.75rem auto 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 10px rgba(0,0,0,0.04);
    border: 1px solid ${theme.colors.border};
    text-align: center;
    max-width: 420px;
    width: fit-content;
`;

const BoardCodeLabel = styled.p`
    color: ${theme.colors.textLight};
    font-size: 0.9rem;
    margin-bottom: 0.5rem;
    margin-top: 0;
    text-align: center;
`;
const BoardCode = styled.code`
    color: ${theme.colors.primary};
    background-color: ${theme.colors.bgLight};
    padding: 0.5rem 1rem;
    border-radius: 6px;
    font-size: 1.25rem;
    font-weight: 700;
    display: block;
`;

// Stats components (unchanged)
const StatsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;
`;

const StatCard = styled.div`
    background-color: ${theme.colors.surface};
    padding: 1.5rem;
    border-radius: 12px;
    box-shadow: 0 4px 10px rgba(0,0,0,0.04);
    border: 1px solid ${theme.colors.border};
    display: flex;
    align-items: center;
    gap: 1rem;
`;

const StatIcon = styled.div`
    flex-shrink: 0;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${props => props.color || theme.colors.primary}1A;
    color: ${props => props.color || theme.colors.primary};
`;

const StatInfo = styled.div`
    min-width: 0;
`;

const StatValue = styled.p`
    font-size: 2rem;
    font-weight: 700;
    color: ${theme.colors.textMain};
    margin: 0;
`;

const StatLabel = styled.p`
    font-size: 0.9rem;
    color: ${theme.colors.textLight};
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const LoadingContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 4rem;
    gap: 0.5rem;
    color: ${theme.colors.textLight};
`;

const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const LoadingSpinner = styled(Loader)`
  animation: ${rotate} 1s linear infinite;
`;

// --- MAIN COMPONENT ---
export default function Admin() {
    const boardCode = sessionStorage.getItem('adminBoardCode');
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!boardCode) {
            setLoading(false);
            return;
        }

        const fetchStats = async () => {
            setLoading(true);
            try {
                const response = await fetch(`http://localhost:5000/api/admin/stats/${boardCode}`);
                if (!response.ok) {
                    throw new Error('Could not fetch stats');
                }
                const data = await response.json();
                setStats(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, [boardCode]);


    if (!boardCode) {
        return <Navigate to="/admin" />; 
    }

    return (
        <AdminLayout activePage="dashboard">
            <Container>
                <Title>Admin Dashboard</Title>
                <Subtitle>Welcome back, Admin! Here's an overview of your board.</Subtitle>

                {/* Share code now on top and centered */}
                <BoardCodeDisplay>
                    <BoardCodeLabel>Share this code with your users:</BoardCodeLabel>
                    <BoardCode>{boardCode}</BoardCode>
                </BoardCodeDisplay>

                {loading && (
                    <LoadingContainer>
                        <LoadingSpinner size={20} />
                        Loading stats...
                    </LoadingContainer>
                )}

                {stats && !loading && (
                    <StatsGrid>
                        <StatCard>
                            <StatIcon color={theme.colors.primary}>
                                <ClipboardList size={24} />
                            </StatIcon>
                            <StatInfo>
                                <StatValue>{stats.totalNotices}</StatValue>
                                <StatLabel>Total Notices</StatLabel>
                            </StatInfo>
                        </StatCard>
                        
                        <StatCard>
                            <StatIcon color={theme.colors.urgent}>
                                <Pin size={24} />
                            </StatIcon>
                            <StatInfo>
                                <StatValue>{stats.pinnedNotices}</StatValue>
                                <StatLabel>Pinned Notices</StatLabel>
                            </StatInfo>
                        </StatCard>

                        {Array.isArray(stats.categoryCounts) && stats.categoryCounts.map(cat => (
                            <StatCard key={cat._id}>
                                <StatIcon color={theme.colors.secondary}>
                                    <LayoutGrid size={24} />
                                </StatIcon>
                                <StatInfo>
                                    <StatValue>{cat.count}</StatValue>
                                    <StatLabel>{cat._id} Notices</StatLabel>
                                </StatInfo>
                            </StatCard>
                        ))}
                    </StatsGrid>
                )}
            </Container>
        </AdminLayout>
    );
}