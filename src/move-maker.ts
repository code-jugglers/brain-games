import { Board, Team } from './board';
import { GameStates, GameState, Move } from './game-state';
import { GameStateGenerator } from 'game-state-generator';

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

  getMoves(): Move[] {
    const state = this.brain.gameStates[this.board.key()];

    if (!state) {
      this.brain.gameStates[this.board.key()] = {
        moves: []
      };
    }

    return this.brain.gameStates[this.board.key()].moves;
  }

  determineMove(): Move {
    // based on probability, select the best available move for the given team

    const memory = this.brain.gameStates[this.board.key()];

    const moveDecision = this.getAvailableMoves().reduce(
      (decider: Move[], move: Move) => {
        // Check if brain has encountered this state before and if they have a move for the given available move
        if (memory) {
          const memoryMove = memory.moves
            .filter(mm => mm.count > 0)
            .find(mm => mm.index === move.index);

          if (memoryMove) {
            return decider.concat(
              new Array(memoryMove.count).fill(memoryMove, 0, memoryMove.count)
            );
          }
        }

        return decider.concat(new Array(move.count).fill(move, 0, move.count));
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
    this.gameHistory.forEach(move => {
      const state = this.brain.gameStates[move.key];
      const moves = state ? state.moves : [];

      const foo = moves.find(
        brainMove => brainMove.index === move.squarePick.index
      );

      if (foo) {
        foo.count += winner === this.team ? 3 : winner === Team.CAT ? 0 : -1;
      } else {
        move.squarePick.count = 3;

        moves.push(move.squarePick);
      }

      this.brain.gameStates[move.key] = { moves };
    });
  }

  saveBrain() {
    this.brain.save();
  }

  getAvailableMoves(): Move[] {
    return this.board.squares
      .map((square, index) => ({ square, index }))
      .filter((space, index) => space.square === Team.Empty)
      .map(space => new Move(space.index, 3));
  }
}
