document.getElementById("signup-btn").addEventListener("click", function(event) {
    event.preventDefault()
});

function register() {
    var registrationCredentials = { //object type
        userIdInput: document.getElementById("userIdInput").value,
        passwordInput: document.getElementById("passwordInput").value,
        firstNameInput: document.getElementById("firstNameInput").value,
        lastNameInput: document.getElementById("lastNameInput").value,
        addressInput: document.getElementById("addressInput").value,
        genderInput: document.getElementById("genderInput").value,
        emailInput: document.getElementById("emailInput").value,
        phoneNumInput: document.getElementById("phoneNumInput").value
    };

    let canContinue = true
    for (const [key, value] of Object.entries(registrationCredentials)) {
        console.log(value)
        if (value.length < 1) {
            canContinue = false;
        }
    }

    if (!canContinue) {
        return alert("Some fields are empty");
    }

    var request = new XMLHttpRequest();
    request.open("POST", "/register ", true);
    request.setRequestHeader("Content-Type", "application/json");
    request.onload = function() {
        response = JSON.parse(request.responseText);
        document.getElementById("errormsg").innerHTML = response.message;
        setTimeout(function() {
            regSuccess = response.success
            if (regSuccess == true) {
                var now = new Date();
                var time = now.getTime();
                time += 3600 * 1000;
                now.setTime(time);
                window.location.href = "login.html";
                // var curCookieUser = "name=" + credentials.userId
                // var curCookiePassword = " password=" + credentials.userPassword
                // document.cookie =
                //     'username=' + registrationCredentials.userIdInput +
                //     '; expires=' + now.toUTCString() +
                //     '; path=/';
                // document.cookie =
                //     'password=' + registrationCredentials.passwordInput +
                //     '; expires=' + now.toUTCString() +
                //     '; path=/';
                // document.cookie = curCookieUser
                // document.cookie = curCookiePassword;
                // alert(document.cookie)
            } else {
                alert("Error Occured")
            }
        }, 3000);
    };
    request.send(JSON.stringify(registrationCredentials));
}