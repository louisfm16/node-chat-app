var expect = require('expect');
var {generateMessage} = require('./message.js');

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
