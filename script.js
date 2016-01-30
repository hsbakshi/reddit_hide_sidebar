/*
 *  Original work Copyright 2010 Hrishikesh Bakshi
 *  Modified work Copyright 2016 Daniel McKnight
 *  
 *  Reddit-Hide-Sidebar
 *  Responsively or manually hide Reddit's sidebar.
 */

var showSidebarText = "Show Sidebar";
var hideSidebarText = "Hide Sidebar";
var lockSidebarText   = "Lock Sidebar";
var unlockSidebarText = "Unlock Sidebar";
var breakpoint = 768;
var show = '<span class="separator">|</span>'+
    '<span id="hideSpan" class="showlink">'+
    '<a id="lockLink" href=""></a></span>'+
    '<span class="separator">|</span>'+
    '<a id="hslink" href=""></a></span>';

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
function lockSidebar() {
    $("a#lockLink").text(unlockSidebarText);
    localStorage["lockStatus"] = "locked";
}
function unlockSidebar() {
    $("a#lockLink").text(lockSidebarText);
    localStorage["lockStatus"] = "unlocked";
}
function respond() {
    if ($( window ).width() < breakpoint) {
        hideSidebar();
    } else {
        showSidebar();
    }
}

$( document ).ready(function() {
    $("div#header-bottom-right").append(show);
    
    $('#lockLink').text(lockSidebarText);
    if (localStorage["lockStatus"] == "unlocked") {
        respond();
    } else {
        if (localStorage["sidebarStatus"] == "hide") {
            hideSidebar();
            $('#hslink').text(showSidebarText);
        } else {
            showSidebar();
            $('#hslink').text(hideSidebarText);
        }
    }

});

$( window ).resize(function() {
    if (localStorage["lockStatus"] == "unlocked") {
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

/* -- Lock/Unlock Sidebar -- */
$('body').on('click', 'a#lockLink', function() {
    /* Read whether the clicked-text says to lock */
    var text = $(this).text();
    if(text == lockSidebarText) {
    	lockSidebar();
    } else {
       	unlockSidebar();
       	respond();
    }
    return false;
});
