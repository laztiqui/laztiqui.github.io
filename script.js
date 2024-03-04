// define the object to hold game state
const board = [null, 1, null, 2, null, 3, null, 4,
    5, null, 6, null, 7, null, 8, null,
    null, 9, null, 10, null, 11, null, 12,
    null, null, null, null, null, null, null, null,
    null, null, null, null, null, null, null, null,
    13, null, 14, null, 15, null, 16, null,
    null, 17, null, 18, null, 19, null, 20,
    21, null, 22, null, 23, null, 24, null
]

//define important game variables
var maroonPoints = 0;
var orangePoints = 0;
//if turn is true, it is maroons turn else it is oranges turn
var turn = true;
var currentPieces;


var selectedPiece = {
    id: 0,
    index: -1,
    seventhSpace: false,
    ninthSpace: false,
    fourteenthSpace: false,
    eighteenthSpace: false,
    minusSeventhSpace: false,
    minusNinthSpace: false,
    minusFourteenthSpace: false,
    minusEighteenthSpace: false,
}

//get elements from DOM
var maroonPieces = document.getElementsByClassName("maroon");
var orangePieces = document.getElementsByClassName("orange");
var squares = document.getElementsByClassName("square");
var maroonScore = document.getElementById("maroonScore");
var orangeScore = document.getElementById("orangeScore");
var playerName = document.getElementsByClassName("playerStyle")

//event listener to make sure the page is loaded
window.addEventListener("load", function() { 

    //indicate that it is player 1's turn with color green
    playerName[0].style.color = "green";
    pieceEventListeners();

});


//function to add event listeners to pieces of current player

function pieceEventListeners (){
    if (turn){
        for (i = 0; i < maroonPieces.length; i++){
            maroonPieces[i].addEventListener("click", selectPiece);
        }
    } else{
        for (i = 0; i < orangePieces.length; i++){
            orangePieces[i].addEventListener("click", selectPiece);
        }
    }

}
//When a piece is clicked, this will run
function selectPiece (){
    clearSelected()
    selectedPiece.id = parseInt(event.target.id);
    selectedPiece.index = board.indexOf(parseInt(event.target.id));

    //put logic for maroon piece movement
    checkSpaces(selectedPiece.id, selectedPiece.index)
}

function clearSelected (){
    selectedPiece.id =0;
    selectedPiece.index= -1;
    selectedPiece.seventhSpace= false;
    selectedPiece.ninthSpace= false;
    selectedPiece.fourteenthSpace= false;
    selectedPiece.eighteenthSpace= false;
    selectedPiece.minusSeventhSpace= false;
    selectedPiece.minusNinthSpace= false;
    selectedPiece.minusFourteenthSpace= false;
    selectedPiece.minusEighteenthSpace= false;
}
//function to determine which spaces are available
function checkSpaces (id, index) {
    if (id < 13){
        //find availables spaces for maroon
        if (board[index + 7] === null && squares[index + 7].classList.contains("black") === true){
            //add that square to available moves
            selectedPiece.seventhSpace = true;
        }
        if (board[index + 9] === null && squares[index + 9].classList.contains("black") === true){
            //add that square to available moves
            selectedPiece.ninthSpace = true;
        }
        
    }else{
        //logic for orange piece movement
        //find availables spaces for maroon
        if (board[index - 7] === null && squares[index - 7].classList.contains("black") === true){
            //add that square to available moves
            selectedPiece.minusSeventhSpace = true;
        }
        if (board[index - 9] === null && squares[index - 9].classList.contains("black") === true){
            //add that square to available moves
            selectedPiece.minusNinthSpace = true;
        }
    }
    checkJumps(id, index)
}

function checkJumps(id, index){
    if (id < 13){
        //find availables spaces for maroon
        if (board[index + 14] === null && squares[index + 14].classList.contains("black") === true && board[index + 7] > 12) {
            //add that square to available moves
            selectedPiece.fourteenthSpace = true;
        }
        if (board[index + 18] === null && squares[index + 18].classList.contains("black") === true && board[index + 9] > 12){
            //add that square to available moves
            selectedPiece.eighteenthSpace = true;
        }
        
    }else{
        //logic for orange piece movement
        //find availables spaces for maroon
        if (board[index - 14] === null && squares[index - 14].classList.contains("black") === true && board[index - 7] <  13 && board[index - 7] !== null ){
            //add that square to available moves
            selectedPiece.minusFourteenthSpace = true;
        }
        if (board[index - 18] === null && squares[index - 18].classList.contains("black") === true && board[index - 9] < 13 && board[index - 9] !== null){
            //add that square to available moves
            selectedPiece.minusEighteenthSpace = true;
            
        }
    }
    squareClick(index)
}

function squareClick (index){
    //remove any previously pieces available cells if user clicks multiple pieces
    removeSquareListeners()
    if(selectedPiece.seventhSpace){
        squares[index + 7].setAttribute("onclick", "makeMove(7)");
    }

    if(selectedPiece.ninthSpace){
        squares[index + 9].setAttribute("onclick", "makeMove(9)");
    }

    if(selectedPiece.fourteenthSpace){
        squares[index + 14].setAttribute("onclick", "makeJump(14, 7)");
    }

    if(selectedPiece.eighteenthSpace){
        squares[index + 18].setAttribute("onclick", "makeJump(18, 9)");
    }

    if(selectedPiece.minusSeventhSpace){
        squares[index - 7].setAttribute("onclick", "makeMove(-7)");
    }

    if(selectedPiece.minusNinthSpace){
        squares[index - 9].setAttribute("onclick", "makeMove(-9)");
    }

    if(selectedPiece.minusFourteenthSpace){
        squares[index - 14].setAttribute("onclick", "makeJump(-14, -7)");
    }

    if(selectedPiece.minusEighteenthSpace){
        squares[index - 18].setAttribute("onclick", "makeJump(-18, -9)");
    }
}

function removeEventListeners(){
    if (turn){
        for (i = 0; i < maroonPieces.length; i++){
            maroonPieces[i].removeEventListener("click", selectPiece);
        }
    } else{
        for (i = 0; i < orangePieces.length; i++){
            orangePieces[i].removeEventListener("click", selectPiece);
        }
    }
    
}

function removeSquareListeners(){
    for (i=0; i < squares.length; i++){
        squares[i].removeAttribute("onclick");
    }
}

//function to actually move the piece
function makeMove(newIndex) {
    removeEventListeners();
    removeSquareListeners();

    //put gamestate changes in newBoard
    board[selectedPiece.index] = null;
    board[selectedPiece.index + newIndex] = selectedPiece.id;

    //update the view
    clearBoard();
    updateBoard();
    
}

function makeJump(index, captIndex){
    removeEventListeners();
    removeSquareListeners();

    //put gamestate changes in newBoard

    if (turn){
        board[selectedPiece.index + captIndex] = null;
        maroonPoints ++;
    } else {
        board[selectedPiece.index + captIndex] = null;
        orangePoints ++;
    }

    board[selectedPiece.index] = null;
    board[selectedPiece.index + index] = selectedPiece.id;

    //update the view
    clearBoard();
    updateBoard();
    
}

//update the board based on the gamestate
function updateBoard(){
    //compare previous state to last state and update dom based on any changes.
    for (i = 0; i <= 63; i++){
        if (board[i] !== null) {
            //create new piece
            newPiece = document.createElement('div');
            if (board[i] < 13){
                newPiece.className = "piece maroon";
                newPiece.id = board[i];
            } else if (board[i] >12){
                newPiece.className = "piece orange";
                newPiece.id = board[i];
            }
            squares[i].append(newPiece);
        }
    }
    var maroonScore = document.getElementById("maroonScore");
    var orangeScore = document.getElementById("orangeScore");
    maroonScore.innerHTML = maroonPoints;
    orangeScore.innerHTML = orangePoints;
    switchPlayer();
}

function clearBoard(){
    document.querySelectorAll('.piece').forEach(e => e.remove()); // got this from https://stackoverflow.com/questions/10842471/how-to-remove-all-elements-of-a-certain-class-from-the-dom
    
}

//function to switch player turn
function switchPlayer() {
    if (turn){
        turn = false;
        playerName[0].style.color = "white";
        playerName[1].style.color = "green";

    } else{
        turn = true;
        playerName[1].style.color = "white";
        playerName[0].style.color = "green";
    }
    pieceEventListeners();
    
}
