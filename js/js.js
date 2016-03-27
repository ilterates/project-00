// object
var timer = new stopwatch();
var gameOn = false;
var player = 1;
var player1time;
var player2time;

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
  if (player === 1){
    $("#player1").text("Player One: " + formattedTime);
    player1time = formattedTime;
  } else {
    $("#player2").text("Player Two: " + formattedTime);
    player2time = formattedTime;
  }
}
function delta(){
  var now = Date.now();
  var timePassed = now - offset;
  offset = now;
  return timePassed;
}
function timeFormatter(timeInMilliseconds){
  var time = new Date(timeInMilliseconds);
  var minutes = time.getMinutes();
  var seconds = time.getSeconds();
  var milliseconds = time.getMilliseconds();
  return minutes + ":" + seconds + "." + milliseconds;

}

this.isOn = false;


this.start = function() {
// aka if (this.isOn === false)
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
        player +=1;

        if (player === 3){
          player = 1;
          getWinner();

        }
      }

  });

  $("#start").mouseover(function(){
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
    if (player === 1 && gameOn) {
      $("#player1").text("cheat0r");
    } else if (player === 2 && gameOn){
      $("#player2").text("cheat0r");
    }
    timer.stop();
    gameOn = false;
    console.log("you cheator!");
  });
  function getWinner(){
    if ((player1time) < (player2time)){
      console.log("Winner player 1");
      $("#player1").text("Player One: " + player1time + "  Winner!");
    } else {
      console.log("Winner player 2");
      $("#player2").text("Player Two: " + player2time + "  Winner!");
    }
  }
}
