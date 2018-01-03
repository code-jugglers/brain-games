import { writeJsonSync } from 'fs-extra';

import { GameState, Move } from './game-state';
import { Board, Team } from './board';

export class GameStateGenerator {
  generate() {
    let gameStates: { [key: string]: GameState } = {};

    for (let i = 0; i < 19683; ++i) {
      let gameState = new GameState();
      let board = new Board();
      let positionIndex = 0;
      let c = i;

      for (let j = 0; j < 9; ++j) {
        let team = c % 3;

        board.setByIndex(
          positionIndex++,
          team == 0 ? Team.Empty : team == 1 ? Team.X : Team.O
        );

        c = Math.floor(c / 3);
      }

      gameState.moves = board.squares
        .filter(team => team === Team.Empty)
        .map((_, i) => new Move(i, 3));

      gameStates[board.key()] = gameState;
    }

    writeJsonSync('game-states.json', gameStates);
  }
}
