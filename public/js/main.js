
var tablet_width = 768; //px
var small_desktop_width = 992; //px
var large_desktop_width = 1366; //px

// "Main"
$(document).ready(function () {

    // Loads all modules on the page
    var path_file_base = "modules/";

    // Loads the homepage carousel module
    var carousel = document.getElementById('carousel-module');
    if (carousel != null) {
        var path_file_appended = path_file_base + "home/";
        path_file_appended += "carousel/";

        var appendage = "";
        var _path_file = path_file_appended + "carousel.json";
        retrieveJSON(_path_file, function (elements) {
            appendage += '<ol class="carousel-indicators">&nbsp;<li data-target="#carousel-module" data-slide-to="0" class="active"></li>&nbsp;';
            for (var _i = 1; _i < elements.length; _i++) {
                appendage += '<li data-target="#carousel-module" data-slide-to="' + _i + '"></li>&nbsp;';
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
            appendage += '<a id="carousel-control-prev" class="left carousel-control carousel-controls-reactive" style="background: none;" href="#carousel-module" role="button" data-slide="prev"><span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span><span class="sr-only">Previous</span></a><a id="carousel-control-next" class="right carousel-control carousel-controls-reactive" style="background: none;" href="#carousel-module" role="button" data-slide="next"><span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span><span class="sr-only">Next</span></a>';

            carousel.innerHTML += appendage;
        });
    }

    // Loads the partners page carousel module
    var partnerslides = document.getElementById('partners-module');
    if (partnerslides != null) {
        var _path_file_appended = path_file_base + "partners/";
        _path_file_appended += "partnerslides/";

        var _appendage = "";
        var _path_file2 = _path_file_appended + "partnerslides.json";

        retrieveJSON(_path_file2, function (elements) {
            _appendage += '<div class="row text-center"><div id="partners-carousel" class="carousel slide text-center" data-ride="carousel"><div class="carousel-inner" role="listbox">';
            for (i = 0; i < elements.length; i++) {
                var link = elements[i].link;
                var sq = "'";
                if (link == "") {
                    link = "index.htm";
                }

                if (i == 0) {
                    _appendage += '<div class="item active">';
                } else {
                    _appendage += '<div class="item">';
                }
                _appendage += '<div class="row"><div class="col-sm-2"></div><div class="col-sm-8"><a onclick="waitToLink(' + sq + link + sq + ', true)" class="card-link"><div class="card shadow square transition-shadow"><div class="panel-body"><p class="subheader">' + elements[i].name + '</p></div><div class="panel-footer"><p>' + elements[i].role + '</p><p class="smaller"><em>' + elements[i].timeframe + '</em></p></div></div></a></div><div class="col-sm-2"></div></div></div>';
            }
            _appendage += '</div>';
            _appendage += '<div class="carousel-controls-reactive"><a id="carousel-control-prev" class="left carousel-control" style="background: none; color: gray;" href="#partners-carousel" role="button" data-slide="prev"><span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span><span class="sr-only">Previous</span></a><a id="carousel-control-next" class="right carousel-control" style="background: none; color: gray;" href="#partners-carousel" role="button" data-slide="next"><span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span><span class="sr-only">Next</span></a></div>';
            _appendage += '</div></div>';
            _appendage += '<p class="text-center"><em>';
            _appendage += "These are some of our partner organizations. Click one to jump to its web page.";
            _appendage += '</em></p>';

            partnerslides.innerHTML += _appendage;
        });
    }

    // Loads the members page modules
    var members = document.getElementById('meetings-module');
    if (members != null) {
        var path_file_appended_base = path_file_base + "members/";
        var _path_file_appended2 = path_file_appended_base + "meetings/";
        var appendage_members = "";
        path_file = _path_file_appended2 + "meetings.json";

        // Loads the members module
        retrieveJSON(path_file, function (elements) {
            var element = elements[0];

            appendage_members += '<div class="row"><div class="col-sm-1"></div><div class="col-sm-10 banner"><h2>Meeting Details: ' + element.season + ' ' + element.year + '</h2><hr><br><div class="row"><div class="col-sm-1"></div><div class="col-sm-4"><em>Time</em><br><h3>' + element.time + ' ' + element.ampm + '</h3></div><div class="col-sm-2"><i class="fas fa-meteor space-down-mobile" style="font-size: 60px;"></i></div><div class="col-sm-4"><em>Place</em><br><h3><a href="' + element.bldglink + '" target="_blank">' + element.bldgabbreviation + '</a>  ' + element.room + '</h3></div><div class="col-sm-1"></div></div><div class="row"><div class="col-sm-1"></div><div class="col-sm-10"><em>' + element.pattern + '</em><br><h3><a href="' + element.pdflink + '" target="_blank">List of Dates</a></h3></div><div class="col-sm-1"></div></div><br><div class="row smaller"><div class="col-sm-1"></div><div class="col-sm-10"><p><em>For the most up-to-date meeting information, including topics, room changes, and cancellations, make sure you are subscribed to our mailing list.</em></p><p>Send all meeting-related inquiries to <a href="mailto:' + element.contactemail + '">' + element.contactemail + '</a></p></div><div class="col-sm-1"></div></div></div><div class="col-sm-1"></div></div>';

            members.innerHTML += appendage_members;
        });

        // Loads the eboard module
        var eboard = document.getElementById('eboard-module');
        if (eboard != null) {
            _path_file_appended2 = path_file_appended_base + "eboard/";
            var _appendage2 = "";
            path_file = _path_file_appended2 + "eboard.json";

            retrieveJSON(path_file, function (elements) {

                if (elements.length % 2 != 0) {
                    // there is an odd number of board members; this sets the first one in its own row

                    item = elements.shift();
                    _appendage2 += '<div class="row"><div class="col-sm-4"></div>';
                    id = "boardmemberX";
                    pic = item.img;
                    if (pic == "") {
                        pic = _path_file_appended2 + "logo.png";
                    }

                    // begin this element
                    _appendage2 += '<div class="col-sm-4 person-container">';
                    _appendage2 += eboard_append(item.position, item.name, item.classyear, item.major, item.desc, pic, id);
                    // end this element
                    _appendage2 += '</div>';
                    _appendage2 += '<div class="col-sm-4"></div></div>';
                }

                for (i = 0; i < elements.length; i++) {
                    pic = elements[i].img;
                    if (pic == "") {
                        pic = _path_file_appended2 + "logo.png";
                    }

                    // start a new row when needed
                    if (i == 0 || elements.length % 4 == 0 && i % 4 == 0 || elements.length % 4 != 0 && (i + 2) % 4 == 0) {
                        _appendage2 += '<div class="row">';
                    }

                    // left-pad the first (and only) row of two, if necessary
                    if (elements.length % 4 != 0 && i == 0) {
                        _appendage2 += '<div class="col-sm-3"></div>';
                    }

                    // set items within the row
                    // begin this element
                    _appendage2 += '<div class="col-sm-3 person-container">';
                    _appendage2 += eboard_append(elements[i].position, elements[i].name, elements[i].classyear, elements[i].major, elements[i].desc, pic, "boardmember" + i);
                    // end this element
                    _appendage2 += '</div>';

                    // right-pad the first (and only) row of two, if necessary
                    if (elements.length % 4 != 0 && i == 1) {
                        _appendage2 += '<div class="col-sm-3"></div>';
                    }

                    // end the current row when it's filled
                    if (elements.length % 4 == 0 && (i + 1) % 4 == 0 || elements.length % 4 != 0 && (i == 1 || (i + 3) % 4 == 0)) {
                        _appendage2 += '</div>';
                    }
                }

                eboard.innerHTML += _appendage2;
            });
        }
    }

    // Opens sidebar automatically if screen is wider than a pretty large pc screen; flashes shadow on search tab otherwise
    if (document.body.clientWidth > 1500) {
        open_sidebar();
    }

    // Initializes Tooltip
    $('[data-toggle="tooltip"]').tooltip();

    // Add smooth scrolling to all links to an id section within the page (e.g. navbar logo, slack table of contents, footer link)
    $(".navbar a, .sidebar a, footer a[href='#top'], a[href='#landing'], li a").on('click', function (event) {

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

    // Initializes carousels that need to be dragged
    var direction = 0; // negative for dragging left, positive for dragging right, 0 for not dragging
    var startingX = 0;
    var threshold = 50;
    $('.draggable-carousel').bind('mousedown', function (pos) {
        direction = 0;
        startingX = pos.pageX;
    }).bind('touchstart', function (pos) {
        startingX = pos.originalEvent.touches[0].pageX;
    }).bind('mousemove', function (pos) {
        direction = pos.pageX - startingX;
    }).bind('touchmove', function (pos) {
        direction = pos.originalEvent.touches[0].pageX - startingX;
    }).bind('touchend mouseup', function () {
        if (direction < -threshold) {
            document.getElementById('carousel-control-next').click();
        } else if (direction > threshold) {
            document.getElementById('carousel-control-prev').click();
        } else {}
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

// Opens the given link; if blank == true, then opens the link in a new tab
function openLink(link, blank) {
    if (blank) {
        var tab = window.open(link, '_blank');
        tab.focus();
    } else {
        window.location.href = link;
    }
}

// Waits for a delay to open a link using openLink; only waits if the screen is smaller than a small desktop sreen
function waitToLink(link, blank) {
    var delay = 500; // delay parameter, in ms
    if (document.body.clientWidth < small_desktop_width) {
        wait(delay, function () {
            openLink(link, blank);
        });
    } else {
        openLink(link, blank);
    }
}

// Functions to open/close the sidebar on the Stories and Projects pages
var prev_width = document.getElementById("page-content").style.marginLeft;

function open_sidebar() {
    var sidebar = document.getElementById("star-sidebar");
    var content = document.getElementById("page-content");
    var toggle = document.getElementById("toggle-sidebar");
    prev_width = content.style.marginLeft;

    if (document.body.clientWidth < tablet_width) {
        //document.getElementById("page-content").style.marginLeft = "75%";
        sidebar.style.width = "100%";
        sidebar.style.opacity = '0.925';
        toggle.style.display = 'none';
    } else {
        content.style.marginLeft = "25%";
        sidebar.style.width = "25%";
        toggle.onclick = close_sidebar;
    }
    toggle.innerHTML = '<p><span class="glyphicon glyphicon-chevron-down"></span></p>';
    sidebar.style.display = "block";
    content.style.overflow = 'hidden';
}

function close_sidebar() {
    var sidebar = document.getElementById("star-sidebar");
    var content = document.getElementById("page-content");
    var toggle = document.getElementById("toggle-sidebar");

    content.style.marginLeft = prev_width;
    sidebar.style.display = "none";
    sidebar.style.opacity = '1';
    toggle.style.display = "inline-block";
    toggle.innerHTML = '<p><span class="glyphicon glyphicon-search"></span></p>';
    content.style.overflow = 'auto';
    toggle.onclick = open_sidebar;
}

function close_sidebar_on_mobile() {
    if (document.body.clientWidth < tablet_width) {
        close_sidebar();
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
    appendage += '<img src="' + pic + '" class="img-circle person transition-border" alt="' + position + ': ' + name + '" width="255" height="255">';
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
