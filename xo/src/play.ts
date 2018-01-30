import * as path from 'path';

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
        this.brain = path.resolve(
          __dirname,
          '../',
          process.argv[3] || 'teamO_brain.json'
        );
        break;

      case 'o':
      case 'O':
        this.userTeam = Team.O;
        this.aiTeam = Team.X;
        this.brain = path.resolve(
          __dirname,
          '../',
          process.argv[3] || 'teamX_brain.json'
        );
        break;

      default:
        process.stdout.write('Specify team, X or O\n');
        process.exit();
    }

    this.gameEngine = new MoveMaker(this.board, this.aiTeam, this.brain);

    if (this.aiTeam == Team.X) {
      this.gameEngine.makeMove();
    }

    this.tick();

    this.printPrompt();

    process.stdin.resume();
    process.stdin.setEncoding('utf8');
    process.stdin.on('data', (txt: string) => this.onMoveReceived(txt));
  }

  tick() {
    this.board.print();

    const winner = this.board.determineWinner();

    if (winner !== Team.Empty) {
      process.stdout.write(`Team ${winner} Wins! \n`);

      this.gameEngine.learnThings(winner);

      this.gameEngine.saveBrain();

      process.exit();
    }
  }

  private onMoveReceived(txt: string) {
    const data = txt.split(',');
    const col = Number(data[0]);
    const row = Number(data[1]);

    const space = this.board.squares[row * 3 + col];

    if (space === Team.Empty) {
      this.board.set(row, col, this.userTeam);

      this.tick();

      this.gameEngine.makeMove();

      this.tick();

      this.printPrompt();
    } else {
      process.stdout.write(
        `Space ${txt} is already taken by ${space}. Please try again \n`
      );

      this.printPrompt();
    }
  }

  private printPrompt() {
    process.stdout.write(`Team ${this.userTeam}: `);
  }
}

new PlayProgram(new Board());
