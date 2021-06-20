
var base_url = $('#base_url').data('url');
console.log(base_url);

$(document).ready(function(){
    //Add message
    $('#reply-message-form button[type="submit"]').click(function() {
        $('.loading').show();

        let messages = $('#reply-message').val();

        if (!messages) {
            $('#text_msg').empty().html('<p style="font-size:12px;">Oops, don\'t forget your message!</p>');
            $('.success_body').show();
            return false;
        } else {
            $('#text_msg').empty();
        }

        $.ajax({
            url: base_url + '/admin/messages/add-message-detail',
            type: "POST",
            data: new FormData($('#reply-message-form')[0]),
            cache: false,
            contentType: false,
            processData: false,
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
            },
            success: function (response) {
                $('.loading').hide();
                $('#text_msg').html('<p style="font-size:12px;">' + response.msg + '</p>');
                $('.success_body').show();
            }
        });

        return false;
    });
    
    //Display message in page Chatbox 
    var box_item = $( ".box_count" ).length;
        $( ".result_demo" ).text( "There are " + box_item + " box item.");

    var box_hide = box_item - 4;
    $(".box_count:gt("+ box_hide +")").each(function (item) {
            $('', {item}).prependTo(this);
        }).css("display", "inline-block");

    if(box_item > 4) {
        var item_none = box_item - 4;
        $(".box_count:nth-child(1)").after("<div class='col-md-12 col-sm-12 col-xs-12 view_item pointer'><a class='btn_view'>View " + 
            "<span>" + item_none + "</span> read messages </a></div>");
    }
    else {
        $(".box_count").css("display", "inline-block");
    }

    $('.btn_view').on("click", function() {
        $('.box_count').css("display", "inline-block");
        $('.content_messages').css("display", "block");
        $('.box_item_3 p').css("display", "none");
        $('.view_item').css("display", "none");
    })

    //When the button is clicked, Box order summarry display
    $('.show_order').click(function() {
        $(".order_summarry").css("display", "block");
        $(".wrapper").css("overflow", "hidden");
    });

    //Close Order Summarry
    $('.close_off').click(function() {
        $(".order_summarry").css("display", "none");
    });

    //Button Trash in page Messages and Custommer Service (Chat Box)
    $("#delete_item").on("click", function() {
        $(".bar_item_1 input:checked").parent().parent().parent().remove();

        //If No conversations.
        var bar_item = $('.bar_item');
        if (bar_item.length == false) {
            $('.no_messages').css("display", "block");
            $('.bar_table').css("border", "none");
        }
    });

    //Off disabled page chatbox
    $(('.box_main button')).attr('disabled',false);
    $(('.quote_tool button')).attr('disabled',false);

    //When click 'This Listing'
    $('.bar_right_top').on("click", function() {
        $(this).parent().parent().find('.bar_toggle').toggle();

        if ($(this).parent().find('.bar_toggle').css('display') == 'none') {
            $(this).css("border-bottom", "none");
        }
        else {
            $(this).css("border-bottom", "1px solid #ccc");
        }
    });

    //When click 'Reply to Message'
    $('.reply_quote').on("click", function() {
        $(this).parent().find('.reply_form').toggle();
        $('.create_content').css("display","none");
    });

    //Attact Image in Reply form 
    //Change
    $(document).on('click', '#reply_btn', function() {
        $('#reply_input').prop('value', null);
        $('#reply_input').click();
    });

    //Delete
    $('body').delegate('#reply_result_img i','click',function(){
        $(this).parent().parent().remove();
    });

    //Clicked image and open in new tab
    $ ('.content_messages a [href]'). click (function () {
        window.open (this.href);
        return false;
    });

    //Display messages box when click
    $('.box_item_right').click(function() {
        $(this).find(".content_messages").css("display", "block");

        if ($(this).find('.content_messages').css('display') == 'none') {
            $(this).find(".box_item_3").css("display", "block");
            $(this).find(".box_change").css("display", "block");
        }
        else {
            $(this).find(".box_item_3").css("display", "none");
            $(this).find(".box_change").css("display", "none");
        }
    });

    //When click 'Create Quote'
    $('.btn_create').on("click", function() {
        $(this).parent().find('.create_content').toggle();
        $('.reply_form').css("display","none");

    }); 

});

function previewImgReply(event) {
    var files = document.getElementById('reply_input').files;
    for (i = 0; i < files.length; i++) {
        $('#reply_result_img').append('<div class="file_img"><span>'+ files[i].name +
            '<i class="fa fa-times-circle" aria-hidden="true"></i></span></div>');
    }
}