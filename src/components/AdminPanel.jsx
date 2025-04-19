import React, { useEffect, useState } from "react";
import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";

const AdminPanel = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersCollection = collection(db, "users");
        const usersSnapshot = await getDocs(usersCollection);
        const userList = usersSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsers(userList);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div
      style={{
        padding: "2rem",
        background: "rgba(0, 0, 0, 0.6)", // Transparent black
        minHeight: "100vh",
        color: "#fff",
        fontFamily: "Orbitron, sans-serif",
        backdropFilter: "blur(8px)", // Optional blur effect
      }}
    >
      <h2 style={{ marginBottom: "1rem", fontSize: "28px", textAlign: "center" }}>
        👾 Admin Panel - Discord Users
      </h2>

      {users.length > 0 ? (
        <div style={{ overflowX: "auto" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              borderRadius: "12px",
              overflow: "hidden",
              boxShadow: "0 0 25px rgba(0, 255, 255, 0.2)",
              background: "rgba(255, 255, 255, 0.03)", // Light transparent background
            }}
          >
            <thead>
              <tr
                style={{
                  background: "linear-gradient(to right, #00f2fe, #4facfe)",
                  color: "#000",
                }}
              >
                <th style={headerStyle}>#</th>
                <th style={headerStyle}>Username</th>
                <th style={headerStyle}>Email</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr
                  key={user.id}
                  style={{
                    transition: "transform 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "scale(1.01)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                >
                  <td style={cellStyle}>{index + 1}</td>
                  <td style={cellStyle}>{user.username}</td>
                  <td style={cellStyle}>{user.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p style={{ textAlign: "center", color: "#aaa" }}>No users found.</p>
      )}
    </div>
  );
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

export default AdminPanel;
