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
    console.log('name', req.body.name)
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

io.on('connection', socket => {
    console.log('connection');
    socket.emit('user-created');
})

server.listen(port, function() {
    console.log(`Server listening on ${port}!`);
})