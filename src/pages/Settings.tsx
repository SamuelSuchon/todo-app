// src/pages/Settings.tsx
import React from 'react';

const Settings: React.FC = () => {
  return (
    <div style={styles.container}>
      <h2>Settings</h2>
      <p>Here you can customize your application settings.</p>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
  },
};

export default Settings;
