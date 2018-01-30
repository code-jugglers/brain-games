import { Team } from '@games/shared';

import { XoBoard } from './board';
import { GameStates, GameState, Move } from './game-state';

export class MoveHistory {
  constructor(public squarePick: Move, public team: Team, public key: string) {}
}

export class MoveMaker {
  private gameHistory: MoveHistory[] = [];
  private brain = new GameStates(this.brainConfig);

  constructor(
    private board: XoBoard,
    private team: Team,
    private brainConfig: string
  ) {}

  reset(board: XoBoard) {
    this.board = board;

    this.gameHistory = [];
  }

  determineMove(): Move {
    // based on probability, select the best available move for the given team
    const memory = this.brain.gameStates.get(this.board.key());
    const availMoves = memory ? memory.moves : this.getAvailableMoves();

    // If the brain hasn't seen this board state before, save it
    if (!memory) {
      this.brain.gameStates.set(this.board.key(), new GameState(availMoves));
    }

    return this.pickRandomPercentage(availMoves);
  }

  pickRandomPercentage(counts: Array<Move>): Move {
    const total = counts.reduce(
      (sum: number, move: Move) => sum + move.count,
      0
    );

    let random = Math.floor(Math.random() * total) + 1; // Random inclusive between 1 and total
    let move;
    for (let i = 0; i < counts.length; i++) {
      move = counts[i];
      if (move.count == 0) {
        continue;
      }

      if (random <= move.count) {
        return move;
      }
      random = random - move.count;
    }
    return null;
  }

  makeMove(): void {
    let move = this.determineMove();

    this.gameHistory.push(new MoveHistory(move, this.team, this.board.key()));

    this.board.setByIndex(move.index, this.team);
  }

  learnThings(winner: Team) {
    for (let move of this.gameHistory) {
      let moves = this.brain.gameStates.get(move.key).moves;
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
    this.brain.save();
  }

  getAvailableMoves(): Move[] {
    const length = this.board.squares.length;
    const moves: Move[] = [];

    for (let i = 0; i < length; i++) {
      if (this.board.squares[i] === Team.Empty) {
        moves.push(new Move(i, 3));
      }
    }

    return moves;
  }
}
