var path = require('path');
var fs = require('fs');
var Dissolve = require('dissolve');

var should = require('should');
require('mocha');

var parseHeader = require('../lib/parseHeader');
var parseTracks = require('../lib/parseTracks');
var constants = require('../lib/constants');

var chopinPath = path.join(__dirname, './fixtures/chopin.mid');
var chopin = fs.createReadStream(chopinPath);

describe('parseTracks()', function() {
  it('should parse a MIDI track set correctly', function(done) {
    var parser = Dissolve();
    parser.once('error', done);

    parseHeader(parser);
    parseTracks(parser);

    parser.tap(function(){
      should.exist(this.vars.tracks, 'should have created tracks');
      should.exist(this.vars.tracks[0], 'should have created track 0');
      should.exist(this.vars.tracks[1], 'should have created track 1');
      should.exist(this.vars.tracks[2], 'should have created track 2');
      should.exist(this.vars.tracks[3], 'should have created track 3');
      should.exist(this.vars.tracks[4], 'should have created track 4');

      console.log(this.vars.tracks[0]);
      done();
    });

    chopin.pipe(parser);
  });
});