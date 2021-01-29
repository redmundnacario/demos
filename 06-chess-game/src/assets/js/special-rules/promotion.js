import { setInnerHtml } from '../utils.js';

//components
import { toggleAlert } from '../components/alert.js';

/*
Promotes Pawn when it reaches the last row
*/ 

export const PawnPromotion = function(nextBox, chessPieceMoved,
                                      active_chess_player ){
    if (chessPieceMoved.piece.position == "pawn"){
        if(chessPieceMoved.rowNumber == 8 & active_chess_player == "white"){
            chessPieceMoved.piece =  {  
                                        htmlcode: '&#9813;',
                                        kingdom: 'white',
                                        position: 'queen',
                                        img: "./assets/img/wQ.png"
                                    };
            document.getElementById(nextBox).innerHTML = `<img class="chess-piece" src="${chessPieceMoved.piece.img}"/>`
            toggleAlert("Pawn Promoted!")
        };

        if(chessPieceMoved.rowNumber == 1 & active_chess_player == "black"){
            chessPieceMoved.piece =  {  
                                        htmlcode: '&#9819;',
                                        kingdom: 'black',
                                        position: 'queen',
                                        img: "./assets/img/bQ.png"
                                    };
            document.getElementById(nextBox).innerHTML = `<img class="chess-piece" src="${chessPieceMoved.piece.img}"/>`
           
            toggleAlert("Pawn Promoted!")
        };
    };
};