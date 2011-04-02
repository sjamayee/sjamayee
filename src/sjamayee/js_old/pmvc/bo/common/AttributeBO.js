//Abstract
var AttributeBO = function() {
  this.Extends = BusinessObject;

	this.initialize = function(vo) {
		try {
			this.parent(vo);
  		this.setName(vo.name);
  		this.setValue(vo.value);
		} catch(error) {
			Utils.alert("AttributeBO/constructor Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		}
	};
	this.getName = function() {
		return this.name;
	};
	this.setName = function(name) {
		if (name !== null) {
			this.name = name;
		}
	};
	this.getValue = function() {
		return this.value;
	};
	this.setValue = function(value) {
		if (value !== null) {
			this.value = value;
		}
	};
};
AttributeBO = new Class(new AttributeBO());
