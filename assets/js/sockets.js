import {handleDisconnected, handleNewUser} from "./notifications";

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
}