import React, { useState } from 'react';
import styles from '../style';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

const Testimonials = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleRafflesClick = () => {
    window.open('/Raffles', '_blank');
  };

  const handleHowItWorksClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <section
      id='clients'
      className={`${styles.paddingY} ${styles.flexCenter} flex-col relative`}
    >
      <div className='absolute z-[0] w-[60%] h-[60%] -right-[50%] rounded-full blue__gradient bottom-40' />
      <div className='w-full flex justify-center items-center flex-col sm:mb-16 mb-6 relative z-[1]'>
        <h2 className={styles.heading2} style={{ textAlign: 'center' }}>
          DesiGamblers Raffles
        </h2>
        <p className={`${styles.paragraph} text-center max-w-[450px] mt-5`}>
          Join exclusive raffles and win exciting rewards! Get ready for a shake up!
        </p>
        <div className='flex mt-10 space-x-5'>
          <button
            onClick={handleRafflesClick}
            style={{
              backgroundImage: 'linear-gradient(317deg, #59090C 4.52%, #DA898C)',
              color: 'white',
              padding: '10px 20px',
              borderRadius: '50px',
              fontWeight: 'bold',
              cursor: 'pointer',
              border: 'none',
              textTransform: 'uppercase',
            }}
          >
            Go to Raffles
          </button>
          <button
            onClick={handleHowItWorksClick}
            style={{
              background: 'transparent',
              color: 'white',
              padding: '10px 20px',
              borderRadius: '50px',
              fontWeight: 'bold',
              cursor: 'pointer',
              border: '2px solid white',
              textTransform: 'uppercase',
            }}
          >
            <HelpOutlineIcon/> How It Works ?
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div className='fixed inset-0 flex items-center justify-center z-[2]'>
          <div className='fixed inset-0 bg-black opacity-50' onClick={closeModal}></div>
          <div
            className='p-8 rounded-lg relative z-[3] w-full max-w-3xl mx-4'
            style={{
              borderRadius: '25px',
              backgroundColor: 'rgb(255 255 255 / 12%)', // Modal background transparent with black tint
              backdropFilter: 'blur(10px)', // Optional: to add blur effect
            }}
          >
                      <div style={{ textAlign: 'center' }}>
          <span
            style={{
              backgroundImage:
                'linear-gradient(317deg, #b58a1b 4.52%, #e0c060 34.37%, #ffeeb2 50.47%, #ffe77c 65.63%, #ffca41 110.56%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontSize: '2rem', // adjust as needed
              fontWeight: 'bold',
              textTransform: 'uppercase',
              display: 'inline-block',
            }}
          >
            HOW OUR RAFFLES WORK?
          </span>
          </div>
            <button onClick={closeModal} style={{ position: 'absolute', top: '10px', right: '10px', fontWeight: 'bold', color: 'white' }}>X</button>
            <div className='space-y-4'>
              <div className='p-4 bg-white bg-opacity-20 rounded-lg'>
                <p className={`${styles.paragraph} text-center`}> WHAT IS A RAFFLE?
<br></br>
                  Raffles are similar to lotteries where you have a chance to win exciting prizes. At the end of the raffle period, a winning ticket is drawn at random. The more tickets you have, the better your chances of winning.
                </p>
              </div>
              <div className='p-4 bg-white bg-opacity-20 rounded-lg'>
                <p className={`${styles.paragraph} text-center`}>HOW TO PARTICIPATE?
<br></br>
You can join three different kinds of raffles :
<br></br>
 Free Raffles: Enter certain raffles without any cost.
<br></br>
 Coins Raffles: Claim coins from our daily claimer to join these raffles.
                </p>
              </div>
              <div className='p-4 bg-white bg-opacity-20 rounded-lg'>
                <p className={`${styles.paragraph} text-center`}>PROVABLY FAIR

                  <br></br>
                  Our raffles are provably fair, ensuring transparency and trust. We use an external randomizer resource to guarantee fair and unbiased results.


                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Testimonials;
