import React from 'react';
import './GameBoard.css';

interface GameState {
  board: (string | null)[][];
  currentPlayer: string;
  gameStatus: string;
  winner: string | null;
  players: Array<{ id: string; symbol: string }>;
}

interface PlayerInfo {
  symbol: string;
  playerIndex: number;
}

interface GameBoardProps {
  gameState: GameState;
  playerInfo: PlayerInfo | null;
  isSpectator: boolean;
  onMakeMove: (row: number, col: number) => void;
  onResetGame: () => void;
  roomId: string;
}

const GameBoard: React.FC<GameBoardProps> = ({
  gameState,
  playerInfo,
  isSpectator,
  onMakeMove,
  onResetGame,
  roomId
}) => {
  const canMakeMove = !isSpectator && 
    playerInfo && 
    gameState.gameStatus === 'playing' && 
    gameState.currentPlayer === playerInfo.symbol;

  return (
    <div className="game-board">
      <div className="game-header">
        <h1 className="game-title">🎮 Caro Game</h1>
        <div className="room-info">
          <span className="room-label">Room:</span>
          <span className="room-id">{roomId}</span>
        </div>
      </div>

      <div className="game-info">
        <div className="status-message">
          {gameState.gameStatus === 'waiting' ? 'Waiting for another player...' :
           gameState.gameStatus === 'finished' ? 
             (gameState.winner === 'draw' ? 'It\'s a draw!' : `Player ${gameState.winner} wins!`) :
           isSpectator ? `Watching: Player ${gameState.currentPlayer}'s turn` :
           playerInfo && gameState.currentPlayer === playerInfo.symbol ? `Your turn (${playerInfo.symbol})` :
           `Player ${gameState.currentPlayer}'s turn`}
        </div>
      </div>

      <div className="board">
        {gameState.board.map((row, rowIndex) => (
          <div key={rowIndex} className="board-row">
            {row.map((cell, colIndex) => (
              <button
                key={`${rowIndex}-${colIndex}`}
                className={`cell ${cell ? `cell-${cell.toLowerCase()}` : ''} ${!canMakeMove || cell !== null || gameState.gameStatus !== 'playing' ? 'cell-disabled' : 'cell-clickable'}`}
                onClick={() => onMakeMove(rowIndex, colIndex)}
                disabled={!canMakeMove || cell !== null || gameState.gameStatus !== 'playing'}
              >
                {cell}
              </button>
            ))}
          </div>
        ))}
      </div>

      <div className="game-controls">
        <button 
          className="btn-reset" 
          onClick={onResetGame}
          disabled={gameState.gameStatus === 'waiting'}
        >
          🔄 New Game
        </button>
      </div>
    </div>
  );
};

export default GameBoard;