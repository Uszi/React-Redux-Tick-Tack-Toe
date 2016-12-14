var express = require('express');
var bodyParser = require("body-parser");
var app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

function checkWinner(board, s){
  var n = board.length;
  for(var i=0; i<n; ++i){
    var winner = true;
    for(var j=0; j<n; j++){
      if(board[i][j] != s){
        winner = false;
        break;
      }
    }
    if(winner) return winner;
  }
  for(var i=0; i<n; ++i){
    var winner = true;
    for(var j=0; j<n; j++){
      if(board[j][i] != s){
        winner = false;
        break;
      }
    }
    if(winner) return winner;
  }
  for(var i=0; i<n; ++i){
    if(board[i][i] != s)
      break;
    if(i == n-1) return true;
  }
  for(var i = 0;i<n;++i){
    if(board[i][(n-1)-i] != s)
      break;
    if(i == n-1) return true;
  }
}
function findBetterMove(grid, p){
  var blockMove = null;
  for(var i=0; i<grid.length; ++i){
    var row = grid[i];
    for(var j=0; j<grid.length; ++j){
      var field = row[j];
      if(field == 0){
        grid[i][j] = p;
        if(checkWinner(grid, p)){
          blockMove = {x: i, y: j};
          return blockMove;
        }else{
          grid[i][j] = 0;
        }
      }
    }
  }
  return null;
}
function findMoves(grid){
  var out = [];
  for(var i=0; i<grid.length; ++i){
    var row = grid[i];
    for(var j=0; j<grid.length; ++j){
      var field = row[j];
      if(field == 0){
        out.push({x: i, y: j});
      }
    }
  }
  return out;
}

app.get('/', function(req, res){
  res.send("AI ready!");
});
app.post('/', function(req, res){
  var grid = req.body.grid;

  var winner = 0;
  if(checkWinner(grid, 1)){
    winner = 1;
  }
  if(checkWinner(grid, 2)){
    winner = 2;
  }
  if(winner == 0){
    var move = findBetterMove(grid, 2); // find win
    if(move == null){
      move = findBetterMove(grid, 1); // if not win at least block
      if(move == null){
        var moves = findMoves(grid); // whatever
        if(moves.length > 0){
          move = moves[Math.floor(Math.random() * moves.length)];
        }
        if(moves.length <= 2) winner = -1;
      }
    }
    if(move != null){
      grid[move.x][move.y] = 2;
    }else{
      winner = -1; //it's a tie
    }
    if(checkWinner(grid, 1)){
      winner = 1;
    }
    if(checkWinner(grid, 2)){
      winner = 2;
    }
  }

  res.send({grid: grid, winner: winner});
});
app.listen(3000, function(){
    console.log("AI ready!");
});
