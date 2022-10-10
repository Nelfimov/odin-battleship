import { GameBoard } from "./gameboard.js";

test('Check coordinates', () => {
  const start = [1, 1];
  const end = [1, 3];
  const length = 3;
  const newGameBoard = GameBoard();
  expect(newGameBoard.checkCoordinates(start, end, length)).toBeTruthy();
});

test('Create array of ship', () => {
  const start = [1, 1];
  const end = [1, 3];
  const newGameBoard = GameBoard();
  const shipInGameBoard = newGameBoard.iterateThroughCoordinates(start, end);
  expect(shipInGameBoard).toStrictEqual([[1, 1], [1, 2], [1, 3]]);
});

test('Creating gameboard and placing ship', () => {
  const length = 2;
  const start = [1, 1];
  const end = [1, 2];
  const newGameBoard = GameBoard();
  const newShip = newGameBoard.placeShip(start, end, length);
  expect(newGameBoard.getBoard().get(newShip)).toEqual([start, end]);
});

test('Receive attack no ship', () => {
  const coordinates = [1, 1];
  const newGameBoard = GameBoard();
  const attack = newGameBoard.receiveAttack(coordinates);
  expect(attack.status).toBeFalsy();
});

test('Receive attack on a ship', () => {
  const length = 1;
  const coordinates = [1, 1];
  const newGameBoard = GameBoard();
  newGameBoard.placeShip(coordinates, coordinates, length);
  const attack = newGameBoard.receiveAttack(coordinates);
  expect(attack.status).toBeTruthy();
});

test('Check remaining ships, all sunk', () => {
  const length = 2;
  const coordinates1 = [1, 1];
  const coordinates2 = [2, 1];
  const newGameBoard = GameBoard();
  newGameBoard.placeShip(coordinates1, coordinates1, length);
  newGameBoard.receiveAttack(coordinates1);
  newGameBoard.receiveAttack(coordinates2);
  expect(newGameBoard.getShipsLeft().status).toBeFalsy();
});

test('Check remaining ships: some are left there', () => {
  const length = 2;
  const coordinates1 = [1, 1];
  const coordinates2 = [1, 2];
  const newGameBoard = GameBoard();
  newGameBoard.placeShip(coordinates1, coordinates2, length);
  newGameBoard.receiveAttack(coordinates1);
  expect(newGameBoard.getShipsLeft().status).toBeTruthy();
});
