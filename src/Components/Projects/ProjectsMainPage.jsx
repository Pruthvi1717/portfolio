import { useState } from "react";
import projectData from "../Projects/data";
import ProjectCard from "./ProjectCard";
import "./ProjectsMainPage.css";

const ProjectsMainPage = () => {
  const [index, setIndex] = useState(0);

  const cardsPerSlide = 3;
  const maxIndex = Math.ceil(projectData.length / cardsPerSlide) - 1;

  const nextSlide = () => {
    if (index < maxIndex) setIndex(index + 1);
  };

  const prevSlide = () => {
    if (index > 0) setIndex(index - 1);
  };

  return (
    <div className="projects-wrapper">
      {/* Header Section */}
      <div className="projects-header">
        
        <h1 className="projects-heading">
          Featured <span className="gradient-text">Projects</span>
        </h1>
        <p className="projects-subtitle">
          A collection of my recent work showcasing innovation and creativity
        </p>
      </div>

      {/* Slider Section */}
      <div className="slider-container">
        <button
          className="slider-btn left"
          onClick={prevSlide}
          disabled={index === 0}
          aria-label="Previous slide"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>

        <div className="slider-window">
          <div
            className="slider-track"
            style={{
              transform: `translateX(-${index * 100}%)`,
            }}
          >
            {Array.from({ length: maxIndex + 1 }).map((_, slideIndex) => (
              <div className="slide" key={slideIndex}>
                {projectData
                  .slice(
                    slideIndex * cardsPerSlide,
                    slideIndex * cardsPerSlide + cardsPerSlide
                  )
                  .map((project, i) => (
                    <ProjectCard key={i} project={project} />
                  ))}
              </div>
            ))}
          </div>
        </div>

        <button
          className="slider-btn right"
          onClick={nextSlide}
          disabled={index === maxIndex}
          aria-label="Next slide"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      </div>

      {/* Pagination Dots */}
      <div className="pagination-dots">
        {Array.from({ length: maxIndex + 1 }).map((_, i) => (
          <button
            key={i}
            className={`dot ${index === i ? 'active' : ''}`}
            onClick={() => setIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Counter */}
      <div className="slide-counter">
        <span className="current">{index + 1}</span>
        <span className="separator">/</span>
        <span className="total">{maxIndex + 1}</span>
      </div>
    </div>
  );
};

export default ProjectsMainPage;