let playerX;
let playerO;
let isGameOver;
let isOnePlayer;
let isTwoPlayer;

// gameBoard listens for moves and updates the gameboard
const gameBoard = (function() {

    let gameMoves = [null, null, null, null, null, null, null, null, null];
    let currentMove = `X`;

    function setAnonymousPlayers(e) {
        if (!playerX && isOnePlayer) {                             // instantiates playerX object if input is blank
            playerX = Player(`anonymous`, `X`);
            currentMove = playerX.marker;
            executeGame.displayPlayers(e);
        }
        if ((!playerX || !playerO) && isTwoPlayer) {               // instantiates both player objects if input is blank
            playerX = Player(`anonymous`, `X`);
            currentMove = playerX.marker;          
            playerO = Player(`anonymous`, `O`);
            executeGame.displayPlayers(e);
        }
    }

    const gridsToSelect = document.querySelectorAll(`.gameGrid`);
    gridsToSelect.forEach( (grid) => {
        grid.addEventListener(`click`, (e) => {
            let numberOfMovesPlayed = gameMoves.filter(move => !!move).length;
            setAnonymousPlayers(e)
            // if (!playerX && isOnePlayer) {                             // instantiates playerX object if input is blank
            //     playerX = Player(`anonymous`, `X`);
            //     currentMove = playerX.marker;
            //     executeGame.displayPlayers(e);
            // }
            // if ((!playerX || !playerO) && isTwoPlayer) {               // instantiates both player objects if input is blank
            //     playerX = Player(`anonymous`, `X`);
            //     currentMove = playerX.marker;          
            //     playerO = Player(`anonymous`, `O`);
            //     executeGame.displayPlayers(e);
            // }
            const index = e.currentTarget.dataset.indexNumber;
            if (!isGameOver && !e.currentTarget.textContent && isTwoPlayer) {   // populates the board for a two-player game
                gameMoves.splice(index, 1, currentMove);
                displayMoves(index, currentMove);
                executeGame.checkForWinner(currentMove, gameMoves);
            }
            if (!isGameOver && !e.currentTarget.textContent && isOnePlayer && currentMove === `X`) {    // populates the board for a one person game vs computer
                gameMoves.splice(index, 1, currentMove);
                displayMoves(index, currentMove);
                executeGame.checkForWinner(currentMove, gameMoves);
                numberOfMovesPlayed = gameMoves.filter(move => !!move).length;
                while (!isGameOver && numberOfMovesPlayed === gameMoves.filter(move => !!move).length && gameMoves.filter(move => !!move).length < 8 && currentMove === `O`) {
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
        numberOfMovesPlayed = 0;
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
    })
    function buttonEvent(e) {
        if (!isOnePlayer && !isTwoPlayer) {
            if (e.currentTarget.id === `isTwoPlayer`) {
                isTwoPlayer = true;
                displayNameFields();
            } else {
                isOnePlayer = true;
                playerO = Player(`Computer`, `O`);
                displayNameFields();
            }
            while (buttonsContainer.firstChild) {
                buttonsContainer.removeChild(buttonsContainer.firstChild);
            }
        }
    }

    function displayNameFields() {      // creates appropriate name inputs when button for number of players is selected
        if (isOnePlayer || isTwoPlayer) {
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
        if (isTwoPlayer) {
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
                    displayPlayers(e);
                } else if (isTwoPlayer) {
                    playerO = Player(userName, userMarker);
                    displayPlayers(e);
                }
            })
        })
    }

    function buildButtons() {
        const isOnePlayerButton = document.createElement(`button`);
        isOnePlayerButton.textContent = `One Player`;
        isOnePlayerButton.classList.add(`chooseGame`)
        isOnePlayerButton.setAttribute(`id`, `isOnePlayer`);
        isOnePlayerButton.addEventListener(`click`, buttonEvent)
        buttonsContainer.appendChild(isOnePlayerButton);
    
        const isTwoPlayerButton = document.createElement(`button`);
        isTwoPlayerButton.textContent = `Two Players`;
        isTwoPlayerButton.classList.add(`chooseGame`)
        isTwoPlayerButton.setAttribute(`id`, `isTwoPlayer`);
        isTwoPlayerButton.addEventListener(`click`, buttonEvent)
        buttonsContainer.appendChild(isTwoPlayerButton);
    }

    function displayPlayers(e) {
        const settingsContainer = document.querySelector(`#user-settings`);
        const namesToDisplay = document.createElement(`p`);
        if (isOnePlayer) {
            namesToDisplay.textContent = `${playerX.name} vs. Computer`;
            while (userSettings.firstChild) {
                userSettings.removeChild(userSettings.firstChild);
            }
            buttonsContainer.appendChild(namesToDisplay);
        } else if (isTwoPlayer && ((e.target.dataset.marker === `O` && e.target.value) || (playerX.name === `anonymous` && playerX.name === playerO.name))) {
            namesToDisplay.textContent = `${playerX.name} vs. ${playerO.name}`;
            while (userSettings.firstChild) {
                userSettings.removeChild(userSettings.firstChild);
            }
            buttonsContainer.appendChild(namesToDisplay);
        }
    }
    
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
        isGameOver = true;
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
        isGameOver = false;
    }

    function changeSettings() {
        playAgain();
        isOnePlayer = null;
        isTwoPlayer = null;
        playerX = null;
        playerO = null;
        while (buttonsContainer.firstChild) {
            buttonsContainer.removeChild(buttonsContainer.firstChild)
        }
        buildButtons();
    }

    return { 
                checkForWinner, 
                declareWinner,
                displayPlayers,
            }
})();