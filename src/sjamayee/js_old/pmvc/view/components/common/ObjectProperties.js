//Abstract
var ObjectProperties = function() {
  this.Extends = AttributeListUIComponent;

	this.initialize = function(name,properties) {
		this.parent(name,{header_value: ObjectProperties.HEADER_VALUE});
	};
};
ObjectProperties = new Class(new ObjectProperties());
ObjectProperties.CLASS_ID = "objectProperties";
ObjectProperties.HEADER_VALUE = "Properties";
