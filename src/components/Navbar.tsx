// src/components/Navbar.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav style={styles.navbar}>
      <ul style={styles.navList}>
        <li style={styles.navItem}>
          <Link to="/" style={styles.navLink}>Home</Link>
        </li>
        <li style={styles.navItem}>
          <Link to="/tasks" style={styles.navLink}>Tasks</Link>
        </li>
        <li style={styles.navItem}>
          <Link to="/notes" style={styles.navLink}>Notes</Link>
        </li>
      </ul>
    </nav>
  );
};

const styles = {
  navbar: {
    padding: '10px',
    backgroundColor: '#333',
  },
  navList: {
    listStyle: 'none',
    display: 'flex',
    justifyContent: 'space-around',
  },
  navItem: {
    margin: '0 10px',
  },
  navLink: {
    color: '#fff',
    textDecoration: 'none',
    fontSize: '18px',
  },
};

export default Navbar;
