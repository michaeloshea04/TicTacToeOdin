// Object representing the game board
const Gameboard = {
  board: [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],

  // Method to display the current state of the board
  displayBoard() {
    console.log(` ${this.board[0]} | ${this.board[1]} | ${this.board[2]}`);
    console.log('-----------');
    console.log(` ${this.board[3]} | ${this.board[4]} | ${this.board[5]}`);
    console.log('-----------');
    console.log(` ${this.board[6]} | ${this.board[7]} | ${this.board[8]}`);
  },

  // Method to check if the board is full
  isBoardFull() {
    return this.board.every(cell => cell !== ' ');
  },

  // Method to check for a winner
  checkForWinner() {
    const winningCombos = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6]              // Diagonals
    ];

    for (const combo of winningCombos) {
      const [a, b, c] = combo;
      if (this.board[a] !== ' ' && this.board[a] === this.board[b] && this.board[a] === this.board[c]) {
        return this.board[a]; // Return the winning symbol (X or O)
      }
    }

    return null; // No winner yet
  },

  // Method to reset the board
  resetBoard() {
    this.board = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
  }
};

// Object representing a player
function Player(symbol) {
  this.symbol = symbol;
}

// Object to control the flow of the game
const Game = {
  players: [new Player('X'), new Player('O')],
  currentPlayerIndex: 0,

  // Method to start the game
  startGame() {
    Gameboard.resetBoard();
    this.currentPlayerIndex = 0;
    this.playTurn();
  },

  // Method to handle a turn
  playTurn() {
    Gameboard.displayBoard();
    const currentPlayer = this.players[this.currentPlayerIndex];
    console.log(`Player ${currentPlayer.symbol}'s turn`);
    this.promptPlayerMove(currentPlayer);
  },

  // Method to prompt the player for a move
  promptPlayerMove(player) {
    const readline = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout
    });

    readline.question(`Enter your move (1-9): `, (input) => {
      const position = parseInt(input) - 1; // Convert input to index
      if (position >= 0 && position < 9 && Gameboard.board[position] === ' ') {
        Gameboard.board[position] = player.symbol; // Update the board
        readline.close();
        // After updating the board, check for a winner or tie
        if (Gameboard.checkForWinner()) {
          console.log(`Player ${player.symbol} wins!`);
          Gameboard.displayBoard();
          return;
        } else if (Gameboard.isBoardFull()) {
          console.log("It's a tie!");
          Gameboard.displayBoard();
          return;
        }
        // Switch to the next player
        this.currentPlayerIndex = (this.currentPlayerIndex + 1) % 2;
        this.playTurn();
      } else {
        console.log("Invalid move. Please choose an empty position (1-9).");
        readline.close();
        this.promptPlayerMove(player); // Reprompt the player
      }
    });
  }
};

// Start the game
Game.startGame();
