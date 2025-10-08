import React from 'react';
import './Cell.css';

interface CellProps {
  value: string | null;
  onClick: () => void;
  disabled: boolean;
  row: number;
  col: number;
}

const Cell: React.FC<CellProps> = ({ value, onClick, disabled }) => {
  return (
    <button
      className={`cell ${value ? `cell-${value.toLowerCase()}` : ''} ${disabled ? 'cell-disabled' : 'cell-clickable'}`}
      onClick={onClick}
      disabled={disabled}
    >
      {value}
    </button>
  );
};

export default Cell;
