
// Initial variables 
let suits = ['♣','♠','♡', '♢',];//Global variable in this script

//Basic Function 1 for special cards
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

//Basic Function 2 for special cards
export function reverseSpecialCard(letter) {
	switch(letter){
  	case ("A"):
    	return "1";
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

export function sortDeckByFaceValue(arrayInput, mode = "asc"){
    let deck = []
    if (mode == "asc"){
    
        let indicator = 1;
        while (indicator < 14){
            for (const card of arrayInput) {
                let [one, ...two] = card; // Destructure string
                if (two.length === 2) { two = [two[0] + two[1]] }
                if (parseInt(reverseSpecialCard(two[0])) === indicator){
                deck.push(card);
                }
            }
            indicator++
        }
        return deck;
        
    } else if (mode == "dsc") {
    
        let indicator = 13;
        while (indicator > 0){
            for (const card of arrayInput) {
                let [one, ...two] = card; // Destructure string
                if (two.length === 2) { two = [two[0] + two[1]] }
                if (parseInt(reverseSpecialCard(two[0])) === indicator){
                deck.push(card);
                }
            }
            indicator--
        }
        return deck;
        
    } else {
    
        return "wrong input";
        
    }
}

// #4: Deal a card : randomly remove card from deck and declare it

// Convert suit symbol to words
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

// Convert card value to words
export function cardNumberToWords(num) {
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


// 4th main function
export function dealCard(arrayInput){
    let randomIndex = getRandomInt(arrayInput.length);
    let randomCard = arrayInput[randomIndex];
    
    let [suit, ...card_value] = randomCard;
    /* console.log(randomCard) */
    suit = cardSymbolToWords(suit[0]);
    
    if (card_value.length == 2 ) { card_value = [card_value[0]+card_value[1]]}
    card_value = cardNumberToWords(card_value[0])
    let randomCardString = card_value + " of "+ suit + " " + randomCard
    
    //update deck
    arrayInput.splice(randomIndex, 1);
    
    return { randomCardString, randomCard }
}

export function dealGivenCard(givenCard){
    
    let [suit, ...card_value] = givenCard;
    /* console.log(givenCard) */
    suit = cardSymbolToWords(suit[0]);
    
    if (card_value.length == 2 ) { card_value = [card_value[0]+card_value[1]]}
    card_value = cardNumberToWords(card_value[0])
    let givenCardString = card_value + " of "+ suit + " " + givenCard
    
    return { givenCardString, givenCard }
}

