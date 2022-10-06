export const Ship = (length) => {
  let hits = 0;
  const hit = () => { return ++hits; };
  const getHits = () => { return hits };
  const isSunk = (length, hits) => {
    return length === hits;
  };
  return { hit, isSunk, getHits };
};
