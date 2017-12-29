import { Board, Team } from './board';

export class Program {
  constructor(public board: Board, private team: Team) {
    this.displayState();

    process.stdin.resume();
    process.stdin.setEncoding('utf8');

    process.stdin.on('data', (txt: string) => this.onMoveReceived(txt));
  }

  displayState() {
    this.board.print();

    process.stdout.write(`Team ${this.team}: `);
  }

  private onMoveReceived(txt: string) {
    const data = txt.split(',');

    this.board.set(Number(data[0]), Number(data[1]), this.team);

    this.team = this.team === Team.X ? Team.O : Team.X;

    this.displayState();
  }
}
