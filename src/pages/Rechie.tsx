import React from 'react';

const RechieChat: React.FC = () => {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <iframe
        src="https://poe.com/Rechie"
        width="100%"
        height="600"
        style={{ border: 'none' }}
        title="Rechie Chat"
      ></iframe>
    </div>
  );
};
export default RechieChat;