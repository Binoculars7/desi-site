import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { Close } from "@mui/icons-material";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Firebase
import { db, collection, addDoc } from "./firebase"; // 👈 Import Firestore

function getStoredUsers() {
  return JSON.parse(localStorage.getItem("registeredUsers")) || {};
}

function saveStoredUsers(users) {
  localStorage.setItem("registeredUsers", JSON.stringify(users));
}

function isUserAlreadyRegistered() {
  return localStorage.getItem("userRegistered") === "true";
}

function isUsernameOrEmailAlreadyRegistered(username, email) {
  const registeredUsers = getStoredUsers();
  return registeredUsers[username] || registeredUsers[email];
}

function markUserAsRegistered() {
  localStorage.setItem("userRegistered", "true");
}

const ProfileModal = ({ isOpen, onRequestClose }) => {
  const [animation, setAnimation] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    underDesi: false,
    wagered: false,
  });
  const [formError, setFormError] = useState("");

  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
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
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleUsernameChange = (e) => {
    const value = e.target.value.toLowerCase().replace(/[^a-z0-9]/g, "");
    setFormData((prevData) => ({
      ...prevData,
      username: value,
    }));
  };

  const handleSubmit = async () => {
    if (!formData.username || !formData.underDesi || !formData.wagered) {
      setFormError("All fields must be filled out");
      return;
    }

    if (isUserAlreadyRegistered()) {
      setFormError("You can only apply for one account");
      toast("You can only apply for one account", {
        position: "bottom-right",
        autoClose: 5000,
        theme: "dark",
      });
      return;
    }

    setFormError("");

    try {
      // Firestore Save
      await addDoc(collection(db, "users"), {
        ...formData,
        timestamp: new Date(),
      });

      // API Call
      const response = await axios.get(
        `https://api.desigamblers.top/api/submit/${formData.username}`,
        {
          headers: { "Access-Control-Allow-Origin": "*" },
        }
      );

      toast(`${response.data}`, {
        position: "bottom-right",
        autoClose: 5000,
        theme: "dark",
      });

      let registeredUsers = getStoredUsers();
      registeredUsers[formData.username] = true;
      saveStoredUsers(registeredUsers);
      markUserAsRegistered();

      onRequestClose();
    } catch (error) {
      console.error("Submission Error:", error);
      toast("Error submitting claim profile", {
        position: "bottom-right",
        autoClose: 5000,
        theme: "dark",
      });
      setFormError("Error submitting claim profile");
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
                height: "150px",
              }}
            />
            <div
              onClick={onRequestClose}
              style={{ position: "absolute", top: "10px", right: "10px", cursor: "pointer" }}
            >
              <Close style={{ color: "white" }} />
            </div>
            <div style={{ padding: "20px", marginTop: "-70px", zIndex: 1 }}>
              <div
                style={{
                  transition: "opacity 0.5s ease, transform 0.5s ease",
                  opacity: animation ? 0 : 1,
                  transform: animation ? "translateX(20px)" : "translateX(0)",
                }}
              >
                <div style={{ textAlign: "center" }}>
                  <h1 className="text-transparent">‎</h1>

                  {/* Username Input */}
                  <div style={{ marginBottom: "10px", textAlign: "left" }}>
                    <h4>Username</h4>
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleUsernameChange}
                      style={{
                        backgroundColor: "#000000",
                        padding: "5px 10px",
                        borderRadius: "10px",
                        color: "white",
                        width: "100%",
                        textAlign: "center",
                        border: "none",
                        outline: "none",
                      }}
                      placeholder="Enter your username"
                    />
                  </div>

                  {/* Under Desi */}
                  <div style={{ marginBottom: "10px", textAlign: "left" }}>
                    <h4>Are you under "desi2023"?</h4>
                    <label style={checkboxStyle}>
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

                  {/* Wagered */}
                  <div style={{ marginBottom: "10px", textAlign: "left" }}>
                    <h4>Have you deposited and wagered $100?</h4>
                    <label style={checkboxStyle}>
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

                  {/* Error + Submit */}
                  {formError && (
                    <p style={{ color: "red", textAlign: "center" }}>
                      {formError}
                    </p>
                  )}
                  <button
                    onClick={handleSubmit}
                    style={submitButtonStyle}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
};

const checkboxStyle = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  backgroundColor: "#000000",
  padding: "5px 10px",
  borderRadius: "10px",
  color: "white",
};

const submitButtonStyle = {
  background: "#166D3B",
  color: "white",
  padding: "10px 20px",
  borderRadius: "10px",
  border: "none",
  cursor: "pointer",
  fontSize: "14px",
  marginTop: "10px",
  transition: "background 0.3s ease",
};

export default ProfileModal;
