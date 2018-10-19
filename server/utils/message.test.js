var expect = require('expect');
var {generateMessage, generateLocationMessage} = require('./message.js');

describe('generateMessage', () => {
    it('should genrate correct object', () => {
        var from = 'Admin';
        var text = 'sample text';

        // store res in a variable
        var res = generateMessage(from, text);

        // assert from match
        expect(res.from).toEqual(from);
        // assert text match
        expect(res.text).toEqual(text);
        // assert createdAt is a number
        expect(res.createdAt).toBeA('number');
    });
});

describe('generateLocationMessage', () => {
    it('should generate correct location object', () => {
        var from = 'Admin';
        var lat = 1;
        var lon = 1;

        var res = generateLocationMessage(from, lat, lon);

        expect(res.createdAt).toBeA('number');
        expect(res.from).toEqual(from);
        expect(res.url).toEqual(`https://www.google.com/maps?q=1,1`);
    });
});
