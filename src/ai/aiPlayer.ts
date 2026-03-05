import type { BoardState, Player } from '../types';

export type Move = {
  row: number;
  col: number;
};

export interface AIPlayer {
  chooseMove(board: BoardState, player: Player): Move | null;
}

export class RandomAI implements AIPlayer {
  chooseMove(board: BoardState, player: Player): Move | null {
    void player;
    const size = board.length;
    const empties: Move[] = [];

    for (let r = 0; r < size; r++) {
      const row = board[r];
      for (let c = 0; c < row.length; c++) {
        if (row[c] === null) {
          empties.push({ row: r, col: c });
        }
      }
    }

    if (empties.length === 0) return null;
    const idx = Math.floor(Math.random() * empties.length);
    return empties[idx];
  }
}

export default RandomAI;

