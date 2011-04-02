var DataObjectProperties = function() {
  this.Extends = ObjectProperties;

	this.initialize = function() {
		this.parent(DataObjectProperties.ID);
	};
};
DataObjectProperties = new Class(new DataObjectProperties());
DataObjectProperties.ID = "dataObjectProperties";
//DataObjectProperties.HEADER_ID = DataObjectProperties.ID+AttributeListUIComponent.HEADER_ID;
