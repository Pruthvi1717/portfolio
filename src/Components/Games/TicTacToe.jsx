import { useState } from "react";
import "./Games.css";

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6] // diagonals
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const handleClick = (i) => {
    if (board[i] || winner) return;

    const newBoard = [...board];
    newBoard[i] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);

    const gameWinner = calculateWinner(newBoard);
    if (gameWinner) {
      setWinner(gameWinner);
    } else if (newBoard.every(square => square)) {
      setWinner('Draw');
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
  };

  const renderSquare = (i) => (
    <button
      key={i}
      className="tic-tac-toe-square"
      onClick={() => handleClick(i)}
    >
      {board[i]}
    </button>
  );

  return (
    <div className="game-container">
      <h2>🎯 Tic Tac Toe</h2>
      <div className="game-status">
        {winner ? (
          winner === 'Draw' ? "It's a draw!" : `Winner: ${winner}`
        ) : (
          `Next player: ${isXNext ? 'X' : 'O'}`
        )}
      </div>
      <div className="tic-tac-toe-board">
        {[0, 1, 2].map(row =>
          <div key={row} className="tic-tac-toe-row">
            {[0, 1, 2].map(col => renderSquare(row * 3 + col))}
          </div>
        )}
      </div>
      <button className="game-reset-btn" onClick={resetGame}>
        🔄 New Game
      </button>
    </div>
  );
};

export default TicTacToe;