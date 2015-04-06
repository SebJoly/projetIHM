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
