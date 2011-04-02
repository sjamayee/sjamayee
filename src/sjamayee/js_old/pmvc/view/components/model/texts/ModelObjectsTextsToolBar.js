var ModelObjectsTextsToolBar = function() {
  this.Extends = ModelTextsToolBar;

	this.initialize = function() {
		this.parent(ModelObjectsTextsToolBar.ID);
	};
};
ModelObjectsTextsToolBar = new Class(new ModelObjectsTextsToolBar());
ModelObjectsTextsToolBar.ID = "modelObjectsTextsToolBar";
