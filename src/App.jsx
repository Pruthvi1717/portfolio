import { useState } from "react";
import LandingPage from "./Components/LandingPage";
import LeftSide from "./Components/LeftSide";
import RightSide from "./Components/RightSide";
import SkillPage from "./Components/Skills/SkillPage";
import ProjectsMainPage from "./Components/Projects/ProjectsMainPage";
import "./App.css";
import EducationDashboard from "./Education/EducationDashboard";

const App = () => {
  const [activePage, setActivePage] = useState("home");

  return (
    <>
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
    </>
  );
};

export default App;
