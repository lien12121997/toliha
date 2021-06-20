
var base_url = $('#base_url').data('url');

// Js Message Page
$(window).on('load', function() {
    if (window.location.hash) {
        var page = window.location.hash.replace('#', '');
        if (page == Number.NaN || page <= 0) {
            getPosts(1);
        } else {
            getPosts(page);
        }
    } else {
        getPosts(1);
    }
});

$(document).ready(function() {
    var timeout = null;

    $(document).on('click', '.pagination a', function (e) {
        getPosts($(this).attr('href').split('page=')[1]);
        e.preventDefault();
    });

    $('[name="search"]').keyup(function() {
        let search_string = $(this).val();
        clearTimeout(timeout);

        if (search_string.length > 2 || search_string.length == 0) {
            timeout = setTimeout(function(){ 
                getPosts(1);
            }, 1500);
        }
    });
});

function getPosts(page) {
    $('.loading').show();

    $.ajax({
        url : '?page=' + page,
        data: {search : $('[name="search"]').val()},
        dataType: 'json',
    }).done(function (data) {
        $('.loading').hide();
        $('.bar_table').empty().html(data);
        location.hash = page;
    }).fail(function (error) {
        $('.loading').hide();
        alert('Posts could not be loaded.');
    });
}

