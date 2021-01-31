/*
    Alert for the following:
    1. En Passant
    2. Check
    3. Catling
    4. Pawn Promotion
    5. Illegal moves
*/ 

export const toggleAlert = function(message, mode=true) {
    // selector
    let alertModal = document.getElementById("alertModal")
    let alertContent = document.getElementById("alertModalContent")

    // Set inner html
    alertContent.innerHTML =  `<h1>${message}</h1>`

    // set display flex within 1 sec then go back to displa none
    alertModal.style.display = "flex";
    if (mode===true){
        setTimeout(function() {
            alertModal.style.display = "none";
        }, 2000)
    }
}

export const toggleAlertOff = function() {
    let alertModal = document.getElementById("alertModal")
    let alertContent = document.getElementById("alertModalContent")

    // Set inner html
    alertContent.innerHTML =  ""
    alertModal.style.display = "none";
}