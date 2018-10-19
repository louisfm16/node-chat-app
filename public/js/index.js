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

socket.on('newLocationMessage', function(msg) {
    var li = jQuery('<li></li>');
    var a = jQuery('<a target="_blank">My current location</a>');

    li.text(`${msg.from}: `);
    a.attr('href', msg.url);

    li.append(a);
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

var locationBtn = jQuery('#send-location');
locationBtn.on('click', function() {
    if(!navigator.geolocation) {
        return alert('Geolocation not supported by this browser');
    }

    navigator.geolocation.getCurrentPosition(function(pos) {
        socket.emit('createLocationMessage', {
            lat: pos.coords.latitude,
            lon: pos.coords.longitude
        });
    }, function() { // failed to get locale
        alert('Unable to fetch location.')
    });
});
