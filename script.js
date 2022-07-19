const playerFactory = (name, side) => {
    return {
        name, side,
    }
};

let player1 = playerFactory('Joe Schmo', 'x');

let player2 = playerFactory('John Doe', 'o');

/* module to keep track of game info */ 
const Game = (() => {
    let turn = 'x';
    let gameOn = 'yes';
    return { 
        turn, 
        gameOn,
    }

})();


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
        document.getElementById('gameboard-wrapper').style.display = 'flex';
        turnIndicator.style.display = 'block';
        if (player1.name === '') {
            turnIndicator.textContent = 'Turn: Player 1'
        }
        else {
            turnIndicator.textContent = `Turn: ${player1.name}`
        }
    })
    return {
        turnIndicator,
    }

})();

/* Module for interacting with the html game board */ 
const Gameboard = (() => {
    let gameboard = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
    const resetButton = document.getElementById('reset-button');
    let tiles = document.getElementsByClassName('game-tile');
    const xIcon = `<img src = ./icons/x.svg viewbox='0 0 100 100'>`
    const oIcon = `<img src = ./icons/o.svg viewbox='0 0 100 100'>`
    const assignSelections = () => {
        for (i = 0; i < gameboard.length; i++) {
            if (gameboard[i] === 'x') {
                tiles[i].innerHTML = xIcon;
            }
            else if (gameboard[i] === 'o') {
                tiles[i].innerHTML = oIcon;
            }

            else {
                tiles[i].innerHTML = ' ';
            }
        }
    }; 

    let turnCounter = 0;

    function pickRandom(array) {
        let random = Math.floor(Math.random() * array.length);
    
        return array[random];
    
    }

    let tileArray = [0, 1, 2, 3, 4, 5, 6, 7, 8];

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

        if (combinations.includes('xxx')) {
            Game.gameOn = 'no';
            if (player1.name === '') {
                Display.turnIndicator.textContent = 'Player 1 wins!'
            }
            else {
                Display.turnIndicator.textContent = `${player1.name} wins!`
            }
        }

        else if (combinations.includes('ooo')) {
            Game.gameOn = 'no';
            if (player2.name === '') {
                Display.turnIndicator.textContent = 'Player 2 wins!'
            }
            else {
                Display.turnIndicator.textContent = `${player2.name} wins!`
            }
        }

        else if (turnCounter >= 9 && !combinations.includes('xxx') && !combinations.includes('ooo')) {
            Display.turnIndicator.textContent = 'It\'s a draw!'
        }


    }

    function determineSelection(i) {return function() {
        if (Game.gameOn === 'yes') {
            if (Game.turn === 'x') {
                if (player2.name === '') {
                    Display.turnIndicator.textContent = 'Turn: Player 2'
                }
                else {
                    Display.turnIndicator.textContent = `Turn: ${player2.name}`
                }
                gameboard[i] = 'x';
                assignSelections();
                turnCounter++;
                tileArray.splice(i, 1);
                checkForWinner();
                Game.turn = 'o';
                if (document.getElementById('ai-selection').checked) {
                    let aiSelection = pickRandom(tileArray);
                    console.log(aiSelection);
                    tiles[aiSelection].click();
                    tileArray.splice(aiSelection, 1);
                }
            }
            else if (Game.turn === 'o') {
                if (player1.name === '') {
                Display.turnIndicator.textContent = 'Turn: Player 1'
                }
                else {
                    Display.turnIndicator.textContent = `Turn: ${player1.name}`
                }
                gameboard[i] = 'o';
                assignSelections();
                turnCounter++;
                checkForWinner();
                Game.turn = 'x';
            }
        }
    }}
    

    



    const activateTiles = () => {
        for (let i = 0; i < gameboard.length; i++) {
            tiles[i].addEventListener('click', determineSelection(i), 
                {once : true})
        }
    }

    resetButton.addEventListener('click', () => {
        if (turnCounter > 0) {
            turnCounter = 0;
            console.log(turnCounter);
            gameboard = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
            assignSelections();
            if (Game.turn === 'o') {
                Game.turn = 'x';
            };
            Game.gameOn = 'yes';
            console.log(Game.turn);
            activateTiles();
        }
    })

    for (let tile of tiles) {
        tile.addEventListener('mouseenter', () => {
            tile.style.background = '#a3a3a3';
        })
    }

    for (let tile of tiles) {
        tile.addEventListener('mouseleave', () => {
            tile.style.background = '#e5e5e5';
        })
    }
    

    return {
        tiles,
        activateTiles,
    }

})();

Gameboard.activateTiles();


