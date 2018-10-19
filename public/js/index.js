// ES6 Arrow functions are not supported in most browsers
var socket = io();

socket.on('connect', function() {
    console.log('Connected to server!');
});

socket.on('disconnect', function() {
    console.log('Disconnected from server!');
});

socket.on('newMessage', function(msg) {
    console.log('newUser', msg);
});

socket.on('newMessage', function(msg) {
    console.log('newMessage', msg);

    var li = jQuery('<li></li>');
    var i = jQuery(`<i>${msg.createdAt}</i>`);

    li.text(`${msg.from}: ${msg.text}`);
    li.append(i);

    jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function(msg) {
    var li = jQuery('<li></li>');
    var a = jQuery('<a target="_blank">My current location</a>');
    var i = jQuery(`<i>${msg.createdAt}</i>`);

    li.text(`${msg.from}: `);
    a.attr('href', msg.url);

    li.append(a);
    li.append(i);
    jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit', function(e) {
    e.preventDefault();

    var messageTextBox = jQuery('[name=message]');

    socket.emit('createMessage', {
        from: '*****',
        text: messageTextBox.val()
    }, function() {
        messageTextBox.val('');
    });
});

var locationBtn = jQuery('#send-location');
locationBtn.on('click', function() {
    if(!navigator.geolocation) {
        return alert('Geolocation not supported by this browser');
    }

    locationBtn.attr('disabled', 'disabled').text('Sending location...');

    navigator.geolocation.getCurrentPosition(function(pos) {
        socket.emit('createLocationMessage', {
            lat: pos.coords.latitude,
            lon: pos.coords.longitude
        }, function() {
            locationBtn.removeAttr('disabled').text('Send location');
        });
    }, function() { // failed to get locale
        alert('Unable to fetch location.');
        locationBtn.removeAttr('disabled').text('Send location');
    });
});
