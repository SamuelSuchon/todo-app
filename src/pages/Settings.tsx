import React from 'react';

const Settings: React.FC = () => {
  return (
    <div style={styles.pageContainer}>
      <div style={styles.headerContainer}>
        <h2 style={styles.headerText}>Settings</h2>
      </div>
      <div style={styles.container}>
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
    height: '100%',
  },
  headerContainer: {
    width: '100%',
    backgroundColor: '#01234a', // Background color for the header
    padding: '20px 0',
    textAlign: 'center' as const,
    position: 'fixed' as const,
    top: 0,
    left: 0,
  },
  headerText: {
    margin: 0,
    color: '#fff', // White text color
    fontSize: '24px',
    fontWeight: 'bold' as const,
  },
  container: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    padding: '20px',
    marginTop: '80px', // Ensure content is below the fixed header
  },
};

export default Settings;
