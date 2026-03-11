import "./Skillcard.css";
import { motion } from "framer-motion";

const Skillcard = ({ skills, title }) => {
  return (
    <motion.div
      className="skill-card"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <h3 className="card-title">{title}</h3>

      <div className="skills-list">
        {skills.map((skill, index) => (
          <motion.div
            key={index}
            className="skill-item"
            whileHover={{ y: -4, scale: 1.03 }}
            transition={{ type: "spring", stiffness: 300, damping: 18 }}
          >
            <img src={skill.logo} alt={skill.name} />
            <span>{skill.name}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Skillcard;
