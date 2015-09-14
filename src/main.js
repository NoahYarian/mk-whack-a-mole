console.log('Toasty!');

var stats = document.querySelector('.stats');
var timer = document.querySelector('.timer');
var start = document.querySelector('.start');
var finish = document.querySelector('.finish');
var table = document.querySelector('table');
var score = document.querySelector('.score');
var scoreBoard = document.querySelector('.score-board');

var cellsArray = [].slice.call(document.querySelectorAll('td'));

function imagePick() {
  var num = Math.floor(Math.random() * 12) + 1;
  mortalImgClass = 'sprite sprite-mortal-' + num;
  return mortalImgClass;
}

var points;
var clock;

var punch = document.querySelector('.punch');

document.querySelector('#start-button').onclick = function() {
  game();
}
document.querySelector('#play-again').onclick = function() {
  game();
}

document.querySelector('.toastyDiv').onclick = function() {
  document.querySelector('.toasty').load();
  document.querySelector('.toasty').play();
}

function change() {
  cellsArray.forEach(function(cell) {
    cell.className = Math.round(Math.random() - 0.4) ? imagePick() : "sprite sprite-mortal-13";
    /*  cell.style.backgroundImage = Math.round(Math.random() - 0.4) ? hell : grass;*/
    cell.onclick = function() {
      punch.load();
      punch.play();

      var cursorID;
      table.setAttribute('style', "cursor: url('assets/splat.png') 30 10, auto; display: table");
      cursorID = window.setTimeout(unSplat, 100);
      function unSplat() {
        table.setAttribute('style', "cursor: url('assets/gavel.png'), auto; display: table");
      };

      if (cell.className === "sprite sprite-mortal-10") {
        cell.className = "sprite sprite-mortal-13";
        points += 500;
      } else if (cell.className !== "sprite sprite-mortal-13") {
        cell.className = "sprite sprite-mortal-13";
        points += 100;
      } else {
        points -= 250;
      };
      scoreBoard.innerText = points;
    };
  });
};

function game() {
/*  var player = document.querySelector('input[type="text"]').value;*/
  document.querySelector('.begin').play();
  points = 0;
  scoreBoard.innerText = points;
  clock = 20;
  score.style.display = "flex";
  table.style.display = "table";
  start.style.display = "none";
  finish.style.display = "none";
  timer.style.display = "block";
  gameTimer();
  changeFast();
};

function changeFast() {
  changeFastID = setInterval(change, 1200);
};


function gameTimer() {
  gameTimerID = setInterval(clockTick, 1000);
};

function clockTick() {
  if (clock > 0) {
    clock--;
    timer.innerHTML = clock;
  } else {
    clearInterval(gameTimerID);
    clearInterval(changeFastID);
    endGame(points);
  }
};

function endGame(points) {
  score.style.display = "none";
  table.style.display = "none";
  timer.style.display = "none";
  finish.style.display = "block";
  document.querySelector('.fatality').play();
  document.querySelector('.final-score').innerHTML = points;
}
