const { RSA_X931_PADDING } = require("constants");
const readline = require("readline");
var games = require('./game.js');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
let question = [
    "Ready to start game? Y or N: ",
    "Player A Name: ",
    "Player B Name: ",
    " ship start point: ",
    " shot: "
]

rl.question(question[0], function(answer){
    if(answer.toUpperCase() == 'Y' || answer.toUpperCase() == 'YES'){
        askPlayerName('A');
    }else{
        rl.close();
    }
});

/* rl.question(question[0], function(nameA) {
    games.setPlayerName('A', nameA);
    rl.question(question[1], function(nameB) {
        games.setPlayerName('B', nameB);
        askShipPlace('A');

       // rl.close();
    });
}); */

rl.on("close", function() {
    console.log("\nBYE BYE !!!");
    process.exit(0);
});

function drawShipPlaceBoard(){
    console.log("------------------------------------");
    console.log("|   | A | B | C | D | E | F | G | H |");
    console.log("| 1 |   |   |   |   |   |   |   |   |");
    console.log("| 2 |   |   |   |   |   |   |   |   |");
    console.log("| 3 |   |   |   |   |   |   |   |   |");
    console.log("| 4 |   |   |   |   |   |   |   |   |");
    console.log("| 5 |   |   |   |   |   |   |   |   |");
    console.log("| 6 |   |   |   |   |   |   |   |   |");
    console.log("| 7 |   |   |   |   |   |   |   |   |");
    console.log("| 8 |   |   |   |   |   |   |   |   |");
    console.log("------------------------------------");
    console.log("V: Vertical");
    console.log("H: Horizontal");
    console.log("Ex: A1 V");
}

function askPlayerName(type){
    let q = (type == 'A') ? question[1] : question[2];
    rl.question(q, function(name) {
        games.setPlayerName(type, name);
        if(type == 'A'){
            askPlayerName('B');
        }else{
            drawShipPlaceBoard();
            askShipPlace('A');
        }
    });
}
function askShipPlace(type){
    let name = games.getPlayerName(type);
    let q = name + question[3];
    rl.question(q, function(shipStart) {
        games.setPlayerBoard(type, shipStart).then((status) => {
            if(status){
                if(type == 'A'){
                    askShipPlace('B');
                }else{
                    fireTurn('A');
                }
            }else{
                console.log("invalid Inputs!!!");
                askShipPlace('A');
            }
        });

    });
}
function fireTurn(type){
    let name = games.getPlayerName(type);
    let q = name + question[4];
    rl.question(q, function(shot) {
        let d = games.shotTurn(type, shot);
        console.log(d);
        let win = games.getWinner();
        if(win){
            console.log("Winner: "+ name);
            rl.close();
            return;
        }
        if(type == 'A'){
            fireTurn('B');
            return;
        }
        fireTurn('A');
    });
}
