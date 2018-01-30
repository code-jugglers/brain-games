import { Board } from '@games/shared';

export enum Team {
  X = 'X',
  B = 'O',
  Empty = '.',
  CAT = 'CAT' // Tie
}

export class C4Board extends Board {
  constructor() {
    super(6, 7);
  }

  determineWinner() {}
}
