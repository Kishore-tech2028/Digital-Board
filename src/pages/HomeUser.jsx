import React, { useState } from 'react';
import { Bell, Search, Filter } from 'lucide-react';
import NoticeCard from '../components/NoticeCard';
import NavBar  from '../components/NavBar';

// --- THEME & DUMMY DATA (Move these to separate files in real app) ---
const theme = {
    colors: {
        primary: "#0f172a",
        secondary: "#3b82f6",
        bgLight: "#f1f5f9",
        white: "#ffffff",
        textMain: "#334155",
        textLight: "#64748b",
        border: "#e2e8f0"
    }
};

const DUMMY_NOTICES = [
    { id: 1, title: "Mid-Semester Exam Schedule Released", date: "Oct 25, 2023", category: "Exams", content: "The final schedule for the Fall 2023 mid-semester exams has been released. Please check the attached PDF for your specific department's timetable.", isPinned: true },
    { id: 2, title: "Campus Recruitment Drive: TCS", date: "Oct 24, 2023", category: "Placements", content: "Tata Consultancy Services (TCS) will be visiting our campus for recruitment on Nov 5th. Eligible students (CGPA > 7.0) must register by this Friday.", isPinned: false },
    { id: 3, title: "Diwali Holiday Announcement", date: "Oct 22, 2023", category: "Holidays", content: "The university will remain closed from Nov 10th to Nov 15th for Diwali celebrations. Classes will resume on Nov 16th.", isPinned: false },
    { id: 4, title: "Annual Tech Fest 'Technova' Registration", date: "Oct 20, 2023", category: "Events", content: "Registration for all Technova events is now open! Visit the student council office or the official website to register your teams.", isPinned: false },
];

const CATEGORIES = ["All", "Exams", "Placements", "Events", "Holidays", "General"];

const Home = () => {
    const [activeCategory, setActiveCategory] = useState("All");
    const [searchTerm, setSearchTerm] = useState("");

    // Filter logic: STANDARD FRONTEND FILTERING
    const filteredNotices = DUMMY_NOTICES.filter(notice => {
        const matchesCategory = activeCategory === "All" || notice.category === activeCategory;
        const matchesSearch = notice.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              notice.content.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    // --- STYLES ---
    const pageStyle = { backgroundColor: theme.colors.bgLight, minHeight: '100vh' };
    // (Navbar would go here in real app, we'll assume it's in App.jsx or imported)

    const heroSectionStyle = {
        backgroundColor: theme.colors.primary,
        color: theme.colors.white,
        padding: '3rem 2rem',
        textAlign: 'center',
        marginBottom: '2rem'
    };

    const containerStyle = {
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 1.5rem',
        display: 'grid',
        gridTemplateColumns: '250px 1fr', // Sidebar + Main Content
        gap: '2rem',
        alignItems: 'start'
    };

    const sidebarStyle = {
        backgroundColor: theme.colors.white,
        padding: '1.5rem',
        borderRadius: '12px',
        boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)',
        position: 'sticky',
        top: '2rem' // Stays visible when scrolling
    };

    const categoryButtonStyle = (isActive) => ({
        display: 'block',
        width: '100%',
        textAlign: 'left',
        padding: '0.75rem 1rem',
        marginBottom: '0.5rem',
        borderRadius: '8px',
        border: 'none',
        backgroundColor: isActive ? theme.colors.secondary : 'transparent',
        color: isActive ? theme.colors.white : theme.colors.textMain,
        fontWeight: isActive ? '600' : '500',
        cursor: 'pointer',
        transition: 'all 0.2s'
    });

    const searchBarStyle = {
        display: 'flex',
        alignItems: 'center',
        backgroundColor: theme.colors.white,
        border: `1px solid ${theme.colors.border}`,
        borderRadius: '8px',
        padding: '0.75rem 1rem',
        marginBottom: '2rem',
        boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)'
    };

    return (
        <>
        <NavBar />
        <div style={pageStyle}>
            {/* HERO SECTION */}
            <div style={heroSectionStyle}>
                <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Campus Digital Notice Board</h1>
                <p style={{ color: '#94a3b8', fontSize: '1.1rem' }}>Stay updated with the latest announcements, exams, and events.</p>
            </div>

            {/* MAIN LAYOUT */}
            <div style={containerStyle}>
                {/* SIDEBAR FILTERS */}
                <aside style={sidebarStyle}>
                    <h3 style={{ marginBottom: '1rem', color: theme.colors.primary, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Filter size={18} /> Categories
                    </h3>
                    <div>
                        {CATEGORIES.map(category => (
                            <button
                                key={category}
                                style={categoryButtonStyle(activeCategory === category)}
                                onClick={() => setActiveCategory(category)}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </aside>

                {/* NOTICE FEED */}
                <main>
                    {/* SEARCH BAR */}
                    <div style={searchBarStyle}>
                        <Search size={20} color={theme.colors.textLight} style={{ marginRight: '0.75rem' }} />
                        <input
                            type="text"
                            placeholder="Search notices by title or content..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{ border: 'none', outline: 'none', fontSize: '1rem', width: '100%', color: theme.colors.textMain }}
                        />
                    </div>

                    {/* NOTICE LIST */}
                    <div>
                        {filteredNotices.length > 0 ? (
                            filteredNotices.map(notice => (
                                <NoticeCard key={notice.id} notice={notice} />
                            ))
                        ) : (
                            <div style={{ textAlign: 'center', padding: '3rem', color: theme.colors.textLight }}>
                                <Bell size={48} style={{ marginBottom: '1rem', opacity: 0.5 }} />
                                <h3>No notices found</h3>
                                <p>Try adjusting your search or category filter.</p>
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
        </>
        );
    };

export default Home;