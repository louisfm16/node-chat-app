// ES6 Arrow functions are not supported in most browsers
var socket = io();

socket.on('connect', function() {
    console.log('Connected to server!');

    socket.on('newUser', function(newUser) {
        console.log('newUser', newUser);
    });

    socket.on('newMessage', function(newMessage) {
        console.log('newMessage', newMessage);
    });
});

socket.on('disconnect', function() {
    console.log('Disconnected from server!');
});
