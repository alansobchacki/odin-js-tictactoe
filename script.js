function createGameBoard() {
  const gameBoard = {
    player_one: [],
    player_two: [],
    player_turn: 1,
    player_moves: 0,
    game_started: false,
    game_over: false,
    winning_combinations: [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // horizontal 
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // vertical 
      [0, 4, 8], [2, 4, 6] // diagonal
    ],

    start: function() {
      if (!this.game_started) {
        this.game_started = true;
    }

      if (this.game_over == true) {
        this.newGame();
        this.game_started = true;
      }
    },

    play: function(squareId, value) {
      if (this.game_started == false || this.game_over == true) {
        alert('Press the "play" button to start the game!');
        return;
      }

      let slot = document.getElementById(squareId);
      if (slot.innerHTML !== '') {
        alert('Pick an empty square.');
        return;
      }

      this.buildSquare(squareId, value);
    },

    buildSquare: function(squareId, value) {
      let board = document.getElementById(squareId);
      let square = document.createElement("div");

      if (this.player_turn == 1) {
        square.innerHTML = ` <p>X</p> `;
        this.player_one.push(value);
      } else {
        square.innerHTML = ` <p>O</p> `;
        this.player_two.push(value);
      }

      this.player_moves += 1;
      this.player_turn = this.player_turn === 1 ? 2 : 1;
      board.appendChild(square);
      this.checkVictory();
    },

    checkVictory: function() {
      for (let i = 0; i < this.winning_combinations.length; i++) {
        const combination = this.winning_combinations[i];
        const includesAll = (arr, values) => values.every(v => arr.includes(v));

        if (includesAll(this.player_one, combination) == true) {
          this.gameOver(1);
          return;
        } else if (includesAll(this.player_two, combination) == true) {
          this.gameOver(2);
          return;
        }
      }

      if (this.player_moves == 9) {
        this.gameOver(0);
        return;
      }
    },

    gameOver: function(n) {
      let messageBox = document.getElementById("announcer");
      let message = document.createElement("h2");

      if (n == 1) {
        message.innerHTML = ` Player One Wins! `;
      } else if (n == 2) {
        message.innerHTML = ` Player Two Wins! `;
      } else if (n == 0) {
        message.innerHTML = ` It's a tie! `;
      }

      messageBox.appendChild(message);
      this.game_over = true;
    },

    newGame: function() {
      this.resetVariables();
      this.resetHTML();
    },

    resetVariables: function() {
      this.player_one = [];
      this.player_two = [];
      this.player_turn = 1;
      this.player_moves = 0;
      this.game_started = false;
      this.game_over = false;
    },

    resetHTML: function() {
      const squares = document.querySelectorAll('.square');

      squares.forEach(square => {
        square.innerHTML = '';
      });
    
      const messageBox = document.getElementById("announcer");
      messageBox.innerHTML = '';
    },
  
  };

  return gameBoard;
}

const game = createGameBoard();
