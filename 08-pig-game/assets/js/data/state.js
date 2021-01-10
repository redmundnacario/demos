export function Game () {
    this.state = {
        players : {
            player1 : {
                name : "Player 1",
                round_score: 0,
                total_score: 0
            },
            player2 : {
                name : "Player 2",
                round_score: 0,
                total_score: 0
            }
        },
        active_player: "player1",
        winner: null,
        target_score: 100,
        dice_value: 1,
    }
} 