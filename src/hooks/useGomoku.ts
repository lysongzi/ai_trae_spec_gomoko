import { useState, useCallback } from 'react';
import type { Player, BoardState, GameConfig } from '../types';

interface UseGomokuReturn {
  board: BoardState;
  currentPlayer: Player;
  winner: Player | null;
  placeStone: (row: number, col: number) => void;
  resetGame: (config: GameConfig) => void;
  isDraw: boolean;
}

const DIRECTIONS = [
  [0, 1],   // Horizontal
  [1, 0],   // Vertical
  [1, 1],   // Diagonal \
  [1, -1],  // Diagonal /
];

export const useGomoku = (): UseGomokuReturn => {
  const [board, setBoard] = useState<BoardState>([]);
  const [currentPlayer, setCurrentPlayer] = useState<Player>('black');
  const [winner, setWinner] = useState<Player | null>(null);
  const [isDraw, setIsDraw] = useState(false);

  const initializeBoard = useCallback((config: GameConfig) => {
    const newBoard: BoardState = Array(config.boardSize).fill(null).map(() => 
      Array(config.boardSize).fill(null)
    );
    setBoard(newBoard);
    setCurrentPlayer('black'); // Black always starts first in standard rules
    setWinner(null);
    setIsDraw(false);
  }, []);

  const checkWin = (board: BoardState, row: number, col: number, player: Player) => {
    const size = board.length;

    for (const [dx, dy] of DIRECTIONS) {
      let count = 1;

      // Check forward
      let r = row + dx;
      let c = col + dy;
      while (r >= 0 && r < size && c >= 0 && c < size && board[r][c] === player) {
        count++;
        r += dx;
        c += dy;
      }

      // Check backward
      r = row - dx;
      c = col - dy;
      while (r >= 0 && r < size && c >= 0 && c < size && board[r][c] === player) {
        count++;
        r -= dx;
        c -= dy;
      }

      if (count >= 5) return true;
    }
    return false;
  };

  const checkDraw = (board: BoardState) => {
    return board.every(row => row.every(cell => cell !== null));
  };

  const placeStone = useCallback((row: number, col: number) => {
    if (winner || isDraw || board[row][col] !== null) return;

    // Create a new board copy
    const newBoard = board.map(r => [...r]);
    newBoard[row][col] = currentPlayer;
    setBoard(newBoard);

    if (checkWin(newBoard, row, col, currentPlayer)) {
      setWinner(currentPlayer);
    } else if (checkDraw(newBoard)) {
      setIsDraw(true);
    } else {
      setCurrentPlayer(prev => prev === 'black' ? 'white' : 'black');
    }
  }, [board, currentPlayer, winner, isDraw]);

  return {
    board,
    currentPlayer,
    winner,
    placeStone,
    resetGame: initializeBoard,
    isDraw
  };
};
