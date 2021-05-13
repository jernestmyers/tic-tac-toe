// store gameMoves inside a gameBoard object
// gameBoard object listens for moves and updates the gameboard
const gameBoard = (function() {

    let gameMoves = [null, null, null, null, null, null, null, null, null];

    const gridsToSelect = document.querySelectorAll(`.gameGrid`);
    gridsToSelect.forEach( (grid) => {
        grid.addEventListener(`click`, (e) => {
            const index = e.currentTarget.dataset.indexNumber;
            if (!e.currentTarget.textContent) {
                gameMoves.splice(index, 1, `O`);
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
        gameMoves: gameMoves
    }
})();


// use a factory function to create playerX and playerO and return the name and marker
const Player = (name, marker) => {
    const getName = () => name;
    const getMarker = () => marker;
    return {name, marker}
}




// game module tracks player's turn and checks for winner
// game module declares winner
// game module resets game
const executeGame = (function() {
    const nameField = document.querySelectorAll(`.nameInputs`);
    let playerX;
    let playerO;
    nameField.forEach( (input) => {
        input.addEventListener(`change`, (e) => {
            const playerName = e.target.value;
            const playerMarker = e.target.dataset.marker;
            if (e.target.dataset.marker === `X`) {
                playerX = Player(playerName, playerMarker);
                console.log(playerX);
            } else {
                playerO = Player(playerName, playerMarker);
                console.log(playerO);
            }
        })
    })
    console.log(playerX);
    return {playerX, playerO}
})();
