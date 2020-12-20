// alert("draw-tiles.js connected")
let rowNumbers = 8;
let letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
        
const app = document.getElementById("app");
let chessObj = {}

for (let i=rowNumbers; i > 0 ; i--){
    
    if (i%2 == 0){
        var colorInd = true;
    } else {
        var colorInd = false;
    };
    
    // Create box
    for (let j=0; j < rowNumbers; j++){
        // console.log("column "+j)
        if (colorInd == true){
            var colorBox = "white";
            colorInd = false;
        } else {
            var colorBox = "black";
            colorInd = true;
        };

        let chessBox =letters[j]+i;
        const box = document.createElement("div");
        box.setAttribute("class", "chess-box "+colorBox +" " + chessBox);
        box.setAttribute("id", chessBox);
        app.appendChild(box);
        
        chessObj[chessBox] = {
            color: colorBox,
            rowNumber : i,
            colLetter : letters[j],
            colNumber : j,
            piece: null,
        };
    };

    
};