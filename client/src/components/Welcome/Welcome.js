import React, { useState, lazy, Suspense } from "react";
import "./Welcome.css";
import "./responsive.css";
import WelcomeR from "../Rider/WelcomeR";
const WelcomeAbout = lazy(() => import("./Welcome-About"));


const Home = () => {
  const [className, setClassName] = useState({
    classList: "container",
  });

  const openNavbar = () => {
    setClassName({ classList: "container change" });
  };
  const closeNavbar = () => {
    setClassName({ classList: "container" });
  };

  const colors = ["#6495ed", "#7fffd4", "#ffa07a", "#f08080", "#afeeee"];

  let i = 0;
  Array.from(document.querySelectorAll(".nav-link")).forEach((item) => {
    item.style.cssText = `background-color: ${colors[i++]}`;
  });
  Array.from(document.querySelectorAll(".navigation-button")).forEach(
    (item) => {
      item.onclick = () => {
        item.parentElement.parentElement.classList.toggle("change");
      };
    }
  );
  const renderLoader = () => <p>Loading</p>;
  return (
    <div className={className.classList}>
      {/* <!-- Navbar --> */}
      <div className="open-navbar-icon navbar-icon center" onClick={openNavbar}>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>
      <div className="navbar-wrapper">
        <nav className="navbar">
          <div
            className="close-navbar-icon navbar-icon center"
            onClick={closeNavbar}
          >
            <div className="line line-1"></div>
            <div className="line line-2"></div>
          </div>
          <div className="nav-list">
            <a href="#home" className="nav-link center" onClick={closeNavbar}>
              Home
            </a>
            <a href="#rider" className="nav-link center" onClick={closeNavbar}>
              Rider
            </a>
            <a
              href="/cabshare/driver"
              className="nav-link center"
              onClick={closeNavbar}
            >
              Driver
            </a>
            <a href="#about" className="nav-link center" onClick={closeNavbar}>
              About Us
            </a>
            <a
              href="#contact"
              className="nav-link center "
              onClick={closeNavbar}
            >
              Contact
            </a>
          </div>
        </nav>
      </div>
      {/* <!-- End of Navbar --> */}
      <section className="header" id="home">
        <div className="header-content">
          <h1 className="header-heading">Welcome Folks,</h1>
          <p className="header-paragraph">
            "TRAVELING - IT LEAVES YOU SPEECHLESS, THEN TURNS YOU INTO A
            STORYTELLER"
          </p>
        </div>

        <div className="logo ">
          <span>c</span>
          <span>a</span>
          <span>b</span>
          <span>S</span>
          <span>h</span>
          <span>a</span>
          <span>r</span>
          <span>e</span>
        </div>
        <video className="video-container" autoPlay loop muted>
          <source className="bg-video " src='https://media.istockphoto.com/videos/hailing-a-cab-to-get-to-work-video-id1048250512' type="video/mp4" />
        </video>
      </section>
      <section className="Content" id="rider">
        <WelcomeR />
      </section>
      <Suspense fallback={renderLoader()}>
        {/* About */}
        <WelcomeAbout />
        {/* About */}

        {/* About */}
        {/* Contact -Us */}


        {/* Contact-Us */}
      </Suspense>
      {/* <!-- Footer --> */}

      <footer className="footer">
        <div className="footer-list">
          <a href="#home" className="footer-link">
            Home
          </a>
          <a href="#rider" className="footer-link">
            Rider
          </a>
          <a href="/cabshare/driver" className="footer-link">
            Driver{" "}
          </a>
          <a href="#about" className="footer-link">
            About Us
          </a>
          <a href="#contact" className="footer-link">
            Contact
          </a>
        </div>
        <p className="footer-paragraph">
          Copyright &copy; NitDurgapur All Rights Reserved
        </p>
      </footer>
      {/* <!-- End of Footer --> */}
    </div>
  );
};
export default Home;
