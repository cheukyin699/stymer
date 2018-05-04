// Firebase Authentication
var ui = new firebaseui.auth.AuthUI(firebase.auth());
var uiConfig = {
    signInOptions: [
        // List of OAuth providers
        firebase.auth.FacebookAuthProvider.PROVIDER_ID
    ],
    signInFlow: 'popup'
}

ui.start('#firebaseui-auth-container', uiConfig);
