// accessing the form
const form = document.getElementById("preferencesForm");
const numUFOsInput = document.getElementById("numUFOs");
const playtimeSelect = document.getElementById("playtime");

// setting the values
numUFOsInput.value = localStorage.getItem("numUFOs");
playtimeSelect.value = localStorage.getItem("playtime");


// adding an event listener to the form to save preferences
form.addEventListener("submit", function (e) {
    e.preventDefault();

    // saving preferences to local storage
    localStorage.setItem("numUFOs", numUFOsInput.value);
    localStorage.setItem("playtime", playtimeSelect.value);

    /*
        an alert, but I have to mention
        sometimes it creates bugs and 
        the "ok" button needs to be pressed more times
    */

    alert("Preferences saved!");

    // going to the play page
    window.location.href = "./play2.html";
});