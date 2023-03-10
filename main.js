console.log('hello world');

const gameBoard = (function() {
    const gameBoard = ["","","", "", "", "", "", "", ""];

    function render() {
        gameBoard.forEach((ele,ind) => {
            const div = document.createElement('div');
            div.classList="sqaure"
            document.querySelector('.game-board').appendChild(div)
        })
        }

    function reset () {
        document.querySelector('.game-board').innerHTML=""; 
        }

        function mark (ele,mark) {
            ele.textContent = mark;
        }

    return {
        render,
        reset,
        mark
    }
})();

function Player(name,marker) {
    this.name = name;
    this.marker = marker;
    
}




const Game = (() => {
    const players = [];
    function start() {
        createPlayers(players);
        gameBoard.render();
        console.log( players)
    }
    function reset() {
        gameBoard.reset()
    }
    function gameOver() {
        
    }
    return {
        start,
        reset
    }
})();


function createPlayers(players) {
    const player1Name = document.querySelector("#player1").value
    const player2Name = document.querySelector("#player2").value
    const player1 = new Player (player1Name, "x");
    players.push(player1)
    
    const player2 = new Player(player2Name, "o")
    players.push(player2)
    // console.log(player1, player2)
}

function play () {
    const squares = document.querySelectorAll(".square")
    squares.forEach((ele) => {
        console.log(ele)
        ele.addEventListener('click', () => {
            console.log(ele)
        })
    })
}

const startBut = document.querySelector('#start');
startBut.addEventListener('click', Game.start);
const restBut = document.querySelector('#restart')
restBut.addEventListener('click', Game.reset)