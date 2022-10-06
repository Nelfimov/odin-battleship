import { Ship } from "./ship.js";

export const GameBoard = () => {
  const BOARD = new Map();

  const placeShip = (arrayStart, arrayEnd, length, board = BOARD) => {
    if (!checkCoordinates(arrayStart, arrayEnd, length)) {
      return 'This is wrong coordinates or length';
    };

    [arrayStart, arrayEnd] = swapCoordinates(arrayStart, arrayEnd);

    const newShip = Ship(length);
    if (arrayStart[0] !== arrayEnd[0]) {
      while (arrayStart[0] <= arrayEnd[0]) {
        board.set([arrayStart[0], arrayStart[1]], newShip);
        ++arrayStart[0];
      };

    } else {
      while (arrayStart[1] <= arrayEnd[1]) {
        board.set([arrayStart[0], arrayStart[1]], newShip);
        ++arrayStart[1];
      };

    };

    return BOARD.get(arrayStart);
  };

  const checkCoordinates = (start, end, length) => {
    if (Math.abs(start[0] - end[0]) === (length - 1) && start[1] - end[1] === 0
      || Math.abs(start[1] - end[1]) === (length - 1) && start[0] - end[0] === 0) return true;

    return false;
  };

  const swapCoordinates = (start, end) => {
    if (start[0] > end[0]) {
      let temp = start[0];
      start[0] = end[0];
      end[0] = temp;
    };
    if (start[1] > start[1]) {
      let temp = start[1];
      start[1] = end[1];
      end[1] = temp;
    };
    return [start, end];
  };

  const receiveAttack = (x, y) => {

  };

  return { receiveAttack, placeShip, checkCoordinates };
};
