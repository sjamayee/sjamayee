var DataRelationsToolBarMediator = function() {
	this.Extends = RelationsToolBarMediator;

	this.initialize = function(viewComponent)	{
		this.parent(DataRelationsToolBarMediator.ID,viewComponent);
		var toolBar = this.getViewComponent();
	};

  this.onShowParent = function() {
    //this.sendNotification(SjamayeeFacade.GRID_PARENT_SHOW);
    this.sendNotification(SjamayeeFacade.GRID_DATA_PARENT_SHOW);
  };
  this.onShowParentAndChild = function() {
    //this.sendNotification(SjamayeeFacade.GRID_PARENTANDCHILD_SHOW);
    this.sendNotification(SjamayeeFacade.GRID_DATA_PARENTANDCHILD_SHOW);
  };
  this.onShowChild = function() {
    //this.sendNotification(SjamayeeFacade.GRID_CHILD_SHOW);
    this.sendNotification(SjamayeeFacade.GRID_DATA_CHILD_SHOW);
  };
	this.onResizeGrid = function()      {	this.sendNotification(SjamayeeFacade.GRID_DATA_RESIZE); };
  this.onAddRelation = function()	    { this.sendNotification(SjamayeeFacade.GRID_DATA_RELATION_ADD); };
  this.onDeleteRelation = function()	{ this.sendNotification(SjamayeeFacade.GRID_DATA_RELATION_DELETE); };
  this.onEditRelation = function()	  { this.sendNotification(SjamayeeFacade.GRID_DATA_RELATION_EDIT); };
  this.onExtractRelation = function() { this.sendNotification(SjamayeeFacade.GRID_DATA_RELATION_EXTRACT); };
  this.onCopyRelation = function()	  { this.sendNotification(SjamayeeFacade.GRID_DATA_RELATION_COPY); };
  this.onPasteRelation = function()	  { this.sendNotification(SjamayeeFacade.GRID_DATA_RELATION_PASTE); };
  this.onUndoRelation = function()	  { this.sendNotification(SjamayeeFacade.GRID_DATA_RELATION_UNDO); };
  this.onRedoRelation = function()	  { this.sendNotification(SjamayeeFacade.GRID_DATA_RELATION_REDO); };
  this.onClearBuffer = function()	    { this.sendNotification(SjamayeeFacade.GRID_DATA_BUFFER_CLEAR); };
//this.onEditText = function()	      { this.sendNotification(SjamayeeFacade.GRID_DATA_TEXT_EDIT); };
  this.onResetGrid = function()	      { this.sendNotification(SjamayeeFacade.GRID_DATA_RESET); };

	this.listNotificationInterests = function()	{
    var result = this.parent();
    return result.concat([
			SjamayeeFacade.GRID_DATA_TOOLBAR_SHOW,
			SjamayeeFacade.GRID_DATA_RESIZED
		]);
	};

	this.handleNotification = function(note)	{
    this.parent(note);
		var app = this.facade.getApplication();
		var toolBar = this.getViewComponent();
		switch (note.getName())	{
			case SjamayeeFacade.GRID_DATA_TOOLBAR_SHOW:
		  //alert("DataRelationsToolBarMediator/handleNotification - GRID_DATA_TOOLBAR_SHOW");
			this.hide();
			this.enableButtons();
			toolBar.setAttribute("style","display:block;");
			break;
			case SjamayeeFacade.GRID_DATA_RESIZED:
		  //alert("DataRelationsToolBarMediator/handleNotification - GRID_DATA_RESIZED");
		  var sizeNormal = note.getBody();
		  var style = "display:"+(sizeNormal?"block":"none");
    	//toolBar.childButton.setAttribute("style",style);
    	//toolBar.parentAndChildButton.setAttribute("style",style);
    	//toolBar.parentButton.setAttribute("style",style);
		  toolBar.parentAndChildButtons.setAttribute("style",style);
			break;
		}
	};
};
DataRelationsToolBarMediator = new Class(new DataRelationsToolBarMediator());
DataRelationsToolBarMediator.ID = "DataRelationsToolBarMediator";
