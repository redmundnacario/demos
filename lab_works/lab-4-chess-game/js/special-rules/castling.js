
const CheckCastling = function () {
    if(state.castling[active_chess_player] != null){
        // Rule 2 check if king is being checked in its location.
        CheckIfChecked(state,  null)
        
        if (state.checked[active_chess_player] == null){
            // Passed rule 2
            let { 
                rook_kingside_moved,
                rook_queenside_moved
                } = state.castling[active_chess_player]

            if (rook_kingside_moved.status == false) {
                
                
            } else {

            }





        } else {
            
        }
    }
}