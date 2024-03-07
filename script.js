let playerTurn = document.querySelector(".player-turn");
let xScoreDisplay = document.querySelector(".player-x-score");
let oScoreDisplay = document.querySelector(".player-o-score");
let newGameBtn = document.querySelector(".new-game-btn");
let resetBtn = document.querySelector(".reset-btn");
let cell = document.querySelectorAll(".cell");
let isXTurn = true;

let xScore = 0;
let oScore = 0;

newGameBtn.addEventListener("click", newGame);
resetBtn.addEventListener("click", resetGame);

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

function newGame() {
    playerTurn.textContent = "X's turn";
    clearGameBoard();
    enableAllCells();

    for (let i = 0; i < cell.length; i++) {
        cell[i].addEventListener("click", cellClickHandler);
    }
    isXTurn = true;
}

function cellClickHandler() {
    if (this.textContent === "") {
        if (isXTurn) {
            this.textContent = "X";
        } else {
            this.textContent = "O";
        }
        isXTurn = !isXTurn;

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

function isBoardFull() {
    for (let i = 0; i < cell.length; i++) {
        if (cell[i].textContent === "") {
            return false;
        }
    }
    return true;
}

function disableAllCells() {
    for (let i = 0; i < cell.length; i++) {
        cell[i].removeEventListener("click", cellClickHandler);
    }
    playerTurn.textContent = "Start new game?";
}

function enableAllCells() {
    for (let i = 0; i < cell.length; i++) {
        cell[i].addEventListener("click", cellClickHandler);
    }
}

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

function clearGameBoard() {
    for (let i = 0; i < cell.length; i++) {
        cell[i].textContent = "";
    }
}
