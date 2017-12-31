import { Board, Team } from './board';
import { GameStates, GameState, Move } from './game-state';
import { GameStateGenerator } from 'game-state-generator';

export class MoveHistory {
  constructor(public squarePick: Move, public team: Team, public key: string) {}
}

export class MoveMaker {
  private gameHistory: MoveHistory[] = [];
  private gameStates = new GameStates(this.brain);

  constructor(
    private board: Board,
    private team: Team,
    private brain: string
  ) {}

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
