import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';
import {Server} from 'socket.io';

const app = express();

const PORT = process.env.PORT;

app.set("view engine", "pug");
app.set("views", __dirname + '/views');

app.use(express.static(__dirname + "/static"));
app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.render('home')
})

const server = app.listen(PORT, ()=> {
    console.log(`✔️ Server running on http://localhost:${PORT}/`)
});

const io = new Server(server);


// entry point on connection 
io.on("connection", (socket) => {
    // message recieved from client
    socket.on("newMessage", ({message})=> {
        // send message to other clients 
        socket.broadcast.emit("messageNotification", {
            message, 
            nickname: socket.nickname || "Anonymous"
        });
    });

    // listen nickename event from client
    socket.on("setNickname", ({nickname})=> {
        // socket is just object, we can add whatever we want 
        socket.nickname = nickname;
    });
});



