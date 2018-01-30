import { GameState } from './game-state';

export class BrainMap {
  constructor(public state: { [key: string]: GameState } = {}) {}

  set(key: string, state: GameState) {
    this.state[key] = state;
  }

  get(key: string) {
    return this.state[key];
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
