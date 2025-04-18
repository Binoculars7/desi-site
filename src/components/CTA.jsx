import React from "react";
import styles from "../style";
import {
  Youtube,
  Discord,
  stake,
  Telegram,
  instagram,
  twitter,
  Kick,
} from "../assets";

const CTA = () => {
  return (
    <section
      className={`${styles.flexCenter} ${styles.marginY} ${styles.padding} flex-col bg-black-gradient-2 rounded-[20px] box-shadow`}
    >
      <h2 className={`${styles.heading2} text-center`}>Join the Community!</h2>
      <div className="flex flex-col md:flex-row justify-center items-center mt-5 space-x-0 md:space-x-10 space-y-5 md:space-y-0">
        {/* Discord Section */}
        <div className="flex flex-col items-center">
          <a
            href="https://discord.gg/desigamblers"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={Discord}
              alt="Discord"
              className="w-[100px] h-[50px] object-contain"
            />
          </a>
          <button
            className="px-4 py-2 mt-2 rounded-full font-poppins font-semibold text-white uppercase"
            style={{
              backgroundImage: "linear-gradient(317deg, #5865F2, #404EED)",
            }}
            onClick={() =>
              window.open("https://discord.gg/desigamblers", "_blank")
            }
          >
            Join Discord
          </button>
        </div>

        {/* YouTube Section */}
        <div className="flex flex-col items-center">
          <a
            href="https://youtube.com/@thedesigambler"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={Youtube}
              alt="YouTube"
              className="w-[100px] h-[50px] object-contain"
            />
          </a>
          <button
            className="px-4 py-2 mt-2 rounded-full font-poppins font-semibold text-white uppercase"
            style={{
              backgroundImage: "linear-gradient(317deg, #FF0000, #282828)",
            }}
            onClick={() =>
              window.open("https://youtube.com/@thedesigambler", "_blank")
            }
          >
            Subscribe on YouTube
          </button>
        </div>

        {/* Stake Section */}
        <div className="flex flex-col items-center">
          <a
            href="https://stake.pet/?c=Desi"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={stake}
              alt="Stake"
              className="w-[100px] h-[50px] object-contain"
            />
          </a>
          <button
            className="px-4 py-2 mt-2 rounded-full font-poppins font-semibold text-white uppercase"
            style={{
              backgroundImage: "linear-gradient(317deg, #757575, #000000bf)",
            }}
            onClick={() => window.open("https://stake.pet/?c=Desi", "_blank")}
          >
            Visit Stake
          </button>
        </div>

        {/* Instagram Section */}
        <div className="flex flex-col items-center">
          <a
            href="https://www.instagram.com/desigamblerstv"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={instagram}
              alt="Instagram"
              className="w-[100px] h-[50px] object-contain"
            />
          </a>
          <button
            className="px-4 py-2 mt-2 rounded-full font-poppins font-semibold text-white uppercase"
            style={{
              backgroundImage:
                "linear-gradient(317deg, #f9ce34, #ee2a7b, #6228d7)",
            }}
            onClick={() =>
              window.open("https://www.instagram.com/desigamblerstv", "_blank")
            }
          >
            Follow Us
          </button>
        </div>

        {/* Telegram Section */}
        <div className="flex flex-col items-center">
          <a
            href="https://t.me/desigamblers"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={Telegram}
              alt="Telegram"
              className="w-[100px] h-[50px] object-contain"
            />
          </a>
          <button
            className="px-4 py-2 mt-2 rounded-full font-poppins font-semibold text-white uppercase"
            style={{
              backgroundImage:
                "linear-gradient(270deg, rgba(100, 181, 239, 0) 48.44%, #64b5ef 75.52%, rgba(100, 181, 239, 0) 100%)",
              animation: "linear 5s infinite",
              backgroundColor: "#1c93e3",
            }}
            onClick={() => window.open("https://t.me/desigamblers", "_blank")}
          >
            Join Channel
          </button>
        </div>

        {/* Kick Section */}
        <div className="flex flex-col items-center">
          <a
            href="https://kick.com/desigamblers"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={Kick}
              alt="Kick"
              className="w-[100px] h-[50px] object-contain"
            />
          </a>
          <button
            className="px-4 py-2 mt-2 rounded-full font-poppins font-semibold text-white uppercase"
            style={{
              backgroundImage:
                "linear-gradient(317deg, #6b9c3b, #0f7a21, #16965f, #004d4f, #000d22)",
            }}
            onClick={() =>
              window.open("https://kick.com/desigamblers", "_blank")
            }
          >
            Kick
          </button>
        </div>
      </div>
    </section>
  );
};

export default CTA;
