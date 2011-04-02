var NavigationCommand = function() {
	this.Extends = RelationCommand;
	this.initialize = function() {
		try {
			this.parent(Command.NAV);
		//this.setName(Command.NAV);
		} catch(error) {
			Utils.alert("NavigationCommand/constructor Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		}
	};
	//Getters & Setters
	this.getList = function() {
		var result = null;
		if (this.list !== undefined) {
			result = this.list;
		}
		return result;
	};
	this.setList = function(list) {
		if (list) {
			this.list = list;
		}
		return this;
	};
	this.getNavigation = function() {
		var result = null;
		if (this.navigation !== undefined) {
			result = this.navigation;
		}
		return result;
	};
	this.setNavigation = function(navigation) {
		if (navigation) {
			this.navigation = navigation;
		}
		return this;
	};
	//Functions
	this.clone = function() {
		Utils.alert("NavigationCommand/clone");
		var result = null;
		try {
			result = new NavigationCommand();
			if (result) {
		  	var properties = Utils.eval(this,false); //true);
			  if (properties) {
	        for (var key in properties) {
	          result[key] = properties[key];
					}
				}
			}
		} catch(error) {
			Utils.alert("NavigationCommand/clone Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	};
	this.print = function(html,keysOnly) {
		var _html = ((html !== undefined) && (html !== null))?html:false;
		var _keysOnly = ((keysOnly !== undefined) && (keysOnly !== null))?keysOnly:false;
		var _nl = (_html)?'<br/>':'\n';
		var result = 'NavigationCommand:'+_nl;
		try {
			result += this.parent();
		} catch(error) {
			Utils.alert("NavigationCommand/print Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	};
};
NavigationCommand = new Class(new NavigationCommand());
//Statics
NavigationCommand.NAV_ENTER = 1;
NavigationCommand.NAV_SPACE = 2;
NavigationCommand.NAV_CLICK = 3;
NavigationCommand.NAV_UP = 4;
NavigationCommand.NAV_DOWN = 5;
NavigationCommand.NAV_LEFT = 6;
NavigationCommand.NAV_RIGHT = 7;
NavigationCommand.NAV_PUP = 8;
NavigationCommand.NAV_PDN = 9;
NavigationCommand.NAV_TOP = 10;
NavigationCommand.NAV_BOTTOM = 11;
NavigationCommand.NAV_HOME = 12;
NavigationCommand.NAV_END = 13;
NavigationCommand.MAX_REMEMBERED = 5; //100;
NavigationCommand.INSERT_ASC = "insertAscending";
NavigationCommand.INSERT_DSC = "insertDescending";
NavigationCommand.test = function() {
	var command = null;
	try {
		command = new NavigationCommand();
	} catch(error) {
		Utils.alert("NavigationCommand/test Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	} finally {
		return "NavigationCommand/test\n"+command.print();
	}
};
