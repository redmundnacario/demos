import { InitializeChessMap } from './main.js';
import { CHESS_DATA } from "./chess-pieces.js";


// state -- initial value
let state = {
    active_chess_player : "white",
    active_chess_box_id : null,
    chess_obj : [], // Serves as history in the game
    active_chess_obj: null, // Current chess pieces positions in the map is based on this
    pawn_double_step_status: null, // Needed for En Passant
    letters : ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'],
    king_location: {// Used in idenfifying check
        white: null,
        black: null
    },
    castling: {
        white : { // set this to null if king moved RULE 1
            rook_left_moved: false, // rook involve in encastle must not be moved earlier, preferred false, RULE 3 
            rook_right_moved: false, // rook involve in encastle must not be moved earlier, preferred false, RULE 3 
            kingside_empty: false, //  space b/w rook and king must be empty, preferred true, RULE 4
            queenside_empty: false, //  space b/w rook and king must be empty, preferred true, RULE 4
            kingside_attacked: false, // 2 spaces in left or right of the king is being attacked, preferred false, RULE 5
            queenside_attacked: false, // 2 spaces in left or right of the king is being attacked, preferred false, RULE 5
        },
        black : { // set this to null if king moved RULE 1
            rook_left_moved: false, // rook involve in encastle must not be moved earlier, preferred false, RULE 3 
            rook_right_moved: false, // rook involve in encastle must not be moved earlier, preferred false, RULE 3 
            kingside_empty: false, //  space b/w rook and king must be empty, preferred true, RULE 4
            queenside_empty: false, //  space b/w rook and king must be empty, preferred true, RULE 4
            kingside_attacked: false, // 2 spaces in left or right of the king is being attacked, preferred false, RULE 5
            queenside_attacked: false, // 2 spaces in left or right of the king is being attacked, preferred false, RULE 5
        }
    },
    checked : { // also considered in castling, preferred false, RULE 2
        white: null, // white king being checked
        black: null // black king checked  
    },
    checkmate: { // if checked = true and , all possible square to move are being attacked
        white: false, // white king being checkmate
        black: false // black king checkmate
    },
    // if nor null, game stops, winner is declared, action done after checkmate,
    winner : null
};


InitializeChessMap(state, CHESS_DATA);
