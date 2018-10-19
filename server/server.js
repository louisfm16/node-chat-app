const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, './../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected');

    // socket.emit from admin text Welcome to the chat app
    socket.emit('newUser', {
        from: 'Admin',
        text: 'Welcome to the chat app!',
        createdAt: new Date().getTime()
    });

    // socket.broadcast.emit from Admin text New user joined
    socket.broadcast.emit('newUser', {
        from: 'Admin',
        text: 'New user _______ has joined!',
        createdAt: new Date().getTime()
    });

    socket.on('createMessage', (msg) => {
        console.log('New message created!');

        // Sends event to all clients
        io.emit('newMessage', {
            from: msg.from,
            text: msg.text,
            createdAt: new Date().getTime()
        });

        // Sends event to all except sender
        // socket.broadcast.emit('newMessage', {
        //     from: msg.from,
        //     text: msg.text,
        //     createdAt: new Date().getTime()
        // });
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected!');
    });
});

server.listen(port, () => {
    console.log(`Listening on port: ${port}`);
});
