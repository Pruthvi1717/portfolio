import { LiaLinkedin } from "react-icons/lia";
import { FaInstagram, FaFacebook } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import Button from "@mui/material/Button";
import "./LandingPage.css";

const LandingPage = ({ setActivePage }) => {
  return (
    <nav>
      <div className="logo" style={{ color: "white" }}>Pruthvi</div>

      <div className="right">
        <ul id="det">
          <li onClick={() => setActivePage("home")}>Home</li>
          <li onClick={() => setActivePage("skills")}>Skills</li>
          <li onClick={() => setActivePage("projects")}>Projects</li>
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
      </div>
    </nav>
  );
};

export default LandingPage;
