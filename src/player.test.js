import { Player } from "./player.js";

test('Creating new player', () => {
  const newPlayer = Player('Jack', false);
  expect(newPlayer.name).toBe('Jack');
});

test('Creating new AI player', () => {
  const newAIPlayer = Player('PC', true);
  expect(newAIPlayer.ai).toBeTruthy();
});

test('Turns = false', () => {
  const newPlayer = Player('John');
  expect(newPlayer.getTurn()).toBeFalsy();
});

test('Turns = true', () => {
  const newAIPlayer = Player('PC', true);
  newAIPlayer.switchTurn();
  expect(newAIPlayer.getTurn()).toBeTruthy();
});
