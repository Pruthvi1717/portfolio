import { LiaLinkedin } from "react-icons/lia";
import { FaInstagram, FaFacebook } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import Button from "@mui/material/Button";
import { useState } from "react";
import "./LandingPage.css";

const LandingPage = ({ setActivePage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavClick = (page) => {
    setActivePage(page);
    setIsMenuOpen(false);
  };

  return (
    <nav>
      <div className="logo" style={{ color: "white" }}>Pruthvi</div>

      <div className="right">
        <ul id="det">
          <li onClick={() => handleNavClick("home")}>Home</li>
          <li onClick={() => handleNavClick("skills")}>Skills</li>
          <li onClick={() => handleNavClick("projects")}>Projects</li>
          <li onClick={() => handleNavClick("certifications")}>Certificates</li>
        </ul>

        <div className="socialMedia">
          <ul>
            <li>
              <a href="https://www.linkedin.com/in/pruthviraj-ghatul/" target="_blank">
                <LiaLinkedin />
              </a>
            </li>
            <li><a href="https://www.instagram.com/pruthviraj_ghatul_17/" target="_blank" ><FaInstagram /></a></li>
            <li > <a href="https://github.com/Pruthvi1717" target="_blank"><FaGithub /></a></li>
            <li><a href="https://leetcode.com/u/pruthviraj1717/" target="_blank"><SiLeetcode /></a></li>
          </ul>
        </div>

        <Button variant="outlined">Connect</Button>

        <button
          type="button"
          className={`mobile-menu-toggle ${isMenuOpen ? "open" : ""}`}
          onClick={() => setIsMenuOpen((prev) => !prev)}
          aria-label="Toggle navigation"
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {isMenuOpen && (
        <div className="mobile-menu">
          <ul>
            <li onClick={() => handleNavClick("home")}>Home</li>
            <li onClick={() => handleNavClick("skills")}>Skills</li>
            <li onClick={() => handleNavClick("projects")}>Projects</li>
            <li onClick={() => handleNavClick("certifications")}>Certificates</li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default LandingPage;
