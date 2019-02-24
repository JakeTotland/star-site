
let tablet_width = 768; //px
let small_desktop_width = 992; //px
let large_desktop_width = 1366; //px
let scroll_time = 600; //ms

// "Main"
$(document).ready(function () {

    // Loads all modules on the page
    let path_file_base = "modules/";

    // Loads the homepage carousel module
    let carousel = document.getElementById('carousel-module');
    if (carousel != null) {
        let path_file_appended = path_file_base + "home/";
        path_file_appended += "carousel/";

        let appendage = "";
        let path_file = path_file_appended + "carousel.json";
        retrieveJSON(path_file, function(elements) {
            appendage += '<ol class="carousel-indicators">&nbsp;<li data-target="#carousel-module" data-slide-to="0" class="active"></li>&nbsp;';
            for (let i = 1; i < elements.length; i++) {
                appendage += '<li data-target="#carousel-module" data-slide-to="' + i + '"></li>&nbsp;';
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

            initializeDraggableCarousels();
        });
    }

    // Loads the partners page carousel module
    let partnerslides = document.getElementById('partners-module');
    if (partnerslides != null) {
        let path_file_appended = path_file_base + "partners/";
        path_file_appended += "partnerslides/";

        let appendage = "";
        let path_file = path_file_appended + "partnerslides.json";

        retrieveJSON(path_file, function(elements) {
            appendage += '<div class="row text-center"><div id="partners-carousel" class="carousel slide text-center" data-ride="carousel"><div class="carousel-inner" role="listbox">';
            for (i = 0; i < elements.length; i++) {
                let link = elements[i].link;
                let sq = "'";
                if (link == "") {
                    link = "index.htm";
                }

                if (i == 0) {
                    appendage += '<div class="item active">';
                } else {
                    appendage += '<div class="item">';
                }
                appendage += '<div class="row"><div class="col-sm-2"></div><div class="col-sm-8"><a onclick="waitToLink(' + sq + link + sq + ', true)" class="card-link"><div class="card shadow square transition-shadow"><div class="panel-body"><p class="subheader">' + elements[i].name + '</p></div><div class="panel-footer"><p>' + elements[i].role + '</p><p class="smaller"><em>' + elements[i].timeframe + '</em></p></div></div></a></div><div class="col-sm-2"></div></div></div>';
            }
            appendage += '</div>';
            appendage += '<div class="carousel-controls-reactive"><a id="carousel-control-prev" class="left carousel-control" style="background: none; color: gray;" href="#partners-carousel" role="button" data-slide="prev"><span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span><span class="sr-only">Previous</span></a><a id="carousel-control-next" class="right carousel-control" style="background: none; color: gray;" href="#partners-carousel" role="button" data-slide="next"><span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span><span class="sr-only">Next</span></a></div>';
            appendage += '</div></div>';
            appendage += '<p class="text-center"><em>';
            appendage += "These are some of our partner organizations. Click one to jump to its web page.";
            appendage += '</em></p>';

            partnerslides.innerHTML += appendage;
            
            initializeDraggableCarousels();
        });
    }        

    // Loads the members page modules
    let members = document.getElementById('meetings-module');
    if (members != null) {
        let path_file_appended_base = path_file_base + "members/";
        let path_file_appended = path_file_appended_base + "meetings/";
        let appendage_members = "";
        path_file = path_file_appended + "meetings.json";

        // Loads the meetings module
        retrieveJSON(path_file, function(elements) {
            let element = elements[0];

            appendage_members += '<div class="row space-down-tablet"><div class="col-sm-1"></div><div class="col-sm-10 banner"><h2>Meeting Details: ' + element.season + ' ' + element.year + '</h2><hr><div class="row space-down-tablet"><div class="col-sm-1"></div><div class="col-sm-4"><em>Time</em><h3>' + element.time + ' ' + element.ampm + '</h3></div><div class="col-sm-2"><i class="fas fa-meteor space-down-mobile-tiny" style="font-size: 60px;"></i></div><div class="col-sm-4"><em>Place</em><h3><a href="' + element.bldglink + '" target="_blank">' + element.bldgabbreviation + '</a>  ' + element.room + '</h3></div><div class="col-sm-1"></div></div><div class="row"><div class="col-sm-1"></div><div class="col-sm-10"><em>' + element.pattern + '</em><br><h3><a href="' + element.pdflink + '" target="_blank">List of Dates</a></h3></div><div class="col-sm-1"></div></div><div class="row smaller"><div class="col-sm-1"></div><div class="col-sm-10"><p><em>For the most up-to-date meeting information, including topics, room changes, and cancellations, make sure you are subscribed to our mailing list.</em></p><p>Send all meeting-related inquiries to <a href="mailto:' + element.contactemail + '">' + element.contactemail + '</a></p></div><div class="col-sm-1"></div></div></div><div class="col-sm-1"></div></div>';

            members.innerHTML += appendage_members;
        });

        // Loads the eboard module
        let eboard = document.getElementById('eboard-module');
        if (eboard != null) {
            path_file_appended = path_file_appended_base + "eboard/";
            let appendage = "";
            path_file = path_file_appended + "eboard.json";

            retrieveJSON(path_file, function(elements) {

                if (elements.length % 2 != 0 ) {
                    // there is an odd number of board members; this sets the first one in its own row

                    item = elements.shift();
                    appendage += '<div class="row"><div class="col-sm-4"></div>';
                    id = "boardmemberX";
                    pic = item.img;
                    if (pic == "") {
                        pic = path_file_appended + "logo.png";
                    } else {
                        pic = path_file_appended + pic;
                    }

                    // begin this element
                    appendage += '<div class="col-sm-4 person-container">'
                    appendage += eboard_append(item.position, item.name, item.classyear, item.major, item.desc, pic, id);
                    // end this element
                    appendage += '</div>';
                    appendage += '<div class="col-sm-4"></div></div>';
                }
                

                for (i = 0; i < elements.length; i++) {
                    pic = elements[i].img;
                    if (pic == "") {
                        pic = path_file_appended + "logo.png";
                    } else {
                        pic = path_file_appended + pic;
                    }

                    // start a new row when needed
                    if ((i == 0) || ((elements.length % 4 == 0) && (i % 4 == 0)) || ((elements.length % 4 != 0) && ((i + 2) % 4 == 0))) {
                        appendage += '<div class="row">';
                    }

                    // left-pad the first (and only) row of two, if necessary
                    if (elements.length % 4 != 0 && i == 0) {
                        appendage += '<div class="col-sm-3"></div>';
                    }

                    // set items within the row
                    // begin this element
                    appendage += '<div class="col-sm-3 person-container">'
                    appendage += eboard_append(elements[i].position, elements[i].name, elements[i].classyear, elements[i].major, elements[i].desc, pic, ("boardmember" + i));
                    // end this element
                    appendage += '</div>';

                    // right-pad the first (and only) row of two, if necessary
                    if (elements.length % 4 != 0 && i == 1) {
                        appendage += '<div class="col-sm-3"></div>';
                    }

                    // end the current row when it's filled
                    if (((elements.length % 4 == 0) && ((i + 1) % 4 == 0)) || ((elements.length % 4 != 0) && ((i == 1) || ((i + 3) % 4 == 0)))) {
                        appendage += '</div>';
                    }
                }

                eboard.innerHTML += appendage;
            });
        }
    }

    // Opens sidebar automatically if screen is wider than a pretty large pc screen
    if (document.body.clientWidth > 1500) {
        if (document.getElementsByClassName('sidebar').length != 0) {
            open_sidebar();
        }
    }

    // Opens the appropriate project div
    if (document.getElementById('projects-flag') != null) {
        showDivFromUrl(null);
        window.scrollTo(0, 0);
    }

    // Initializes Tooltip
    $('[data-toggle="tooltip"]').tooltip();

    // Add smooth scrolling to all links to an id section within the page (e.g. navbar logo, slack table of contents, footer link)
    $(".navbar a, .sidebar a, .slack-list li a, footer a[href='#top']").on('click', function (event) {

        // Make sure this.hash has a value before overriding default behavior
        if (this.hash !== "") {

            // Prevent default anchor click behavior
            event.preventDefault();

            // Store hash
            var hash = this.hash;

            // Using jQuery's animate() method to add smooth page scroll
            // The optional number (scroll_time) specifies the number of milliseconds it takes to scroll to the specified area
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, scroll_time, function () {

                // Add hash (#) to URL when done scrolling (default click behavior)
                window.location.hash = hash;
            });
        } // End if
    });

    // Initializes sliding for details/summary tags
    $('details summary').each(function(){
        $(this).nextAll().wrapAll('<div id="details-wrapper"></div>');
    });

    $('details').each(function() {
        if ($(this).attr('open') == 'open') {
            $(this).attr('open', 'open').find('#details-wrapper').css('display','inline');
        } else {
            $(this).attr('open','').find('#details-wrapper').css('display','none');
        }
    });
    
    $('details summary').click(function(e) {
        e.preventDefault();
        $(this).siblings('div#details-wrapper').slideToggle(function(){
            $(this).parent('details').toggleClass('open');
        });
    });

});

function retrieveJSON(file, callback) {
    $.ajax({
        dataType: 'json',
        url: file,
        success: callback
    });
}

function wait(milliseconds, callback) {
    //console.log("Waiting with " + milliseconds + " milliseconds");
    window.setTimeout(function () {
        callback();
    }, milliseconds);
}

// Initializes carousels that need to be dragged
function initializeDraggableCarousels() {
    var direction = 0; // negative for dragging left, positive for dragging right, 0 for not dragging
    var startingX = 0;
    let threshold = 50;
    $('.draggable-carousel')
    .bind('mousedown', function (pos) {
        direction = 0;
        startingX = pos.pageX;
    })
    .bind('touchstart', function (pos) {
        startingX = pos.originalEvent.touches[0].pageX;
    })
    .bind('mousemove', function (pos) {
        direction = pos.pageX - startingX;
    })
    .bind('touchmove', function (pos) {
        direction = pos.originalEvent.touches[0].pageX - startingX;
    })
    .bind('touchend mouseup', function () {
        if (direction < -threshold) {
            document.getElementById('carousel-control-next').click();
        } else if (direction > threshold) {
            document.getElementById('carousel-control-prev').click();
        } else {
        }
    });
}

// Opens the given link; if blank == true, then opens the link in a new tab
function openLink(link, blank) {
    if (blank) {
        let tab = window.open(link, '_blank');
        tab.focus();
    } else {
        window.location.href=link;
    }
}

function showDivFromUrl(name) {
    if (name == null || name == "top") {
        let url = window.location.href.split("#");
        if (url.length == 1 || url[url.length - 1] == "top") {
            name = 'landing';
        } else {
            name = url[url.length - 1];
        }
    }

    $('.project-desc').each(function(){
        $(this).addClass('hidden');
    });
    document.getElementById(name).classList.remove('hidden');
}

function openDiv(name) {
    let url = window.location.href.split("#");
    if (url.length > 1) {
        window.location.href += "#" + name;
    } else {
        window.location.href = url[0] + "#" + name;
    }

    showDivFromUrl();
    close_sidebar_on_mobile();
}

// Waits for a delay to open a link using openLink; only waits if the screen is smaller than a small desktop sreen
function waitToLink(link, blank) {
    let delay = 500; // delay parameter, in ms
    if (document.body.clientWidth < small_desktop_width) {
        wait(delay, function() {
            openLink(link, blank);
        });
    } else {
        openLink(link, blank);
    }
}

// Functions to open/close the sidebar on the Stories and Projects pages
var prev_width = 0;
function open_sidebar() {
    prev_width = document.getElementById("page-content");

    if (prev_width != null) {
        prev_width = prev_width.style.marginLeft;
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
    var mapProp = {center:myCenter, zoom:16, scrollwheel:false, draggable:true, mapTypeId:google.maps.MapTypeId.ROADMAP};
    var map = new google.maps.Map(document.getElementById("googleMap"),mapProp);
    var marker = new google.maps.Marker({position:myCenter});
    marker.setMap(map);
}

// Function to append the eboard 
function eboard_append(position, name, year, major, desc, pic, id) {
    let appendage = "";
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