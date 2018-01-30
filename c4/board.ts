export enum Team {
  X = 'X',
  B = 'O',
  Empty = '.',
  CAT = 'CAT' // Tie
}

export class Board {
  private readonly rows = 6;
  private readonly cols = 7;
  private spaces: Team[] = new Array(this.rows * this.cols).fill(Team.Empty);

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

  determineWinner() {}
}
