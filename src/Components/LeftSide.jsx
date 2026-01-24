import "./LeftSide.css";
import { GoArrowRight,GoArrowDown } from "react-icons/go";
import { Typewriter } from "react-simple-typewriter";
import { motion } from "framer-motion";

const LeftSide = ({ setActivePage }) => {
  return (
    <section className="hero">
      <motion.div
        className="hero-content"
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <span className="intro">👋 Hello, I’m</span>

        <h1 className="name">Pruthviraj Ghatul</h1>

        <h3 className="role">
          <Typewriter
            words={[
              "Full Stack Developer",
              "DSA Enthusiast",
              "Machine Learning Learner",
            ]}
            loop={0}
            cursor
            cursorStyle="|"
            typeSpeed={80}
            deleteSpeed={50}
            delaySpeed={1200}
          />
        </h3>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          I’m a passionate front-end developer focused on building clean,
          responsive, and user-friendly web applications using modern
          technologies like React, JavaScript, and CSS. I also have a strong
          foundation in Data Structures & Algorithms and hands-on experience in
          Machine Learning.
        </motion.p>

        <motion.button
          className="primary-btn"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.5 }}
          onClick={() => setActivePage("education")}
        >
          Explore <GoArrowRight />
        </motion.button>
        &nbsp; &nbsp;
        <motion.button
          className="primary-btn "
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.5 }}
           onClick={() =>
            window.open("/Resume/Pruthviraj_Ghatul.pdf", "_blank")
              }
           >
          Resume(CV) <GoArrowDown />
        </motion.button>
      </motion.div>
    </section>
  );
};

export default LeftSide;
