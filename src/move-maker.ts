import { Board, Team } from './board';
import { GameStates, GameState, Move } from './game-state';
import { readJsonSync, writeJsonSync } from 'fs-extra';

export class MoveHistory {
  constructor(public move: Move, public team: Team, public key: string) {}
}

export class MoveMaker {
  private moveTracking: MoveHistory[] = [];
  private gameStates = new GameStates('teamX_brain.json');

  constructor(private board: Board) {}

  getMoves(): Move[] {
    return this.gameStates.gameStates[this.board.key()].moves;
  }

  determineMove(): Move {
    // based on probability, select the best available move for the given team
    let moves = this.getMoves();
    let moveDecision = moves.reduce(
      (moveDecision: Array<Move>, move: Move, index: number) => {
        let array = new Array(move.count).fill(move, 0, move.count);
        return moveDecision.concat(array);
      },
      []
    );

    return moveDecision[Math.floor(Math.random() * moveDecision.length)];
  }

  makeMove(team: Team): void {
    let move = this.determineMove();
    this.moveTracking.push(new MoveHistory(move, team, this.board.key()));
    this.board.setByIndex(move.index, team);
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
    let brain = readJsonSync('teamX_brain.json');

    for (let move of this.moveTracking) {
      brain[move.key].moves.find(brainMove => {
        return brainMove.index === move.move.index;
      }).count +=
        winner === Team.X ? 3 : -1;
    }
    writeJsonSync('teamX_brain.json', brain);
  }
}
