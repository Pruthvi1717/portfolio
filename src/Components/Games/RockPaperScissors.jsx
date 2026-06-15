import { useState } from "react";
import "./Games.css";

const RockPaperScissors = () => {
  const [playerChoice, setPlayerChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState('');
  const [score, setScore] = useState({ player: 0, computer: 0, ties: 0 });

  const choices = [
    { name: 'Rock', emoji: '🪨' },
    { name: 'Paper', emoji: '📄' },
    { name: 'Scissors', emoji: '✂️' }
  ];

  const getRandomChoice = () => choices[Math.floor(Math.random() * choices.length)];

  const determineWinner = (player, computer) => {
    if (player.name === computer.name) {
      return 'tie';
    }

    if (
      (player.name === 'Rock' && computer.name === 'Scissors') ||
      (player.name === 'Paper' && computer.name === 'Rock') ||
      (player.name === 'Scissors' && computer.name === 'Paper')
    ) {
      return 'player';
    }

    return 'computer';
  };

  const playGame = (choice) => {
    const computerChoice = getRandomChoice();
    setPlayerChoice(choice);
    setComputerChoice(computerChoice);

    const winner = determineWinner(choice, computerChoice);

    if (winner === 'tie') {
      setResult("It's a tie! 🤝");
      setScore(prev => ({ ...prev, ties: prev.ties + 1 }));
    } else if (winner === 'player') {
      setResult('You win! 🎉');
      setScore(prev => ({ ...prev, player: prev.player + 1 }));
    } else {
      setResult('Computer wins! 🤖');
      setScore(prev => ({ ...prev, computer: prev.computer + 1 }));
    }
  };

  const resetGame = () => {
    setPlayerChoice(null);
    setComputerChoice(null);
    setResult('');
  };

  const resetScore = () => {
    setScore({ player: 0, computer: 0, ties: 0 });
    resetGame();
  };

  return (
    <div className="game-container">
      <h2>✂️ Rock Paper Scissors</h2>
      <div className="score-board">
        <div className="score-item">You: {score.player}</div>
        <div className="score-item">Ties: {score.ties}</div>
        <div className="score-item">Computer: {score.computer}</div>
      </div>

      <div className="choices-container">
        {choices.map((choice) => (
          <button
            key={choice.name}
            className="choice-btn"
            onClick={() => playGame(choice)}
          >
            <span className="choice-emoji">{choice.emoji}</span>
            <span className="choice-name">{choice.name}</span>
          </button>
        ))}
      </div>

      {(playerChoice || computerChoice) && (
        <div className="game-result">
          <div className="result-choices">
            <div className="result-choice">
              <div>You chose:</div>
              <div className="choice-display">
                <span className="choice-emoji">{playerChoice?.emoji}</span>
                <span>{playerChoice?.name}</span>
              </div>
            </div>
            <div className="result-choice">
              <div>Computer chose:</div>
              <div className="choice-display">
                <span className="choice-emoji">{computerChoice?.emoji}</span>
                <span>{computerChoice?.name}</span>
              </div>
            </div>
          </div>
          <div className="result-text">{result}</div>
        </div>
      )}

      <div className="game-buttons">
        <button className="game-reset-btn" onClick={resetGame}>
          🔄 Play Again
        </button>
        <button className="game-reset-btn" onClick={resetScore}>
          🗑️ Reset Score
        </button>
      </div>
    </div>
  );
};

export default RockPaperScissors;