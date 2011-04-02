//Abstract
var RelationsToolBarMediator = function() {
	this.Extends = SjamayeeMediator;

	this.initialize = function(name,viewComponent)	{
		this.parent(name,viewComponent);
    this.onResizeGrid = this.onResizeGrid.bindWithEvent(this);
    this.onShowParent = this.onShowParent.bindWithEvent(this);
    this.onShowParentAndChild = this.onShowParentAndChild.bindWithEvent(this);
    this.onShowChild = this.onShowChild.bindWithEvent(this);
    this.onAddRelation = this.onAddRelation.bindWithEvent(this);
    this.onDeleteRelation = this.onDeleteRelation.bindWithEvent(this);
    this.onEditRelation = this.onEditRelation.bindWithEvent(this);
    this.onExtractRelation = this.onExtractRelation.bindWithEvent(this);
    this.onCopyRelation = this.onCopyRelation.bindWithEvent(this);
    this.onPasteRelation = this.onPasteRelation.bindWithEvent(this);
    this.onUndoRelation = this.onUndoRelation.bindWithEvent(this);
    this.onRedoRelation = this.onRedoRelation.bindWithEvent(this);
    this.onClearBuffer = this.onClearBuffer.bindWithEvent(this);
    this.onEditText = this.onEditText.bindWithEvent(this);
    this.onResetGrid = this.onResetGrid.bindWithEvent(this);
    var toolBar = this.getViewComponent();
    toolBar.addEvent(SjamayeeFacade.RESIZE, this.onResizeGrid);
    toolBar.addEvent(SjamayeeFacade.GRID_PARENT_SHOW, this.onShowParent);
    toolBar.addEvent(SjamayeeFacade.GRID_PARENTANDCHILD_SHOW, this.onShowParentAndChild);
    toolBar.addEvent(SjamayeeFacade.GRID_CHILD_SHOW, this.onShowChild);
    toolBar.addEvent(SjamayeeFacade.RELATION_ADD, this.onAddRelation);
    toolBar.addEvent(SjamayeeFacade.RELATION_DELETE, this.onDeleteRelation);
    toolBar.addEvent(SjamayeeFacade.RELATION_EDIT, this.onEditRelation);
    toolBar.addEvent(SjamayeeFacade.RELATION_EXTRACT, this.onExtractRelation);
    toolBar.addEvent(SjamayeeFacade.RELATION_COPY, this.onCopyRelation);
    toolBar.addEvent(SjamayeeFacade.RELATION_PASTE, this.onPasteRelation);
    toolBar.addEvent(SjamayeeFacade.RELATION_UNDO, this.onUndoRelation);
    toolBar.addEvent(SjamayeeFacade.RELATION_REDO, this.onRedoRelation);
    toolBar.addEvent(SjamayeeFacade.GRID_BUFFER_CLEAR, this.onClearBuffer);
    toolBar.addEvent(SjamayeeFacade.TEXT_EDIT, this.onEditText);
    toolBar.addEvent(SjamayeeFacade.GRID_RESET, this.onResetGrid);
	};

	this.onResizeGrid = function()	        {	alert("RelationsToolBarMediator/onResizeGrid"); };
  this.onShowParent = function()	        { alert("RelationsToolBarMediator/onShowParent"); };
  this.onShowParentAndChild = function()  { alert("RelationsToolBarMediator/onShowParentAndChild"); };
  this.onShowChild = function()	          { alert("RelationsToolBarMediator/onShowChild"); };
  this.onAddRelation = function()	        { alert("RelationsToolBarMediator/onAddRelation"); };
  this.onDeleteRelation = function()	    { alert("RelationsToolBarMediator/onDeleteRelation"); };
  this.onEditRelation = function()	      { alert("RelationsToolBarMediator/onEditRelation"); };
  this.onExtractRelation = function()     { alert("RelationsToolBarMediator/onExtractRelation"); };
  this.onCopyRelation = function()	      { alert("RelationsToolBarMediator/onCopyRelation"); };
  this.onPasteRelation = function()	      { alert("RelationsToolBarMediator/onPasteRelation"); };
  this.onUndoRelation = function()	      { alert("RelationsToolBarMediator/onUndoRelation"); };
  this.onRedoRelation = function()	      { alert("RelationsToolBarMediator/onRedoRelation"); };
  this.onClearBuffer = function()	        { alert("RelationsToolBarMediator/onClearBuffer"); };
  this.onEditText = function()	          { alert("RelationsToolBarMediator/onEditText"); };
  this.onResetGrid = function()	          { alert("RelationsToolBarMediator/onResetGrid"); };

	this.hide = function() {
		var dataObjectsToolBar = this.facade.retrieveMediator(DataObjectsToolBarMediator.ID).getViewComponent();
		dataObjectsToolBar.setAttribute("style","display:none;");
		var dataRelationsToolBar = this.facade.retrieveMediator(DataRelationsToolBarMediator.ID).getViewComponent();
		dataRelationsToolBar.setAttribute("style","display:none;");
	  if (SjamayeeFacade.APPLICATION_TYPE == SjamayeeFacade.COMPOSER) {
		  var modelObjectsToolBar = this.facade.retrieveMediator(ModelObjectsToolBarMediator.ID).getViewComponent();
		  modelObjectsToolBar.setAttribute("style","display:none;");
		  var modelRelationsToolBar = this.facade.retrieveMediator(ModelRelationsToolBarMediator.ID).getViewComponent();
		  modelRelationsToolBar.setAttribute("style","display:none;");
		  var modelObjectsTextsToolBar = this.facade.retrieveMediator(ModelObjectsTextsToolBarMediator.ID).getViewComponent();
		  modelObjectsTextsToolBar.setAttribute("style","display:none;");
		  var modelRelationsTextsToolBar = this.facade.retrieveMediator(ModelRelationsTextsToolBarMediator.ID).getViewComponent();
		  modelRelationsTextsToolBar.setAttribute("style","display:none;");
		}
	};
	
	this.enableButtons = function() {
    var toolBar = this.getViewComponent();
    if (toolBar.parentButton)          { toolBar.parentButton.disabled = false; }
    if (toolBar.parentAndChildButton)  { toolBar.parentAndChildButton.disabled = false; }
    if (toolBar.childButton)           { toolBar.childButton.disabled = false; }
    if (toolBar.addRelationButton)     { toolBar.addRelationButton.disabled = false; }
    if (toolBar.deleteRelationButton)  { toolBar.deleteRelationButton.disabled = false; }
    if (toolBar.editRelationButton)    { toolBar.editRelationButton.disabled = false; }
    if (toolBar.extractRelationButton) { toolBar.extractRelationButton.disabled = false; }
    if (toolBar.copyRelationButton)    { toolBar.copyRelationButton.disabled = false; }
    if (toolBar.pasteRelationButton)   { toolBar.pasteRelationButton.disabled = false; }
    if (toolBar.undoRelationButton)    { toolBar.undoRelationButton.disabled = false; }
    if (toolBar.redoRelationButton)    { toolBar.redoRelationButton.disabled = false; }
    if (toolBar.clearBufferButton)     { toolBar.clearBufferButton.disabled = false; }
    if (toolBar.textButton)            { toolBar.textButton.disabled = false; }
    if (toolBar.resetGridButton)       { toolBar.resetGridButton.disabled = false; }
    var display = true;
    if (this instanceof ModelRelationsToolBarMediator) {
      display = this.facade.retrieveMediator(ModelRelationsGridMediator.ID).isDisplay();
    } else {
      display = this.facade.retrieveMediator(DataRelationsGridMediator.ID).isDisplay();
    }
    if (!display) {			
      if (toolBar.addRelationButton)     { toolBar.addRelationButton.disabled = true; }
      if (toolBar.deleteRelationButton)  { toolBar.deleteRelationButton.disabled = true; }
      if (toolBar.editRelationButton)    { toolBar.editRelationButton.disabled = true; }
      if (toolBar.extractRelationButton) { toolBar.extractRelationButton.disabled = true; }
      if (toolBar.copyRelationButton)    { toolBar.copyRelationButton.disabled = true; }
      if (toolBar.pasteRelationButton)   { toolBar.pasteRelationButton.disabled = true; }
      if (toolBar.textButton)            { toolBar.textButton.disabled = true; }
    }
  /*if (toolBar.parentButton)          { toolBar.parentButton.disabled = false; }
    if (toolBar.parentAndChildButton)  { toolBar.parentAndChildButton.disabled = false; }
    if (toolBar.childButton)           { toolBar.childButton.disabled = false; }*/
	};
};
RelationsToolBarMediator = new Class(new RelationsToolBarMediator());
RelationsToolBarMediator.ID = "RelationsToolBarMediator";
