var DataRelationsToolBar = function() {
  this.Extends = RelationsToolBar;

	this.initialize = function() {
		this.parent(DataRelationsToolBar.ID);
	};
};
DataRelationsToolBar = new Class(new DataRelationsToolBar());
DataRelationsToolBar.ID = "dataRelationsToolBar";
