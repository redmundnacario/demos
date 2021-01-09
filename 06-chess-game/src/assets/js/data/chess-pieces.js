export const InitialChessPieceData = function(){
    this.data = {
        blackPawn : {
            location: ['a7', 'b7', 'c7', 'd7', 'e7', 'f7',
                    'g7', 'h7'],
            htmlcode: '&#9823;',
            kingdom: 'black',
            position: 'pawn',
            img: "./assets/img/bP.png"
        },
        blackKing : {
            location:'e8',
            htmlcode: '&#9818;',
            kingdom: 'black',
            position: 'king',
            img: "./assets/img/bK.png"
        },

        blackQueen : {
            location: 'd8',
            htmlcode: '&#9819;',
            kingdom: 'black',
            position: 'queen',
            img: "./assets/img/bQ.png"
        },
        blackBishop: {
            location: ['c8', 'f8'],
            htmlcode: '&#9821;',
            kingdom: 'black',
            position: 'bishop',
            img: "./assets/img/bB.png"
        },
        blackKnight:{
            location: ['b8','g8'],
            htmlcode: '&#9822;',
            kingdom: 'black',
            position: 'knight',
            img: "./assets/img/bN.png"
        },

        blackRook : {
            location: ['a8','h8'],
            htmlcode: '&#9820;',
            kingdom: 'black',
            position: 'rook',
            img: "./assets/img/bR.png"
        },
        whitePawn : {
            location: ['a2', 'b2', 'c2', 'd2', 'e2', 'f2',
                    'g2', 'h2'],
            htmlcode: '&#9817;',
            kingdom: 'white',
            position: 'pawn',
            img: "./assets/img/wP.png"
        },
        whiteKing : {
            location: 'e1',
            htmlcode: '&#9812;',
            kingdom: 'white',
            position: 'king',
            img: "./assets/img/wK.png"
        },

        whiteQueen : {
            location: 'd1',
            htmlcode: '&#9813;',
            kingdom: 'white',
            position: 'queen',
            img: "./assets/img/wQ.png"
        },
        whiteBishop: {
            location: ['c1', 'f1'],
            htmlcode: '&#9815;',
            kingdom: 'white',
            position: 'bishop',
            img: "./assets/img/wB.png"
        },
        whiteKnight:{
            location:['b1','g1'],
            htmlcode: '&#9816;',
            kingdom: 'white',
            position: 'knight',
            img: "./assets/img/wN.png"
        },

        whiteRook : {
            location:['a1','h1'],
            htmlcode: '&#9814;',
            kingdom: 'white',
            position: 'rook',
            img: "./assets/img/wR.png"
        }
    };
}
