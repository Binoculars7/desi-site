import React from "react";
import styles from "../style";
import backgroundImg from "./backgorund.png"; // Replace with your actual background image path

const Hero = () => {
  const heroStyle = {
    backgroundImage: `url(${backgroundImg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    minHeight: "400px", // Adjust as needed
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#ffffff", // Text color on top of the background image
    padding: "80px 20px", // Adjust padding as needed
    textAlign: "center", // Center text horizontally
  };

  const handleProofClick = () => {
    window.location.href = "/proof";
  };

  return (
    <section id="home" style={heroStyle}>
      <div
        className={`flex md:flex-row flex-col ${styles.paddingY} text-center`}
      >
        <div
          className={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-16 px-6`}
        >
          <div className="flex flex-col justify-center items-center w-full">
            <h2 className="text-[24px] font-semibold mb-4">WELCOME TO</h2>
            <h1 className="font-poppins font-semibold ss:text-[72px] text-[40px] ss:leading-[100.8px] leading-[75px]">
              Desi<span className="text-gradient">Gamblers</span>.
            </h1>
          </div>
          <p className={`${styles.paragraph} max-w-[470px] mt-5 mx-auto`}>
            Explore the realm of VIP Rewards from DesiGamblers!``
          </p>
          <p className={`${styles.paragraph} max-w-[5000px] mt-5 mx-auto`}>
            Compete in Leaderboards, try your luck in Exclusive Raffles, join
            Giveaways & more!
          </p>
          <button
            className="rounded-full mt-8 text-white py-2 px-6 mt-5 mx-auto transition-all duration-300 flex items-center justify-center group"
            style={{
              background: "linear-gradient(45deg, #ffffff, #d9d9d9)",
              color: "#000",
              overflow: "hidden",
              position: "relative",
            }}
            onMouseEnter={(e) => {
              e.target.style.background =
                "linear-gradient(45deg, #000439, #000A83)";
              e.target.style.color = "#fff";
            }}
            onMouseLeave={(e) => {
              e.target.style.background =
                "linear-gradient(45deg, #ffffff, #d9d9d9)";
              e.target.style.color = "#000";
            }}
            onClick={handleProofClick}
          >
            ARE WE LEGIT?
            <span
              className="ml-2 transition-transform duration-300 group-hover:translate-x-2"
              style={{
                display: "inline-block",
                transform: "translateX(0)",
              }}
            >
              →
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
