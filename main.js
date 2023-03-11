//GAME BOARD MODUEL
const gameBoard = (function() {
    let gameBoard = ["","","", "", "", "", "", "", ""];

    function render() {
        gameBoard.forEach((ele,ind) => {
            const div = document.createElement('div');
            div.classList="sqaure";
            div.id = ind;
            document.querySelector('.game-board').appendChild(div)
            
        })
        showNames();
        }

    function reset () {
        document.querySelector('.game-board').innerHTML=""; 
        gameBoard = ["","","", "", "", "", "", "", ""];
        }

        function mark (ele,mark) {
            ele.textContent = mark;
            gameBoard[ele.id] = mark;            
        }
        function showNames() {
            document.querySelector('.name1').textContent = document.querySelector('#player1').value.toUpperCase();
            document.querySelector('.name2').textContent = document.querySelector('#player2').value.toUpperCase();
            document.querySelector('.names').className = "active"
            
        }

        function getGameBoard() {
            return gameBoard;
        }

    return {
        render,
        reset,
        mark,
        getGameBoard,
        // showNames
    }
})();


//PLAYER OBJECT
function Player(name,marker) {
    this.name = name;
    this.marker = marker;
    
}



// GAME LOGIC MODUEL
const Game = (() => {
    const players = [];
    let playerTurn = "x";
    
    function start() {
        
        const error = createPlayers();
        if(error) { 
            return
        }
        if (document.querySelector('.game-board').firstChild) {
            console.log("has child")
            gameBoard.render();
        } else {
            console.log("has no child")
        }
        play();
    }

    function play () {
        const squares = document.querySelectorAll(".sqaure");
        squares.forEach((ele) => {
            ele.addEventListener('click', () => {
                if (!ele.textContent) {
                    gameBoard.mark(ele, playerTurn);   
                    gameWinner();
                    changeMark();
                    checkForTie();    
                }
                            
            })
        })
    }

    function changeMark() {
        playerTurn = playerTurn === "x" ? "o" : "x"
    }   

    function gameWinner () {
        let mark = gameBoard.getGameBoard();
        const winCases = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ]
        winCases.forEach((cas)=> {
            const [x, y, z] = cas;
            let index = playerTurn === "x" ? 0 : 1
            if (mark[x] && mark[x] === mark[y] && mark[x] === mark[z]) {
                console.log(index)
                document.querySelector('.msg').textContent = `${players[index].name.toUpperCase()} WON THE GAME`
            }
        })
        }
    
    function checkForTie() {
        const game = gameBoard.getGameBoard().every(board => !board == "");
        if (game) {
            document.querySelector('.msg').textContent = "Game is Tie "
        }
    }
    function reset() {
        gameBoard.reset()
        players.splice(0,2);
        playerTurn = "x"
    }

    function createPlayers() {    
        const player1Name = document.querySelector("#player1").value
        const player2Name = document.querySelector("#player2").value
        if(player1Name === "" && player2Name === "") { 
            alert("please enter player names");
            return true ;
        }
        const player1 = new Player (player1Name, "x");
        players.push(player1) 
        const player2 = new Player(player2Name, "o")
        players.push(player2)
    }

    return {
        start,
        reset
    }
})();






const startBut = document.querySelector('#start');
startBut.addEventListener('click', Game.start);
const restBut = document.querySelector('#restart')
restBut.addEventListener('click', Game.reset)