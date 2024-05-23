/*
    the register page
    does not have all the functionalities yet
*/

// getting the element
const registrationForm = document.getElementById("registrationForm");

registrationForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Gather user registration data
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const repeatPassword = document.getElementById("repeatPassword").value;

    // checking if the password was introduced correct
    if (password !== repeatPassword) {
        alert("Passwords do not match. Please re-enter them.");
        return;
    }

    // alert
    alert("Registration data collected. Actual registration process not implemented.");
});