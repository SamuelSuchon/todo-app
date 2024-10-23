import React from 'react';

const Settings: React.FC = () => {
  return (
    <div style={styles.pageContainer}>
      {/* Hlavička */}
      <div style={styles.headerContainer}>
        <h2 style={styles.headerText}>Nastavenia</h2>
      </div>
      {/* Obsah stránky */}
      <div style={styles.contentContainer}>
        <p>Tu môžete prispôsobiť nastavenia vašej aplikácie.</p>
      </div>
    </div>
  );
};

const styles = {
  // hlavný kontajner stránky
  pageContainer: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center' as const,
    width: '100%',
    minHeight: '100vh', // Zabezpečiť, aby stránka mala plnú výšku
  },
  // hlavička
  headerContainer: {
    width: '100%',
    backgroundColor: '#01234a', // Farba pozadia pre hlavičku
    padding: '20px 0',
    textAlign: 'center' as const,
    position: 'fixed' as const,
    top: 0,
    left: 0,
    zIndex: 10, // Zabezpečiť, aby hlavička zostala na vrchu
  },
  // text hlavičky
  headerText: {
    margin: 0,
    color: '#fff', // Biela farba textu pre hlavičku
    fontSize: '24px',
    fontWeight: 'bold' as const,
  },
  // hlavný obsah stránky
  contentContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center' as const,
    justifyContent: 'flex-start' as const, // Zarovnanie obsahu hore
    padding: '20px',
    backgroundColor: '#f8f9fa', // Farba pozadia pre obsahovú časť
    width: '100%',
    minHeight: 'calc(100vh - 80px)', // Zabezpečiť plnú výšku okrem hlavičky
    marginTop: '68px', // Predísť prekrytiu s pevnou hlavičkou
  },
};

export default Settings;
