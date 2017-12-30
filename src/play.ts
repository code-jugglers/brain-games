import { Board, Team } from './board';
import { MoveMaker } from './move-maker';

export class PlayProgram {
  aiTeam: Team;
  userTeam: Team;
  gameEngine: MoveMaker;

  constructor(public board: Board) {
    if (process.argv.length === 2) {
      process.stdout.write('Specify team, X or O\n');
      process.exit();
    }

    let team = process.argv[2];

    switch (team) {
      case 'x':
      case 'X':
        this.userTeam = Team.X;
        this.aiTeam = Team.O;
        break;

      case 'o':
      case 'O':
        this.userTeam = Team.O;
        this.aiTeam = Team.X;
        break;

      default:
        process.stdout.write('Specify team, X or O\n');
        process.exit();
    }

    this.gameEngine = new MoveMaker(this.board, this.aiTeam);

    if (this.aiTeam == Team.X) {
      this.gameEngine.makeMove();
    }

    this.displayState();

    this.printPrompt();

    process.stdin.resume();
    process.stdin.setEncoding('utf8');
    process.stdin.on('data', (txt: string) => this.onMoveReceived(txt));
  }

  displayState() {
    this.board.print();

    const winner = this.gameEngine.chooseWinner();

    if (winner !== Team.E) {
      process.stdout.write(`Team ${winner} Wins! \n`);

      this.gameEngine.learnThings(winner);

      this.gameEngine.saveBrain();

      process.exit();
    }
  }

  printPrompt() {
    process.stdout.write(`Team ${this.userTeam}: `);
  }

  private onMoveReceived(txt: string) {
    const data = txt.split(',');
    const row = Number(data[0]);
    const col = Number(data[1]);

    const space = this.board.squares[row * 3 + col];

    if (space === Team.E) {
      this.board.set(row, col, this.userTeam);

      this.displayState();

      this.gameEngine.makeMove();

      this.displayState();

      this.printPrompt();
    } else {
      process.stdout.write(
        `Space ${txt} is already taken by ${space}. Please try again \n`
      );

      this.printPrompt();
    }
  }
}

new PlayProgram(new Board());
