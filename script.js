/*
 *  Copyright 2010 Hrishikesh Bakshi
 *  
 *  Reddit-Hide-Sidebar
 *  Shows a "Hide Sidebar" or "Show Sidebar" to hide/show reddit's sidebar.
 */

var showSidebarText = "Show Sidebar"
var hideSidebarText = "Hide Sidebar"
var showListingText = "Show Listing-Chooser"
var hideListingText = "Hide Listing-Chooser"

/* -- Show/Hide Sidebar --
*  When 'hslink' (see below) is clicked do this: */
$('body').on('click', 'a#hslink', function() {
    /* Read whether the clicked-text says to hide */
    var text = $(this).text()
    if(text == hideSidebarText) {
    	/* 1) change text, 2) hide, 3) set status */
        $(this).text(showSidebarText)
        $('div.side').hide()
        localStorage['sidebarStatus'] = 'hide'
    } else {
        $(this).text(hideSidebarText)
        $('div.side').show()
        localStorage['sidebarStatus'] = 'show'
    }
    return false
})

/* -- Show/Hide Listing-Chooser --
*  When 'hlclink' (see below) is clicked do this: */
$('body').on('click', 'a#hlclink', function() {
	/* Read whether the clicked-text says to hide */
    var text = $(this).text()
    if(text == hideListingText) {
    	/* 1) change text, 2) hide */
        $(this).text(showListingText)
        $(document.body).addClass('listing-chooser-collapsed');
        /* listing-chooser status is notstored locally because
        *  user can also click on the listing-chooser tray
        *  status is checked below by seeing if 'body'
        *  has the 'listing-chooser-collapsed' class.
        */
    } else {
        $(this).text(hideListingText)
        $(document.body).removeClass('listing-chooser-collapsed');
    }
    return false
})


/* Show Links */
var show = '<span class="separator">|</span>'+
	'<span id="hideSpan" class="showlink">'+
    '<a id="hslink" href=""></a></span>'+
    '<span class="separator">|</span>'+
    '<a id="hlclink" href=""></a></span>';

/* if sidebar status stored 'hide' then give option to 'show' */
$("div#header-bottom-right").append(show);
if (localStorage["sidebarStatus"] == "hide") {
    $('#hslink').text(showSidebarText)
} else {
    $('#hslink').text(hideSidebarText)
}
/* if listing-chooser is collapsed then give option to 'show' */
if ($("body").hasClass('listing-chooser-collapsed')) {
    $('#hlclink').text(showListingText)
} else {
    $('#hlclink').text(hideListingText)
}

