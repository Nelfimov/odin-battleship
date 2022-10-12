export const Player = (name, ai = false) => {
  let isTurn = true;

  const getTurn = () => {
    return isTurn;
  };

  const switchTurn = () => {
    return getTurn() ? isTurn = false : isTurn = true;
  };

  const makeRandomMove = (array) => {
    const x = Math.floor(Math.random() * 10 + 1);
    const y = Math.floor(Math.random() * 10 + 1);

    for (const item of array) {
      if ([x, y].every((i, index) => i === item[index])) {
        makeRandomMove(array);
      };
    };
    return [x, y];
  };

  return {
    name,
    ai,
    getTurn,
    switchTurn,
    makeRandomMove,
  };
};

export default Player;
