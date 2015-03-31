function Group(groupName) { 
  	
  	this.listUser = new Array();   
	this.groupName = groupName;

    this.addUser = function(user) { 
    	if(! $.inArray(user, this.listUser)) {
     		this.listUser.push(user);   
     	}
    }

    this.removeUser = function(user) {
    	var index;
    	
    	if($.inArray(user, this.listUser)) {
    		index = this.listUser.indexOf(user);
 			this.listUser.splice(index,1);
    	}
    }

    this.renameGroup = function(groupName) {
    	this.groupName = groupName;
    }

    this.printGroup = function() {
    	
    }
} 