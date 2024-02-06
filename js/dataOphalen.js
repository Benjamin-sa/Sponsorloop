// Haal de top 10 leden op, gesorteerd op gesponsorde hoeveelheid
db.collection('leden')
    .orderBy('TotaalGesponsord', 'desc')
    .limit(10)
    .get()
    .then((querySnapshot) => {
        let leden = [];
        querySnapshot.forEach((doc) => {
            let lid = doc.data();
            lid.id = doc.id; // Voeg het document ID toe aan het lid object
            leden.push(lid);
        });

        // Voeg de leden toe aan de tabel
        let leaderboardBody = document.getElementById('leaderboardBody');
        leden.forEach(lid => {
            let row = document.createElement('tr');
            let naamCell = document.createElement('td');
            naamCell.textContent = lid.naam;
            let scoreCell = document.createElement('td');
            scoreCell.textContent = lid.gesponsordeHoeveelheid;
            row.appendChild(naamCell);
            row.appendChild(scoreCell);
            leaderboardBody.appendChild(row);
        });
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });