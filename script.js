function createGameBoard() {
  const gameBoard = {
    player_one: [],
    player_two: [],
    player_turn: 1,
    player_moves: 0,
    winning_combinations: [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // horizontal 
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // vertical 
      [0, 4, 8], [2, 4, 6] // diagonal
    ],

    play: function() {
      let movement = prompt('Pick your square');

      if (this.player_turn === 1) {
        this.player_one.push(movement);
        this.player_one.sort();
      } else {
        this.player_two.push(movement);
        this.player_two.sort();
      }

      this.player_moves += 1;
      this.player_turn = this.player_turn === 1 ? 2 : 1;
      this.check_victory();
    },

    check_victory: function() {
      for (let i = 0; i < this.winning_combinations.length; i++) {
        const combination = this.winning_combinations[i];
        if (this.checkPlayerWin(this.player_one, combination)) {
          this.game_over(1);
          return;
        } else if (this.checkPlayerWin(this.player_two, combination)) {
          this.game_over(2);
          return;
        }
      }

      if (this.player_moves == 9) {
        this.game_over(0);
        return;
      }

      this.play();
    },

    checkPlayerWin: function(playerMoves, combination) {
      return combination.every(move => playerMoves.includes(move.toString()));
    },

    game_over: function(n) {
      switch (n) {
        case 1:
          alert('Player One Wins!');
          break;
        case 2:
          alert('Player Two Wins!');
          break;
        case 0:
          alert("It's a tie!");
          break;
      }
    }
  };

  return gameBoard;
}

const game = createGameBoard();
game.play();
