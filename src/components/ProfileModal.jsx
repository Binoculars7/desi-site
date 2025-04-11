import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { Close } from "@mui/icons-material";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Utility function to get stored users from local storage
function getStoredUsers() {
  return JSON.parse(localStorage.getItem("registeredUsers")) || {};
}

// Utility function to save users to local storage
function saveStoredUsers(users) {
  localStorage.setItem("registeredUsers", JSON.stringify(users));
}

// Utility function to check if a user has already registered
function isUserAlreadyRegistered() {
  return localStorage.getItem("userRegistered") === "true";
}

// Utility function to check if username is already registered
function isUsernameOrEmailAlreadyRegistered(username, email) {
  const registeredUsers = getStoredUsers();
  return registeredUsers[username] || registeredUsers[email];
}

// Utility function to mark user as registered
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
    if (isOpen) {
      document.body.style.overflow = "hidden"; // Disable scrolling
    } else {
      document.body.style.overflow = "auto"; // Enable scrolling
    }
    return () => {
      document.body.style.overflow = "auto"; // Clean up on unmount
    };
  }, [isOpen]);

  useEffect(() => {
    setAnimation(true);
    const timer = setTimeout(() => setAnimation(false), 500); // Match duration with CSS transition
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
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }

    setFormError("");

    try {
      const response = await axios.get(
        `https://api.desigamblers.top/api/submit/${formData.username}`,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        },
      );
      toast(`${response.data}`, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });

      // Mark user as registered
      let registeredUsers = getStoredUsers();
      registeredUsers[formData.username] = true;
      saveStoredUsers(registeredUsers);
      markUserAsRegistered();

      onRequestClose();
    } catch (error) {
      console.error("Error submitting claim profile", error);
      toast("Error submitting claim profile", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
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
              width: "80vw",
              maxWidth: "400px",
              height: "auto",
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
                  'url("https://submit.desigamblers.top/cdn/standard.gif")',
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "150px",
              }}
            ></div>
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
                  <h1 className="text-transparent">‎</h1>

                  <h1 className="text-transparent">‎</h1>
                  <h1 className="text-transparent">‎</h1>
                  <h1 className="text-transparent">‎</h1>
                  <h1 className="text-transparent">‎</h1>
                  <div style={{ marginBottom: "10px", textAlign: "left" }}>
                    <h4 style={{ marginBottom: "5px" }}>Username</h4>
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
                        border: "none",
                        outline: "none",
                        textAlign: "center",
                      }}
                      placeholder="Enter your username"
                    />
                  </div>
                  <div style={{ marginBottom: "10px", textAlign: "left" }}>
                    <h4 style={{ marginBottom: "5px" }}>
                      Are you under "desi2023"?
                    </h4>
                    <label
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        backgroundColor: "#000000",
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
                    <h4 style={{ marginBottom: "5px" }}>
                      Have you deposited and wagered $35?
                    </h4>
                    <label
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        backgroundColor: "#000000",
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
                  <button
                    onClick={handleSubmit}
                    style={{
                      background: "#166D3B",
                      color: "white",
                      padding: "10px 20px",
                      borderRadius: "10px",
                      border: "none",
                      cursor: "pointer",
                      fontSize: "14px",
                      marginTop: "10px",
                      transition: "background 0.3s ease",
                    }}
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

export default ProfileModal;
