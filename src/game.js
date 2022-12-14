/* eslint-disable new-cap */
import GameBoard from '/src/gameboard.js';
import Player from '/src/player.js';
import DOMsetup from '/src/dom.js';
import {css} from '@emotion/css';


const Game = () => {
  let playerGameBoard = GameBoard();
  let opponentGameBoard = GameBoard();

  let player;
  const ai = Player('AI', false);
  ai.switchTurn();

  const createNewPlayer = () => {
    player = JSON.parse(localStorage.getItem('player-name'));
    if (player) {
      player = Player(player);
      document.getElementById('subheadline-1').textContent = player.name;
      return;
    };

    player = Player(DOMsetup.createModal());
  };

  const createNewGame = () => {
    document.body.innerHTML = '';
    playerGameBoard = GameBoard();
    opponentGameBoard = GameBoard();
    DOMsetup.init();
    createNewPlayer();
    placeShips();
    document.getElementById('reset')
        .addEventListener('click', () => createNewGame());
  };

  const placeShips = () => {
    /* Placing players ships */
    addPlaceEvents(5);
    /* Opponent random ships */
    placeShipsRandom();
    return DOMsetup.placeShips(playerGameBoard);
  };

  const placeShipsRandom = () => {
    for (let i = 2; i < 6; ++i) {
      let start;
      let isHorizontal;
      const coin = Math.random();
      if (coin < 0.5) {
        isHorizontal = true;
      } else {
        isHorizontal = false;
      };
      inner: while (true) {
        start = [Math.floor(Math.random() * 10 + 1),
          Math.floor(Math.random() * 10 + 1)];

        const path = opponentGameBoard
            .iterateThroughCoordinates(start, isHorizontal, i);

        if (opponentGameBoard.checkShipForCollisions(path)) break inner;
      };
      opponentGameBoard.placeShip(start, isHorizontal, i);
    };
  };

  /* Adding event listener to player gameboard for placing ships */
  const addPlaceEvents = (length) => {
    let cells = document.querySelectorAll('div[player-data="player"]>div');
    let oldCells;
    let start;
    let direction;
    const placeShipHover = (e) => {
      const [, x, y] = [...e.target.id.split('-')];
      start = [x, y];
      direction = document.getElementById('flip')
          .getAttribute('flip-data');
      if (direction === 'horizontal') {
        direction = true;
      } else {
        direction = false;
      }
      const path = playerGameBoard
          .iterateThroughCoordinates(
              [x, y], direction, length);
      const fits = playerGameBoard.checkShipForCollisions(path);
      oldCells = DOMsetup.highlightShipPlacement(path, fits);
    };

    const placeShipNoHover = () => {
      if (!oldCells) return;
      const style = css`
        background-color: white;
        box-sizing: border-box;
        border: 0.1px dotted grey;
        height: 10%;
        width: 10%;
        &:hover {
          border: 1px solid grey;
          background-color: #e6e4df;
        }
      `;
      oldCells.forEach((oldCell) => {
        const tempCell = document
            .getElementById(`player-${oldCell[0]}-${oldCell[1]}`);
        if (!tempCell) return;
        tempCell.className = style;
      });
      DOMsetup.placeShips(playerGameBoard);
    };

    const placeShipClick = () => {
      const result = playerGameBoard.placeShip(start, direction, length);

      if (result.status) {
        DOMsetup.placeShips(playerGameBoard);
        if (length > 2) {
          DOMsetup.changeContentHeadline('Ship placed. Place another');
        } else {
          DOMsetup.changeContentHeadline('All ships placed. FIGHT!');
        };
      } else {
        DOMsetup.changeContentHeadline('Cannot place ship here');
        return;
      }

      cells = document.querySelectorAll('div[player-data="player"]>div');

      cells.forEach((cell) => {
        cell.removeEventListener('mouseover', placeShipHover);
        cell.removeEventListener('mouseout', placeShipNoHover);
        cell.removeEventListener('click', placeShipClick);
      });

      if (length > 2) {
        return addPlaceEvents(length - 1);
      } else {
        return addAttackEvents();
      };
    };

    cells.forEach((cell) => {
      cell.addEventListener('mouseover', placeShipHover);
      cell.addEventListener('mouseout', placeShipNoHover);
      cell.addEventListener('click', placeShipClick);
    });
  };


  /* Game flow */
  let hitCell;
  const flow = () => {
    player.switchTurn();
    ai.switchTurn();
    if (!ai.getTurn()) return;

    let coordinates;
    if (hitCell === undefined) {
      coordinates = ai.makeRandomMove(
          playerGameBoard.getBoard().get(null),
      );
    } else {
      coordinates = ai.makeRandomMove(
          playerGameBoard.getBoard().get(null), true, hitCell,
      );
    };

    const result = attack(coordinates, playerGameBoard);
    if (result.status) {
      hitCell = coordinates;
    };
    const cell = document
        .getElementById(`player-${coordinates[0]}-${coordinates[1]}`);

    DOMsetup.attackDOMManipulation(result, cell, ai.name);

    if (!checkForWinner(playerGameBoard)) {
      player.switchTurn();
      ai.switchTurn();
      addAttackEvents();
    };
  };

  const addAttackEvents = () => {
    const opponentCells = document
        .querySelectorAll('div[player-data="opponent"]>div');

    opponentCells.forEach((item) => {
      item.addEventListener('click', clickAttack, {once: true, capture: true});
    });
  };

  const clickAttack = (e) => {
    const [, x, y] = e.target.id.split('-');

    if (!x || !y || opponentGameBoard.checkIfAlreadyHit([x, y]).status) {
      DOMsetup.changeContentHeadline('You already hit here');
      return;
    };

    const result = attack([x, y], opponentGameBoard);
    DOMsetup.attackDOMManipulation(result, e.target, player.name);

    document.querySelectorAll('div[player-data="opponent"]>div')
        .forEach((cell) => {
          cell.removeEventListener(
              'click', clickAttack, {once: true, capture: true},
          );
        });

    if (!checkForWinner(opponentGameBoard)) {
      setTimeout(flow, 1000);
    };
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

  return {createNewGame};
};

export default Game;
