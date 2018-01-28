import { Board, Team } from './board';
import { GameStates, GameState, Move } from './game-state';

export class MoveHistory {
  constructor(public squarePick: Move, public team: Team, public key: string) {}
}

export class MoveMaker {
  private gameHistory: MoveHistory[] = [];
  private brain = new GameStates(this.brainConfig);

  constructor(
    private board: Board,
    private team: Team,
    private brainConfig: string
  ) {}

  reset(board: Board) {
    this.board = board;

    this.gameHistory = [];
  }

  determineMove(): Move {
    // based on probability, select the best available move for the given team
    const memory = this.brain.gameStates.get(this.board.key());
    const memoryLength = memory ? memory.moves.length : 0;
    let moveDecision = this.getAvailableMoves();

    if (memory) {
      for (let i = 0; i < memoryLength; i++) {
        const m = memory.moves[i];

        moveDecision = moveDecision.concat(new Array(m.count).fill(m));
      }
    }

    return moveDecision[Math.floor(Math.random() * moveDecision.length)];
  }

  makeMove(): void {
    let move = this.determineMove();

    this.gameHistory.push(new MoveHistory(move, this.team, this.board.key()));

    this.board.setByIndex(move.index, this.team);
  }

  learnThings(winner: Team) {
    const length = this.gameHistory.length;

    for (let i = 0; i < length; i++) {
      const move = this.gameHistory[i];
      const state = this.brain.gameStates.get(move.key);
      const moves = state ? state.moves : [];

      const memory = moves.find(
        brainMove => brainMove.index === move.squarePick.index
      );

      if (memory) {
        if (winner === this.team) {
          memory.count += 3;
        } else if (winner !== Team.CAT) {
          memory.count += memory.count ? -1 : 0;
        }
      } else {
        move.squarePick.count = 3;

        moves.push(move.squarePick);
      }

      this.brain.gameStates.set(move.key, { moves });
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
