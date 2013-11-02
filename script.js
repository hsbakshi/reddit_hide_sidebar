/*
 *  Copyright 2010 Hrishikesh Bakshi
 *  
 *  Reddit-Hide-Sidebar
 *  Shows a "Hide Sidebar" or "Show Sidebar" to hide/show reddit's sidebar.
 */

var showText = "Show Sidebar";
var hideText = "Hide Sidebar";
var contentMargin = $('div.content').css('margin-right');
var marginCutOff = 50;

$('body').on('click', 'a#hslink', function() {
    var text = $(this).text();
    if(text == hideText) {
        $(this).text(showText);
        $('div.side').hide();
        removeMargin();
        localStorage['hideStatus'] = 'hide'
    } else {
        $(this).text(hideText);
        addMargin();
        $('div.side').show();
        localStorage['hideStatus'] = 'show';
    }
    return false;
})

var show = '<span id="hideSpan" class="showlink">'+
    '<a id="hslink" href=""></a></span>';

$("div#header-bottom-right").append('<span class="separator">|</span>');
$("div#header-bottom-right").append(show);
if (localStorage["hideStatus"] == "hide") {
    $('div.side').hide();
    removeMargin();
    $('#hslink').text(showText);
} else {
    $('#hslink').text(hideText);
}

function removeMargin() {
    if(parseInt(contentMargin) > marginCutOff) {
        $('div.content').css('margin-right', '0px', true);
    }
}

function addMargin() {
    if(parseInt(contentMargin) > marginCutOff) {
        $('div.content').css('margin-right', contentMargin, true);
    }
}
