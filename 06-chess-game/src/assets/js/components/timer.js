import regeneratorRuntime from "regenerator-runtime";

import { toggleAlert } from './alert.js'
// import "regenerator-runtime/runtime.js";
function convertTimerToTime(timeInput) {
    //timeInput must be in milliseconds format
    let days = Math.floor(timeInput / (1000 * 60 * 60 * 24));
    let hours = Math.floor((timeInput % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = "0" + Math.floor((timeInput % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = "0" + Math.floor((timeInput % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds}
}

function updateGameTime( timeInput , idTimeDiv ){
    let { minutes, seconds } = convertTimerToTime( timeInput ) 
    document.getElementById(idTimeDiv).innerText = minutes.slice(-2) + " : " + seconds.slice(-2)  ;
}

export function countDownTimer(state) {
    // let { active_chess_player } = state;

    // Set the date we're counting down to
    let countDownHour   = 3600000 ; // 60 minutes * 60 seconds * 1000 -> 
    let countDownInterval = 1000; // 1 second * 1000 -> 1000 milliseconds or 1 second
    let multiplier = 1000;

    state.players.white.remaining_time  = countDownHour/2;
    state.players.black.remaining_time  = countDownHour/2;
    
    // set initial time
    updateGameTime( state.players.white.remaining_time , "p1time" )
    updateGameTime( state.players.black.remaining_time , "p2time" )

    let timer = new Timer(countDownHour, countDownInterval ,state)
    timer.forLoop()
}

function Timer(wholeTimePeriod, Interval, state) {
    this.wholeTimePeriod = wholeTimePeriod
    this.interval = Interval
    this.pause = false

    this.pauseBtn = document.getElementById("pause")
    this.pauseBtn.onclick = () => this.pauseMethod();

    this.timer = function(interval) {
        return new Promise(resolved => {
            setTimeout(resolved, interval)
        })
    }
    this.action = async function(){
        await this.timer(this.interval)
        
        // let { minutes, seconds } = convertTimerToTime( this.wholeTimePeriod )
        // console.log( minutes.slice(-2) + " : " + seconds.slice(-2))

        updateGameTime( this.wholeTimePeriod , "time" )
        this.wholeTimePeriod -= this.interval;

        // display player time;
        let active_time = state.players[state.active_chess_player].remaining_time;
        let active_player = state.active_chess_player == "white" ? "p1time" : "p2time";
        // console.log(active_time, active_player )
        updateGameTime( active_time , active_player )
        state.players[state.active_chess_player].remaining_time = active_time - this.interval;    
    }

    this.pauseMethod = function () {
        this.pause = this.pause === true ? false : true

        if(this.pause === false){
            toggleAlert("Resumed!")
            this.forLoop()
        }
    }

    this.forLoop = async function(){
        while (this.wholeTimePeriod > 0) {
            await this.action()
            if(this.pause === true)  {
                toggleAlert("Paused!", false)
                break
            }
        }
    }
}