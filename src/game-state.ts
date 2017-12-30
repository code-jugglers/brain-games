import { readJsonSync, writeJsonSync } from 'fs-extra';

import { Board, Team } from './board';

export class Move {
  constructor(public index: number, public count: number) {}
}

export class GameState {
  moves: Move[];
}

export class GameStates {
  gameStates: { [key: string]: GameState } = readJsonSync(this.savedFile);

  constructor(public savedFile = 'game-states.json') {}

  save() {
    writeJsonSync(this.savedFile, this.gameStates);
  }
}
