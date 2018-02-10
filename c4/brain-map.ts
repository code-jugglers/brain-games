import { GameState } from './game-state';

export class BrainMap {
  constructor(public state: { [key: string]: GameState } = {}) {}

  set(key: string, state: GameState) {
    this.state[key] = state;
  }

  get(key: string) {
    return this.state[key];
  }
}
