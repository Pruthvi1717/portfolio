import { useState } from "react";
import { educationTimeline } from "./educationData";
import EducationMap from "./EducationMap";
import "./EducationDashboard.css";

export default function EducationDashboard() {
  const [active, setActive] = useState(educationTimeline[0]);

  return (
    <div className="edu-dashboard">
      {/* LEFT: EDUCATION TIMELINE */}
      <div className="edu-timeline">
        <h2>Education Journey</h2>

        <div className="timeline-list">
          {educationTimeline.map((item) => (
            <div
              key={item.id}
              className={`timeline-item ${
                active.id === item.id ? "active" : ""
              }`}
              onClick={() => setActive(item)}
            >
              <strong>{item.degree}</strong>
              <p>{item.institute}</p>
              <span>
                {item.year} • {item.score}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT: MAP */}
      <div className="edu-map-wrapper">
        <EducationMap location={active.coords} />
      </div>
    </div>
  );
}
