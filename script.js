/*
 *  Copyright 2010 Hrishikesh Bakshi
 *  
 *  Reddit-Hide-Sidebar
 *  Shows a "Hide Sidebar" or "Show Sidebar" to hide/show reddit's sidebar.
 */

var showText = "Show Sidebar"
var hideText = "Hide Sidebar"
var cssId    = "sidebarhider"

$('body').on('click', 'a#hslink', function() {
    var text = $(this).text()
    if(text == hideText) {
        $(this).text(showText)
        $('div.side').hide()
        hideUsingCss()
        localStorage['hideStatus'] = 'hide'
    } else {
        $(this).text(hideText)
        $('div.side').show()
        localStorage['hideStatus'] = 'show'
        showUsingCss()
    }
    return false
})

var show = '<span id="hideSpan" class="showlink">'+
    '<a id="hslink" href=""></a></span>';

$("div#header-bottom-right").append('<span class="separator">|</span>');
$("div#header-bottom-right").append(show);
if (localStorage["hideStatus"] == "hide") {
    $('div.side').hide()
    hideUsingCss()
    $('#hslink').text(showText)
} else {
    showUsingCss()
    $('#hslink').text(hideText)
}

function hideUsingCss() {
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = "body > div.content {margin-right:5px;}";
    css.id = cssId;
    document.body.appendChild(css);
}

function showUsingCss() {
    var cssNode = document.getElementById(cssId);
    cssNode && cssNode.parentNode.removeChild(cssNode)
}

