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


document.addEventListener('DOMContentLoaded', function() {
    const movementStrength = 500;
    const height = movementStrength / window.innerHeight;
    const width = movementStrength / window.innerWidth;
    const heroSection = document.querySelector('.hero-section');
    const heroTitle = document.querySelector('.hero-title');

    heroSection.addEventListener('mousemove', function(e) {
        const pageX = e.pageX - (window.innerWidth / 2);
        const pageY = e.pageY - (window.innerHeight / 2);
        const newvalueX = width * pageX * -1 - 25;
        const newvalueY = height * pageY * -1 - 50;
        heroTitle.style.backgroundPosition = `${newvalueX}px ${newvalueY}px`;
    });
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

// ingelogde gebruiker
function handleLoggedInUser(user) {
    var followDiv = document.querySelector('.follow');
    var displayName = user.displayName;
    followDiv.innerHTML = `<a>${displayName}</a> | <a id="logoutKnop">Uitloggen</a>`;

    document.getElementById('logoutKnop').addEventListener('click', function() {
        firebase.auth().signOut().then(function() {
            // Sign out successful
        }).catch(function(error) {
            alert('Er is iets misgegaan bij het uitloggen. contacteer benjamin.sautesb@gmail.com');
        });
    });
}


// uitgelogde gebruiker
function handleLoggedOutUser() {
    var followDiv = document.querySelector('.follow');
    followDiv.innerHTML = '<a id="loginKnop">Inloggen</a>';

    document.getElementById('loginKnop').addEventListener('click', function() {
        document.getElementById('loginForm').style.display = 'block';
    });
}

// Controleer of de gebruiker is ingelogd
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        handleLoggedInUser(user);
    } else {
        handleLoggedOutUser();
    }
});




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


