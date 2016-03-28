// object
var timer = new stopwatch();
var gameOn = false;
var turn = 1;
var player1time,player2time;
var player1wins = 0;
var player2wins = 0;


//stopwatch
// I made this stopwatch with the help https://www.youtube.com/watch?v=jRhB1IG7uAw

function stopwatch() {

var time = 0;
var interval;
var offset;
var formattedTime;

function update(){
  time += delta();
  formattedTime = timeFormatter(time);
  console.log(formattedTime);
  if (turn === 1){
    $("#player1").text("Player One: " + formattedTime );
    player1time = formattedTime;
  } else {
    $("#player2").text("Player Two: " + formattedTime );
    player2time = formattedTime;
  }
}

// takes start time - time now = time passed
function delta(){
  var now = Date.now();
  var timePassed = now - offset;
  offset = now;
  return timePassed;
}
// this function changes time from just milliseconds to minutes:seconds.milliseconds
function timeFormatter(timeInMilliseconds){
  var time = new Date(timeInMilliseconds);
  var minutes = time.getMinutes();
  var seconds = time.getSeconds();
  var milliseconds = time.getMilliseconds();
  return minutes + ":" + seconds + "." + milliseconds;

}

this.isOn = false;


this.start = function() {
  if (!this.isOn) {
    interval = setInterval(update, 10);
    offset = Date.now();
    this.isOn = true;
  }

};

  this.stop = function () {
    if (this.isOn){
      clearInterval(interval);
      interval = null;
      this.isOn = false;
    }
  };

  this.reset = function () {
    time = 0;
  };

  // on.mouseover
  $("#finish").mouseover( function (name) {
    console.log("Finished", time);
      if (timer.isOn) {
        timer.stop();
        gameOn = false;
        turn +=1;

        if (turn === 3){
          turn = 1;
          getWinner();

        }
      }

  });

  $("#start").mouseover(function(){
    if ( turn === 1 ) {
      $("#player1").text("Player One: 0:0.000");
      $("#player2").text("Player Two: 0:0.000");
    }
    gameOn = true;
    $(".container").fadeTo( "fast" , 1, function() {
    $("#player1").val(timer.formattedTime);
    });
    console.log("started");
    if (!timer.isOn) {
      timer.reset();
      timer.start();
    }
  });
  $(".off").mouseover(function(){
    if (gameOn) {
      $(".container").effect( "shake",{times:2}, 270  ).fadeTo( "fast" , 0.25, function(off){}).fadeTo( "fast" , 1, function(){});

      console.log("failed", time);
      timer.stop();
      gameOn = false;
    }

  });
  $(".trap,.player").mouseover(function(){
    if (turn === 1 && gameOn) {
      $("#player1").text("cheat0r");
    } else if (turn === 2 && gameOn){
      $("#player2").text("cheat0r");
    }
    timer.stop();
    gameOn = false;
    console.log("you cheator!");
  });
  function getWinner(){
    if ((player1time) < (player2time)){
      console.log("Winner player 1");
      player1wins +=1;
      $("#player1").text("Player One: " + player1time + "  Winner!");
      $("#player1score").text("Score: " + player1wins);
    } else {
      console.log("Winner player 2");
      player2wins +=1;
      $("#player2").text("Player Two: " + player2time + "  Winner!");
      $("#player2score").text("Score: " + player2wins);
    }
  }

  // function to restart the game ctrl + should work on all browsers(?)
    $(document).keydown(function (event){
      if(event.ctrlKey && event.which == 32){
        $("#player1").text("Player One: 0:0.000");
        $("#player2").text("Player Two: 0:0.000");
        turn = 1;
        player1wins = 0;
        player2wins = 0;
        timer.stop();
        timer.reset();
        console.log("restarted");
      }
      });
  }

// arrow keys will now move the game box. Because why not?
  $(document).keydown(function (event){
    if (event.which == 39) {
        $(".on,.off").animate({"left":"+=5px"}, 50);
        console.log("move Right");
    } else if (event.which == 37) {
        $(".on,.off").animate({"left":"-=5px"}, 50);
        console.log("Move Left");
    } else if (event.which == 38) {
        $(".on,.off").animate({"top":"-=5px"}, 50);
        console.log("Move Left");
    } else if (event.which == 40) {
        $(".on,.off").animate({"top":"+=5px"}, 50);
        console.log("Move Left");
    }

  });
