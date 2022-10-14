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
    transition: width 0.3s;
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
    player = JSON.parse(localStorage.getItem('player-name'));
    if (player) {
      player = Player(player);
      document.getElementById('subheadline-1').textContent = player.name;
      return;
    };

    DOMsetup.createModal();

    document.getElementById('create-name').addEventListener('click', () => {
      const inputValue = document.getElementById('input-name').value;
      player = Player(`${inputValue}`);
      localStorage.setItem('player-name', JSON.stringify(player.name));
      document.getElementById('subheadline-1').textContent = player.name;
    });

    document.getElementById('input-name').addEventListener('keyup', (e) => {
      if (e.key === 'Enter') {
        const inputValue = document.getElementById('input-name').value;
        player = Player(`${inputValue}`);
        localStorage.setItem('player-name', JSON.stringify(player.name));
        document.getElementById('subheadline-1').textContent = player.name;
      };
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
    addPlaceEvents(5);
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

        if (opponentGameBoard.checkShipForCollisions(path)) {
          break inner;
        };
      };
      opponentGameBoard.placeShip(start, isHorizontal, i);
    };

    return DOMsetup.placeShips(playerGameBoard);
  };

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
      if (result.status) DOMsetup.placeShips(playerGameBoard);

      cells = document.querySelectorAll('div[player-data="player"]>div');

      cells.forEach((cell) => {
        cell.removeEventListener('mouseover', placeShipHover);
        cell.removeEventListener('mouseout', placeShipNoHover);
        cell.removeEventListener('click', placeShipClick);
      });
      if (length > 2) addPlaceEvents(length - 1);
    };

    cells.forEach((cell) => {
      cell.addEventListener('mouseover', placeShipHover);
      cell.addEventListener('mouseout', placeShipNoHover);
      cell.addEventListener('click', placeShipClick);
    });
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
