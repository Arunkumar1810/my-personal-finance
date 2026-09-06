import React from 'react';
import { useFallback } from './FallbackContext';

export const OfflineWarningBanner: React.FC = () => {
  const { isFallback } = useFallback();

  if (!isFallback) {
    return null;
  }

  return (
    <div style={{
      backgroundColor: '#ff9800',
      color: '#fff',
      padding: '12px 20px',
      textAlign: 'center',
      fontWeight: 'bold',
      width: '100%',
      boxSizing: 'border-box'
    }}>
      ⚠ Live Market Data is Unavailable. Showing cached data.
    </div>
  );
};
