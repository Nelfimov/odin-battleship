import hitMiss from '/src/assets/hit1.svg';
import hitGot from '/src/assets/hit2.svg';
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

  const init = () => {
    bodySetup();
    createHeader();
    createContent();
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

  const createContent = () => {
    const div = document.createElement('div');
    const myStyle = css`
      display: grid;
      grid-template-rows: repeat(2, min-content) 1fr;
      grid-template-columns: repeat(2, 1fr);
      align-items: center;
    `;
    div.className = myStyle;
    div.append(...createContentHeadlines());
    div.append(createGameBoard('player'));
    div.append(createGameBoard('ai'));

    Body.appendChild(div);
    return div;
  };

  const createContentHeadlines = () => {
    const h1 = document.createElement('h1');
    h1.setAttribute('style',
        'grid-column: 1 / 3; display: flex; justify-content: center;');
    h1.id = 'main-h';
    h1.textContent = 'Default';

    const h21 = document.createElement('h2');
    h21.setAttribute('style',
        'display: flex; justify-content: center;');
    h21.id = 'subheadline-1';
    h21.textContent = 'Player1';

    const h22 = document.createElement('h2');
    h22.setAttribute('style',
        'display: flex; justify-content: center;');
    h22.id = 'subheadline-1';
    h22.textContent = 'AI';

    return [h1, h21, h22];
  };

  const changeContentHeadlines = (h1String, h2String) => {
    if (h1String !== '') {
      document.getElementById('main-h').textContent = h1String;
    };
    if (h2String !== '') {
      document.getElementById('sub-h').textContent = h2String;
    };
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
    if (player === 'ai') {
      div.addEventListener('click', (e) => {
        console.log(e.target.id.split('-'));
        const icon = new Image();
        // TODO: взять борд и запустить receiveAttack
      });
    }
    return div;
  };

  const placeShips = (gameboard) => {
    if (gameboard.getBoard().size < 1) return;

    for (const ship of gameboard.getBoard().keys()) {
      if (!ship) continue;
      for (const coordinate of gameboard.getBoard().get(ship)) {
        const cell = document
            .getElementById(`player-${coordinate[0]}-${coordinate[1]}`);
        cell.setAttribute('ship-data', ship);
        cell.className = shipCellStyle;
      };
    }
  };

  const makeMove = (coordinates) => {

  };

  return {init, makeMove, changeContentHeadlines, placeShips};
})();
