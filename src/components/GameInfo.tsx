import React from 'react';
import './GameInfo.css';

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

interface GameInfoProps {
  gameState: GameState;
  playerInfo: PlayerInfo | null;
  isSpectator: boolean;
}

const GameInfo: React.FC<GameInfoProps> = ({ gameState, playerInfo, isSpectator }) => {
  const getStatusMessage = () => {
    if (gameState.gameStatus === 'waiting') {
      return 'Waiting for another player...';
    }
    
    if (gameState.gameStatus === 'finished') {
      if (gameState.winner === 'draw') {
        return 'It\'s a draw!';
      }
      return `Player ${gameState.winner} wins!`;
    }
    
    if (isSpectator) {
      return `Watching: Player ${gameState.currentPlayer}'s turn`;
    }
    
    if (playerInfo && gameState.currentPlayer === playerInfo.symbol) {
      return `Your turn (${playerInfo.symbol})`;
    }
    
    return `Player ${gameState.currentPlayer}'s turn`;
  };

  const getStatusClass = () => {
    if (gameState.gameStatus === 'finished') {
      return gameState.winner === 'draw' ? 'status-draw' : 'status-win';
    }
    if (gameState.gameStatus === 'waiting') {
      return 'status-waiting';
    }
    return 'status-playing';
  };

  return (
    <div className="game-info">
      <div className={`status-message ${getStatusClass()}`}>
        {getStatusMessage()}
      </div>
      
      <div className="players-info">
        <div className="player-card">
          <div className="player-symbol player-x">X</div>
          <div className="player-status">
            {gameState.players.find(p => p.symbol === 'X') ? 'Connected' : 'Waiting...'}
          </div>
        </div>
        
        <div className="vs">VS</div>
        
        <div className="player-card">
          <div className="player-symbol player-o">O</div>
          <div className="player-status">
            {gameState.players.find(p => p.symbol === 'O') ? 'Connected' : 'Waiting...'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameInfo;
