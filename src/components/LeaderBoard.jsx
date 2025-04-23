import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";

const LeaderboardCard = ({ month, prize, onView }) => (
  <div style={styles.card}>
    <div style={styles.cardHeader}>LEADERBOARD</div>
    <div style={styles.prizeSection}>
      <div style={styles.prizeLabel}>PRIZE POOL</div>
      <div style={styles.prizeAmount}>₹{prize.toLocaleString()}</div>
      <div style={styles.monthBubble}>{month}</div>
    </div>
    <button style={styles.viewButton} onClick={onView}>
      View Leaderboard
    </button>
  </div>
);

const Dashboard = () => {
  const [monthlyData, setMonthlyData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLeaderboardData = async () => {
      const querySnapshot = await getDocs(collection(db, "leaderboards"));
      const monthlyMap = {};

      querySnapshot.forEach((doc) => {
        const { month, prize } = doc.data(); // month = "03-2025" or "3-2025"
        if (!month || !prize) return;

        const [rawMonth, rawYear] = month.split("-");
        const mm = rawMonth.padStart(2, "0"); // Ensure month is 2 digits
        const key = `${mm}`;

        if (!monthlyMap[key]) {
          monthlyMap[key] = 0;
        }
        monthlyMap[key] += prize;
      });

      const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ];

      const data = Object.entries(monthlyMap).map(([monthKey, totalPrize]) => {
        const [mm, yyyy] = monthKey.split("-");
        const monthIndex = parseInt(mm, 10) - 1;
        const formattedMonth = `${monthNames[monthIndex]}`;
        return {
          monthKey, // For navigation
          month: formattedMonth, // For display
          prize: totalPrize,
        };
      });

      setMonthlyData(data);
    };

    fetchLeaderboardData();
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.logoArea}>
          <span style={styles.logo}>🎮 Desi Gambles</span>
          <span style={styles.x}>x</span>
          <span style={styles.partner}>Stake</span>
        </div>
        <h1 style={styles.title}>LEADERBOARD</h1>
        <button style={styles.howItWorks}>How it works</button>
      </div>

      <div style={styles.section}>
        <h2 style={styles.subTitle}>LEADERBOARD</h2>
        <h3 style={styles.history}>HISTORY</h3>
        <div style={styles.cardsContainer}>
          {monthlyData.map((entry) => (
            <LeaderboardCard
              key={entry.monthKey}
              month={entry.month}
              prize={entry.prize}
              onView={() => navigate(`/leaderboard/${entry.monthKey}`)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: "#0B0D16",
    color: "#fff",
    minHeight: "100vh",
    fontFamily: "'Orbitron', sans-serif",
    padding: "2rem",
  },
  header: {
    textAlign: "center",
    marginBottom: "3rem",
  },
  logoArea: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "22px",
    fontWeight: "bold",
    gap: "10px",
    marginBottom: "10px",
  },
  logo: {
    color: "#FFD700",
  },
  x: {
    color: "#aaa",
  },
  partner: {
    fontSize: "26px",
    fontStyle: "italic",
  },
  title: {
    fontSize: "36px",
    letterSpacing: "1px",
  },
  howItWorks: {
    backgroundColor: "#FFD700",
    color: "#000",
    fontWeight: "bold",
    fontSize: "16px",
    border: "none",
    borderRadius: "25px",
    padding: "10px 24px",
    cursor: "pointer",
    marginTop: "10px",
    transition: "transform 0.2s",
  },
  section: {
    textAlign: "center",
  },
  subTitle: {
    fontSize: "28px",
    marginBottom: "0.5rem",
  },
  history: {
    fontSize: "22px",
    color: "#aaa",
    marginBottom: "2rem",
  },
  cardsContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "2rem",
    flexWrap: "wrap",
  },
  card: {
    background: "linear-gradient(145deg, #121520, #0a0b11)",
    border: "1px solid #1c1f2b",
    borderRadius: "15px",
    padding: "2rem",
    width: "280px",
    boxShadow: "0 0 7px rgba(0, 255, 255, 0.2)",
    transition: "transform 0.3s",
  },
  cardHeader: {
    fontSize: "14px",
    color: "#ccc",
    textTransform: "uppercase",
    marginBottom: "1rem",
  },
  prizeSection: {
    padding: "1rem 0",
  },
  prizeLabel: {
    fontSize: "12px",
    color: "#bbb",
    textTransform: "uppercase",
    marginBottom: "0.5rem",
  },
  prizeAmount: {
    fontSize: "28px",
    fontWeight: "bold",
    color: "#fff",
    marginBottom: "0.8rem",
  },
  monthBubble: {
    padding: "8px 14px",
    backgroundColor: "#111824",
    color: "#ccc",
    borderRadius: "20px",
    display: "inline-block",
    fontSize: "14px",
  },
  viewButton: {
    marginTop: "1.5rem",
    padding: "10px 20px",
    borderRadius: "10px",
    backgroundColor: "#12192F",
    color: "#00f2fe",
    fontWeight: "bold",
    cursor: "pointer",
    border: "1px solid #00f2fe",
    transition: "all 0.3s",
  },
};

export default Dashboard;
