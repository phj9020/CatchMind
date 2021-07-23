import events from "./event";


const socketController = (socket) => {
    const broadcast = (event, data) => socket.broadcast.emit(event, data);
    // on connect notification
    socket.on(events.setNickname,({nickname}) => {
        broadcast(events.newUser, {nickname});
        socket.nickname = nickname;
    });
    // on disconnect notification
    socket.on(events.disconnect, ()=> {
        broadcast(events.disconnected, {nickname: socket.nickname});
    });
    // send Message
    socket.on(events.sendMessage, ({message})=> {
        broadcast(events.messageReceived, {message, nickname: socket.nickname});
    });
};


export default socketController;