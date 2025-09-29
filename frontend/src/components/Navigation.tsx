import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import ThemeToggle from './ThemeToggle';

const Navigation: React.FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const isActive = (path: string): boolean => location.pathname === path;

  if (!user) {
    return (
      <nav className="nav">
        <div className="nav-container">
          <div>
            <h2 style={{ color: 'var(--text-primary)' }}>AI Journal</h2>
          </div>
          <ThemeToggle />
        </div>
      </nav>
    );
  }

  return (
    <nav className="nav">
      <div className="nav-container">
        <Link to="/journal" className="nav-link nav-brand">
          AI Journal
        </Link>
        <div className="nav-links">
          <Link 
            to="/journal" 
            className={`nav-link ${isActive('/journal') ? 'active' : ''}`}
          >
            Write Entry
          </Link>
          <Link 
            to="/entries" 
            className={`nav-link ${isActive('/entries') ? 'active' : ''}`}
          >
            Past Entries
          </Link>
          <ThemeToggle />
          <button 
            onClick={logout} 
            className="nav-link"
            style={{ 
              background: 'none', 
              border: 'none', 
              cursor: 'pointer',
              fontSize: 'inherit',
              fontWeight: 'inherit'
            }}
          >
            Logout ({user.email})
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;