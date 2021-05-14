let playerX;
let playerO;

// store gameMoves inside a gameBoard object
// gameBoard object listens for moves and updates the gameboard
const gameBoard = (function() {

    let gameMoves = [null, null, null, null, null, null, null, null, null];
    let currentMove;
    // let movesMade = 0;

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
            if (!e.currentTarget.textContent) {
                gameMoves.splice(index, 1, currentMove);
                displayMoves();
                checkForWinner();
                console.log(gameMoves);
            }
        })
    })

    function displayMoves() {
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
    // console.log(playerX);
    // return {playerX, playerO}
})();

function checkForWinner() {
    let board = gameBoard.gameMoves;
    console.log(board)
    if ((board[0] === board[1]) && (board[1] === board[2])) {
        return console.log(`winner`);
    }
}