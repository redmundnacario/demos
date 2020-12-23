import { CheckIfChecked } from './check.js';

export const CheckCastling = function (state) {
    let {
        active_chess_box_id,
        active_chess_player,
        active_chess_obj,
        castling,
        checked
        } = state;

    if (active_chess_obj[active_chess_box_id].piece.position == "king"){
        // console.log("king")
        if(castling[active_chess_player] != null){
            // Rule 2 check if king is being checked in its location.
            CheckIfChecked(state,  null)
            
            if (checked[active_chess_player] == null){
                // Passed rule 2
                let { 
                    king_side,
                    queen_side,
                    } = castling[active_chess_player];

                [king_side, queen_side].forEach(side => {
                    if (side.rook.status == false) {

                        checkEmptyBoxes(side.space_empty,
                                        active_chess_obj);

                        if (side.space_empty.status == true) {
                            if (side.space_attacked.status == false) {
                                document.getElementById(side.king_move).
                                    classList.add("castling")
                            } ;
                        } ;
                    } ;
                });

            } else {
                
            };
        };
    };
    console.log(state.castling)
};

const checkEmptyBoxes = function(space_empty , active_chess_obj) {
    let result = []
    space_empty.location.forEach(value => {
        if (active_chess_obj[value].piece){
            // empty
            return true;
        } else {
            // occuppied
            return false;
        };
    });
    // reverse to convert false to true.
    space_empty.status =!result[0] & !result[1];
};