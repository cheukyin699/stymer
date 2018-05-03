// Initializae firebase
var config = {
    apiKey: 'AIzaSyB4bSmMVycec_35pi98syy9vQkjvePUo8M',
    authDomain: 'stymer-ea133.firebase.com',
    databaseURL: 'https://stymer-ea133.firebaseio.com/',
    storageBucket: 'stymer-ea133.appspot.com'
};
firebase.initializeApp(config);

var fDB = firebase.database();
var countUp = true;
var originalTime = new Date().getTime();
var timeUsed = 0;
var counting = false;

function secsToDate(s) {
    let d = new Date(null);
    d.setSeconds(s);
    return d.toISOString().substr(11, 8);
}

function updateTimerValues(userID) {
    // Link with firebase
    let user = fDB.ref(userID);
    user.on('value', function(snap) {
        // Set the variables
        if (snap.seconds) {
            $('.time').text(secsToDate(snap));
        }
        if (snap.countUp) {
            countUp = snap.countUp;
        }
    });
}

function fbStatusChange(resp) {
    if (resp.status === 'connected') {
        // User is connected to app via facebook
        // Check to see if user has a synced timer and change values accordingly
        let userID = resp['authResponse']['userID'];
        updateTimerValues(userID);

        // Update the other buttons
        $('#fblogin').text('Logout');
    } else {
        // User is not connected to app
        // Update the other buttons
        $('#fblogin').text('Facebook');
    }
}

$(function() {
    let timerId = null;

    $('#fblogin').on('click', function() {
        if ($(this).text() === 'Facebook') {
            // Login with facebook
            FB.login(fbStatusChange, {scope: 'public_profile'});
        } else {
            // Logout of facebook
            FB.logout(fbStatusChange);
        }
    });

    $('#start').on('click', function() {
        counting = $(this).text() === 'Start';
        $(this).text(counting ? 'Stop' : 'Start');

        if (counting) {
            originalTime = new Date().getTime();

            timerId = setInterval(function() {
                // Deal exclusively with seconds, but because we might expand,
                // we would store it in the database as milliseconds.
                let currentTime = new Date().getTime();
                let timeDelta = currentTime - originalTime + timeUsed;
                let timeString = secsToDate(timeDelta / 1000);

                $('.time').text(timeString);
            }, 1000);
        } else {
            clearInterval(timerId);
            timeUsed += new Date().getTime() - originalTime;
        }
    });
});
