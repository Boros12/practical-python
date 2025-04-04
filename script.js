// Változók létrehozása
const cells = document.querySelectorAll('.cell');
const restartButton = document.getElementById('restartButton');
let board = Array(9).fill(null);
let currentPlayer = 'X';
let gameActive = true;

// Cellák kattintásának kezelése
function handleCellClick(e) {
  const index = e.target.getAttribute('data-cell-index');
  
  // Ha a cella már foglalt, vagy a játék már véget ért, nem történik semmi
  if (board[index] !== null || !gameActive) return;
  
  board[index] = currentPlayer;
  e.target.textContent = currentPlayer;
  
  // Ellenőrizzük, hogy nyert-e a játékos
  if (checkWin(currentPlayer)) {
    setTimeout(() => alert(`Nyert a ${currentPlayer}!`), 100);
    gameActive = false;
    return;
  }
  
  // Ellenőrizzük, hogy döntetlen-e
  if (board.every(cell => cell !== null)) {
    setTimeout(() => alert('Döntetlen!'), 100);
    gameActive = false;
    return;
  }
  
  // Váltás a másik játékosra
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

// Győzelmi feltételek ellenőrzése
function checkWin(player) {
  const winConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // sorok
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // oszlopok
    [0, 4, 8], [2, 4, 6]             // átlók
  ];
  
  return winConditions.some(combination =>
    combination.every(index => board[index] === player)
  );
}

// Játék újraindítása
function restartGame() {
  board.fill(null);
  cells.forEach(cell => cell.textContent = '');
  currentPlayer = 'X';
  gameActive = true;
}

// Események hozzárendelése
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', restartGame);
