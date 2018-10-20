const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, './../public');
const port = process.env.PORT || 3000;

var {generateMessage, generateLocationMessage} = require('./utils/message.js');
var {isRealString} = require('./utils/validation.js');

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected');

    socket.on('join', (params, callback) => {
        if(!isRealString(params.name) || !isRealString(params.room)) {
            callback('Name and room name are required!');
        }

        socket.join(params.room);

        // socket.emit from admin text Welcome to the chat app
        socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app!'));

        // Sends event to all except sender
        // socket.broadcast.emit from Admin text New user joined
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `New user ${params.name} has joined!`));

        callback();
    });

    socket.on('createMessage', (msg, callback) => {
        console.log('New message created!');

        // Sends event to all clients
        io.emit('newMessage', generateMessage(msg.from, msg.text));

        callback();
    });

    socket.on('createLocationMessage', (coords, callback) => {
        io.emit('newLocationMessage', generateLocationMessage('Admin', coords.lat, coords.lon));

        callback();
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected!');
    });
});

server.listen(port, () => {
    console.log(`Listening on port: ${port}`);
});
