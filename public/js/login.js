function load() {
    var x = "Leo";
    var y = 123
    var username_Input = document.getElementById('username-field').value;
    var password_Input = document.getElementById('password-field').value;
    var alertbox = document.getElementById('alert-box');
    if (x == username_Input && y == password_Input) {
        alertbox.style.visibility = "hidden"
        alert("Welcome home");
    } else {

        alertbox.style.visibility = "visible";
    }


}