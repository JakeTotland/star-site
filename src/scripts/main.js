
let tablet_width = 768; //px
let small_desktop_width = 992; //px

// "Main"
$(document).ready(function () {
    // Loads all modules on the page
    let path_file_base = "modules/";

    // Loads the homepage modules
    let path_file_appended = path_file_base + "home/";

    // Loads the carousel module
    path_file_appended += "carousel/";
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
                appendage += '<div class="carousel-slide-holder"><div class="carousel-slide" style="background-image: url(' + path_file_appended + elements[i].img + ');"></div><div class="carousel-caption"><p>' + elements[i].desc + '</p></div></div></div>';
                //appendage += '<img src="' + path_file_appended + elements[i].img + '" alt="' + elements[i].name + '" width="1200" height="700"><div class="carousel-caption"><p>' + elements[i].desc + '</p></div></div>';
            }
            appendage += '</div>';
            appendage += '<a class="left carousel-control" href="#myCarousel" role="button" data-slide="prev"><span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span><span class="sr-only">Previous</span></a><a class="right carousel-control" href="#myCarousel" role="button" data-slide="next"><span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span><span class="sr-only">Next</span></a>';

            carousel.innerHTML += appendage;
        });
    }

    // Initialize Tooltip
    $('[data-toggle="tooltip"]').tooltip();

    // Add smooth scrolling to all links to an id section within the page (e.g. navbar logo, slack table of contents, footer link)
    $(".navbar a, footer a[href='#myPage'], li a").on('click', function (event) {

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

function wait(milliseconds, callback) {
    //console.log("Waiting with " + milliseconds + " milliseconds");
    window.setTimeout(function () {
        callback();
    }, milliseconds);
}

// Waits for 500 milliseconds to open a link, if the screen is smaller than a small desktop sreen
function waitToLink(link) {
    if (document.body.clientWidth < small_desktop_width) {
        wait(500, function() {
            window.location.href=link;
        });
    } else {
        window.location.href=link;
    }
}

// Google Maps widget
function myMap() {
    var myCenter = new google.maps.LatLng(40.522724, -74.462830);
    var mapProp = {center:myCenter, zoom:16, scrollwheel:false, draggable:true, mapTypeId:google.maps.MapTypeId.ROADMAP};
    var map = new google.maps.Map(document.getElementById("googleMap"),mapProp);
    var marker = new google.maps.Marker({position:myCenter});
    marker.setMap(map);
}