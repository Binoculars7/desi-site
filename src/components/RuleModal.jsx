import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { Close } from '@mui/icons-material';

const RuleModal = ({ isOpen, onRequestClose }) => {
  const [animation, setAnimation] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'; // Disable scrolling
    } else {
      document.body.style.overflow = 'auto'; // Enable scrolling
    }
    return () => {
      document.body.style.overflow = 'auto'; // Clean up on unmount
    };
  }, [isOpen]);

  useEffect(() => {
    setAnimation(true);
    const timer = setTimeout(() => setAnimation(false), 500); // Match duration with CSS transition
    return () => clearTimeout(timer);
  }, []);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={{
        content: {
          width: '80vw', 
          maxWidth: '400px',
          height: '500px',
          margin: 'auto',
          borderRadius: '10px',
          background: 'linear-gradient(317deg, #000439, #000108)',
          color: 'white',
          padding: '0',
          overflow: 'hidden',
        },
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.75)',
        },
      }}
    >
      <div style={{ position: 'relative' }}>
        <div style={{
          backgroundImage: 'url("https://submit.desigamblers.top/cdn/standard (4).gif")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '150px',  // Adjusted height
        }}></div>
        <div style={{ position: 'absolute', top: '10px', right: '10px', cursor: 'pointer' }} onClick={onRequestClose}>
          <Close style={{ color: 'white' }} />
        </div>
        <div style={{ padding: '20px', marginTop: '-70px', zIndex: 1, position: 'relative' }}>
          <div
            style={{
              transition: 'opacity 0.5s ease, transform 0.5s ease',
              opacity: animation ? 0 : 1,
              transform: animation ? 'translateX(20px)' : 'translateX(0)',
            }}
          >
                        <h1 className="text-transparent">‎</h1>
                        <h1 className="text-transparent">‎</h1>
                        <h1 className="text-transparent">‎</h1>
                        <h1 className="text-transparent">‎</h1>

            <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>RULES FOR 35$ WELCOME BONUS</h2>
            <div style={{ marginBottom: '10px' }}>
              <p style={{
                marginBottom: '5px',
                whiteSpace: 'nowrap',  // Ensures text does not wrap
                textWrap: 'wrap'  // Allows text to wrap
              }}>
                &bull; THE ONLY CODE WHICH GIVES $35 WELCOME BONUS
              </p>
              <p style={{
                marginBottom: '5px',
                whiteSpace: 'nowrap'  // Ensures text does not wrap
              }}>
                &bull; MUST BE UNDER DESI2023 CODE
              </p>
              <p style={{
                marginBottom: '5px',
                whiteSpace: 'nowrap',  // Ensures text does not wrap
            textWrap: 'wrap'  // Allows text to wrap
              }}>
                &bull; DEPOSITE 35$
              </p>
              <p style={{
                marginBottom: '5px',
                whiteSpace: 'nowrap'  // Ensures text does not wrap
              }}>
                &bull; WAGER 35$
              </p>
              <p style={{
                marginBottom: '5px',
                whiteSpace: 'nowrap',  // Ensures text does not wrap
            textWrap: 'wrap' 
              }}>
                &bull; BONUS IS RECEIVED UNDER 72 HOURS
              </p>
              <p style={{
                marginBottom: '5px',
                whiteSpace: 'nowrap'  // Ensures text does not wrap
              }}>
                &bull; MUST BE FIRST STAKE ACCOUNT
              </p>
              <p style={{
                whiteSpace: 'nowrap'  // Ensures text does not wrap
              }}>
                &bull; ALT ACCOUNTS ARE NOT ELIGIBLE
              </p>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default RuleModal;
