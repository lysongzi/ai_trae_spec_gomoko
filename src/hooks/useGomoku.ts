import { useState, useCallback, useRef, useEffect } from 'react';
import RandomAI from '../ai/aiPlayer';
import type { Player, BoardState, GameConfig } from '../types';

interface UseGomokuReturn {
  board: BoardState;
  currentPlayer: Player;
  winner: Player | null;
  placeStone: (row: number, col: number) => void;
  resetGame: (config: GameConfig) => void;
  isDraw: boolean;
  isAITurn: boolean;
  movesCount: number;
  score: number;
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
  const [isAITurn, setIsAITurn] = useState(false);
  const [playerSide, setPlayerSide] = useState<Player>('black');
  const [movesCount, setMovesCount] = useState(0);
  const [score, setScore] = useState(0);
  const aiRef = useRef(new RandomAI());

  const initializeBoard = useCallback((config: GameConfig) => {
    const newBoard: BoardState = Array(config.boardSize).fill(null).map(() => 
      Array(config.boardSize).fill(null)
    );
    setBoard(newBoard);
    setCurrentPlayer('black'); // Black always starts first in standard rules
    setWinner(null);
    setIsDraw(false);
    setIsAITurn(false);
    setPlayerSide(config.playerSide);
    setMovesCount(0);
    setScore(0);
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

  const applyMove = useCallback((targetBoard: BoardState, row: number, col: number, player: Player) => {
    const newBoard = targetBoard.map(r => [...r]);
    newBoard[row][col] = player;
    setBoard(newBoard);

    if (player === playerSide) {
      setMovesCount(prev => prev + 1);
      setScore(prev => prev + 10);
    }

    if (checkWin(newBoard, row, col, player)) {
      setWinner(player);
      if (player === playerSide) {
        setScore(prev => prev + 100);
      } else {
        setScore(prev => prev - 100);
      }
      return { board: newBoard, ended: true, nextPlayer: player };
    }
    if (checkDraw(newBoard)) {
      setIsDraw(true);
      return { board: newBoard, ended: true, nextPlayer: player };
    }
    const nextPlayer: Player = player === 'black' ? 'white' : 'black';
    setCurrentPlayer(nextPlayer);
    return { board: newBoard, ended: false, nextPlayer };
  }, [checkWin, checkDraw, playerSide]);

  const placeStone = useCallback((row: number, col: number) => {
    if (winner || isDraw || isAITurn || board[row][col] !== null) return;
    if (currentPlayer !== playerSide) return;

    const result = applyMove(board, row, col, currentPlayer);
    if (!result || result.ended) return;

    const next = result.nextPlayer;
    if (next !== playerSide) {
      setIsAITurn(true);
      const aiMove = aiRef.current.chooseMove(result.board, next);
      if (aiMove) {
        applyMove(result.board, aiMove.row, aiMove.col, next);
      }
      setIsAITurn(false);
    }
  }, [winner, isDraw, isAITurn, board, currentPlayer, playerSide, applyMove]);

  useEffect(() => {
    if (winner || isDraw) return;
    if (board.length === 0) return;
    if (isAITurn) return;
    if (currentPlayer === playerSide) return;
    setIsAITurn(true);
    const aiMove = aiRef.current.chooseMove(board, currentPlayer);
    if (aiMove) {
      applyMove(board, aiMove.row, aiMove.col, currentPlayer);
    }
    setIsAITurn(false);
  }, [board, currentPlayer, playerSide, isAITurn, winner, isDraw, applyMove]);

  return {
    board,
    currentPlayer,
    winner,
    placeStone,
    resetGame: initializeBoard,
    isDraw,
    isAITurn,
    movesCount,
    score
  };
};
