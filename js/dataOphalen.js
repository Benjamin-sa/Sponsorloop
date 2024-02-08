
document.getElementById('download').addEventListener('click', function() {
    let bestaandeTabel = document.getElementById('gesponsordeNamenTabel');
    if (bestaandeTabel) {
        if (bestaandeTabel.style.display === 'none') {
            // Als de tabel verborgen is, toon deze
            bestaandeTabel.style.display = '';
        } else {
            // Als de tabel zichtbaar is, verberg deze
            bestaandeTabel.style.display = 'none';
        }
    } else {
        // Controleer of de gegevens al in de cache staan
        let gesponsordeLeden = JSON.parse(localStorage.getItem('gesponsordeLeden'));
        if (gesponsordeLeden) {
            // Gebruik de gecachte gegevens
            toonGesponsordeLeden(gesponsordeLeden);
            console.log("Gegevens uit de cache gebruikt");
        } else {
            // Haal de gegevens op en sla ze op in de cache
            haalGesponsordeLedenOp().then(gesponsordeLeden => {
                localStorage.setItem('gesponsordeLeden', JSON.stringify(gesponsordeLeden));
                toonGesponsordeLeden(gesponsordeLeden);
            });
        }
    }
});

document.getElementById('Goed').addEventListener('click', function() {
    // Verwijder de gecachte gegevens
    localStorage.removeItem('gesponsordeLeden');
    console.log("Gecachte gegevens verwijderd");
});

    function haalGesponsordeLedenOp() {
        return new Promise((resolve, reject) => {
            let uid = firebase.auth().currentUser.displayName;
            db.collection('Donateurs').doc(uid).collection('Sponsoring').get()
                .then((querySnapshot) => {
                    let gesponsordeLeden = [];
                    querySnapshot.forEach((doc) => {
                        let lidID = doc.data().LidID;
                        let gesponsordBedrag = doc.data().Bedrag;
                        gesponsordeLeden.push({lidID, gesponsordBedrag});
                    });
                    resolve(gesponsordeLeden);
                })
                .catch((error) => {
                    console.log("Error getting documents: ", error);
                    reject(error);
                });
        });
}

function toonGesponsordeLeden(gesponsordeLeden) {
    // Controleer of de tabel al bestaat
    let bestaandeTabel = document.getElementById('gesponsordeNamenTabel');
    if (bestaandeTabel) {
        // Verwijder de bestaande tabel
        bestaandeTabel.remove();
    }
    let table = document.createElement('table');
        table.id = 'gesponsordeNamenTabel';
        table.className = 'rwd-table';

    let gesponsordeNamenDiv = document.getElementById('gesponsordeNamen');
    gesponsordeNamenDiv.appendChild(table);

    // maak hoofd
    let headerRow = document.createElement('tr');
    let headerNaam = document.createElement('th');
    let headerBedrag = document.createElement('th');

    // vul hoofd
    headerNaam.textContent = 'Naam';
    headerBedrag.textContent = 'Bedrag';
    headerRow.appendChild(headerNaam);
    headerRow.appendChild(headerBedrag);
    table.appendChild(headerRow);

    gesponsordeLeden.forEach((lid) => {
        db.collection('Leden').doc(lid.lidID).get()
            .then((lidDoc) => {
                if (lidDoc.exists) {
                    let lidData = lidDoc.data();

                    // maak rij
                    let row = document.createElement('tr');
                    let cellNaam = document.createElement('td');
                    let cellBedrag = document.createElement('td');

                    // vul rij
                    cellNaam.textContent = lidData.Naam;
                    cellBedrag.textContent = lid.gesponsordBedrag;
                    row.appendChild(cellNaam);
                    row.appendChild(cellBedrag);

                    // voeg rij toe
                    table.appendChild(row);

                    console.log("Gesponsorde naam: " + lidData.Naam + ", Gesponsord bedrag: " + lid.gesponsordBedrag);
                } else {
                    console.log("Geen document gevonden voor lid: " + lid.lidID);
                }
            })
            .catch((error) => {
                console.log("Error getting lid document: ", error);
            });
    });
}