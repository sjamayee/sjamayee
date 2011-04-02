var ModelObjectProperties = function() {
  this.Extends = ObjectProperties;

	this.initialize = function() {
		this.parent(ModelObjectProperties.ID);
	};
};
ModelObjectProperties = new Class(new ModelObjectProperties());
ModelObjectProperties.ID = "modelObjectProperties";
//ModelObjectProperties.HEADER_ID = ModelObjectProperties.ID+AttributeListUIComponent.HEADER_ID;
