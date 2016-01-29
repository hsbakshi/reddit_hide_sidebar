/*
 *  Copyright 2010 Hrishikesh Bakshi
 *  
 *  Reddit-Hide-Sidebar
 *  Shows a "Hide Sidebar" or "Show Sidebar" to hide/show reddit's sidebar.
 *  Responsively hides and shows the Sidebar and Listing-Chooser based on width.
 *  Responsiveness is disabled by "Lock Sides."
 */

var showSidebarText = "Show Sidebar";
var hideSidebarText = "Hide Sidebar";
var lockSidesText   = "Lock Sides";
var unlockSidesText = "Unock Sides";
var breakpoint = 800;
var show = '<span class="separator">|</span>'+
    '<span id="hideSpan" class="showlink">'+
    '<a id="hslink" href=""></a></span>'+
    '<span class="separator">|</span>'+
    '<a id="hblock" href=""></a></span>';

function hideSidebar() {
    /* 1) change text, 2) hide, 3) set status */
    $("a#hslink").text(showSidebarText);
    $('div.side').hide();
    localStorage['sidebarStatus'] = 'hide';
}
function showSidebar() {
    $("a#hslink").text(hideSidebarText);
    $('div.side').show();
    localStorage['sidebarStatus'] = 'show';
}
function hideListingChooser() {
    $(document.body).addClass('listing-chooser-collapsed');
    /* listing-chooser status is not stored locally because
    *  user can also click on the listing-chooser tray
    *  status is checked below by seeing if 'body'
    *  has the 'listing-chooser-collapsed' class.
    */
}
function showListingChooser() {
    $(document.body).removeClass('listing-chooser-collapsed');
}
function lockSides() {
    $("a#hblock").text(unlockSidesText);
    localStorage["sides"] = "locked";
}
function unlockSides() {
    $("a#hblock").text(lockSidesText);
    localStorage["sides"] = "unlocked";
}
function respond() {
    if ($( window ).width() < breakpoint) {
        hideSidebar();
        hideListingChooser();
    } else {
        showSidebar();
        showListingChooser();
    }
}

$( document ).ready(function() {
    $("div#header-bottom-right").append(show);
    
    $('#hblock').text(lockSidesText);
    if (localStorage["sides"] == "unlocked") {
        respond();
    } else {
        if (localStorage["sidebarStatus"] == "hide") {
            hideSidebar();
            $('#hslink').text(showSidebarText);
        } else {
            showSidebar();
            $('#hslink').text(hideSidebarText);
        }
        if ($("body").hasClass('listing-chooser-collapsed')) {
            $('#hlclink').text(showListingText);
        } else {
            $('#hlclink').text(hideListingText);
        }
    }

});

$( window ).resize(function() {
    if (localStorage["sides"] == "unlocked") {
        respond();
    }
});

/* -- Show/Hide Sidebar -- */
$('body').on('click', 'a#hslink', function() {
    /* Read whether the clicked-text says to hide */
    var text = $(this).text();
    if(text == hideSidebarText) { hideSidebar(); }
        else { showSidebar(); }
    return false;
});

/* -- Lock/Unlock Sides -- */
$('body').on('click', 'a#hblock', function() {
    respond();
    /* Read whether the clicked-text says to lock */
    var text = $(this).text();
    if(text == lockSidesText) { lockSides(); }
        else { unlockSides(); }
    return false;
});