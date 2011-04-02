//Abstract
var ModelTextsToolBar = function() {
  this.Extends = TextsToolBar;

	this.initialize = function(name,properties) {
		this.parent(name);
	};
};
ModelTextsToolBar = new Class(new ModelTextsToolBar());
