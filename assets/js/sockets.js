import { handleNewMessage } from "./chat";
import {handleDisconnected, handleNewUser} from "./notifications";
import { handleBeganPath, handleFilled, handleStrokedPath } from "./paint";
import { handleGameEnded, handleGameStarted, handleNotification, handlePlayerUpdate} from "./players";

let socket = null;

export const getSocket = () => {
    return socket
};

export const updateSocket = (aSocket) => {
    return socket = aSocket
}

export const initSockets = (aSocket) => {
    const {globalobject} = window;
    updateSocket(aSocket);
    aSocket.on(globalobject.newUser, handleNewUser);
    aSocket.on(globalobject.disconnected, handleDisconnected);
    aSocket.on(globalobject.messageReceived, handleNewMessage);
    aSocket.on(globalobject.beganPath, handleBeganPath);
    aSocket.on(globalobject.strokedPath, handleStrokedPath);
    aSocket.on(globalobject.filled, handleFilled);
    aSocket.on(globalobject.playerUpdate, handlePlayerUpdate);
    aSocket.on(globalobject.gameStarted, handleGameStarted);
    aSocket.on(globalobject.painterNotification, handleNotification);
    aSocket.on(globalobject.gameEnded, handleGameEnded);
}