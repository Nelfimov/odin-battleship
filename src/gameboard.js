import {Ship} from './ship.js';

export const GameBoard = () => {
  const BOARD = new Map();

  const placeShip = (arrayStart, arrayEnd, length, board = getBoard()) => {
    if (!checkCoordinates(arrayStart, arrayEnd, length)) {
      return 'This is wrong coordinates or length';
    };

    [arrayStart, arrayEnd] = swapCoordinates(arrayStart, arrayEnd);

    // eslint-disable-next-line new-cap
    const newShip = Ship(length);
    const path = iterateThroughCoordinates(arrayStart, arrayEnd);
    board.set(newShip, []);
    path.forEach((element) => board.get(newShip).push(element));

    return newShip;
  };

  const iterateThroughCoordinates = (start, end, array = []) => {
    array.push(start);

    if (start.every((item, index) => item === end[index])) return array;

    const newStart = start.map((item, index) => {
      if (item < end[index]) return ++item;
      return item;
    });

    return iterateThroughCoordinates(newStart, end, array);
  };

  const checkCoordinates = (start, end, length) => {
    if (Math.abs(start[0] - end[0]) === (length - 1) &&
    start[1] - end[1] === 0 ||
      Math.abs(start[1] - end[1]) === (length - 1) &&
       start[0] - end[0] === 0) return true;

    return false;
  };

  const swapCoordinates = (start, end) => {
    if (start[0] > end[0]) {
      const temp = start[0];
      start[0] = end[0];
      end[0] = temp;
    };
    if (start[1] > start[1]) {
      const temp = start[1];
      start[1] = end[1];
      end[1] = temp;
    };
    return [start, end];
  };

  const receiveAttack = (coordinates, board = getBoard()) => {
    let message;
    let status = false;

    if (checkIfAlreadyHit(coordinates, board)) {
      message = 'You missed!';
      return {status, message, ship: null};
    };
    Ship;
    let hittedShip;

    outer: for (const key of board.keys()) {
      for (const value of board.get(key)) {
        if (value.every((item, index) => item == coordinates[index])) {
          hittedShip = key;
          status = true;
          message = 'GOTCHA';
          hittedShip.hit();
          board.get(null).push(coordinates);
          break outer;
        };
      };
    };

    return {status, message, ship: hittedShip};
  };

  const checkIfAlreadyHit = (coordinates, board = getBoard()) => {
    if (!board.get(null)) return false;
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

  return {receiveAttack, placeShip, checkCoordinates,
    iterateThroughCoordinates, getBoard, getShipsLeft};
};
