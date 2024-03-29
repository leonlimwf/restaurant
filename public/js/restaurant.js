function loadRestaurantInfo() {
    const urlParams = new URLSearchParams(window.location.search);
    const myParam = urlParams.get('id');
    var request = new XMLHttpRequest();
    request.open("GET", `restaurants/id/${myParam}`, true);
    request.setRequestHeader("Content-Type", "application/json");
    request.onload = function() {
        response = JSON.parse(request.responseText);
        // console.log(response[0].reviewArray)
        reviewArrayLength = response[0].reviewArray.length
        let reviewStr = ""
        for (var i = 0; i < reviewArrayLength; i++) {
            reviewStr += `
            <div class="reviewSection">
                <img id="userImage" src="${response[0].reviewArray[i].userImage}" onError="this.onerror=null;this.src='asset/blank.jpg';">
                <span id="userName">${response[0].reviewArray[i].reviewUserId}</span>

                <div id='commentSection'>
                    <p id="commentDate">Written at: <span id="writtenAtDate">${response[0].reviewArray[i].reviewDate.substring(0,10)}</span></p>
                    <p class="commentRating">${response[0].reviewArray[i].reviewRating}</p>
                    <p id="commentSectionText">${response[0].reviewArray[i].reviewContent}</p>
                </div>
            </div>`
        }

        let str = ""
        for (var i = 0; i < response.length; i++) {
            str += `
    <div class="restaurantNameRating" style="display: flex;justify-content: space-between;">
        <h3 id="restaurantName">${response[i].restaurantName}</h3>
        <div id="restaurantStar" style="margin-top: 14px">
                <div class="stars-outer" style="display: flex;">
                    <div class="stars-inner">${response[i].restaurantRating}<span>23</span></div>
                    <span style="margin-top: -3px">( ${reviewArrayLength} )</span>
                </div>
        </div>
        
    </div>
    <h5 id="restaurantCategory">${response[i].restaurantCategory}</h5>
    <h5 id="restaurantAddress"><i class="fas fa-map-marker-alt" style="padding-right: 5px"></i><a href="#gmap_canvas">${response[i].restaurantAddress}</a></h5>

    <img src="asset/restaurantGallery/${response[i].restaurantGallery}" id="restaurantImage">

    <div class="tab">
        <button class="tablinks" onclick="openTab(event, 'restaurant-about')" id="defaultOpen">Overview</button>
        <button class="tablinks" onclick="openTab(event, 'restaurant-review')" >Review</button>
    </div>
    <div id="restaurant-about" class="tabcontent">
        <h5 id="restaurant-about-text"><i class="fas fa-info-circle" style="font-size: 18px;margin-right: 5px;"></i> About the restaurant</h5>
        <div class="h_line"></div>
        <h5 id="restaurantAbout">${response[i].restaurantAbout}</h5>

        <div class="review-features" style="margin-bottom: 5vh">
            <h5 id="restaurant-about-text"><i class="fas fa-question-circle" style="font-size: 18px;margin-right: 5px;"></i> Features and Pricing</h5>
            <div class="h_line"></div>
            <div class="restaurantFeatures">
            </div>
            <h5 id="restaurantPricing"><i class="far fa-money-bill-alt" style="color: green; padding-right: 5px;"></i> ${response[i].restaurantPricing}</h5>
        </div>

        <div class="opening-Hour" style="margin-bottom: 5vh">
            <h5 id="restaurant-about-text"><i class="fas fa-clock" style="font-size: 18px;margin-right: 5px;"></i> Opening Hours</h5>
            <div class="h_line"></div>
            <p style="font-family: prodmed;">${response[i].restaurantOpeningHours}</p>
        </div>

        <div class="contact" style="margin-bottom: 5vh">
            <h5 id="restaurant-about-text"><i class="fas fa-mobile-alt" style="font-size: 18px;margin-right: 5px;"></i> Contact Us</h5>
            <div class="h_line"></div>
            <ul>
                <li id="contact-phone" style="font-family: prodmed;margin-top: 5px;">${response[i].restaurantPhone}</li>
                <li id="contact-email" style="font-family: prodmed;">${response[i].restaurantEmail}</li>
                <li id="contact-socialMedia" style="font-family: prodmed;">${response[i].restaurantSocialMedia}</li>
            </ul>
        </div>
        <div class="website" style="margin-bottom: 5vh">
            <h5 id="restaurant-about-text"><i class="fas fa-laptop" style="font-size: 18px;margin-right: 5px;"></i> Find Us at</h5>
            <div class="h_line"></div>
            <br>
            <a href="${response[i].restaurantLink}" id="website-link" style="font-family: prodmed;margin-top: 5px;">${response[i].restaurantLink}</a>
        </div>
        <div class="website" style="margin-bottom: 5vh">
            <h5 id="restaurant-about-text"><i class="fas fa-street-view" style="font-size: 18px;margin-right: 5px;"></i> Getting there</h5>
            <div class="h_line"></div>
            <br>
            <iframe style="width:600;height:400; background-color: green" id="gmap_canvas" src="https://maps.google.com/maps?q=${response[i].restaurantName}+Singapore ${response[i].restaurantAddress.slice(-6)}&e&t=k&z=17&ie=UTF8&iwloc=&output=embed">
            </iframe>

        </div>
    </div>



    
    <div id="restaurant-review" class="tabcontent">
        <div class="addReview">
                <input id="addReviewBox" type="text" placeholder="  Write your review here">
                <br><br>
                <div class="rate">
                    <input class="messageCheckbox" type="radio" id="star5" name="rate" value="5" />
                    <label for="star5" title="text">5 stars</label>
                    <input class="messageCheckbox" type="radio" id="star4" name="rate" value="4" />
                    <label for="star4" title="text">4 stars</label>
                    <input class="messageCheckbox" type="radio" id="star3" name="rate" value="3" />
                    <label for="star3" title="text">3 stars</label>
                    <input class="messageCheckbox"type="radio" id="star2" name="rate" value="2" />
                    <label for="star2" title="text">2 stars</label>
                    <input class="messageCheckbox" type="radio" id="star1" name="rate" value="1" />
                    <label for="star1" title="text">1 star</label>
                </div>
                <button id="addReviewButton" onclick="addReview()"><i class="fas fa-plus-circle"></i></button>
        </div>
        <p style="font-family: prodmed; margin-left: -10px">Review Section</p>
        <div class="reviewBox">

        </div>
    </div>
    `


        }

        let featuresStr = ''
        for (var i = 0; i < response.length; i++) {
            var features = response[i].restaurantFeatures
            for (let i = 0; i < features.length; i++) {
                featuresStr +=
                    `
                <h5 id="restaurantFeatures"><i class="fas fa-check-circle" style="color: limegreen; padding-right: 5px"></i> ${features[i]}</h5>
                `
            }

        }
        document.getElementsByClassName('col-sm-6 restaurant')[0].innerHTML = str
        document.getElementsByClassName('reviewBox')[0].innerHTML = reviewStr
        document.getElementsByClassName('restaurantFeatures')[0].innerHTML = featuresStr
        document.getElementById("defaultOpen").click();
        displayStar()
        displayReviewStar()
        checkLogInStatus()
    }

    request.send()

}

function displayStar() {
    var starCount = document.getElementsByClassName('stars-inner')
    const maxStar = 5
    for (let i = 0; i < starCount.length; i++) {
        var star = parseInt(starCount[i].innerHTML)
        var starUnchecked = maxStar - star
        starCount[i].innerHTML = `<span class="fa fa-star"></span>`.repeat(star) + `<span class="fa fa-star" style="opacity: 50%"></span>`.repeat(starUnchecked)
    }
}

function addReview() {
    var checkedValue = null;
    var reviewBoxText = document.getElementById('addReviewBox').value
    var inputElements = document.getElementsByClassName('messageCheckbox');
    for (var i = 0; inputElements[i]; ++i) {
        if (inputElements[i].checked) {
            checkedValue = inputElements[i].value;
            break;
        }
    }
    if (checkedValue == null) {
        alert("Please rate using the stars")
    } else {
        const urlParams = new URLSearchParams(window.location.search);
        const myParam = urlParams.get('id');
        var m = new Date();
        var dateString =
            m.getUTCFullYear() + "-" +
            ("0" + (m.getUTCMonth() + 1)).slice(-2) + "-" +
            ("0" + m.getUTCDate()).slice(-2) + " " +
            ("0" + m.getUTCHours()).slice(-2) + ":" +
            ("0" + m.getUTCMinutes()).slice(-2) + ":" +
            ("0" + m.getUTCSeconds()).slice(-2);
        // console.log(dateString)
        var user_id = (document.cookie.match(/^(?:.*;)?\s*username\s*=\s*([^;]+)(?:.*)?$/) || [, null])[1]
        var id = (document.cookie.match(/^(?:.*;)?\s*id\s*=\s*([^;]+)(?:.*)?$/) || [, null])[1]
        console.log("Logged in as ", user_id)
        var request2 = new XMLHttpRequest();
        request2.open("GET", `/users/${user_id}`, true);
        request2.setRequestHeader("Content-Type", "application/json");
        request2.onload = function() {
            response2 = JSON.parse(request2.responseText)
            response2.userId = (response2[0].user_id)

            var review = {
                review_content: reviewBoxText,
                review_rating: checkedValue,
                dateString: dateString,
                user_id: id,
                restaurant_id: myParam
            };

            var request = new XMLHttpRequest();
            request.open("POST", "/review ", true);
            request.setRequestHeader("Content-Type", "application/json");
            request.send(JSON.stringify(review));
            loadRestaurantInfo();
        }
        request2.send();
    }

}

function displayReviewStar() {
    var count = document.getElementsByClassName('commentRating')
    const maxStar = 5
    for (let i = 0; i < count.length; i++) {
        var star = count[i].innerHTML
        var starUnchecked = maxStar - star
        count[i].innerHTML = `<span class="fa fa-star"></span>`.repeat(star) + `<span class="fa fa-star" style="opacity: 50%"></span>`.repeat(starUnchecked)
    }
    // console.log(starCount.length)
}

function checkLogInStatus() {
    value_or_null = (document.cookie.match(/^(?:.*;)?\s*username\s*=\s*([^;]+)(?:.*)?$/) || [, null])[1]
    console.log("Logged in as", value_or_null)
    if (value_or_null != null) { //!= to see is user is logged in, if logged in, hide the login and signup button
        document.getElementsByClassName('nav')[0].style.visibility = "hidden";
        document.getElementsByClassName('navbar-toggler')[0].style.visibility = "hidden";
    } else {
        document.getElementsByClassName('addReview')[0].innerHTML = "<h2 style='font-family: prodmed;font-size: 16px;text-align:center;padding-top: 16%'>Please <a href='login.html'>Log In</a> or <a href='register.html'>Register</a> to add review</h2>";
    }
}

function openTab(evt, tabname) {
    var tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace("active", "");
        tablinks[i].style.backgroundColor = "white"
        tablinks[i].style.border = "transparent"
        tablinks[i].style.fontFamily = "prodmed"
        tablinks[i].style.letterSpacing = "0.5px"
        tablinks[i].style.border = "none"
        tablinks[i].style.outline = "0"
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(tabname).style.display = "block";
    evt.currentTarget.className += "active";
}