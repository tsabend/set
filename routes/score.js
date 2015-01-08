module.exports = function(app) {
  // Module dependencies.
  var mongoose = require('mongoose'),
      Score = mongoose.models.Score,
      api = {};

  // ALL
  api.scores = function (req, res) {
    Score.find().sort('-highscore').limit(10).exec(function(err, scores) {
      if (err) {
        res.json(500, err);
      } else {
        res.json({scores: scores});
      }
    });
  };

  // GET
  api.score = function (req, res) {
    var id = req.params.id;
    Score.findOne({ '_id': id }, function(err, score) {
      if (err) {
        res.json(404, err);
      } else {
        res.json({score: score});
      }
    });
  };

  // POST
  api.addScore = function (req, res) {

    var score;

    if(typeof req.body.score == 'undefined'){
         res.status(500);
         return res.json({message: 'score is undefined'});
    }

    score = new Score(req.body.score);

    score.save(function (err) {
      if (!err) {
        console.log("created score");
        return res.json(201, score.toObject());
      } else {
        return res.json(500, err);
      }
    });

  };

  // PUT
  api.editScore = function (req, res) {
    var id = req.params.id;

    Score.findById(id, function (err, score) {



      if(typeof req.body.score["username"] != 'undefined'){
        score["username"] = req.body.score["username"];
      }

      if(typeof req.body.score["highscore"] != 'undefined'){
        score["highscore"] = req.body.score["highscore"];
      }

      if(typeof req.body.score["gif"] != 'undefined'){
        score["gif"] = req.body.score["gif"];
      }

      if(typeof req.body.score["created"] != 'undefined'){
        score["created"] = req.body.score["created"];
      }


      return score.save(function (err) {
        if (!err) {
          console.log("updated score");
          return res.json(200, score.toObject());
        } else {
         return res.json(500, err);
        }
        return res.json(score);
      });
    });

  };

  // DELETE
  api.deleteScore = function (req, res) {
    var id = req.params.id;
    return Score.findById(id, function (err, score) {
      return score.remove(function (err) {
        if (!err) {
          console.log("removed score");
          return res.send(204);
        } else {
          console.log(err);
          return res.json(500, err);
        }
      });
    });

  };


  app.get('/scores', api.scores);
  app.get('/score/:id', api.score);
  app.post('/score', api.addScore);
  app.put('/score/:id', api.editScore);
  app.delete('/score/:id', api.deleteScore);
};
