import React from 'react';

export const EmptyState: React.FC = () => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '300px',
      color: '#666',
      fontSize: '18px'
    }}>
      No Active Positions. Add a ticker...
    </div>
  );
};
