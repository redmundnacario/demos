import { createDeckOfCards } from './functions.js';
import { shuffleDeckOfCards } from './functions.js';
import { dealRandomCard } from './functions.js';
import { dealGivenCard } from './functions.js';



// GLOBAL variables
let deck = shuffleDeckOfCards(createDeckOfCards());
// deck = deck.slice(0,4) // for testing
let history = []; // recently dealt cards for display purposes
let currentIndex; // int index of history array for prev and next button
let hand = []; // For Poker
// end of GLOBAL variables


// ELEMENTS in DOM

// containers
let deal_button_container = document.getElementById("deal_button");
let action_buttons_container = document.getElementById("action_buttons");
let reshuflle_button_container = document.getElementById("reshuflle_button");
let deal_poker_card_button = document.getElementById("deal_poker_card_button");

// CREATE BUTTONS

function createElementGivenType(parentElement, stringInput, stringId,
                      element_type = "button"){
    let childElement = document.createElement(element_type);
    childElement.innerHTML = stringInput;
    childElement.id = stringId;
    parentElement.appendChild(childElement); 
};

createElementGivenType(deal_button_container, "Deal Card", "deal");
createElementGivenType(action_buttons_container, "Previous", "prev");
createElementGivenType(action_buttons_container, "Next", "next");
createElementGivenType(reshuflle_button_container, 
                       "Reshuffle Deck", "reshuffle");
createElementGivenType(deal_poker_card_button, 
                       "Deal 5 Cards for Poker", "poker");//For Poker

// button elements
let deal = document.getElementById("deal");
let prev = document.getElementById("prev");
let next = document.getElementById("next");
let reshuffle = document.getElementById("reshuffle");
let poker = document.getElementById("poker");// For Poker


/* INITIALIZE display functions */

// Disable or enable prev and next button
function disablePrevAndNextButton(value = true){
    document.getElementById("prev").disabled = value;
    document.getElementById("next").disabled = value;
    // document.getElementById("deal").disabled = false;
};

// Update the contents
function updateContents(givenCardString){
    document.getElementById("deal_card").innerText = 
        givenCardString == undefined ? 
            "Card Dealt:  Press the 'Deal card' button" : 
            "Card Dealt: " + givenCardString;

    document.getElementById("deck").innerText = 
        deck.length == 0 ? "Remaining Cards: Empty" : 
        "Remaining Cards: " +deck;

    document.getElementById("history").innerText = 
        history.length == 0 ? "Draw History: Empty" : 
        "Draw History: " + history;
};

/* INITIALIZE displays */

updateContents();
disablePrevAndNextButton();



/* ATTACH event listners in the buttons */

//Deal Button
deal.addEventListener("click", () => {
    console.log(deck.length);

    const { givenCardString, givenCard  } = dealRandomCard(deck);
    history.push(givenCard);

    // Update contents 
    updateContents(givenCardString);
    // update currrent index in history
    currentIndex = history.length - 1;

    if (history.length > 1){
        prev.disabled = false;
    }
    // next button is always disabled when new card is dealt
    next.disabled = true;
  
    if (deck.length == 0){ 
        document.getElementById("deal").disabled = true;
        setTimeout(() =>{
            alert("Card will reshuffle.")
            deck = shuffleDeckOfCards(history.flat());
            history = [];
            currentIndex = null;
            // re-initialize 
            updateContents();

            //Disable prev and next button
            disablePrevAndNextButton();
            deal.disabled = false;
            poker.disabled = false;

        },500);
    };
});


// Previous button
prev.addEventListener("click", () => {
    currentIndex--
    let givenCard = history[currentIndex];

    // if it is objectm, then it is an array
    let result = typeof givenCard == "object" ? 
        convertHandToString(givenCard) : 
        dealGivenCard(givenCard).givenCardString;

    console.log(result);
    // re-initialize 
    updateContents(result);

    //Disable prev 
    if (currentIndex <= 0){
        prev.disabled = true;
    };

    // enable next
    next.disabled = false;
});


// Next button
next.addEventListener("click", () => {
    currentIndex++;
    let givenCard = history[currentIndex];

    let result = typeof givenCard == "object" ? 
        convertHandToString(givenCard) : 
        dealGivenCard(givenCard).givenCardString;

    console.log(result);
    // re-initialize 
    updateContents(result);

    //Disable next 
    if (currentIndex >= history.length - 1){
        next.disabled = true;
    };

    // enable prev
    prev.disabled = false;
});


// Reshuffle button
reshuffle.addEventListener("click", () => {
    deck = shuffleDeckOfCards(deck.concat(history.flat()));
    history = [];
    console.log(deck.length);

    // re-initialize 
    updateContents();

    //Disable prev and next button
    disablePrevAndNextButton();

    //Enabe deal poker button
    poker.disabled = false;
});


/* Poker Functions */

// convert hand array to string output
function convertHandToString(arrayInput) {
    let result = '';
    for (const card of arrayInput){
        result = result + " " +dealGivenCard(card).givenCard;
    }
    return result;
};

// Deal 5 cards for Poker
poker.addEventListener("click", () => {

    //deal 5 cards
    hand = deck.splice(0,5);
    history.push(hand);
    
    let result = convertHandToString(hand);
    // Determine the hand combination

    // console.log(result)
    updateContents(result);
    // console.log(history)

    currentIndex = history.length - 1;

    if (history.length > 1){
        prev.disabled = false;
    };
    // next button is always disabled when new card is dealt
    next.disabled = true;
  
    // filters
    if (deck.length < 5){ 
        poker.disabled = true;
        setTimeout(() =>{
            alert("Cannot proceed. Remaing cards are less than 5");
            // poker.disabled = false;
        }, 500);
        return;
    };
});

// DETERMINE hand
