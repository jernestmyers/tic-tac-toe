let playerX;
let playerO;
let gameOver;

// store gameMoves inside a gameBoard object
// gameBoard object listens for moves and updates the gameboard
const gameBoard = (function() {

    let gameMoves = [null, null, null, null, null, null, null, null, null];
    let currentMove = `X`;

    const gridsToSelect = document.querySelectorAll(`.gameGrid`);
    gridsToSelect.forEach( (grid) => {
        grid.addEventListener(`click`, (e) => {
            if (!playerX) {                             // instantiates playerX object if input is blank
                playerX = Player(`anonymous`, `X`);
                currentMove = playerX.marker;
            }
            if (!playerO) {                             // instantiates playerO object if input is blank
                playerO = Player(`anonymous`, `O`);
            }
            const index = e.currentTarget.dataset.indexNumber;
            if (!gameOver && !e.currentTarget.textContent) {
                gameMoves.splice(index, 1, currentMove);
                displayMoves();
                executeGame.checkForWinner(currentMove);
                console.log(gameOver);
            }
        })
    })

    function displayMoves() {                           // also toggles player marker
        gameMoves.forEach( (moveToDisplay, index) => {
            gridsToSelect[index].textContent = moveToDisplay;
            if (currentMove === playerX.marker) {
                currentMove = playerO.marker;
            } else {
                currentMove = playerX.marker;
            }
        })
    }

    return {
        gameMoves,
        displayMoves,
    }
})();


// use a factory function to create playerX and playerO and return the name and marker
const Player = (name, marker) => {
    const getName = () => name;
    const getMarker = () => marker;
    return {name, marker};
}

// game module checks for winner
// game module declares winner
// game module resets game
const executeGame = (function() {
    const nameField = document.querySelectorAll(`.nameInputs`);
    const gameModeButtons = document.querySelectorAll(`.chooseGame`)

    gameModeButtons.forEach( (button) => {
        button.addEventListener(`click`, (e) => {
            console.log(e.currentTarget.id);
        })
    })

    nameField.forEach( (input) => {
        input.addEventListener(`change`, (e) => {
            const userName = e.target.value;
            const userMarker = e.target.dataset.marker;
            if (e.target.dataset.marker === `X`) {
                playerX = Player(userName, userMarker);
                console.log(playerX);
            } else {
                playerO = Player(userName, userMarker);
                console.log(playerO);
            }
        })
    })

    function checkForWinner(currentMove) {
        let board = gameBoard.gameMoves;
        console.log(board)
        if (
            (board[0] && (board[0] === board[1]) && (board[1] === board[2])) ||
            (board[3] && (board[3] === board[4]) && (board[4] === board[5])) ||
            (board[6] && (board[6] === board[7]) && (board[7] === board[8])) ||
            (board[0] && (board[0] === board[3]) && (board[3] === board[6])) ||
            (board[1] && (board[1] === board[4]) && (board[4] === board[7])) ||
            (board[2] && (board[2] === board[5]) && (board[5] === board[8])) ||
            (board[0] && (board[0] === board[4]) && (board[4] === board[8])) ||
            (board[2] && (board[2] === board[4]) && (board[4] === board[6]))
            ) 
            { 
                gameOver = true;
                declareWinner(currentMove);
            }
    }

    function declareWinner(move) {
        if (move === playerO.marker) {
            alert(`player x wins!`);
        }
        if (move === playerX.marker) {
            alert(`player o wins!`)
        }
    }

    return { 
                checkForWinner, 
                declareWinner,
            }
})();


// have functionality for 1 player or 2 player, currently code is for 2 player only
// ***** vs cpu EASY: computer can generate a random index number [i] between 0 and 8
// *****    if array[i] is null, computer makes move and computerMoved === true
// *****    else if: computer generates a new index and tries to make a move  
// have functionality for 'play again' vs 'change settings'

let computerPlayEasy = () => {
    let cpuIndex = Math.floor(Math.random() * 9);
    console.log(cpuIndex);
    if (!gameBoard.gameMoves[cpuIndex]) {
        gameBoard.gameMoves[cpuIndex] = `O`;
        // currentMove = playerX.marker;
        gameBoard.displayMoves();
    }
}