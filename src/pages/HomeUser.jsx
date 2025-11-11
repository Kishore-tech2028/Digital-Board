import React, { useState } from 'react';
import { Bell, Search, Filter } from 'lucide-react';
import NoticeCard from '../components/NoticeCard';
import NavBar from '../components/NavBar';
import styled from 'styled-components'; // 1. Import
import theme from '../theme'; // 2. Import

// 3. REMOVE local theme object

// --- DUMMY DATA (unchanged) ---
const DUMMY_NOTICES = [
    { id: 1, title: "Mid-Semester Exam Schedule Released", date: "Oct 25, 2023", category: "Exams", content: "The final schedule for the Fall 2023 mid-semester exams has been released. Please check the attached PDF for your specific department's timetable.", isPinned: true },
    { id: 2, title: "Campus Recruitment Drive: TCS", date: "Oct 24, 2023", category: "Placements", content: "Tata Consultancy Services (TCS) will be visiting our campus for recruitment on Nov 5th. Eligible students (CGPA > 7.0) must register by this Friday.", isPinned: false },
    { id: 3, title: "Diwali Holiday Announcement", date: "Oct 22, 2023", category: "Holidays", content: "The university will remain closed from Nov 10th to Nov 15th for Diwali celebrations. Classes will resume on Nov 16th.", isPinned: false },
    { id: 4, title: "Annual Tech Fest 'Technova' Registration", date: "Oct 20, 2023", category: "Events", content: "Registration for all Technova events is now open! Visit the student council office or the official website to register your teams.", isPinned: false },
];
const CATEGORIES = ["All", "Exams", "Placements", "Events", "Holidays", "General"];


// 4. DEFINE STYLED COMPONENTS
const Page = styled.div`
    background-color: ${theme.colors.bgLight || '#f1f5f9'};
    min-height: 100vh;
`;

const HeroSection = styled.div`
    background-color: ${theme.colors.primary};
    color: ${theme.colors.white};
    padding: 3rem 2rem;
    text-align: center;
    margin-bottom: 2rem;
`;

const Container = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1.5rem;
    display: grid;
    grid-template-columns: 250px 1fr;
    gap: 2rem;
    align-items: start;

    @media (max-width: 900px) {
        grid-template-columns: 1fr;
    }
`;

const Sidebar = styled.aside`
    background-color: ${theme.colors.white};
    padding: 1.5rem;
    border-radius: 12px;
    box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1);
    position: sticky;
    top: 2rem;

    @media (max-width: 900px) {
        position: relative;
        top: 0;
    }
`;

const CategoryButton = styled.button`
    display: block;
    width: 100%;
    text-align: left;
    padding: 0.75rem 1rem;
    margin-bottom: 0.5rem;
    border-radius: 8px;
    border: none;
    background-color: ${props => props.isActive ? theme.colors.secondary : 'transparent'};
    color: ${props => props.isActive ? theme.colors.white : theme.colors.textMain};
    font-weight: ${props => props.isActive ? '600' : '500'};
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
        background-color: ${props => props.isActive ? theme.colors.secondary : theme.colors.bgLight};
    }
`;

const SearchWrapper = styled.div`
    display: flex;
    align-items: center;
    background-color: ${theme.colors.white};
    border: 1px solid ${theme.colors.border};
    border-radius: 8px;
    padding: 0.75rem 1rem;
    margin-bottom: 2rem;
    box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
`;

const SearchInput = styled.input`
    border: none;
    outline: none;
    font-size: 1rem;
    width: 100%;
    color: ${theme.colors.textMain};
    margin-left: 0.75rem;
`;

const NoNotices = styled.div`
    text-align: center;
    padding: 3rem;
    color: ${theme.colors.textLight};

    h3 {
        margin-top: 1rem;
    }
    
    svg {
        opacity: 0.5;
    }
`;


const Home = () => {
    const [activeCategory, setActiveCategory] = useState("All");
    const [searchTerm, setSearchTerm] = useState("");

    const filteredNotices = DUMMY_NOTICES.filter(notice => {
        const matchesCategory = activeCategory === "All" || notice.category === activeCategory;
        const matchesSearch = notice.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            notice.content.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    // 5. USE STYLED COMPONENTS IN JSX
    return (
        <>
            <NavBar />
            <Page>
                <HeroSection>
                    <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Campus Digital Notice Board</h1>
                    <p style={{ color: '#94a3b8', fontSize: '1.1rem' }}>Stay updated with the latest announcements, exams, and events.</p>
                </HeroSection>

                <Container>
                    <Sidebar>
                        <h3 style={{ marginBottom: '1rem', color: theme.colors.primary, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Filter size={18} /> Categories
                        </h3>
                        <div>
                            {CATEGORIES.map(category => (
                                <CategoryButton
                                    key={category}
                                    isActive={activeCategory === category}
                                    onClick={() => setActiveCategory(category)}
                                >
                                    {category}
                                </CategoryButton>
                            ))}
                        </div>
                    </Sidebar>

                    <main>
                        <SearchWrapper>
                            <Search size={20} color={theme.colors.textLight} />
                            <SearchInput
                                type="text"
                                placeholder="Search notices by title or content..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </SearchWrapper>

                        <div>
                            {filteredNotices.length > 0 ? (
                                filteredNotices.map(notice => (
                                    <NoticeCard key={notice.id} notice={notice} />
                                ))
                            ) : (
                                <NoNotices>
                                    <Bell size={48} />
                                    <h3>No notices found</h3>
                                    <p>Try adjusting your search or category filter.</p>
                                </NoNotices>
                            )}
                        </div>
                    </main>
                </Container>
            </Page>
        </>
    );
};

export default Home;