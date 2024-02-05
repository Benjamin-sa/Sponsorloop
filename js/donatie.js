
firebase.auth().onAuthStateChanged(function(user) {

    if (!user) {
        // De gebruiker is niet ingelogd, stuur ze naar de inlogpagina
        window.location.href = "index.html"; // vervang dit door de naam van uw inlogpagina
    }

});



var customAmountInput = document.querySelector('.form-control');

// Voeg een event listener toe aan het invoerveld
customAmountInput.addEventListener('input', function() {
    // Selecteer alle radio buttons
    var radioButtons = document.querySelectorAll('.form-check-input');

    // Loop door alle radio buttons
    for (var i = 0; i < radioButtons.length; i++) {
        // Deselecteer de radio button
        radioButtons[i].checked = false;
    }
});


document.getElementById('myForm').addEventListener('submit', function(event) {
    event.preventDefault();

    var amount;
    var radios = document.getElementsByName('flexRadioDefault');
    var userId = firebase.auth().currentUser.uid;

    for (var i = 0, length = radios.length; i < length; i++) {
        if (radios[i].checked) {
            // get value, set checked flag or do whatever you want to
            amount = radios[i].value;
            break;
        }
    }

    // Als er geen radiobutton is geselecteerd, gebruik dan de custom amount
    if (!amount) {
        amount = document.querySelector('input[aria-label="Username"]').value;
    }

    // Selecteer de div waar de geselecteerde namen zijn toegevoegd
    var selectedNamesDiv = document.getElementById('geselecteerdeNamen');

    // Verzamel de geselecteerde namen
    var selectedNames = Array.from(selectedNamesDiv.children).map(function(child) {
        return child.textContent;
    });

    var db = firebase.firestore();

    var data = {
        bedrag: amount,
        lopers: selectedNames, // upload de geselecteerde namen
        userId: userId
    };

    db.collection("donations").add(data)
        .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });
});


// Selecteer de submit-knop
let submitButton = document.querySelector('button[type="submit"]');

// Voeg een event listener toe aan de submit-knop
submitButton.addEventListener('click', function(event) {
    event.preventDefault(); // Voorkom dat het formulier wordt verzonden

    // Toon de pop-up
    let popup = document.getElementById('confirmation');
    popup.style.display = 'block';
});

// Selecteer de 'Learn More'-knop
let learnMoreButton = document.querySelector('#confirmation .button');

// Voeg een event listener toe aan de 'Learn More'-knop
learnMoreButton.addEventListener('click', function() {
    // Verzend de gegevens naar de server
    // ...
});

// Selecteer de 'close'-knop
let closeButton = document.querySelector('#confirmation .close-button');

// Voeg een event listener toe aan de 'close'-knop
closeButton.addEventListener('click', function() {
    // Verberg de pop-up
    let popup = document.getElementById('confirmation');
    popup.style.display = 'none';
});
