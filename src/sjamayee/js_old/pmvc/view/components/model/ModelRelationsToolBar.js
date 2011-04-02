var ModelRelationsToolBar = function() {
  this.Extends = RelationsToolBar;

	this.initialize = function() {
		this.parent(ModelRelationsToolBar.ID);
	};
};
ModelRelationsToolBar = new Class(new ModelRelationsToolBar());
ModelRelationsToolBar.ID = "modelRelationsToolBar";
