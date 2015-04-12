
$(document).ready(function() {
    var isOpened = false;
    window.isImporting = false;
    $('.calendar').fullCalendar({
        header: {
            left: 'prev,next today',
            center: 'title',
            right: 'month,agendaWeek,agendaDay'
        },
        defaultDate: new Date(),
        allDayDefault: false,
        editable: true,
        eventLimit: true, // allow "more" link when too many events
        eventClick: function(calEvent, jsEvent, view) {
            window.currentEvent = calEvent;
            console.log(calEvent);
            $("#popover-title").html(calEvent.title);
            $("#popover-start").html(formatDate(calEvent.start._d,"dddd d MMM yyyy",true));
            $("#popover-start-time").html(formatDate(calEvent.start._d,"hh:mm TT",true));
            $("#popover-end").html(formatDate(calEvent.end._d,"dddd d MMM yyyy",true));
            $("#popover-end-time").html(formatDate(calEvent.end._d,"hh:mm TT",true));
            isOpened = true;
            // alert('Coucou');
        },
        dayClick: function(date, jsEvent, view){
            $('[class="fc-event-container"]').each(function (){
                $(this).popover('hide');
            });
            if(!isOpened) {
                var start = new Date(date._d); 
                var end = new Date(date._d);  
                end.setHours(end.getHours() + 1);
                var event = {
                        id : window.eventList.length,
                        title: 'New event',
                        start: start, 
                        end: end,
                        editable:true
                    };
                window.eventList.push(event);
                $(".calendar").fullCalendar('renderEvent',event);
            }
            isOpened = false;    
        },
        eventDragStop: function(event,jsEvent) {
            var rect = {
                top:$("#dragDiv").offset().top,
                bottom:$("#dragDiv").offset().top+$("#dragDiv").height(),
                left:$("#dragDiv").offset().left,
                right:$("#dragDiv").offset().left+$("#dragDiv").width()
            }
            if( (rect.left <= jsEvent.pageX) & (jsEvent.pageX <= rect.right) & (rect.top<= jsEvent.pageY) & (jsEvent.pageY <= rect.bottom)){
                window.shareEvent(event);
            } 
        },
        events: window.eventList
        });

    $('.calendar').popover({
        html : true,
        selector: '[class="fc-event-container"]',
        title: function() {
            
          return $("#eventPanel").find('.popup-head').html();
        },
        content: function() {
          return $("#eventPanel").find('.popup-content').html();
        },
        container: 'body',
        placement: 'auto right'
    });
    $('.popover').on("hidden",function(){
        alert("coucu");
    })
    $('.calendar').on('shown.bs.popover', function () {
        $('.popover').find('#popover-start').datepicker({
            format: 'mm/dd/yyyy',
            orientation:'auto',
            container:'body',
            defaultViewDate:{
                day:new Date(window.currentEvent.start).getDay(),
                month:new Date(window.currentEvent.start).getMonth(),
                year:new Date(window.currentEvent.start).getFullYear()
            }})      
            .on('changeDate', function(e) {
                $(".popover").find("#popover-start").html(formatDate(new Date(e.date),"dddd d MMM yyyy"));
                var newDate = new Date(e.date);
                newDate.setHours(new Date(window.currentEvent.start).getHours());
                newDate.setMinutes(new Date(window.currentEvent.start).getMinutes());
                window.currentEvent.start._d = newDate;
                $('#calendar').fullCalendar('updateEvent', window.currentEvent);
                // Revalidate the date field
                //$('#eventForm').formValidation('revalidateField', 'date');
            });
        $('.popover').find('#popover-start-time').timepicker({
                defaultTime:formatDate(new Date(window.currentEvent.start),"h:mm TT",true)
            //$(".")
        }).on('changeTime.timepicker', function(e) {
                $(".popover").find("#popover-start-time").html(e.time.value);
                window.currentEvent.start._d.setHours(e.time.hours);
                window.currentEvent.start._d.setMinutes(e.time.minutes);
                $('#calendar').fullCalendar('updateEvent', window.currentEvent);
            });
        $('.popover').find('#popover-end').datepicker({
            format: 'mm/dd/yyyy',
            orientation:'auto',
            container:'body',
            defaultViewDate:{
                day:new Date(window.currentEvent.end).getDay(),
                month:new Date(window.currentEvent.end).getMonth(),
                year:new Date(window.currentEvent.end).getFullYear()
            }})           
            .on('changeDate', function(e) {
                $(".popover").find("#popover-end").html(formatDate(new Date(e.date),"dddd d MMM yyyy"));
                var newDate = new Date(e.date);
                newDate.setHours(new Date(window.currentEvent.end).getHours());
                newDate.setMinutes(new Date(window.currentEvent.end).getMinutes());
                window.currentEvent.end._d = newDate;
                $('#calendar').fullCalendar('updateEvent', window.currentEvent);
            });
            $('.popover').find('#popover-end-time').timepicker({
                defaultTime:formatDate(new Date(window.currentEvent.end),"h:mm TT",true)
            }).on('changeTime.timepicker', function(e) {
                $(".popover").find("#popover-end-time").html(e.time.value);
                window.currentEvent.end._d.setHours(e.time.hours);
                window.currentEvent.end._d.setMinutes(e.time.minutes);
                $('#calendar').fullCalendar('updateEvent', window.currentEvent);
            });

    })
    $('body').on('click', function (e) {
        if(!window.isImporting) {
            $('[class="fc-event-container"]').each(function () {
                //the 'is' for buttons that trigger popups
                //the 'has' for icons within a button that triggers a popup
                if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.popover').has(e.target).length === 0) {
                    $(this).popover('hide');
                }
            });
        }
    });

    $("#inputfile").on("change",function(){
        window.isImporting = false;
        var str = $(this).val();
        var n = str.lastIndexOf('\\');
        var result = str.substring(n + 1);
        $('.popover').find("#popover-files").append("<li class='list-group-item'><span class='badge' onClick='window.deleteFile($(this))'>x</span>"+result+"</li>");
    })

    
});

/*    var input = $(this),
        numFiles = input.get(0).files ? input.get(0).files.length : 1,
        label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
    input.trigger('fileselect', [numFiles, label]);
});*/

window.importFile = function() {
    window.isImporting = true;
    $('#inputfile').click();
        event.stopPropagation();    

}

window.deleteFile = function(e){
    e.parent().remove();
    event.stopPropagation();    
}



function formatDate(date, format, utc) {
    var MMMM = ["\x00", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var MMM = ["\x01", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var dddd = ["\x02", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var ddd = ["\x03", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    function ii(i, len) {
        var s = i + "";
        len = len || 2;
        while (s.length < len) s = "0" + s;
        return s;
    }

    var y = utc ? date.getUTCFullYear() : date.getFullYear();
    format = format.replace(/(^|[^\\])yyyy+/g, "$1" + y);
    format = format.replace(/(^|[^\\])yy/g, "$1" + y.toString().substr(2, 2));
    format = format.replace(/(^|[^\\])y/g, "$1" + y);

    var M = (utc ? date.getUTCMonth() : date.getMonth()) + 1;
    format = format.replace(/(^|[^\\])MMMM+/g, "$1" + MMMM[0]);
    format = format.replace(/(^|[^\\])MMM/g, "$1" + MMM[0]);
    format = format.replace(/(^|[^\\])MM/g, "$1" + ii(M));
    format = format.replace(/(^|[^\\])M/g, "$1" + M);

    var d = utc ? date.getUTCDate() : date.getDate();
    format = format.replace(/(^|[^\\])dddd+/g, "$1" + dddd[0]);
    format = format.replace(/(^|[^\\])ddd/g, "$1" + ddd[0]);
    format = format.replace(/(^|[^\\])dd/g, "$1" + ii(d));
    format = format.replace(/(^|[^\\])d/g, "$1" + d);

    var H = utc ? date.getUTCHours() : date.getHours();
    format = format.replace(/(^|[^\\])HH+/g, "$1" + ii(H));
    format = format.replace(/(^|[^\\])H/g, "$1" + H);

    var h = H > 12 ? H - 12 : H == 0 ? 12 : H;
    format = format.replace(/(^|[^\\])hh+/g, "$1" + ii(h));
    format = format.replace(/(^|[^\\])h/g, "$1" + h);

    var m = utc ? date.getUTCMinutes() : date.getMinutes();
    format = format.replace(/(^|[^\\])mm+/g, "$1" + ii(m));
    format = format.replace(/(^|[^\\])m/g, "$1" + m);

    var s = utc ? date.getUTCSeconds() : date.getSeconds();
    format = format.replace(/(^|[^\\])ss+/g, "$1" + ii(s));
    format = format.replace(/(^|[^\\])s/g, "$1" + s);

    var f = utc ? date.getUTCMilliseconds() : date.getMilliseconds();
    format = format.replace(/(^|[^\\])fff+/g, "$1" + ii(f, 3));
    f = Math.round(f / 10);
    format = format.replace(/(^|[^\\])ff/g, "$1" + ii(f));
    f = Math.round(f / 10);
    format = format.replace(/(^|[^\\])f/g, "$1" + f);

    var T = H < 12 ? "AM" : "PM";
    format = format.replace(/(^|[^\\])TT+/g, "$1" + T);
    format = format.replace(/(^|[^\\])T/g, "$1" + T.charAt(0));

    var t = T.toLowerCase();
    format = format.replace(/(^|[^\\])tt+/g, "$1" + t);
    format = format.replace(/(^|[^\\])t/g, "$1" + t.charAt(0));

    var tz = -date.getTimezoneOffset();
    var K = utc || !tz ? "Z" : tz > 0 ? "+" : "-";
    if (!utc) {
        tz = Math.abs(tz);
        var tzHrs = Math.floor(tz / 60);
        var tzMin = tz % 60;
        K += ii(tzHrs) + ":" + ii(tzMin);
    }
    format = format.replace(/(^|[^\\])K/g, "$1" + K);

    var day = (utc ? date.getUTCDay() : date.getDay()) + 1;
    format = format.replace(new RegExp(dddd[0], "g"), dddd[day]);
    format = format.replace(new RegExp(ddd[0], "g"), ddd[day]);

    format = format.replace(new RegExp(MMMM[0], "g"), MMMM[M]);
    format = format.replace(new RegExp(MMM[0], "g"), MMM[M]);

    format = format.replace(/\\(.)/g, "$1");
    return format;
};

