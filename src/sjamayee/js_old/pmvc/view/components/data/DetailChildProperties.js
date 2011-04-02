var DataChildProperties = function() {
  this.Extends = ChildProperties;

	this.initialize = function() {
		this.parent(DataChildProperties.ID);
	};
};
DataChildProperties = new Class(new DataChildProperties());
DataChildProperties.ID = "dataChildProperties";
DataChildProperties.HEADER_ID = DataChildProperties.ID+AttributeListUIComponent.HEADER_ID;
