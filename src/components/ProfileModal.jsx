import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { Close } from "@mui/icons-material";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { db } from "./firebase"; // Adjust path as needed
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

// Utility functions
function getStoredUsers() {
  return JSON.parse(localStorage.getItem("registeredUsers")) || {};
}

function saveStoredUsers(users) {
  localStorage.setItem("registeredUsers", JSON.stringify(users));
}

function isUserAlreadyRegistered(discordId) {
  const registeredUsers = getStoredUsers();
  return registeredUsers[discordId];
}

function isUsernameAlreadyRegistered(username) {
  const registeredUsers = getStoredUsers();
  return Object.values(registeredUsers).includes(username);
}

function markUserAsRegistered(discordId, username) {
  const registeredUsers = getStoredUsers();
  registeredUsers[discordId] = username;
  saveStoredUsers(registeredUsers);
  localStorage.setItem("userRegistered", "true");
}

const ProfileModal = ({ isOpen, onRequestClose, discordUser }) => {
  const [animation, setAnimation] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    underDesi: false,
    wagered: false,
  });
  const [formError, setFormError] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  useEffect(() => {
    setAnimation(true);
    const timer = setTimeout(() => setAnimation(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const handleInputChange = (e) => {
    const { name, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : e.target.value,
    }));
  };

  const handleUsernameChange = (e) => {
    const value = e.target.value.toLowerCase().replace(/[^a-z0-9]/g, "");
    setFormData((prev) => ({ ...prev, username: value }));
  };

  const handleSubmit = async () => {
    if (!formData.username || !formData.underDesi || !formData.wagered) {
      setFormError("All fields must be filled out");
      return;
    }

    if (isUserAlreadyRegistered(discordUser?.id)) {
      setFormError("You can only apply for one account");
      toast("You can only apply for one account", { theme: "dark" });
      return;
    }

    if (isUsernameAlreadyRegistered(formData.username)) {
      setFormError("This username is already taken.");
      toast("This username is already taken.", { theme: "dark" });
      return;
    }

    setFormError("");
    setLoading(true);

    try {
      // Submit to your external API
      const response = await axios.get(
        `https://api.desigamblers.top/api/submit/${formData.username}`,
        { headers: { "Access-Control-Allow-Origin": "*" } }
      );

      toast(response.data, { theme: "dark" });

      // Store in Firebase
      await setDoc(doc(db, "claims", discordUser.id), {
        discordId: discordUser.id,
        discordUsername: discordUser.username,
        customUsername: formData.username,
        underDesi: formData.underDesi,
        wagered: formData.wagered,
        timestamp: serverTimestamp(),
      });

      markUserAsRegistered(discordUser.id, formData.username);
      setIsSubmitted(true);
      onRequestClose();
    } catch (error) {
      console.error("Error submitting:", error);
      toast("Error submitting claim profile", { theme: "dark" });
      setFormError("Error submitting claim profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="fixed z-10">
        <Modal
          isOpen={isOpen}
          onRequestClose={onRequestClose}
          style={{
            content: {
              width: "60vw",
              maxWidth: "400px",
              margin: "auto",
              borderRadius: "10px",
              background: "linear-gradient(317deg, #000439, #000108)",
              color: "white",
              padding: "0",
              overflow: "hidden",
            },
            overlay: {
              backgroundColor: "rgba(0, 0, 0, 0.75)",
            },
          }}
        >
          <div style={{ position: "relative" }}>
            <div
              style={{
                backgroundImage:
                  'url("https://api.desigamblers.top/cdn/standard.gif")',
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "150px",
              }}
            />
            <div
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                cursor: "pointer",
              }}
              onClick={onRequestClose}
            >
              <Close style={{ color: "white" }} />
            </div>
            <div
              style={{
                padding: "20px",
                marginTop: "-70px",
                zIndex: 1,
                position: "relative",
              }}
            >
              <div
                style={{
                  transition: "opacity 0.5s ease, transform 0.5s ease",
                  opacity: animation ? 0 : 1,
                  transform: animation ? "translateX(20px)" : "translateX(0)",
                }}
              >
                <div style={{ textAlign: "center" }}>
                  <h1 className="text-transparent">‎</h1>

                  <div style={{ marginBottom: "10px", textAlign: "left" }}>
                    <h4>Username</h4>
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleUsernameChange}
                      style={{
                        backgroundColor: "#000",
                        padding: "5px 10px",
                        borderRadius: "10px",
                        color: "white",
                        width: "100%",
                        border: "none",
                        textAlign: "center",
                      }}
                      placeholder="Enter your username"
                    />
                  </div>

                  <div style={{ marginBottom: "10px", textAlign: "left" }}>
                    <h4>Are you under "desi2023"?</h4>
                    <label
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        backgroundColor: "#000",
                        padding: "5px 10px",
                        borderRadius: "10px",
                        color: "white",
                      }}
                    >
                      <input
                        type="checkbox"
                        name="underDesi"
                        checked={formData.underDesi}
                        onChange={handleInputChange}
                        style={{ transform: "scale(0.8)" }}
                      />
                      <span>Yes</span>
                    </label>
                  </div>

                  <div style={{ marginBottom: "10px", textAlign: "left" }}>
                    <h4>Have you deposited and wagered $100?</h4>
                    <label
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        backgroundColor: "#000",
                        padding: "5px 10px",
                        borderRadius: "10px",
                        color: "white",
                      }}
                    >
                      <input
                        type="checkbox"
                        name="wagered"
                        checked={formData.wagered}
                        onChange={handleInputChange}
                        style={{ transform: "scale(0.8)" }}
                      />
                      <span>Yes</span>
                    </label>
                  </div>

                  {formError && (
                    <p style={{ color: "red", textAlign: "center" }}>
                      {formError}
                    </p>
                  )}

                  {!isSubmitted && (
                    <button
                      onClick={handleSubmit}
                      disabled={loading}
                      style={{
                        background: "#166D3B",
                        color: "white",
                        padding: "10px 20px",
                        borderRadius: "10px",
                        border: "none",
                        cursor: "pointer",
                        fontSize: "14px",
                        marginTop: "10px",
                        opacity: loading ? 0.6 : 1,
                      }}
                    >
                      {loading ? "Submitting..." : "Submit"}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default ProfileModal;
