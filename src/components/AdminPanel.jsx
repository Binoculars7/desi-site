import React, { useState, useEffect } from "react";
import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";
import Papa from "papaparse";
import "./App.css"; // Ensure to import the CSS for styling and 3D effect

// Admin Login Popup Component
const AdminLogin = ({ onLoginSuccess }) => {
  const [secretWord, setSecretWord] = useState("");
  const [newSecretWord, setNewSecretWord] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isChangingSecret, setIsChangingSecret] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [currentSecretWord, setCurrentSecretWord] = useState("admin123"); // Use state for current secret word

  // Handle login
  const handleLogin = () => {
    if (secretWord === currentSecretWord) {
      setIsAuthenticated(true);
      setErrorMessage("");
      onLoginSuccess();
    } else {
      setErrorMessage("Incorrect secret word");
    }
  };

  // Handle change of secret word
  const handleChangeSecretWord = () => {
    if (newSecretWord === secretWord && secretWord !== "") {
      // Update the secret word in the state
      setCurrentSecretWord(newSecretWord);
      setSecretWord("");
      setNewSecretWord("");
      setIsChangingSecret(false);
      setErrorMessage("");
    } else {
      setErrorMessage("Current secret word is incorrect or new secret word is empty");
    }
  };

  return (
    <div className="login-container">
      <div className="login-popup">
        <h2 className="popup-title">Admin Login</h2>

        {/* Secret Word Input */}
        {!isAuthenticated && !isChangingSecret && (
          <>
            <input
              type="password"
              placeholder="Enter Secret Word"
              value={secretWord}
              onChange={(e) => setSecretWord(e.target.value)}
              className="input-field"
            />
            <button onClick={handleLogin} className="submit-btn">
              Access
            </button>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
          </>
        )}

        {/* Change Secret Word Input */}
        {isAuthenticated && !isChangingSecret && (
          <button
            onClick={() => setIsChangingSecret(true)}
            className="submit-btn"
          >
            Change Secret Word
          </button>
        )}

        {/* Change Secret Word */}
        {isChangingSecret && (
          <>
            <input
              type="password"
              placeholder="Enter Current Secret Word"
              value={secretWord}
              onChange={(e) => setSecretWord(e.target.value)}
              className="input-field"
            />
            <input
              type="password"
              placeholder="Enter New Secret Word"
              value={newSecretWord}
              onChange={(e) => setNewSecretWord(e.target.value)}
              className="input-field"
            />
            <button onClick={handleChangeSecretWord} className="submit-btn">
              Change Secret Word
            </button>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
          </>
        )}
      </div>
    </div>
  );
};

// Main Admin Panel Component
const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const fetchUsersAndClaims = async () => {
      try {
        const usersSnapshot = await getDocs(collection(db, "users"));
        const claimsSnapshot = await getDocs(collection(db, "claims"));

        const usersList = usersSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const claimsList = claimsSnapshot.docs.map((doc) => doc.data());

        const mergedData = usersList
          .filter((user) => user.username && user.email) // Only include users with username AND email
          .map((user) => {
            const matchingClaim = claimsList.find(
              (claim) => claim.discordUsername === user.username
            );
            return {
              ...user,
              customUsername: matchingClaim?.customUsername || "-",
            };
          });

        setUsers(mergedData);
        setFilteredUsers(mergedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchUsersAndClaims();
  }, []);

  // Filter + Search Logic
  useEffect(() => {
    let result = [...users];

    if (filter === "withEmail") {
      result = result.filter((u) => u.email);
    } else if (filter === "withoutEmail") {
      result = result.filter((u) => !u.email);
    } else if (filter === "claimed") {
      result = result.filter((u) => u.customUsername !== "-");
    } else if (filter === "unclaimed") {
      result = result.filter((u) => u.customUsername === "-");
    }

    if (searchTerm.trim() !== "") {
      result = result.filter((u) =>
        u.username?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredUsers(result);
    setCurrentPage(1);
  }, [filter, searchTerm, users]);

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const indexOfLast = currentPage * usersPerPage;
  const indexOfFirst = indexOfLast - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirst, indexOfLast);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const exportToCSV = () => {
    const csv = Papa.unparse(
      filteredUsers.map(({ username, email, customUsername }) => ({
        username,
        email,
        customUsername,
        status: customUsername !== "-" ? "Claimed" : "Unclaimed",  // Add status
      }))
    );
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "discord_users_with_custom_usernames.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  return (
    <div
      style={{
        padding: "2rem",
        background: "rgba(0, 0, 0, 0.6)",
        minHeight: "100vh",
        color: "#fff",
        fontFamily: "Orbitron, sans-serif",
        backdropFilter: "blur(8px)",
      }}
    >
      {!isLoggedIn ? (
        <AdminLogin onLoginSuccess={handleLoginSuccess} />
      ) : (
        <>
          <h2 style={{ marginBottom: "1rem", fontSize: "28px", textAlign: "center" }}>
            👾 Admin Panel - Discord Users
          </h2>

          {/* Controls */}
          <div
            style={{
              marginBottom: "1rem",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              gap: "1rem",
            }}
          >
            <div>
              <button onClick={() => setFilter("all")} style={filterBtnStyle}>All</button>
              <button onClick={() => setFilter("claimed")} style={filterBtnStyle}>Claimed</button>
              <button onClick={() => setFilter("unclaimed")} style={filterBtnStyle}>Unclaimed</button>
            </div>

            <input
              type="text"
              placeholder="Search: discord username"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={searchInputStyle}
            />

            <button onClick={exportToCSV} style={exportBtnStyle}>
              📁 Export CSV
            </button>
          </div>

          {/* Table */}
          {currentUsers.length > 0 ? (
            <div style={{ overflowX: "auto" }}>
              <table style={tableStyle}>
                <thead>
                  <tr style={headerRowStyle}>
                    <th style={headerStyle}>S/N</th>
                    <th style={headerStyle}>Username</th>
                    <th style={headerStyle}>Email</th>
                    <th style={headerStyle}>Custom Username</th>
                    <th style={headerStyle}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {currentUsers.map((user, index) => (
                    <tr
                      key={user.id}
                      style={{ transition: "transform 0.2s" }}
                      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.01)")}
                      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                    >
                      <td style={cellStyle}>{indexOfFirst + index + 1}</td>
                      <td style={cellStyle}>{user.username}</td>
                      <td style={cellStyle}>{user.email}</td>
                      <td style={cellStyle}>{user.customUsername}</td>
                      <td style={cellStyle}>
                        {user.customUsername !== "-" ? (
                          <span style={claimedBadgeStyle}>Claimed</span>
                        ) : (
                          <span style={unclaimedBadgeStyle}>Unclaimed</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p style={{ textAlign: "center", color: "#aaa" }}>No users found.</p>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div style={{ marginTop: "1rem", textAlign: "center" }}>
              <button onClick={() => handlePageChange(currentPage - 1)} style={paginationBtnStyle}>Prev</button>
              <span style={{ margin: "0 1rem" }}>
                Page {currentPage} of {totalPages}
              </span>
              <button onClick={() => handlePageChange(currentPage + 1)} style={paginationBtnStyle}>Next</button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

// Styles
const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  borderRadius: "12px",
  overflow: "hidden",
  boxShadow: "0 0 25px rgba(0, 255, 255, 0.2)",
  background: "rgba(255, 255, 255, 0.03)",
};

const headerRowStyle = {
  background: "linear-gradient(to right, #00f2fe, #4facfe)",
  color: "#000",
};

const headerStyle = {
  padding: "14px",
  fontWeight: "bold",
  textTransform: "uppercase",
  fontSize: "14px",
  border: "1px solid #222",
};

const cellStyle = {
  padding: "12px",
  border: "1px solid #2c2c3a",
  backgroundColor: "rgba(255, 255, 255, 0.04)",
  color: "#e0e0ff",
  textAlign: "center",
};

const filterBtnStyle = {
  padding: "8px 16px",
  marginRight: "10px",
  background: "#4facfe",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "bold",
};

const searchInputStyle = {
  padding: "8px 14px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  width: "200px",
  fontSize: "14px",
  color: "black",
};

const exportBtnStyle = {
  padding: "8px 20px",
  background: "#00f2fe",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "bold",
  color: "#000",
};

const paginationBtnStyle = {
  padding: "6px 16px",
  margin: "0 6px",
  background: "#4facfe",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  color: "#fff",
};

const claimedBadgeStyle = {
  padding: "4px 8px",
  background: "#38d9a9",
  borderRadius: "5px",
};

const unclaimedBadgeStyle = {
  padding: "4px 8px",
  background: "#e74c3c",
  borderRadius: "5px",
};

export default AdminPanel;
