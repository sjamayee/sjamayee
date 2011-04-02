var ModelObjectsToolBarMediator = function() {
	this.Extends = ObjectsToolBarMediator;

	this.initialize = function(viewComponent)	{
		this.parent(ModelObjectsToolBarMediator.ID,viewComponent);
		var toolBar = this.getViewComponent();
	};

  this.onFirst = function()	              {	this.sendNotification(SjamayeeFacade.OLIST_MODEL_HOME,ObjectsListMediator.HOME_MESSAGE_TEXT); };
  this.onPrevious = function()	          {	this.sendNotification(SjamayeeFacade.OLIST_MODEL_PREVIOUS,ObjectsListMediator.PREVIOUS_MESSAGE_TEXT); };
  this.onNext = function()	              {	this.sendNotification(SjamayeeFacade.OLIST_MODEL_NEXT,ObjectsListMediator.NEXT_MESSAGE_TEXT); };
  this.onLast = function()	              {	this.sendNotification(SjamayeeFacade.OLIST_MODEL_END,ObjectsListMediator.END_MESSAGE_TEXT); };
	this.onResizeList = function()	        {	this.sendNotification(SjamayeeFacade.OLIST_MODEL_RESIZE); };
  this.onAddObject = function()   	      {	this.sendNotification(SjamayeeFacade.OLIST_MODEL_OBJECT_ADD); };
  this.onDeleteObject = function()      	{	this.sendNotification(SjamayeeFacade.OLIST_MODEL_OBJECT_DELETE); };
  this.onEditObject = function()	        {	this.sendNotification(SjamayeeFacade.OLIST_MODEL_OBJECT_EDIT); };
  this.onUndoObject = function()      	  {	this.sendNotification(SjamayeeFacade.OLIST_MODEL_OBJECT_UNDO); };
  this.onRedoObject = function()	        {	this.sendNotification(SjamayeeFacade.OLIST_MODEL_OBJECT_REDO); };
  this.onClearBuffer = function()         {	this.sendNotification(SjamayeeFacade.OLIST_MODEL_BUFFER_CLEAR); };
  this.onEditText = function()	          {	this.sendNotification(SjamayeeFacade.OLIST_MODEL_TEXT_EDIT); };
  this.onDeleteUnrefObjects = function()	{	this.sendNotification(SjamayeeFacade.OLIST_MODEL_OBJECT_UNREFS_DELETE); };

	this.listNotificationInterests = function()	{
    var result = this.parent();
    return result.concat([
			SjamayeeFacade.OLIST_MODEL_TOOLBAR_SHOW
		]);
	};

	this.handleNotification = function(note)	{
    this.parent(note);
		var app = this.facade.getApplication();
		var toolBar = this.getViewComponent();
		switch (note.getName())	{
			case SjamayeeFacade.OLIST_MODEL_TOOLBAR_SHOW:
		  //alert("ModelObjectsToolBarMediator/handleNotification - OLIST_MODEL_TOOLBAR_SHOW");
			this.hide();
			this.enableButtons();
			toolBar.setAttribute("style","display:block;");
			break;
		}
	};
/*
	this.enableButtons = function() {
    this.parent();
    var toolBar = this.getViewComponent();
    toolBar.setEnabled(true);
    var display = this.facade.retrieveMediator(ModelObjectsListMediator.ID).isDisplay();
    if (!display) {			
      if (toolBar.textButton) { toolBar.textButton.disabled = true; }
    }
	};
*/
};
ModelObjectsToolBarMediator = new Class(new ModelObjectsToolBarMediator());
ModelObjectsToolBarMediator.ID = "ModelObjectsToolBarMediator";
