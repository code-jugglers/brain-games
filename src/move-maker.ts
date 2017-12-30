import { Board, Team } from './board';
import { GameStates, GameState, Move } from './game-state';

export class MoveHistory {
  constructor(public move: Move, public team: Team) {}
}

export class MoveMaker {
  private moveTracking: MoveHistory[] = [];
  private gameStates = new GameStates();

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

  makeMove(move: Move, team: Team): void {
    // make your move, record the output
    this.moveTracking.push(new MoveHistory(move, team));
  }

  chooseWinner(): Team {
    // determine the winner and return that value -- also record the winner
    // then update probabilities based on the result
    const length = this.board.squares.length;
    const squares = this.board.squares;
    let winner: Team = Team.E;

    if (squares[0] === squares[1] && squares[1] === squares[2]) {
      winner = squares[0];
    } else if (squares[3] === squares[4] && squares[4] === squares[5]) {
      winner = squares[3];
    } else if (squares[6] === squares[7] && squares[7] === squares[8]) {
      winner = squares[6];
    } else if (squares[0] === squares[3] && squares[3] === squares[6]) {
      winner = squares[0];
    } else if (squares[1] === squares[4] && squares[4] === squares[7]) {
      winner = squares[1];
    } else if (squares[2] === squares[5] && squares[5] === squares[8]) {
      winner = squares[2];
    } else if (squares[0] === squares[4] && squares[4] === squares[8]) {
      winner = squares[0];
    } else if (squares[3] === squares[5] && squares[5] === squares[6]) {
      winner = squares[3];
    }

    return winner;
  }
}
