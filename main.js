
const gameBoard = (function() {
    const gameBoard = ["","","", "", "", "", "", "", ""];

    function render() {
        gameBoard.forEach((ele,ind) => {
            const div = document.createElement('div');
            div.classList="sqaure"
            document.querySelector('.game-board').appendChild(div)
        })
        // play();
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
    let playerTurn = "x";
    
    function changeMark() {
        if (playerTurn === "x") {
            playerTurn = "o"
        } else {
            playerTurn = "x"
        }
    }
    
    function start() {
        createPlayers(players);
        gameBoard.render();
        play();
        console.log( players)
    }

    function play () {
        const squares = document.querySelectorAll(".sqaure");
        squares.forEach((ele) => {
            ele.addEventListener('click', () => {
                if (!ele.textContent) {
                    gameBoard.mark(ele, playerTurn);   
                changeMark(); 
                }
                            
            })
        })
    }

    function reset() {
        gameBoard.reset()
        players.splice(0,2);
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



const startBut = document.querySelector('#start');
startBut.addEventListener('click', Game.start);
const restBut = document.querySelector('#restart')
restBut.addEventListener('click', Game.reset)