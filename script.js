// Selecting elements from the HTML
let playerTurn = document.querySelector(".player-turn");
let xScoreDisplay = document.querySelector(".player-x-score");
let oScoreDisplay = document.querySelector(".player-o-score");
let newGameBtn = document.querySelector(".new-game-btn");
let resetBtn = document.querySelector(".reset-btn");
let cell = document.querySelectorAll(".cell");
let isXTurn = true;

// Initialize scores
let xScore = 0;
let oScore = 0;

// Event listeners for buttons
newGameBtn.addEventListener("click", newGame);
resetBtn.addEventListener("click", resetGame);

// Check if a player wins
function checkWin() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (cell[a].textContent && cell[a].textContent === cell[b].textContent && cell[a].textContent === cell[c].textContent) {
            playerTurn.textContent = cell[a].textContent + " is the Winner!";
            return true;
        }
    }

    return false;
}

// Start new game
function newGame() {
    playerTurn.textContent = "X's turn";
    clearGameBoard();
    enableAllCells();

    // Click event listeners for each cell
    for (let i = 0; i < cell.length; i++) {
        cell[i].addEventListener("click", cellClickHandler);
    }
    isXTurn = true;
}

// Handle cell click
function cellClickHandler() {
    if (this.textContent === "") {
        if (isXTurn) {
            this.textContent = "X";
        } else {
            this.textContent = "O";
        }
        isXTurn = !isXTurn; // Toggle player turn

        if (checkWin()) {
            if (isXTurn) {
                oScore++;
                oScoreDisplay.textContent = oScore;
            } else {
                xScore++;
                xScoreDisplay.textContent = xScore;
            }
            disableAllCells();
        } else {
            if (isXTurn) {
                playerTurn.textContent = "X's turn";
            } else {
                playerTurn.textContent = "O's turn";
            }
        }
    }
}

// Check if all cells are full
function isBoardFull() {
    for (let i = 0; i < cell.length; i++) {
        if (cell[i].textContent === "") {
            return false; // There's an empty cell
        }
    }
    return true; // All cells are full
}

// Disable all cells
function disableAllCells() {
    for (let i = 0; i < cell.length; i++) {
        cell[i].removeEventListener("click", cellClickHandler);
    }
    playerTurn.textContent = "Start new game?";
}

// Enable all cells
function enableAllCells() {
    for (let i = 0; i < cell.length; i++) {
        cell[i].addEventListener("click", cellClickHandler);
    }
}

// Reset the game and score
function resetGame() {
    xScore = 0;
    oScore = 0;
    xScoreDisplay.textContent = xScore;
    oScoreDisplay.textContent = oScore;
    clearGameBoard();
    playerTurn.textContent = "X's turn";
    isXTurn = true;
    enableAllCells();
}

// Clear the game board
function clearGameBoard() {
    for (let i = 0; i < cell.length; i++) {
        cell[i].textContent = "";
    }
}