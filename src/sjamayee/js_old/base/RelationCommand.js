var RelationCommand = function(name) {
	this.Extends = Command;
	this.initialize = function(name) {
		try {
			this.parent();
			this.setName(name);
		} catch(error) {
			Utils.alert("RelationCommand/constructor Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		}
	};
	//Getters & Setters
	this.getRelation = function() {
		var result = null;
		if (this.relation !== undefined) {
			result = this.relation;
		}
		return result;
	};
	this.setRelation = function(relation,noCloning) {
		if (relation) {
			var _relation = relation;
			if ((noCloning !== undefined) && (noCloning === true)) {
				_relation = relation.clone();
			}
			this.relation = _relation;
		}
		return this;
	};
	this.getRelationFrom = function() {
		var result = null;
		if (this.relationFrom !== undefined) {
			result = this.relationFrom;
		}
		return result;
	};
	this.setRelationFrom = function(relationFrom) {
		if (relationFrom) {
			this.relationFrom = relationFrom;
		}
		return this;
	};
	//Functions
	this.clone = function() {
		Utils.alert("RelationCommand/clone");
		var result = null;
		try {
			result = new RelationCommand(this.getName());
			if (result) {
		  	var properties = Utils.eval(this,false); //true);
			  if (properties) {
	        for (var key in properties) {
	          result[key] = properties[key];
					}
				}
			}
		} catch(error) {
			Utils.alert("RelationCommand/clone Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	};
	this.print = function(html,keysOnly) {
		var _html = ((html !== undefined) && (html !== null))?html:false;
		var _keysOnly = ((keysOnly !== undefined) && (keysOnly !== null))?keysOnly:false;
		var _nl = (_html)?'<br/>':'\n';
		var result = 'RelationCommand:'+_nl;
		try {
			result += this.parent();
		} catch(error) {
			Utils.alert("RelationCommand/print Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	};
};
RelationCommand = new Class(new RelationCommand());
//Statics
RelationCommand.test = function() {
	var command = null;
	try {
		command = new RelationCommand(Command.ADD);
	} catch(error) {
		Utils.alert("RelationCommand/test Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	} finally {
		return "RelationCommand/test\n"+command.print();
	}
};
