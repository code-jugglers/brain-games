import { Board, Team } from './board';
import { GameState, Move } from './game-state';

export class MoveMaker {
  gameboard: Board;

  getMoves(): Move[] {
    // retrieve the game state that corresponds to the current game state

    // return the available moves
    return null;
  }

  determineMove(): Move {
    // based on probability, select the best available move for the given team
    return null;
  }

  makeMove() {
    // make your move, record the output
  }

  chooseWinner(): Team {
    // determine the winner and return that value -- also record the winner
    return Team.E;
  }
}
