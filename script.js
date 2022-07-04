const playerFactory = (name, side) => {
    return {
        name, side,
    }
};

const playerX = playerFactory('Joe Schmoe', 'x');

const playerY = playerFactory('John Doe', 'o');

/* module to keep track of game info */ 
const Game = (() => {
    let turn = ' ';

    return { 
        turn, 
    }

})();

Game.turn = 'x';

/* Module for interacting with the html game board */ 
const Gameboard = (() => {
    let gameboard = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
    let tiles = document.getElementsByClassName('game-tile');
    
    
    const assignSelections = () => {
        for (i = 0; i < gameboard.length; i++) {
            if (gameboard[i] === 'x') {
                tiles[i].innerHTML = 'x'
            }
            else if (gameboard[i] === 'o') {
                tiles[i].innerHTML = 'o'
            }

            else {
                tiles[i].innerHTML = ' ';
            }
        }
    }; 


    const activateTiles = () => {
        for (let i = 0; i < gameboard.length; i++) {
            tiles[i].addEventListener('click', () => {
                if (Game.turn === 'x') {
                    gameboard[i] = 'x';
                    assignSelections();
                    Game.turn = 'o';
                }
                else if (Game.turn === 'o') {
                    gameboard[i] = 'o';
                    assignSelections();
                    Game.turn = 'x';
                }
            })

        }

    }

    return {
        gameboard,
        tiles,
        assignSelections,
        activateTiles,
    }

})();

Gameboard.activateTiles();





const Display = (() => {
    let turnIndicator = document.getElementById('control-display');

    return {
        turnIndicator,
    }

})();
