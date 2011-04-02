var DataObjectsListRight = function() {
  this.Extends = ObjectsListRight;

	this.initialize = function(name,properties) {
		this.parent(DataObjectsListRight.ID, properties);
	};
};
DataObjectsListRight = new Class(new DataObjectsListRight());
DataObjectsListRight.ID = "dataObjectsListRight";
