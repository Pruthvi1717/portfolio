import { useState, useEffect, useRef } from "react";
import "./ChatbotWidget.css";

const DEFAULT_MESSAGES = [
  {
    sender: "bot",
    text: "Hi! I'm Pruthvi's portfolio assistant 👋 Ask me anything about his skills, projects, education, certifications, or how to get in touch.",
  },
];

// ─── KNOWLEDGE BASE ──────────────────────────────────────────────────────────

const KNOWLEDGE_BASE = [
  // WHO IS PRUTHVI
  {
    keywords: ["who", "about", "introduce", "pruthvi", "yourself", "tell me"],
    answer:
      "Pruthvi Ghatul is a passionate full-stack web developer with a strong focus on building modern, responsive, and interactive web applications. He combines solid computer science fundamentals with hands-on experience in full-stack development, cloud computing, and data science.",
  },

  // SKILLS — FRONTEND
  {
    keywords: ["frontend", "front end", "ui", "interface", "react", "html", "css", "javascript"],
    answer:
      "On the frontend, Pruthvi works with React, JavaScript (ES6+), HTML5, and CSS3. He builds responsive UIs with attention to design detail, using tools like Framer Motion for animations and Leaflet for interactive maps.",
  },

  // SKILLS — BACKEND
  {
    keywords: ["backend", "back end", "server", "node", "express", "database", "mongodb", "sql", "postgres"],
    answer:
      "For backend development, Pruthvi uses Node.js and Express.js to build REST APIs, and works with databases like MongoDB and PostgreSQL. He has completed a full-stack course (Delta) covering the entire MERN stack and beyond.",
  },

  // SKILLS — ALL / TECH STACK
  {
    keywords: ["skill", "skills", "tech", "stack", "technologies", "tools", "know", "language"],
    answer:
      "Pruthvi's tech stack spans:\n• Frontend: React, JavaScript, HTML, CSS\n• Backend: Node.js, Express, MongoDB, PostgreSQL\n• CS Fundamentals: Data Structures & Algorithms (Java), Operating Systems, Computer Networking\n• Cloud: AWS (Cloud Foundations)\n• Data Science: Python, ML fundamentals\n• Other: Git, Leaflet, Framer Motion, Tailwind CSS",
  },

  // DSA / JAVA
  {
    keywords: ["dsa", "data structure", "algorithm", "java", "coding", "leetcode"],
    answer:
      "Pruthvi has completed the Alpha – DSA with Java course by Apna College (2024), covering core data structures and algorithms in Java. This gives him a strong foundation for problem-solving and technical interviews.",
  },

  // CLOUD / AWS
  {
    keywords: ["aws", "cloud", "amazon", "cloud computing"],
    answer:
      "Pruthvi holds the AWS Academy Cloud Foundations certification (2025), covering core AWS services, cloud architecture concepts, security, and pricing models.",
  },

  // DATA SCIENCE
  {
    keywords: ["data science", "machine learning", "ml", "ai", "python", "data"],
    answer:
      "Pruthvi completed the 'Ultimate Job Ready Data Science' course by CodeWithHarry (2025), covering Python for data science, machine learning fundamentals, and real-world data analysis.",
  },

  // OS / NETWORKING
  {
    keywords: ["os", "operating system", "networking", "network", "computer science", "fundamentals", "cn"],
    answer:
      "Pruthvi has certifications in both Operating System Fundamentals and Computer Networking (Master Networking) from Scaler Topics (2026), strengthening his CS fundamentals alongside practical development skills.",
  },

  // SANSKRIT
  {
    keywords: ["sanskrit", "language", "udemy", "non-tech"],
    answer:
      "Beyond tech, Pruthvi completed the 'Learn Sanskrit Language – Complete Guide' on Udemy (2024). It reflects his curiosity and love for continuous learning across different domains.",
  },

  // CERTIFICATIONS
  {
    keywords: ["certification", "certifications", "certificate", "course", "courses", "achievement"],
    answer:
      "Pruthvi has 7 certifications:\n1. Delta – Full Stack Web Dev (Apna College, 2024)\n2. Alpha – DSA with Java (Apna College, 2024)\n3. AWS Academy Cloud Foundations (2025)\n4. Operating System Fundamentals (Scaler Topics, 2026)\n5. Computer Networking (Scaler Topics, 2026)\n6. Ultimate Job Ready Data Science (CodeWithHarry, 2025)\n7. Learn Sanskrit Language (Udemy, 2024)",
  },

  // EDUCATION
  {
    keywords: ["education", "college", "degree", "university", "study", "student", "academic"],
    answer:
      "You can find Pruthvi's full academic background in the Education section of this portfolio. He has pursued structured learning across web development, data science, cloud, and computer science fundamentals through both formal education and certified courses.",
  },

  // PROJECTS
  {
    keywords: ["project", "projects", "work", "built", "made", "demo", "github", "live"],
    answer:
      "The Projects section showcases Pruthvi's featured work, including descriptions, tech stacks used, and links to live demos or GitHub repositories. He has built full-stack applications using React, Node.js, and various databases.",
  },

  // CONTACT / CONNECT
  {
    keywords: ["contact", "connect", "email", "linkedin", "hire", "reach", "social", "message"],
    answer:
      "You can connect with Pruthvi through the social links in the top navigation bar, or use the Connect button on the site. LinkedIn is the best way to reach him for professional opportunities or collaborations.",
  },

  // EXPERIENCE / WORK
  {
    keywords: ["experience", "job", "internship", "work experience", "employed"],
    answer:
      "Check out the Experience section of the portfolio for details on Pruthvi's professional work history and any internships or roles he has held.",
  },

  // FULL STACK
  {
    keywords: ["full stack", "fullstack", "mern", "web development", "web dev"],
    answer:
      "Pruthvi completed the Delta – Full Stack Web Development course by Apna College (2024), one of the most comprehensive full-stack programs covering the MERN stack (MongoDB, Express, React, Node.js) along with SQL, deployment, and modern web practices.",
  },

  // APNA COLLEGE
  {
    keywords: ["apna college", "shradha", "delta", "alpha"],
    answer:
      "Pruthvi completed two flagship courses from Apna College — Delta (Full Stack Web Development) and Alpha (DSA with Java), both in 2024. These are among the most well-regarded structured learning programs for developers in India.",
  },

  // SCALER
  {
    keywords: ["scaler", "scaler topics"],
    answer:
      "Pruthvi has two certifications from Scaler Topics — Operating System Fundamentals and Computer Networking (Master Networking), both earned in 2026, which round out his CS fundamentals knowledge.",
  },

  // HIRE / AVAILABLE
  {
    keywords: ["hire", "available", "open to work", "opportunity", "job", "freelance"],
    answer:
      "Pruthvi is open to opportunities! The best way to connect is via LinkedIn or through the Connect button on the portfolio. Feel free to reach out for full-time roles, freelance projects, or collaborations.",
  },
];

// ─── BOT REPLY LOGIC ─────────────────────────────────────────────────────────

const getBotReply = (userText) => {
  const normalized = userText.toLowerCase();

  // Score each entry by how many keywords match
  let bestMatch = null;
  let bestScore = 0;

  for (const entry of KNOWLEDGE_BASE) {
    const score = entry.keywords.filter((kw) => normalized.includes(kw)).length;
    if (score > bestScore) {
      bestScore = score;
      bestMatch = entry;
    }
  }

  if (bestMatch && bestScore > 0) return bestMatch.answer;

  return "That's a great question! I'm a simple on-page assistant, so for detailed info please explore the Skills, Projects, Education, and Certifications sections directly — or connect with Pruthvi on LinkedIn for anything specific. 😊";
};

// ─── COMPONENT ───────────────────────────────────────────────────────────────

const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(DEFAULT_MESSAGES);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  const handleToggle = () => setIsOpen((prev) => !prev);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;

    const userMsg = { sender: "user", text: trimmed };
    const botMsg = { sender: "bot", text: getBotReply(trimmed) };

    setMessages((prev) => [...prev, userMsg, botMsg]);
    setInput("");
  };

  // Quick suggestion chips
  const SUGGESTIONS = ["Skills", "Projects", "Certifications", "Contact"];

  const handleSuggestion = (text) => {
    const userMsg = { sender: "user", text };
    const botMsg = { sender: "bot", text: getBotReply(text) };
    setMessages((prev) => [...prev, userMsg, botMsg]);
  };

  return (
    <div className="chatbot-container">
      {isOpen && (
        <div className="chatbot-panel">
          <div className="chatbot-header">
            <div className="chatbot-header-info">
              <span className="chatbot-avatar">P</span>
              <div>
                <span className="chatbot-header-name">Pruthvi&apos;s Assistant</span>
                <span className="chatbot-header-status">● Online</span>
              </div>
            </div>
            <button
              type="button"
              className="chatbot-close"
              onClick={handleToggle}
              aria-label="Close chat"
            >
              ×
            </button>
          </div>

          <div className="chatbot-messages">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`chatbot-message chatbot-message-${msg.sender}`}
              >
                {msg.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {messages.length === 1 && (
            <div className="chatbot-suggestions">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  type="button"
                  className="chatbot-chip"
                  onClick={() => handleSuggestion(s)}
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          <form className="chatbot-input-row" onSubmit={handleSubmit}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about skills, projects..."
              autoComplete="off"
            />
            <button type="submit" disabled={!input.trim()}>
              ↑
            </button>
          </form>
        </div>
      )}

      <button
        type="button"
        className="chatbot-toggle"
        onClick={handleToggle}
        aria-label="Open chat"
      >
        {isOpen ? "✕" : "💬"}
      </button>
    </div>
  );
};

export default ChatbotWidget;