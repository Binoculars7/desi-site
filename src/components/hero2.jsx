import React from 'react';
import styles from '../style';
import backgroundImg from './backgorund.png'; // Replace with your actual background image path

const Hero = ({ onDiscordLogin }) => {
  const heroStyle = {
    backgroundImage: `url(${backgroundImg})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    minHeight: '400px', // Adjust as needed
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#000000', // Text color on top of the background image
    padding: '80px 20px', // Adjust padding as needed
    textAlign: 'center', // Center text horizontally
  };

  return (
    <section id='home' style={heroStyle}>
      <div className={`flex md:flex-row flex-col ${styles.paddingY} text-center`}>
        <div className={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-16 px-6`}>
          <div className='flex flex-col justify-center items-center w-full'>
            <h2 className='text-[24px] font-semibold mb-4'>WELCOME TO</h2>
            <h1 className='font-poppins font-semibold ss:text-[72px] text-[52px] ss:leading-[100.8px] leading-[75px]'>
            Desi<span className='text-gradient'>Gamblers</span>.
            </h1>
          </div>
          <p className={`${styles.paragraph} max-w-[470px] mt-5 mx-auto`}>
            Explore the realm of VIP Rewards from DesiGamblers!
          </p>
          <p className={`${styles.paragraph} max-w-[5000px] mt-5 mx-auto`}>
            Compete in Leaderboards, try your luck in Exclusive Raffles, join Giveaways & more!
          </p>
          <div className="flex flex-col items-center mt-5">
          <label className="flex items-center mb-4">
              <span className="text-white">By logging :- I confirm I'm over 18 years old and that I have read and agree to the Terms and Conditions</span>
            </label>
            <button
              onClick={onDiscordLogin}
              className='px-6 py-3 rounded-full font-poppins font-semibold text-white uppercase'
              style={{
                backgroundImage: 'linear-gradient(317deg, #5865F2, #404EED)', // Replace with your actual gradient
              }}
            >
              Login with Discord
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
