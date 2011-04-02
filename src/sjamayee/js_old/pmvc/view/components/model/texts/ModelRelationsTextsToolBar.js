var ModelRelationsTextsToolBar = function() {
  this.Extends = ModelTextsToolBar;

	this.initialize = function() {
		this.parent(ModelRelationsTextsToolBar.ID);
	};
};
ModelRelationsTextsToolBar = new Class(new ModelRelationsTextsToolBar());
ModelRelationsTextsToolBar.ID = "modelRelationsTextsToolBar";
