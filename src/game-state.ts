import { Board, Team } from './board';

export class Move {
  index: number;
  count: number;
}

export class GameState {
  boardState: Board;
  moves: Move[];
}