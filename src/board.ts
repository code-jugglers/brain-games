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

  determineWinner() {
    const squares = this.squares;
    let winner: Team = Team.E;

    if (squares[0] === squares[1] && squares[1] === squares[2]) {
      return squares[0];
    } else if (squares[3] === squares[4] && squares[4] === squares[5]) {
      return squares[3];
    } else if (squares[6] === squares[7] && squares[7] === squares[8]) {
      return squares[6];
    } else if (squares[0] === squares[3] && squares[3] === squares[6]) {
      return squares[0];
    } else if (squares[1] === squares[4] && squares[4] === squares[7]) {
      return squares[1];
    } else if (squares[2] === squares[5] && squares[5] === squares[8]) {
      return squares[2];
    } else if (squares[0] === squares[4] && squares[4] === squares[8]) {
      return squares[0];
    } else if (squares[2] === squares[4] && squares[4] === squares[6]) {
      return squares[2];
    } else if (squares.every(square => square !== Team.E)) {
      return Team.CAT;
    } else {
      return Team.E;
    }
  }
}
