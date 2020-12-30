// creates array of range values
export const range = function (start, stop, step) {
    if (typeof stop == 'undefined') {
        // one param defined
        stop = start;
        start = 0;
    }

    if (typeof step == 'undefined') {
        step = 1;
    }

    if ((step > 0 && start >= stop) || (step < 0 && start <= stop)) {
        return [];
    }

    var result = [];
    for (var i = start; step > 0 ? i < stop : i > stop; i += step) {
        result.push(i);
    }

    return result;
};

// Remove possible moves outside of chess map coordinates
export const removeOutOfBoundsPossibleMoves = function( scanPoints,
                                                        rowNumber,
                                                        colNumber,
                                                        letters) {
    let scanPointsAlphaNum = scanPoints.map(value => {
        
        // Y to abc, X to 123
        let finalRowNo = value[1] + rowNumber;
        
        // console.log(letters[(value[1]  + colNumber) - 1] + finalRowNo)

        // filter out of bounds
        if (finalRowNo <= 8 & finalRowNo > 0){
            return letters[(value[0]  + colNumber) - 1] + finalRowNo;
        }
        return null;
    }).filter(Boolean);

    return scanPointsAlphaNum;
};

// Split possible moves by current selecte piece (left or right direction)
// or (up and down direction)
export const splitPossibleMoves = function(scanPointsAlphaNum, chessObjBox) {
    // split and rearrange array  starting from the piece                                                       
    let indexX = scanPointsAlphaNum.indexOf(
                    chessObjBox.colLetter + chessObjBox.rowNumber);                                          
    let firstArray = scanPointsAlphaNum.slice(0,
                        indexX) ;//s sort reversely
    firstArray = firstArray.reverse();
    let secondArray = scanPointsAlphaNum.slice(
                        indexX + 1); // dont sort  
    return  [firstArray, secondArray];
};

// filter chess targets which are allies, passable and targets
export const filterPossibleMoves = function(dataArray ,chessObj, chessObjBox){
    let possibleMoves = []; 
    let possibleTargets = [];
    let passable = true ;
    dataArray.forEach(value => {
        if (passable == true){
            if (chessObj[value].piece == null){
                possibleMoves.push(value);
            } else {
                if (chessObj[value].piece.kingdom != 
                        chessObjBox.piece.kingdom ){

                    possibleTargets.push(value);
                    passable = false;

                } else {
                    passable = false;
                };
            };
        };
    });
    return { possibleMoves, possibleTargets  };
};