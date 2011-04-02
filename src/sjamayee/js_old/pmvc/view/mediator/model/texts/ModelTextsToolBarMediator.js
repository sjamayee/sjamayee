//Abstract
var ModelTextsToolBarMediator = function() {
	this.Extends = TextsToolBarMediator;

	this.initialize = function(name,viewComponent)	{
		this.parent(name,viewComponent);
	};
};
ModelTextsToolBarMediator = new Class(new ModelTextsToolBarMediator());
