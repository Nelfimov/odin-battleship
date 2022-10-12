import {injectGlobal, css} from '@emotion/css';
import Roboto from '/src/assets/Roboto/Roboto-Regular.ttf';

export const DOMsetup = (() => {
  const Body = document.body;
  const emtpyCellStyle = css`
  background-color: white;
  box-sizing: border-box;
  border: 0.1px dotted grey;
  height: 10%;
  width: 10%;
  &:hover {
    border: 1px solid grey;
    background-color: #e6e4df;
  }
`;
  const shipCellStyle = css`
  background-color: black;
  box-sizing: border-box;
  border: 0.1px dotted grey;
  height: 10%;
  width: 10%;
`;

  const init = (player) => {
    bodySetup();
    createHeader();
    createContent(player);
  };

  const bodySetup = () => {
    injectGlobal`
      @font-face {
        font-family: 'Roboto';
        src: ${Roboto};
      }

      body {
        margin: 0;
        min-height: 100vh;
        min-width: 100vw;
        font-family: 'Roboto', sans-serif;
        display: grid;
        grid-template-rows: 100px 1fr;
        grid-template-columns: 1fr;
      }
    `;
  };

  const createHeader = () => {
    const div = document.createElement('div');
    const myStyle = css`
      background-color: grey;
      display: flex;
      justify-content: center;
    `;
    div.className = myStyle;
    div.appendChild(createHeaderHeadline());
    Body.appendChild(div);
    return div;
  };

  const createHeaderHeadline = () => {
    const span = document.createElement('span');
    const myStyle = css`
      font-size: 4rem;
      font-weight: bold;
      align-self: center;
    `;
    span.textContent = 'BATTLESHIP GAME';
    span.className = myStyle;
    return span;
  };

  const createContent = (player) => {
    const div = document.createElement('div');
    const myStyle = css`
      display: grid;
      grid-template-rows: repeat(3, min-content) 1fr;
      grid-template-columns: repeat(2, 1fr);
      align-items: top;
    `;
    div.className = myStyle;
    div.id = 'content';
    div.append(...createContentHeadlines(player));
    div.append(resetButton());
    div.append(createGameBoard('player'));
    div.append(createGameBoard('opponent'));

    Body.appendChild(div);
    return div;
  };

  const createContentHeadlines = (player) => {
    const h1 = document.createElement('h1');
    h1.setAttribute('style',
        'grid-column: 1 / 3; display: flex; justify-content: center;');
    h1.id = 'main-h';
    h1.textContent = 'Default';

    const h21 = document.createElement('h2');
    h21.setAttribute('style',
        'display: flex; justify-content: center;');
    h21.id = 'subheadline-1';
    h21.textContent = player.name;

    const h22 = document.createElement('h2');
    h22.setAttribute('style',
        'display: flex; justify-content: center;');
    h22.id = 'subheadline-1';
    h22.textContent = 'AI';

    return [h1, h21, h22];
  };

  const changeContentHeadline = (string) => {
    document.getElementById('main-h').textContent = string;
  };

  const createGameBoard = (player) => {
    const div = document.createElement('div');
    const boardStyle = css`
      border: 1px solid black;
      position: relative;
      background-color: white;
      top: 0;
      right: 0;
      bottom: 0;
      display: flex;
      flex: 1 1 100%;
      flex-wrap: wrap;
      width: 25vw;
      height: 25vw;
      justify-self: center;
    `;
    div.className = boardStyle;
    div.setAttribute('player-data', player);

    let i = 1;
    let j = 1;
    while (i < 11) {
      j = 1;
      while (j < 11) {
        div.appendChild(createGameBoardField(i, j, player));
        ++j;
      };
      ++i;
    };

    return div;
  };

  const createGameBoardField = (x, y, player) => {
    const div = document.createElement('div');
    div.id = `${player}-${x}-${y}`;
    div.className = emtpyCellStyle;
    return div;
  };

  const placeShips = (gameboard) => {
    if (gameboard.getBoard().size < 1) return;

    for (const ship of gameboard.getBoard().keys()) {
      if (!ship) continue;
      for (const coordinate of gameboard.getBoard().get(ship)) {
        const cell = document
            .getElementById(`player-${coordinate[0]}-${coordinate[1]}`);
        cell.setAttribute('ship-hits-data', ship.getHits());
        cell.className = shipCellStyle;
      };
    }
  };

  const resetButton = () => {
    const button = document.createElement('button');
    button.textContent = 'Reset';
    button.type = 'button';
    button.id = 'reset';
    const myStyle = css`
      width: 100px;
      text-align: center;
      height: 40px;
      grid-column: 1 / 3;
      display: flex;
      align-self: center;
      justify-self: center;
      justify-content: center;
      align-items: center;
      border-color: transparent;
      background-color: hsl(220, 90%, 56%);
      color: white;
      border-radius: 0.25em;
      box-shadow: 0 1px 4px hsla(220, 90%, 37%, 0.25);
      transition: 0.3s;
      &:active {
        transform: translateY(3px);
      }
    `;
    button.className = myStyle;

    return button;
  };

  return {init, changeContentHeadline, placeShips};
})();

export default DOMsetup;
