import React, { useEffect, useState } from "react";
import { db } from "./firebase"; // Make sure this path is correct
import { collection, getDocs } from "firebase/firestore";

const AdminPanel = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersCollection = collection(db, "users");
        const usersSnapshot = await getDocs(usersCollection);
        const userList = usersSnapshot.docs.map(doc => ({
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
    <div style={{ padding: "2rem", background: "#f9f9f9", minHeight: "100vh" }}>
      <h2 style={{ marginBottom: "1rem" }}>Admin Panel - Discord Users</h2>
      {users.length > 0 ? (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ border: "1px solid #ccc", padding: "8px" }}>Username</th>
              <th style={{ border: "1px solid #ccc", padding: "8px" }}>Email</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>{user.username}</td>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No users found.</p>
      )}
    </div>
  );
};

export default AdminPanel;
