import React, { useState } from 'react';
import './Lobby.css';

interface LobbyProps {
  onJoinRoom: (roomId: string) => void;
}

const Lobby: React.FC<LobbyProps> = ({ onJoinRoom }) => {
  const [roomId, setRoomId] = useState('');
  const [playerName, setPlayerName] = useState('');

  const handleJoinRoom = (e: React.FormEvent) => {
    e.preventDefault();
    if (roomId.trim()) {
      onJoinRoom(roomId);
    }
  };

  const handleCreateRoom = () => {
    const newRoomId = Math.random().toString(36).substring(2, 8).toUpperCase();
    setRoomId(newRoomId);
    onJoinRoom(newRoomId);
  };

  return (
    <div className="lobby">
      <div className="lobby-container">
        <h1 className="lobby-title">🎮 Caro Online Game</h1>
        <p className="lobby-subtitle">Play Caro with friends in real-time!</p>
        
        <div className="lobby-form">
          <form onSubmit={handleJoinRoom}>
            <div className="form-group">
              <label htmlFor="playerName">Your Name:</label>
              <input
                type="text"
                id="playerName"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                placeholder="Enter your name"
                maxLength={20}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="roomId">Room ID:</label>
              <input
                type="text"
                id="roomId"
                value={roomId}
                onChange={(e) => setRoomId(e.target.value.toUpperCase())}
                placeholder="Enter room ID"
                maxLength={6}
              />
            </div>
            
            <div className="button-group">
              <button type="submit" className="btn btn-primary" disabled={!roomId.trim()}>
                Join Room
              </button>
              <button type="button" className="btn btn-secondary" onClick={handleCreateRoom}>
                Create New Room
              </button>
            </div>
          </form>
        </div>
        
        <div className="lobby-info">
          <h3>How to play:</h3>
          <ul>
            <li>Create a room and share the Room ID with your friend</li>
            <li>Or join an existing room using the Room ID</li>
            <li>First player is X, second player is O</li>
            <li>Get 5 in a row to win!</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Lobby;
