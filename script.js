gameMoves = [null, null ,null, null ,null,null,null, null ,null];

const gameBoard = document.querySelectorAll(`.gameGrid`);

gameBoard.forEach( (grid) => {
    grid.addEventListener(`click`, (e) => {
        const index = e.currentTarget.dataset.indexNumber;
        if (!e.currentTarget.textContent) {
            gameMoves.splice(index,1,`X`);
            displayMoves();
            console.log(`clicked`);
        }
    })
})

function displayMoves() {
    gameMoves.forEach( (move, index) => {
        gameBoard[index].textContent = move;
    })
}