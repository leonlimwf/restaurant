const urlParams = new URLSearchParams(window.location.search);
const myParam = urlParams.get('id');

function checkIfAccessible() {
    var who = (document.cookie.match(/^(?:.*;)?\s*username\s*=\s*([^;]+)(?:.*)?$/) || [, null])[1]
    if (who != myParam) {
        window.location.href = "error.html"
    } else {
        console.log("Successful")
    }
}

var picture;

function encode() {
    var selectedfile = document.getElementById("changeProfilePic").files;
    if (selectedfile.length > 0) {
        var imageFile = selectedfile[0];
        var fileReader = new FileReader();
        fileReader.onload = function(fileLoadedEvent) {
            picture = fileLoadedEvent.target.result;
            var newImage = document.getElementById('profilePic')
            newImage.src = picture;
            var srcData = fileLoadedEvent.target.result;
        }
    }
    fileReader.readAsDataURL(imageFile)
}

function displayReviewStar() {
    var count = document.getElementsByClassName('commentRating')
    const maxStar = 5
    for (let i = 0; i < count.length; i++) {
        var star = count[i].innerHTML
        var starUnchecked = maxStar - star
        count[i].innerHTML = `<span class="fa fa-star"></span>`.repeat(star) + `<span class="fa fa-star" style="opacity: 50%"></span>`.repeat(starUnchecked)
    }
}

function deleteComment(element) {
    var response = confirm("Are you sure you want to delete this comment?")
    if (response == true) {
        var item = element.getAttribute('item')
        console.log('delete-reviewid', item)
    }
    var deleteRequest = new XMLHttpRequest();
    deleteRequest.open("DELETE", `review/${item}`, true);
    deleteRequest.setRequestHeader("Content-Type", "application/json");
    deleteRequest.onload = function() {
        loadUser()
    }
    deleteRequest.send()
}

function editComment(element) {
    var response = confirm("Are you sure you want to edit this comment?")
    if (response == true) {
        var reviewId = element.getAttribute('reviewId')
        var reviewText = element.getAttribute('reviewText')
        var reviewRating = element.getAttribute('reviewRating')

        document.getElementById("addReviewBox").placeholder = reviewText
        document.getElementById("editReviewId").innerHTML = reviewId
        document.getElementById("editReviewRating").innerHTML = reviewRating
        displayEditCommentStar()
    }
}

function displayEditCommentStar() {
    var maxStar = 5
    var count = document.getElementById('editReviewRating').innerHTML
    uncheckStar = maxStar - count
    document.getElementsByClassName('rate').innerHTML = `<span class="fa fa-star"></span>`.repeat(count) + `<span class="fa fa-star" style="opacity: 50%"></span>`.repeat(uncheckStar)
}

function updateComment() {
    var checkedValue = null
    var response = confirm("Are you sure you want to update this comment?");
    if (response == true) {
        var reviewId = document.getElementById("editReviewId").innerHTML
        console.log('reviewId : ', reviewId)
        var initialReviewRating = document.getElementById("editReviewRating").innerHTML
        var initialReviewContent = document.getElementById("addReviewBox").placeholder
        var updateComment = new XMLHttpRequest(); // new HttpRequest instance to send request to server
        updateComment.open("PUT", `review/${reviewId}`, true); //The HTTP method called 'PUT' is used here as we are updating data
        var inputElements = document.getElementsByClassName('messageCheckbox');
        for (var i = 0; inputElements[i]; ++i) {
            if (inputElements[i].checked) {
                checkedValue = inputElements[i].value;
                break;
            }
        }
        console.log(`checkedValue : ${checkedValue}`)
        editedContent = document.getElementById('addReviewBox').value
        console.log(`editedContent : ${editedContent}`)
        console.log(`initialReviewContent : ${initialReviewContent}`)
        var review = {}
        updateComment.setRequestHeader("Content-Type", "application/json");
        updateComment.onload = function() {
            location.reload()
            loadUser()
        }

        if (checkedValue !== initialReviewRating) {
            review.review_rating = checkedValue
        }

        if (editedContent !== initialReviewContent) {
            review.review_content = editedContent
        }

        updateComment.send(JSON.stringify(review))
    }
}

function editProfile(element) {
    var hiddenPass = document.getElementById('passwordInput').placeholder
    document.getElementById('checkPassword').placeholder = hiddenPass
    var x = document.getElementById('passwordInput').getAttribute("pass");
    var getPass = element.getAttribute('pass')
    var getEmail = element.getAttribute('email')
    var getAddress = element.getAttribute('address')
    console.log(getPass, getEmail, getAddress)
    if (getPass !== null) {
        document.getElementById('oldCredential').placeholder = getPass
        document.getElementById('oldCredLabel').innerHTML = "Old Password"
        document.getElementById('newCredLabel').innerHTML = "New Password"
    }
    if (getEmail !== null) {
        document.getElementById('oldCredential').placeholder = getEmail
        document.getElementById('oldCredLabel').innerHTML = "Old Email"
        document.getElementById('newCredLabel').innerHTML = "New Email"

    }
    if (getAddress !== null) {
        document.getElementById('oldCredential').placeholder = getAddress
        document.getElementById('oldCredLabel').innerHTML = "Old Address"
        document.getElementById('newCredLabel').innerHTML = "New Address"
    }
}

function verifyInputs() {
    var userNewPass = document.getElementById('newCredential').value
    var passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{9,20}$/;
    var emailValid = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
    var checkType = document.getElementById('oldCredLabel').innerHTML

    if (checkType == "Old Password" && userNewPass.match(passw) && userNewPass.length > 0) {
        document.getElementById('saveChanges').disabled = false
    }
    if (checkType == "Old Email" && userNewPass.match(emailValid) && userNewPass.length > 0) {
        document.getElementById('saveChanges').disabled = false
    }
    if (checkType == "Old Address") {
        document.getElementById('saveChanges').disabled = false
    }

}

function verifyPassword() {
    var hiddenPass = document.getElementById('passwordInput').placeholder
    document.getElementById('checkPassword').placeholder = hiddenPass
    var passwordValue = document.getElementById('passwordInput').getAttribute("pass");
    var inputPasswordValue = document.getElementById('inputPassword').value
    if (passwordValue === inputPasswordValue) {
        document.getElementById('message').style.color = 'green';
        document.getElementById('message').innerHTML = 'Verified <i class="fas fa-user-check"></i>';
        document.getElementById('nextBtn').disabled = false
    } else {
        document.getElementById('message').style.color = 'red';
        document.getElementById('message').innerHTML = 'Incorrect <i class="fas fa-times-circle"></i>';
        document.getElementById('nextBtn').disabled = true
    }
}

function saveEditProfile() {
    var saveProfileCred = new XMLHttpRequest();
    var change = {}
    saveProfileCred.open("PUT", `profile`, true);
    saveProfileCred.setRequestHeader("Content-Type", "application/json");
    saveProfileCred.onload = function() {
        loadUser()
        location.reload()
    }

    var checkType = document.getElementById('oldCredLabel').innerHTML
    console.log(checkType)

    var userOldPass = document.getElementById('oldCredential').getAttribute("placeholder");

    var userOldEmail = document.getElementById('oldCredential').getAttribute("placeholder");

    var userOldAddress = document.getElementById('oldCredential').getAttribute("placeholder");

    var userOldImage = "http://localhost:8080/asset/wallpaper.png"

    var userNewCred = document.getElementById('newCredential').value
    console.log('uop', userOldPass)
    console.log('uop', userNewCred)

    console.log('uoe', userOldEmail)
    console.log('uoe', userNewCred)

    console.log('uoa', userOldAddress)
    console.log('uoa', userNewCred)

    var userId = (document.cookie.match(/^(?:.*;)?\s*id\s*=\s*([^;]+)(?:.*)?$/) || [, null])[1]

    if (checkType === "Old Password" && userOldPass !== userNewCred && userNewCred !== null) {
        change.password = userNewCred
        change.user_id = userId
    }

    if (checkType === "Old Email" && userOldEmail !== userNewCred && userNewCred !== null) {
        change.email = userNewCred
        change.user_id = userId
    }

    if (checkType === "Old Address" && userOldAddress !== userNewCred && userNewCred !== null) {
        change.address = userNewCred
        change.user_id = userId
    }

    if (userOldImage != userNewCred) {
        console.log('picture', picture)
        change.imageUrl = picture
        change.user_id = userId
    }
    saveProfileCred.send(JSON.stringify(change))
    console.log(change)
    alert("Successfully updated credentials")
}

function deleteUser() {
    var deleteUserReq = new XMLHttpRequest();
    deleteUserReq.open("DELETE", `delete`, true);
    deleteUserReq.setRequestHeader("Content-Type", "application/json");
    deleteUserReq.onload = function() {
        window.location.href = 'index.html'
    }
    var userId = (document.cookie.match(/^(?:.*;)?\s*id\s*=\s*([^;]+)(?:.*)?$/) || [, null])[1]
    var deleteUser = {
        user_id: userId
    }

    var response = confirm("Are you sure you want to delete this account? It will be gone forever.");
    if (response == true) {
        document.cookie = 'username' + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        document.cookie = 'id' + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        deleteUserReq.send(JSON.stringify(deleteUser))
        alert("Account deleted successfully. Redirecting you...")
    }
}

function loadUser() {
    checkIfAccessible()
    var commentRequest = new XMLHttpRequest();
    commentRequest.open("GET", `users/${myParam}/reviewhistory`, true);
    commentRequest.setRequestHeader("Content-Type", "application/json");
    commentRequest.onload = function() {
        commentResponse = JSON.parse(commentRequest.responseText);
        let str = ''
        for (var i = 0; i < commentResponse.length; i++) {
            str += `
                    <div class="reviewSection"> 
                        <img id="resImage" src="asset/restaurantGallery/${commentResponse[i].restaurant_displayPhoto}">
                        <a href="restaurant.html?id=${commentResponse[i].restaurant_id}"><span id="userName">${commentResponse[i].restaurant_name}</span></a>
                        <div class="editDelete" style="float:right">
                            <i class="fas fa-pencil-alt" reviewId="${commentResponse[i].review_id}" reviewText="${commentResponse[i].review_content}" reviewRating="${commentResponse[i].review_rating}" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter" onClick="editComment(this)"></i>
                            <i class="fas fa-trash-alt" style="margin-left: 10px" item="${commentResponse[i].review_id}" onClick="deleteComment(this)"></i>
                        </div>
                        <div id='commentSection'>   
                            <p id="commentDate">Written at: <span id="writtenAtDate">${commentResponse[i].review_date.substring(0,10)}</span></p>
                            <p class="commentRating">${commentResponse[i].review_rating}</p>
                            <p id="commentSectionText">${commentResponse[i].review_content}</p>
                        </div>
                    </div>
                    `
        }
        document.getElementsByClassName('reviewClass')[0].innerHTML = str
        displayReviewStar()
    }
    commentRequest.send()

    var request = new XMLHttpRequest();
    request.open("GET", `users/${myParam}`, true);
    request.setRequestHeader("Content-Type", "application/json");
    request.onload = function() {
        response = JSON.parse(request.responseText);

        document.getElementById('profilePic').src = response[0].user_imageUrl
            // console.log(response)
        let str = ""
            // console.log(response.length)
        for (var i = 0; i < response.length; i++) {
            str = `
                    <div class="profileLeftInfo">
                        <label for="lname" style="margin-top: 50px;">Username</label>
                        <br>
                        <input type="text" id="usernameInput" name="lname" placeholder=${response[i].user_userId} disabled>

                    </div>
                    <div class="profileLeftInfo">
                        <label for="lname">Password</label>
                        <br>
                        <input type="password" id="passwordInput" name="lname" pass=${response[i].user_password} disabled placeholder=${response[i].user_password}>
                        <a href="#" id="editButton" data-toggle="modal" pass=${response[i].user_password} data-target="#editProfileModal" onClick="editProfile(this)"><i class="fas fa-edit"></i></a>
                    </div>
                    <div class="profileLeftInfo">
                        <label for="lname">Email</label>
                        <br>
                        <input type="text" id="emailInput" name="lname" placeholder=${response[i].user_email} disabled>
                        <a href="#" id="editButton" data-toggle="modal" email=${response[i].user_email} data-target="#editProfileModal" onClick="editProfile(this)"><i class="fas fa-edit"></i></a>
                    </div>
                    <div class="profileLeftInfo">
                        <label for="lname">Address</label>
                        <br>
                        <input type="text" id="addressInput" name="lname" placeholder="${response[i].user_address}" disabled/>
                        <a href="#" id="editButton" data-toggle="modal" address="${response[i].user_address}" data-target="#editProfileModal" onClick="editProfile(this)"><i class="fas fa-edit"></i></a>
                    </div>
                    <div class="profileLeftInfo">
                        <label for="lname">Account Created On: ${response[i].user_joinDate.substring(0,10)}</label>
                    </div>
                    <br>
                    <a id="deleteAccount" style="margin-top: 100px;cursor: pointer" onClick="deleteUser()">Delete my account</a>
                    <p id="deleteAccountWarning">Action is non-reversible. All data will be deleted from our database.</p>
                    `
        }
        document.getElementsByClassName('profileRight')[0].innerHTML = str
        let passwordLen = document.getElementById('passwordInput').placeholder.length
        document.getElementById('passwordInput').placeholder = '*'.repeat(passwordLen)
    }
    request.send()
}
loadUser()