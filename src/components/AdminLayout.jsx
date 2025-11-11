import { LogOut, LayoutDashboard, FilePlus, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // 1. IMPORT useNavigate
import theme from '../theme'; // Use the central theme

// --- STYLES (Switched to central theme) ---
const layoutStyle = {
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: theme.colors.bgLight || '#f1f5f9' // Added fallback
};

const sidebarStyle = {
    width: '260px',
    backgroundColor: theme.colors.primary,
    color: theme.colors.white,
    display: 'flex',
    flexDirection: 'column',
    position: 'fixed',
    height: '100vh',
    left: 0,
    top: 0
};

const brandStyle = {
    padding: '1.5rem',
    fontSize: '1.25rem',
    fontWeight: '800',
    letterSpacing: '1px',
    borderBottom: '1px solid rgba(255,255,255,0.1)',
    marginBottom: '1rem'
};

const navStyle = {
    flex: 1,
    padding: '0 1rem'
};

const navItemStyle = (isActive) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    padding: '0.875rem 1rem',
    color: isActive ? theme.colors.white : '#94a3b8',
    backgroundColor: isActive ? 'rgba(255,255,255,0.1)' : 'transparent',
    borderRadius: '8px',
    marginBottom: '0.5rem',
    textDecoration: 'none',
    fontWeight: isActive ? '600' : '500',
    transition: 'all 0.2s',
    cursor: 'pointer'
});

const mainContentStyle = {
    marginLeft: '260px',
    flex: 1,
    padding: '2.5rem'
};

const logoutContainerStyle = {
    padding: '1rem',
    borderTop: '1px solid rgba(255,255,255,0.1)'
};

const logoutButtonStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    width: '100%',
    padding: '0.875rem 1rem',
    backgroundColor: 'transparent',
    color: theme.colors.urgent, // Using theme color
    border: 'none',
    borderRadius: '8px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
};


const AdminLayout = ({ children, activePage = 'dashboard' }) => {
    // 2. GET THE navigate FUNCTION
    const navigate = useNavigate();

    // 3. UPDATE HANDLER TO USE navigate
    const handleNavClick = (page) => {
        if (page === 'dashboard') {
            navigate('/admin/dashboard');
        } else if (page === 'create-notice') {
            navigate('/admin/createNotice');
        } else if (page === 'users') {
            navigate('/admin/users');
        }
    };

    return (
        <div style={layoutStyle}>
            {/* SIDEBAR */}
            <aside style={sidebarStyle}>
                <div style={brandStyle} >
                    Admin Portal
                </div>
                <nav style={navStyle}>
                    <div
                        style={navItemStyle(activePage === 'dashboard')}
                        onClick={() => handleNavClick('dashboard')}
                    >
                        <LayoutDashboard size={20} />
                        Dashboard Overview
                    </div>
                    <div
                        style={navItemStyle(activePage === 'create-notice')}
                        onClick={() => handleNavClick('create-notice')}
                    >
                        <FilePlus size={20} />
                        Create Notice
                    </div>
                    <div
                        style={navItemStyle(activePage === 'users')}
                        onClick={() => handleNavClick('users')}
                    >
                        <Users size={20} />
                        Manage Users
                    </div>
                </nav>

                <div style={logoutContainerStyle}>
                    <button
                        style={logoutButtonStyle}
                        onClick={() => alert("Logging out... (Backend required)")}
                        onMouseOver={(e) => e.target.style.backgroundColor = 'rgba(239, 68, 68, 0.1)'}
                        onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
                    >
                        <LogOut size={20} />
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* MAIN CONTENT AREA */}
            <main style={mainContentStyle}>
                {children}
            </main>
        </div>
    );
};

export default AdminLayout;