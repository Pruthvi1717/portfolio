import { useState } from "react";
import Skillcard from "./Skillcard";
import { skillCategories } from "./SkillsData";
import "./SkillPage.css";

const SkillPage = () => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState("right");

  const nextSlide = () => {
    setDirection("right");
    if (index < skillCategories.length - 1) {
      setIndex(index + 1);
    }
  };

  const prevSlide = () => {
    setDirection("left");
    if (index > 0) {
      setIndex(index - 1);
    }
  };

  const current = skillCategories[index];

  return (
    <section className="skillpage">
      {/* ===== TOP HEADER ===== */}
      <div className="skill-header">
        <span className="section-tag">Skills & Expertise</span>
        <h1>What I Do?</h1>
        <p>
          I am pursuing B.Tech at K J Somaiya Institute Of Technology and
          specialize in Web Development, Machine Learning, and Data Structures.
        </p>
      </div>

      {/* ===== SKILL CARD AREA ===== */}
      <div className="skill-content">
        <button
          className="nav-btn"
          onClick={prevSlide}
          disabled={index === 0}
        >
          ❮
        </button>

        <div className="skill-slider">
          <div className="slider-meta">
            
            <span className="category-index">
              {index + 1} / {skillCategories.length}
            </span>
          </div>

          <div className={`skillcard-wrapper ${direction}`}>
            <Skillcard
              key={index}
              skills={current.skills}
              title={current.title}
            />
          </div>

          <div className="slider-dots">
            {skillCategories.map((_, i) => (
              <span
                key={i}
                className={`dot ${i === index ? "active" : ""}`}
                onClick={() => setIndex(i)}
              />
            ))}
          </div>
        </div>

        <button
          className="nav-btn"
          onClick={nextSlide}
          disabled={index === skillCategories.length - 1}
        >
          ❯
        </button>
      </div>
    </section>
  );
};

export default SkillPage;
