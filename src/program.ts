import { Board, Team } from './board';
import { MoveMaker } from './move-maker';

export class Program {
  constructor(public board: Board, private team: Team) {
    this.gameEngine.makeMove();
    this.team = Team.O;

    this.displayState();

    process.stdin.resume();
    process.stdin.setEncoding('utf8');

    process.stdin.on('data', (txt: string) => this.onMoveReceived(txt));
  }

  gameEngine = new MoveMaker(this.board, Team.X);

  displayState() {
    this.board.print();

    const winner = this.gameEngine.chooseWinner();

    if (winner === Team.E) {
      process.stdout.write(`Team ${this.team}: `);
    } else {
      process.stdout.write(`Team ${winner} Wins! \n`);
      this.gameEngine.learnThings(winner);
      this.gameEngine.saveBrain();
      process.exit();
    }
  }

  private onMoveReceived(txt: string) {
    const data = txt.split(',');

    this.board.set(Number(data[0]), Number(data[1]), Team.O);

    this.displayState();

    this.gameEngine.makeMove();

    this.displayState();
  }
}
