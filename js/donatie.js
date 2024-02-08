firebase.auth().onAuthStateChanged(user => {
    if (!user) {
        window.location.href = "index.html";
    }
});
/*----------------------------------------------------*/
/*   verbiedt dubbele bedragen
/*----------------------------------------------------*/
const customAmountInput = document.querySelector('.form-control');
const radioButtons = document.querySelectorAll('.form-check-input');

customAmountInput.addEventListener('input', () => {
    radioButtons.forEach(radioButton => {
        radioButton.checked = false;
    });
});
radioButtons.forEach(radioButton => {
    radioButton.addEventListener('change', () => {
        customAmountInput.value = '';
    });
});
/*----------------------------------------------------*/
/*   pop up menu
/*----------------------------------------------------*/

const submitButton = document.querySelector('button[type="submit"]');
submitButton.addEventListener('click', event => {
    event.preventDefault();

    const selectedNames = getSelectedNames();
    const amount = getSelectedAmount();

    if (selectedNames.length > 0 && amount) {
        const popup = document.getElementById('confirmation');
        popup.style.display = 'block';
    } else {
        alert('Selecteer a.u.b. een naam en een bedrag voordat u verdergaat.');
    }
});

document.getElementById('close').addEventListener('click', function() {
    document.getElementById('confirmation').style.display = 'none';
});

/*----------------------------------------------------*/
/*  donatie functies
/*----------------------------------------------------*/

let parsedData = null;

// Functie om de CSV-gegevens op te halen en te verwerken
async function parseCsvData() {
    const response = await fetch('js/ledenlijst.csv');
    const data = await response.text();
    parsedData = Papa.parse(data, { header: true, dynamicTyping: true, delimiter: ",", skipEmptyLines: true }).data;
}

// Functie om de overeenkomende 'Takken' waarde te vinden voor een gegeven naam
function findMatchingTak(name) {
    let matchingRow = parsedData.find(row => row['Naam'] === name);
    return matchingRow ? matchingRow['Takken'] : alert('Geen tak gevonden voor ' + name);
}

// Functie om de geselecteerde namen op te halen
function getSelectedNames() {
    const selectedNamesDiv = document.getElementById('geselecteerdeNamen');
    return Array.from(selectedNamesDiv.children).map(child => child.textContent.slice(0, -1));
}

// Functie om het geselecteerde bedrag op te halen
function getSelectedAmount() {
    const radios = document.getElementsByName('flexRadioDefault');
    for (let i = 0, length = radios.length; i < length; i++) {
        if (radios[i].checked) {
            return radios[i].value;
        }
    }
    return document.querySelector('input[aria-label="hoeveelheid"]').value;
}

document.getElementById('Goed').addEventListener('click', async () => {
    console.log(firebase.auth().currentUser);
    if (!parsedData) {
        await parseCsvData();
    }
    const userID = firebase.auth().currentUser.uid;
    console.log(userID);
    const username = firebase.auth().currentUser.displayName;
    const email = firebase.auth().currentUser.email;
    const amount = getSelectedAmount();
    const selectedNames = getSelectedNames();

    let donateurRef = db.collection('Donateurs').doc(userID);

    donateurRef.set({
        Naam: username,
        Email: email
    }, { merge: true });

    for (let name of selectedNames) {
        let tak = findMatchingTak(name);
        if (tak) {
            let donatieRef = donateurRef.collection('Donaties').doc();

            donatieRef.set({
                LidID: name,
                Bedrag: amount
            }).then(() => {
                alert("De donatie is succesvol verwerkt");
                window.location.href = "index.html";
            }).catch((error) => {
                console.error("Error writing document: ", error);
                if (error.code === 'resource-exhausted') {
                    alert('Limiet is vandaag bereikt, probeer het morgen opnieuw');
                } else {
                    alert('Er is een fout opgetreden bij het schrijven van de gegevens');
                }
            });
        }
    }
});