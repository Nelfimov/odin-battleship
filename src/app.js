/* eslint-disable new-cap */
import hitIcon from '/src/assets/hit1.svg';
import missIcon from '/src/assets/hit2.svg';
import GameBoard from '/src/gameboard.js';
import Player from '/src/player.js';
import DOMsetup from '/src/dom.js';
import {css} from '@emotion/css';

const Game = () => {
  const imgMissStyle = css`
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 100%;
  `;
  const imgHitStyle = css`
    display: block;
    filter: invert();
    margin-left: auto;
    margin-right: auto;
    width: 100%;
  `;

  let playerGameBoard = GameBoard();
  let opponentGameBoard = GameBoard();

  let player;
  const ai = Player('ai', false);
  ai.switchTurn();

  const createNewPlayer = () => {
    player = Player(JSON.parse(localStorage.getItem('player-name')).name);
    if (player) {
      document.getElementById('subheadline-1').textContent = player.name;
      return;
    };

    DOMsetup.createModal();
    document.getElementById('create-name').addEventListener('click', () => {
      const inputValue = document.getElementById('input-name').value;
      player = Player(`${inputValue}`);
      localStorage.setItem('player-name', JSON.stringify(player));
      document.getElementById('subheadline-1').textContent = player.name;
    });
  };

  const createNewGame = () => {
    document.body.innerHTML = '';
    playerGameBoard = GameBoard();
    opponentGameBoard = GameBoard();
    DOMsetup.init();
    createNewPlayer();
    placeShips();
    addAttackEvents();
    document.getElementById('reset')
        .addEventListener('click', () => createNewGame());
  };

  const placeShips = () => {
    playerGameBoard.placeShip([1, 1], [1, 3], 3);
    playerGameBoard.placeShip([2, 5], [4, 5], 3);

    opponentGameBoard.placeShip([2, 2], [4, 2], 3);
    opponentGameBoard.placeShip([1, 1], [3, 1], 3);
    return DOMsetup.placeShips(playerGameBoard);
  };

  const flow = () => {
    player.switchTurn();
    ai.switchTurn();
    if (!ai.getTurn()) return;

    const coordinates = ai.makeRandomMove(playerGameBoard.getBoard().get(null));

    const result = attack(coordinates, playerGameBoard);
    const cell = document
        .getElementById(`player-${coordinates[0]}-${coordinates[1]}`);

    attackDOMManipulation(result, cell);


    DOMsetup.changeContentHeadline(`AI: ${result.message}`);
    if (!checkForWinner(playerGameBoard)) {
      player.switchTurn();
      ai.switchTurn();
    };
  };

  const addAttackEvents = () => {
    const opponentCells = document
        .querySelectorAll('div[player-data="opponent"]>div');

    opponentCells.forEach((item) => {
      item.addEventListener('click', clickAttack, {once: true});
    });
  };

  const clickAttack = (e) => {
    const coordinates = e.target.id.split('-');
    const result = attack([coordinates[1], coordinates[2]],
        opponentGameBoard);
    attackDOMManipulation(result, e.target);
    if (!checkForWinner(opponentGameBoard)) flow();
  };

  const attack = (coordinates, board) => {
    const result = board.receiveAttack(coordinates);
    return result;
  };


  const checkForWinner = (board) => {
    if (!board.getShipsLeft().status) {
      DOMsetup.changeContentHeadline(`WINNER`);
      document.querySelectorAll('div[player-data="opponent"]>div')
          .forEach((node) => {
            node.removeEventListener('click', clickAttack);
          });
      return true;
    };
    return false;
  };

  const attackDOMManipulation = (result, cell) => {
    const img = new Image();
    img.src = missIcon;
    result.status ? img.src = hitIcon: img.src = missIcon;
    if (cell.id.split('-')[0] === 'opponent') {
      img.className = imgMissStyle;
    } else {
      result.status ? img.className = imgHitStyle :
         img.className = imgMissStyle;
    };
    cell.append(img);
    DOMsetup.changeContentHeadline(`Player: ${result.message}`);
  };

  return {createNewGame};
};

export default Game;
