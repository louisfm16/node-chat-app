// ES6 Arrow functions are not supported in most browsers
var socket = io();

function scrollToBottom() {
    // Selectors
    var messages = jQuery('#messages');
    var newMessage = messages.children('li:last-child');

    // Heights
    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();

    if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        messages.scrollTop(scrollHeight);
    }
}

socket.on('connect', function() {
    var params = jQuery.deparam(window.location.search);

    socket.emit('join', params, function(e) {
        if(e) {
            alert(e);
            window.location.href = '/';
        } else {
            console.log('No Err');
        }
    });
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
    scrollToBottom();
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
    scrollToBottom();
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
