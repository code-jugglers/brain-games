import { Board, Team } from './board';
import { MoveMaker } from './move-maker';

export class Program {
  gameEngine = new MoveMaker(this.board, Team.X);

  constructor(public board: Board) {
    this.gameEngine.makeMove();

    this.displayState();

    process.stdin.resume();
    process.stdin.setEncoding('utf8');
    process.stdin.on('data', (txt: string) => this.onMoveReceived(txt));
  }

  displayState() {
    this.board.print();

    const winner = this.gameEngine.chooseWinner();

    if (winner === Team.E) {
      process.stdout.write(`Team ${Team.O}: `);
    } else {
      process.stdout.write(`Team ${winner} Wins! \n`);

      this.gameEngine.learnThings(winner);

      this.gameEngine.saveBrain();

      process.exit();
    }
  }

  private onMoveReceived(txt: string) {
    const data = txt.split(',');
    const row = Number(data[0]);
    const col = Number(data[1]);

    const space = this.board.squares[row * 3 + col];

    if (space === Team.E) {
      this.board.set(row, col, Team.O);

      this.displayState();

      this.gameEngine.makeMove();

      this.displayState();
    } else {
      process.stdout.write(
        `Space ${txt} is already taken by ${space}. Please try again \n`
      );
    }
  }
}

new Program(new Board());
