import { GameState, Move } from './game-state';
import { Board, Team } from './board';
import { writeJsonSync } from 'fs-extra';

export class GameStateGenerator {
  generate() {
    let gameStates = {};
    for (let i = 0; i < 19683; ++i) {
      let gameState = new GameState();
      let board = new Board();
      let positionIndex = 0;
      let c = i;
      for (let j = 0; j < 9; ++j) {
        let team = c % 3;
        board.setByIndex(
          positionIndex++,
          team == 0 ? Team.E : team == 1 ? Team.X : Team.O
        );
        c = Math.floor(c / 3);
      }
      gameState.moves = board.squares.reduce(
        (moves: Array<Move>, team: Team, i: number) => {
          if (team == Team.E) {
            moves.push(new Move(i, 3));
          }
          return moves;
        },
        []
      );

      gameStates[board.key()] = gameState;
    }
    writeJsonSync('game-states.json', gameStates);
  }
}
