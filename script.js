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
    '<a id="sidebarLock" href=""></a></span>'+
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
    $("a#sidebarLock").text(unlockSidebarText);
    localStorage["sides"] = "locked";
}
function unlockSidebar() {
    $("a#sidebarLock").text(lockSidebarText);
    localStorage["sides"] = "unlocked";
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
    
    $('#sidebarLock').text(lockSidebarText);
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

/* -- Lock/Unlock Sidebar -- */
$('body').on('click', 'a#sidebarLock', function() {
    respond();
    /* Read whether the clicked-text says to lock */
    var text = $(this).text();
    if(text == lockSidebarText) { lockSidebar(); }
        else { unlockSidebar(); }
    return false;
});
