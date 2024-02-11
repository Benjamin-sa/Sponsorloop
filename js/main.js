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

let lastScrollTop = 0;
let ticking = false;

function doSomething(scrollPos) {
    var factorBackground = scrollPos * .4;
    $('.hero-image-background').css({'transform': `translateY(${factorBackground}px)`});
    const title = document.querySelector('.hero-title');
    const subtitle = document.querySelector('.hero-subtitle');

    const scrolled = window.scrollY;

    title.style.transform = `translateY(${scrolled * title.dataset.speed}px)`;
    subtitle.style.transform = `translateY(${scrolled * subtitle.dataset.speed}px)`;
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
}, { threshold: 0.2});  // threshold bepaalt hoeveel van het element zichtbaar moet zijn voordat de callback wordt getriggerd

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


