

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
            if (!user.emailVerified) {
                user.sendEmailVerification().then(() => {
                    alert('Verificatie email verzonden! Controleer uw inbox.');
                    firebase.auth().signOut();
                });
            } else {
            user.updateProfile({
                displayName: email
            }).then(() => {
                window.location.href = "donate.html";
            });
        }
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
                    alert("Controleer wachtwoord en e-mailadres");  // Toon het standaard foutbericht van Firebase
                    break;
            }
        });
});

var uiConfig = {
    callbacks: {
        signInSuccessWithAuthResult: function(authResult, redirectUrl) {
            var user = authResult.user;
            if (!user.emailVerified) {
                user.sendEmailVerification().then(() => {
                    alert('Verificatie email verzonden! Controleer uw inbox.');
                    firebase.auth().signOut();
                });
                return false;  // Voorkomt automatische omleiding na aanmelding
            }

            // Gebruiker is succesvol geregistreerd.
            window.location.href = "donate.html";
            return true;  
        },
        uiShown: function() {

        }
    },
    // Popup registratiestroom in plaats van redirectstroom.
    signInFlow: 'redirect',
    // We tonen alleen e-mail als registratieoptie.
    signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        firebase.auth.GoogleAuthProvider.PROVIDER_ID
    ],

    tosUrl: 'https://lodlavki-sponsorloop.me/voorwaarde.html',
    privacyPolicyUrl: 'https://lodlavki-sponsorloop.me/voorwaarde.html'

};

if (/FBAN|FBAV/i.test(navigator.userAgent)) {

var messageDiv = document.getElementById('messageDiv');
messageDiv.innerHTML = 'Inloggen via de Facebook in-app browser is helaas niet mogelijk.<br><a>Open de website in een externe browser zoals safari of google chrome</a><br><button class="btn" onclick="copyContent()">Copy!</button>';
messageDiv.style.color = 'red';

} else {
    ui.start('#firebaseui-auth-container', uiConfig);
}

function copyContent() {
    navigator.clipboard.writeText(window.location.href)
    .then(() => {
        alert('Link gekopieerd naar klembord');
    })
    .catch(err => {
        console.error('Kon de link niet kopiëren: ', err);
    });
}

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