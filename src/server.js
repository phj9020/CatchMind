import 'dotenv/config';
import express from 'express';
import socketIO from 'socket.io';

const app = express();

const PORT = process.env.PORT;

app.set("view engine", "pug");
app.set("views", __dirname + '/views');

app.use(express.static(__dirname + "/static"));

app.get('/', (req, res) => {
    res.render('home')
})

app.listen(PORT, ()=> {
    console.log(`✔️ Server running on http://localhost:${PORT}/`)
});

console.log(__dirname + "/static")