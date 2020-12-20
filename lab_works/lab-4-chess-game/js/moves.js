

const DetermineChessPiece = function(){

}


const ToggleActivePiece = function() {
    let classes =this.classList
    
    // Toggle selected chess piece
    if( classes.value.includes("selected")) {
        this.classList.remove("selected");
    } else {
        console.l
        // remove other chess piece with class 'selected'
        if (document.getElementsByClassName("selected").length > 0) {
            document.getElementsByClassName("selected")[0].classList.remove("selected");
        }
        // add 'selected' in class
        this.classList.add("selected");

        // Determine what piece
        console.log(this.innerText)
        // Determine possible moves
    };
};

// add event listener to each chess box
let keys = Object.keys(chessObj);
for (key in keys){
    // if chessbox  piece is missing in the chessObj... skip
    if (chessObj[keys[key]]["piece"] != null) {
        const chessBoxSelected = document.getElementById(keys[key]);
        chessBoxSelected.addEventListener("click", ToggleActivePiece);
        console.log(keys[key])
    }
};


