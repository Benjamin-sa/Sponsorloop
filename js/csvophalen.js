// Lees het CSV-bestand in
fetch('js/ledenlijst.csv')
    .then(response => response.text())
    .then(data => {
        // Parse de CSV data
        let parsedData = Papa.parse(data, {header: true}).data;

        // Haal de unieke 'Takken' uit de CSV-gegevens
        let takken = [...new Set(parsedData.map(row => row['Takken']))];

        // Selecteer de 'Tak' dropdown
        let takDropdown = document.getElementById('tak-dropdown');

        // Loop door elke 'Tak'
        for (let tak of takken) {
            // Maak een nieuwe optie
            let option = document.createElement('option');

            // Stel de waarde en de tekst van de optie in op de 'Tak'
            option.value = tak;
            option.textContent = tak;

            // Voeg de optie toe aan de 'Tak' dropdown
            takDropdown.appendChild(option);
        }

        // Voeg een event listener toe aan de 'Tak' dropdown
        takDropdown.addEventListener('change', function() {
            // Verkrijg de geselecteerde 'Tak'
            let selectedTak = this.value;

            // Filter de CSV-gegevens op basis van de geselecteerde 'Tak'
            let filteredData = parsedData.filter(row => row['Takken'] === selectedTak);

            console.log(filteredData);
            // Selecteer de 'Naam' dropdown
            let naamDropdown = document.getElementById('naam-dropdown');

            // Verwijder alle bestaande opties
            naamDropdown.innerHTML = '';

            // Loop door elke rij in de gefilterde gegevens
            for (let row of filteredData) {
                // Maak een nieuwe optie
                let option = document.createElement('option');

                // Stel de waarde van de optie in op de 'Naam'
                option.value = row['Naam'];

                option.textContent = row['Naam'];

                // Voeg de optie toe aan de 'Naam' dropdown
                naamDropdown.appendChild(option);
            }
        });
    });
        /*----------------------------------------------------*/
        /*  naam selecteren en toevoegen via divs
        /*----------------------------------------------------*/


      // Selecteer de 'Naam' dropdown
let naamDropdown = document.getElementById('naam-dropdown');

// Voeg een event listener toe aan de 'Naam' dropdown
naamDropdown.addEventListener('change', function() {
    // Verkrijg de geselecteerde 'Naam'
    let selectedNaam = this.value;

    // Selecteer de div waar u de geselecteerde naam aan wilt toevoegen
    let box = document.getElementById('geselecteerdeNamen');

    // Controleer of er al een div bestaat met dezelfde naam
    let existingName = Array.from(box.children).find(child => child.textContent.slice(0, -1) === selectedNaam);
    if (existingName) {
        alert('Deze naam is al geselecteerd');
        return;
    }

    // Maak een nieuw element aan dat de geselecteerde naam weergeeft
    let selectedName = document.createElement('div');
    selectedName.textContent = selectedNaam;
    selectedName.classList.add('selected-name');

    // Maak een kruisje aan
    let cross = document.createElement('span');
    cross.textContent = 'x';
    cross.classList.add('cross');

    // Voeg het kruisje toe aan het element
    selectedName.appendChild(cross);

    // Voeg het element toe aan de div
    box.appendChild(selectedName);

    // Voeg een event listener toe aan het kruisje
    cross.addEventListener('click', function () {
        // Verwijder het element uit de div
        box.removeChild(selectedName);
    });
});