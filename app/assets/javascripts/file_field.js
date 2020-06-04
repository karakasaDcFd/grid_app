$(document).on('turbolinks:load', function () {
    $(document).on('change', ':file', function() {
        var filename = $(this).val().replace(/\\/g, '/').replace(/.*\//, '');
        $('#filename').val(filename);
    });
});