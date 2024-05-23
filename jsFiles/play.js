/* 
    getting the time from the local storage
    and outputing it in the corresponding div
*/
const playTime = parseInt(localStorage.getItem('playtime')) || 120;
const timeElement = document.getElementById('time');
let timeLeft = playTime;

// function to update the time
function updateGameTime() {
    // if there is still time left keep updating
    if (timeLeft > 0) {
        timeLeft = timeLeft - 1;
        document.getElementById('time').innerHTML = timeLeft;
    } else {
        // otherwise end the game
        endGame();
    }
}

// updating the time every second (basically decreasing it)
setInterval(updateGameTime, 1000);

/*
    almost the same variables,
    I added some variables in order not to use directly
    numbers for the size of the ufo
*/
var pid,
    score = 0,
    themissile,
    ufo_hstep = 5,
    firedMissile = false,
    ufoSize = 60,
    moveInterval = 25;

// the list of ufos
var ufos = [],
    hitUFOs = []; // and the list of hit ufos

/*
    series of helper functions to help me with 
    creating the ufo
*/

// function to creat the ufo element
function createUFO(ufo) {
    ufo = document.createElement("img");
    ufo.src = "../imgs/ufo.png";
    ufo.style.position = "absolute";
    
    return ufo;
}

// function to choose the direction for an element
function chooseDirection () {
    var dir = Math.random();
        if (dir > 0.5)
            dir = 1;
        else 
            dir = -1;
    return dir;
}

// function to set the position for each ufo
function setPosition(ufo) {
    // I substracted from the positions a little bit so that it
    // will not interfere with my navbar
    ufo.style.left = Math.random() * (window.innerWidth - 100) + "px";
    ufo.style.top = Math.random() * (window.innerHeight - 2 * ufoSize - 20) + "px";

    // also this in case it gets over the time and the score div
    if (parseInt(ufo.style.top) < 100) {
        ufo.style.top = parseInt(ufo.style.top) + ufoSize + "px"
    } 

    ufo.style.width = ufo.style.height = "60px";
    ufo.style.bottom = Math.random() * window.innerHeight + "px";

    return ufo;
}

/*
    function to move the ufos
*/
function UFOlaunch() {
    // first extracting the number of ufos from the local storage
    var numUFOs = parseInt(localStorage.getItem("numUFOs")) || 1;

    // creating the ufos
    for (var i = 0; i < numUFOs; i++) {
        // adding the ufos in the list
        ufos[i] = createUFO(ufos[i]);

        // setting the positions
        ufos[i] = setPosition(ufos[i]);

        // choosing the direction
        ufos[i].direction = chooseDirection();
        
        // adding it to the body
        document.body.appendChild(ufos[i]);
    }

    // for each ufo moving it
    setInterval(function () {
        for (var i = 0; i < ufos.length; i++) {
            MoveUFO(ufos[i]);
        }
    }, moveInterval);
}

/*
    the moving function remained basically the same
    but it takes a ufo as a parameter so I can 
    call it for each ufo from the list
*/
function MoveUFO(theufo) {
    var Rlimit = window.innerWidth,
        hpos_ufo = parseInt(theufo.style.left),
        width_ufo = parseInt(theufo.style.width);

    if (hpos_ufo + width_ufo + 8 > Rlimit || hpos_ufo < 0) {
        theufo.direction = theufo.direction * (-1);
    } 

    hpos_ufo = hpos_ufo + theufo.direction * 5;
    theufo.style.left = hpos_ufo + "px";
}

// same as in class
function pullTrigger() {
    if (!firedMissile) {
        pid = setInterval(launch, 10);
        firedMissile = true;
    }
}

/*
    almost the same as in class, but I changed the collision detect
    conditions to be a little more accurate
*/
function checkforaHit() {
    var hit = false,
        missileRect = themissile.getBoundingClientRect();

    // this time I check for each ufo in the list
    for (let i = 0; i < ufos.length; i++) {
        let ufoRect = ufos[i].getBoundingClientRect();

        // collision detect conditions modified a little
        if (missileRect.right >= ufoRect.left && missileRect.left <= ufoRect.right &&
            missileRect.bottom >= ufoRect.top && missileRect.top <= ufoRect.bottom) {
            hit = !hit;

            // adding the ufos in the list of hit ufos
            hitUFOs.push(ufos[i]);

            // removing it from the list
            ufos = ufos.filter((ufo) => ufo !== ufos[i]);
        }
    }

    return hit;
}

/*
    launch function almost the same in class
*/ 
function launch() {
    var uLimit = window.innerHeight,
        vpos_m = parseInt(themissile.style.bottom),
        vstep = 5;

    if (checkforaHit()) {
        // stop the missile
        clearInterval(pid);
        vpos_m = 0 + "px";
        firedMissile = false;

        // update punctuation in the panel
        score = score + 100;
        document.getElementById('points').innerHTML = score;

        // I check the list of hit ufos and change to image to the explosion
        for (let i = 0; i < hitUFOs.length; i++) {
            hitUFOs[i].src = "../imgs/explosion.gif";
        }

        // showing the image for the hit
        setTimeout(function () {
            for (let i = 0; i < hitUFOs.length; i++) {
                hitUFOs[i].src = "../imgs/ufo.png";

                // adding it back to the list of normal ufos
                ufos.push(hitUFOs[i]);
            }

            // after the animation is done the list is empty
            hitUFOs = []; 
        }, 1000); 

    // if vpos_m is higher than upperlimit from which i
    // substracted the navbar size
    } else if (vpos_m < uLimit - 150) {
        // do the missile to move vstep pixels up
        vpos_m = vpos_m + vstep;
        vpos_m = vpos_m + "px";

    } else {
        // stop the missile
        clearInterval(pid);
        vpos_m = 0 + "px";
        firedMissile = false;

        // updating the score in case I miss
        score = score - 25; 
        document.getElementById("points").innerHTML = score;
    }
    themissile.style.bottom = vpos_m;

    //var finalScore = score;
    localStorage.setItem("score", score);
}

// same as in class
function moveMissileRight(){
    var rLimit = window.innerWidth, 
        hpos_m, misWidth, hstep = 5;
    // Program here missile right movement
    hpos_m = parseInt(themissile.style.left);
    misWidth = parseInt(themissile.style.width);
  
    // Check if moving the missile right would keep it within the screen
    // hpos_m gets the left position, that's why the width needs to be added !
    // any browser still has a margin, that's why we add 8
    if (hpos_m + misWidth + 8 <= rLimit) {
        hpos_m = hpos_m + hstep;
        themissile.style.left = hpos_m + 'px';
    }
}

// same as in class
function moveMissileLeft(){  
    var hstep = 5, 
    //Program here missile left movement
    hpos_m = parseInt(themissile.style.left);
  
    // Check if moving the missile left would keep it within the screen
    if (hpos_m > 0) {
      hpos_m = hpos_m - hstep;
      themissile.style.left = hpos_m + 'px';
    }
}  

// same as in class but I made it to be moved also from 'a' and 'd'
function keyboardController (theEvent){
    let interval = 15;    
    let code = theEvent.key;
    console.log("The pressed key is : " + code);
    if (!firedMissile)
        switch (code) {
            case 'd':  moveMissileRight();      
                                break;
            case 'ArrowRight':  moveMissileRight();      
                                break;

            case 'a':  moveMissileLeft();      
                                break;
            case 'ArrowLeft':   moveMissileLeft();      
                                break;
            case ' '         :  pullTrigger(); // launch missile here
                                break;
            }
    }

// same as in class
window.onload = function () {
    themissile = document.getElementById("missile");
    document.onkeydown = keyboardController;
    document.addEventListener('click', keyboardController, false);
    UFOlaunch();
};

// the end game function
function endGame() {
    // after the game is over it goes to the records page
    window.location.href = "../htmlFiles/records.html";
}