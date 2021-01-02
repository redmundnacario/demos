export function countDownTimer() {
    // Set the date we're counting down to
    let countDownHour = 3600000; // 60 minutes * 60 seconds * 1000 -> 
    let countDownInterval = 1000; // 1 second * 1000 -> 1000 milliseconds or 1 second
    let multiplier = 1000;
    let playerOneTime = countDownHour/2;
    let playerTwoTime = countDownHour/2;
    // Update the count down every 1 second
    var x = setInterval(() => {
        // convert back to minutes
        // console.log((countDownHour  / 60) / multiplier );
        // console.log(countDownHour );

        // Time calculations for days, hours, minutes and seconds
        // let days = Math.floor(distance / (1000 * 60 * 60 * 24));
        // let hours = Math.floor((countDownHour % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = "0" + Math.floor((countDownHour % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = "0" + Math.floor((countDownHour % (1000 * 60)) / 1000);
        
        // console.log( minutes + "m " + seconds + "s ");
        document.getElementById("time").innerText = minutes.slice(-2) + ":" + seconds.slice(-2);
        countDownHour = countDownHour - countDownInterval;
    }, countDownInterval);
}