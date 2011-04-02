var DataObjectsToolBarMediator = function() {
	this.Extends = ObjectsToolBarMediator;

	this.initialize = function(viewComponent)	{
		this.parent(DataObjectsToolBarMediator.ID,viewComponent);
		var toolBar = this.getViewComponent();
	};

  this.onFirst = function()	              {	this.sendNotification(SjamayeeFacade.OLIST_DATA_HOME,ObjectsListMediator.HOME_MESSAGE_TEXT); };
  this.onPrevious = function()	          {	this.sendNotification(SjamayeeFacade.OLIST_DATA_PREVIOUS,ObjectsListMediator.PREVIOUS_MESSAGE_TEXT); };
  this.onNext = function()	              {	this.sendNotification(SjamayeeFacade.OLIST_DATA_NEXT,ObjectsListMediator.NEXT_MESSAGE_TEXT); };
  this.onLast = function()	              {	this.sendNotification(SjamayeeFacade.OLIST_DATA_END,ObjectsListMediator.END_MESSAGE_TEXT); };
	this.onResizeList = function()	        {	this.sendNotification(SjamayeeFacade.OLIST_DATA_RESIZE); };
  this.onAddObject = function()   	      {	this.sendNotification(SjamayeeFacade.OLIST_DATA_OBJECT_ADD); };
  this.onDeleteObject = function()      	{	this.sendNotification(SjamayeeFacade.OLIST_DATA_OBJECT_DELETE); };
  this.onEditObject = function()	        {	this.sendNotification(SjamayeeFacade.OLIST_DATA_OBJECT_EDIT); };
  this.onUndoObject = function()      	  {	this.sendNotification(SjamayeeFacade.OLIST_DATA_OBJECT_UNDO); };
  this.onRedoObject = function()	        {	this.sendNotification(SjamayeeFacade.OLIST_DATA_OBJECT_REDO); };
  this.onClearBuffer = function()         {	this.sendNotification(SjamayeeFacade.OLIST_DATA_BUFFER_CLEAR); };
//this.onEditText = function()	          {	this.sendNotification(SjamayeeFacade.OLIST_DATA_TEXT_EDIT); };
  this.onDeleteUnrefObjects = function()	{	this.sendNotification(SjamayeeFacade.OLIST_DATA_OBJECT_UNREFS_DELETE); };

	this.listNotificationInterests = function()	{
    var result = this.parent();
    return result.concat([
			SjamayeeFacade.OLIST_DATA_TOOLBAR_SHOW
		]);
	};

	this.handleNotification = function(note)	{
    this.parent(note);
		var app = this.facade.getApplication();
		var toolBar = this.getViewComponent();
		switch (note.getName())	{
			case SjamayeeFacade.OLIST_DATA_TOOLBAR_SHOW:
		  //alert("DataObjectsToolBarMediator/handleNotification - OLIST_DATA_TOOLBAR_SHOW");
			this.hide();
			this.enableButtons();
			toolBar.setAttribute("style","display:block;");
			break;
		}
	};
};
DataObjectsToolBarMediator = new Class(new DataObjectsToolBarMediator());
DataObjectsToolBarMediator.ID = "DataObjectsToolBarMediator";
