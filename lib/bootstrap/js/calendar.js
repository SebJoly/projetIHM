$(document).ready(function() {
	
	$('#calendar').fullCalendar({
		header: {
			left: 'prev,next today',
			center: 'title',
			right: 'month,basicWeek,basicDay'
		},
		defaultDate: '2015-04-12',
		editable: true,
		eventLimit: true, // allow "more" link when too many events
		// events: [
		// 		{
		// 			title: 'All Day Event',
		// 			start: '2015-02-01'
		// 		}]
	});
	
});