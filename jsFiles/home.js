function redirectToPreferences() {
    window.location.href = "../htmlFiles/preferences.html";
}

var pid, score = 0,
    themissile, theufo, ufo_hstep = 5, 
    firedMissile = false;

function UFOlaunch(){
  //Supress comment signs in next line
  setInterval(MoveUFO, 25);
}
  
function MoveUFO(){
  var Rlimit = window.innerWidth;
  //Program here UFO movement
  var hpos_ufo = parseInt(theufo.style.left),
      width_ufo = parseInt(theufo.style.width);
  if (hpos_ufo + width_ufo + 8 > Rlimit || (hpos_ufo< 0)) {
      ufo_hstep = ufo_hstep * (-1);
    
  } 
  hpos_ufo += ufo_hstep;
  theufo.style.left = hpos_ufo + 'px';
 } 
 window.onload = function(){
    themissile = document.getElementById('missile');
    theufo = document.getElementById('ufo');
    UFOlaunch();
  }