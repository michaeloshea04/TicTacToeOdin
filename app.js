document.addEventListener("DOMContentLoaded", function() {
  const cells = document.querySelectorAll('.cell');
  const status = document.getElementById('status');
  let currentPlayer = 'X';
  let winner = null;

  cells.forEach(cell => {
    cell.addEventListener('click', () => {
      if (!cell.textContent && !winner) {
        cell.textContent = currentPlayer;
        if (checkForWin()) {
          //alert(`${currentPlayer} wins!`);
          status.textContent = `${currentPlayer} wins!`;
          winner = currentPlayer;
        } else if (checkForDraw()) {
          //alert("It's a draw!");
          status.textContent = "It's a draw!"
        } else {
          currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
      }
    });
  });

  function checkForWin() {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    return lines.some(line => {
      const [a, b, c] = line;
      return cells[a].textContent &&
        cells[a].textContent === cells[b].textContent &&
        cells[a].textContent === cells[c].textContent;
    });
  }

  function checkForDraw() {
    return [...cells].every(cell => cell.textContent);
  }
});