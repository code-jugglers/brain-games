import { Board, Team } from './board';
import { MoveMaker } from './move-maker';

export class Program {
  constructor(public board: Board, private team: Team) {
    this.displayState();

    process.stdin.resume();
    process.stdin.setEncoding('utf8');

    process.stdin.on('data', (txt: string) => this.onMoveReceived(txt));
  }

  gameEngine = new MoveMaker(this.board);

  displayState() {
    this.board.print();

    const winner = this.gameEngine.chooseWinner();

    if (winner === Team.E) {
      process.stdout.write(`Team ${this.team}: `);
    } else {
      process.stdout.write(`Team ${winner} Wins! \n`);
      process.exit();
    }
  }

  private onMoveReceived(txt: string) {
    const data = txt.split(',');

    this.board.set(Number(data[0]), Number(data[1]), this.team);

    this.team = this.team === Team.X ? Team.O : Team.X;

    this.displayState();
  }
}
