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
    document.getElementById(idTimeDiv).innerText = minutes.slice(-2) + ":" + seconds.slice(-2);
}

export function countDownTimer(state) {
    // let { active_chess_player } = state;

    // Set the date we're counting down to
    let countDownHour   = 3600000; // 60 minutes * 60 seconds * 1000 -> 
    let countDownInterval = 1000; // 1 second * 1000 -> 1000 milliseconds or 1 second
    let multiplier = 1000;

    state.players.white.remaining_time  = countDownHour/2;
    state.players.black.remaining_time  = countDownHour/2;
    
    // set initial time
    updateGameTime( state.players.white.remaining_time , "p1time" )
    updateGameTime( state.players.black.remaining_time , "p2time" )


    // Update the count down every 1 second
    var x = setInterval(() => {

        // display game time;
        updateGameTime( countDownHour , "time" )
        countDownHour = countDownHour - countDownInterval;

        // display player time;
        let active_time = state.players[state.active_chess_player].remaining_time;
        let active_player = state.active_chess_player == "white" ? "p1time" : "p2time";
        // console.log(active_time, active_player )
        updateGameTime( active_time , active_player )
        state.players[state.active_chess_player].remaining_time = active_time - countDownInterval;
    

    }, countDownInterval);
}