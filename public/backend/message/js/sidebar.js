
// Sidebar Menu
$(function() {
    var sidebarCollapse = $('#sidebarCollapse');
        sidebar         = $('#sidebar');
        menuHeight      = sidebar.height();
 
    $(sidebarCollapse).on('click', function(e) {
        e.preventDefault();
        sidebar.slideToggle();
    });
});

$(window).resize(function(){
    var w = $(window).width();
    if(w > 320 && sidebar.is(':hidden')) {
        sidebar.removeAttr('style');
    }
});


// Sidebar Dropdown Toggle
$(function() {
    $('.dropdown-toggle').click(function(){
        $(this).next('.dropdown-level').toggle();
    });
});

