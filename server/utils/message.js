const moment = require('moment');

var generateMessage = (from, text) => {
    return {
        from,
        text,
        createdAt: moment().format('dddd, MMM Do YYYY, h:mm a')
    };
};

var generateLocationMessage = (from, lat, lon) => {
    return {
        from,
        url: `https://www.google.com/maps?q=${lat},${lon}`,
        createdAt: moment().format('dddd, MMM Do YYYY, h:mm a')
    };
};

module.exports = {generateMessage, generateLocationMessage};
