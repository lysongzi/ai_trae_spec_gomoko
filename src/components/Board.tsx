import React from 'react';
import type { BoardState, Player } from '../types';

interface BoardProps {
  board: BoardState;
  onCellClick: (row: number, col: number) => void;
  currentPlayer: Player;
}

const Board: React.FC<BoardProps> = ({ board, onCellClick }) => {
  const size = board.length;

  return (
    <div 
      className="game-board"
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${size}, 1fr)`,
        width: 'min(90vw, 90vh)',
        height: 'min(90vw, 90vh)',
        backgroundColor: 'rgba(13, 13, 21, 0.8)',
        border: '2px solid var(--color-primary)',
        boxShadow: '0 0 30px rgba(0, 255, 242, 0.1)',
        padding: '10px',
        gap: '1px', // Grid lines
      }}
    >
      {board.map((row, rowIndex) => (
        row.map((cell, colIndex) => (
          <div
            key={`${rowIndex}-${colIndex}`}
            className={`cell ${cell ? `occupied ${cell}` : ''}`}
            onClick={() => onCellClick(rowIndex, colIndex)}
            style={{
              position: 'relative',
              backgroundColor: 'var(--color-grid)', // Cell background
              cursor: cell ? 'not-allowed' : 'crosshair',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {/* Grid intersection visual */}
            <div style={{
              position: 'absolute',
              width: '100%',
              height: '1px',
              backgroundColor: 'rgba(0, 255, 242, 0.2)',
              zIndex: 0
            }} />
            <div style={{
              position: 'absolute',
              height: '100%',
              width: '1px',
              backgroundColor: 'rgba(0, 255, 242, 0.2)',
              zIndex: 0
            }} />

            {/* Stone */}
            {cell && (
              <div 
                className={`stone ${cell}`}
                style={{
                  width: '80%',
                  height: '80%',
                  borderRadius: '50%',
                  zIndex: 1,
                  backgroundColor: cell === 'black' ? '#000' : '#fff',
                  boxShadow: cell === 'black' 
                    ? 'inset 0 0 10px #333, 0 0 5px #000' 
                    : 'inset 0 0 10px #ccc, 0 0 10px #fff',
                  border: cell === 'black' ? '1px solid #333' : 'none'
                }}
              />
            )}
            
            {/* Hover effect for current player (optional, can be done in CSS) */}
          </div>
        ))
      ))}
    </div>
  );
};

export default Board;
