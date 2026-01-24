import "./ProjectCard.css";

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
    <div className="project-card">
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
    </div>
  );
};

export default ProjectCard;
