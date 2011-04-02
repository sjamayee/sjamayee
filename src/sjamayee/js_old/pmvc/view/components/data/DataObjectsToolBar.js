var DataObjectsToolBar = function() {
  this.Extends = ObjectsToolBar;

	this.initialize = function() {
		this.parent(DataObjectsToolBar.ID);
	};
};
DataObjectsToolBar = new Class(new DataObjectsToolBar());
DataObjectsToolBar.ID = "dataObjectsToolBar";
