//Abstract
var ChildProperties = function() {
  this.Extends = AttributeListUIComponent;

	this.initialize = function(name,properties) {
		this.parent(name,{header_value: ChildProperties.HEADER_VALUE});
	};
};
ChildProperties = new Class(new ChildProperties());
ChildProperties.ID = "childProperties";
ChildProperties.CLASS_ID = "childProperties";
ChildProperties.HEADER_VALUE = "Properties";
