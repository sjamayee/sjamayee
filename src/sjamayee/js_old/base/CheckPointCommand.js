var CheckPointCommand = function() {
	this.Extends = Command;
	this.initialize = function() {
		try {
			this.parent(Command.CKP);
		} catch(error) {
			Utils.alert("CheckPointCommand/constructor Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		}
	};
	//Getters & Setters
	//Functions
	this.clone = function() {
		Utils.alert("CheckPointCommand/clone");
		var result = null;
		try {
			result = new CheckPointCommand();
			if (result) {
		  	var properties = Utils.eval(this,false); //true);
			  if (properties) {
	        for (var key in properties) {
	          result[key] = properties[key];
					}
				}
			}
		} catch(error) {
			Utils.alert("CheckPointCommand/clone Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	};
	this.print = function(html,keysOnly) {
		var _html = ((html !== undefined) && (html !== null))?html:false;
		var _keysOnly = ((keysOnly !== undefined) && (keysOnly !== null))?keysOnly:false;
		var _nl = (_html)?'<br/>':'\n';
		var result = 'CheckPointCommand:'+_nl;
		try {
			result += this.parent();
		} catch(error) {
			Utils.alert("CheckPointCommand/print Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	};
};
CheckPointCommand = new Class(new CheckPointCommand());
//Statics
CheckPointCommand.test = function() {
	var command = null;
	try {
		command = new CheckPointCommand();
	} catch(error) {
		Utils.alert("CheckPointCommand/test Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	} finally {
		return "CheckPointCommand/test\n"+command.print();
	}
};
