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
    var formattedtime = moment(msg.createdAt).format('dddd, MMM Do YYYY, h:mm a');

    var template = jQuery('#message-template').html();
    var html = Mustache.render(template, {
        from: msg.from,
        text: msg.text,
        createdAt: formattedtime
    });

    jQuery('#messages').append(html);
});

socket.on('newLocationMessage', function(msg) {
    var formattedtime = moment(msg.createdAt).format('dddd, MMM Do YYYY, h:mm a');

    var template = jQuery('#locationMessage-template').html();
    var html = Mustache.render(template, {
        from: msg.from,
        url: msg.url,
        createdAt: formattedtime
    });

    jQuery('#messages').append(html);
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
