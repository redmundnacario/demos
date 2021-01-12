import { questions_array, choices_array, answers_array } from './data.js';

export function Questions() {

    // data
    this.questions = questions_array,
    this.choices = choices_array,
    this.answers = answers_array,
    
    // html dom elements
    this.cardDiv = document.querySelector(".card");
    this.cardBottomDiv = document.querySelector(".card-bottom")
    this.scoreH1 = document.getElementById("scoreH1");

    this.questionNoH1 = document.getElementById("questionNo");
    this.questionStatementH2 = document.getElementById("question");
    this.choicesInputRadio = document.getElementById("options");
    this.alertDiv = document.getElementById("msgContainer");
    this.alertMsgP = document.getElementById("message");
    this.exitPage = document.getElementById("exitPage")
    this.exitMsgP = document.getElementById("exitMessage")

    // html Button elements
    this.exitBtn = document.getElementById("exit");
    this.submitBtn;

    // initial variables
    this.answer = null,
    this.question_index = null,
    this.score_int = 0; // for acc
    this.performance_array = []; // for detecting streak
    this.round_int = 1;// no of rounds, for detecting streak
    
    // Create element
    this.createButtonSubmit = function () {
        let btn = document.createElement("input");
        btn.type = "button"
        btn.value = "Submit"
        this.submitBtn = btn;
        // this.choicesInputRadio.appendChild(btn)
        this.cardBottomDiv.appendChild(btn)
    }


    // Main functions

    this.InitializeApp = function() {
        this.alertDiv.style.visibility = 'hidden';
        let optionsChild = Array.from(this.choicesInputRadio.children)
        optionsChild.forEach(child => child.remove());
        this.getRandomQuestion()
    }

    this.exitApp = function() {
        this.alertDiv.style.visibility = 'hidden';
        // remove element of card to hidden
        this.cardDiv.style.visibility = 'hidden';
        // create another elements  such as total score 
        this.exitPage.style.visibility= 'visible';
        this.exitMsgP.innerText = "Your Total Score: " + this.score_int;

    }

    this.getRandomInt = function() {
        let max = this.questions.length;
        
        return Math.floor(Math.random() * Math.floor(max));
    },

    this.getRandomQuestion = function () {
        // Get random integer for selecting question
        this.question_index = this.getRandomInt();

        // Display Question
        this.questionNoH1.innerText = "Question #" + (this.question_index + 1)
        this.questionStatementH2.innerText = this.questions[this.question_index]

        // console.log((this.question_index + 1)
        //              + ".) " + 
        //              this.questions[this.question_index]);

        // Display Answer
        for(const index in this.choices[this.question_index]){
            let radio = document.createElement("input");
            let label = document.createElement("label");
            radio.type = "radio"
            radio.value = index
            radio.id = index
            radio.name= "choices"
            label.setAttribute("for", index);
            label.innerText = this.choices[this.question_index][index]

            let optionContainer = document.createElement("div")
            optionContainer.appendChild(radio)
            optionContainer.appendChild(label)
            this.choicesInputRadio.appendChild(optionContainer)
        };

        // this.answer  = prompt("Choose the number of correct answer.");
    },

    this.displayScore = function(){
        console.log("Your Score: ", this.score_int)
    }

    this.determineStreak = function(){
        
        if (this.round_int%5 == 0){
            let streak_array = this.performance_array.slice(
                (this.performance_array.length - this.round_int),
                this.performance_array.length
            )  
            
            let sumStreak = streak_array.reduce((accum,value) => {
                return value+accum},0)
            
            if (sumStreak == this.round_int){
                console.log(sumStreak + " Winning Streak")
                alert(sumStreak + " Correct Answers in a Row!")
            }
                
        }
    }

    this.verifyAnswer = function(){

        console.log("Your Answer: ", this.answer);

        // Verify Answer
        if (this.answer === this.answers[this.question_index]){
            console.log( "Correct!")
            
            //Set alert display and and content
            this.alertDiv.classList.remove("alert-danger")
            this.alertDiv.classList.add("alert-success")
            this.alertDiv.style.visibility = 'visible';
            this.alertMsgP.innerText = "Correct! Your Answer: " + 
                this.choices[this.question_index][this.answer - 1]

            this.score_int++
            this.performance_array.push(1)
            
            // determine if 5, 10, 15 ... streak
            this.determineStreak()

        } else {
            console.log( "Wrong!")
            this.alertDiv.classList.remove("alert-success")
            this.alertDiv.classList.add("alert-danger")
            this.alertDiv.style.visibility = 'visible';
            this.alertMsgP.innerText = "Wrong! Your Answer: " + 
                this.choices[this.question_index][this.answer - 1]

            this.performance_array.push(0)
        }

        this.round_int++
        this.displayScore();
        this.scoreH1.innerText = "Score: "+ this.score_int

        // Reinitialize after 3 second
        setTimeout(() => {
            this.InitializeApp()
        }, 3000);
    }

    this.submitAnswer = function(){
        
        const form_data = new FormData(this.choicesInputRadio)
        const form_array_data = Array.from(form_data.entries())
        
        if (form_array_data.length === 0) {
            // Set alert that there is no answer given
        } else {
            //display answer and tell if right or wrong
            // console.log(form_array_data[0])
            this.answer = parseInt(form_array_data[0][1]) + 1;
            this.verifyAnswer()
        }
        
    }
}
