function questions() {
    this.questions = [ 
        "What does HTML stand for?",
        "How many tags are in a regular element?",
        "What is the difference in an opening tag and a closing tag?",
        "< br  / > What type of tag is this?",
        "< body > Is this an opening tag or a closing tag?",
        "< / body > Is this an opening tag or a closing tag?",
        "Where is the meta tag only found?",
        "Which is the correct way to tag an image?",
        "What is an element that does not have a closing tag called?",
        "Which of the following is an example of an empty element?",
        "What should values always be enclosed in?",
        "Where do all items for the same web site need to be saved?",
        `What does < a  h r e f = ”h t t p : / / w w w . g o o g l e . c o m“  t i t l e = ” L i n k  t o   G o o g l e  ” t a r g e t = ” _  b l a n k  ” > G o o g l e  < / a > do?`,
        "What is always a welcome page, and explains the purpose or topic of the site?",
        "What does View Source do?"

    ],

    this.choices = [
        [
            "Hyper Text Markup Language",
            "Hot Mail",
            "How to Make Lumpia",
        ],
        [
            "2", "1", "3"
        ],
        [
            "Opening tag has a / in front",
            "Closing tag has a / in front",
            "There is no difference"
        ],
        [
            "Break tag",
            "A broken one",
            "An opening tag"
        ],
        [
            "Opening",
            "Closing"
        ],
        [
            "Opening",
            "Closing"
        ],
        [
            "The last page",
            "The home page",
            "The second page"
        ],
        [
            `src=”image.jpg/gif” alt=”type some text”`,
            `Src=”image.jpg/gif” alt=”type some text”`
        ],
        [
            "Tag",
            "Empty element",
            "Closed element",
        ],
        [
            "< img / >",
            "< img > < / img >",
            "< / img>"
        ],
        [
            "Quotation marks",
            "Commas",
            "Parenthesis"
        ],
        [
            "In the same folder",
            "Where ever is fine",
            "In different folders"
        ],
        [
            "Adds a link to google on the page",
            "Adds a search engine to the page",
            "Nothing"

        ],
        [
            "Page 4",
            "Homepage",
            "Table of contents"
        ],
        [
            "Nothing",
            "Brings up a note pad with the HTML code already used for the site.",
            "Opens a new website."
        ]
    ],

    this.answers = [ 1, 1, 2, 2, 1,
                     2, 2, 1, 2, 1,
                     1, 1, 1, 2, 2 ],

    this.answer = null,
    this.question_index = null,

    this.getRandomInt = function() {
        let max = this.questions.length;
        
        return Math.floor(Math.random() * Math.floor(max));
    },

    this.getRandomQuestion = function () {
        // Get random integer for selecting question
        this.question_index = this.getRandomInt();

        // Display Question
        console.log((this.question_index + 1)
                     + ".) " + 
                     this.questions[this.question_index]);

        // Display Answer
        for(const index in this.choices[this.question_index]){
            console.log( "      " + 
                        (parseInt(index) + 1) 
                        + ".) " + 
                        this.choices[this.question_index][index]);
        };

        this.answer  = prompt("Choose the number of correct answer.");

        this.verifyAnswer();
    },

    this.verifyAnswer = function(){

        console.log("Your Answer: ", this.answer);

        // Verify Answer
        if (this.answer === this.answers[this.question_index].toString()){
            console.log( "Correct!")
        } else {
            console.log( "Wrong!")
        }
        
        console.log("Note: Refresh page to get another question.");
    }

}

document.body.onload = (event) => {
    const newQuestion = new questions()
    newQuestion.getRandomQuestion();
};
