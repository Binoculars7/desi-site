import React, { useState, useEffect } from "react";
import {
  List,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Typography,
  Paper,
  Box,
  CircularProgress,
  Button,
} from "@mui/material";
import { styled } from "@mui/system";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import axios from "axios";
import logo from "../assets/logo.png"; // Ensure the correct path to the logo file

const StyledList = styled(List)({
  borderColor: "transparent",
});

const StyledBox = styled(Box)(({ theme }) => ({
  borderRadius: "25px",
  padding: "10px 0",
  marginBottom: "10px",
  border: "10px solid",
  borderColor: "transparent",
  display: "grid",
  gridTemplateColumns: "50px 1fr 1fr 1fr",
  gap: "10px",
  alignItems: "center",
  marginLeft: "-20px",
  [theme.breakpoints.down("sm")]: {
    gap: "3px",
  },
  transition: "transform 0.3s, box-shadow 0.3s",
  "&:hover": {
    transform: "scale(1.02)",
    boxShadow: `0 4px 8px rgba(0, 0, 0, 0.3)`,
    filter: "brightness(1.2)",
  },
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: 40,
  height: 40,
  [theme.breakpoints.down("sm")]: {
    width: 30,
    height: 30,
  },
}));

const ColumnHeaders = styled(Box)({
  display: "grid",
  gridTemplateColumns: "40px 1fr 1fr 1fr",
  gap: "10px",
  padding: "10px 0",
  borderBottom: "1px solid rgba(51, 51, 51, 0.8)",
  marginBottom: "10px",
});

const GradientText = styled(Typography)({
  background: "linear-gradient(135deg, #6e8efb 0%, #a777e3 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  textTransform: "uppercase",
});

const getLoaderColor = (rank) => {
  switch (rank) {
    case 1:
      return "#fdd835"; // Gold
    case 2:
      return "#616161"; // Silver
    case 3:
      return "#8d6e63"; // Bronze
    default:
      return "white";
  }
};

const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboardData = async () => {
      try {
        const response = await axios.get(
          "https://api.desigamblers.top/api/leaderboard",
        );
        setLeaderboardData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching leaderboard data:", error);
        setLoading(false);
      }
    };

    fetchLeaderboardData();
  }, []);

  const handleToggleClick = () => {
    setShowAll((prevShowAll) => !prevShowAll);
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Paper
      id="leaderboard"
      style={{
        backgroundColor: "transparent",
        padding: {
          xs: "0px", // Mobile screens (extra small)
          sm: "0px", // Small screens
          md: "10px", // Medium screens and up
          xl: "20px",
        },
        borderRadius: "10px",
        maxWidth: "1200px",
        margin: "0 auto",
      }}
    >
      <GradientText
        variant="h5"
        style={{ textAlign: "center", marginBottom: "20px" }}
      >
        Wager Leaderboard
      </GradientText>
      <ColumnHeaders>
        <Box display="flex" alignItems="center" gap="4px">
          <EmojiEventsIcon
            style={{
              color: "white",
              marginRight: {
                xs: "3px", // Mobile screens (extra small)
                sm: "3px", // Small screens
                md: "6px", // Medium screens and up
                xl: "9px",
              },
            }}
          />
          <Typography
            variant="body1"
            style={{ color: "white", textAlign: "center" }}
          >
            Rank
          </Typography>
        </Box>
        <Typography
          variant="body1"
          style={{ color: "white", textAlign: "center" }}
        >
          User
        </Typography>
        <Typography
          variant="body1"
          style={{ color: "white", textAlign: "center" }}
        >
          Wagered
        </Typography>
        <Typography
          variant="body1"
          style={{ color: "white", textAlign: "center" }}
        >
          Prize
        </Typography>
      </ColumnHeaders>
      <StyledList>
        {leaderboardData
          .slice(0, showAll ? leaderboardData.length : 3)
          .map((winner, index) => (
            <StyledBox key={index} id="boadStyle">
              <Box
                position="relative"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <CircularProgress
                  style={{ color: getLoaderColor(winner.rank) }}
                  disableShrink
                />
                <Box position="absolute">
                  <Typography
                    variant="body1"
                    style={{
                      color: "white",
                      textAlign: "center",
                      fontSize: "1.25rem", // Default size
                      "@media (max-width: 600px)": {
                        // Mobile screens
                        fontSize: "1rem",
                      },
                      "@media (max-width: 400px)": {
                        // Extra small screens
                        fontSize: "0.75rem",
                      },
                    }}
                  >
                    {winner.rank}
                  </Typography>
                </Box>
              </Box>
              <Box
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <ListItemAvatar style={{ minWidth: "40px" }}>
                  <StyledAvatar alt={winner.name} src={logo} />
                </ListItemAvatar>
                <ListItemText
                  primary={winner.name}
                  style={{
                    color: "white",
                    textAlign: "center",
                    fontSize: {
                      xs: "0.75rem", // Mobile screens (extra small)
                      sm: "0.75rem", // Small screens
                      md: "1.25rem", // Medium screens and up
                      xl: "1.5rem",
                    },
                  }}
                />
              </Box>
              <Typography
                variant="body1"
                style={{
                  color: "white",
                  textAlign: "center",
                  fontSize: {
                    xs: "0.75rem", // Mobile screens (extra small)
                    sm: "0.75rem", // Small screens
                    md: "1.25rem", // Medium screens and up
                  },
                }}
              >
                ${winner.wagered}
              </Typography>
              <Typography
                variant="body1"
                style={{
                  color: "white",
                  textAlign: "center",
                  fontSize: {
                    xs: "0.75rem", // Mobile screens (extra small)
                    sm: "0.75rem", // Small screens
                    md: "1.25rem", // Medium screens and up
                  },
                }}
              >
                ${winner.prize}
              </Typography>
            </StyledBox>
          ))}
      </StyledList>
      <Box display="flex" justifyContent="center" mt={2}>
        <Button variant="outlined" onClick={handleToggleClick}>
          {showAll ? "SHOW LESS" : "SHOW MORE"}
        </Button>
      </Box>
    </Paper>
  );
};

export default Leaderboard;
