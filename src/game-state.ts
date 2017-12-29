import { Board, Team } from './board';

export class Move {
  constructor(public index: number, public count: number) {}
}

export class GameState {
  moves: Move[];
}
