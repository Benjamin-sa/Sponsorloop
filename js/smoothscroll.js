$(".arrow-circle").on('mousedown', function() {
    $('html, body').animate({
        scrollTop: $("#section_2").offset().top
    }, 100);
});