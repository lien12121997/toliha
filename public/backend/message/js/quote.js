
$(document).ready(function() { 

	// Validate creat quote form
    $('#quote_form .send_quote').click(function(){
        validateQuoteForm('vendor');
        return false;
    });

	//Calculate the total price when increasing the quantity
	var UnitPrice = function() {
		$('.form_item').each(function () {
			var unit_price = $(this).find('.in_price').val();
			var InputQuantity = $(this).find('.quantity').val();
			$(this).find('.result_price').val((unit_price*InputQuantity).toFixed(2));
		});
	};
	UnitPrice();

	var QuoteQuantity = function() {
		$('.form_item').each(function () {
			var $button = $(this);
	    	var quantity = $button.find('.quantity').val();
	    	var price = $button.find('.in_price').val();

		    $button.find('.plus').click(function() {
		    	quantity ++ ;
		    	$button.find('.quantity').val('' + quantity + '');
		    	if(price == undefined ) {
		    		$button.find('.result_price').val('');
		    	}
		    	else {
		    		$button.find('.result_price').val((quantity*price).toFixed(2));
		    	}
		    	DeliveryCharges();
		    	SubToTal();
		    	AdditionalPrice();
				ToTal();
		    })

		    $button.find('.minus').click(function() {
		    	quantity -- ;
		    	if(quantity > 0)
		    	{
		    		$button.find('.quantity').val('' + quantity + '');
		    		if(price == undefined ) {
		    			$button.find('.result_price').val('');
			    	}
			    	else {
			    		$button.find('.result_price').val((quantity*price).toFixed(2));
			    	}
			    	DeliveryCharges();
			    	SubToTal();
			    	AdditionalPrice();
					ToTal();
		    	}
		    	else {
		    		quantity = 1;
		    	}
		    })
		});
	};
	QuoteQuantity();

	// //Calculate Delivery Charges
	var DeliveryCharges = function() { 
		$('.form_item').each(function () { 
	    	var totalQuantity = $(this).find('.quantity-text ').val();
	    	var qty = Number($(this).find('.enter_qty').val());
	    	var rate = Number($(this).find('.enter_rate').val());
	    	if(totalQuantity == 1) {
	    		$(this).find('.delivery_price').val(qty.toFixed(2));
	    	}
	    	else {
	    		$(this).find('.delivery_price').val((qty + (rate*(totalQuantity - 1))).toFixed(2));
	    	}
		});
	};
	DeliveryCharges();

	var SubToTal = function() {
    	var sum_price = 0;
	    $('.result_price').each(function() {
	        sum_price += Number($(this).val());
	    });

	    var sum_delivery = 0;
	    $('.delivery_price').each(function() {
	        sum_delivery += Number($(this).val());
	    });
    	var shipping = Number($('.shipping').val());
    	var sub_total = (sum_price + sum_delivery + shipping).toFixed(2);

	    $('.input_subtotal').val(sub_total);
	    $('.input_total').val(sub_total);   
	};
	SubToTal();

	// //Calculate optional/ additional
    var AdditionalPrice = function() {
	    var subtotal_after = $('.input_subtotal').val();
	    var charges_after = $('.service_charges .enter_number').val();
    	var vat_after = $('.tax_vat .enter_number').val();

    	$('.service_charges .input_price').val(((charges_after*subtotal_after)/100).toFixed(2));
    	$('.tax_vat .input_price').val(((vat_after*subtotal_after)/100).toFixed(2));
	};
	AdditionalPrice();

	var ToTal = function() {
		var subtotal = Number($('.input_subtotal').val());
		var service_charges = Number($('.result_charges').val());
	    var tax_vat = Number($('.result_vat').val());
	    $('.input_total').val((subtotal + service_charges + tax_vat).toFixed(2));	
	};
	ToTal();

	$('.create_content').on('change',function () { 
		UnitPrice();
		QuoteQuantity();
		DeliveryCharges();
		SubToTal();
		AdditionalPrice();
		ToTal();
	});

	//Add New Line Item
	var $AddItem = $('.insert_form_item');
	  	$('body').delegate('.create_item','click',function(){
	    var source   = document.getElementById("quote-form-template").innerHTML;
	    var template = Handlebars.compile(source);
	    var context = {};
	    var html    = template(context);
	    $(html).insertBefore($AddItem);

	    NumberItem();
  		UnitPrice();
		QuoteQuantity();
		DeliveryCharges();
		SubToTal();
		AdditionalPrice();
		ToTal();
  		NumBerFload();
  		DeleteFormItem();
	});

	//Delete Item
	$('body').delegate('.quote_del','click',function() {
		// Save removed quote detail ID
        let block_id = $(this).closest('.form_item').attr('id');
        saveRemoveQuoteDetailIds(block_id);

        $(this).parent().parent().remove();
        NumberItem();
        SubToTal();
        ToTal();
        DeleteFormItem();

        //If No Form
        $('.create_content').each(function () {
	        var form_item = $(this).find('.form_item');
		    if (form_item.length == false) {
		        $('.web_tittle').css("display", "none");
		    }
		});
    });

    //Display Text Percent
    $('.service_charges .enter_number').blur(function() {
	    if($(this).val()) {
	        $(this).parent().find('.text_percent').css("display", "inline-block");
	    }
	    else {
	    	$(this).parent().find('.text_percent').css("display", "none");
	    }
	});

	$('.tax_vat .enter_number').blur(function() {
	    if($(this).val()) {
	        $(this).parent().find('.text_percent').css("display", "inline-block");
	    }
	    else {
	    	$(this).parent().find('.text_percent').css("display", "none");
	    }
	});

	//Only Float
	var NumBerFload = function() {
	    $(".number_float").on("keypress keyup blur",function (event) {
	    	$(this).val($(this).val().replace(/[^0-9\.]/g,''));
	        if ((event.which != 46 || $(this).val().indexOf('.') != -1) && (event.which < 48 || event.which > 57)) {
	            event.preventDefault();
	        }
	    });
	};
	NumBerFload();

    var NumBerInt = function() {
	    $(".number_int").on("keypress keyup blur",function (event) {    
	       $(this).val($(this).val().replace(/[^\d].+/, ""));
	        if ((event.which < 48 || event.which > 57)) {
	            event.preventDefault();
	        }
	    });
	};
	NumBerInt();

	//Reset Number Item When Add
	var NumberItem = function() {
		var number_item = 0;
		$('.form_item').each(function () {
			number_item += 1;
			$(this).find('.number_item').text(number_item + ")");
			$(this).closest('.form_item').attr('id', 'item_' + number_item);
		});
	};
	NumberItem();

	var DeleteFormItem = function() {
	    var form_item = $('.form_item');

	    if ($(window).width() <= 736 ) {
		    if (form_item.length <= 1) {
		    	$('.delete_mobile').css("display", "none");
		    }
		    else {
		    	$('.delete_mobile').css("display", "block");
		    }
		}
		else {
			if (form_item.length <= 1) {
		    	$('.delete_web').css("display", "none");
		    }
		    else {
		    	$('.delete_web').css("display", "block");
		    }
		}
	};
	DeleteFormItem();

});