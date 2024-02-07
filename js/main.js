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



var lastScrollTop = 0;
var ticking = false;

function doSomething(scroll_pos) {
    $(".hero-section").css({
        transform: 'translate3d(0, -'+(scroll_pos/100)+'%, 0)'
    });

    $(".hero-title").css({
        transform: 'translate3d(0, '+scroll_pos/70+'%, 0)'
    });

    $(".hero-subtitle").css({
        transform: 'translate3d(0, '+scroll_pos/30+'%, 0)'
    });
}

window.addEventListener('scroll', function(e) {
    lastScrollTop = window.scrollY;
    if (!ticking) {
        window.requestAnimationFrame(function() {
            doSomething(lastScrollTop);
            ticking = false;
        });
        ticking = true;
    }
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


