import events from "./event";

let sockets = [];

const socketController = (socket, io) => {
    const broadcast = (event, data) => socket.broadcast.emit(event, data);

    const superBroadcast = (event, data) => io.emit(event, data);

    // on connect notification
    socket.on(events.setNickname,({nickname}) => {
        socket.nickname = nickname;
        sockets.push({id: socket.id, points: 0, nickname: socket.nickname});
        broadcast(events.newUser, {nickname});
        //send player update
        superBroadcast(events.playerUpdate, {sockets});
    });
    // on disconnect notification
    socket.on(events.disconnect, ()=> {
        sockets = sockets.filter(aSocket => aSocket.nickname !== socket.nickname)
        broadcast(events.disconnected, {nickname: socket.nickname});
        //send player update
        superBroadcast(events.playerUpdate, {sockets});
    });
    // send Message
    socket.on(events.sendMessage, ({message})=> {
        broadcast(events.messageReceived, {message, nickname: socket.nickname});
    });
    // listen begin path
    socket.on(events.beginPath, ({x,y})=> {
        broadcast(events.beganPath, {x,y});
    });
    // listen strokePath
    socket.on(events.strokePath, ({x,y, color}) => {
        broadcast(events.strokedPath, {x,y, color});
    });
    //listen fill color
    socket.on(events.fill, ({color}) => {
        broadcast(events.filled, {color});
    });
};


export default socketController;