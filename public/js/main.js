
var tablet_width = 768; //px
var small_desktop_width = 992; //px
var large_desktop_width = 1366; //px
var scroll_time = 600; //ms


var spotlight_post_locations = {};
var spotlight_last_post = "";
var spotlight_first_post = "";

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

            initializeDraggableCarousels();
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

            initializeDraggableCarousels();
        });
    }

    // Loads the members page modules
    var members = document.getElementById('meetings-module');
    if (members != null) {
        var path_file_appended_base = path_file_base + "members/";
        var _path_file_appended2 = path_file_appended_base + "meetings/";
        var appendage_members = "";
        path_file = _path_file_appended2 + "meetings.json";

        // Loads the meetings module
        retrieveJSON(path_file, function (elements) {
            var element = elements[0];

            appendage_members += '<div class="row space-down-tablet"><div class="col-sm-1"></div><div class="col-sm-10 banner"><h2>Meeting Details: ' + element.season + ' ' + element.year + '</h2><hr><div class="row space-down-tablet"><div class="col-sm-1"></div><div class="col-sm-4"><em>Time</em><h3>' + element.time + ' ' + element.ampm + '</h3></div><div class="col-sm-2"><i class="fas fa-meteor space-down-mobile-tiny" style="font-size: 60px;"></i></div><div class="col-sm-4"><em>Place</em><h3><a href="' + element.bldglink + '" target="_blank">' + element.bldgabbreviation + '</a>  ' + element.room + '</h3></div><div class="col-sm-1"></div></div><div class="row"><div class="col-sm-1"></div><div class="col-sm-10"><em>' + element.pattern + '</em><br><h3><a href="' + element.pdflink + '" target="_blank">List of Dates</a></h3></div><div class="col-sm-1"></div></div><div class="row smaller"><div class="col-sm-1"></div><div class="col-sm-10"><p><em>For the most up-to-date meeting information, including topics, room changes, and cancellations, make sure you are subscribed to our mailing list.</em></p><p>Send all meeting-related inquiries to <a href="mailto:' + element.contactemail + '">' + element.contactemail + '</a></p></div><div class="col-sm-1"></div></div></div><div class="col-sm-1"></div></div>';

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
                        pic = _path_file_appended2 + "defaultpic.png";
                    } else {
                        pic = _path_file_appended2 + pic;
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
                        pic = _path_file_appended2 + "defaultpic.png";
                    } else {
                        pic = _path_file_appended2 + pic;
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

    // Loads the Spotlight page module (Sidebar)
    var sidebar_spotlight = document.getElementById('sidebar_spotlight');
    var content_spotlight = document.getElementById('content_spotlight');
    if (sidebar_spotlight != null && content_spotlight != null) {
        var _path_file_appended_base = path_file_base + "spotlight/";
        var _path_file_appended3 = _path_file_appended_base + "posts/";
        var appendage_spotlight_sidebar = "";
        var appendage_spotlight_content = "";

        // Populates the sidebar and apportions a div section for each post
        retrieveJSON(_path_file_appended_base + "manifest.json", function (elements) {
            for (i = 0; i < elements.length; i++) {
                var post_folder = elements[i][0].folder;
                if (elements[i][0].default.toUpperCase() == "OPEN") {
                    appendage_spotlight_sidebar += '<details class="sidebar-item open" open="open">';
                } else {
                    appendage_spotlight_sidebar += '<details class="sidebar-item">';
                }
                appendage_spotlight_sidebar += '<summary><em>' + elements[i][0].name + '</em></summary><ul>';
                for (j = 1; j < elements[i].length; j++) {

                    var post_file = elements[i][j].post_file;
                    appendage_spotlight_content += '<!-- Spotlight post --> <div id="' + post_file + '" class="container nonsection space-up space-down-small text-left-tablet"></div>';

                    appendage_spotlight_sidebar += '<li><a href="#' + post_file + '" onclick="openDivsThrough(\'' + post_file + '\', false, true)" class="sidebar-item btn-wide">' + elements[i][j].post_name + '</a></li>';
                    spotlight_post_locations[post_file] = _path_file_appended3 + post_folder + '/' + post_file + '/';

                    if (i == 0 && j == 1) {
                        spotlight_first_post = post_file;
                    } else if (i == elements.length - 1 && j == elements[i].length - 1) {
                        spotlight_last_post = post_file;
                    }
                }
                appendage_spotlight_sidebar += '</ul></details>';
            }

            sidebar_spotlight.innerHTML += appendage_spotlight_sidebar;
            content_spotlight.innerHTML += appendage_spotlight_content;
            initializeDetailsSliders();
            initializeSidebar();

            // Loads the Spotlight page post that each other url refers to, if the corresponding div is in view
            $(window).scroll(function () {
                for (var key in spotlight_post_locations) {
                    var post = document.getElementById(key);
                    if (isInView(post) && !post.classList.contains("populated")) {
                        openDiv(key, false, false);
                    }
                }
            });

            // Loads the Spotlight page post that the current url refers to (NOTE: must also load all the ones before it)
            openDivsThrough(null, false, true);
        });
    }

    // Loads the Projects page module (Sidebar) (TODO)
    var sidebar_projects = document.getElementById('sidebar_projects');
    if (sidebar_projects != null) {
        initializeDetailsSliders();
        initializeSidebar();
    }

    // Opens the appropriate project div
    if (document.getElementById('projects-flag') != null) {
        showDivFromUrl(null);
        window.scrollTo(0, 0);
    }

    // Initializes Tooltip
    $('[data-toggle="tooltip"]').tooltip();

    initializeSmoothScrolling(".navbar a, .slack-list li a, footer a[href='#top']");
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
}

// Initializes sliding for details/summary tags
function initializeDetailsSliders() {
    $('details summary').each(function () {
        $(this).nextAll().wrapAll('<div id="details-wrapper"></div>');
    });

    $('details').each(function () {
        if ($(this).attr('open') == 'open') {
            $(this).attr('open', 'open').find('#details-wrapper').css('display', 'inline');
        } else {
            $(this).attr('open', '').find('#details-wrapper').css('display', 'none');
        }
    });

    $('details summary').click(function (e) {
        e.preventDefault();
        $(this).siblings('div#details-wrapper').slideToggle(function () {
            $(this).parent('details').toggleClass('open');
        });
    });
}

// Initializes the sidebar to be open on large screens
function initializeSidebar() {
    // Opens sidebar automatically if screen is wider than a pretty large pc screen
    if (document.body.clientWidth > 1500) {
        if (document.getElementsByClassName('sidebar').length != 0) {
            open_sidebar();
        }
    }
}

// Add smooth scrolling to all links to an id section within the page (e.g. navbar logo, slack table of contents, footer link)
function initializeSmoothScrolling(tags) {
    $(tags).on('click', function (event) {

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
        }
    });
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

function smoothScrollToDiv(div) {
    $('html, body').animate({
        scrollTop: $("#" + div).offset().top
    }, scroll_time);
}

function showDivFromUrl(name) {
    if (name == null || name == "top") {
        var url = window.location.href.split("#");
        if (url.length == 1 || url[url.length - 1] == "top") {
            name = 'landing';
        } else {
            name = url[url.length - 1];
        }
    }

    $('.project-desc').each(function () {
        $(this).addClass('hidden');
    });
    document.getElementById(name).classList.remove('hidden');
}

function openDiv(name, projects_rules, scroll) {

    if (projects_rules) {
        // projects means that only this div will be shown; all others will be hidden, and the JSON format for Projects posts will be followed. otherwise, Spotlight format will be followed
        window.location.hash = name;
        showDivFromUrl();

        if (scroll) {
            smoothScrollToDiv(name);
        }
    } else {
        var post_section = document.getElementById(name);

        if (!post_section.classList.contains("populated")) {
            post_section.classList.add("populated");

            var post_address = spotlight_post_locations[name];

            retrieveJSON(post_address + "post.json", function (element) {
                var post_img = element.img;
                if (post_img == "") {
                    post_img = 'modules/spotlight/defaultpic.png';
                } else {
                    post_img = post_address + post_img;
                }

                var post_content = '<div class="row center-vertical-tablet"><div class="col-sm-1"></div><div class="col-sm-10 space-down space-up"><div class="carousel-slide-holder">';

                post_content += '<div style="background-image: url(\'' + post_img + '\');" class="carousel-slide rounded"></div></div></div><div class="col-sm-1"></div></div>';
                post_content += '<div class="row text-center"><div class="col-sm-1"></div><div class="col-sm-10">';
                post_content += '<h3>' + element.full_title + '</h3><p>by ' + element.author + '</p>';
                post_content += '<p class="small"><span class="glyphicon glyphicon-time"></span> ' + element.month_written + ' ' + element.day_written + ',' + element.year_written + '</p></div><div class="col-sm-1"></div></div><br>';

                post_content += '<div class="row center-vertical-tablet"><div class="col-sm-1"></div><div class="col-md-10"><p>' + element.paragraphs[0] + '</p>';

                for (i = 1; i < element.paragraphs.length; i++) {
                    post_content += '<br><p>' + element.paragraphs[i] + '</p>';
                }
                post_content += '</div><div class="col-sm-1"></div></div>';

                //if (name != spotlight_last_post) {
                post_content += '<hr>';
                //}

                post_section.innerHTML = post_content;
                if (scroll) {
                    smoothScrollToDiv(name);
                }
            });
        } else {
            if (scroll) {
                smoothScrollToDiv(name);
            }
        }
    }

    close_sidebar_on_mobile();
}

function openDivsThrough(name, projects_rules, scroll) {
    var section = name;
    var directed = false;

    if (section == null) {
        var url = window.location.href.split("#");
        section = spotlight_first_post;
        if (url.length > 1) {
            if (url[1] != "top") {
                directed = true;
                section = url[1];
            }
        }
    } else {
        directed = true;
    }

    for (var key in spotlight_post_locations) {

        if (key == section) {
            if (!directed) {
                openDiv(key, projects_rules, false);
            } else {
                openDiv(key, projects_rules, scroll);
            }

            break;
        } else {
            openDiv(key, projects_rules, false);
        }
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

// Check if an element is scrolled into view (Thanks to Jakub T. Jankewicz)
function isInView(div) {
    var rect = div.getBoundingClientRect();
    var element_top = rect.top;
    var element_bottom = rect.bottom;

    // Only completely visible elements return true:
    //var is_visible = (element_top >= 0) && (element_bottom <= window.innerHeight);

    // Partially visible elements return true:
    var is_visible = element_top < window.innerHeight && element_bottom >= 0;
    return is_visible;
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
