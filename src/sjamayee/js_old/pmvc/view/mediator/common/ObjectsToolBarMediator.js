//Abstract
var ObjectsToolBarMediator = function() {
	this.Extends = SjamayeeMediator;

	this.initialize = function(name,viewComponent)	{
		this.parent(name,viewComponent);
    this.onResizeList = this.onResizeList.bindWithEvent(this);
    this.onFirst = this.onFirst.bindWithEvent(this);
    this.onPrevious = this.onPrevious.bindWithEvent(this);
    this.onNext = this.onNext.bindWithEvent(this);
    this.onLast = this.onLast.bindWithEvent(this);
    this.onAddObject = this.onAddObject.bindWithEvent(this);
    this.onDeleteObject = this.onDeleteObject.bindWithEvent(this);
    this.onEditObject = this.onEditObject.bindWithEvent(this);
    this.onUndoObject = this.onUndoObject.bindWithEvent(this);
    this.onRedoObject = this.onRedoObject.bindWithEvent(this);
    this.onClearBuffer = this.onClearBuffer.bindWithEvent(this);
    this.onEditText = this.onEditText.bindWithEvent(this);
    this.onDeleteUnrefObjects = this.onDeleteUnrefObjects.bindWithEvent(this);
    var toolBar = this.getViewComponent();
    toolBar.addEvent(SjamayeeFacade.RESIZE, this.onResizeList);
    toolBar.addEvent(SjamayeeFacade.HOME, this.onFirst);
    toolBar.addEvent(SjamayeeFacade.PREVIOUS, this.onPrevious);
    toolBar.addEvent(SjamayeeFacade.NEXT, this.onNext);
    toolBar.addEvent(SjamayeeFacade.END, this.onLast);
    toolBar.addEvent(SjamayeeFacade.OBJECT_ADD, this.onAddObject);
    toolBar.addEvent(SjamayeeFacade.OBJECT_DELETE, this.onDeleteObject);
    toolBar.addEvent(SjamayeeFacade.OBJECT_EDIT, this.onEditObject);
    toolBar.addEvent(SjamayeeFacade.OBJECT_UNDO, this.onUndoObject);
    toolBar.addEvent(SjamayeeFacade.OBJECT_REDO, this.onRedoObject);
    toolBar.addEvent(SjamayeeFacade.OBJECT_BUFFER_CLEAR, this.onClearBuffer);
    toolBar.addEvent(SjamayeeFacade.TEXT_EDIT, this.onEditText);
    toolBar.addEvent(SjamayeeFacade.OBJECT_UNREFS_DELETE, this.onDeleteUnrefObjects);
	};

	this.onResizeList = function()	        {	alert("ObjectsToolBarMediator/onResizeList"); };
  this.onFirst = function()	              {	alert("ObjectsToolBarMediator/onFirst"); };
  this.onPrevious = function()	          {	alert("ObjectsToolBarMediator/onPrevious"); };
  this.onNext = function()	              {	alert("ObjectsToolBarMediator/onNext"); };
  this.onLast = function()	              {	alert("ObjectsToolBarMediator/onLast"); };
  this.onAddObject = function()   	      {	alert("ObjectsToolBarMediator/onAddObject"); };
  this.onDeleteObject = function()      	{	alert("ObjectsToolBarMediator/onDeleteObject"); };
  this.onEditObject = function()	        {	alert("ObjectsToolBarMediator/onEditObject"); };
  this.onUndoObject = function()      	  {	alert("ObjectsToolBarMediator/onUndoObject"); };
  this.onRedoObject = function()	        {	alert("ObjectsToolBarMediator/onRedoObject"); };
  this.onClearBuffer = function()         {	alert("ObjectsToolBarMediator/onClearBuffer"); };
  this.onEditText = function()	          {	alert("ObjectsToolBarMediator/onEditText"); };
  this.onDeleteUnrefObjects = function()	{	alert("ObjectsToolBarMediator/onDeleteUnrefObjects"); };

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
    if (toolBar.firstButton)              { toolBar.firstButton.disabled = false; }
    if (toolBar.previousButton)           { toolBar.previousButton.disabled = false; }
    if (toolBar.nextButton)               { toolBar.nextButton.disabled = false; }
    if (toolBar.lastButton)               { toolBar.lastButton.disabled = false; }
  	if (toolBar.addObjectButton)          { toolBar.addObjectButton.disabled = false; }
  	if (toolBar.deleteObjectButton)       { toolBar.deleteObjectButton.disabled = false; }
  	if (toolBar.editObjectButton)         { toolBar.editObjectButton.disabled = false; }
    if (toolBar.undoObjectButton)         { toolBar.undoObjectButton.disabled = false; }
    if (toolBar.redoObjectButton)         { toolBar.redoObjectButton.disabled = false; }
    if (toolBar.clearBufferButton)        { toolBar.clearBufferButton.disabled = false; }
    if (toolBar.textButton)               { toolBar.textButton.disabled = false; }
    if (toolBar.deleteUnrefObjectsButton) { toolBar.deleteUnrefObjectsButton.disabled = false; }
    var display = true;
    var paging = null;
    if (this instanceof ModelObjectsToolBarMediator) {
      display = this.facade.retrieveMediator(ModelObjectsListMediator.ID).isDisplay();
      paging = this.facade.retrieveMediator(ModelObjectsListMediator.ID).getPaging();
    } else {
      display = this.facade.retrieveMediator(DataObjectsListMediator.ID).isDisplay();
      paging = this.facade.retrieveMediator(DataObjectsListMediator.ID).getPaging();
    }
    if (paging) {
      if (toolBar.firstButton)        { toolBar.firstButton.disabled = (paging == PagingMediator.PAGE_FIRST)?true:false; }
      if (toolBar.previousButton)     { toolBar.previousButton.disabled = (paging == PagingMediator.PAGE_FIRST)?true:false; }
      if (toolBar.nextButton)         { toolBar.nextButton.disabled = (paging == PagingMediator.PAGE_LAST)?true:false; }
      if (toolBar.lastButton)         { toolBar.lastButton.disabled = (paging == PagingMediator.PAGE_LAST)?true:false; }
    }
    if (!display) {			
  	  if (toolBar.addObjectButton)    { toolBar.addObjectButton.disabled = true; }
  	  if (toolBar.deleteObjectButton) { toolBar.deleteObjectButton.disabled = true; }
  	  if (toolBar.editObjectButton)   { toolBar.editObjectButton.disabled = true; }
      if (toolBar.textButton)         { toolBar.textButton.disabled = true; }
    }
	};
};
ObjectsToolBarMediator = new Class(new ObjectsToolBarMediator());
