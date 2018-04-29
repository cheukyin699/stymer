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
    let user = fDB.database().ref('users/' + userID);
    user.on('value', function(snap) {
        $('.time').text(secsToDate(snap));
    });
}

function fbStatusChange(resp) {
    if (resp === 'connected') {
        let userID = resp['authResponse']['userID'];
        updateTimerValues(userID);
    }
}
