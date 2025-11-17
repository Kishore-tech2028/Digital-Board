import React from 'react';
import { LogOut, LayoutDashboard, FilePlus, ListCollapse } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import theme from '../theme';

// --- STYLES ---
const layoutStyle = {
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: theme.colors.bgLight || '#f1f5f9'
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
    top: 0,
    zIndex: 100
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
    padding: '2.5rem',
    width: 'calc(100% - 260px)'
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
    color: theme.colors.urgent,
    border: 'none',
    borderRadius: '8px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    fontSize: '0.9rem'
};


const AdminLayout = ({ children, activePage = 'dashboard' }) => {
    const navigate = useNavigate();

    const handleNavClick = (page) => {
        if (page === 'dashboard') {
            navigate('/admin/dashboard');
        } else if (page === 'create-notice') {
            navigate('/admin/createNotice');
        } else if (page === 'notices') {
            navigate('/admin/notices');
        }
    };

    const handleLogout = () => {
        // Clear session and go back to login
        sessionStorage.removeItem('adminBoardCode');
        navigate('/admin');
    };

    return (
        <div style={layoutStyle}>
            <aside style={sidebarStyle}>
                <div style={brandStyle}>
                    Admin Panel
                </div>
                
                <nav style={navStyle}>
                    {/* 1. Dashboard Link */}
                    <div
                        style={navItemStyle(activePage === 'dashboard')}
                        onClick={() => handleNavClick('dashboard')}
                    >
                        <LayoutDashboard size={20} />
                        Dashboard
                    </div>

                    {/* 2. Create Notice Link */}
                    <div
                        style={navItemStyle(activePage === 'create-notice')}
                        onClick={() => handleNavClick('create-notice')}
                    >
                        <FilePlus size={20} />
                        Create Notice
                    </div>

                    {/* 3. Manage Notices Link */}
                    <div
                        style={navItemStyle(activePage === 'notices')}
                        onClick={() => handleNavClick('notices')}
                    >
                        <ListCollapse size={20} />
                        Manage Notices
                    </div>
                </nav>

                <div style={logoutContainerStyle}>
                    <button 
                        style={logoutButtonStyle}
                        onClick={handleLogout}
                    >
                        <LogOut size={20} />
                        Logout
                    </button>
                </div>
            </aside>

            <main style={mainContentStyle}>
                {children}
            </main>
        </div>
    );
};

export default AdminLayout;