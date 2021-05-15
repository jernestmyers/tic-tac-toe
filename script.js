let playerX;
let playerO;
let gameOver;

// store gameMoves inside a gameBoard object
// gameBoard object listens for moves and updates the gameboard
const gameBoard = (function() {

    let gameMoves = [null, null, null, null, null, null, null, null, null];
    let currentMove;

    const gridsToSelect = document.querySelectorAll(`.gameGrid`);
    gridsToSelect.forEach( (grid) => {
        grid.addEventListener(`click`, (e) => {
            if (!playerX) {                             // instantiates playerX object if input is blank
                playerX = Player(`anonymous`, `X`);
                currentMove = playerX.marker;
            }
            if (!playerO) {                      // instantiates playerO object if input is blank
                playerO = Player(`anonymous`, `O`);
            }
            const index = e.currentTarget.dataset.indexNumber;
            if (!gameOver && !e.currentTarget.textContent) {
                gameMoves.splice(index, 1, currentMove);
                displayMoves();
                executeGame.checkForWinner();
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
        currentMove,
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

    function checkForWinner() {
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
                declareWinner(gameBoard.currentMove);
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
