import React, { useState, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';
import GameBoard from './components/GameBoard';
import Lobby from './components/Lobby';
import './App.css';

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

const App: React.FC = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [playerInfo, setPlayerInfo] = useState<PlayerInfo | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [isSpectator, setIsSpectator] = useState<boolean>(false);
  const [roomId, setRoomId] = useState<string>('');

  useEffect(() => {
    const newSocket: Socket = io('https://caro.ngabayquetoi.io.vn');
    setSocket(newSocket);

    newSocket.on('connect', () => {
      console.log('Connected to server');
      setIsConnected(true);
    });

    newSocket.on('disconnect', () => {
      console.log('Disconnected from server');
      setIsConnected(false);
    });

    newSocket.on('joined-as-player', (data: PlayerInfo) => {
      setPlayerInfo(data);
      setIsSpectator(false);
    });

    newSocket.on('joined-as-spectator', () => {
      setIsSpectator(true);
      setPlayerInfo(null);
    });

    newSocket.on('game-state', (state: GameState) => {
      setGameState(state);
    });

    newSocket.on('move-made', (data: { board: (string | null)[][], currentPlayer: string, gameStatus: string, winner: string | null }) => {
      setGameState((prev: GameState | null) => prev ? {
        ...prev,
        board: data.board,
        currentPlayer: data.currentPlayer,
        gameStatus: data.gameStatus,
        winner: data.winner
      } : null);
    });

    newSocket.on('game-reset', (data: { board: (string | null)[][], currentPlayer: string, gameStatus: string, winner: string | null }) => {
      setGameState((prev: GameState | null) => prev ? {
        ...prev,
        board: data.board,
        currentPlayer: data.currentPlayer,
        gameStatus: data.gameStatus,
        winner: data.winner
      } : null);
    });

    newSocket.on('player-left', (data: { players: Array<{ id: string; symbol: string }> }) => {
      setGameState((prev: GameState | null) => prev ? {
        ...prev,
        players: data.players
      } : null);
    });

    return () => {
      newSocket.close();
    };
  }, []);

  const joinRoom = (room: string) => {
    if (socket && room.trim()) {
      socket.emit('join-room', room.trim());
      setRoomId(room.trim());
    }
  };

  const makeMove = (row: number, col: number) => {
    if (socket && playerInfo && gameState?.gameStatus === 'playing') {
      socket.emit('make-move', { row, col });
    }
  };

  const resetGame = () => {
    if (socket) {
      socket.emit('reset-game');
    }
  };

  if (!isConnected) {
    return (
      <div className="app">
        <div className="loading">
          <h2>Connecting to server...</h2>
        </div>
      </div>
    );
  }

  if (!gameState) {
    return (
      <div className="app">
        <Lobby onJoinRoom={joinRoom} />
      </div>
    );
  }

  return (
    <div className="app">
      <GameBoard
        gameState={gameState}
        playerInfo={playerInfo}
        isSpectator={isSpectator}
        onMakeMove={makeMove}
        onResetGame={resetGame}
        roomId={roomId}
      />
    </div>
  );
};

export default App;
