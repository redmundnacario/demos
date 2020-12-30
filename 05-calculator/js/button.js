// initial value of screen

const initialValue = "0";

let screenValue = document.querySelector(".screen-value");
screenValue.innerText = initialValue;

// if number  and operations was pressed

const numKeyPressed = function () {
    // check if new value input is equal to zero
    // let lastChar = screenValue.innerText.substr(screenValue.innerText.length - 1);
    var screenValueTxt = screenValue.innerText 
    if (screenValue.innerText == initialValue ){
        screenValue.innerText  = this.innerText;
    } else {
        if (screenValueTxt[screenValueTxt.length - 1] === "+" && this.innerText === "÷" ){
            return
        }
        if (screenValueTxt[screenValueTxt.length - 1] === "-" && this.innerText === "÷" ){
            return
        }
        if (screenValueTxt[screenValueTxt.length - 1] === "+" && this.innerText === "×" ){
            return
        }
        if (screenValueTxt[screenValueTxt.length - 1] === "-" && this.innerText === "×" ){
            return
        }
        if (screenValueTxt[screenValueTxt.length - 1] === "÷" && this.innerText === "×" ){
            return
        }
        if (screenValueTxt[screenValueTxt.length - 1] === "×" && this.innerText === "÷" ){
            return
        }
        if (screenValueTxt[screenValueTxt.length - 1] === "÷" && this.innerText === "÷" ){
            return
        }
        if (screenValueTxt[screenValueTxt.length - 1] === "×" && this.innerText === "×" ){
            return
        }

        screenValue.innerText = screenValue.innerText  + this.innerText;
        // console.log("here 2");
    }
}

//  if dot was pressed 

const dotPressed = function () {
    // if last item in screen is dot also
    let lastChar = screenValue.innerText.substr(screenValue.innerText.length - 1);

    if (lastChar  == this.innerText){ 
        // default
        alert("A period '.' cannot be followed by another period.")
        return
    };

    //if last number has dot already
    // Uses Regex
    let wholeExp = screenValue.innerText.split(/[+/÷/×/-]/)
    let lastExpValue = wholeExp[wholeExp.length - 1]
    
    if (lastExpValue.includes(".")){ 
        alert("Cannot add period '.' again for the current value.")
        return 
    } 
        
    screenValue.innerText = screenValue.innerText  + this.innerText;
    
};

// Clear Screen

const clearPressed = function () {
    screenValue.innerText = initialValue;
};

// delete previous

const deletePrevious = function () {
    if(screenValue.innerText.length == 1 ){
        screenValue.innerText = initialValue;
    } else {
        screenValue.innerText = screenValue.innerText.slice(0, -1);
    };
};

// run equal sign or perform the operation

const equalSignPressed = function () {
    
    var sVBucket = screenValue.innerText;

    if (sVBucket.includes("×")){
        sVBucket = sVBucket.replaceAll("×", "*")
    };
    if (sVBucket.includes("÷")){
        sVBucket = sVBucket.replaceAll("÷", "/")
    };

    // console.log(sVBucket);
    try {
        var result =  eval(sVBucket);
        
        if (Number.isInteger(result)){
            //integer
            screenValue.innerText = result;
        } else {
            // float
            if (String(result).length >= 8){
                // Round off
                result = result.toPrecision(7);
            } 

            screenValue.innerText = result;
        }
        
        screenValue.innerText = result;
    }
    catch(err) {
        alert("Kindly check your input. \nError: " + err.message);
    };
};


// Assign the functions into event listeners in selected elements

let items = document.querySelectorAll(".numKey");
// console.log(items)
for (let item of items) {
    // console.log(item.querySelector(".button-text").innerText)
    item.addEventListener("click", numKeyPressed);
}

const deleteButton = document.querySelector(".del");
deleteButton.addEventListener("click", deletePrevious);

const equalButton = document.querySelector(".equal");
equalButton.addEventListener("click", equalSignPressed);

const dotButton = document.querySelector(".dot");
dotButton.addEventListener("click", dotPressed);

const clearButton = document.querySelector(".clear");
clearButton.addEventListener("click", clearPressed);
