var ModelChildProperties = function() {
  this.Extends = ChildProperties;

	this.initialize = function() {
		this.parent(ModelChildProperties.ID);
	};
};
ModelChildProperties = new Class(new ModelChildProperties());
ModelChildProperties.ID = "modelChildProperties";
ModelChildProperties.HEADER_ID = ModelChildProperties.ID+AttributeListUIComponent.HEADER_ID;
