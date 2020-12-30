import { setInnerImg } from './utils.js';

export const EnPassant = function (state, chessPieceMoved, chessPieceOriginalBox) {
    let {
        active_chess_obj,
        pawn_double_step_status,
        } = state;
    if (Boolean(pawn_double_step_status) & 
        chessPieceMoved.piece.position == "pawn" ){

        if (chessPieceMoved.colNumber - 
            pawn_double_step_status.colNumber == 0){

            if(pawn_double_step_status.rowNumber - 
                chessPieceOriginalBox.rowNumber == 0) {

                let pawnEnPassant = pawn_double_step_status.colLetter +
                                    pawn_double_step_status.rowNumber;
                // update chessObject
                active_chess_obj[pawnEnPassant].piece = null;
                // update dom
                
                setInnerImg(pawnEnPassant, "")
                
                console.log("En Passant!");
            };
        };
    };
    
    // update states
    state.active_chess_obj = active_chess_obj;
};

// Update the En Passant status in states
export const UpdateEnPassantState = function (state, chessPieceMoved, chessPieceOriginalBox) {
    if (chessPieceMoved.piece.position == "pawn" ){
        if (Math.abs(chessPieceMoved.rowNumber - 
                     chessPieceOriginalBox.rowNumber) == 2){

            state.pawn_double_step_status = {
                ...chessPieceMoved
            };

        } else {
            state.pawn_double_step_status = null;
        };
    } else {
        state.pawn_double_step_status = null;
    }
};
