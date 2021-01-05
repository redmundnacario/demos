import { createDeckOfCards } from './functions.js';
import { shuffleDeckOfCards } from './functions.js';
import { dealCard } from './functions.js';
import { dealGivenCard } from './functions.js';



// GLOBAL variables
let deck = shuffleDeckOfCards(createDeckOfCards());
// deck = deck.slice(0,4) // for testing

let history = []; // recently dealt cards for display purposes
let currentIndex; // int index of history array for prev and next button



// CREATE BUTTONS

// create deal button
let btn = document.createElement("button");   // Create a <button> element
btn.innerHTML = "Deal Card";                   // Insert text
btn.id = "deal"
document.getElementById("deal_button").appendChild(btn);  

// Create button for previous and next
let btn1 = document.createElement("button");
btn1.innerHTML = "Previous";
btn1.id = "prev";             
document.getElementById("action_buttons").appendChild(btn1);  

let btn2 = document.createElement("button");
btn2.innerHTML = "Next";  
btn2.id = "next";                 
document.getElementById("action_buttons").appendChild(btn2);  

// Create button for reshuffle
let btn3 = document.createElement("button");
btn3.innerHTML = "Reshuffle Deck";
btn3.id = "reshuffle";                   
document.getElementById("reshuflle_button").appendChild(btn3); 



// INITIALIZE displays

function disablePrevAndNextButton(value = true){
    document.getElementById("prev").disabled = value;
    document.getElementById("next").disabled = value;
    // document.getElementById("deal").disabled = false;
}

function updateContents(givenCardString){
    document.getElementById("deal_card").innerText = 
        givenCardString == undefined ? 
            "Card Dealt:  Press the 'Deal card' button" : 
            "Card Dealt: " + givenCardString;

    document.getElementById("deck").innerText = 
        deck.length == 0 ? "Remaining Cards: Empty" : "Remaining Cards: " +deck;

    document.getElementById("history").innerText = 
        history.length == 0 ? "Draw History: Empty" : "Draw History: " + history;
}

updateContents()
disablePrevAndNextButton()



// ATTACH events in buttons

//Deal Button
document.getElementById("deal").addEventListener("click", () => {
    console.log(deck.length)

    const { randomCardString, randomCard } = dealCard(deck)
    history.push(randomCard)

    // Update contents 
    updateContents(randomCardString);
    // update currrent index in history
    currentIndex = history.length - 1;

    if (history.length > 1){
        document.getElementById("prev").disabled = false;
    }
    // next button is always disabled when new card is dealt
    document.getElementById("next").disabled = true;
  
    if (deck.length == 0){ 
        document.getElementById("deal").disabled = true;
        setTimeout(() =>{
            alert("Card will reshuffle.")
            deck = shuffleDeckOfCards(history);
            history = [];
            currentIndex = null;
            // re-initialize 
            updateContents()

            //Disable prev and next button
            disablePrevAndNextButton()
            document.getElementById("deal").disabled = false;

        },500)
    }
    

});


// Previous button
document.getElementById("prev").addEventListener("click", () => {
    currentIndex--
    let givenCard = history[currentIndex];

    const { givenCardString } = dealGivenCard(givenCard)

    // re-initialize 
    updateContents(givenCardString);

    //Disable prev 
    if (currentIndex <= 0){
        document.getElementById("prev").disabled = true;
    }

    // enable next
    document.getElementById("next").disabled = false;

});


// Next button
document.getElementById("next").addEventListener("click", () => {
    currentIndex++
    let givenCard = history[currentIndex];

    const { givenCardString } = dealGivenCard(givenCard)

    // re-initialize 
    updateContents(givenCardString);

    //Disable next 
    if (currentIndex >= history.length - 1){
        document.getElementById("next").disabled = true;
    }

    // enable prev
    document.getElementById("prev").disabled = false;

});


// Reshuffle button
document.getElementById("reshuflle_button").addEventListener("click", () => {
    deck = shuffleDeckOfCards(deck.concat(history));
    history = [];

    // re-initialize 
    updateContents();

    //Disable prev and next button
    disablePrevAndNextButton();
});