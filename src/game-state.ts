import { readJsonSync, writeJsonSync } from 'fs-extra';

import { Board, Team } from './board';

export class Move {
  constructor(public index: number, public count: number) {}
}

export class GameState {
  moves: Move[];
}

export class GameStates {
  gameStates: Map<string, GameState> = new Map(readJsonSync(this.savedFile));

  constructor(public savedFile = 'game-states.json') {}

  save() {
    writeJsonSync(
      this.savedFile,
      JSON.parse(
        JSON.stringify(
          [...this.gameStates].filter(item => {
            return item[0] !== undefined && item[0] !== null;
          })
        )
      )
    );
  }
}
