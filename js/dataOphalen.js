// Lees het CSV-bestand in
fetch('js/ledenlijst.csv')
    .then(response => response.text())
    .then(data => {
        // Parse de CSV-gegevens
        let parsedData = Papa.parse(data, { header: true, dynamicTyping: true, delimiter: ";", skipEmptyLines: true }).data;

        // Selecteer de datalist
        let datalist = document.getElementById('languages');

        // Maak een set om unieke 'takken' op te slaan
        let uniqueTakken = new Set();

        // Loop door elke rij in de CSV-gegevens
        for (let row of parsedData) {
            // Voeg de 'takken' toe aan de set
            uniqueTakken.add(row['Takken']);
        }

        // Loop door elke unieke 'takken'
        for (let tak of uniqueTakken) {
            // Maak een nieuwe optie
            let option = document.createElement('option');

            // Stel de waarde van de optie in op de 'takken'
            option.value = tak;

            // Voeg de optie toe aan de datalist
            datalist.appendChild(option);
        }

        /*----------------------------------------------------*/
        /*  naam selecteren en toevoegen aan de datalist
        /*----------------------------------------------------*/


        // Voeg een event listener toe aan het input-element
        document.getElementById('default').addEventListener('input', function() {


            // Selecteer het inputveld
            let inputField = document.getElementById('ajax');

            // Voeg een event listener toe aan het inputveld
            inputField.addEventListener('input', function() {
                // Maak een nieuw element aan dat de geselecteerde naam weergeeft
                let selectedName = document.createElement('div');
                selectedName.textContent = this.value;
                selectedName.classList.add('selected-name');

                // Maak een kruisje aan
                let cross = document.createElement('span');
                cross.textContent = 'x';
                cross.classList.add('cross');

                // Voeg het kruisje toe aan het element
                selectedName.appendChild(cross);

                // Selecteer de div waar u de geselecteerde naam aan wilt toevoegen
                let box = document.getElementById('geselecteerdeNamen');

                // Voeg het element toe aan de div
                box.appendChild(selectedName);

                // Voeg een event listener toe aan het kruisje
                cross.addEventListener('click', function() {
                    // Verwijder het element uit de div
                    box.removeChild(selectedName);
                });

                // Wis de inputveld waarde
                this.value = '';
            });


            /*----------------------------------------------------*/
            /*  CSV data toevoegen aan de datalist
            /*----------------------------------------------------*/


            // Verkrijg de geselecteerde 'takken'
            let selectedTak = this.value;

            // Filter de CSV-gegevens op basis van de geselecteerde 'takken'
            let filteredData = parsedData.filter(row => row['Takken'] === selectedTak);

            // Selecteer de tweede datalist
            let datalist2 = document.getElementById('csv-datalist');

            // Verwijder alle bestaande opties
            datalist2.innerHTML = '';

            // Loop door elke rij in de gefilterde gegevens
            for (let row of filteredData) {
                // Maak een nieuwe optie
                let option = document.createElement('option');

                // Stel de waarde van de optie in op de 'Voornaam' en 'Achternaam'
                option.value = row['Voornaam'] + ' ' + row['Achternaam'];

                // Voeg de optie toe aan de tweede datalist
                datalist2.appendChild(option);
            }
        });
    });

//////////

