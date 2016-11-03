var numArray = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
var vIdx = 0;
var empty;
var roundNum = 0;
var simpleGameFlag = false;
var h = 0, m = 0, s = 0;

// start function
var startProgram = function(){
  startTime();
  initialVal();
}

var myGet = function(id) {
	return document.getElementById(id);
};

var emptyIdx = function(){
  return Math.floor(Math.random()*15+1);
};

var vGenerage = function(){
  var idx = Math.floor(Math.random()*numArray.length);
  var v = numArray[idx];
  numArray.splice(idx, 1);
  return v;
};

var initialVal = function() {
	var table = myGet("table");
  var output = "";
  if(!simpleGameFlag){
    empty = emptyIdx();
    for(var i = 0; i<4; i++){
      output += "<tr>";
      for(var j=0; j<4; j++){
        vIdx++;
        if(vIdx==empty){
          output += "<th id='"
          output+=vIdx;
          output+="'>";
          output += "";
          output += "</th>"
          continue
        }
        // var v = Math.floor(1+Math.random()*15);
        var v = vGenerage();
        output += "<th id='"
        output+=vIdx;
        output+="'>";
        output += v;
        output += "</th>"
      }
      output += "</tr>";
    }
  }
  else{
    empty = simpleEmpty();
    for(var i = 0; i<4; i++){
      output += "<tr>";
      for(var j=0; j<4; j++){
        vIdx++;
        if(vIdx==empty){
          output += "<th id='"
          output+=vIdx;
          output+="'>";
          output += "";
          output += "</th>"
          continue
        }
        if(i==3&&j==3){
          output += "<th id='"
          output+=vIdx;
          output+="'>";
          output += empty;
          output += "</th>"
        }
        else{
          output += "<th id='"
          output+=vIdx;
          output+="'>";
          output += vIdx;
          output += "</th>"
        }
      }
      output += "</tr>";
    }
  }

	table.innerHTML = output;
  // add click listener to table cells
  for(var i = 1; i<=vIdx; i++){
    (function(i) {
    myGet(i).addEventListener("click", function() {onClickFunction(i);});
    }(i));
  }

  myGet('reset').addEventListener("click", function() {location.reload();});
  myGet('simpleGame').addEventListener("click", simpleGame);
};

function onClickFunction(i){
  if((i+1==empty||i-1==empty||i+4==empty||i-4==empty)&&!winGame()){
    roundNum++;
    myGet('output').innerHTML = 'Steps: '+roundNum;
    myGet(empty).innerHTML = myGet(i).innerHTML;
    myGet(i).innerHTML = "";
    empty = i;
    if(winGame()){
      if (confirm("YOU WIN! Play again?") == true) {
        location.reload();
    } else {
        myGet('output').innerHTML = 'YOU WIN';
    }
    }
  }
  else{
    alert('cannot move');
  }
}

var winGame = function(){
  if(empty==16 && myGet(1).innerHTML==1 && myGet(2).innerHTML==2 && myGet(3).innerHTML==3 &&
  myGet(4).innerHTML==4 && myGet(5).innerHTML==5 && myGet(6).innerHTML==6 && myGet(7).innerHTML==7 &&
  myGet(8).innerHTML==8 && myGet(9).innerHTML==9 && myGet(10).innerHTML==10 && myGet(11).innerHTML==11 &&
  myGet(12).innerHTML==12 && myGet(13).innerHTML==13 && myGet(14).innerHTML==14 && myGet(15).innerHTML==15){
    return true;
  }
  else{
    return false;
  }
};

var simpleEmpty = function(){
  var emptyIdxArray = [12,15];
  var randomIdx = Math.floor(Math.random()*emptyIdxArray.length);
  empty = emptyIdxArray[randomIdx];
  return empty;
}

var simpleGame = function(){
  vIdx = 0;
  roundNum = 0;
  numArray = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
  simpleGameFlag = true;
  initialVal();
};

// timmer
function startTime() {
    // var today = new Date();
    // var h = today.getHours();
    // var m = today.getMinutes();
    // var s = today.getSeconds();
    // m = checkTime(m);
    // s = checkTime(s);
    s++;
    checkTime_m(s);
    checkTime_h(m);
    myGet('timer').innerHTML = 'Time: ' + h + ":" + m + ":" + s;
    if(!winGame()){
      var t = setTimeout(startTime, 1000);
    }
}
function checkTime_m(i) {
    if (i >= 60) {
      s = 0;
      m++;
    }
  }
function checkTime_h(i) {
    if (i >= 60) {
      m = 0;
      h++;
    }
  }

// window.addEventListener("load", startProgram);
$(document).ready(startProgram);
