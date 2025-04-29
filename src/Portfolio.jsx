import React, { useEffect } from 'react';

// CSS imports
import './assets/css/bootstrap.min.css';
import './assets/css/owl.carousel.min.css';
import './assets/css/owl.theme.default.min.css';
import './assets/css/unicons.css';
import './assets/css/tooplate-style.css';
import './assets/css/revamp.css';

import ProjectsSection from './components/projectSection';

const Home = () => {
  useEffect(() => {
    const progresses = document.querySelectorAll('.skill-progress');
    progresses.forEach(progress => {
      const width = progress.style.width;
      progress.style.width = '0';
      setTimeout(() => {
        progress.style.width = width;
      }, 200);
    });
  }, []);

  return (
    <>
      {/* TITLE BAR/ MENU BAR */}
      <nav className="navbar navbar-expand-sm navbar-light">
        <div className="container">
          <a className="navbar-brand" href="index.html">
            <i className="uil uil-user"></i> Mobile Developer
          </a>
          <div className="collapse navbar-collapse" id="navbarNav"></div>
        </div>
      </nav>

      <br />

      {/* About Section */}
      <div className="about-more">
        <div className="about-more-container">
          <div className="about-more-content">
            <h1 className="about-more-title">I'm Shotayo Bolu</h1>
            <h2 className="about-more-subtitle">
              A mobile developer <a href="#" style={{ color: 'grey', fontSize: '18px' }}>Hire me</a>
            </h2>
            <p className="about-more-text">
              With 14 years of experience in digital, I’ve shaped my work across borders and disciplines – from filmmaking to product design. I’ve collaborated with French brands L’Oréal Pro and RATP on UX research.
              <br /><br />
              Being neurodivergent, I see the world a bit differently, which sometimes helps me spot gaps and turn them into opportunities. I like to look beyond the immediate solutions, anticipate long-term impacts and design accessible experiences.
            </p>
            <a href="#project_list" className="about-more-button custom-btn-link">See Projects →</a>
          </div>

          <div className="about-more-image">
            <img src="images/profile.jpg" alt="Profile" />
          </div>
        </div>
      </div>

      {/* Skill Section */}
      <section className="project py-5" id="project">
        <div className="skill-rating">
          <div className="skill-rating-container">
            <div className="skill-column">
              <div className="skill-item">
                <div className="skill-bar">
                  <div className="skill-progress" style={{ width: '100%' }}>
                    <span className="skill-percent"></span>
                  </div>
                </div>
                <h3 className="skill-title">Flutter Development</h3>
              </div>

              <div className="skill-item">
                <div className="skill-bar">
                  <div className="skill-progress" style={{ width: '100%' }}>
                    <span className="skill-percent"></span>
                  </div>
                </div>
                <h3 className="skill-title">Mobile App Design</h3>
              </div>
            </div>

            <div className="skill-column">
              <div className="skill-item">
                <div className="skill-bar">
                  <div className="skill-progress" style={{ width: '100%' }}>
                    <span className="skill-percent"></span>
                  </div>
                </div>
                <h3 className="skill-title">Web Development</h3>
              </div>

              <div className="skill-item">
                <div className="skill-bar">
                  <div className="skill-progress" style={{ width: '100%' }}>
                    <span className="skill-percent"></span>
                  </div>
                </div>
                <h3 className="skill-title">UI/UX Skills</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About me again */}
      <div className="about-mee">
        <div className="about-container">
          <div className="about-content">
            <h1 className="about-title">Mobile Development | Flutter </h1>
            <p className="about-subtitle"></p>

            <div className="about-info">
              <div className="info-item">
                <h3>Currently</h3>
                <p>Product designer at MAIF</p>
              </div>
              <div className="info-item">
                <h3>Latest work</h3>
                <p><a href="#">Accessibility: play your cards right</a></p>
              </div>
              <div className="info-item">
                <h3>Location</h3>
                <p>Tours, France</p>
              </div>
            </div>

            <a href="#about" className="about-buttons">Download Resume →</a>
          </div>

          <div className="about-image">
            <img src="images/profile.jpg" alt="Profile" />
          </div>
        </div>
      </div>
    
      <div className="col-lg-11 text-center mx-auto col-12">
        <div className="col-lg-8 mx-auto" style={{ marginTop: '4em' }}>
          <h2>Projects</h2><br />
        </div>
      </div>


 {/* Project Section */}
      <ProjectsSection />

<br></br>

      {/* FOOTER */}
      <footer className="footer py-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-12">
              <p className="copyright-text text-center">
                Created by <a rel="nofollow" href="https://www.x.com/binocularsXD">Binoculars</a> &copy; 2025.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};


export default Home;