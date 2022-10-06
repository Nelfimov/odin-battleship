import { Ship } from "./ship.js";

test('No hits', () => {
  const newShip = Ship(4);
  expect(newShip.getHits()).toBe(0);
});

test('1 hit', () => {
  const newShip = Ship(4);
  expect(newShip.hit()).toBe(1);
});

test('2 hit', () => {
  const newShip = Ship(4);
  newShip.hit();
  newShip.hit();
  expect(newShip.getHits()).toBe(2);
});

test('Sunk', () => {
  const newShip = Ship(1);
  newShip.hit();
  expect(newShip.isSunk()).toBeTruthy();
});
