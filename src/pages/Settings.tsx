import React from 'react';

const Settings: React.FC = () => {
  return (
    <div style={styles.pageContainer}>
      <div style={styles.headerContainer}>
        <h2 style={styles.headerText}>Settings</h2>
      </div>
      <div style={styles.contentContainer}>
        <p>Here you can customize your application settings.</p>
      </div>
    </div>
  );
};

const styles = {
  pageContainer: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center' as const,
    width: '100%',
    minHeight: '100vh', // Ensure the page takes the full height
  },
  headerContainer: {
    width: '100%',
    backgroundColor: '#01234a', // Background color for the header
    padding: '20px 0',
    textAlign: 'center' as const,
    position: 'fixed' as const,
    top: 0,
    left: 0,
    zIndex: 10, // Ensure the header stays on top
  },
  headerText: {
    margin: 0,
    color: '#fff', // White text color for the header
    fontSize: '24px',
    fontWeight: 'bold' as const,
  },
  contentContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center' as const,
    justifyContent: 'flex-start' as const, // Align content to the top
    padding: '20px',
    backgroundColor: '#f8f9fa', // Matching background color for the content area
    width: '100%',
    minHeight: 'calc(100vh - 80px)', // Ensure full height minus the header
    marginTop: '68px', // To prevent overlap with the fixed header
  },
};

export default Settings;
