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

  print() {
    let board = '';

    for (let i = 0; i < this.squares.length; i++) {
      if (!(i % 3)) {
        board += '\n';
      }

      board += this.squares[i] + ' ';
    }

    board += '\n';

    console.log(board);
  }
}
