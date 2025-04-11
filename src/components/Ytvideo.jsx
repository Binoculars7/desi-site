import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from '../style';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import YouTubeIcon from '@mui/icons-material/YouTube';

const YouTubeHighlights = () => {
  const [videos, setVideos] = useState([]);
  const rssUrl = `https://api.rss2json.com/v1/api.json?rss_url=https://www.youtube.com/feeds/videos.xml?channel_id=UCoBBSpHInTMvD1OramqGu5g`;

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch(rssUrl);
        const data = await response.json();
        const items = data.items.slice(0, 10); // Get the latest 10 videos
        const videos = items.map(item => ({
          link: item.link,
          title: item.title,
          thumbnail: item.thumbnail
        }));
        setVideos(videos);
      } catch (error) {
        console.error('Error fetching videos: ', error);
      }
    };

    fetchVideos();
  }, [rssUrl]);

  const settings = {
    dots: false,
    infinite: true,
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
        <span style={{ color: 'red' }}>
          <YouTubeIcon style={{ fontSize: 40 }} /> YouTube
        </span> 
        <span style={{ color: 'white' }}> Highlights</span>
      </h2>
      <div className="w-[70vw] md;xl:w-[80vw] md:sl:w-full mt-6">
        <Slider {...settings}>
          {videos.map((video, index) => (
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
        style={{ backgroundImage: 'linear-gradient(317deg, #59090C 4.52%, #DA898C)' }}
        onClick={() => window.open('https://www.youtube.com/@thedesigambler', '_blank')}
      >
        <ArrowRightIcon style={{ fontSize: 50 }}/> Watch More
      </button>
    </section>

  );
};

export default YouTubeHighlights;
