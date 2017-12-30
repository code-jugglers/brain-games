import { Board, Team } from './board';
import { GameStates, GameState, Move } from './game-state';

export class MoveHistory {
  constructor(public move: Move, public team: Team) {}
}

export class MoveMaker {
  private moveTracking: MoveHistory[] = [];
  private gameStates = new GameStates();

  constructor(private board: Board) {}

  getMoves(board: Board): Move[] {
    return this.gameStates.gameStates[board.key()];
  }

  determineMove(): Move {
    // based on probability, select the best available move for the given team
    return null;
  }

  makeMove(move: Move, team: Team): void {
    this.board.setByIndex(move.index, team);
    this.moveTracking.push(new MoveHistory(move, team));
  }

  chooseWinner(): Team {
    // determine the winner and return that value
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
    } else if (squares[2] === squares[4] && squares[4] === squares[6]) {
      winner = squares[2];
    }

    return winner;
  }

  learnThings(winner: Team) {
    for (let move of this.moveTracking) {
      if (move.team === winner) {
        //update count for that team
      }
    }
  }
}
