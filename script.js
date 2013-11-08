/*
 *  Copyright 2010 Hrishikesh Bakshi
 *  
 *  Reddit-Hide-Sidebar
 *  Shows a "Hide Sidebar" or "Show Sidebar" to hide/show reddit's sidebar.
 */

var showText = "Show Sidebar";
var hideText = "Hide Sidebar";
var marginCutOff = 50;
var contentLeft = $('div.content').css('margin-left');
var contentRight = $('div.content').css('margin-right');
var commentLeft = $('div.commentarea').css('margin-left');
var commentRight = $('div.commentarea').css('margin-right');

$('body').on('click', 'a#hslink', function() {
    var text = $(this).text();
    if(text == hideText) {
        $(this).text(showText);
        $('div.side').hide();
        removeMargins();
        localStorage['hideStatus'] = 'hide'
    } else {
        $(this).text(hideText);
        addMargins();
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
    removeMargins();
    $('#hslink').text(showText);
} else {
    $('#hslink').text(hideText);
}

function removeMargins() {
    setMargin('div.content', 'margin-left', '0px', contentLeft);
    setMargin('div.content', 'margin-right', '0px', contentRight);
    setMargin('div.commentarea', 'margin-left', '0px', commentLeft);
    setMargin('div.commentarea', 'margin-right', '0px', commentRight);
}

function addMargins() {
    setMargin('div.content', 'margin-left', contentLeft);
    setMargin('div.content', 'margin-right', contentRight);
    setMargin('div.commentarea', 'margin-left', commentLeft);
    setMargin('div.commentarea', 'margin-right', commentRight);
}

function setMargin(selector, style, val, orig) {
    if(typeof orig === "undefined") {
        orig = val;
    }
    if(parseInt(orig) > marginCutOff) {
        $(selector).css(style, val, true);
    }
}
