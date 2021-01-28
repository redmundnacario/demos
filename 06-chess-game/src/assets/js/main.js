// Constructor Functions
import { ChessGamePlayState } from './data/state.js';
import { InitialChessPieceData } from "./data/chess-pieces.js";
import { ChessGame }  from './draw.js';

// Functions
import { GetPossibleMoves } from "./chess-pieces/moves.js";
import { SetActivePlayer, ToggleActivePlayer } from './active-player.js';//
import { EnPassant, UpdateEnPassantState } from './special-rules/en-passant.js';
import { CheckIfChecked, CheckAreaIfChecked } from './special-rules/check.js';//checkmate
import { CheckCastling, Castling } from './special-rules/castling.js';
import { PawnPromotion } from './special-rules/promotion.js';
import { getClassListIncludes, setInnerImg} from './utils.js';

//components
import { toggleAlert } from './components/alert.js';


// Main Constructor function
export const Application = function() {
    
    this.chessGame = new ChessGame();
    this.chessData = new InitialChessPieceData();

    /* HTML elements */
    // undo button
    this.btnUndo = document.getElementById("undo");
    // chess boxes
    this.chessBoxIds;
    // dots in slideshow
    this.dotSlide = Array.from(document.querySelectorAll(".dot"))


    // Initialize States 
    this.initializeState = function() {
        let cGame = new ChessGamePlayState(); 
        this.state = cGame.data;
    }


    /*
    Initialize the chess boxes, the chess piece in the dom and chess object
    Also adds eventlisteners to chess tiles.
    */

    this.InitializeChessMap = function () {
        this.initializeState()

        // console.log(state)
        let {
            active_chess_player,
            active_chess_obj
            } = this.state;
    
        // set active player in the DOM
        SetActivePlayer(active_chess_player);
        // Draw chess boxes in the DOM
        this.chessGame.DrawChessTiles();
        // Set the chess pieces in the state object, and set initial kings' location
        this.chessGame.SetChessPieces(this.chessData.data, this.state);

        this.chessGame.DrawChessPieces(this.chessGame.chessObj);
        
        this.state.chess_obj = [JSON.parse(JSON.stringify(this.chessGame.chessObj))];
        this.state.active_chess_obj = this.chessGame.chessObj;
        // console.log(this.state)

        let tiles = Object.keys(this.state.chess_obj[0]);
        this.chessBoxIds = tiles.map((value , index) => {
            return document.getElementById(value);
        })
    };


    /*
    RE-initialize the chess game, refreshes the states from the start.
    Can be used with restart button or new game.
    */

    this.ReInitializeChessMap = function() {
        // this.initializeState()
        this.chessGame.UndrawChessPieces()
        this.InitializeChessMap()
    }


    /*
    Bascically generates moves and put styles to selected chess piece,
    and its possible moves and targets
    */

    this.ToggleActivePiece = function(thisId) {

        let { 
            active_chess_obj, 
            active_chess_player, 
            pawn_double_step_status,
            letters 
            } = this.state;

        
        // this function is only applicable to chess box with chess piece
        if (active_chess_obj[thisId]["piece"] == null) { 
            return };

        // this function is only applicable to current active_chess_player
        if (active_chess_obj[thisId].piece.kingdom != active_chess_player) {
            return };

        // console.log("Active box/piece: " , active_chess_box_id );

        // list all classes to target element
        let classes = document.getElementById(thisId).classList;

        // Toggle On/off current selected chess piece
        if(classes.value.includes("selected")) {
            // remove previous styles with class selected, possible moves/targets
            this.chessGame.RemoveClassesOfMovesOrTargetsSquares();
            // update states
            this.state.active_chess_box_id = thisId;
        } else {
            // removeprevious styles with class selected, possible moves/targets
            this.chessGame.RemoveClassesOfMovesOrTargetsSquares();
            // add 'selected' in class
            classes.add("selected");

            // Determine chess piece and possible moves
            let { 
                possibleMoves,
                possibleTargets 
                } = GetPossibleMoves(active_chess_obj[thisId], 
                                      active_chess_obj,
                                      pawn_double_step_status,
                                      letters);
            
            // Attach some class in the possible moves squares
            this.chessGame.AddClassesOfMovesOrTargetsSquares(possibleMoves,
                possibleTargets)
            
            // update states
            this.state.active_chess_box_id = thisId;
            // Checks if possible to Castling for a King selected
            CheckCastling(this.state)
        };
        
    };

    
    /*
    Triggers when a move was done and updates all dynamic state values
    */

    this.PossibleMoveSelected = function(thisId) {
        let {
            active_chess_box_id,
            active_chess_player,
            active_chess_obj,
            chess_obj,
            castling,
            king_location,
            } = this.state;

        let previousBox = active_chess_box_id;
        let nextBox = thisId;

        let chessPieceMoved = active_chess_obj[nextBox];
        let chessPieceOriginalBox = active_chess_obj[previousBox];

        let hasPossibleMove = getClassListIncludes(nextBox, "possible-move");
        let hasPossibleTarget = getClassListIncludes(nextBox, "possible-target");
        let hasCastling = getClassListIncludes(nextBox, "castling");
        
        // Check selected box id if it contains possible-move class;
        if (!(hasPossibleMove | hasPossibleTarget | hasCastling )){ return };

        // console.log(chessPieceOriginalBox.piece.kingdom 
        //             + " " + chessPieceOriginalBox.piece.position
        //             + " " + previousBox + " to "+ nextBox);

        // Pre-checking if kings move is illegal, or checkmate
        CheckAreaIfChecked(previousBox, nextBox, this.state)

        // update this.state.chess_obj and HTML DOM
        chessPieceMoved.piece = chessPieceOriginalBox.piece;
        chessPieceOriginalBox.piece = null;
        setInnerImg(previousBox, "")
        setInnerImg(nextBox, chessPieceMoved.piece.img)

        // if king was moved, and castled, move rook also
        Castling(chessPieceMoved, hasCastling, this.state)

        // for En Passant : Check all rules, and update status
        EnPassant(this.state, chessPieceMoved, chessPieceOriginalBox);
        UpdateEnPassantState(this.state, chessPieceMoved, chessPieceOriginalBox);

        // pawn promotion
        PawnPromotion(nextBox, chessPieceMoved, active_chess_player)
        
        // Update History, Player, remove styles in chess boxes
        chess_obj.push(JSON.parse(JSON.stringify(active_chess_obj)));
        ToggleActivePlayer(this.state);
        this.chessGame.RemoveClassesOfMovesOrTargetsSquares() ;   
            
        // update states
        this.state.chess_obj = chess_obj;

        // For Castling, if king was moved. Set this.state of castling of kingdom to null
        if (chessPieceMoved.piece.position == "king" ){
            castling[chessPieceMoved.piece.kingdom] = null;
            // update king's location
            king_location[chessPieceMoved.piece.kingdom] = nextBox;
        }

        // For Castling, if rook was moved. Set this.state what side to nullify
        if (chessPieceMoved.piece.position == "rook" ){
            if (castling[chessPieceMoved.piece.kingdom] != null) {
                let side = chessPieceOriginalBox.colLetter == "h" ? "king_side" : "queen_side";
                // console.log(chessPieceOriginalBox.colLetter)
                castling[chessPieceMoved.piece.kingdom][side].rook.status = true;
            // console.log(castling);
            }
        }

        this.state.castling = castling;
        this.state.king_location = king_location;

        // console.log(this.state.chess_obj.length)
        // Post-Check if enemy kingdom's king was checked 
        CheckIfChecked(this.state,  () => {this.UndoMove(this.state)})  
    };


    /*
    Undo the moves in chess
    Note: UndoMove has an state argument because when used in PossibleMoveSelected,
          it breaks.
    */

    this.UndoMove = function(state){
        let {
            active_chess_obj,
            chess_obj
            } = state;
        
        // Disables undo button if game history length is 1 or less
        if (chess_obj.length <=1) {return}
        // Deep copy
        active_chess_obj = JSON.parse(JSON.stringify(
                                chess_obj[chess_obj.length - 2]));

        // remove last element of chess_obj array
        chess_obj.pop();

        // remove classes of boxes, Redraw HTML, change player
        this.chessGame.RemoveClassesOfMovesOrTargetsSquares()
        this.chessGame.DrawChessPieces(active_chess_obj, false);
        ToggleActivePlayer(state);

        // update states
        state.active_chess_obj = active_chess_obj;
        state.chess_obj = chess_obj;

        // Locate king's location and check if checked
        this.findKing();
        CheckIfChecked(state, null);
    };


    /*
    Finds the king location in chess map
    */

    this.findKing = function () {
        let {
            active_chess_obj,
            } = this.state;
        
        Object.keys(active_chess_obj).forEach(value => {
            let result = active_chess_obj[value];
            if (result.piece){
                if (result.piece.position == "king"){
                    this.state.king_location[result.piece.kingdom] = result.colLetter +
                                                                result.rowNumber;
                };
            };
        });
    };
}

