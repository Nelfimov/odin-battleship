/* eslint-disable new-cap */
import {DOMsetup} from './dom.js';
import {Player} from '/src/player.js';
import {GameBoard} from '/src/gameboard.js';

const player = Player('Jack');
const ai = Player('AI', true);

const playerGameBoard = GameBoard();
playerGameBoard.placeShip([1, 1], [1, 3], 3);
playerGameBoard.placeShip([2, 5], [4, 5], 3);

const aiGameBoard = GameBoard();
aiGameBoard.placeShip([2, 1], [4, 1], 3);
aiGameBoard.placeShip([2, 1], [4, 1], 3);

window.onload = () => {
  DOMsetup.init();
  DOMsetup.placeShips(playerGameBoard);
};
