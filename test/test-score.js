var request = require('supertest'),
    express = require('express');

process.env.NODE_ENV = 'test';

var app = require('../app.js');
var _id = '';


describe('POST New Score', function(){
  it('creates new score and responds with json success message', function(done){
    request(app)
    .post('/api/score')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .send({"score": {"username":"5 in) in North Vancouver.","highscore":-53.45886088907719,"gif":"Johnson introduced a fast-paced style of basketball called \"Showtime\", described as a mix of \"no-look passes off the fastbreak, pin-point alley-oops from halfcourt, spinning feeds and overhand bullets under the basket through triple teams.","created":"2001-12-06T19:50:16.996Z"}})
    .expect(201)
    .end(function(err, res) {
      if (err) {
        throw err;
      }
      _id = res.body._id;
      done();
    });
  });
});

describe('GET List of Scores', function(){
  it('responds with a list of score items in JSON', function(done){
    request(app)
    .get('/api/scores')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200, done);
  });
});

describe('GET Score by ID', function(){
  it('responds with a single score item in JSON', function(done){
    request(app)
    .get('/api/score/'+ _id )
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200, done);
  });
});


describe('PUT Score by ID', function(){
  it('updates score item in return JSON', function(done){
    request(app)
    .put('/api/score/'+ _id )
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .send({ "score": { "title": "Hell Is Where There Are No Robots" } })    
    .expect(200, done);
  });
});

describe('DELETE Score by ID', function(){
  it('should delete score and return 200 status code', function(done){
    request(app)
    .del('/api/score/'+ _id) 
    .expect(204, done);
  });
});