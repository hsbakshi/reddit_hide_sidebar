/*
 *  Copyright 2010 Hrishikesh Bakshi
 *  
 *  Reddit-Hide-Sidebar
 *  Shows a "Hide Sidebar" or "Show Sidebar" to hide/show reddit's sidebar.
 */

var showText = "Show Sidebar"
var hideText = "Hide Sidebar"

$('body').on('click', 'a#hslink', function() {
    var text = $(this).text()
    if(text == hideText) {
        $(this).text(showText)
        $('div.side').hide()
        localStorage['hideStatus'] = 'hide'
    } else {
        $(this).text(hideText)
        $('div.side').show()
        localStorage['hideStatus'] = 'show'
    }
    return false
})

var show = '<span id="hideSpan" class="showlink">'+
    '<a id="hslink" href=""></a></span>';

$("div#header-bottom-right").append('<span class="separator">|</span>');
$("div#header-bottom-right").append(show);
if (localStorage["hideStatus"] == "hide") {
    $('div.side').hide()
    $('#hslink').text(showText)
} else {
    $('#hslink').text(hideText)
}

