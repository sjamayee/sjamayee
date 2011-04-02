var DataParentProperties = function() {
  this.Extends = ParentProperties;

	this.initialize = function() {
		this.parent(DataParentProperties.ID);
	};
};
DataParentProperties = new Class(new DataParentProperties());
DataParentProperties.ID = "dataParentProperties";
//DataParentProperties.HEADER_ID = DataParentProperties.ID+AttributeListUIComponent.HEADER_ID;
