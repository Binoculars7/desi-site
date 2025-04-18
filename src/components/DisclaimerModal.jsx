import React, { useState, useEffect } from "react";
import "./DisclaimerModal.css";

const DisclaimerModal = () => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const accepted = localStorage.getItem("disclaimerAccepted");
    if (accepted === "true") {
      setVisible(false);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("disclaimerAccepted", "true");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="disclaimer-overlay">
      <div className="disclaimer-modal">
        <h2>🔞 Age Disclaimer</h2>
        <p>
          This site is intended for users aged 18+. Do you wish to continue?
        </p>
        <div className="disclaimer-buttons">
          <button className="accept-btn" onClick={handleAccept}>
            Yes, I am 18+
          </button>
          <button
            className="exit-btn"
            onClick={() => (window.location.href = "https://google.com")}
          >
            No, Exit
          </button>
        </div>
      </div>
    </div>
  );
};

export default DisclaimerModal;
