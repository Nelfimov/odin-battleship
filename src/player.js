export const Player = (name, ai = false) => {
  let isTurn = true;

  const getTurn = () => {
    return isTurn;
  };

  const switchTurn = () => {
    return getTurn() ? isTurn = false : isTurn = true;
  };


  const makeRandomMove = (array, isLastHit = false, hitCell = null) => {
    const possibleHitsAround = [[-1, 0], [0, -1], [0, 1], [1, 0]];
    let x;
    let y;

    if (!isLastHit) {
      x = Math.floor(Math.random() * 10 + 1);
      y = Math.floor(Math.random() * 10 + 1);

      for (const item of array) {
        if ([x, y].every((i, index) => i == item[index])) {
          return makeRandomMove(array);
        };
      };

      return [x, y];
    } else {
      let index = 0;
      let status = true;

      outer: while (index < possibleHitsAround.length - 1) {
        x = hitCell[0] + possibleHitsAround[index][0];
        y = hitCell[1] + possibleHitsAround[index][1];

        for (const item of array) {
          if ([x, y].every((i, index) => i === item[index])) {
            status = false;
            ++index;
            continue outer;
          } else {
            status = true;
          };
        };
        if (status) return [x, y];
      };
      return makeRandomMove(array, false, null);
    };
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
