export type Player = 'black' | 'white';

export interface GameConfig {
  boardSize: number;
  playerSide: Player;
}

export type CellValue = Player | null;
export type BoardState = CellValue[][];
