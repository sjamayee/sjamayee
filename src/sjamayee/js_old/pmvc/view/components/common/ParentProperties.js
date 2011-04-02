//Abstract
var ParentProperties = function() {
  this.Extends = AttributeListUIComponent;

	this.initialize = function(name,properties) {
		this.parent(name,{header_value: ParentProperties.HEADER_VALUE});
	};
};
ParentProperties = new Class(new ParentProperties());
ParentProperties.ID = "parentProperties";
ParentProperties.CLASS_ID = "parentProperties";
ParentProperties.HEADER_VALUE = "Properties";
