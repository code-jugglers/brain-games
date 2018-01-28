import { GameState } from './game-state';

export class BrainMap {
  state: GameState[] = new Array(20000);

  constructor(initState: GameState[] = []) {
    initState.forEach((move, i) => {
      this.state[i] = move;
    });
  }

  set(key: string, state: GameState) {
    this.state[this.createHash(key)] = state;
  }

  get(key: string) {
    return this.state[this.createHash(key)];
  }

  createHash(key: string) {
    let hash = 5381;
    let i = key.length;

    while (i) {
      hash = (hash * 33) ^ key.charCodeAt(--i);
    }

    return (hash >>> 0) % 20000;
  }
}
