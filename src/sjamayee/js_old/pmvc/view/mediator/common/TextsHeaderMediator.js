//Abstract
var TextsHeaderMediator = function() {
	this.Extends = SjamayeeMediator;

	this.initialize = function(name,viewComponent)	{
		this.parent(name,viewComponent);
	};
	
	this.hide = function() {
		var dataObjectsHeader = this.facade.retrieveMediator(DataObjectsHeaderMediator.ID).getViewComponent();
		dataObjectsHeader.setAttribute("style","display:none;");
		var dataRelationsHeader = this.facade.retrieveMediator(DataRelationsHeaderMediator.ID).getViewComponent();
		dataRelationsHeader.setAttribute("style","display:none;");
		var modelObjectsHeader = this.facade.retrieveMediator(ModelObjectsHeaderMediator.ID).getViewComponent();
		modelObjectsHeader.setAttribute("style","display:none;");
		var modelObjectsTextsHeader = this.facade.retrieveMediator(ModelObjectsTextsHeaderMediator.ID).getViewComponent();
		modelObjectsTextsHeader.setAttribute("style","display:none;");
		var modelRelationsHeader = this.facade.retrieveMediator(ModelRelationsHeaderMediator.ID).getViewComponent();
		modelRelationsHeader.setAttribute("style","display:none;");
		var modelRelationsTextsHeader = this.facade.retrieveMediator(ModelRelationsTextsHeaderMediator.ID).getViewComponent();
		modelRelationsTextsHeader.setAttribute("style","display:none;");
	};
};
TextsHeaderMediator = new Class(new TextsHeaderMediator());
