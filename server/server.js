const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, './../public');
const port = process.env.PORT || 3000;

var {generateMessage} = require('./utils/message.js');

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected');

    // socket.emit from admin text Welcome to the chat app
    socket.emit('newUser', generateMessage('Admin', 'Welcome to the chat app!'));

    // Sends event to all except sender
    // socket.broadcast.emit from Admin text New user joined
    socket.broadcast.emit('newUser', generateMessage('Admin', 'New user _______ has joined!'));

    socket.on('createMessage', (msg) => {
        console.log('New message created!');

        // Sends event to all clients
        io.emit('newMessage', generateMessage(msg.from, msg.text));
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected!');
    });
});

server.listen(port, () => {
    console.log(`Listening on port: ${port}`);
});
