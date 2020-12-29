// state -- initial value
export let state = {
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
                king_move: "g1",
                rook_move: "f1",
                rook: {
                    status: false,
                    location: "h1"
                },
                space_empty: {
                    status: false,
                    location: ["f1","g1"]
                },
                space_attacked: {
                    status: false,
                    location: ["f1","g1"]
                }
            },
            queen_side : {
                king_move: "c1",
                rook_move: "d1",
                rook: {
                    status: false,
                    location: "a1"
                },
                space_empty: {
                    status: false,
                    location: ["c1" , "d1"]
                },
                space_attacked: {
                    status: false,
                    location: ["c1" , "d1"]
                }
            },
            
        },
        // set this to null if king moved RULE 1
        black : {
            king_side : {
                king_move: "g8",
                rook_move: "f8",
                rook: {
                    status: false,
                    location: "h8"
                },
                space_empty: {
                    status: false,
                    location: ["f8", "g8"]
                },
                space_attacked: {
                    status: false,
                    location: ["f8", "g8"]
                }
            },
            queen_side : {
                king_move: "c8",
                rook_move: "d8",
                rook: {
                    status: false,
                    location: "a8"
                },
                space_empty: {
                    status: false,
                    location: ["c8", "d8"]
                },
                space_attacked: {
                    status: false,
                    location: ["c8", "d8"]
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
