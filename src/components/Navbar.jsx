import React, { useState, useEffect } from "react";
import ProfileModal from "./ProfileModal";
import RuleModal from "./RuleModal";
import { logo } from "../assets";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiscord } from "@fortawesome/free-brands-svg-icons";
import {
  faHome,
  faGift,
  faTrophy,
  faBars,
  faHandsPraying,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { useLocation } from "react-router-dom";
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
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isRuleModalOpen, setIsRuleModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [hasClaimed, setHasClaimed] = useState(false); // New state
  const location = useLocation();

  const { userData, setUserData } = useUser();

  const openProfileModal = () => setIsProfileModalOpen(true);
  const closeProfileModal = () => setIsProfileModalOpen(false);
  const openRuleModal = () => setIsRuleModalOpen(true);
  const closeRuleModal = () => setIsRuleModalOpen(false);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const isActive = (path) => location.pathname === path;

  const handleDiscordSignup = () => {
    const clientId = "1362531918414872776";
    const redirectUri = encodeURIComponent("http://localhost:5173/");
    const scope = "identify email";
    const responseType = "code";

    const discordAuthUrl = `https://discord.com/api/oauth2/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${encodeURIComponent(scope)}`;
    window.location.href = discordAuthUrl;
  };

  const handleLogout = () => {
    localStorage.removeItem("userData");
    setUserData(null);
    window.location.href = "/";
  };

  // Handle Discord OAuth and add user to Firestore
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
          setUserData(userInfo);
          localStorage.setItem("userData", JSON.stringify(userInfo));

          const { id, username, email = "no-email-returned", avatar } = userInfo;

          try {
            const usersRef = collection(db, "users");
            const q = query(usersRef, where("email", "==", email));
            const querySnapshot = await getDocs(q);

            if (querySnapshot.empty) {
              await addDoc(usersRef, {
                id,
                username,
                email,
                avatar,
                discordUsername: username || "unknown",
                discordId: id || "",
                timestamp: new Date(),
              });

              console.log("User added to Firebase:", username);
            } else {
              console.log("User already exists in Firebase:", username);
            }
          } catch (error) {
            console.error("Firebase write error:", error);
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

  // 🔍 Check if the user already claimed
  useEffect(() => {
    const checkIfClaimed = async () => {
      if (userData && userData.username) {
        try {
          const claimsRef = collection(db, "claims");
          const q = query(claimsRef, where("discordUsername", "==", userData.username));
          const querySnapshot = await getDocs(q);

          if (!querySnapshot.empty) {
            setHasClaimed(true);
          } else {
            setHasClaimed(false);
          }
        } catch (error) {
          console.error("Error checking claim status:", error);
        }
      }
    };

    checkIfClaimed();
  }, [userData]);

  return (
    <>
      <nav className="w-full flex py-6 items-center navbar relative">
        <img src={logo} alt="Desi" className="w-[60px] h-[60px] mr-4" />
        <div className="flex items-center space-x-4 hidden md:flex">
          {["/", "/raffles", "/proof", "/leaderboard"].map((path, i) => {
            const labels = ["Home", "Raffles", "Proof", "Leaderboard"];
            const icons = [faHome, faGift, faHandsPraying, faTrophy];
            return (
              <a
                key={path}
                href={path}
                className={`px-4 py-2 rounded-full text-white ${
                  isActive(path)
                    ? "text-[#4b8cff] shadow-lg shadow-black"
                    : "bg-transparent"
                } hover:text-[#4b8cff] hover:shadow-lg hover:shadow-black transition-colors duration-300`}
              >
                <FontAwesomeIcon icon={icons[i]} className="mr-2" />
                {labels[i]}
              </a>
            );
          })}
        </div>

        <div className="ml-auto hidden md:flex items-center space-x-4">
          <button
            onClick={openRuleModal}
            className="text-white border-2 border-white px-5 py-2 rounded-full font-bold uppercase hover:text-[#4b8cff] transition-colors"
          >
            <HelpOutlineIcon /> ARE YOU ELIGIBLE?
          </button>

          {userData && userData.username && !hasClaimed && (
            <button
              id="claiming"
              onClick={openProfileModal}
              className="px-6 py-3 rounded-full text-white uppercase font-semibold"
              style={{
                backgroundImage: "linear-gradient(45deg, #000439, #000A83)",
              }}
            >
              Claim 100$
            </button>
          )}

          {!userData && (
            <button
              onClick={handleDiscordSignup}
              className="text-white border-2 border-white px-5 py-2 rounded-full font-bold uppercase"
            >
              <FontAwesomeIcon icon={faDiscord} className="mr-2" />
              Login
            </button>
          )}

          {userData && userData.username && (
            <>
              <img
                src={`https://cdn.discordapp.com/avatars/${userData.id}/${userData.avatar}.png`}
                alt="Avatar"
                className="w-10 h-10 rounded-full mt-1 border border-dashed border-[#bef3f5]"
                style={{ cursor: "pointer" }}
              />
              <button
                onClick={handleLogout}
                className="text-pink-400 text-lg font-semibold uppercase"
              >
                <FontAwesomeIcon icon={faSignOutAlt} />
              </button>
            </>
          )}
        </div>

        {/* Mobile Dropdown */}
        <div className="md:hidden flex items-center ml-auto">
          <button onClick={toggleDropdown} className="text-white text-2xl">
            <FontAwesomeIcon icon={faBars} />
          </button>
          {isDropdownOpen && (
            <div className="absolute top-full right-0 w-48 mt-2 bg-black text-white shadow-lg rounded-lg z-50">
              {["/", "/raffles", "/proof", "/leaderboard"].map((path, i) => {
                const labels = ["Home", "Raffles", "Proof", "Leaderboard"];
                const icons = [faHome, faGift, faHandsPraying, faTrophy];
                return (
                  <a
                    key={path}
                    href={path}
                    className={`block px-4 py-2 text-sm ${
                      isActive(path) ? "text-[#4b8cff] font-bold" : ""
                    } hover:text-[#4b8cff]`}
                  >
                    <FontAwesomeIcon icon={icons[i]} className="mr-2" />
                    {labels[i]}
                  </a>
                );
              })}
              <button
                onClick={openRuleModal}
                className="block w-full text-left px-4 py-2 border-t border-gray-700 mt-2 text-white"
              >
                <HelpOutlineIcon /> ARE YOU ELIGIBLE?
              </button>

              {userData && userData.username && !hasClaimed && (
                <button
                  onClick={openProfileModal}
                  className="block w-full mt-2 px-4 py-2 text-center rounded-full bg-gradient-to-r from-[#000439] to-[#000A83] text-white font-semibold uppercase"
                >
                  Claim 100$
                </button>
              )}
            </div>
          )}
        </div>
      </nav>

      {/* Modals */}
      <ProfileModal
        isOpen={isProfileModalOpen}
        onRequestClose={closeProfileModal}
        discordUser={userData}
      />
      <RuleModal isOpen={isRuleModalOpen} onRequestClose={closeRuleModal} />
    </>
  );
};

export default Navbar;
