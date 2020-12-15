// initial value of screen

const initialValue = 0;

var screenValue = document.querySelector(".screen-value");
screenValue.innerText = initialValue;

// if number  and operations was pressed

function numKeyPressed() {
    if (screenValue.innerText  == initialValue){
        screenValue.innerText  = this.innerText;
    } else {
        screenValue.innerText = screenValue.innerText  + this.innerText;
    }
}

// delete previous

function deletePrevious() {
    if(screenValue.innerText.length == 1 ){
        screenValue.innerText = initialValue;
    } else {
        screenValue.innerText = screenValue.innerText.slice(0, -1);
    }
}
// run equal sign or perform the operation

function equalSignPressed() {
    
    var sVBucket = screenValue.innerText;

    if (sVBucket.includes("×")){
        sVBucket = sVBucket.replace("×", "*")
    };
    if (sVBucket.includes("÷")){
        sVBucket = sVBucket.replace("÷", "/")
    };

    console.log(sVBucket);
    try {
        var result =  eval(sVBucket);
        
        screenValue.innerText = result;
    }
    catch(err) {
        alert("Kindly check your input. \nError: " + err.message);
    }
}


// Assign the functions into event listeners in selected elements

var items = document.querySelectorAll(".numKey");
// console.log(items)
for (let item of items) {
    // console.log(item.querySelector(".button-text").innerText)
    item.addEventListener("click", numKeyPressed);
}

const deleteButton = document.querySelector(".del");
deleteButton.addEventListener("click", deletePrevious);

const equalButton = document.querySelector(".equal");
equalButton.addEventListener("click", equalSignPressed);
