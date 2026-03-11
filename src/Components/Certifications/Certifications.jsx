import { useState } from "react";
import "./Certifications.css";

import fullstackImg from "./fullstack.png";
import dsaImg from "./dsa.png";
import awsImg from "./aws.png";
import osImg from "./os.png";
import cnImg from "./cn.png";
import datascienceImg from "./datascience.jpg";
import sanskritImg from "./sanskrit.jpg";

const CERTIFICATES = [
  {
    id: "fullstack",
    title: "Delta – Full Stack Web Development",
    issuer: "Apna College",
    date: "2024",
    image: fullstackImg,
    tag: "Full Stack • Web Dev",
  },
  {
    id: "dsa",
    title: "Alpha – DSA with Java",
    issuer: "Apna College",
    date: "2024",
    image: dsaImg,
    tag: "Data Structures • Algorithms",
  },
  {
    id: "aws",
    title: "AWS Academy Cloud Foundations",
    issuer: "AWS Academy",
    date: "2025",
    image: awsImg,
    tag: "Cloud • AWS",
  },
  {
    id: "os",
    title: "Operating System – Fundamentals",
    issuer: "Scaler Topics",
    date: "2026",
    image: osImg,
    tag: "CS Fundamentals • OS",
  },
  {
    id: "cn",
    title: "Computer Networking – Master Networking",
    issuer: "Scaler Topics",
    date: "2026",
    image: cnImg,
    tag: "CS Fundamentals • Networking",
  },
  {
    id: "datascience",
    title: "Ultimate Job Ready Data Science",
    issuer: "CodeWithHarry",
    date: "2025",
    image: datascienceImg,
    tag: "Data Science • ML",
  },
  {
    id: "sanskrit",
    title: "Learn Sanskrit Language – Complete Guide",
    issuer: "Udemy",
    date: "2024",
    image: sanskritImg,
    tag: "Language • Sanskrit",
  },
];

const Certifications = () => {
  const [active, setActive] = useState(null);

  const openModal = (certificate) => {
    setActive(certificate);
  };

  const closeModal = () => {
    setActive(null);
  };

  return (
    <section className="cert-section">
      <div className="cert-header">
        <span className="cert-tag">Certifications</span>
        <h1>Courses & Achievements</h1>
        <p>
          A snapshot of the structured learning path I&apos;ve followed across
          web development, computer science fundamentals, cloud, data science,
          and even languages.
        </p>
      </div>

      <div className="cert-grid">
        {CERTIFICATES.map((cert) => (
          <button
            key={cert.id}
            type="button"
            className="cert-card"
            onClick={() => openModal(cert)}
          >
            <div className="cert-image-wrap">
              <img src={cert.image} alt={cert.title} />
            </div>
            <div className="cert-content">
              <span className="cert-pill">{cert.tag}</span>
              <h3>{cert.title}</h3>
              <p>{cert.issuer}</p>
              <span className="cert-meta">{cert.date}</span>
            </div>
          </button>
        ))}
      </div>

      {active && (
        <div className="cert-modal" onClick={closeModal}>
          <div
            className="cert-modal-inner"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="cert-modal-close"
              onClick={closeModal}
              aria-label="Close certificate preview"
            >
              ×
            </button>
            <img src={active.image} alt={active.title} />
            <div className="cert-modal-text">
              <h2>{active.title}</h2>
              <p>
                {active.issuer} • {active.date}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Certifications;