let playerX;
let playerO;
let gameOver;
let onePlayer;
let twoPlayer;

// gameBoard listens for moves and updates the gameboard
const gameBoard = (function() {

    let gameMoves = [null, null, null, null, null, null, null, null, null];
    let currentMove = `X`;

    const gridsToSelect = document.querySelectorAll(`.gameGrid`);
    gridsToSelect.forEach( (grid) => {
        grid.addEventListener(`click`, (e) => {
            let numberOfMoves = gameMoves.filter(move => move).length;

            if (!playerX) {                             // instantiates playerX object if input is blank
                playerX = Player(`anonymous`, `X`);
                currentMove = playerX.marker;
            }
            if (!playerO && twoPlayer) {                // instantiates playerO object if input is blank and two player game is selected
                playerO = Player(`anonymous`, `O`);
            }
            const index = e.currentTarget.dataset.indexNumber;
            if (!gameOver && !e.currentTarget.textContent && twoPlayer) {   // populates the board for a two-player game
                gameMoves.splice(index, 1, currentMove);
                displayMoves(index, currentMove);
                executeGame.checkForWinner(currentMove, gameMoves);
            }
            if (!gameOver && !e.currentTarget.textContent && onePlayer && currentMove === `X`) {    // populates the board for a one person game vs computer
                gameMoves.splice(index, 1, currentMove);
                displayMoves(index, currentMove);
                executeGame.checkForWinner(currentMove, gameMoves);
                numberOfMoves = gameMoves.filter(move => move).length;
                while (!gameOver && numberOfMoves === gameMoves.filter(move => move).length && gameMoves.filter(move => move).length < 8 && currentMove === `O`) {
                    computerPlayEasy();
                }
            }
        })
    })

    function computerPlayEasy() {
        let cpuIndex = Math.floor(Math.random() * 9);
        if (!gameMoves[cpuIndex]) {
            gameMoves[cpuIndex] = `O`;
            displayMoves(cpuIndex, `O`);
        }
        executeGame.checkForWinner(`X`, gameMoves);
    }

    function clearBoard() {
        gridsToSelect.forEach( (grid) => {
            grid.textContent = null;
        })
        currentMove = `X`;
        numberOfMoves = null;
        gameMoves = [null, null, null, null, null, null, null, null, null];
    }

    function displayMoves(index, marker) {       // also toggles player marker
        gridsToSelect[index].textContent = marker;
            if (currentMove === playerX.marker) {
                currentMove = playerO.marker;
            } else {
                currentMove = playerX.marker;
            }
    }

    return {
        gameMoves,
        displayMoves,
        clearBoard,
    }
})();


// factory function to create playerX and playerO
const Player = (name, marker) => {
    const getName = () => name;
    const getMarker = () => marker;
    return {name, marker};
}

// game module handles UI, checks/decalres winner, generates computer play, instantiates players
const executeGame = (function() {

    const settingsContainer = document.querySelector(`#user-settings`);
    const gameModeButtons = document.querySelectorAll(`.chooseGame`);
    const buttonsContainer = document.querySelector(`#buttons-container`);
    const userSettings = document.querySelector(`#inputs-container`);

    gameModeButtons.forEach( (button) => {
        button.addEventListener(`click`, buttonEvent)
        // (e) => {
        //     if (!onePlayer && !twoPlayer) {
        //         if (e.currentTarget.id === `twoPlayer`) {
        //             twoPlayer = true;
        //             displayNameFields();
        //         } else {
        //             onePlayer = true;
        //             playerO = Player(`Computer`, `O`);
        //             displayNameFields();
        //         }
        //         buttonsContainer.removeChild(gameModeButtons[0]);
        //         buttonsContainer.removeChild(gameModeButtons[1]);
        //     }
        // })
    })

    function buttonEvent(e) {
        if (!onePlayer && !twoPlayer) {
            if (e.currentTarget.id === `twoPlayer`) {
                twoPlayer = true;
                displayNameFields();
            } else {
                onePlayer = true;
                playerO = Player(`Computer`, `O`);
                displayNameFields();
            }
            buttonsContainer.removeChild(gameModeButtons[0]);
            buttonsContainer.removeChild(gameModeButtons[1]);
        }
    }

    function displayNameFields() {      // creates appropriate name inputs when button for number of players is selected
        if (onePlayer || twoPlayer) {
            const labelX = document.createElement(`label`);
            labelX.textContent = `Player X: `;
            labelX.setAttribute(`for`, `playerX`);
            userSettings.appendChild(labelX);

            const inputX = document.createElement(`input`);
            inputX.setAttribute(`type`, `text`);
            inputX.setAttribute(`placeholder`, `enter a name`);
            inputX.setAttribute(`class`, `nameInputs`);
            inputX.setAttribute(`data-marker`, `X`);
            inputX.setAttribute(`name`, `playerX`);
            userSettings.appendChild(inputX);
        }
        if (twoPlayer) {
            const labelO = document.createElement(`label`);
            labelO.textContent = `Player O: `;
            labelO.setAttribute(`for`, `playerO`);
            userSettings.appendChild(labelO);

            const inputO = document.createElement(`input`);
            inputO.setAttribute(`type`, `text`);
            inputO.setAttribute(`placeholder`, `enter a name`);
            inputO.setAttribute(`class`, `nameInputs`);
            inputO.setAttribute(`data-marker`, `O`);
            inputO.setAttribute(`name`, `playerO`);
            userSettings.appendChild(inputO);
        }
        const nameField = document.querySelectorAll(`.nameInputs`);
        nameField.forEach( (input) => {
            input.addEventListener(`change`, (e) => {
                const userName = e.target.value;
                const userMarker = e.target.dataset.marker;
                if (e.target.dataset.marker === `X`) {
                    playerX = Player(userName, userMarker);
                    // displayPlayers(e);
                } else if (twoPlayer) {
                    playerO = Player(userName, userMarker);
                    // displayPlayers(e);
                }
            })
        })
    }

    function buildButtons() {
        const onePlayerButton = document.createElement(`button`);
        onePlayerButton.textContent = `One Player`;
        onePlayerButton.classList.add(`chooseGame`)
        onePlayerButton.setAttribute(`id`, `onePlayer`);
        onePlayerButton.addEventListener(`click`, buttonEvent)
        buttonsContainer.appendChild(onePlayerButton);
    
        const twoPlayerButton = document.createElement(`button`);
        twoPlayerButton.textContent = `Two Players`;
        twoPlayerButton.classList.add(`chooseGame`)
        twoPlayerButton.setAttribute(`id`, `twoPlayer`);
        twoPlayerButton.addEventListener(`click`, buttonEvent)
        buttonsContainer.appendChild(twoPlayerButton);

        // const newButtons = document.querySelectorAll(`.chooseGame`);
        // newButtons.forEach( (button) => {
        //     button.addEventListener(`click`, buttonEvent)
        // })
    }

    // function displayPlayers(e) {
    //     const settingsContainer = document.querySelector(`#user-settings`);
    //     const namesToDisplay = document.createElement(`p`);
    //     settingsContainer.removeChild(userSettings);
    //     if (onePlayer) {
    //         namesToDisplay.textContent = `${playerX.name} vs. Computer`;
    //     } else {
    //         namesToDisplay.textContent = `${playerX.name} vs. ${playerO.name}`;
    //     }
    //     buttonsContainer.appendChild(namesToDisplay);
    // }
    
    function checkForWinner( move , board ) {
        let movesMade = board.filter(moves => moves).length
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
                declareWinner( move );
            } else if (movesMade === 9) {
                alertWinner(`Tie game!`);
            }
    }

    function declareWinner(move) {
        if (move === playerO.marker) {
            if (playerX.name === `anonymous`) {
                alertWinner(`Player X`);
            } else {
                alertWinner(playerX.name);
            }
        }
        if (move === playerX.marker) {
            if (playerO.name === `anonymous`) {
                alertWinner(`Player O`);
            } else {
                alertWinner(playerO.name);
            }
        }
    }

    function alertWinner(result) {
        const resultModal = document.querySelector(`#resultModal`);
        const resultMessage = document.querySelector(`#result-display`);
        const playAgainButton = document.querySelector(`#play-again`);
        const changeSettingsButton = document.querySelector(`#change-settings`);
        gameOver = true;
        if (result !== `Tie game!`) {
            resultMessage.textContent = `${result} wins!`;
        } else {
            resultMessage.textContent = result;
        }
        resultModal.style.display = `block`;
        playAgainButton.addEventListener(`click`, playAgain);
        changeSettingsButton.addEventListener(`click`, changeSettings);
        return {resultModal}
    }

    function playAgain() {
        gameBoard.clearBoard();
        resultModal.style.display = `none`;
        gameOver = false;
    }

    function changeSettings() {
        playAgain();
        onePlayer = null;
        twoPlayer = null;
        playerX = null;
        playerO = null;
        settingsContainer.removeChild(userSettings);
        buildButtons();
    }

    return { 
                checkForWinner, 
                declareWinner,
            }
})();