// outputing the data
function printData(data) {
    const tableHeader = "<table border='1'><tr><th>User</th><th>score</th></tr>";
    const tableRows = data.map(item => `<tr><td>${item.username}</td><td>${item.punctuation}</td></tr>`).join('');
    const tableFooter = "</table>";

    document.getElementById("res").innerHTML = tableHeader + tableRows + tableFooter;
}

// function to calculate the final score obtained
function getPoints() {
    // extracting the data from the local storage
    const numUFOs = localStorage.getItem("numUFOs");
    const playtime = localStorage.getItem("playtime");
    score = localStorage.getItem("score");

    
    /*
        actual maths for calculating the score 
    */

    // I check only if the time is greater than 60
    // in order not to divide by 1
    if (playtime !== "60") {
        const div = playtime === "120" ? 2 : 3;
        score = score / div;
    }

    // if the number of ufos is greater than one
    if (numUFOs != 1) {
        score = score - numUFOs * 50;
    }

    // the summery of the game
    const summary = `<strong> Your last stats -> UFOs: ${numUFOs} , 
                    time played: ${playtime} seconds,
                    score: ${score} </strong>`;
    document.getElementById("summary").innerHTML = summary;
}

// doing the maths
getPoints();

// the response from http
function responseProcess(http_request) {
    if (http_request.status === 200) {
        printData(http_request.response);
    } else {
        alert("Something went wrong with the URL ");
    }
}

// user request
function userRequest() {
    const options = {
        method: "GET",
    };
    const url = "http://wd.etsisi.upm.es:10000/records";

    fetch(url, options)
        .then(responseobject => responseobject.json())
        .then(data => {

        let newHighscore = false;

        for (let i = 0; i < data.length; i++) {
            // in case there is a new highscore
            if (score > parseFloat(data[i].punctuation)) {
                newHighscore = !newHighscore;
                
                // a new username
                let uname = localStorage.getItem("user") || prompt("Enter your username");

                if (uname) {
                    const newscore = {
                        username: uname,
                        ufos: numUFOs,
                        disposedTime: playtime,
                        punctuation: score,
                    };

                    data.splice(i, 0, newscore);

                    if (data.length > 10) {
                        data.pop();
                    }
                }
                break;
            }
        }

        printData(data);
        });
}

window.onload = function () {
    userRequest();
};
