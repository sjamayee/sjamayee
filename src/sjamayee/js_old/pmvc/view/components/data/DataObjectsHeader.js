var DataObjectsHeader = function() {
  this.Extends = ObjectsHeader;

	this.initialize = function() {
		this.parent(DataObjectsHeader.ID);
	};
};
DataObjectsHeader = new Class(new DataObjectsHeader());
DataObjectsHeader.ID = "dataObjectsHeader";
