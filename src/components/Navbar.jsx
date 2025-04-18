import React, { useState, useEffect } from "react";
import ProfileModal from "./ProfileModal"; // Import ProfileModal
import RuleModal from "./RuleModal"; // Import RuleModal
import { logo } from "../assets";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiscord } from "@fortawesome/free-brands-svg-icons";
import {
  faHome,
  faGift,
  faTrophy,
  faBars,
  faHandsPraying,
  faUserAlt,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons"; // Import icons
import { useLocation } from "react-router-dom"; // Import useLocation for active link detection
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { useUser } from "../context/UserContext";

import { db } from "./firebase";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
} from "firebase/firestore";


const Navbar = () => {
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false); // State for ProfileModal
  const [isRuleModalOpen, setIsRuleModalOpen] = useState(false); // State for RuleModal
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State for dropdown menu
  const location = useLocation(); // Hook to get the current location

  const openProfileModal = () => setIsProfileModalOpen(true); // Function to open ProfileModal
  const closeProfileModal = () => setIsProfileModalOpen(false); // Function to close ProfileModal

  const openRuleModal = () => setIsRuleModalOpen(true); // Function to open RuleModal
  const closeRuleModal = () => setIsRuleModalOpen(false); // Function to close RuleModal

  const handleDiscordSignup = () => {
    const clientId = "1362531918414872776";
    const redirectUri = encodeURIComponent("http://localhost:5173/");
    const scope = "identify email"; // adjust scopes as needed
    const responseType = "code";

    const discordAuthUrl = `https://discord.com/api/oauth2/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${encodeURIComponent(scope)}`;

    window.location.href = discordAuthUrl;
  };

  const { userData, setUserData } = useUser(); // Access user data from context

  const isActive = (path) => location.pathname === path; // Function to check if the link is active

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen); // Function to toggle dropdown menu

  // Discord Callback Component to handle OAuth callback
  
// Function to handle logout
const handleLogout = () => {
  // Clear user data from localStorage
  localStorage.removeItem("userData");

  // Reset user data in context
  setUserData(null);

  // Redirect user (optional)
  window.location.href = "/"; // Redirect to home or login page
};

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const code = params.get("code");
  
    const exchangeCodeForToken = async () => {
      const clientId = "1362531918414872776";
      const clientSecret = "0HTdL5L0v4Wz6TZH4Wr_R8RGZ03z5ABZ";
      const redirectUri = "http://localhost:5173/";
  
      const body = new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: "authorization_code",
        code,
        redirect_uri: redirectUri,
        scope: "identify email",
      });
  
      try {
        const tokenRes = await fetch("https://discord.com/api/oauth2/token", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: body.toString(),
        });
  
        const tokenData = await tokenRes.json();
        const accessToken = tokenData.access_token;
  
        if (accessToken) {
          const userRes = await fetch("https://discord.com/api/users/@me", {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
  
          const userInfo = await userRes.json();
          setUserData(userInfo); // Save to context
          localStorage.setItem("userData", JSON.stringify(userInfo));
  
          const { id, username, email = "no-email-returned", avatar } = userInfo;
  
          try {
            const usersRef = collection(db, "users");
  
            // 🔍 Check for duplicates based on email OR username
            const q = query(
              usersRef,
              where("email", "==", email),
            );
  
            const querySnapshot = await getDocs(q);
  
            if (querySnapshot.empty) {
              // ✅ No duplicate found, add user
              await addDoc(usersRef, {
                id,
                username,
                email,
                avatar,
                timestamp: new Date(),
              });
  
              console.log("✅ User added to Firebase:", username);
            } else {
              console.log("⚠️ User already exists in Firebase:", username);
            }
          } catch (error) {
            console.error("🔥 Firebase write error:", error);
          }
        }
      } catch (error) {
        console.error("Discord auth error:", error);
      }
    };
  
    if (code) {
      exchangeCodeForToken();
    }
  }, [location, setUserData]);



  

  return (
    <>
      <nav className="w-full flex py-6 items-center navbar relative">
        <img src={logo} alt="Desi" className="w-[60px] h-[60px] mr-4" />{" "}
        {/* Added margin-right for space after the logo */}
        <div className="flex items-center space-x-4 hidden md:flex">
          <a
            href="/"
            className={`px-4 py-2 rounded-full text-white ${isActive("/") ? "text-[#4b8cff] shadow-lg shadow-black" : "bg-transparent text-white"} hover:text-[#4b8cff] hover:shadow-lg hover:shadow-black transition-colors duration-300`}
          >
            <FontAwesomeIcon icon={faHome} className="mr-2" />
            Home
          </a>
          <a
            href="/raffles"
            className={`px-4 py-2 rounded-full text-white ${isActive("/raffles") ? "text-[#4b8cff] shadow-lg shadow-black" : "bg-transparent text-grey"} hover:text-[#4b8cff] hover:shadow-lg hover:shadow-black transition-colors duration-300`}
          >
            <FontAwesomeIcon icon={faGift} className="mr-2" />
            Raffles
          </a>
          <a
            href="/proof"
            className={`px-4 py-2 rounded-full text-white ${isActive("/proof") ? "text-[#4b8cff] shadow-lg shadow-black" : "bg-transparent text-grey"} hover:text-[#4b8cff] hover:shadow-lg hover:shadow-black transition-colors duration-300`}
          >
            <FontAwesomeIcon icon={faHandsPraying} className="mr-2" />
            Proof
          </a>
          <a
            href="#leaderboard"
            className={`px-4 py-2 rounded-full text-white ${isActive("/leaderboard") ? "text-[#4b8cff] shadow-lg shadow-black" : "bg-transparent text-white"} hover:text-[#4b8cff] hover:shadow-lg hover:shadow-black transition-colors duration-300`}
          >
            <FontAwesomeIcon icon={faTrophy} className="mr-2" />
            Leaderboard
          </a>
        </div>
        <div className="ml-auto hidden md:flex items-center space-x-4">
          



        <button
            style={{
              background: "transparent",
              color: "white",
              padding: "10px 20px",
              borderRadius: "50px",
              fontWeight: "bold",
              cursor: "pointer",
              border: "2px solid white",
              textTransform: "uppercase",
            }}
            onClick={openRuleModal} // Open RuleModal on click
          >
            <HelpOutlineIcon /> ARE YOU ELIGIBLE?
          </button>




          {userData && userData.username ? (
    
  <button
              className="px-6 py-3 rounded-full font-poppins font-semibold text-white uppercase"
              style={{
                backgroundImage: "linear-gradient(45deg, #000439, #000A83)",
              }}
              onClick={openProfileModal}
            >
              Claim 100$
            </button> // Show Claim 100$ button if no username is available
          ) : (
            <button
            style={{
              background: "transparent",
              color: "white",
              padding: "10px 20px",
              borderRadius: "50px",
              fontWeight: "bold",
              cursor: "pointer",
              border: "2px solid white",
              textTransform: "uppercase",
            }}
            onClick={handleDiscordSignup}
          >
            <FontAwesomeIcon icon={faDiscord} className="mr-2" />
            Login
          </button>
          )}





          {/* Conditionally render the "Claim $100" button or the username */}
          {userData && userData.username ? (
            <img
            src={`https://cdn.discordapp.com/avatars/${userData.id}/${userData.avatar}.png`}
            alt="Avatar"
            className="w-10 h-10 rounded-full mt-1"

            style={{
              cursor: "pointer",
              border: "1px dashed #bef3f5",
              textTransform: "uppercase",
            }}

          />
  
          ) : (
            <button
              className="px-0 py-0 rounded-full font-poppins font-semibold text-white uppercase"
              style={{
                backgroundImage: "linear-gradient(45deg,rgb(255, 255, 255),rgb(255, 255, 255))",
              }}
              
            >
              
            </button> // Show Claim 100$ button if no username is available
          )}

          {userData && userData.username ? (
          <button
          className="px-3 py-2 rounded-full font-poppins font-semibold text-white uppercase"
          style={{
            cursor: "pointer",
            textTransform: "uppercase",
            color: "pink",
            fontSize: "18px",
          }}
          onClick={handleLogout}
        >
          <FontAwesomeIcon icon={faSignOutAlt} className="mr-0"/>
          
        </button> // Show Claim 100$ button if no username is available
  
          ) : (
            <button
              className="px-0 py-0 rounded-full font-poppins font-semibold text-white uppercase"
              style={{
                backgroundImage: "linear-gradient(45deg,rgb(255, 255, 255),rgb(255, 255, 255))",
              }}
              
            >
              
            </button> // Show Claim 100$ button if no username is available
          )}


        </div>
        {/* Dropdown Menu for Mobile */}
        <div className="md:hidden flex items-center ml-auto">
          <button
            onClick={toggleDropdown}
            className="text-white text-2xl"
            aria-label="Toggle Menu"
          >
            <FontAwesomeIcon icon={faBars} />
          </button>
          {isDropdownOpen && (
            <div className="absolute top-full right-0 w-48 mt-2 bg-black text-white shadow-lg rounded-lg">
              <a
                href="/"
                className={`block px-4 py-2 text-sm ${isActive("/") ? "text-[#4b8cff] font-bold" : "text-white"} hover:text-[#4b8cff] transition-colors duration-300`}
              >
                <FontAwesomeIcon icon={faHome} className="mr-2" />
                Home
              </a>
              <a
                href="/raffles"
                className={`block px-4 py-2 text-sm ${isActive("/raffles") ? "text-[#4b8cff] font-bold" : "text-white"} hover:text-[#4b8cff] transition-colors duration-300`}
              >
                <FontAwesomeIcon icon={faGift} className="mr-2" />
                Raffles
              </a>
              <a
                href="/proof"
                className={`block px-4 py-2 text-sm ${isActive("/proof") ? "text-[#4b8cff] font-bold" : "text-white"} hover:text-[#4b8cff] transition-colors duration-300`}
              >
                <FontAwesomeIcon icon={faHandsPraying} className="mr-2" />
                Proof
              </a>
              <a
                href="/leaderboard"
                className={`block px-4 py-2 text-sm ${isActive("/leaderboard") ? "text-[#4b8cff] font-bold" : "text-white"} hover:text-[#4b8cff] transition-colors duration-300`}
              >
                <FontAwesomeIcon icon={faTrophy} className="mr-2" />
                Leaderboard
              </a>
              <button
                style={{
                  background: "transparent",
                  color: "white",
                  padding: "5px 5px",
                  borderRadius: "30px",
                  fontWeight: "bold",
                  cursor: "pointer",
                  border: "1px solid white",
                  textTransform: "uppercase",
                }}
                className="block w-full text-left mt-2"
                onClick={openRuleModal} // Open RuleModal on click
              >
                <HelpOutlineIcon /> ARE YOU ELIGIBLE?
              </button>
              <button
                className="block px-6 py-3 rounded-full font-poppins font-semibold text-white uppercase w-full mt-2"
                style={{
                  backgroundImage: "linear-gradient(45deg, #000439, #000A83)",
                }}
                onClick={openProfileModal}
              >
                Claim 100$
              </button>
            </div>
          )}
        </div>
      </nav>
      <ProfileModal
        isOpen={isProfileModalOpen}
        onRequestClose={closeProfileModal}
      />{" "}
      {/* Add ProfileModal */}
      <RuleModal
        isOpen={isRuleModalOpen}
        onRequestClose={closeRuleModal}
      />{" "}
      {/* Add RuleModal */}
    </>
  );
};

export default Navbar;
