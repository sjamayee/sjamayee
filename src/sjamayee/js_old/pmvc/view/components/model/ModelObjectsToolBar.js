var ModelObjectsToolBar = function() {
  this.Extends = ObjectsToolBar;

	this.initialize = function() {
		this.parent(ModelObjectsToolBar.ID);
	};
};
ModelObjectsToolBar = new Class(new ModelObjectsToolBar());
ModelObjectsToolBar.ID = "modelObjectsToolBar";
