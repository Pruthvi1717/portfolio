import { useState } from "react";
import LandingPage from "./Components/LandingPage";
import LeftSide from "./Components/LeftSide";
import RightSide from "./Components/RightSide";
import SkillPage from "./Components/Skills/SkillPage";
import ProjectsMainPage from "./Components/Projects/ProjectsMainPage";
import EducationDashboard from "./Education/EducationDashboard";
import Certifications from "./Components/Certifications/Certifications";
import ChatbotWidget from "./Components/ChatbotWidget";
import CursorGlow from "./Components/CursorGlow";
import "./App.css";

const App = () => {
  const [activePage, setActivePage] = useState("home");

  return (
    <>
      <CursorGlow />
      <LandingPage setActivePage={setActivePage} />

      {activePage === "home" && (
        <section className="section home">
          <div className="landing">
            <LeftSide setActivePage={setActivePage} />
            <RightSide />
          </div>
        </section>
      )}

      {activePage === "skills" && (
        <section className="section">
          <SkillPage />
        </section>
      )}

      {activePage === "projects" && (
        <section className="section">
          <ProjectsMainPage />
        </section>
      )}

      {activePage === "education" && (
        <section className="section">
          <EducationDashboard />
        </section>
      )}

      {activePage === "certifications" && (
        <section className="section">
          <Certifications />
        </section>
      )}

      <ChatbotWidget />
    </>
  );
};

export default App;
