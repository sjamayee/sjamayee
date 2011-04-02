var Criteria = function() {
	this.Extends = SjamayeeBase;
	this.initialize = function() {
		try {
			this.parent();
			Utils.alert("Criteria/constructor");
		} catch(error) {
			Utils.alert("Criteria/constructor Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		}
	};
	//Getters & Setters
	this.getNumberOfRecords = function() {
		var result = 999;
		try {
			if ((this.numberOfRecords !== undefined) && (this.numberOfRecords !== null)) {
				result = this.numberOfRecords;
			}
		} catch(error) {
			Utils.alert("Criteria/getNumberOfRecords Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	};
	this.setNumberOfRecords = function(numberOfRecords) {
		if (numberOfRecords !== null) {
			this.numberOfRecords = numberOfRecords;
		}
		return this;
	};
	this.getType = function() {
		var result = '';
		try {
			if ((this.type !== undefined) && (this.type !== null)) {
				result = this.type;
			}
		} catch(error) {
			Utils.alert("Criteria/getType Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	};
	this.setType = function(type) {
		if (type) {
			this.type = type;
		}
		return this;
	};
	this.getFilter = function() {
		var result = '';
		try {
			if ((this.filter !== undefined) && (this.filter !== null)) {
				result = this.filter;
			}
		} catch(error) {
			Utils.alert("Criteria/getFilter Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	};
	this.setFilter = function(filter) {
		if (filter) {
			this.filter = filter;
		}
		return this;
	};
	this.getReferenceExpression = function() {
		var result = new ReferenceExpression();
		try {
			if ((this.referenceExpression !== undefined) && (this.referenceExpression !== null)) {
				result = this.referenceExpression;
			}
		} catch(error) {
			Utils.alert("Criteria/getReferenceExpression Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	};
	this.setReferenceExpression = function(referenceExpression) {
		if (referenceExpression) {
			this.referenceExpression = referenceExpression;
		}
		return this;
	};
	this.getOid = function() {
		var result = '';
		try {
			if ((this.oid !== undefined) && (this.oid !== null)) {
				result = this.oid;
			}
		} catch(error) {
			Utils.alert("Criteria/getOid Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	};
	this.setOid = function(oid) {
		if (oid !== null) {
			this.oid = oid;
		}
		return this;
	};
	//Functions
	this.print = function(html,keysOnly) {
		var _html = ((html !== undefined) && (html !== null))?html:false;
		var _keysOnly = ((keysOnly !== undefined) && (keysOnly !== null))?keysOnly:false;
		var _nl = (_html)?'<br/>':'\n';
		var result = 'Criteria:'+_nl;
		try {
			result += this.parent();
		} catch(error) {
			Utils.alert("Criteria/print Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	};
};
Criteria = new Class(new Criteria());
