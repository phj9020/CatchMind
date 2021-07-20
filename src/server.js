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

// make array of sockets container 
let sockets = [];

// entry point on connection 
io.on("connection", (socket) => {
    // push each socket id into sockets container 
    sockets.push(socket.id);
});


// setInterval(() => {
//     console.log(sockets)
// }, 1000);


