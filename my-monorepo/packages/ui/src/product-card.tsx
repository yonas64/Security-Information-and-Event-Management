// packages/ui/card.tsx
import React from 'react';

export const Card = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      style={{
        border: '1px solid #ddd',
        padding: '16px',
        borderRadius: '8px',
        marginBottom: '10px',
      }}
    >
      {children}
    </div>
  );
};