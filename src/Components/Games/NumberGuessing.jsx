import { useState, useEffect } from "react";
import "./Games.css";

const NumberGuessing = () => {
  const [targetNumber, setTargetNumber] = useState(null);
  const [guess, setGuess] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [message, setMessage] = useState('');
  const [gameOver, setGameOver] = useState(false);
  const [maxNumber] = useState(100);
  const [maxAttempts] = useState(7);

  const startNewGame = () => {
    const newNumber = Math.floor(Math.random() * maxNumber) + 1;
    setTargetNumber(newNumber);
    setGuess('');
    setAttempts(0);
    setMessage(`I'm thinking of a number between 1 and ${maxNumber}. Can you guess it?`);
    setGameOver(false);
  };

  useEffect(() => {
    startNewGame();
  }, [maxNumber]);

  const handleGuess = (e) => {
    e.preventDefault();
    const numGuess = parseInt(guess);

    if (isNaN(numGuess) || numGuess < 1 || numGuess > maxNumber) {
      setMessage(`Please enter a number between 1 and ${maxNumber}.`);
      return;
    }

    const newAttempts = attempts + 1;
    setAttempts(newAttempts);

    if (numGuess === targetNumber) {
      setMessage(`🎉 Congratulations! You guessed it in ${newAttempts} attempts!`);
      setGameOver(true);
    } else if (newAttempts >= maxAttempts) {
      setMessage(`😅 Game Over! The number was ${targetNumber}. Better luck next time!`);
      setGameOver(true);
    } else if (numGuess < targetNumber) {
      setMessage(`📈 Too low! Try a higher number. (${maxAttempts - newAttempts} attempts left)`);
    } else {
      setMessage(`📉 Too high! Try a lower number. (${maxAttempts - newAttempts} attempts left)`);
    }

    setGuess('');
  };

  const getHint = () => {
    if (targetNumber) {
      const hints = [
        `The number is ${targetNumber % 2 === 0 ? 'even' : 'odd'}.`,
        `The number is ${targetNumber <= maxNumber / 2 ? 'in the lower half' : 'in the upper half'}.`,
        `The number ${targetNumber % 5 === 0 ? 'is' : 'is not'} divisible by 5.`,
      ];
      const randomHint = hints[Math.floor(Math.random() * hints.length)];
      setMessage(prev => `${prev}\n💡 Hint: ${randomHint}`);
    }
  };

  return (
    <div className="game-container">
      <h2>🔢 Number Guessing Game</h2>
      <div className="game-info">
        <div>Attempts: {attempts} / {maxAttempts}</div>
        <div>Range: 1 - {maxNumber}</div>
      </div>

      <div className="game-message">
        {message.split('\n').map((line, index) => (
          <div key={index}>{line}</div>
        ))}
      </div>

      {!gameOver && (
        <form onSubmit={handleGuess} className="guess-form">
          <input
            type="number"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            placeholder="Enter your guess..."
            min="1"
            max={maxNumber}
            className="guess-input"
          />
          <button type="submit" className="guess-btn">
            Guess
          </button>
        </form>
      )}

      <div className="game-buttons">
        {gameOver ? (
          <button className="game-start-btn" onClick={startNewGame}>
            🎮 New Game
          </button>
        ) : (
          <>
            <button className="game-hint-btn" onClick={getHint}>
              💡 Hint
            </button>
            <button className="game-reset-btn" onClick={startNewGame}>
              🔄 Reset
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default NumberGuessing;