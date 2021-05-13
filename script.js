let playerX;
let playerO;

// store gameMoves inside a gameBoard object
// gameBoard object listens for moves and updates the gameboard
const gameBoard = (function() {

    let gameMoves = [null, null, null, null, null, null, null, null, null];

    const gridsToSelect = document.querySelectorAll(`.gameGrid`);
    gridsToSelect.forEach( (grid) => {
        grid.addEventListener(`click`, (e) => {
            if (!playerX) {                             // instantiates playerX object if input is blank
                playerX = Player(`anonymous`, `X`);
            } else if (!playerO) {                      // instantiates playerO object if input is blank
                playerO = Player(`anonymous`, `O`);
            }
            const index = e.currentTarget.dataset.indexNumber;
            if (!e.currentTarget.textContent) {
                gameMoves.splice(index, 1, playerX.marker);
                displayMoves();
                console.log(`clicked`); 
            }
        })
    })

    function displayMoves() {
        gameMoves.forEach( (move, index) => {
            gridsToSelect[index].textContent = move;
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
    function toggleMarker() {
        console.log(this.marker);
        console.log(!this.marker);
        this.marker != this.marker;
    }
    return {name, marker, toggleMarker};
}

// game module tracks player's turn and checks for winner
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
