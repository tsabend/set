var setHighScores = {};
setHighScores.webdb = {};
setHighScores.webdb.db = null;

setHighScores.webdb.open = function() {
  var dbSize = 5 * 1024 * 1024; // 5MB
  setHighScores.webdb.db = openDatabase("Highscores", "1", "Highscores manager", dbSize);
}

setHighScores.webdb.onError = function(tx, e) {
  alert("There has been an error: " + e.message);
}

setHighScores.webdb.onSuccess = function(tx, r) {

  setHighScores.webdb.getTopTen(loadTopTen);
}

setHighScores.webdb.createTable = function() {  
  var db = setHighScores.webdb.db;
  db.transaction(function(tx) {
    tx.executeSql("CREATE TABLE IF NOT EXISTS highscores(ID INTEGER PRIMARY KEY ASC, user_name TEXT, gif_url TEXT, score INTEGER, added_on DATETIME)", []);
  });
}


setHighScores.webdb.addTopTen = function(user_name, gif_url, score) {
  var db = setHighScores.webdb.db;
  db.transaction(function(tx){
    var addedOn = new Date();
    tx.executeSql("INSERT INTO highscores(user_name, gif_url, score, added_on) VALUES (?,?,?,?)",
        [user_name, gif_url, score, addedOn],
        setHighScores.webdb.onSuccess,
        setHighScores.webdb.onError);
   });
}

setHighScores.webdb.getTopTen = function(renderFunc) {
  var db = setHighScores.webdb.db;
  db.transaction(function(tx) {
    tx.executeSql("SELECT * FROM highscores ORDER BY score DESC LIMIT 10", [], renderFunc,
    // tx.executeSql("SELECT TOP 10 * FROM highscores ORDER BY score DESC", [], renderFunc,
        setHighScores.webdb.onError);
  });
}

setHighScores.webdb.deleteTopTen = function(id) {
  var db = setHighScores.webdb.db;
  db.transaction(function(tx){
    tx.executeSql("DELETE FROM highscores WHERE ID=?", [id],
        setHighScores.webdb.onSuccess,
        setHighScores.webdb.onError);
    });
}

function loadTopTen(tx, rs) {
  var rowOutput = "";
  var topTenItems = document.getElementById("topTenUsers");
  for (var i=0; i < rs.rows.length; i++) {
    rowOutput += renderTopTen(rs.rows.item(i));
  }
  topTenUsers.innerHTML = rowOutput;
}

function renderTopTen(row) {
  return "<li>Name: " + row.user_name + " Score: " + row.score + " GIF: <img src=" + row.gif_url +  ">" + " [<a href='javascript:void(0);'  onclick='setHighScores.webdb.deleteTopTen(" + row.ID +");'>Delete</a>]</li>";
}

function init() {
  setHighScores.webdb.open();
  setHighScores.webdb.createTable();
  setHighScores.webdb.getTopTen(loadTopTen);
}


function addTopTen() {
  var user_name = document.getElementById("user_name");
  var gif_url = document.getElementById("gif_url")
  var score = document.getElementById("score")

  setHighScores.webdb.addTopTen(user_name.value, gif_url.value, score.value);
  user_name.value = "";
  gif_url.value = ""
  score.value = ""
}

