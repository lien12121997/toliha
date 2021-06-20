
var base_url = $('#base_url').data('url');

$(document).ready(function() {
	// Add new message
    $('#compose button[type="submit"]').click(function() {
        $('.loading').show();

        let contact_user = $('[name="contact_user"]').val();
        let subject = $('[name="subject"]').val();
        let messages = $('[name="messages"]').val();

        if (!contact_user || !subject || !messages) {
            $('#compose .errors').empty().html('<p style="font-size:12px;">Oops, don\'t forget your subject, message and recipient!</p>');
            return false;
        } else {
            $('#compose .errors').empty();
        }

        $.ajax({
            url: base_url + '/admin/messages/add-message',
            type: "POST",
            data: new FormData($('#compose')[0]),
            cache: false,
            contentType: false,
            processData: false,
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
            },
            success: function (response) {
                $('.loading').hide();
                
                if (response.status == 0) {
                    $('#compose .errors').html('<p style="font-size:12px;">' + response.msg + '</p>');
                } else {
                    $('.new-conversation').hide();
                    $('#compose #subject').prop('value', null);
                    $('#compose #messages').empty();
                    $('#compose_popup #compose_msg').append('<p style="font-size: 12px;">' + response.msg + '</p>');
                    $('#compose_popup').show();
                }
            }
        });
        return false;
    });

    // If checked, The button is display (Item)
	$('body').delegate('li[class^="bar_checked"]', 'click', function() {
		$( "#archive_item" ).on( "click", function(){
			let messages = countChecked();
			moveMessage(messages, 'archived', 'admin');
		});

		$( "#mark_unread" ).on( "click", function(){
			let messages = countChecked();
			moveMessage(messages, 'unread', 'admin');
		});

		$( "#mark_read" ).on( "click", function(){
			let messages = countChecked();
			moveMessage(messages, 'read', 'admin');
		});

		$( "#report_spam" ).on( "click", function(){
			let messages = countChecked();
			moveMessage(messages, 'spam', 'admin');
		});
	});

	// Change message status or folder in conversation page
	$('.individual_status').click(function(){
		let action = $(this).attr('id');
		let id = $('#item_target').data('target');
		let user = $('#item_target').data('user');

		updateMessageStatus(action, id, user);
	});

    // Button Trash in page Messages and Custommer Service (Item)
	$("#delete_item").on("click", function() {
		if ($('.box_content').length) { 
			return false; 
		}

		messages = countChecked();
		moveMessage(messages, 'trash', 'admin');
	});

	//If checked, The button is display (Item)
	var CheckItem = function() {
		$('body').delegate('[name="check_item"]', 'click', function() {
		    var count_checked = $("[name='check_item']:checked").length; // Count the checked rows
		    
	        if(count_checked >= 1) {
	            $('[class^="bar_group"]').attr('disabled',false); 
	            $(('.bar_more button')).attr('disabled',false);
	            $(('.bar_move button')).attr('disabled',false);
	            $(('.bar_trash button')).attr('disabled',false);
	        }
	        else {
	        	$(('[class^="bar_group"]')).attr('disabled',true);
	            $(('.bar_more button')).attr('disabled',true);
	            $(('.bar_move button')).attr('disabled',true);
	            $(('.bar_trash button')).attr('disabled',true);
	            $("#checked_all").prop('checked', false);
	        }
		});
	};
	CheckItem();

	var CheckAll = function() {
		$('body').delegate('#checked_all', 'click', function() {
		    if($(this).is(':checked')) {
		    	$('[class^="bar_group"]').attr('disabled',false); 
	            $(('.bar_more button')).attr('disabled',false);
	            $(('.bar_move button')).attr('disabled',false);
	            $(('.bar_trash button')).attr('disabled',false);
		    }
		    else {
		    	$(('[class^="bar_group"]')).attr('disabled',true);
	            $(('.bar_more button')).attr('disabled',true);
	            $(('.bar_move button')).attr('disabled',true);
	            $(('.bar_trash button')).attr('disabled',true);
		    }
		});
	};
	CheckAll();

	//When the button is clicked, Box Composer display
	$('.bar_compose').click(function() {
        $(".compose_chatbox").css("display", "block");
        $(".wrapper").css("overflow", "hidden");
    });

    //Close Compose
	$('.close_off').click(function() {
        $(".compose_chatbox").css("display", "none");
    });

    //Attact Image when click composer
	//Change Input to Button Attact Images
	$(document).on('click', '#btn_attact', function() {
        $('#input_attact').prop('value', null);
        $('#input_attact').click();
    });

	//Delete Image in Attact Image
	$('body').delegate('#result_img i','click',function(){
        $(this).parent().parent().remove();
    });

	// Checked All CheckBox
	$("#checked_all").change(function() {
	    if (this.checked) {
	        $(".bar_item_1 input:checkbox").each(function() {
	            $(this).prop('checked',true);
	        });
	    } else {
	        $(".bar_item_1 input:checkbox").each(function() {
	            $(this).prop('checked',false);
	        });
	    }
	});

	//Close Div Success Message
	$('body').delegate('.success_content button','click',function(){
        location.reload();
    });

    //New folder Move
    var li_folder = 0;
    $("#new_move").click(function() {
    	var name_folder = $("#name_folder").val();

    	if (name_folder !== "") {
    		if (!$('.box_menu li').hasClass('folder_name')) {
		        $(".box_menu ul").append("<p class='folder_tittle'><strong>New folder</strong></p><li class='folder_name' id=folder" + 
		        	li_folder + "><a href='#'>" + name_folder + "</a><span style='float: right; padding: 0 15px; font-size: 16px'><i class='fa fa-trash' aria-hidden='true'></i></span></li>");
		        $('.move-dropdown ul').append("<li class=folder" + li_folder + "><input type='checkbox' name='checkbox_floder'>" + 
		        	name_folder + "</li>");
	        	$("#name_folder").val('');
	        	li_folder += 1;
		    }
		    else {
		    	$(".box_menu ul").append("<li class='folder_name' id=folder" + li_folder + "><a href='#'>" + name_folder + 
		    		"</a><span style='float: right; padding: 0 15px; font-size: 16px'><i class='fa fa-trash' aria-hidden='true'></i></span></li>");
	        	$("#name_folder").val('');
	        	$('.move-dropdown ul').append("<li class=folder" + li_folder + "><input type='checkbox' name='checkbox_floder'>" + 
	        		name_folder + "</li>");
	        	$(".move-dropdown").css("display", "none");
	        	li_folder += 1;
		    }   
	    }
    });

    //Delete Folder
	$('body').delegate('.folder_name i','click',function() { 
		var data_id = $(this).parent().parent().attr('id');

		$(this).parent().parent().remove();
		$(".move-dropdown ul ." + data_id).remove();
		li_folder -= 1;

		if(li_folder == 0 ) {
			$('.folder_tittle').remove();
		}
    });
});

//Attact Image Composer Box
function previewImg(event) {
    var files = document.getElementById('input_attact').files;
    for (i = 0; i < files.length; i++) {
        $('#result_img').append('<div class="file_img"><span>'+ files[i].name +
        	'<i class="fa fa-times-circle" aria-hidden="true"></i></span></div>');
    }
}

//When the button is clicked, Toggle display (More Button and Move Button) 
$(document).click(function(event) {
    if (!$(event.target).closest(".bar_move button, .body-dropdown input").length) {
        $(".move-dropdown").css("display", "none");
    }
    else {
    	$(".move-dropdown").css("display", "block");
    }
});

$(document).click(function(event) {
    if (!$(event.target).closest(".bar_more button").length) {
        $(".more-dropdown").hide();
    }
    else {
    	$(".more-dropdown").toggle();
    }
});