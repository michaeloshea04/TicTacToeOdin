// Player object constructor
function Player(name, symbol) {
  this.name = name;
  this.symbol = symbol;
}

// Gameboard object constructor
function Gameboard() {
  this.board = ["", "", "", "", "", "", "", "", ""];
}

Gameboard.prototype = {
  // Display the current state of the board
  displayBoard: function () {
    for (let i = 0; i < 9; i += 3) {
      console.log(this.board.slice(i, i + 3).join(" | "));
    }
  },

  // Check if a player has won
  checkWin: function (symbol) {
    // Check rows, columns, and diagonals
    return (
      this.checkRow(symbol) ||
      this.checkColumn(symbol) ||
      this.checkDiagonal(symbol)
    );
  },

  // Check rows for a win
  checkRow: function (symbol) {
    for (let i = 0; i < 9; i += 3) {
      if (
        this.board[i] === symbol &&
        this.board[i + 1] === symbol &&
        this.board[i + 2] === symbol
      ) {
        return true;
      }
    }
    return false;
  },

  // Check columns for a win
  checkColumn: function (symbol) {
    for (let i = 0; i < 3; i++) {
      if (
        this.board[i] === symbol &&
        this.board[i + 3] === symbol &&
        this.board[i + 6] === symbol
      ) {
        return true;
      }
    }
    return false;
  },

  // Check diagonals for a win
  checkDiagonal: function (symbol) {
    return (
      (this.board[0] === symbol &&
        this.board[4] === symbol &&
        this.board[8] === symbol) ||
      (this.board[2] === symbol &&
        this.board[4] === symbol &&
        this.board[6] === symbol)
    );
  },

  // Check if the board is full (tie)
  isBoardFull: function () {
    return !this.board.includes("");
  },

  // Place a symbol on the board
  placeSymbol: function (index, symbol) {
    if (this.board[index] === "") {
      this.board[index] = symbol;
      return true;
    } else {
      console.log("Invalid move. Cell already occupied.");
      return false;
    }
  }, 
};


// Game object constructor
function Game(player1, player2) {
  this.players = [player1, player2];
  this.currentPlayer = player1;
  this.gameboard = new Gameboard();
}

Game.prototype = {
  // Switch to the next player
  switchPlayer: function () {
    this.currentPlayer =
      this.currentPlayer === this.players[0]
        ? this.players[1]
        : this.players[0];
  },

  // Start the game
  startGame: function () {
    console.log("Tic Tac Toe Game Started!");
    this.gameboard.displayBoard(); //Added this displayBoard here

    while (true) {
      this.gameboard.displayBoard();
      const index = prompt(
        `${this.currentPlayer.name}, enter the index to place ${
          this.currentPlayer.symbol
        } (0-8): `
      );

      if (index >= 0 && index < 9) {
        if (this.gameboard.placeSymbol(index, this.currentPlayer.symbol)) {
          this.gameboard.displayBoard();

          if (this.gameboard.checkWin(this.currentPlayer.symbol)) {
            console.log(`${this.currentPlayer.name} wins!`);
            break;
          } else if (this.gameboard.isBoardFull()) {
            console.log("It's a tie!");
            break;
          }

          this.switchPlayer();
        }
      } else {
        console.log("Invalid index. Please enter a number between 0 and 8.");
      }
      console.log("-----------------------------------")
    }

    console.log("Game Over!");
  },
};

// Example usage:
const player1 = new Player("Player 1", "X");
const player2 = new Player("Player 2", "O");

const ticTacToeGame = new Game(player1, player2);
ticTacToeGame.startGame();
