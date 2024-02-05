


// Initialiseer de FirebaseUI-widget met Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());

var uiConfig = {
    callbacks: {
        signInSuccessWithAuthResult: function(authResult, redirectUrl) {
            // Gebruiker is succesvol ingelogd.
            // Je kunt hier de authResult gebruiken om meer informatie over de gebruiker te krijgen.
            window.location.href = "index.html";
            return true;  // Wanneer deze methode true retourneert, wordt de pagina vernieuwd.
        },
        uiShown: function() {

        }
    },
    // Popup inlogstroom in plaats van redirectstroom.
    signInFlow: 'popup',
    // We tonen e-mail en Google als inlogopties.
    signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        firebase.auth.GoogleAuthProvider.PROVIDER_ID
    ],
    // Andere configuratieopties...
};

ui.start('#firebaseui-auth-container', uiConfig);