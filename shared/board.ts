import { Team } from './team';

export class Board {
  protected spaces: Team[] = new Array(this.rows * this.cols).fill(Team.Empty);

  constructor(private rows: number, private cols: number) {}

  get squares() {
    return [...this.spaces];
  }

  set(row: number, col: number, team: Team) {
    this.setByIndex(row * this.rows + col, team);
  }

  setByIndex(index: number, team: Team) {
    this.spaces[index] = team;
  }

  key() {
    return this.spaces.join('');
  }

  print() {
    const board = this.spaces.reduce((b: string, team: Team, i: number) => {
      if (!(i % this.cols)) {
        b += '\n';
      }

      b += team + ' ';

      return b;
    }, '');

    console.log(board + '\n');
  }
}
