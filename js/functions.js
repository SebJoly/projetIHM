window.onload = function(){
    $("#popup").hide();

}

$(document).ready(function() {
    $('.calendar').popover({
        html : true,
        selector: '[rel="popover"]',
        title: function() {
          return $(".calendar").find('.head').html();
        },
        content: function() {
          return $(".calendar").find('.content').html();
        },
        container: 'body',
        placement: 'right'
    });


    $('body').on('click', function (e) {
        $('[rel="popover"]').each(function () {
            //the 'is' for buttons that trigger popups
            //the 'has' for icons within a button that triggers a popup
            if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.popover').has(e.target).length === 0) {
                $(this).popover('hide');
            }
        });
    });

    $(".date-picker").datepicker();

    $(".date-picker").on("change", function () {
        var id = $(this).attr("id");
        var val = $("label[for='" + id + "']").text();
        console.log(val + " changed");
    });
});


