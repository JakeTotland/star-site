
var tablet_width = 768; //px
var small_desktop_width = 992; //px

// "Main"
$(document).ready(function () {

    // Loads all modules on the page
    var path_file_base = "modules/";

    // Loads the homepage carousel module
    var carousel = document.getElementById('myCarousel');
    if (carousel != null) {
        var path_file_appended = path_file_base + "home/";
        path_file_appended += "carousel/";

        var appendage = "";
        var path_file = path_file_appended + "carousel.json";
        retrieveJSON(path_file, function (elements) {
            appendage += '<ol class="carousel-indicators">&nbsp;<li data-target="#myCarousel" data-slide-to="0" class="active"></li>&nbsp;';
            for (var _i = 1; _i < elements.length; _i++) {
                appendage += '<li data-target="#myCarousel" data-slide-to="' + _i + '"></li>&nbsp;';
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

    // Loads the members page eboard module
    var eboard = document.getElementById('eboard');
    if (eboard != null) {
        var _path_file_appended = path_file_base + "members/";
        _path_file_appended += "eboard/";
        var _appendage = "";
        var _path_file = _path_file_appended + "eboard.json";

        retrieveJSON(_path_file, function (elements) {

            if (elements.length % 2 != 0) {
                // there is an odd number of board members; this sets the first one in its own row

                item = elements.shift();
                _appendage += '<div class="row"><div class="col-sm-4"></div>';
                id = "boardmemberX";
                pic = item.img;
                if (pic == "") {
                    pic = _path_file_appended + "logo.png";
                }

                // begin this element
                _appendage += '<div class="col-sm-4 person-container">';
                _appendage += eboard_append(item.position, item.name, item.classyear, item.major, item.desc, pic, id);
                // end this element
                _appendage += '</div>';
                _appendage += '<div class="col-sm-4"></div></div>';
            }

            for (i = 0; i < elements.length; i++) {
                pic = elements[i].img;
                if (pic == "") {
                    pic = _path_file_appended + "logo.png";
                }

                // start a new row when needed
                if (i == 0 || elements.length % 4 == 0 && i % 4 == 0 || elements.length % 4 != 0 && (i + 2) % 4 == 0) {
                    _appendage += '<div class="row">';
                }

                // left-pad the first (and only) row of two, if necessary
                if (elements.length % 4 != 0 && i == 0) {
                    _appendage += '<div class="col-sm-3"></div>';
                }

                // set items within the row
                // begin this element
                _appendage += '<div class="col-sm-3 person-container">';
                _appendage += eboard_append(elements[i].position, elements[i].name, elements[i].classyear, elements[i].major, elements[i].desc, pic, "boardmember" + i);
                // end this element
                _appendage += '</div>';

                // right-pad the first (and only) row of two, if necessary
                if (elements.length % 4 != 0 && i == 1) {
                    _appendage += '<div class="col-sm-3"></div>';
                }

                // end the current row when it's filled
                if (elements.length % 4 == 0 && (i + 1) % 4 == 0 || elements.length % 4 != 0 && (i == 1 || (i + 3) % 4 == 0)) {
                    _appendage += '</div>';
                }
            }

            eboard.innerHTML += _appendage;
        });
    }

    // Initializes Tooltip
    $('[data-toggle="tooltip"]').tooltip();

    // Add smooth scrolling to all links to an id section within the page (e.g. navbar logo, slack table of contents, footer link)
    $(".navbar a, footer a[href='#top'], li a").on('click', function (event) {

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
        wait(500, function () {
            window.location.href = link;
        });
    } else {
        window.location.href = link;
    }
}

// Google Maps widget
function myMap() {
    var myCenter = new google.maps.LatLng(40.522724, -74.462830);
    var mapProp = { center: myCenter, zoom: 16, scrollwheel: false, draggable: true, mapTypeId: google.maps.MapTypeId.ROADMAP };
    var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
    var marker = new google.maps.Marker({ position: myCenter });
    marker.setMap(map);
}

// Function to append the eboard 
function eboard_append(position, name, year, major, desc, pic, id) {
    var appendage = "";
    appendage += '<a href="#' + id + '" data-toggle="collapse"><p class="text-center"><strong>' + position + '</strong><br>' + name + '</p>';
    appendage += '<img src="' + pic + '" class="img-circle person" alt="' + position + ': ' + name + '" width="255" height="255">';
    //appendage += '<div class="eboard-person" style="background-image: url(' + pic + ');"></div>';
    appendage += '</a><div id="' + id + '" class="collapse"><div class="details-eboard">';
    if (major != "") {
        appendage += '<p>' + major + '</p>';
    }
    if (year != "") {
        appendage += '<p><em>Class of ' + year + '</em></p>';
    }
    if (desc != "") {
        appendage += '<p>' + desc + '</p>';
    }
    appendage += '</div></div>';
    return appendage;
}
