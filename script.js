console.log('hello world');

const Gameboard = (() => {
    let gameboard = ['x', 'o', 'x', 'o', 'x', 'o', 'x', 'o', 'x'];
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
    return {
        tiles,
        assignSelections,
    }

})();

Gameboard.assignSelections();