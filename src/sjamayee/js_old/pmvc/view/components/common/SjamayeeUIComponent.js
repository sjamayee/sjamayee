//Abstract
var SjamayeeUIComponent = function() {
  this.Extends = UIComponent;
  this.uicName = null;
	
	this.initialize = function(name,properties) {
    this.setUicName(name);
		this.parent(name,properties);
	};

	this.getUicName = function() {
		return this.uicName;
	};
	
	this.setUicName = function(name) {
	  this.uicName = name;
	};
	
	this.setElement = function(id,value) {
	  if ($(id) == null) {
	    //alert("SjamayeeUIComponent/setElement - id: "+id+" value: "+value);
	  }
		$(id).innerHTML = value;
	};
};
SjamayeeUIComponent = new Class(new SjamayeeUIComponent());
