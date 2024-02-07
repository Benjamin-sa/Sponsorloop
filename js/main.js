//laad scherm prul
window.addEventListener('load', function() {
    setTimeout(function() {
        const spinner = document.querySelector('.spinner');
        const checkmark = document.querySelector('.checkmark');
        spinner.style.display = 'none';
        checkmark.style.display = 'block';
        setTimeout(function() {
            const load_screen = document.getElementById('loading-screen');
            load_screen.style.display = 'none';
        }, 500); // Vertraging van halve seconde
    }, 500); // Vertraging van halve seconde
});

let animation = lottie.loadAnimation({
    container: document.getElementById('lottie-animation'), // het DOM-element waar de animatie wordt geladen
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: 'images/animatie/icons8-chevron.json' // het pad naar de JSON-animatiebestand
});



// Functie om de animatie te starten
function startAnimation() {
    $(".hero-section").css({
        transform: 'translateY(-15vh)',
        transition: 'transform 2s'
    });

    $(".hero-title").css({
        transform: 'translateY(15vh)',
        transition: 'transform 2s'
    });

    $(".hero-subtitle").css({
        transform: 'translateY(30vh)',
        transition: 'transform 2s'
    });

    $("#section_2").css({
        transform: 'translateY(-100vh)',
        transition: 'transform 2s'
    });

    document.body.style.overflow = 'auto';
}

function handleScrollAndTouch() {
    // Voeg event listeners toe voor touchstart, touchend en touchmove
    document.addEventListener('touchstart', function(e) {
        touchStartY = e.changedTouches[0].screenY;
    }, false);

    document.addEventListener('touchend', function(e) {
        touchEndY = e.changedTouches[0].screenY;
        handleSwipe();
    }, false);

    document.addEventListener('touchmove', function(e) {
        if (document.body.style.overflow === 'hidden') {
            console.log('Scroll gedetecteerd terwijl overflow op hidden is ingesteld');
        }
    });

    // Voeg een event listener toe voor het scroll event
    window.addEventListener('scroll', function() {
        if ($(window).scrollTop() > 0 && $("#section_2").css('transform') !== 'translateY(-100vh)') {
            startAnimation();
        }
    });

    // Functie om de swipe te verwerken
    function handleSwipe() {
        if (touchEndY < touchStartY) {
            startAnimation();
        }
    }
}

// Roep de functie aan
handleScrollAndTouch();

var button = document.getElementById('lottie-animation'); // Vervang 'yourButtonId' door het daadwerkelijke id van uw knop
button.addEventListener('click', function() {
    // Start de animatie
    startAnimation();
});

document.getElementById('resetButton').addEventListener('click', function() {
    hasScrolled = false;

    $(".hero-section").css({
        transform: 'translateY(0)',
        transition: 'transform 2s'
    });

    $(".hero-title").css({
        transform: 'translateY(0)',
        transition: 'transform 2s'
    });

    $(".hero-subtitle").css({
        transform: 'translateY(0)',
        transition: 'transform 2s'
    });

    $("#section_2").css({
        transform: 'translateY(0)',
        transition: 'transform 2s'
    });

    document.body.style.overflow = 'hidden';

});
//login menu
firebase.auth().onAuthStateChanged(function(user) {
    var followDiv = document.querySelector('.follow');
    if (user) {
        // De gebruiker is ingelogd.
        var displayName = user.displayName;
        followDiv.innerHTML = `<a>${displayName}</a> | <a id="logoutKnop">Uitloggen</a>`;

        // Voeg een event listener toe aan de "Uitloggen" link
        document.getElementById('logoutKnop').addEventListener('click', function() {
            firebase.auth().signOut().then(function() {
                // Uitloggen was succesvol
            }).catch(function(error) {
                alert('Er is iets misgegaan bij het uitloggen. contacteer benjamin.sautesb@gmail.com');
            });
        });
    } else {
        // Geen gebruiker is ingelogd.
        followDiv.innerHTML = '<a id="loginKnop">Inloggen</a>';

        // Voeg een event listener toe aan de "Inloggen" link
        document.getElementById('loginKnop').addEventListener('click', function() {
            // Wijzig de display eigenschap van de loginForm naar "block"
            document.getElementById('loginForm').style.display = 'block';
        });
    }
});

// Selecteer alle divs die u wilt animeren
const divs = document.querySelectorAll('.timeline-2, .custom-text-box, .custom-text-box-image');

// Maak een nieuwe Intersection Observer aan
let observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        // Als het element in het viewport is
        if (entry.isIntersecting) {
            // Voeg een class toe aan het element
            entry.target.classList.add('animate');
        } else {
            // Als het element uit het viewport is, verwijder de class
            entry.target.classList.remove('animate');
        }
    });
}, { threshold: 0.2 });  // threshold bepaalt hoeveel van het element zichtbaar moet zijn voordat de callback wordt getriggerd

// Voeg voor elk geselecteerd element de observer toe
divs.forEach(div => {
    observer.observe(div);
});

// close button en sponsor knop laten werken
document.addEventListener('DOMContentLoaded', function() {
    var closeButton = document.querySelector('.close-button');
    var loginForm = document.querySelector('#loginForm');
    var pulseButton = document.querySelector('.pulse-button');

    closeButton.addEventListener('click', function() {
        loginForm.style.display = 'none';
    });

    pulseButton.addEventListener('click', function() {
        var user = firebase.auth().currentUser;

        if (user) {
            // Gebruiker is ingelogd, leidt om naar donate.html
            window.location.href = 'donate.html';
        } else {
            // Gebruiker is niet ingelogd, toon het inlogformulier
            loginForm.style.display = 'block';
        }
    });
});


