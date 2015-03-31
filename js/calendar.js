$('.popover-markup > .trigger').popover({
    html : true,
    title: function() {
      return $(".container").find('.head').html();
    },
    content: function() {
      return $(".container").find('.content').html();
    },
    container: 'body',
    placement: 'right'
});

function addEvent() {
    var eventHtml = $("#popup0");
    eventHtml.show();   
    eventHtml.attr("id","popup");
    $(".container").append(eventHtml);
}