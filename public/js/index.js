var socket = io();

socket.on('connect', function() {
    console.log('Connected to server!');

    socket.emit('createMessage', {
        from: 'CLIENT from key',
        text: 'CLIENT text key'
    });

    socket.on('newMessage', function(newMessage) {
        console.log('newMessage', newMessage);
    });
});

socket.on('disconnect', function() {
    console.log('Disconnected from server!');
});
