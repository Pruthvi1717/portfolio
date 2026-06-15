import TicTacToe from "./TicTacToe";
import Snake from "./Snake";
import MemoryGame from "./MemoryGame";
import RockPaperScissors from "./RockPaperScissors";
import NumberGuessing from "./NumberGuessing";
import "./Games.css";

const Games = ({ selectedGame, setActivePage }) => {
  const games = [
    { id: 'tictactoe', name: 'Tic Tac Toe', component: TicTacToe, emoji: '🎯' },
    { id: 'snake', name: 'Snake', component: Snake, emoji: '🐍' },
    { id: 'memory', name: 'Memory Game', component: MemoryGame, emoji: '🧠' },
    { id: 'rps', name: 'Rock Paper Scissors', component: RockPaperScissors, emoji: '✂️' },
    { id: 'numberguess', name: 'Number Guessing', component: NumberGuessing, emoji: '🔢' }
  ];

  const selectedGameData = games.find(game => game.id === selectedGame);
  if (!selectedGameData) return null;

  const GameComponent = selectedGameData.component;

  return (
    <div className="games-page">
      <div className="games-header games-header--active">
        <div className="game-header-actions">
          <button className="quit-btn" onClick={() => setActivePage?.('home')}>
            ✕ Close Game
          </button>
        </div>
        <h1>{selectedGameData.emoji} {selectedGameData.name}</h1>
        <p className="game-subtitle">Enjoy the game — close it anytime to return to your portfolio.</p>
      </div>
      <GameComponent />
    </div>
  );
};

export default Games;