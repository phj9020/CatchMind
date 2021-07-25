import events from "./event";
import {chooseWord} from "./words";
let sockets = [];
let inProgress = false;
let word = null;
let painter = null;

const choosePainter= () => {
    return sockets[Math.floor(Math.random() * sockets.length)];
}

const socketController = (socket, io) => {
    const broadcast = (event, data) => socket.broadcast.emit(event, data);

    const superBroadcast = (event, data) => io.emit(event, data);

    const startGame = () => {
        if(inProgress === false) {
            inProgress = true;
            // choose random painter
            painter = choosePainter();
            // choose random word
            word = chooseWord();
            
            setTimeout(()=> { 
                // tell everyone game start
                superBroadcast(events.gameStarted)
                // tell painter what word need to be painted
                io.to(painter.id).emit(events.painterNotification, { word });
            }, 2000)
            
        }
    };

    const endGame = () => {
        inProgress = false;
        superBroadcast(events.gameEnded);
    }

    // on connect notification
    socket.on(events.setNickname,({nickname}) => {
        socket.nickname = nickname;
        sockets.push({id: socket.id, points: 0, nickname: socket.nickname});
        broadcast(events.newUser, {nickname});
        //send player update
        superBroadcast(events.playerUpdate, {sockets});
        if(sockets.length === 2) {
            startGame();
        }
    });
    // on disconnect notification
    socket.on(events.disconnect, ()=> {
        sockets = sockets.filter(aSocket => aSocket.nickname !== socket.nickname)
        if(sockets.length === 1) {
            endGame();
        } else if(painter) {
            if(painter.id === socket.id) {
                endGame();
            }
        }
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