import { useState } from "react";
import "./ChatbotWidget.css";

const DEFAULT_MESSAGES = [
  {
    sender: "bot",
    text: "Hi, I’m Pruthvi’s portfolio assistant. Ask me about skills, projects, or how to contact him.",
  },
];

const FAQ_RESPONSES = [
  {
    keywords: ["skill", "skills", "tech", "stack"],
    answer:
      "Pruthvi works with React, JavaScript, modern UI libraries, and tools like Leaflet, Framer Motion, and more. Check the Skills section for details.",
  },
  {
    keywords: ["project", "projects", "work", "portfolio"],
    answer:
      "You can explore the Projects section to see featured work, descriptions, and links to code or live demos.",
  },
  {
    keywords: ["education", "college", "degree"],
    answer:
      "You’ll find academic background and certifications in the Education and Certifications sections of this portfolio.",
  },
  {
    keywords: ["contact", "connect", "email", "linkedin"],
    answer:
      "You can connect via LinkedIn or other social links in the top navigation bar. The Connect button also points you there.",
  },
];

const getBotReply = (userText) => {
  const normalized = userText.toLowerCase();

  const matched = FAQ_RESPONSES.find((entry) =>
    entry.keywords.some((kw) => normalized.includes(kw))
  );

  if (matched) return matched.answer;

  return "Thanks for your question! This is a simple on-page assistant, so for detailed queries please check the Skills, Projects, and Education sections, or connect with Pruthvi via LinkedIn.";
};

const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(DEFAULT_MESSAGES);
  const [input, setInput] = useState("");

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;

    const userMsg = { sender: "user", text: trimmed };
    const botMsg = { sender: "bot", text: getBotReply(trimmed) };

    setMessages((prev) => [...prev, userMsg, botMsg]);
    setInput("");
  };

  return (
    <div className="chatbot-container">
      {isOpen && (
        <div className="chatbot-panel">
          <div className="chatbot-header">
            <span>Chat with Pruthvi&apos;s assistant</span>
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
          </div>

          <form className="chatbot-input-row" onSubmit={handleSubmit}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about skills, projects, etc..."
            />
            <button type="submit">Send</button>
          </form>
        </div>
      )}

      <button
        type="button"
        className="chatbot-toggle"
        onClick={handleToggle}
        aria-label="Open chat"
      >
        {isOpen ? "Close" : "Chat"}
      </button>
    </div>
  );
};

export default ChatbotWidget;

