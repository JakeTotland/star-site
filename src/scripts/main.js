// "Main"
$(document).ready(function () {
    // Loads all modules on the page
    let path_photo_base = "images/";
    let path_file_base = "modules/";

    // Loads the homepage modules
    let path_file_appended = path_file_base + "home/";

    // Loads the carousel module
    let carousel = document.getElementById('myCarousel');
    if (carousel != null) {
        let appendage = "";
        let path_file = path_file_appended + "carousel.json";
        retrieveJSON(path_file, function(elements) {
            appendage += '<ol class="carousel-indicators">&nbsp;<li data-target="#myCarousel" data-slide-to="0" class="active"></li>&nbsp;';
            for (let i = 1; i < elements.length; i++) {
                appendage += '<li data-target="#myCarousel" data-slide-to="' + i + '"></li>&nbsp;';
            }
            appendage += '</ol>';
            
            appendage += '<div class="carousel-inner" role="listbox">';
            for (i = 0; i < elements.length; i++) {
                if (i == 0) {
                    appendage += '<div class="item active">';
                } else {
                    appendage += '<div class="item">';
                }
                appendage += '<img src="' + path_photo_base + elements[i].img + '" alt="' + elements[i].name + '" width="1200" height="700"><div class="carousel-caption"><p>' + elements[i].desc + '</p></div></div>';
            }
            appendage += '</div>';
            appendage += '<a class="left carousel-control" href="#myCarousel" role="button" data-slide="prev"><span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span><span class="sr-only">Previous</span></a><a class="right carousel-control" href="#myCarousel" role="button" data-slide="next"><span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span><span class="sr-only">Next</span></a>';

            carousel.innerHTML += appendage;
        });
    }

    // Initialize Tooltip
    $('[data-toggle="tooltip"]').tooltip();

    // Add smooth scrolling to all links in navbar + footer link
    $(".navbar a, footer a[href='#myPage']").on('click', function (event) {

        // Make sure this.hash has a value before overriding default behavior
        if (this.hash !== "") {

            // Prevent default anchor click behavior
            event.preventDefault();

            // Store hash
            var hash = this.hash;

            // Using jQuery's animate() method to add smooth page scroll
            // The optional number (900) specifies the number of milliseconds it takes to scroll to the specified area
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 900, function () {

                // Add hash (#) to URL when done scrolling (default click behavior)
                window.location.hash = hash;
            });
        } // End if
    });
});

function retrieveJSON(file, callback) {
    $.ajax({
        dataType: 'json',
        url: file,
        success: callback
    });
}

/*
function useJSON(file, callback) { 
    retrieveJSON(file, function(result) {
        let elements = Object.keys(result).length;
        callback(elements);
    });
}
*/