# "Brain" games

To install: `npm i`

## Games

### Tic Tac Toe

To build: `npm run build:xo`

To Play Tic Tac Toe: `node xo/build/play X`

* 1st Argument is the player you want to be. Can either be X or O
* 2nd Argument is the brain you want to play. Default is teamO_brain.json (an untrained brain)

To Train the Brains: `node xo/build/train 1000000`

* 1st Argument is the number of iterations. default is 50000
* 2nd Argument is the brain for X. Default is teamX_brain.json
* 3rd Argument is the brain for O. Default is teamO_brain.json

For Dev: `npm run start:xo`

## Explaination:

[![Alt text](https://img.youtube.com/vi/R9c-_neaxeU/0.jpg)](https://www.youtube.com/watch?v=R9c-_neaxeU)

### Connect 4

To build: `npm run build:c4`
For Dev: `npm run start:c4`
