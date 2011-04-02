var ModelParentProperties = function() {
  this.Extends = ParentProperties;

	this.initialize = function() {
		this.parent(ModelParentProperties.ID);
	};
};
ModelParentProperties = new Class(new ModelParentProperties());
ModelParentProperties.ID = "modelParentProperties";
//ModelParentProperties.HEADER_ID = ModelParentProperties.ID+AttributeListUIComponent.HEADER_ID;
