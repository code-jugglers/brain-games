import { Board, Team } from './board';
import { GameState, Move } from './game-state';

export class MoveHistory {
  constructor(public move: Move, public team: Team) {}
}

export class MoveMaker {
  private moveTracking: MoveHistory[] = [];
  constructor(private board: Board) {}

  getMoves(): Move[] {
    // retrieve the game state that corresponds to the current game state

    // return the available moves
    return null;
  }

  determineMove(): Move {
    // based on probability, select the best available move for the given team
    return null;
  }

  makeMove(move: Move, team: Team) {
    // make your move, record the output
    this.moveTracking.push(new MoveHistory(move, team));
  }

  chooseWinner(): Team {
    // determine the winner and return that value -- also record the winner
    // then update probabilities based on the result
    return Team.E;
  }
}
