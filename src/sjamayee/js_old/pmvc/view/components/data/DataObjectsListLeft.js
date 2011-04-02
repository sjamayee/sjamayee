var DataObjectsListLeft = function() {
  this.Extends = ObjectsListLeft;

	this.initialize = function(name,properties) {
		this.parent(DataObjectsListLeft.ID, properties);
	};
};
DataObjectsListLeft = new Class(new DataObjectsListLeft());
DataObjectsListLeft.ID = "dataObjectsListLeft";
