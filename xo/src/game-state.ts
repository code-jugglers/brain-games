import { readJsonSync, writeJsonSync } from 'fs-extra';

import { BrainMap } from './brain-map';
import { Board, Team } from './board';

export class Move {
  constructor(public index: number, public count: number) {}
}

export class GameState {
  constructor(public moves: Move[]) {}
}

export class GameStates {
  gameStates = new BrainMap(readJsonSync(this.savedFile));

  constructor(public savedFile = 'game-states.json') {}

  save() {
    writeJsonSync(this.savedFile, this.gameStates.state);
  }
}
