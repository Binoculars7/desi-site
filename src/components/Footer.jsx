import React from "react";
import styles from "../style";
import { logo, gambleaware } from "../assets";

const Footer = () => {
  return (
    <section
      className={`flex justify-center items-center sm:py-16 py-6 flex-col`}
    >
      <div className={`flex items-center justify-center gap-4 xl:${styles.flexStart} md:flex-row flex-col mb-8 w-full`}>
        <div className="flex-1 flex flex-col justify-center md:justify-between xl:justify-start mr-10">
          <div className="flex f-d f-b xl:justify-between sm:md:xl:flex-row uppercase gap-8">
            <img
              src={logo}
              alt="logo"
              className="w-[100px] h-[100px] object-contain"
            />
            <div className="flex justify-between md:justify-between xl:justify-start gap-2 md:gap-12 xl:gap-24  my-6 md:xl:my-0">
              <div className="flex flex-col items-start justify-start gap-2 text-white">
                <p className="font-bold">Main</p>
                <a href="#home" className="font-bold">
                  Home
                </a>
                <a href="/raffles" className="text-gray-400 ">
                  raffles
                </a>
                <a href="#leaderboard" className="text-gray-400">
                  Leaderboard
                </a>
              </div>
              
              <div className="flex flex-col items-start justify-start gap-2 text-white ml-16 md:ml-8 xl:ml-0">
                <p className="font-bold">Info</p>
                <a href="/tos" className="text-gray-400 ">
                  Terms of service
                </a>
                <a href="/pp" className="text-gray-400">
                  Privacy Policy
                </a>
              </div>
            </div>    
            
            
            <div className="w-[80vw] f-s xl:w-28 flex flex-wrap items-center md:xl:items-start justify-between gap-4">
              <a
                href="https://discord.gg/desigamblers"
                className="flex w-12 h-8 px-4 py-2 justify-center items-center rounded-[82px] text-white/50 bg-[#FFFFFF08] transition-all duration-200 ease-linear hover:bg-[#9dedf0] hover:text-gray-900 "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={16}
                  height={16}
                  fill="currentColor"
                  viewBox="0 0 16 12"
                >
                  <g filter="url(#discord_svg__a)">
                    <path d="M14.045 2.995a13.385 13.385 0 0 0-3.257-.994.05.05 0 0 0-.052.024 8.917 8.917 0 0 0-.406.82 12.387 12.387 0 0 0-3.658 0 8.072 8.072 0 0 0-.412-.82.05.05 0 0 0-.052-.024c-1.125.19-2.22.525-3.257.994a.04.04 0 0 0-.02.018C.855 6.063.286 9.037.565 11.973c.001.015.01.028.021.037a13.36 13.36 0 0 0 3.995 1.988.05.05 0 0 0 .056-.019c.308-.413.582-.85.818-1.308a.049.049 0 0 0-.028-.069 8.935 8.935 0 0 1-1.248-.585.048.048 0 0 1-.02-.065.05.05 0 0 1 .015-.019c.084-.062.168-.127.248-.191a.05.05 0 0 1 .051-.007c2.62 1.177 5.454 1.177 8.041 0a.053.053 0 0 1 .053.007c.08.064.164.13.248.191a.05.05 0 0 1-.004.084 8.316 8.316 0 0 1-1.249.585.051.051 0 0 0-.018.011.048.048 0 0 0-.015.039.05.05 0 0 0 .006.02c.24.457.515.894.817 1.307a.05.05 0 0 0 .056.019 13.319 13.319 0 0 0 4.001-1.988.048.048 0 0 0 .021-.036c.334-3.396-.559-6.346-2.366-8.96a.033.033 0 0 0-.02-.019Zm-8.198 7.19c-.789 0-1.438-.712-1.438-1.586 0-.875.637-1.587 1.438-1.587.807 0 1.45.718 1.438 1.587 0 .874-.637 1.586-1.438 1.586Zm5.316 0c-.788 0-1.438-.712-1.438-1.586 0-.875.637-1.587 1.438-1.587.807 0 1.451.718 1.438 1.587 0 .874-.631 1.586-1.438 1.586Z" />
                  </g>
                  <defs>
                    <filter
                      id="discord_svg__a"
                      width={16}
                      height={16}
                      x="0.5"
                      y={2}
                      colorInterpolationFilters="sRGB"
                      filterUnits="userSpaceOnUse"
                    >
                      <feFlood floodOpacity={0} result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        result="hardAlpha"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                      />
                      <feOffset dy={1} />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0" />
                      <feBlend
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_159_326"
                      />
                      <feBlend
                        in="SourceGraphic"
                        in2="effect1_dropShadow_159_326"
                        result="shape"
                      />
                    </filter>
                  </defs>
                </svg>
              </a>
              <a
                href="https://www.youtube.com/@thedesigambler"
                className="flex w-12 h-8 px-4 py-2 justify-center items-center rounded-[82px] text-white/50 bg-[#FFFFFF08] transition-all duration-200 ease-linear hover:bg-[#9dedf0]  hover:text-gray-900 "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={16}
                  height={16}
                  fill="currentColor"
                >
                  <path d="M12.082 2.667H3.507c-1.682 0-3.046 1.49-3.046 3.326v4.681C.46 12.511 1.825 14 3.507 14h8.575c1.682 0 3.046-1.489 3.046-3.326v-4.68c0-1.838-1.364-3.327-3.046-3.327Zm-2.06 5.894-4.011 2.09c-.107.055-.23-.03-.23-.16V6.184c0-.13.126-.216.233-.156l4.011 2.219c.12.066.117.253-.004.315Z" />
                </svg>
              </a>
              <a
                href="https://t.me/desigamblerstg"
                className="flex w-12 h-8 px-4 py-2 justify-center items-center rounded-[82px] text-white/50 bg-[#FFFFFF08] transition-all duration-200 ease-linear hover:bg-[#9dedf0] hover:text-gray-900 "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={16}
                  height={16}
                  fill="currentColor"
                >
                  <path d="M14.824 4.287a5.744 5.744 0 0 1-1.632.463 2.903 2.903 0 0 0 1.246-1.623 5.542 5.542 0 0 1-1.796.711 2.793 2.793 0 0 0-2.07-.929c-1.568 0-2.83 1.32-2.83 2.937 0 .233.018.456.065.67-2.355-.12-4.44-1.29-5.84-3.072-.243.44-.387.943-.387 1.484a2.97 2.97 0 0 0 1.258 2.44 2.723 2.723 0 0 1-1.28-.361v.032c0 1.427.983 2.612 2.27 2.885-.23.065-.482.097-.742.097a2.42 2.42 0 0 1-.537-.05c.367 1.162 1.409 2.017 2.647 2.045a5.566 5.566 0 0 1-4.19 1.212 7.773 7.773 0 0 0 4.346 1.317c5.213 0 8.063-4.475 8.063-8.354 0-.13-.005-.256-.01-.38a5.767 5.767 0 0 0 1.419-1.524Z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/desi.gamblers/"
                className="flex w-12 h-8 px-4 py-2 justify-center items-center rounded-[82px] text-white/50 bg-[#FFFFFF08] transition-all duration-200 ease-linear hover:bg-[#9dedf0]  hover:text-gray-900 "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={16}
                  height={16}
                  fill="currentColor"
                >
                  <path d="M4.982 1.127h5.88c2.24 0 4.06 1.82 4.06 4.06v5.88a4.06 4.06 0 0 1-4.06 4.06h-5.88c-2.24 0-4.06-1.82-4.06-4.06v-5.88a4.06 4.06 0 0 1 4.06-4.06Zm-.14 1.4a2.52 2.52 0 0 0-2.52 2.52v6.16a2.518 2.518 0 0 0 2.52 2.52h6.16a2.52 2.52 0 0 0 2.52-2.52v-6.16a2.518 2.518 0 0 0-2.52-2.52h-6.16Zm6.755 1.05a.875.875 0 1 1 0 1.75.875.875 0 0 1 0-1.75Zm-3.675 1.05a3.5 3.5 0 1 1 0 7 3.5 3.5 0 0 1 0-7Zm0 1.4a2.1 2.1 0 1 0 0 4.2 2.1 2.1 0 0 0 0-4.2Z" />
                </svg>
              </a>
            </div>
          </div>

          <div className="flex flex-row items-center mt-4">
            <img
              src={gambleaware}
              alt="gambleaware"
              className="w-[133px] h-[82px] object-contain"
            />
          </div>
        </div>
      </div>

      <div className="w-full flex flex-col md:flex-row md:justify-between mb-8 text-white">
        <div className="flex-1 mb-4 md:mb-0 md:mr-4">
          <h3 className="text-base mb-2 font-bold roboto-bold">
            HOW DO I JOIN THE LEADERBOARD?
          </h3>
          <p className="text-sm leading-[130%] text-gray-300 mt-2 md:xl:mt-4">
            To participate in our monthly wager leaderboard all you have to do
            is sign up for an account on stake under the promo code "desi2023".
            To do that you can either click here or head over to stake yourself
            and use the code upon signup. Once you have an account all your
            wagers will automatically be counted towards the monthly
            leaderboard!
          </p>
        </div>
        <div className="flex-1 mb-4 md:mb-0 md:mr-4">
          <h3 className="text-base mb-2 font-bold roboto-bold">
            WHAT IF I'M NOT A TOP WAGER?
          </h3>
          <p className="text-sm leading-[130%] text-gray-300 mt-2 md:xl:mt-4">
            If you're not a top wager, don't worry! You still have the chance to
            earn rewards from our code. Right now we are giving away a total of
            $1,000 randomly to code desi2023 users who wager over $1,000 each
            month.
          </p>
        </div>
        <div className="flex-1">
          <h3 className="text-base mb-2 font-bold roboto-bold">
            HOW WILL I CLAIM MY REWARDS?
          </h3>
          <p className="text-sm leading-[130%] text-gray-300 mt-2 md:xl:mt-4">
            If you are a top five player on the leaderboard we ask that you join
            our discord server to claim your prize. However,
            if you are unable to do this your prize will be sent to your account
            10 days after the leaderboard is concluded. If you are not a top
            five wager you will receive your prize directly to your stake
            account each month after the leaderboard ends.
          </p>
        </div>
      </div>

      <div className="w-full flex flex-col items-center border-t-[1px] border-t-[#3F3E45] pt-6">
        {/* Warning message */}
        <p
          className={`${styles.paragraph} mt-2 w-auto text-left border p-2 text-xs rounded-lg flex items-center bg-gray`}
        >
          <img
            width="20"
            height="20"
            src="https://img.icons8.com/ios/50/FA5252/18-plus.png"
            alt="18-plus"
            className="mr-2"
          />
          We do not assume responsibility for any outcomes from gambling at
          casinos and betting sites linked or promoted on our website(s). As a
          player, you are accountable for your own bets.
        </p>

        <h1 className="text-transparent">‎</h1>

        <div className="w-full flex flex-col items-center mt-4 md:mt-0">
          <p className="font-poppins font-normal text-center text-[18px] leading-[27px] text-white">
            © 2024 Desigamblers. All Rights Reserved.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Footer;
