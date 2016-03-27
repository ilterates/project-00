// object
var timer = new stopwatch();
var gameOn = true;
// stopwatch

function stopwatch() {

var time = 0;
var interval;
var offset;

function update(){
  time += delta();
//  var formattedTime = timeFormatter(time);
  console.log(time);
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
    }
  });

  $("#start").mouseover(function(){
    gameOn = true;
    $(".container").fadeTo( "fast" , 1, function() {

    });
    console.log("started");
    if (!timer.isOn) {
      timer.reset();
      timer.start();
    }
  });
  $(".off").mouseover(function(){
    if (gameOn) {
      $(".container").fadeTo( "fast" , 0.25, function(off) {

      });
    }
    if (gameOn) {
      $(".container").effect( "shake",{times:2}, 270  );
      console.log("failed", time);
      timer.stop();
      gameOn = false;
    }

  });
}
