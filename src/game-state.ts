import { Board, Team } from './board';

import { readJsonSync } from 'fs-extra';

export class Move {
  constructor(public index: number, public count: number) {}
}

export class GameState {
  moves: Move[];
}

export class GameStates {
  gameStates: any;
  constructor(public savedFile = 'game-states.json') {
    this.gameStates = readJsonSync(savedFile);
  }
}
