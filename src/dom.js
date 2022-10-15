/* eslint-disable no-invalid-this */
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
  const buttonStyle = css`
    width: 100px;
    text-align: center;
    height: 40px;
    display: flex;
    align-self: center;
    justify-self: center;
    justify-content: center;
    align-items: center;
    border-color: transparent;
    background-color: hsl(220, 90%, 56%);
    color: white;
    border-radius: 0.25em;
    margin-bottom: 20px;
    box-shadow: 0 1px 4px hsla(220, 90%, 37%, 0.25);
    transition: 0.3s;
    &:active {
      transform: translateY(3px);
    }
  `;
  const buttonStyleFlip = css`
    width: 100px;
    text-align: center;
    height: 40px;
    display: flex;
    align-self: center;
    justify-self: center;
    justify-content: center;
    align-items: center;
    border-color: transparent;
    background-color: red;
    color: white;
    border-radius: 0.25em;
    margin-bottom: 20px;
    box-shadow: 0 1px 4px hsla(220, 90%, 37%, 0.25);
    transition: 0.3s;
    &:active {
      transform: translateY(3px);
    }
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

      @keyframes animatehide {
        from {opacity: 1}
        to {opacity: 0}
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
      grid-template-rows: repeat(5, min-content);
      grid-template-columns: repeat(2, 1fr);
      align-items: top;
    `;
    div.className = myStyle;
    div.id = 'content';
    div.append(...createContentHeadlines(player));
    div.append(flipButton());
    div.append(resetButton());
    div.append(createGameBoard('player'));
    div.append(createGameBoard('opponent'));

    Body.appendChild(div);
    return div;
  };

  const createContentHeadlines = () => {
    const h1 = document.createElement('h1');
    h1.setAttribute('style',
        'grid-column: 1 / 3; display: flex; justify-content: center;');
    h1.id = 'main-h';
    h1.textContent = 'Game started. Place your ships!';

    const h21 = document.createElement('h2');
    h21.setAttribute('style',
        'display: flex; justify-content: center;');
    h21.id = 'subheadline-1';
    h21.textContent = '';

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
        div.appendChild(createGameBoardField(j, i, player));
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
    const myStyle = buttonStyle;
    button.className = myStyle;

    return button;
  };

  const flipButton = () => {
    const button = document.createElement('button');
    button.textContent = 'Horizontal';
    button.setAttribute('flip-data', 'horizontal');
    button.type = 'button';
    button.id = 'flip';
    const myStyle = buttonStyle;
    button.className = myStyle;

    button.addEventListener('click', function() {
      const lastText = this.textContent;
      if (lastText === 'Horizontal') {
        this.textContent = 'Vertical';
        this.className = buttonStyleFlip;
        this.setAttribute('flip-data', 'vertical');
      } else {
        this.textContent = 'Horizontal';
        this.className = buttonStyle;
        this.setAttribute('flip-data', 'horizontal');
      }
    });

    return button;
  };

  const createModal = () => {
    const div = document.createElement('div');
    const duration = 500;
    const width = '300px';
    const height = '30px';
    const divStyle = css`
      height: 100vh;
      width: 100vw;
      background-color: white;
      position: fixed;
      z-index: 1;
      left: 0;
      top: 0;
      display: flex;
      flex-flow: column wrap;
      overflow: auto;
      justify-content: center;
      align-items: center;
      opacity: 1;
      transition: ${duration}ms;
    `;
    div.id = 'modal';
    div.className = divStyle;

    const headline = document.createElement('h1');
    headline.textContent = 'Welcome to battleship game!';

    const inputName = document.createElement('input');
    const inputNameStyle = css`
      // flex: 1 1 100%;
      box-sizing: border-box;
      height: ${height};
      width: ${width};
      margin-bottom: 20px;
      border: 0.1px solid grey;
      border-radius: 0.25em;
      padding: 5px;
      &:focus {
        border: 2px solid hsl(220, 90%, 56%);
        outline: none;
      }
    `;
    inputName.id = 'input-name';
    inputName.type = 'text';
    inputName.placeholder = 'Enter your name';
    inputName.className = inputNameStyle;
    inputName.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        div.style.opacity = '0';
        setTimeout(() => div.style.display = 'none', duration);
      };
    });

    const buttonSubmit = document.createElement('button');
    const buttonSubmitStyle = css`
      box-sizing: content-box;
      height: ${height};
      width: ${width};
      padding: 0;
      color: white;
      border-color: transparent;
      background-color: hsl(220, 90%, 56%);
      color: white;
      border-radius: 0.25em;
      box-shadow: 0 1px 4px hsla(220, 90%, 37%, 0.25);
    `;
    buttonSubmit.id = 'create-name';
    buttonSubmit.type = 'button';
    buttonSubmit.textContent = 'Submit';
    buttonSubmit.className = buttonSubmitStyle;
    buttonSubmit.addEventListener('click', () => {
      div.style.opacity = '0';
      setTimeout(() => div.style.display = 'none', duration);
    });

    div.append(headline, inputName, buttonSubmit);
    Body.append(div);

    return div;
  };

  const highlightShipPlacement = (array, fits) => {
    const fitStyle = css`
      background-color: blue;
      box-sizing: border-box;
      border: 0.1px dotted grey;
      height: 10%;
      width: 10%;
    `;
    const noFitStyle = css`
      background-color: red;
      box-sizing: border-box;
      border: 0.1px dotted grey;
      height: 10%;
      width: 10%;
    `;
    array.forEach((item) => {
      const node = document.getElementById(`player-${item[0]}-${item[1]}`);
      if (!node) return;
      if (fits) {
        node.className = fitStyle;
      } else {
        node.className = noFitStyle;
      }
    });
    return array;
  };

  return {init, changeContentHeadline, placeShips, createModal,
    highlightShipPlacement};
})();

export default DOMsetup;
