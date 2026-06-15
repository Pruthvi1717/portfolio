import { useState, useEffect } from "react";
import "./Games.css";

const MemoryGame = () => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [moves, setMoves] = useState(0);
  const [gameWon, setGameWon] = useState(false);

  const emojis = ['🎮', '🎯', '🎲', '🎪', '🎨', '🎭', '🎪', '🎨'];

  const initializeGame = () => {
    const shuffledCards = [...emojis, ...emojis]
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({
        id: index,
        emoji,
        isFlipped: false,
        isMatched: false
      }));
    setCards(shuffledCards);
    setFlippedCards([]);
    setMatchedCards([]);
    setMoves(0);
    setGameWon(false);
  };

  useEffect(() => {
    initializeGame();
  }, []);

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [first, second] = flippedCards;
      setMoves(prev => prev + 1);

      if (cards[first].emoji === cards[second].emoji) {
        setMatchedCards(prev => [...prev, first, second]);
        setCards(prevCards =>
          prevCards.map((card, index) =>
            flippedCards.includes(index) ? { ...card, isMatched: true } : card
          )
        );
      }

      setTimeout(() => {
        setFlippedCards([]);
      }, 1000);
    }
  }, [flippedCards, cards]);

  useEffect(() => {
    if (matchedCards.length === cards.length && cards.length > 0) {
      setGameWon(true);
    }
  }, [matchedCards, cards]);

  const handleCardClick = (index) => {
    if (flippedCards.length >= 2 || flippedCards.includes(index) || matchedCards.includes(index)) {
      return;
    }
    setFlippedCards(prev => [...prev, index]);
  };

  return (
    <div className="game-container">
      <h2>🧠 Memory Game</h2>
      <div className="game-info">
        <div>Moves: {moves}</div>
        <div>Matched: {matchedCards.length / 2} / {emojis.length}</div>
      </div>
      <div className="memory-grid">
        {cards.map((card, index) => (
          <div
            key={card.id}
            className={`memory-card ${
              flippedCards.includes(index) || matchedCards.includes(index) ? 'flipped' : ''
            } ${matchedCards.includes(index) ? 'matched' : ''}`}
            onClick={() => handleCardClick(index)}
          >
            <div className="memory-card-inner">
              <div className="memory-card-front">?</div>
              <div className="memory-card-back">{card.emoji}</div>
            </div>
          </div>
        ))}
      </div>
      {gameWon && (
        <div className="game-won">
          🎉 Congratulations! You won in {moves} moves!
        </div>
      )}
      <button className="game-reset-btn" onClick={initializeGame}>
        🔄 New Game
      </button>
    </div>
  );
};

export default MemoryGame;