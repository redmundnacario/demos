// alert("draw-tiles.js connected")

export const DrawChessTiles = function () {
    // Our main state/data for mapping chess pieces for every state change
    let chessObj = {};

    // Initializations of chess map
    let rowNumbers = 8;
    let letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    
    // Get the main parent element which is a grid
    const app = document.getElementById("app");

    // For loop per chess row
    for (let i=rowNumbers; i > 0 ; i--){
        
        // Dictates what color to start per row
        if (i%2 == 0){
            var colorInd = true;
        } else {
            var colorInd = false;
        };
        
        // For loop chess box per row
        for (let j=0; j < rowNumbers; j++){
            
            // Dictates the color per box in a row
            if (colorInd == true){
                var colorBox = "white";
                colorInd = false;
            } else {
                var colorBox = "black";
                colorInd = true;
            };

            let chessBox =letters[j]+i;
            //  Create element for chess box
            const box = document.createElement("div");

            // Set the class name list and id per box 

            // per class in class list denotes what style in css
            box.setAttribute("class", "chess-box "+colorBox +" " + chessBox);
            // the purpose of id is for locating the chess piece
            box.setAttribute("id", chessBox);
            // append to our main parent element
            app.appendChild(box);
            
            // set the state of our chess object
            chessObj[chessBox] = {
                rowNumber : i,
                colLetter : letters[j],
                colNumber : j,
                piece: null,
            };
        };
    };

    return chessObj;
};

// insert the initial chess piece
export const SetChessPieces = (chessObj, piecesInitialPlace) => {
    let keys = Object.keys(piecesInitialPlace);
    for (let key in keys){
        // Destructuring object
        let {location, htmlcode, kingdom, position} = piecesInitialPlace[keys[key]];
        // console.log(typeof location);
        // if piece is multiple 
        if (typeof location == "object"){
            for(let rowKey in location){
                chessObj[location[rowKey]].piece = { htmlcode,
                                                     kingdom,
                                                     position}
            };
        } else {
            chessObj[location].piece = { htmlcode,
                                         kingdom,
                                         position}
            
        }
    };
    return chessObj;
};

// draw pieces
export const DrawChessPieces = (chessObj) => {
    let keys = Object.keys(chessObj);
    for (let chessBox in keys){
        const chessBoxSelected = document.getElementById(keys[chessBox]);
        const chessPieceBox = document.createElement("div");
        chessPieceBox.innerHTML = (chessObj[keys[chessBox]].piece != null) ? (chessObj[keys[chessBox]].piece.htmlcode) : "" ;
        chessPieceBox.setAttribute("class","chess-piece");
        chessBoxSelected.appendChild(chessPieceBox);
    };
}

// redraw chess pieces
export const RedrawChessPieces = (chessObj) => {
    let keys = Object.keys(chessObj);
    for (let chessBox in keys){
        const chessBoxSelected = document.getElementById(keys[chessBox]);
        // console.log(chessBoxSelected)
        const chessPieceBox = document.createElement("div");
        chessPieceBox.setAttribute("class","chess-piece");
        chessPieceBox.innerHTML = (chessObj[keys[chessBox]].piece != null) ? (chessObj[keys[chessBox]].piece.htmlcode) : "" ;
        chessBoxSelected.replaceChild(chessPieceBox,chessBoxSelected.children[0]);
    };
}
