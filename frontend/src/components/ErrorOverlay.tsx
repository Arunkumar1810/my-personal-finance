import React from 'react';

export const ErrorOverlay: React.FC = () => {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      color: '#fff',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: '24px',
      zIndex: 9999
    }}>
      Connection Lost
    </div>
  );
};
