
var base_url = $('#base_url').data('url');

function countChecked() {
	let messages = [];

	$.each($(".bar_item_1 input:checked"), function() {
		messages.push($(this).val());
	});

	return messages;
};

function moveMessage(messages, status, user_role, reload = true) {
	$.ajax({
        url: base_url + '/admin/messages/change-status',
        type: "POST",
        data: {messages : messages, status:status, user_role:user_role},
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
        },
        success: function (data) {
            if (!data) { return false; }

            if (reload) {
                location.reload();    
            } 
            else if (status == 'spam' || status == 'trash') {
                window.location.href = base_url + '/' + user_role + '/messages/' + status;
            }
            else if (status == 'unread') {
                window.location.href = base_url + '/' + user_role + '/messages';
            }
            else {
                location.reload();
            }
        }
    });
}

function updateMessageStatus(action, id, user_role) {
    let status = convertToMsgStatus(action);
    moveMessage(id, status, user_role, false);
}

function convertToMsgStatus(action) {
    if (action == 'delete_item') {
        return 'trash';
    }
    else if (action == 'archive_item') {
        return 'archived';
    }
    else if (action == 'report_spam') {
        return 'spam';
    }
    else {
        return 'unread';
    }
}

function scrollToTop(element_string = '') {
    if (!element_string) {
        return false;
    }

    $('html, body').animate({
        scrollTop: $(element_string).offset().top - 120
    }, 300);
}

// Send quote
function validateQuoteForm(user_role) {
    let first_item_name = $('#item_1 [name="item_name[]"]').val();
    let first_item_unit_price = $('#item_1 [name="unit_price[]"]').val();

    if (!first_item_name) {
        alert("Please put at least an item name for first item.");
        scrollToTop("#item_1");
        $('#item_1 [name="item_name[]"]').focus();

        return false;
    }

    if (!first_item_unit_price || first_item_unit_price == 0) {
        alert("Please put unit price for first item."); 
        scrollToTop("#item_1");
        $('#item_1 [name="unit_price[]"]').focus();

        return false;
    }
    
    submitQuote(user_role);
}

function submitQuote(user_role) {
    $('.loading').show();

    $.ajax({
        url: base_url + '/admin/messages/quote-update',
        type: "POST",
        data: new FormData($('#quote_form')[0]),
        cache: false,
        contentType: false,
        processData: false,
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
        },
        success: function (response) {
            $('.loading').hide();
            $('.success_body').show();
            $('#text_msg').html(response.msg);

            if (response.status != undefined) {
                // window.location.href = base_url + '/' + user_role + '/messages';
            }
        },
        fail: function (jqXHR, textStatus, errorThrown) {
            $('.loading').hide();
            alert("The following error occured: " + textStatus + ' - ' + errorThrown, errorThrown);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            $('.loading').hide();
            alert("The following error occured: " + textStatus + ' - ' + errorThrown, errorThrown);
        }
    });
}

function saveRemoveQuoteDetailIds(block_id) {
    let quote_detail_id = $('#' + block_id).find('[name="quote_detail_ids[]"]').val();
    let remove_id = $('[name="remove_id"]').val();
    let str = '';

    if (!remove_id) {
        str = quote_detail_id;
    } else {
        str = remove_id + ';' + quote_detail_id;
    }

    $('[name="remove_id"]').prop('value', str);
}