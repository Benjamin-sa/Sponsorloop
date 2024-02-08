
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
            haalDonatiesOpVanGebruiker().then(gesponsordeLeden => {
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


function haalDonatiesOpVanGebruiker() {

    const userID = firebase.auth().currentUser.uid;
    return new Promise((resolve, reject) => {
        db.collection('Donateurs').doc(userID).collection('Donaties').get()
            .then((querySnapshot) => {
                let donaties = [];
                querySnapshot.forEach((doc) => {
                    let lidID = doc.data().LidID;
                    let bedrag = doc.data().Bedrag;
                    donaties.push({lidID, bedrag});
                });
                resolve(donaties);
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
                reject(error);
            });
    });
}



function toonGesponsordeLeden(gesponsordeLeden) {
    let bestaandeTabel = document.getElementById('gesponsordeNamenTabel');
    if (bestaandeTabel) {
        bestaandeTabel.remove();
    }
    let table = document.createElement('table');
    table.id = 'gesponsordeNamenTabel';
    table.className = 'rwd-table';

    let gesponsordeNamenDiv = document.getElementById('gesponsordeNamen');
    gesponsordeNamenDiv.appendChild(table);

    let headerRow = document.createElement('tr');
    let headerLidID = document.createElement('th');
    let headerBedrag = document.createElement('th');

    headerLidID.textContent = 'Lid ID';
    headerBedrag.textContent = 'Bedrag';
    headerRow.appendChild(headerLidID);
    headerRow.appendChild(headerBedrag);
    table.appendChild(headerRow);

    gesponsordeLeden.forEach((donatie) => {
        let row = document.createElement('tr');
        let cellLidID = document.createElement('td');
        let cellBedrag = document.createElement('td');

        cellLidID.textContent = donatie.lidID;
        cellBedrag.textContent = donatie.bedrag;
        row.appendChild(cellLidID);
        row.appendChild(cellBedrag);

        table.appendChild(row);
    });
}