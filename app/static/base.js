// Initializae firebase
var config = {
    apiKey: 'AIzaSyB4bSmMVycec_35pi98syy9vQkjvePUo8M',
    authDomain: 'stymer-ea133.firebase.com',
    databaseURL: 'https://stymer-ea133.firebaseio.com/',
    storageBucket: 'stymer-ea133.appspot.com'
};
firebase.initializeApp(config);

var fDB = firebase.database();

function secsToDate(s) {
    let d = new Date(null);
    d.setSeconds(s);
    return d.toISOString().substr(11, 8);
}

function updateTimerValues(userID) {
    // Link with firebase
    let user = fDB.ref(userID);
    user.on('value', function(snap) {
        if (snap.seconds) {
            $('.time').text(secsToDate(snap));
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
    $('#fblogin')
        .on('click', function() {
            if ($(this).text() === 'Facebook') {
                // Login with facebook
                FB.login(fbStatusChange, {scope: 'public_profile,email'});
            } else {
                // Logout of facebook
                FB.logout(fbStatusChange);
            }
        });
});
