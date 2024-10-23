import React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faTasks, faStickyNote, faCog } from '@fortawesome/free-solid-svg-icons';

const Navbar: React.FC = () => {
  return (
    <nav style={styles.navbar}>
      <ul style={styles.navList}>
        <li style={styles.navItem}>
          <NavLink 
            to="/" 
            style={({ isActive }) => ({
              ...styles.navLink,
              color: isActive ? '#FFD700' : '#fff', // Highlight active link
            })}
          >
            <div style={styles.navButton}>
              <FontAwesomeIcon icon={faHome} size="2x" />
              <span style={styles.navText}>Home</span>
            </div>
          </NavLink>
        </li>
        <li style={styles.navItem}>
          <NavLink 
            to="/tasks" 
            style={({ isActive }) => ({
              ...styles.navLink,
              color: isActive ? '#FFD700' : '#fff',
            })}
          >
            <div style={styles.navButton}>
              <FontAwesomeIcon icon={faTasks} size="2x" />
              <span style={styles.navText}>Tasks</span>
            </div>
          </NavLink>
        </li>
        <li style={styles.navItem}>
          <NavLink 
            to="/notes" 
            style={({ isActive }) => ({
              ...styles.navLink,
              color: isActive ? '#FFD700' : '#fff',
            })}
          >
            <div style={styles.navButton}>
              <FontAwesomeIcon icon={faStickyNote} size="2x" />
              <span style={styles.navText}>Notes</span>
            </div>
          </NavLink>
        </li>
        <li style={styles.navItem}>
          <NavLink 
            to="/settings" 
            style={({ isActive }) => ({
              ...styles.navLink,
              color: isActive ? '#FFD700' : '#fff',
            })}
          >
            <div style={styles.navButton}>
              <FontAwesomeIcon icon={faCog} size="2x" />
              <span style={styles.navText}>Settings</span>
            </div>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

const styles = {
  navbar: {
    position: 'fixed' as const,
    bottom: 0,
    left: 0,
    width: '100%',
    backgroundColor: '#01234a', // Updated navbar color
    padding: '10px 0',
    display: 'flex',
    justifyContent: 'space-around',
    boxShadow: '0 -2px 5px rgba(0,0,0,0.15)',
  },
  navList: {
    listStyle: 'none',
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    padding: 0,
    margin: 0,
  },
  navItem: {
    flex: 1,
    textAlign: 'center' as const,
  },
  navLink: {
    textDecoration: 'none',
    color: '#fff',
    display: 'block',
  },
  navButton: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    padding: '10px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    borderRight: '1px solid #555',
  },
  navText: {
    marginTop: '5px',
    fontSize: '12px',
  },
};

export default Navbar;
