import { questions_array, choices_array, answers_array } from './data.js';

export function Questions() {

    // data
    this.questions = questions_array,
    this.choices = choices_array,
    this.answers = answers_array,
    
    // html dom elements
    this.questionNoH1 = document.getElementById("questionNo");
    this.questionStatementH2 = document.getElementById("question");
    this.choicesInputRadio = document.getElementById("options");
    this.alertDiv = document.getElementById("msgContainer");
    this.alertMsgP = document.getElementById("message");
    
    // html Button elements
    this.exitBtn = document.getElementById("exit");
    this.submitBtn;

    // initial variables
    this.answer = null,
    this.question_index = null,
    this.score_int = 0; // for acc
    this.performance_array = []; // for detecting streak
    
    // Create element
    this.createButtonSubmit = function () {
        let btn = document.createElement("input");
        btn.type = "button"
        btn.value = "Submit"
        this.submitBtn = btn;
        this.choicesInputRadio.appendChild(btn)
    }

    this.InitializeApp = function() {
        
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

    this.verifyAnswer = function(){

        console.log("Your Answer: ", this.answer, " correctAnswer: ",this.answers[this.question_index]);

        // Verify Answer
        if (this.answer === this.answers[this.question_index]){
            console.log( "Correct!")
            
            //Set alert display and and content
            this.alertDiv.classList.add("alert-success")
            this.alertDiv.style.visibility = 'visible';
            this.alertMsgP.innerText = "Correct! Your Answer: " + 
                this.choices[this.question_index][this.answer - 1]

        } else {
            console.log( "Wrong!")
            this.alertDiv.classList.add("alert-danger")
            this.alertDiv.style.visibility = 'visible';
            this.alertMsgP.innerText = "Wrong! Your Answer: " + 
                this.choices[this.question_index][this.answer - 1]
        }
        
        // Reinitialize after 1 second
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
