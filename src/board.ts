export enum Team {
  X = 'X',
  O = 'O',
  E = '.',
  CAT = 'CAT'
}

export class Board {
  private spaces: Team[] = new Array(9).fill(Team.E);

  get squares() {
    return [...this.spaces];
  }

  set(row: number, col: number, team: Team) {
    const i = row * 3 + col;

    this.spaces[i] = team;
  }

  setByIndex(index: number, team: Team) {
    this.spaces[index] = team;
  }

  key() {
    return this.spaces.join('');
  }

  print() {
    const board = this.spaces.reduce((b: string, team: Team, i: number) => {
      if (!(i % 3)) {
        b += '\n';
      }

      b += team + ' ';

      return b;
    }, '');

    console.log(board + '\n');
  }
}
