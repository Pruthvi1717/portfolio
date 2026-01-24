import "./Skillcard.css";

const Skillcard = ({ skills, title }) => {
  return (
    <div className="skill-card">
      <h3 className="card-title">{title}</h3>

      <div className="skills-list">
        {skills.map((skill, index) => (
          <div key={index} className="skill-item">
            <img src={skill.logo} alt={skill.name} />
            <span>{skill.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skillcard;
