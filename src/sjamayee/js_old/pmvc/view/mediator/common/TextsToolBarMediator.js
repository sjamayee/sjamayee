//Abstract
var TextsToolBarMediator = function() {
	this.Extends = SjamayeeMediator;

	this.initialize = function(name,viewComponent)	{
		this.parent(name,viewComponent);
		this.onSave = this.onSave.bindWithEvent(this);
		this.onCancel = this.onCancel.bindWithEvent(this);
    this.onResize = this.onResize.bindWithEvent(this);
		var toolBar = this.getViewComponent();
		toolBar.addEvent(SjamayeeFacade.TEXT_SAVE, this.onSave);
		toolBar.addEvent(SjamayeeFacade.TEXT_CANCEL, this.onCancel);
    toolBar.addEvent(SjamayeeFacade.TEXT_RESIZE, this.onResize);
	};

	this.onSave = function()   { alert("TextsToolBarMediator/onSave"); };
	this.onCancel = function() { alert("TextsToolBarMediator/onCancel"); };
  this.onResize = function() { alert("TextsToolBarMediator/onResize"); };

	this.hide = function() {
		var dataObjectsToolBar = this.facade.retrieveMediator(DataObjectsToolBarMediator.ID).getViewComponent();
		dataObjectsToolBar.setAttribute("style","display:none;");
		var dataRelationsToolBar = this.facade.retrieveMediator(DataRelationsToolBarMediator.ID).getViewComponent();
		dataRelationsToolBar.setAttribute("style","display:none;");
		var modelObjectsToolBar = this.facade.retrieveMediator(ModelObjectsToolBarMediator.ID).getViewComponent();
		modelObjectsToolBar.setAttribute("style","display:none;");
		var modelRelationsToolBar = this.facade.retrieveMediator(ModelRelationsToolBarMediator.ID).getViewComponent();
		modelRelationsToolBar.setAttribute("style","display:none;");
		var modelObjectsTextsToolBar = this.facade.retrieveMediator(ModelObjectsTextsToolBarMediator.ID).getViewComponent();
		modelObjectsTextsToolBar.setAttribute("style","display:none;");
		var modelRelationsTextsToolBar = this.facade.retrieveMediator(ModelRelationsTextsToolBarMediator.ID).getViewComponent();
		modelRelationsTextsToolBar.setAttribute("style","display:none;");
	};
};
TextsToolBarMediator = new Class(new TextsToolBarMediator());
