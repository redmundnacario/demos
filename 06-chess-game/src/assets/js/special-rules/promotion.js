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
                                        position: 'queen'
                                    };
            setInnerHtml(nextBox, chessPieceMoved.piece.htmlcode);
            toggleAlert("Pawn Promoted!")
        };

        if(chessPieceMoved.rowNumber == 1 & active_chess_player == "black"){
            chessPieceMoved.piece =  {  
                                        htmlcode: '&#9819;',
                                        kingdom: 'black',
                                        position: 'queen'
                                    };
            setInnerHtml(nextBox, chessPieceMoved.piece.htmlcode);
            toggleAlert("Pawn Promoted!")
        };
    };
};