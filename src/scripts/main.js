'use strict';

const playInGame = () => {
  let player = true;
  let resultX = [];
  let resultO = [];
  let counter = 0;
  const button = document.querySelector('.btn');
  const goalToWin = [
    [1, 2, 3],
    [1, 4, 7],
    [1, 5, 9],
    [2, 5, 8],
    [3, 6, 9],
    [3, 5, 7],
    [4, 5, 6],
    [7, 8, 9],
  ];

  createGameField();

  button.onclick = () => {
    createGameField();
  };

  function createX(targ) {
    targ.innerHTML = `
    <div class="x-symbol">
      <span class="x-symbol__item x-symbol__item--1"></span>
      <span class="x-symbol__item x-symbol__item--2"></span>
    </div>
    `;
    player = !player;
    resultX.push(+targ.id);
    checkWinner(resultX);
    counter++;
  }

  function create0(targ) {
    targ.innerHTML = `
    <div class="o-symbol">
      <span class="o-symbol__item"></span>
    </div>
    `;
    player = !player;
    resultO.push(+targ.id);
    checkWinner(resultO);
    counter++;
  }

  function checkWinner(arr) {
    const items = document.querySelectorAll('.container__item');

    for (let i = 0; i < goalToWin.length; i++) {
      let count = 0;

      for (let j = 0; j < goalToWin[i].length; j++) {
        if (arr.includes(goalToWin[i][j])) {
          count++;
        }
      }

      if (count > 2) {
        !player ? viewMessage('X win!') : viewMessage('O win!');
        counter = 0;

        for (const item of items) {
          item.classList.remove('playing-field');
        }
      }
    }
  }

  function viewMessage(res) {
    const message = document.querySelector('.message');

    message.innerHTML = `
      <h1 class="message__item">${res}</h1>
    `;
    message.style.transform = 'translateY(50%)';
  }

  function createGameField() {
    const wrapper = document.querySelector('.wrapper');

    wrapper.innerHTML = `
    <div class="message"></div>
    <div class="container">
      <div id="1" class="container__item container__item--1 playing-field">
      </div>
      <div id="2" class="container__item container__item--2 playing-field">
      </div>
      <div id="3" class="container__item container__item--3 playing-field">
      </div>
      <div id="4" class="container__item container__item--4 playing-field">
      </div>
      <div id="5" class="container__item container__item--5 playing-field">
      </div>
      <div id="6" class="container__item container__item--6 playing-field">
      </div>
      <div id="7" class="container__item container__item--7 playing-field">
      </div>
      <div id="8" class="container__item container__item--8 playing-field">
      </div>
      <div id="9" class="container__item container__item--9 playing-field">
      </div>
    </div>
    `;

    const containerGame = document.querySelector('.container');

    resultX = [];
    resultO = [];
    counter = 0;
    player = true;

    containerGame.addEventListener('click', e => {
      const target = e.target;

      if (target.classList.contains('playing-field')) {
        player ? createX(target) : create0(target);
        target.classList.remove('playing-field');

        if (counter > 8) {
          viewMessage('Draw');
        };
      };
    });
  }
};

playInGame();
