import React, { useState } from 'react';
import ProfileModal from './ProfileModal'; // Import ProfileModal
import RuleModal from './RuleModal'; // Import RuleModal
import { logo } from "../assets";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faGift, faTrophy, faBars, faFile, faCircleInfo } from '@fortawesome/free-solid-svg-icons'; // Import icons
import { useLocation } from 'react-router-dom'; // Import useLocation for active link detection
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

const Navbar = () => {
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false); // State for ProfileModal
  const [isRuleModalOpen, setIsRuleModalOpen] = useState(false); // State for RuleModal
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State for dropdown menu
  const location = useLocation(); // Hook to get the current location

  const openProfileModal = () => setIsProfileModalOpen(true); // Function to open ProfileModal
  const closeProfileModal = () => setIsProfileModalOpen(false); // Function to close ProfileModal

  const openRuleModal = () => setIsRuleModalOpen(true); // Function to open RuleModal
  const closeRuleModal = () => setIsRuleModalOpen(false); // Function to close RuleModal

  const isActive = (path) => location.pathname === path; // Function to check if the link is active

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen); // Function to toggle dropdown menu

  return (
    <>
      <nav className='w-full flex py-6 items-center navbar relative'>
        <img src={logo} alt='Desi' className='w-[60px] h-[60px] mr-4' /> {/* Added margin-right for space after the logo */}
        <div className='flex items-center space-x-4 hidden md:flex'>
          <a
            href="/"
            className={`px-4 py-2 rounded-full text-white ${isActive('/') ? 'text-[#4b8cff] shadow-lg shadow-black' : 'bg-transparent text-white'} hover:text-[#4b8cff] hover:shadow-lg hover:shadow-black transition-colors duration-300`}
          >
            <FontAwesomeIcon icon={faHome} className='mr-2' />
            Home
          </a>
          <a
            href="/raffles"
            className={`px-4 py-2 rounded-full text-white ${isActive('/raffles') ? 'text-[#4b8cff] shadow-lg shadow-black' : 'bg-transparent text-grey'} hover:text-[#4b8cff] hover:shadow-lg hover:shadow-black transition-colors duration-300`}
          >
            <FontAwesomeIcon icon={faGift} className='mr-2' />
            Raffles
          </a>
          <a
            href="#leaderboard"
            className={`px-4 py-2 rounded-full text-white ${isActive('/leaderboard') ? 'text-[#4b8cff] shadow-lg shadow-black' : 'bg-transparent text-white'} hover:text-[#4b8cff] hover:shadow-lg hover:shadow-black transition-colors duration-300`}
          >
            <FontAwesomeIcon icon={faTrophy} className='mr-2' />
            Leaderboard
          </a>
         
        </div>
        <div className='ml-auto hidden md:flex items-center space-x-4'>
          <button
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
            onClick={openRuleModal} // Open RuleModal on click
          >
            <HelpOutlineIcon /> ARE YOU ELIGIBLE?
          </button>

          <button
            className='px-6 py-3 rounded-full font-poppins font-semibold text-white uppercase'
            style={{
              backgroundImage: 'linear-gradient(45deg, #000439, #000A83)',
            }}
            onClick={openProfileModal}
          >
            Claim 35$
          </button>
        </div>
        {/* Dropdown Menu for Mobile */}
        <div className='md:hidden flex items-center ml-auto'>
          <button
            onClick={toggleDropdown}
            className='text-white text-2xl'
            aria-label="Toggle Menu"
          >
            <FontAwesomeIcon icon={faBars} />
          </button>
          {isDropdownOpen && (
            <div className='absolute top-full right-0 w-48 mt-2 bg-black text-white shadow-lg rounded-lg'>
              <a
                href="/"
                className={`block px-4 py-2 text-sm ${isActive('/') ? 'text-[#4b8cff] font-bold' : 'text-white'} hover:text-[#4b8cff] transition-colors duration-300`}
              >
                <FontAwesomeIcon icon={faHome} className='mr-2' />
                Home
              </a>
              <a
                href="/raffles"
                className={`block px-4 py-2 text-sm ${isActive('/raffles') ? 'text-[#4b8cff] font-bold' : 'text-white'} hover:text-[#4b8cff] transition-colors duration-300`}
              >
                <FontAwesomeIcon icon={faGift} className='mr-2' />
                Raffles
              </a>
              <a
                href="/leaderboard"
                className={`block px-4 py-2 text-sm ${isActive('/leaderboard') ? 'text-[#4b8cff] font-bold' : 'text-white'} hover:text-[#4b8cff] transition-colors duration-300`}
              >
                <FontAwesomeIcon icon={faTrophy} className='mr-2' />
                Leaderboard
              </a>
              
              <button
                style={{
                  background: 'transparent',
                  color: 'white',
                  padding: '5px 5px',
                  borderRadius: '30px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  border: '1px solid white',
                  textTransform: 'uppercase',
                }}
                className='block w-full text-left mt-2'
                onClick={openRuleModal} // Open RuleModal on click
              >
                <HelpOutlineIcon /> ARE YOU ELIGIBLE?
              </button>
              <button
                className='block px-6 py-3 rounded-full font-poppins font-semibold text-white uppercase w-full mt-2'
                style={{
                  backgroundImage: 'linear-gradient(45deg, #000439, #000A83)',
                }}
                onClick={openProfileModal}
              >
                Claim 35$
              </button>
            </div>
          )}
        </div>
      </nav>
      <ProfileModal isOpen={isProfileModalOpen} onRequestClose={closeProfileModal} /> {/* Add ProfileModal */}
      <RuleModal isOpen={isRuleModalOpen} onRequestClose={closeRuleModal} /> {/* Add RuleModal */}
    </>
  );
};

export default Navbar;
