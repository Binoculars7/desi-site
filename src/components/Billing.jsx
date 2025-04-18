import React from "react";
import styles from "../style";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { stake } from "../assets";
import { logo, vip } from "../assets";

const Billing = () => {
  const handleJoinNowClick = () => {
    window.open("https://stake.pet/?c=Desi", "_blank");
  };

  const handleCodeClick = () => {
    navigator.clipboard.writeText("desi2023");
    alert("Code copied to clipboard: desi2023");
  };

  return (
    <section
      id="product"
      className="relative w-full"
      style={{
        backgroundImage: `url(${vip})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh", // Ensures the section takes the full viewport height
      }}
    >
      <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 flex items-center space-x-4 justify-center">
        <img
          src={logo}
          alt="logo"
          className="w-[133px] h-[82px] object-contain"
        />
        <h1 className="text-white text-4xl font-bold">x ‎ </h1>
        <img
          src={stake}
          alt="stake"
          className="w-[133px] h-[82px] object-contain"
        />
      </div>

      <div
        className="absolute inset-0 flex flex-col items-center justify-center"
        style={{ zIndex: 1 }}
      >
        <div className="text-center mt-16">
          {" "}
          {/* Add margin-top to push the text down */}
          <br></br>
          <span
            style={{
              backgroundImage:
                "linear-gradient(317deg, #b58a1b 4.52%, #e0c060 34.37%, #ffeeb2 50.47%, #ffe77c 65.63%, #ffca41 110.56%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontSize: "3rem",
              fontWeight: "bold",
              textTransform: "uppercase",
              display: "inline-block",
            }}
          >
            VIP
          </span>
          <span
            style={{
              color: "white",
              fontSize: "3rem",
              fontWeight: "bold",
              textTransform: "uppercase",
              display: "inline-block",
              marginLeft: "10px",
            }}
          >
            REWARDS
          </span>
          <p className={`${styles.paragraph} max-w-[500px] mt-5`}>
            Unlock VIP Rewards on Stake by supporting our code “
            <span
              style={{
                backgroundImage:
                  "linear-gradient(317deg, #b58a1b 4.52%, #e0c060 34.37%, #ffeeb2 50.47%, #ffe77c 65.63%, #ffca41 110.56%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              desi2023
            </span>
            ” and take part in our{" "}
            <span
              style={{
                backgroundImage:
                  "linear-gradient(317deg, #b58a1b 4.52%, #e0c060 34.37%, #ffeeb2 50.47%, #ffe77c 65.63%, #ffca41 110.56%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              $30,000
            </span>{" "}
            Leaderboard!
          </p>
        </div>
        <div className="flex mt-10 space-x-5">
          <button
            onClick={handleJoinNowClick}
            className="text-sm md:xl:text-xl"
            style={{
              backgroundImage:
                "linear-gradient(0deg, rgba(0, 0, 0, .32), rgba(0, 0, 0, .32)), linear-gradient(100deg, #ffc651 -73.62%, #956506 29.64%, #ffc641 98.48%, #775410 132.9%, #ffc850 270.58%), hsla(0, 0%, 100%, .05)",
              color: "white",
              padding: "10px 20px",
              borderRadius: "50px",
              fontWeight: "bold",
              cursor: "pointer",
              border: "none",
              textTransform: "uppercase",
            }}
          >
            JOIN NOW
          </button>
          <button
            onClick={handleCodeClick}
            className="text-sm md:xl:text-xl"
            style={{
              background: "transparent",
              color: "white",
              padding: "5px 10px",
              borderRadius: "50px",
              fontWeight: "bold",
              cursor: "pointer",
              border: "2px solid white",
              textTransform: "uppercase",
              display: "flex",
              alignItems: "center",
            }}
          >
            CODE: desi2023
            <ContentCopyIcon style={{ marginLeft: "8px" }} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Billing;
