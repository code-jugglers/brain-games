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
    const board = this.squares.reduce(
      (board: string, team: Team, i: number) => {
        if (!(i % 3)) {
          board += '\n';
        }

        board += team + ' ';

        return board;
      },
      ''
    );

    console.log(board + '\n');
  }
}
