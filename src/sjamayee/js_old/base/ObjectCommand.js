var ObjectCommand = function(name) {
	this.Extends = Command;
	this.initialize = function(name) {
		try {
			this.parent();
			this.setName(name);
		} catch(error) {
			Utils.alert("ObjectCommand/constructor Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		}
	};
	//Getters & Setters
	this.getObject = function() {
		var result = null;
		if (this.object !== undefined) {
			result = this.object;
		}
		return result;
	};
	this.setObject = function(object) {
		if (object) {
			this.object = object;
		}
		return this;
	};
	//Functions
	this.clone = function() {
		Utils.alert("ObjectCommand/clone");
		var result = null;
		try {
			result = new ObjectCommand(this.getName());
			if (result) {
		  	var properties = Utils.eval(this,false); //true);
			  if (properties) {
	        for (var key in properties) {
	          result[key] = properties[key];
					}
				}
			}
		} catch(error) {
			Utils.alert("ObjectCommand/clone Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	};
};
ObjectCommand = new Class(new ObjectCommand());
//Statics
ObjectCommand.test = function() {
	var command = null;
	try {
		command = new ObjectCommand(Command.ADD);
	} catch(error) {
		Utils.alert("ObjectCommand/test Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	} finally {
		return "ObjectCommand/test\n"+command.print();
	}
};
