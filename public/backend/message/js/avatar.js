$(document).ready(function(){
    var base_url = $('#base_url').data('url');

    // Upload Image Sidebar
    $(document).on('click', '.browse', function() {
        $('#upload').prop('value', null);
        $('#upload').click();
    });

    // Upload Avatar
    $('#upload_avt input[type=file]').change(function() {
        $(".show_avatar").css("display", "block");
        $(".wrapper").css("overflow", "hidden");
    });

    $uploadCrop = $('#upload-demo').croppie({
        enableExif: true,
        viewport: {
            width: 250,
            height: 250,
        },
        boundary: {
            width: 350,
            height: 350
        }
    });

    $('#upload').on('change', function () { 
        var reader = new FileReader();
        reader.onload = function (e) {
            $uploadCrop.croppie('bind', {
                url: e.target.result
            }).then(function() {

            });
        }

        reader.readAsDataURL(this.files[0]);
    });

    $('.upload-result').on('click', function (ev) {
        $uploadCrop.croppie('result', {
            size: 'viewport',
        }).then(function (resp) {
            html = '<img src="' + resp + '" class="img-circle" width="150" height="150" />';
            $("#upload-demo-i").html(html);
            $(".show_avatar").css("display", "none");
            $(".img-account").css("display", "none");

            // Save image
            var current_route = $('#current_route').data('user');
            var user = '';

            if (current_route && current_route.indexOf('vendor') > -1) {
                user = 'vendor';
            } else {
                user = 'customer';
            }

            $.ajax({
                url: base_url + '/vendor/update-avatar',
                type: "POST",
                data: {"image":resp, user: user},
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
                },
                success: function (data) {
                    
                }
            });
        });
    });

    //Close Update Avatar
    $('.close_off').click(function() {
        $(".show_avatar").css("display", "none");
    });
});