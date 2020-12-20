let piecesInitialPlace = {
    blackPawn : {
        position: ['a7','b7','c7','d7','e7','f7','g7','h7'],
        htmlcode: '&#9823;'
    },
    blackKing : {
        position:'e8',
        htmlcode: '&#9818;'
    },
    blackQueen : {
        position: 'd8',
        htmlcode: '&#9819;'
    },
    blackBishop: {
        position: ['c8', 'f8'],
        htmlcode: '&#9821;'
    },
    blackKnight:{
        position: ['b8','g8'],
        htmlcode: '&#9822;'
    },
    blackRook : {
        position: ['a8','h8'],
        htmlcode: '&#9820;'
    },
    whitePawn : {
        position: ['a2','b2','c2','d2','e2','f2','g2','h2'],
        htmlcode: '&#9817;'
    },
    whiteKing : {
        position: 'e1',
        htmlcode: '&#9813;'
    },
    whiteQueen : {
        position: 'd1',
        htmlcode: '&#9812;'
    },
    whiteBishop: {
        position: ['c1', 'f1'],
        htmlcode: '&#9815;'
    },
    whiteKnight:{
        position:['b1','g1'],
        htmlcode: '&#9816;'
    },
    whiteRook : {
        position:['a1','h1'],
        htmlcode: '&#9814;'
    }
};


// insert the initial chess piece
const setChessPieces = (chessObj,piecesInitialPlace) => {
    let keys = Object.keys(piecesInitialPlace);
    for (let key in keys){
        const {position, htmlcode} = piecesInitialPlace[keys[key]];
        // console.log(typeof position);
        // if piece is multiple 
        if (typeof position == "object"){
            for(let rowKey in position){
                chessObj[position[rowKey]]['piece'] = htmlcode;
            };
        } else {
            chessObj[position]['piece'] = htmlcode;
        }
    }
    return chessObj;
}

// draw pieces
const drawChessPieces = (chessObj) => {
    let keys = Object.keys(chessObj);
    for (let chessBox in keys){
        const chessBoxSelected = document.getElementById(keys[chessBox]);
        const chessPieceBox = document.createElement("div");
        chessPieceBox.innerHTML = chessObj[keys[chessBox]]['piece'];
        chessPieceBox.setAttribute("class","chess-piece");
        chessBoxSelected.appendChild(chessPieceBox);
    };
    console.log(chessObj);
}

chessObj = setChessPieces(chessObj,piecesInitialPlace);
drawChessPieces(chessObj);