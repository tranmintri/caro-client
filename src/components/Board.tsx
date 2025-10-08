import React from 'react';
import Cell from './Cell';
import './Board.css';

interface BoardProps {
  board: (string | null)[][];
  onCellClick: (row: number, col: number) => void;
  canMakeMove: boolean;
  gameStatus: string;
}

const Board: React.FC<BoardProps> = ({ board, onCellClick, canMakeMove, gameStatus }) => {
  return (
    <div className="board">
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="board-row">
          {row.map((cell, colIndex) => (
            <Cell
              key={`${rowIndex}-${colIndex}`}
              value={cell}
              onClick={() => onCellClick(rowIndex, colIndex)}
              disabled={!canMakeMove || cell !== null || gameStatus !== 'playing'}
              row={rowIndex}
              col={colIndex}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;
