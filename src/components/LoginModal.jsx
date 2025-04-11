import React from 'react';
import Modal from 'react-modal';
import Hero from './hero2';

const LoginModal = ({ isOpen, onRequestClose }) => {
  const handleDiscordLogin = () => {
    window.location.href = 'https://api.desigamblers.top/login'; // Redirect to backend login route
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.75)', // Solid dark background with opacity
        },
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          borderRadius: '10px',
          padding: '1px',
          overflow: 'hidden', // Prevent inner content from scrolling
        },
      }}
    >
      <Hero onDiscordLogin={handleDiscordLogin} />
    </Modal>
  );
};

export default LoginModal;
