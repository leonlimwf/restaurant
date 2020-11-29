var userName = "Leo";
var password = 123;



function load() {
    var userInputName = document.getElementById('username-field').value;
    var userPassword = document.getElementById('password-field').value;

    if (userInputName != userName) {
        alert("Incorrect credentials")
    } else if (userPassword != password) {
        alert("Incorrect credentials")
    } else {
        alert("Correct credentials, please proceed")

    }
}