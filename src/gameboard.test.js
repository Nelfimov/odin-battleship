import { GameBoard } from "./gameboard.js";
import { Ship } from "./ship.js";

test.only('Check coordinates', () => {

});

test('Creating gameboard and placing ship', () => {
  const newShip = Ship(2);
  const start = [1, 1];
  const end = [1, 2];
  const newGameBoard = GameBoard();
  const shipInGameBoard = newGameBoard.placeShip(start, end, newShip);
  expect(shipInGameBoard).toBe(newShip);
});

test('Receive attack no ship', () => {
  const newGameBoard = GameBoard();
  const coordinates = [1, 1];
  const attack = newGameBoard.receiveAttack(coordinates);
  expect(attack).toBeFalsy();
});

test('Receive attack on a ship', () => {
  const newGameBoard = GameBoard();
  const newShip = Ship(1);
  const coordinates = [1, 1];
  GameBoard.placeShip(coordinates, coordinates, newShip);
  const attack = newGameBoard.receiveAttack(coordinates);
  expect(attack).toBeTruthy();
});
