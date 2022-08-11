const PLAYER_ONE_COLOR = "white";
const PLAYER_TWO_COLOR = "black";

// type alias for the two players
type Player = "P1" | "P2";

// an Occupant of a square can either be a player, or nobody
type Occupant = Player | null;

// a Spot can be in a 3x3 grid from [0, 0] thru [2, 2]
type Spot = [0 | 1 | 2, 0 | 1 | 2]

// a Row is a series of three Spots 
type Row = [Spot, Spot, Spot];

// the DivIds used to identify the squares in HTML
type DivIds = "a1" | "a2" | "a3" | "b1" | "b2" | "b3" | "c1" | "c2" | "c3"

class Game {
    public board: Occupant[][];
    public turn: Player;
    public gameOver: boolean;
    constructor() {
        this.board = [[null, null, null], [null, null, null], [null, null, null]];
        this.turn = "P1";
        this.gameOver = false;
    }
    play(spot: Spot): boolean {
        if (this.board[spot[0]][spot[1]]) {
            console.log(`Spot ${spot} is already taken.  Try again.`);
            return false;
        }
        this.board[spot[0]][spot[1]] = this.turn;
        console.log(`Player ${this.turn} playing in spot ${spot}`)
        if (this.winner()) {
            this.gameOver = true;
            console.log(`Player ${this.turn} wins!`);
            let displayText = document.getElementById("turn-or-winner") as HTMLHeadingElement;
            displayText.innerText = `${this.turn} wins!`;
            this.turn = this.turn == "P1" ? "P2" : "P1";
            return true
        }
        this.turn = this.turn == "P1" ? "P2" : "P1";
        let displayText = document.getElementById("turn-or-winner") as HTMLHeadingElement;
        displayText.innerText = this.turn == "P1" ? "Turn: Player 1" : "Turn: Player 2";
        return true;
    }

    checkSpot(spot: Spot): Occupant {
        return this.board[spot[0]][spot[1]];
    }

    displayBoard() {
        for (let y of this.board) {
            console.log(y);
        }
    }
    winner(): false | Player {
        const winning_rows: Row[] = [
            [[0, 0], [0, 1], [0, 2]],
            [[1, 0], [1, 1], [1, 2]],
            [[2, 0], [2, 1], [2, 2]],
            [[0, 0], [1, 0], [2, 0]],
            [[0, 1], [1, 1], [2, 1]],
            [[0, 2], [1, 2], [2, 2]],
            [[0, 0], [1, 1], [2, 2]],
            [[0, 2], [1, 1], [0, 2]],
        ]
        for (let potential_winner of winning_rows) {
            console.log(potential_winner);
            const spot_1_occupant = this.checkSpot(potential_winner[0]);
            console.log(`spot 1: ${spot_1_occupant} `)
            const spot_2_occupant = this.checkSpot(potential_winner[1]);
            console.log(`spot 2: ${spot_2_occupant} `)
            const spot_3_occupant = this.checkSpot(potential_winner[2]);
            console.log(`spot 3: ${spot_3_occupant} `)
            if (spot_1_occupant) {
                if (spot_1_occupant === spot_2_occupant && spot_2_occupant == spot_3_occupant) {
                    return spot_1_occupant;
                }
            }
        }
        return false;
    }
}

// mapping DivIds -> Spot
function translateIdToSpot(div_id: DivIds): Spot | null {
    switch (div_id) {
        case "a1":
            return [0, 0];
        case "a2":
            return [0, 1];
        case "a3":
            return [0, 2];
        case "b1":
            return [1, 0];
        case "b2":
            return [1, 1];
        case "b3":
            return [1, 2];
        case "c1":
            return [2, 0];
        case "c2":
            return [2, 1];
        case "c3":
            return [2, 2];
    }
}

// Add event listener to each box
let boxes = document.getElementsByClassName("box");
for (let box of boxes) {
    box.addEventListener("click", () => {
        let spot = translateIdToSpot(box.id as DivIds);
        if (spot) {
            if (!g.gameOver) {
                if (g.play(spot)) {
                    let color = g.turn == "P1" ? PLAYER_TWO_COLOR : PLAYER_ONE_COLOR
                    box.setAttribute("style", `background:${color}`);
                }
            }
        }
    })
}

// clear the board (when "new game" is pressed)
function clearBoard() {
    for (let square of ["a1", "a2", "a3", "b1", "b2", "b3", "c1", "c2", "c3"]) {
        let box = document.getElementById(square)!;
        box.setAttribute("style", `background:green`);
    }
}

let g = new Game()
let new_game_button = document.getElementById("new-game") as HTMLButtonElement;
new_game_button.addEventListener("click", () => {
    console.log("new game");
    g = new Game();
    clearBoard();
})
