import { Board, Team } from './board';
import { MoveMaker } from './move-maker';

export class PlayProgram {
  private aiTeam: Team;
  private userTeam: Team;
  private gameEngine: MoveMaker;
  private brain: string;

  constructor(public board: Board) {
    let team = process.argv[2];

    switch (team) {
      case 'x':
      case 'X':
        this.userTeam = Team.X;
        this.aiTeam = Team.O;
        this.brain = process.argv[3] || 'teamX_brain.json';
        break;

      case 'o':
      case 'O':
        this.userTeam = Team.O;
        this.aiTeam = Team.X;
        this.brain = process.argv[3] || 'teamO_brain.json';
        break;

      default:
        process.stdout.write('Specify team, X or O\n');
        process.exit();
    }

    this.gameEngine = new MoveMaker(this.board, this.aiTeam, this.brain);

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
