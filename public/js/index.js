// ES6 Arrow functions are not supported in most browsers
var socket = io();

socket.on('connect', function() {
    console.log('Connected to server!');
});

socket.on('disconnect', function() {
    console.log('Disconnected from server!');
});

socket.on('newMessage', function(newMessage) {
    console.log('newUser', newMessage);
});

socket.on('newMessage', function(newMessage) {
    console.log('newMessage', newMessage);

    var li = jQuery('<li></li>');

    li.text(`${newMessage.from}: ${newMessage.text}`);

    jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit', function(e) {
    e.preventDefault();

    socket.emit('createMessage', {
        from: '*****',
        text: jQuery('[name=message]').val()
    }, function() {

    });
});
