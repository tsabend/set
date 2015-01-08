module.exports = function(app) {
    var route = {};
  
    route.zest = function (req, res) {
      res.render('zest')
    }

    app.get('/', route.zest);
};
