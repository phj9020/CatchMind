import { disableChat, enableChat } from "./chat";
import { disableCanvas, enableCanvas, hideControls, resetCanvas, showControls } from "./paint";

const board = document.getElementById("jsPBoard");
const notification =document.getElementById("jsNoti");

const addPlayers = (players) => {
    board.innerHTML = "";
    return players.forEach((player) => {
        const playerElement = document.createElement("span");
        playerElement.innerText = `${player.nickname}: ${player.points}`;
        board.appendChild(playerElement);
    })
};


const setNotification = (text) => {
    notification.innerText = "";
    notification.innerText = text; 
}

export const handlePlayerUpdate = ({sockets}) => {
    // put sockets to board
    return addPlayers(sockets);
};


export const handleGameStarted = () => {
    setNotification("Game Started");
    // disable canvas events : when game starts, prevent others from painting 
    disableCanvas();
    // hide canvas controls 
    hideControls();
    enableChat();
}


export const handleLeaderNotification = ({word}) => {
    enableCanvas();
    showControls();
    disableChat();
    notification.innerText = `You are the Painter!! Please paint: ${word}, you got 30 seconds for drawing`;
}

export const handleGameEnded = () => {
    setNotification("Game Ended");
    disableCanvas();
    hideControls();
    resetCanvas();
}

export const handleGameStarting = () => {
    setNotification("Game will start soon");
}