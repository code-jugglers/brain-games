export enum Team {
  X = 'X',
  O = 'O',
  E = '.'
}

export class Board {
  squares: Team[] = [
    Team.E,
    Team.E,
    Team.E,
    Team.E,
    Team.E,
    Team.E,
    Team.E,
    Team.E,
    Team.E
  ];

  set(row: number, col: number, team: Team) {
    const i = row * 3 + col;

    this.squares[i] = team;
  }

  setByIndex(index: number, team: Team) {
    this.squares[index] = team;
  }

  key() {
    return this.squares.join('');
  }

  print() {
    const board = this.squares.reduce((b: string, team: Team, i: number) => {
      if (!(i % 3)) {
        b += '\n';
      }

      b += team + ' ';

      return b;
    }, '');

    console.log(board + '\n');
  }
}
