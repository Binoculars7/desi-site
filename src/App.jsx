import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  Billing,
  Business,
  CardDeal,
  Clients,
  Code,
  CTA,
  Footer,
  Hero,
  Navbar,
  Stats,
  Testimonials,
  Ytvideo,
} from "./components";
import Proof from "./components/Proof";
import DisclaimerModal from "./components/DisclaimerModal";

import styles from "./style";
import AdminPanel from "./components/AdminPanel";
import LeaderBoard from "./components/LeaderBoard";
import LeaderboardMonth from "./components/LeaderboardMonth";


import DiscordCallback from "./components/DiscordCallback"; 
import { Leaderboard } from "@mui/icons-material";




const App = () => {
  return (
    <Router>
      <DisclaimerModal /> {}
      <div className="bg-[#1b1e2c] w-full overflow-hidden">
        <div className={`${styles.paddingX} ${styles.flexCenter}`}>
          <div className={`${styles.boxWidth}`}>
            <Navbar />
          </div>
        </div>

        <Routes>



        <Route path="/auth/discord/callback" element={<DiscordCallback />} />

        <Route path="/leaderboard/:month" element={<LeaderboardMonth />} />


        <Route path="/adminonly" element={<AdminPanel />} />
        <Route path="/leaderboard" element={<LeaderBoard />} />


          <Route
            path="/"
            element={
              <>
                <div className={`bg-primary ${styles.flexStart}`}>
                  <div className={`${styles.boxWidth}`}>
                    <Hero />
                  </div>
                </div>
                <div
                  className={`bg-primary ${styles.paddingX} ${styles.flexStart}`}
                >
                  <div className={`${styles.boxWidth}`}>
                    <Stats />
                    <Code />
                    <Business />
                    <Billing />
                    <CardDeal />
                    <Testimonials />
                    <Ytvideo />
                    <CTA />
                  </div>
                </div>
                <div
                  className={`bg-[#1c1e30] ${styles.paddingX} ${styles.flexCenter}`}
                >
                  <div className={`${styles.boxWidth} ${styles.flexCenter}`}>
                    <Footer />
                  </div>
                </div>
              </>
            }
          />
          <Route
            path="/proof"
            element={
              <div className="w-[80vw] m-auto">
                <Proof />
                <Footer />
              </div>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
