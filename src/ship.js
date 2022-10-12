export const Ship = (length) => {
  let hits = 0;

  const getLength = () => {
    return length;
  };

  const hit = () => {
    return ++hits;
  };

  const getHits = () => {
    return hits;
  };

  const isSunk = (length = getLength(), hits = getHits()) => {
    return length <= hits;
  };

  return {hit, isSunk, getHits, getLength};
};

export default Ship;
