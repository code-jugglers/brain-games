export enum Team {
  X = 'X',
  O = 'O',
  Empty = '.',
  CAT = 'CAT'
}

export class Board {
  public readonly rows = 6;
  public readonly cols = 7;
  private readonly spaces: Team[] = new Array(this.rows * this.cols).fill(
    Team.Empty
  );

  get squares() {
    return [...this.spaces];
  }

  set(row: number, col: number, team: Team): void {
    this.setByIndex(row * this.cols + col, team);
  }

  get(row: number, col: number): Team {
    return this.spaces[row * this.cols + col];
  }

  setByIndex(index: number, team: Team): void {
    this.spaces[index] = team;
  }

  setByColumn(col: number, team: Team): void {
    for (let row = this.rows - 1; row >= 0; row--) {
      let index = row * this.cols + col;
      if (this.spaces[index] === Team.Empty) {
        this.spaces[index] = team;
        return;
      }
    }
  }

  key(): string {
    return this.spaces.join('');
  }

  print(): void {
    const board = this.spaces.reduce((b: string, team: Team, i: number) => {
      if (!(i % this.cols)) {
        b += '\n';
      }

      b += team + ' ';

      return b;
    }, '');

    console.log(board + '\n');
  }

  determineWinner(): Team {
    let winner = Team.CAT;

    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        let team = this.get(row, col);
        // If the space under test is empty, move on
        if (team == Team.Empty) {
          winner = Team.Empty;
          continue;
        }

        if (col + 3 < this.cols) {
          if (
            team === this.get(row, col + 1) &&
            team === this.get(row, col + 2) &&
            team === this.get(row, col + 3)
          ) {
            return team;
          }
        }

        if (row + 3 < this.rows) {
          if (
            team == this.get(row + 1, col) &&
            team == this.get(row + 2, col) &&
            team == this.get(row + 3, col)
          ) {
            return team;
          }
        }

        if (row + 3 < this.rows && col + 3 < this.cols) {
          if (
            team == this.get(row + 1, col + 1) &&
            team == this.get(row + 2, col + 2) &&
            team == this.get(row + 3, col + 3)
          ) {
            return team;
          }
        }

        if (row + 3 < this.rows && col - 3 >= 0) {
          if (
            team == this.get(row + 1, col - 1) &&
            team == this.get(row + 2, col - 2) &&
            team == this.get(row + 3, col - 3)
          ) {
            return team;
          }
        }
      }
    }
    return winner;
  }
}
