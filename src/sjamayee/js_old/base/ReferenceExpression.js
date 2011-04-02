var ReferenceExpression = function() {
	this.Extends = SjamayeeBase;
	this.initialize = function() {
		try {
			this.parent();
			Utils.alert("ReferenceExpression/constructor");
		} catch(error) {
			Utils.alert("ReferenceExpression/constructor Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		}
	};
	//Getters & Setters
	this.getOperator = function() {
		var result = ">=";
		try {
			if ((this.operator !== undefined) && (this.operator !== null)) {
				result = this.operator;
			}
		} catch(error) {
			Utils.alert("ReferenceExpression/getOperator Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	};
	this.setOperator = function(operator) {
		if (operator) {
			this.operator = operator;
		}
		return this;
	};
	this.getNumberOfReferences = function() {
		var result = 0;
		try {
			if ((this.numberOfReferences !== undefined) && (this.numberOfReferences !== null)) {
				result = this.numberOfReferences;
			}
		} catch(error) {
			Utils.alert("ReferenceExpression/getNumberOfReferences Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	};
	this.setNumberOfReferences = function(numberOfReferences) {
		if (numberOfReferences !== null) {
			this.numberOfReferences = numberOfReferences;
		}
		return this;
	};
	//Functions
	this.print = function(html,keysOnly) {
		var _html = ((html !== undefined) && (html !== null))?html:false;
		var _keysOnly = ((keysOnly !== undefined) && (keysOnly !== null))?keysOnly:false;	
		var _nl = (_html)?'<br/>':'\n';
		var result = 'ReferenceExpression:'+_nl;
		try {
			result += this.parent();
		} catch(error) {
			Utils.alert("ReferenceExpression/print Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	};
};
ReferenceExpression = new Class(new ReferenceExpression());
