// src/pages/PublicNoticeBoard.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Bell } from 'lucide-react';
import NavBar from '../components/NavBar';
import NoticeCard from '../components/NoticeCard';
import theme from '../theme';

// --- STYLED COMPONENTS (Unchanged) ---
const Page = styled.div` /* ... */ `;
const Container = styled.div` /* ... */ `;
const BoardHeader = styled.div` /* ... */ `;
const BoardTitle = styled.h1` /* ... */ `;
const BoardCode = styled.p` /* ... */ `;
const NoNotices = styled.div` /* ... */ `;

// 1. REMOVE DUMMY DATA


export default function PublicNoticeBoard() {
    const { boardCode } = useParams();
    const [notices, setNotices] =useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(''); // Add error state

    // 2. UPDATE useEffect TO FETCH REAL DATA
    useEffect(() => {
        
        const fetchNotices = async () => {
            setLoading(true);
            setError('');
            
            try {
                // Use the new backend endpoint
                const response = await fetch(`http://localhost:5000/api/board/${boardCode}/notices`);
                
                if (!response.ok) {
                    throw new Error('Could not fetch notices. Check the board code.');
                }
                
                const data = await response.json();
                setNotices(data);

            } catch (err) {
                console.error(err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchNotices();
        
    }, [boardCode]); // Re-fetch if the boardCode changes

    return (
        <>
            <NavBar mode="board" boardCode={boardCode} />
            <Page>
                <Container>
                    <BoardHeader>
                        <BoardTitle>Notice Board</BoardTitle>
                        <BoardCode>Viewing notices for code: <strong>{boardCode}</strong></BoardCode>
                    </BoardHeader>

                    {/* 3. ADD LOADING AND ERROR UI */}
                    {loading && <p style={{ textAlign: 'center' }}>Loading notices...</p>}

                    {error && <p style={{ textAlign: 'center', color: 'red' }}>{error}</p>}

                    {!loading && !error && notices.length > 0 && (
                        <div>
                            {notices.map(notice => (
                                <NoticeCard key={notice._id} notice={notice} /> 
                            ))}
                        </div>
                    )}

                    {!loading && !error && notices.length === 0 && (
                        <NoNotices>
                            <Bell size={48} />
                            <h3>No notices found for this board.</h3>
                            <p>This board may be empty or the code might be incorrect.</p>
                        </NoNotices>
                    )}
                </Container>
            </Page>
        </>
    );
}