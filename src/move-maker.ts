import { Board, Team } from './board';
import { GameStates, GameState, Move } from './game-state';

export class MoveHistory {
  constructor(public squarePick: Move, public team: Team, public key: string) {}
}

export class MoveMaker {
  private gameHistory: MoveHistory[] = [];

  private gameStates: GameStates = this.team === Team.X
    ? new GameStates('teamX_brain.json')
    : new GameStates('teamO_brain.json');

  constructor(private board: Board, private team: Team) {}

  reset(board: Board) {
    this.board = board;

    this.gameHistory = [];
  }

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

  makeMove(): void {
    let move = this.determineMove();
    this.gameHistory.push(new MoveHistory(move, this.team, this.board.key()));
    this.board.setByIndex(move.index, this.team);
  }

  chooseWinner(): Team {
    // determine the winner and return that value
    const length = this.board.squares.length;
    const squares = this.board.squares;
    let winner: Team = Team.E;

    if (squares[0] === squares[1] && squares[1] === squares[2]) {
      return squares[0];
    } else if (squares[3] === squares[4] && squares[4] === squares[5]) {
      return squares[3];
    } else if (squares[6] === squares[7] && squares[7] === squares[8]) {
      return squares[6];
    } else if (squares[0] === squares[3] && squares[3] === squares[6]) {
      return squares[0];
    } else if (squares[1] === squares[4] && squares[4] === squares[7]) {
      return squares[1];
    } else if (squares[2] === squares[5] && squares[5] === squares[8]) {
      return squares[2];
    } else if (squares[0] === squares[4] && squares[4] === squares[8]) {
      return squares[0];
    } else if (squares[2] === squares[4] && squares[4] === squares[6]) {
      return squares[2];
    } else if (squares.every(square => square !== Team.E)) {
      return Team.CAT;
    } else {
      return Team.E;
    }
  }

  learnThings(winner: Team) {
    for (let move of this.gameHistory) {
      let moves = this.gameStates.gameStates[move.key].moves;
      moves.find(brainMove => {
        return brainMove.index === move.squarePick.index;
      }).count +=
        winner === this.team ? 3 : winner === Team.CAT ? 0 : -1;

      if (moves.every(move => move.count === 0)) {
        moves.forEach((move: Move, index: number) => {
          move.count = 3;
        });
      }
    }
  }

  saveBrain() {
    this.gameStates.save();
  }
}
