import React from "react";
import styles from "../style";

const Proof = () => {
  const videoUrls = [
    "https://api.desigamblers.top/cdn/VID_20240721_154212_275.mp4",
    "https://api.desigamblers.top/cdn/VID_20240721_154243_566.mp4",
    "https://api.desigamblers.top/cdn/VID_20240721_154258_539.mp4",
    "https://api.desigamblers.top/cdn/VID_20240721_154315_269.mp4",
    "https://api.desigamblers.top/cdn/VID_20240721_144310_751.mp4",
    "https://api.desigamblers.top/cdn/video-output-D4C06822-94DE-47F0-8ADF-404E12E16F33-1.mp4",
    "https://api.desigamblers.top/cdn/WhatsApp Video 2024-06-28 at 5.29.05 PM.mp4",
    "https://api.desigamblers.top/cdn/VID_21281110_170827_982.mp4",
  ];

  return (
    <section
      id="proof"
      className="relative overflow-hidden flex justify-center"
    >
      <div className='absolute inset-0 -z-10 bg-cover bg-center bg-no-repeat filter blur-[8px] bg-[url("https://wallpapers.com/images/hd/dark-laptop-abstract-smoke-background-41z3e057yvjcei8n.jpg")]' />
      <div className={`${styles.boxWidth} relative -z-5`}>
        <h1 className="font-poppins font-semibold ss:text-[72px] text-[52px] ss:leading-[100.8px] leading-[75px] mx-auto text-center">
          <span className="text-gradient">Proof</span>.
        </h1>
        
        <p
          className={`${styles.paragraph} max-w-[470px] mt-5 mx-auto z-50 text-center`}
        >
          Here you can see all the proofs of our activities and achievements.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          {videoUrls.map((url, index) => (
            <div key={index} className="w-full flex justify-center">
              <video className="w-48 h-auto" controls>
                <source src={url} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Proof;
