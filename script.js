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

    let turnCounter = 0;

    const checkForWinner = () => {
        let combinations = [];
        combinations.push([gameboard[0], gameboard[1], gameboard[2]].join(''));
        combinations.push([gameboard[3], gameboard[4], gameboard[5]].join(''));
        combinations.push([gameboard[6], gameboard[7], gameboard[8]].join(''));
        combinations.push([gameboard[0], gameboard[3], gameboard[6]].join(''));
        combinations.push([gameboard[1], gameboard[4], gameboard[7]].join(''));
        combinations.push([gameboard[2], gameboard[5], gameboard[8]].join(''));
        combinations.push([gameboard[0], gameboard[4], gameboard[8]].join(''));
        combinations.push([gameboard[2], gameboard[4], gameboard[6]].join(''));
        console.table(combinations);

        if (combinations.includes('xxx')) {
            alert('Player 1 wins');
        }

        else if (combinations.includes('ooo')) {
            alert('Player 2 wins')
        }

        else if (turnCounter >= 9 && !combinations.includes('xxx') && !combinations.includes('ooo')) {
            alert('It\'s a draw!')
        }


    }




    const activateTiles = () => {
        for (let i = 0; i < gameboard.length; i++) {
            tiles[i].addEventListener('click', () => {
                if (Game.turn === 'x') {
                    gameboard[i] = 'x';
                    assignSelections();
                    turnCounter++;
                    console.log(turnCounter);
                    checkForWinner();
                    Game.turn = 'o';
                }
                else if (Game.turn === 'o') {
                    gameboard[i] = 'o';
                    assignSelections();
                    turnCounter++;
                    console.log(turnCounter)
                    checkForWinner();
                    Game.turn = 'x';
                }
            }, {once : true})

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
