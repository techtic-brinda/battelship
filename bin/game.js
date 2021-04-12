let playerName = [];
let playerBoard = [];
let winner = null;
let shipPlaceType = ['V', 'H'];
let shipPlaceAlpha = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
let shipPlaceNumber = ['1', '2', '3', '4', '5', '6', '7', '8'];
let shipPlaceAlphaLength = shipPlaceAlpha.length;
let shipPlaceNumberLength = shipPlaceNumber.length;
async function setPlayerName(type, name){
    playerName[type] = name;
    return true;
}

function getPlayerName(type){
    return playerName[type];
}

async function setPlayerBoard(type, startPoint){
    let valid = validationInput(startPoint);
    if(valid){
        let pbSet = setPlayerBoardPlace(startPoint);
        playerBoard[type] = pbSet;
        return true;
    }
    return false;
}

function setPlayerBoardPlace(startPoint){
    let type = startPoint.split(" ");
    type0 = type[0].split("");
    let playerBoardArray = [];
    if(type[1].toUpperCase() == 'H'){
        let alphabetIndex = shipPlaceAlpha.indexOf(type0[0].toUpperCase());
        let lastLoop = alphabetIndex + 3;
        for (let index = alphabetIndex; index < lastLoop; index++) {
            let p;
            if((index+1) <= shipPlaceAlphaLength){
                p = shipPlaceAlpha[index] + type0[1];
            }else{
                let i = index - shipPlaceAlphaLength;
                p = shipPlaceAlpha[i] + type0[1];
            }
            playerBoardArray.push(p);
        }
    }else{
        let numberIndex = shipPlaceNumber.indexOf(type0[1]);
        let lastLoop = numberIndex + 3;
        for (let index = numberIndex; index < lastLoop; index++) {
            let p;
            if((index+1) <= shipPlaceNumberLength){
                p = type0[0].toUpperCase() + shipPlaceNumber[index];;
            }else{
                let i = index - shipPlaceNumberLength;
                p = type0[0].toUpperCase() + shipPlaceNumber[i];;
            }
            playerBoardArray.push(p);
        }
    }
    return playerBoardArray;
}

function validationInput(input){
    let type = input.split(" ");
    type0 = type[0].split("");

    if(type.length !=2 || type0.length != 2){
        return false;
    }
    if(!shipPlaceType.includes(type[1].toUpperCase())){
        return false;
    }
    if(!shipPlaceAlpha.includes(type0[0].toUpperCase())){
        return false;
    }
    if(!shipPlaceNumber.includes(type0[1])){
        return false;
    }
    return true;
}

function shotTurn(type, shot){
    let ultimateType = (type == 'A') ? 'B' : 'A';
    let s = shot.toUpperCase();
    let index = playerBoard[ultimateType].indexOf(s);
    if(index != -1){
        playerBoard[ultimateType].splice(index, 1);
        if(playerBoard[ultimateType].length == 0){
            winner = type;
            return "you sunk my battleship";
        }
        return "Hit";
    }
    return "Miss";
}
function getWinner() {
    return winner;
}

 module.exports ={
    getPlayerName,
    setPlayerName,
    setPlayerBoard,
    shotTurn,
    getWinner
 }
