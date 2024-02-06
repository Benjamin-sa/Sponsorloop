

// Initialiseer de FirebaseUI-widget met Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    var email = document.getElementById('emailField').value;
    var password = document.getElementById('passwordField').value;

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // De gebruiker is ingelogd
            var user = userCredential.user;
            window.location.href = "index.html";
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;

            switch (errorCode) {
                case 'auth/invalid-email':
                    alert('Het ingevoerde e-mailadres is niet geldig.');
                    break;
                case 'auth/user-disabled':
                    alert('Dit account is uitgeschakeld.');
                    break;
                case 'auth/user-not-found':
                    alert('Er is geen account gevonden met dit e-mailadres.');
                    break;
                case 'auth/wrong-password':
                    alert('Het ingevoerde wachtwoord is onjuist.');
                    break;
                default:
                    alert(errorMessage);  // Toon het standaard foutbericht van Firebase
                    break;
            }
        });
});

var uiConfig = {
    callbacks: {
        signInSuccessWithAuthResult: function(authResult, redirectUrl) {
            // Gebruiker is succesvol geregistreerd.
            // Je kunt hier de authResult gebruiken om meer informatie over de gebruiker te krijgen.
            window.location.href = "index.html";
            return true;  // Wanneer deze methode true retourneert, wordt de pagina vernieuwd.
        },
        uiShown: function() {

        }
    },
    // Popup registratiestroom in plaats van redirectstroom.
    signInFlow: 'popup',
    // We tonen alleen e-mail als registratieoptie.
    signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        firebase.auth.GoogleAuthProvider.PROVIDER_ID
    ],
    // Voorwaarden en privacybeleid
};

ui.start('#firebaseui-auth-container', uiConfig);

document.getElementById('forgotPassword').addEventListener('click', function() {
    var email = document.getElementById('loginEmailField').value;

    firebase.auth().sendPasswordResetEmail(email)
        .then(function() {
            // Password reset email sent.
            alert('Password reset email sent to ' + email);
        })
        .catch(function(error) {
            // Error occurred. Inspect error.code.
            alert('Error: contacteer benjamin.sauter@gmail.com ' + error.message);
        });
});