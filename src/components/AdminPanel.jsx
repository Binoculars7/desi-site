import React, { useEffect, useState } from "react";
import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";
import Papa from "papaparse";

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

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
        setFilteredUsers(userList);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  // Filter Logic
  useEffect(() => {
    let result = [...users];

    if (filter === "withEmail") {
      result = result.filter((u) => u.email);
    } else if (filter === "withoutEmail") {
      result = result.filter((u) => !u.email);
    }

    if (searchTerm.trim() !== "") {
      result = result.filter((u) =>
        u.username?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredUsers(result);
    setCurrentPage(1);
  }, [filter, searchTerm, users]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const indexOfLast = currentPage * usersPerPage;
  const indexOfFirst = indexOfLast - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirst, indexOfLast);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  // Export to CSV
  const exportToCSV = () => {
    const csv = Papa.unparse(
      filteredUsers.map(({ username, email }) => ({ username, email }))
    );
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "discord_users.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
      <h2 style={{ marginBottom: "1rem", fontSize: "28px", textAlign: "center" }}>
        👾 Admin Panel - Discord Users
      </h2>

      {/* Controls */}
      <div style={{ marginBottom: "1rem", display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "1rem" }}>
        <div>
          <button onClick={() => setFilter("all")} style={filterBtnStyle}>All</button>
          <button onClick={() => setFilter("withEmail")} style={filterBtnStyle}>Discord Users</button>
          <button onClick={() => setFilter("withoutEmail")} style={filterBtnStyle}>Claimed $100</button>
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
                <th style={headerStyle}>#</th>
                <th style={headerStyle}>Username</th>
                <th style={headerStyle}>Email</th>
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
                  <td style={cellStyle}>{user.email || "N/A"}</td>
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
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: "bold",
  color: "#000",
};

export default AdminPanel;
