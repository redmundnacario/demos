
// Initial variables 
let suits = ['♣','♠','♡', '♢',];//Global variable in this script

// Basic Function 1 :  Convert special card numbers to A, J, Q, K
export function specialCard(num) {
	switch(num){
        case (1):
            return "A";
        case (11):
            return "J";
        case (12):
            return "Q";
        case (13):
            return "K";
        default:
            return num;
    }
}

// Basic Function 2 : Convert A, J, Q, K to card nnumbers
export function reverseSpecialCard(letter, game = "normal") {
	switch(letter){
        case ("A"):
            return game === "normal"? "1" : game === "poker" ? "14" : "1" ;
        case ("J"):
            return "11";
        case ("Q"):
            return "12";
        case ("K"):
            return "13";
        default:
            return letter;
    }
}

// Basic Function 3 : Convert suit symbol to words
export function cardSymbolToWords(symb) {
    switch(symb){
        case ('♠'):
            return "Spades";
        case ('♡'):
            return "Hearts";
        case ('♢'):
            return "Diamonds";
        case ('♣'):
            return "Clubs";
        default:
            return symb;
    }
}

// Basic Function 4: Convert card value to words
export function cardNumberOrLetterToWords(num) {
	switch(num){
        case ('A'):
            return "Ace";
        case ('2'):
            return "Two";
        case ('3'):
            return "Three";
        case ('4'):
            return "Four";
        case ('5'):
            return "Five";
        case ('6'):
            return "Six";
        case ('7'):
            return "Seven";
        case ('8'):
            return "Eight";
        case ('9'):
            return "Nine";
        case ('10'):
            return "Ten";
        case ('J'):
            return "Jack";
        case ('Q'):
            return "Queen";
        case ('K'):
            return "King";
        default:
            return num;
    }
}

// console.log(suits)

// Create deck of cards
export function createDeckOfCards(){
    let deck = []
    for(const suit of suits){
        /* console.log(suit) */
        for(let start = 1; start <= 13; start++){
            deck.push(suit + specialCard(start))
        }
    }
    return deck;
}  
  
  
// #1: Shuffle deck of cards

// Get random value within range
export function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}


// 1st main function
export function shuffleDeckOfCards(arrayInput) {
    // Deep copy
    let deck = arrayInput.slice()
    
    var currentIndex = deck.length - 1;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        let randomIndex = getRandomInt(currentIndex);

        // And swap it with the current element.
        let temporaryValue = deck[currentIndex];
        deck[currentIndex] = deck[randomIndex];
        deck[randomIndex] = temporaryValue;
        
        currentIndex--;
    }

    return deck;
}


// #2: Sort shuffled cards by suit

export function sortDeckBySuit(arrayInput){
    let deck = [];
    for (const suit of suits){
        for (const card of arrayInput){
            if (card[0] == suit) { deck.push(card) }
            }
    }
    return deck;
}

// #3: Sort cards by ascending and descending

export function separateSuitAndRank(cardString){
    let [one, ...two] = cardString; // Destructure string
    if (two.length === 2) { two = [two[0] + two[1]] }
    return [one, two].flat()
}

export function sortDeckByFaceValue(arrayInput, mode = "asc" , game = "normal"){
    // mode : "asc" or "dsc"
    // game : "normal" or "poker"

    // Get maximum value in the deck
    let cardsRank = [];
    for ( const card of arrayInput) {
        let [cardSuit, cardRank] = separateSuitAndRank(card);
    
        cardsRank.push(parseInt(reverseSpecialCard(cardRank, game)))
    }
    let max_value = Math.max(...cardsRank);
    
    // parameters in looping
    let condition;
    let indicator;
    let basis;
    if ( mode == "asc" ){
        indicator = 1;
        basis = max_value + 1;
        condition = "indicator < basis" // condition as string
    } else if ( mode == "dsc") {
        indicator = max_value;
        basis = 0;
        condition = "indicator > basis" // condition as string
    } else {
        return "Wrong mode input in sortDeckByFaceValue()";
    }

    let deck = []
    
    while (eval(condition)){
        for (const card of arrayInput) {

            let [cardSuit, cardRank] = separateSuitAndRank(card);

            if (parseInt(reverseSpecialCard(cardRank, game)) === indicator){
            deck.push(card);
            }
        }
        if (mode == "asc") {
            indicator++;
        } else if (mode == "dsc") {
            indicator--;
        } else{
            break;
        }
    }
    return deck;
}

// #4: Deal a card : randomly remove card from deck and declare it

// 4th main function
export function dealRandomCard(arrayInput){
    let randomIndex = getRandomInt(arrayInput.length);
    // Get random card and update arrayInput
    let randomCard = arrayInput.splice(randomIndex,1)[0];

    let { givenCardString, givenCard } = dealGivenCard(randomCard)
    return { givenCardString, givenCard }
}

// inner function of 4th function
export function dealGivenCard(givenCard){
    // Note: this function does not update deck
    let [cardSuit, cardRank] = separateSuitAndRank(givenCard);
    
    /* console.log(givenCard) */
    cardSuit = cardSymbolToWords(cardSuit);

    cardRank = cardNumberOrLetterToWords(cardRank)
    let givenCardString = cardRank + " of "+ cardSuit + " " + givenCard
    
    return { givenCardString, givenCard }
}



/* POKER */


function checkIfArrayIsUnique(myArray) {
    return myArray.length === new Set(myArray).size;
}

function increasingSequence(myArray){
    return !myArray.some((val, idx) => val != myArray[0] + idx);
}

function decreasingSequence(myArray){
    return !myArray.some((val, idx) => val != myArray[0] - idx);
} 

function getDuplicatesFrequency(myArray) {
    let result = myArray.reduce((accum,value) => {
            return Object.assign(accum,{[value]: (accum[value] || 0) + 1})
        }
        ,{}
    );
    return result;
}


// DETERMINE hand
export function determinePokerHand(arrayInput){
    
    let card_values = [];
    let card_suits = [];

    // Arrange hand in descendeing order of card value/rank
    // in poker mode, A is the highest with 14 value
    arrayInput = sortDeckByFaceValue(arrayInput, "dsc", "poker");
    
    //  Get card values and suits
    for (const card of arrayInput) {
        // console.log(card)
        let [cardSuit, cardRank] = separateSuitAndRank(card);

        // card suit
        card_suits.push(cardSymbolToWords(cardSuit));

        // card value
        card_values.push(parseInt(reverseSpecialCard(cardRank, "poker" )));
    }

    // console.log(arrayInput);
    // console.log(card_values);
    // console.log(card_suits);

    // Determine the following Boolean variables
    let hasSameRank; // if cards on hand have the same rank /value
    let areSequential; // if cards on hand rank/value are in sequence;
    let areSameSuit;// if all cards on hand are the same suit

    hasSameRank = !checkIfArrayIsUnique(card_values) // inverse of unique
    areSequential = decreasingSequence(card_values)
    areSameSuit = card_suits.every(val => val === card_suits[0]);

    let combination;
    if (hasSameRank) {
        let duplicatesFreq = Object.values(getDuplicatesFrequency(card_values));

        if (duplicatesFreq.includes(4)) {

            combination = "Four-of-a-Kind";

        } else if (duplicatesFreq.includes(3) && (duplicatesFreq.includes(2))) {

            combination = "Full House";

        } else if (duplicatesFreq.includes(3)) {

            combination = "Three-of-a-Kind";

        } else if (duplicatesFreq.includes(2)) {

            let twoValueFreq = getDuplicatesFrequency(duplicatesFreq)

            if (twoValueFreq > 1) {
                combination = "Two Pair";
            } else {
                combination = "Pair";
            }

        } else {
            console.log("Something wrong in hasSameRank")
        }
    } else if (areSequential) {
        console.log("Sequential", areSequential);
        if (areSameSuit){
            if ( card_values.includes(14) && card_values.includes(13) &&
                 card_values.includes(12) && card_values.includes(11)) {

                combination = "Royal Flush";

            } else {

                combination = "Straight Flush";

            }
        } else {

            combination = "Straight";

        }
    } else if (areSameSuit) {
        console.log("Same suit", areSameSuit);

        combination = "Flush";

    } else {

        combination = "No Pair";

    }

    return [ arrayInput, combination ]
}

// convert hand array to string output
export function convertHandToString(arrayInput) {

    let [arrayInput1, combination] = determinePokerHand(arrayInput)

    let result = '';
    for (const card of arrayInput1){
        result = result + " " +dealGivenCard(card).givenCard;
    }
    return combination + " - " +result;
};