import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import YouTubeIcon from "@mui/icons-material/YouTube";

const YouTubeHighlights = () => {
  const [videos, setVideos] = useState([]);

  // Fetch YouTube feed
  useEffect(() => {
    const fetchFeed = async () => {
      try {
        const response = await fetch(
          "https://api.allorigins.win/get?url=" +
            encodeURIComponent(
              "https://www.youtube.com/feeds/videos.xml?channel_id=UCoBBSpHInTMvD1OramqGu5g",
            ),
        );
        const data = await response.json();
        const parser = new DOMParser();
        const xml = parser.parseFromString(data.contents, "application/xml");

        const entries = xml.getElementsByTagName("entry");

        const videoList = Array.from(entries).map((entry) => {
          const title = entry.getElementsByTagName("title")[0].textContent;
          const videoId =
            entry.getElementsByTagName("yt:videoId")[0].textContent;
          const link = `https://www.youtube.com/watch?v=${videoId}`;
          const thumbnail = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;

          return { title, link, thumbnail };
        });

        setVideos(videoList);
      } catch (error) {
        console.error("Failed to fetch YouTube feed:", error);
      }
    };

    fetchFeed();
  }, []);

  // Slick carousel settings
  const settings = {
    dots: false,
    infinite: videos.length > 2, // Infinite loop only if more than 2 videos
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
  };

  return (
    <section className="flex flex-col items-center mb-6 sm:mb-20">
      <h2 className="font-poppins font-semibold text-center text-[30px] xs:text-[40px] leading-[43px] xs:leading-[53px]">
        <span style={{ color: "red" }}>
          <YouTubeIcon style={{ fontSize: 40 }} /> YouTube
        </span>
        <span style={{ color: "white" }}> Highlights</span>
      </h2>
      <div className="w-[70vw] md;xl:w-[80vw] md:sl:w-full mt-6">
        <Slider {...settings}>
          {videos.length < 3
            ? [...videos, ...videos, ...videos].map((video, index) => (
                <div key={index} className="px-2 video-slide">
                  <a
                    href={video.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-auto h-auto object-cover"
                    />
                  </a>
                </div>
              ))
            : videos.map((video, index) => (
                <div key={index} className="px-2 video-slide">
                  <a
                    href={video.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-auto h-auto object-cover"
                    />
                  </a>
                </div>
              ))}
        </Slider>
      </div>
      <button
        className="mt-8 px-6 py-3 rounded-full font-poppins font-semibold text-white uppercase"
        style={{
          backgroundImage: "linear-gradient(317deg, #59090C 4.52%, #DA898C)",
        }}
        onClick={() =>
          window.open("https://www.youtube.com/@thedesigambler", "_blank")
        }
      >
        <ArrowRightIcon style={{ fontSize: 50 }} /> Watch More
      </button>
    </section>
  );
};

export default YouTubeHighlights;
