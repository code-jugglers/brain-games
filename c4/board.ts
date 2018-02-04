export enum Team {
  X = 'X',
  O = 'O',
  Empty = '.',
  CAT = 'CAT'
}

export class Board {
  private readonly rows = 6;
  private readonly cols = 7;
  private readonly spaces: Team[] = new Array(this.rows * this.cols).fill(
    Team.Empty
  );

  get squares() {
    return [...this.spaces];
  }

  set(row: number, col: number, team: Team) {
    this.setByIndex(row * this.cols + col, team);
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

  determineWinner() {
    let winner: Team;

    // check rows
    for (let i = 0; i < this.cols; i++) {
      const rowStart = i * this.rows;
      const rowEnd = rowStart + this.rows + 1;
      const row = this.spaces.slice(rowStart, rowEnd);

      winner = this.checkList(row);

      if (winner) {
        return winner;
      }
    }

    // check columns
    for (let i = 0; i < this.cols; i++) {
      const col = [];

      for (let x = 0; x < this.rows; x++) {
        col.push(this.spaces[x * this.cols + i]);
      }

      winner = this.checkList(col);

      if (winner) {
        return winner;
      }
    }
  }

  private checkList(spaces: Team[]) {
    if (spaces.join('').indexOf('XXXX') > -1) {
      return Team.X;
    } else if (spaces.join('').indexOf('OOOO') > -1) {
      return Team.O;
    }
  }
}
