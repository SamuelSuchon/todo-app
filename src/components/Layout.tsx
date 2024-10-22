// src/components/Layout.tsx
import React from 'react';
import Navbar from './Navbar'; // Import your Navbar

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div style={styles.layoutContainer}>
      {/* Header */}
      <header style={styles.header}>
        <h1 style={styles.headerText}>My Todo App</h1>
      </header>

      {/* Main content area where children components will be rendered */}
      <div style={styles.contentContainer}>
        {children}
      </div>

      {/* Navbar */}
      <Navbar />
    </div>
  );
};

const styles = {
  layoutContainer: {
    display: 'flex',
    flexDirection: 'column' as const,
    minHeight: '100vh',
    backgroundColor: '#f4f4f4', // Background for the entire layout
  },
  header: {
    backgroundColor: '#002D78', // Header color
    color: '#fff',
    padding: '20px 0',
    textAlign: 'center' as const,
  },
  headerText: {
    margin: 0,
    fontSize: '24px',
    fontWeight: 'bold' as const,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: '#D3D3D3', // Gray background for the middle part
    display: 'flex',
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    padding: '20px',
    width: '100%',
  },
};

export default Layout;
