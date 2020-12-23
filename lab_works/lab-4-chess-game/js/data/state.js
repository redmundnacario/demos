// state -- initial value
let state = {
    active_chess_player : "white",
    active_chess_box_id : null,
     // Serves as history in the game
    chess_obj : [],
    // Current chess pieces positions in the map is based on this
    active_chess_obj: null, 
    // Needed for En Passant
    pawn_double_step_status: null,
    letters : ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'],
    king_location: {// Used in idenfifying check
        white: null,
        black: null
    },
    castling: {
        // set this to null if king moved RULE 1
        white : { 
            king_side : {
                // rook in encastle must not be moved, preferred false, RULE 3 
                //  space b/w rook and king must be empty, preferred true, RULE 4
                // 2 spaces lef/right of king was checked, preferred false, RULE 5
                rook: {
                    status: false,
                    location: ""
                },
                space_empty: {
                    status: false,
                    location: []
                },
                space_attacked: {
                    status: false,
                    location: []
                }
            },
            queen_side : {
                rook: {
                    status: false,
                    location: ""
                },
                space_empty: {
                    status: false,
                    location: []
                },
                space_attacked: {
                    status: false,
                    location: []
                }
            },
            
        },
        // set this to null if king moved RULE 1
        black : {
            king_side : {
                rook: {
                    status: false,
                    location: ""
                },
                space_empty: {
                    status: false,
                    location: []
                },
                space_attacked: {
                    status: false,
                    location: []
                }
            },
            queen_side : {
                rook: {
                    status: false,
                    location: ""
                },
                space_empty: {
                    status: false,
                    location: []
                },
                space_attacked: {
                    status: false,
                    location: []
                }
            },
        }
    },
    // also considered in castling, preferred false, RULE 2
    checked : {
        // white king being checked
        white: null,
        // black king checked 
        black: null  
    },
     // if checked = true and , all possible square to move are being attacked
    checkmate: {
         // white king being checkmate
        white: false,
        // black king checkmate
        black: false 
    },
    // if nor null, game stops, winner is declared, action done after checkmate,
    winner : null
};

export default state;
