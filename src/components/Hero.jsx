import React, { useState } from 'react';
import styles from "../style";
import backgroundImg from "./backgorund.png"; // Replace with your actual background image path
import ProfileModal from './ProfileModal'; // Import ProfileModal

const Hero = () => {
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false); // State for ProfileModal
  
  const openProfileModal = () => setIsProfileModalOpen(true); // Function to open ProfileModal
  const closeProfileModal = () => setIsProfileModalOpen(false); // Function to close ProfileModal
  
  const heroStyle = {
    backgroundImage: `url(${backgroundImg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    minHeight: "400px", // Adjust as needed
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#ffffff", // Text color on top of the background image
    padding: "80px 20px", // Adjust padding as needed
    textAlign: "center", // Center text horizontally
  };

  
  const handleProofClick = () => {
    window.location.href = "/proof";
  };

  return (
    <>
    
    <section id="home" style={heroStyle}>
      <div
        className={`flex md:flex-row flex-col ${styles.paddingY} text-center`}
      >
        <div
          className={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-16 px-6`}
        >
          <div className="flex flex-col justify-center items-center w-full">
            <h2 className="text-[24px] font-semibold mb-4">WELCOME TO</h2>
            <h1 className="font-poppins font-semibold ss:text-[72px] text-[40px] ss:leading-[100.8px] leading-[75px]">
              Desi<span className="text-gradient">Gamblers</span>.
            </h1>
          </div>
          <p className={`${styles.paragraph} max-w-[470px] mt-5 mx-auto`}>
            Explore the realm of VIP Rewards from DesiGamblers!
          </p>
          <p className={`${styles.paragraph} max-w-[5000px] mt-5 mx-auto`}>
            Compete in Leaderboards, try your luck in Exclusive Raffles, join
            Giveaways & more!
          </p>
          <div className="flex gap-4 flex-col md:xl:flex-row items-center justify-center mx-auto">
            
          <button
            className="rounded-full mt-8 text-white py-2 px-6 mt-5 mx-auto"
            style={{ background: "linear-gradient(45deg, #000439, #000A83)" }}
            onClick={handleProofClick}
          >
            ARE WE LEGIT?
          </button>
          {/* <button
            className="rounded-full mt-8 text-white py-2 px-6 mx-auto"
            style={{
              backgroundImage: "linear-gradient(45deg, #000439, #000A83)",
            }}
            onClick={openProfileModal}
          >
            Claim 35$
          </button> */}
          <button
            className='rounded-full mt-8 text-white py-2 px-6 mt-5 mx-auto uppercase'
            style={{
              backgroundImage: 'linear-gradient(45deg, #000439, #000A83)',
            }}
            onClick={openProfileModal}
          >
            Claim 35$
          </button>
            </div>  
        </div>
      </div>
    </section>
      <ProfileModal isOpen={isProfileModalOpen} onRequestClose={closeProfileModal} /> {/* Add ProfileModal */}
      </>
  );
};

export default Hero;
