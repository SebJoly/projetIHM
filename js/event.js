var Event = function(nom, type, place, date, start, end) {
	
	this.author = "";
	this.nom = nom;
	this.type = type;
	this.place = place;
	this.date = date;
	this.start = start;
	this.end = end;
	
	this.print = function() {
		document.write(this.nom + " [Type: " + this.type + "; Lieu: " + this.place + "; Date: " + this.date + "; Creneau: " + this.start + "-" + this.end + "]<br />");  
	}
	
}

window.shareEvent = function(){
	$("#userShare").modal("show");
}

window.eventList = 
                [
                {
                    id : 0,
                    title: 'IHM Presentation',
                    start: '2015-04-14T10:00:00', 
                    end: '2015-04-14T12:00:00',
                    editable:true,
                    color:window.colorArray.blue.light

                },
                {
                    id : 1,
                    title: 'CAR',
                    start: '2015-04-14T14:00:00', 
                    end: '2015-04-14T19:00:00',
                    editable:true,
                    color:window.colorArray.red.light
                }];
