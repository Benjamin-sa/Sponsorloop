// Definieer de einddatum
var countDownDate = new Date("Dec 31, 2024 23:59:59").getTime();

// Update de teller elke seconde
var x = setInterval(function() {

    // Haal de huidige datum en tijd op
    var now = new Date().getTime();

    // Vind het verschil tussen nu en de einddatum
    var distance = countDownDate - now;

    // Tijd berekeningen voor dagen, uren, minuten en seconden
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Output de resultaat in een element met id="demo"
    document.getElementById("demo").innerHTML = days + "d " + hours + "h "
        + minutes + "m " + seconds + "s ";

    // Als de aftelling is afgelopen, schrijf dan wat tekst
    if (distance < 0) {
        clearInterval(x);
        document.getElementById("demo").innerHTML = "EXPIRED";
    }
}, 1000);