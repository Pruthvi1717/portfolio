import React, { useState } from 'react';
import './Locker.css';

// Custom hash function (simple djb2-like hash for demonstration)
// Note: This is not cryptographically secure, but implemented as per request
function customHash(str) {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) + hash) + str.charCodeAt(i);
    hash = hash & hash;
  }
  return hash.toString(16);
}

// Password stored in environment variable
// To change password: update VITE_LOCKER_PASSWORD in .env file
const STORED_PASSWORD = import.meta.env.VITE_LOCKER_PASSWORD;
const PASSWORD_HASH = STORED_PASSWORD ? customHash(STORED_PASSWORD) : null;

// Function to generate hash for reference (for development use)
// Call this in browser console to see what hash a password would generate
// Example: console.log(generatePasswordHash("yourPassword"));
export const generatePasswordHash = (password) => {
  return customHash(password);
};

// Hidden documents data
const hiddenDocuments = [
  {
    id: 1,
    title: "Confidential Project Proposal",
    content: "This is a confidential project proposal detailing upcoming features and strategies. Access restricted to authorized personnel only.",
    type: "text"
  },
  {
    id: 2,
    title: "Private Financial Report",
    content: "Financial projections and budget allocations for Q1 2024. Contains sensitive business information.",
    type: "text"
  },
  {
    id: 3,
    title: "Personal Notes",
    content: "Personal development notes and future plans. Not for public viewing.",
    type: "text"
  },
  {
    id: 4,
    title: "Secret Recipe",
    content: "The secret family recipe for the best chocolate cake ever. Shhh!",
    type: "text"
  }
];

const Locker = () => {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');
  const [attempts, setAttempts] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!STORED_PASSWORD) {
      setError('Password not configured. Please set VITE_LOCKER_PASSWORD in .env file.');
      return;
    }
    const hashedInput = customHash(password);

    if (hashedInput === PASSWORD_HASH) {
      setIsAuthenticated(true);
      setError('');
    } else {
      setAttempts(prev => prev + 1);
      setError(`Incorrect password. Attempts: ${attempts + 1}/5`);
      if (attempts >= 4) {
        setError('Too many failed attempts. Access denied.');
        setTimeout(() => {
          setPassword('');
          setError('');
          setAttempts(0);
        }, 30000); // Lock out for 30 seconds
      }
    }
    setPassword('');
  };

  if (isAuthenticated) {
    return (
      <div className="locker-container">
        <div className="locker-header">
          <h1>🔒 Secure Locker</h1>
          <p>Access granted to hidden documents</p>
          <button
            className="logout-btn"
            onClick={() => setIsAuthenticated(false)}
          >
            Logout
          </button>
        </div>
        <div className="documents-grid">
          {hiddenDocuments.map(doc => (
            <div key={doc.id} className="document-card">
              <h3>{doc.title}</h3>
              <div className="document-content">
                {doc.type === 'text' ? (
                  <p>{doc.content}</p>
                ) : (
                  <a href={doc.content} target="_blank" rel="noopener noreferrer">
                    View Document
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="locker-container">
      <div className="locker-form">
        <h1>🔒 Secure Locker</h1>
        <p>Enter password to access hidden documents</p>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
              disabled={attempts >= 5}
            />
            <button type="submit" disabled={attempts >= 5}>
              Unlock
            </button>
          </div>
          {error && <p className="error-message">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default Locker;
