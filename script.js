function createGameBoard() {
  const gameBoard = {
    player_one_name: '',
    player_two_name: '',
    player_one_score: 0,
    player_two_score: 0,
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
        this.chooseNames();
        this.game_started = true;
    }

      if (this.game_over == true) {
        this.newGame();
      }
    },

    chooseNames: function() {
      do {
        this.player_one_name = prompt("First player (X), write a name (4 to 16 characters):");
      } while (this.player_one_name.length < 4 || this.player_one_name.length > 16);

      let nameField = document.getElementById('player_one_name');
      nameField.innerHTML = `${this.player_one_name}`;
      
      do {
        this.player_two_name = prompt("Second player (O), write a name (4 to 16 characters):");
      } while (this.player_two_name.length < 4 || this.player_two_name.length > 16);

      let secondNameField = document.getElementById('player_two_name');
      secondNameField.innerHTML = `${this.player_two_name}`;
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
      if (n == 1) {
        alert(this.player_one_name + " wins!");
        this.player_one_score += 1;
      } else if (n == 2) {
        alert(this.player_two_name + " wins!");
        this.player_two_score += 1;
      } else if (n == 0) {
        alert("It's a tie!");
      }

      this.updateScores();
      this.game_over = true;
    },

    updateScores: function() {
      let player_one_score_display = document.getElementById("player-one-score");
      player_one_score_display.innerHTML = `${this.player_one_score}`;

      let player_two_score_display = document.getElementById("player-two-score");
      player_two_score_display.innerHTML = `${this.player_two_score}`;
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
      this.game_started = true;
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
