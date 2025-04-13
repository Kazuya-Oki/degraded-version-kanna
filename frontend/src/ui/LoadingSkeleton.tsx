import React from 'react';

export const LoadingSkeleton = () => {
  return (
    <div
      style={{
        marginBottom: '12px',
        padding: '10px 15px 10px 0',
        borderRadius: '18px',
        maxWidth: '70%',
        position: 'relative',
        animation: 'pulse 1.5s infinite ease-in-out',
      }}
    >
      <p>通信中...</p>
      <style jsx>{`
        @keyframes pulse {
          0% {
            opacity: 0.6;
          }
          50% {
            opacity: 1;
          }
          100% {
            opacity: 0.6;
          }
        }
      `}</style>
    </div>
  );
};