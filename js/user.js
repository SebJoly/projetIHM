var User = function(firstname, lastname) {
 
    this.firstname = firstname; 
    this.lastname = lastname;
    
    this.timetable = new Array();
     
    this.getFullName = function() { 
        document.write(this.firstname + " " + this.lastname + "<br />"); 
    }
    
    this.addEvent = function(event) {
    	//event.setAuthor(this.firstname + " " + this.lastname);
    	this.timetable.push(event);
    }
    
    this.printTimetable = function() {
    	document.write("<br />");
    	for(var i = 0; i < this.timetable.length; i++) {
    		this.timetable[i].print();
    	}
    	document.write("<br />");
    }
    
    this.sendEvent = function(event, friend) {
    	friend.addEvent(event);
    }
}
