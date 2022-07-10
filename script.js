const playerFactory = (name, side) => {
    return {
        name, side,
    }
};

let player1 = playerFactory('Joe Schmo', 'x');

let player2 = playerFactory('John Doe', 'o');

/* module to keep track of game info */ 
const Game = (() => {
    let turn = ' ';

    return { 
        turn, 
    }

})();

Game.turn = 'x';

/* Module to control display and player names */ 

const Display = (() => {
    let turnIndicator = document.getElementById('control-display');
    const xSubmitButton = document.getElementById('player-x-submit');
    const player1Form = document.getElementById('player-1-form');
    const player2Form = document.getElementById('player-2-form');
    const oSubmitButton = document.getElementById('player-o-submit');
    xSubmitButton.addEventListener('click', () => {
        player1 = playerFactory((document.getElementById('player-x-input').value), 'x')
        player1Form.style.display = 'none';
        player2Form.style.display = 'flex';
    })
    oSubmitButton.addEventListener('click', () => {
        player2 = playerFactory((document.getElementById('player-o-input').value), 'o');
        player2Form.style.display = 'none';
        document.getElementById('gameboard').style.display = 'grid';
        turnIndicator.style.display = 'block';
        if (player1.name === '') {
            turnIndicator.innerHTML = 'Turn: Player 1'
        }
        else {
            turnIndicator.innerHTML = `Turn: ${player1.name}`
        }
    })
    return {
        turnIndicator,
    }

})();

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
                    if (player2.name === '') {
                        Display.turnIndicator.innerHTML = 'Turn: Player 2'
                    }
                    else {
                        Display.turnIndicator.innerHTML = `Turn: ${player2.name}`
                    }
                    gameboard[i] = 'x';
                    assignSelections();
                    turnCounter++;
                    console.log(turnCounter);
                    checkForWinner();
                    Game.turn = 'o';
                }
                else if (Game.turn === 'o') {
                    if (player1.name === '') {
                        Display.turnIndicator.innerHTML = 'Turn: Player 1'
                    }
                    else {
                        Display.turnIndicator.innerHTML = `Turn: ${player1.name}`
                    }
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


