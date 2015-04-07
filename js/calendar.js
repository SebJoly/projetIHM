window.eventManagement = {
    add: function() {
        var eventObject = {
            id:window.eventList.length,
            color:"red"
        };
        window.eventList.push(eventObject)
        var eventHtml = $("#popup").clone();
        eventHtml.show();
        eventHtml.attr("id","popup"+eventObject.id);
        this.setColor(eventObject.id);
        $(".calendar").append(eventHtml);
    },

    setColor:function(eventId) {
        if(eventId>window.eventList.length) return;
        var eventObject = window.eventList[eventId];
        var color = window.colorArray[eventObject.color].light;
        $(".calendar").find('.head > button').attr("style","background-color:"+color+";");
        $(".calendar").find('.content > .popup_container').attr("style","background-color:"+color+"!important;");
    }
}
