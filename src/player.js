export const Player = (name, ai = false) => {
  let isTurn = true;
  const moves = [];
  if (ai) {
    isTurn = false;
  };

  return {
    name,
    ai,
    getTurn: function() {
      return isTurn;
    },
    switchTrun: function() {
      return getTurn() ? isTurn = false : isTurn = true;
    },
    getMoves: function() {
      return moves;
    },
    addMove: function(coordinates) {
      return moves.push(coordinates);
    },
  };
};
