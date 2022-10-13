/* eslint-disable new-cap */
import {Ship} from './ship.js';

export const GameBoard = () => {
  const BOARD = new Map();

  const placeShip = (start, isHorizontal, length, board = getBoard()) => {
    const path = iterateThroughCoordinates(start, isHorizontal, length);

    if (!checkShipForCollisions(path)) {
      return {status: false, ship: null, message: 'Collision'};
    };

    const newShip = Ship(length);
    board.set(newShip, path);
    return {status: true, ship: newShip, message: 'Ship places'};
  };

  const iterateThroughCoordinates = (start, isHorizontal, length) => {
    const array = [];
    array.push(start);

    let i = 1;
    while (i < length) {
      if (isHorizontal) {
        array.push([start[0] + i, start[1]]);
      } else {
        array.push([start[0], start[1] + i]);
      };
      ++i;
    };

    return array;
  };

  const checkShipForCollisions = (array, board = getBoard()) => {
    let status = true;
    array.forEach((item) => {
      if (item[0] > 10 || item[1] > 10) {
        status = false;
        return;
      };
    });

    for (const shipTarget of array) {
      for (const ship of board.keys()) {
        if (!ship) continue;

        for (const coordinate of board.get(ship)) {
          if (coordinate.every((item, index) => item === shipTarget[index])) {
            status = false;
            break;
          };
        };
      };
    };

    return status;
  };

  const receiveAttack = (coordinates, board = getBoard()) => {
    let message = 'You missed!';
    let status = false;

    if (checkIfAlreadyHit(coordinates, board)) {
      return {status, message, ship: null};
    };
    let ship;

    outer: for (const key of board.keys()) {
      if (key === null) continue;
      for (const value of board.get(key)) {
        if (value.every((item, index) => item == coordinates[index])) {
          ship = key;
          status = true;
          message = 'GOTCHA';
          ship.hit();
          break outer;
        };
      };
    };

    board.get(null).push(coordinates);
    return {status, message, ship};
  };

  const checkIfAlreadyHit = (coordinates, board = getBoard()) => {
    if (board.get(null) != undefined) return false;

    for (const value of board.get(null)) {
      if (value.every((item, index) => item === coordinates[index])) {
        return true;
      };
    };
  };

  const getShipsLeft = (board = getBoard()) => {
    const shipsLeft = new Map();
    let status = false;
    let message = 'There are no ships left';

    for (const ship of board.keys()) {
      if (!ship) continue;

      if (!ship.isSunk()) {
        shipsLeft.set(ship, board.get(ship));
        message = 'Some ships are still there';
        status = true;
      };
    };

    return {status, message, shipsLeft};
  };

  const getBoard = () => {
    const hits = BOARD.get(null);
    if (!hits) BOARD.set(null, []);
    return BOARD;
  };

  return {receiveAttack, placeShip, checkShipForCollisions,
    iterateThroughCoordinates, getBoard, getShipsLeft};
};

export default GameBoard;
