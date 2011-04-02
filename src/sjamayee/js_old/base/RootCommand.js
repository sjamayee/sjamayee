var RootCommand = function() {
	this.Extends = RelationCommand;
	this.initialize = function() {
		try {
			this.parent(Command.ROOT);
		//this.setName(Command.ROOT);
		} catch(error) {
			Utils.alert("RootCommand/constructor Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		}
	};
	//Functions
	this.clone = function() {
		Utils.alert("RootCommand/clone");
		var result = null;
		try {
			result = new RootCommand();
			if (result) {
		  	var properties = Utils.eval(this,false); //true);
			  if (properties) {
	        for (var key in properties) {
	          result[key] = properties[key];
					}
				}
			}
		} catch(error) {
			Utils.alert("RootCommand/clone Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	};
};
RootCommand = new Class(new RootCommand());
//Statics
RootCommand.test = function() {
	var command = null;
	try {
		command = new RootCommand();
	} catch(error) {
		Utils.alert("RootCommand/test Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	} finally {
		return "RootCommand/test\n"+command.print();
	}
};
