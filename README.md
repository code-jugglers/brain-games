# xo

To install: `npm i`

To build: `npm run build`

To Play Tic Tac Toe: `node build/play X teamO_brain_50000000.json`

- 1st Argument is the player you want to be. Can either be X or O
- 2nd Argument is the brain you want to play. Default is teamO_brain.json

To Train the Brains: `node build/train 1000`

- 1st Argument is the number of iterations. default is 50000
- 2nd Argument is the brain for X. Default is teamX_brain.json
- 3rd Argument is the brain for O. Default is teamO_brain.json

For Dev: `npm start`
