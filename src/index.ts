require('dotenv');
import express, { Request, Response } from 'express';
import http from 'http';
const app = express();

app.set('views', './views');
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.json( { limit: "15mb" }))
app.use(express.urlencoded( { extended: true }));

app.get('/', (req: Request, res: Response) => {
    res.render('index');
});

const rooms = {
    primary: {
        messages: [{}]
    },
}

app.post('/rooms', (req: Request, res: Response) => {
    io.sockets.emit('user-created', req.body.name)
    res.render('room', {
        name: req.body.name,
        rooms
    });
});

app.get('/rooms/:room', (req: Request, res: Response) => {
    res.render('room');
});

const server = http.createServer(app);

const port = process.env.PORT || 3000;

const io = require('socket.io')(server);

io.on('connection', (socket) => {
    socket.on('user-created', (name) => {
        socket.username = name
        socket.broadcast.emit('user-created', name)
    })

    socket.on('message', (message) => {
        socket.broadcast.emit('message', message)
    })
    console.log('connection');
})

server.listen(port, function() {
    console.log(`Server listening on ${port}!`);
})