
import { PawnMoves } from '../chess-pieces/pawn.js';
import { KnightMoves } from '../chess-pieces/knight.js';
import { RookMoves } from '../chess-pieces/rook.js';
import { BishopMoves } from '../chess-pieces/bishop.js';
import { QueenMoves } from '../chess-pieces/queen.js';
import { KingMoves } from '../chess-pieces/king.js';

//components
import { toggleAlert } from '../components/alert.js';

const scanCheckers = function(moves, active_chess_obj,
                              positionString ) {

    if (moves.possibleTargets.length > 0){
        let result = [];
        moves.possibleTargets.forEach( value => {
            if (active_chess_obj[value].piece.position == positionString){
                let inputObj = {
                    value : active_chess_obj[value],
                    checkerRange : [moves.possibleMoves,moves.possibleTargets].flat()
                }
                result.push(inputObj);
            } 
        });
        return result.length > 0 ? result : null ;
    } else {
        return null;
    };
};

export const getCheckers = function(locationId, active_chess_obj, state, mode = "contestChecker") {
    let {
        pawn_double_step_status,
        letters,
        } = state;

    let chessObjBox = active_chess_obj[locationId];
    // console.log("King Location Details: ", chessObjBox);

    let queenMoves = QueenMoves(chessObjBox, active_chess_obj, letters);
    let rookMoves = RookMoves(chessObjBox, active_chess_obj, letters);
    let bishopMoves = BishopMoves(chessObjBox, active_chess_obj, letters);
    let knightMoves = KnightMoves(chessObjBox, active_chess_obj, letters);
    let pawnMoves = PawnMoves(chessObjBox, active_chess_obj,
                                pawn_double_step_status, letters)

    //Search the pressence of enemy piece with its move, if true, check is true,
    // find multiple check also,
    // get the possibe checkers
    let queenCheck = scanCheckers(queenMoves,
                                active_chess_obj,'queen')
    let rookCheck = scanCheckers(rookMoves,
                                active_chess_obj,'rook')
    let bishopCheck = scanCheckers(bishopMoves,
                                active_chess_obj,'bishop')
    let knightCheck = scanCheckers(knightMoves,
                                active_chess_obj,'knight')
    let pawnCheck = scanCheckers(pawnMoves,
                                active_chess_obj,'pawn')
    let checkers;
    if (mode != "contestChecker"){

        let kingMoves = KingMoves(chessObjBox, active_chess_obj, letters);
        let kingCheck = scanCheckers(kingMoves,
                            active_chess_obj,'king')
        checkers = [
            queenCheck,
            rookCheck,
            bishopCheck,
            knightCheck,
            kingCheck,
            pawnCheck,
        ].filter(Boolean);

    } else{
        checkers = [
                    queenCheck,
                    rookCheck,
                    bishopCheck,
                    knightCheck,
                    pawnCheck,
                ].filter(Boolean);

    }
    checkers = [].concat.apply([], checkers);
    return checkers
};

export const CheckIfChecked = function (state , UndoMove, mode = "normal") {
    let kingdoms = ["white", "black"];

    let {
        active_chess_player,
        active_chess_obj, 
        active_chess_box_id,
        king_location
        } = state;
    let checkers;
    kingdoms.forEach( kingdom => {

        let kingChecked = document.getElementsByClassName("checked-"+kingdom)

        Object.keys(kingChecked).forEach(value => {
            kingChecked[0].classList.remove("checked-"+kingdom); 
        });

        // console.log(kingdom)
        checkers = getCheckers(king_location[kingdom],
                                   active_chess_obj, state);
        
        if (checkers.length > 0) { 
            state.checked[kingdom] = checkers;
            
            document.getElementById(king_location[kingdom]).
                classList.add("checked-"+kingdom)
        } else {
            state.checked[kingdom] = null;
            let kingChecked = document.getElementsByClassName("checked-"+kingdom)

            Object.keys(kingChecked).forEach(value => {
                kingChecked[0].classList.remove("checked-"+kingdom); 
            });
        } 

    });

    let currentCheckedKingdom = Boolean(state.checked.white) ? "white" : 
                                Boolean(state.checked.black) ? "black" : null;


    if (currentCheckedKingdom != null & UndoMove != null) {
        if (currentCheckedKingdom != active_chess_player) {
            console.log("Last move was illegal! King is being checked.")
            toggleAlert("Move is Illegal!")
            UndoMove();
        } else{
            if(mode === "normal"){
                // console.log(previous_move,king_location[currentCheckedKingdom])

                let kingChecksafePMoves = checkKingAreaifChecked(state, currentCheckedKingdom)
                let checkers = getCheckers(king_location[currentCheckedKingdom],
                                            active_chess_obj, state, "contestChecker");
                console.log(checkers)

                let contestTheChecker =[]
                checkers[0].checkerRange.forEach(value => {
                    console.log(value)
                    let chessObjSimulation = JSON.parse(JSON.stringify(active_chess_obj));
                    chessObjSimulation[value].piece = checkers[0].value.piece;
                    let result = getCheckers(value, chessObjSimulation, state , "contestChecker")
                    

                    if(result.length > 0){
                        console.log(result[0].checkerRange)
                        if (result[0].checkerRange.includes(value)){
                            contestTheChecker.push(result)
                        }
                    }
                })
                contestTheChecker = contestTheChecker.map(value =>{
                    if (value.length > 0){
                        return value;
                    } else {
                        return null
                    }
                }).filter(Boolean)

                console.log(contestTheChecker)
                console.log(kingChecksafePMoves)

                if (kingChecksafePMoves.length === 0 && contestTheChecker.length === 0){
                    let winner = active_chess_player == "white"? "black": "white";
                    // #CHECKMATE
                    toggleAlert(`Checkmate! ${winner} wins!`)
                    setTimeout(()=>{
                        location.reload()
                    },2500)
                } else {
                    // console.log(active_chess_obj[active_chess_box_id])
                    toggleAlert("Checked!")
                }

            }
        }
    }
    // console.log("Checkers!",state.checked);
};


export const checkKingAreaifChecked = function(state, currentCheckedKingdom ) {
    let {
        king_location,
        active_chess_obj, 
        letters,
    } = state

    
    let kingMoves = KingMoves(active_chess_obj[king_location[currentCheckedKingdom]],
                              active_chess_obj, letters);
    let possibleMoves = kingMoves.possibleMoves.concat(kingMoves.possibleTargets);
    
    // Deep copy
    let chessObjSimulation = JSON.parse(JSON.stringify(active_chess_obj));
    // console.log(kingMoves);

    let result = {};
    possibleMoves.forEach(value => {
        chessObjSimulation[value].piece = 
            active_chess_obj[king_location[currentCheckedKingdom]].piece;
        result[value] = getCheckers(value, chessObjSimulation, state);
    });

    // Sort save from dangerous
    let safe = [];
    let dangerous = [];
    Object.keys(result).forEach(key => {
        result[key].length > 0 ? dangerous.push(key) : safe.push(key);
    });
    // console.log(possibleMoves)
    return safe
}

export const CheckAreaIfChecked = function(previousBoxId,
                                           nextBoxId,
                                           state,
                                           UndoMove){
    let {
        active_chess_player,
        active_chess_obj, 
        letters,
        } = state;

           
    
    if (active_chess_obj[previousBoxId].piece.position == "king" ){
        let kingMoves = KingMoves(active_chess_obj[previousBoxId],
                                active_chess_obj, letters);
        let possibleMoves = kingMoves.possibleMoves.
                                concat(kingMoves.possibleTargets);
        // Deep copy
        let chessObjSimulation = JSON.parse(JSON.stringify(active_chess_obj));
        // console.log(kingMoves);

        let result = {};
        possibleMoves.forEach(value => {
            chessObjSimulation[value].piece = 
                active_chess_obj[previousBoxId].piece;
            result[value] = getCheckers(value, chessObjSimulation, state);
        });

        // Sort save from dangerous
        let safe = [];
        let dangerous = [];
        Object.keys(result).forEach(key => {
            result[key].length > 0 ? dangerous.push(key) : safe.push(key);
        });

        

        if (dangerous.includes(nextBoxId)) {
            //undo an return
            // console.log("King move was illegal! King is still checked.");
            toggleAlert("King move is illegal!")
            UndoMove();
            
        };
    };
};
