export function ChessGame() {

    this.chessObj;

    // app component - main parent element which is a grid
    this.app = document.getElementById("app");

    // Paints our chess board with black and white tiles
    this.DrawChessTiles = function () {
        // Our main state/data for mapping chess pieces for every state change
        let chessObj = {};
        let rowNumbers = 8;
        let letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
        
        // For loop per chess row
        for (let i=rowNumbers; i > 0 ; i--){
            let colorInd;
            // Dictates what color to start per row
            colorInd = i%2 == 0 ? true : false;
            
            // For loop chess box per row
            for (let j = 1; j < rowNumbers + 1; j++){
                let colorBox;
                // Dictates the color per box in a row
                if (colorInd == true){
                    colorBox = "white";
                    colorInd = false;
                } else {
                    colorBox = "black";
                    colorInd = true;
                };

                let chessBox = letters[j - 1]+i;
                //  Create element for chess box
                const box = document.createElement("div");
                box.setAttribute("class", "chess-box "+colorBox +" " + chessBox);
                box.setAttribute("id", chessBox);
                this.app.appendChild(box);
                
                // set the state of our chess object
                chessObj[chessBox] = {
                    rowNumber : i,
                    colLetter : letters[j-1],
                    colNumber : j,
                    piece: null,
                };
            };
        };
        this.chessObj = chessObj;
        // console.log(this.chessObj)
        // return chessObj;
    };

    // Insert the initial chess piece
    this.SetChessPieces = function(piecesInitialPlace, state) {
        // console.log(chessObj)
        let keys = Object.keys(piecesInitialPlace);
        for (let key in keys){
            // Destructuring object
            let {
                location, 
                htmlcode, 
                kingdom, 
                position, 
                img
                } = piecesInitialPlace[keys[key]];

            // console.log(typeof location);
            // if piece is multiple 
            if (typeof location == "object"){
                for(let rowKey in location){
                    this.chessObj[location[rowKey]].piece = { 
                                                            htmlcode,
                                                            kingdom,
                                                            position,
                                                            img 
                                                            }
                };
            } else {
                this.chessObj[location].piece = { 
                                                htmlcode,
                                                kingdom,
                                                position,
                                                img
                                                }

                if (position == "king") {
                
                    state.king_location[kingdom] = 
                        this.chessObj[location].colLetter +
                        this.chessObj[location].rowNumber;
                }   
            }
        };
        // return chessObj;
    };

    // Draw chess pieces, if initial is false, replaceChild method was used
    this.DrawChessPieces = function(chessObj, initial = true) {
        // console.log(chessObj)
        let keys = Object.keys(chessObj);
        for (let chessBox in keys){
            const chessBoxSelected = document.getElementById(keys[chessBox]);
            const chessPieceBox = document.createElement("img");
            chessPieceBox.setAttribute("class","chess-piece");
            chessPieceBox.setAttribute("src", 
                (chessObj[keys[chessBox]].piece != null) ? 
                (chessObj[keys[chessBox]].piece.img) :
                "" 
            );
            if ( initial == true ){
                chessBoxSelected.appendChild(chessPieceBox);
            } else {
                chessBoxSelected.replaceChild(chessPieceBox,
                    chessBoxSelected.children[0]);
            }
        };
    }

    // Remove Chess Pieces from HTML DOM
    this.UndrawChessPieces = function() {
        let keys = Object.keys(this.chessObj);
        for (let chessBox in keys){
            const chessBoxSelected = document.getElementById(keys[chessBox]);
            chessBoxSelected.removeChild(chessBoxSelected.childNodes[0])
        };
    }

    // attach classes to possible targets or moves (chess boxes) of a chess pieces
    this.AddClassesOfMovesOrTargetsSquares = function (possibleMoves,
                                                       possibleTargets) {
        possibleMoves.forEach((move) => {
            document.getElementById(move).classList.add("possible-move")
        })
        // console.log( "Possible Moves :", possibleMoves);

        // Attach some class in the target squares
        possibleTargets.forEach((move) => {
            document.getElementById(move).classList.add("possible-target")
        })
    // console.log( "Possible Targets:", possibleTargets);
    }

    this.RemoveClassesOfMovesOrTargetsSquares = function () {
        
        // chess boxes with selected, possible moves and target, casting class name,
        this.selected = document.querySelectorAll(".selected");
        this.possibleMoves = document.querySelectorAll(".possible-move");
        this.possibleTargets = document.querySelectorAll(".possible-target");
        this.castles = document.querySelectorAll(".castling");
    
        for (const value of this.selected){
            value.classList.remove("selected");
        }
        for (const value of this.possibleMoves){
            value.classList.remove("possible-move");
        }
        for (const value of this.possibleTargets){
            value.classList.remove("possible-target");
        }
        for (const value of this.castles){
            value.classList.remove("castling");
        }
    };

}