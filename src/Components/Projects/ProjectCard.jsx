import "./ProjectCard.css";
import { motion } from "framer-motion";

const ProjectCard = ({ project }) => {
  if (!project) return null;

  const {
    image,
    title,
    description,
    skills = [],
    liveLink,
    githubLink,
  } = project;


  

  return (
    <motion.div
      className="project-card"
      whileHover={{ y: -10, rotateX: 4, rotateY: -4, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 260, damping: 18 }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
    >
      {/* Image */}
      <div className="project-image">
        <img src={image} alt={title || "Project Image"} />
      </div>

      {/* Content */}
      <div className="project-content">
        <h2 className="project-title">{title}</h2>
          <br />
        <p className="project-description">{description}</p>

        {/* Skills */}
        {skills.length > 0 && (
          <div className="project-skills">
            {skills.map((skill, index) => (
              <span key={index} className="skill-tag">
                {skill}
              </span>
            ))}
          </div>
        )}

        {/* Links */}
        <div className="project-links">
          {liveLink && (
            <a
              href={liveLink}
              target="_blank"
              rel="noreferrer"
              className="project-btn"
            >
              Live Demo
            </a>
          )}

          {githubLink && (
            <a
              href={githubLink}
              target="_blank"
              rel="noreferrer"
              className="project-btn secondary"
            >
              GitHub
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
