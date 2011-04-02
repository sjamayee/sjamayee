//Abstract
var ObjectsToolBar = function() {
  this.Extends = SjamayeeUIComponent;

  this.messageText = null;
 	this.resizeButton = null;
	this.firstButton = null;
	this.previousButton = null;
	this.nextButton = null;
	this.lastButton = null;
	this.updateButtons = null;
	this.addObjectButton = null;
	this.deleteObjectButton = null;
	this.editObjectButton = null;
	this.undoObjectButton = null;
	this.redoObjectButton = null;
	this.clearBufferButton = null;
	this.textButton = null;
	this.deleteUnrefObjectsButton = null;

	this.initialize = function(name,properties) {
    var html = '<div id="'+name+ToolBar.COMMON_TOOLBAR_ID+'" class="'+ToolBar.COMMON_TOOLBAR_CLASS_ID+'">'+
  		         '<input type="text" id="'+name+ToolBar.MESSAGE_TEXT_ID+'" class="'+ToolBar.MESSAGE_TEXT_CLASS_ID+'" value=""/>'+
  		         '</div>'+
		           '<div id="'+name+ObjectsToolBar.SPECIAL_ID+'" class="'+ToolBar.SPECIAL_CLASS_ID+'">'+
		           '<div id="'+name+ObjectsToolBar.NAVIGATION_BUTTONS_ID+'" class="'+ToolBar.NAVIGATION_BUTTONS_CLASS_ID+'">'+
               '<button id="'+name+ObjectsToolBar.RESIZE_BUTTON_ID+'" class="'+ObjectsToolBar.RESIZE_BUTTON_CLASS_ID+'" style="vertical-align:middle;">'+ObjectsToolBar.RESIZE_BUTTON_NORMAL_VALUE+'</button>'+
							 '<button id="'+name+ObjectsToolBar.LAST_BUTTON_ID+'" class="'+ToolBar.BUTTON_CLASS_ID+'" style="position:relative;float:right;margin-right:25px;">'+ObjectsToolBar.LAST_BUTTON_VALUE+'</button>'+
							 '<button id="'+name+ObjectsToolBar.NEXT_BUTTON_ID+'" class="'+ToolBar.BUTTON_CLASS_ID+'" style="position:relative;float:right;margin-right:5px;">'+ObjectsToolBar.NEXT_BUTTON_VALUE+'</button>'+
							 '<button id="'+name+ObjectsToolBar.PREVIOUS_BUTTON_ID+'" class="'+ToolBar.BUTTON_CLASS_ID+'" style="position:relative;float:right;margin-right:5px;">'+ObjectsToolBar.PREVIOUS_BUTTON_VALUE+'</button>'+
							 '<button id="'+name+ObjectsToolBar.FIRST_BUTTON_ID+'" class="'+ToolBar.BUTTON_CLASS_ID+'" style="position:relative;float:right;margin-right:5px;">'+ObjectsToolBar.FIRST_BUTTON_VALUE+'</button>'+
							 '</div>';
		if (SjamayeeFacade.APPLICATION_TYPE != SjamayeeFacade.BROWSER) {
			html += '<div id="'+name+ObjectsToolBar.UPDATE_BUTTONS_ID+'" class="'+ToolBar.UPDATE_BUTTONS_CLASS_ID+'">'+
						  '<button id="'+name+ObjectsToolBar.ADD_OBJECT_BUTTON_ID+'" type="button" class="'+ToolBar.BUTTON_CLASS_ID+'" style="width:25px;margin-left:40px;">'+ObjectsToolBar.ADD_OBJECT_BUTTON_VALUE+'</button>'+
						  '<button id="'+name+ObjectsToolBar.DELETE_OBJECT_BUTTON_ID+'" type="button" class="'+ToolBar.BUTTON_CLASS_ID+'" style="width:25px;margin-left:10px;">'+ObjectsToolBar.DELETE_OBJECT_BUTTON_VALUE+'</button>'+
						  '<button id="'+name+ObjectsToolBar.EDIT_OBJECT_BUTTON_ID+'" class="'+ToolBar.BUTTON_CLASS_ID+'" style="margin-left:10px;">'+ObjectsToolBar.EDIT_OBJECT_BUTTON_VALUE+'</button>'+
						  '<button id="'+name+ObjectsToolBar.UNDO_OBJECT_BUTTON_ID+'" class="'+ToolBar.BUTTON_CLASS_ID+'" style="margin-left:10px;">'+ObjectsToolBar.UNDO_OBJECT_BUTTON_VALUE+'</button>'+
						  '<button id="'+name+ObjectsToolBar.REDO_OBJECT_BUTTON_ID+'" class="'+ToolBar.BUTTON_CLASS_ID+'" style="margin-left:10px;">'+ObjectsToolBar.REDO_OBJECT_BUTTON_VALUE+'</button>'+
						  '<button id="'+name+ObjectsToolBar.CLEAR_BUFFER_BUTTON_ID+'" class="'+ToolBar.BUTTON_CLASS_ID+'" style="margin-left:10px;">'+ObjectsToolBar.CLEAR_BUFFER_BUTTON_VALUE+'</button>'+
         		  '<button id="'+name+ObjectsToolBar.DELETE_UNREFOBS_BUTTON_ID+'" class="'+ObjectsToolBar.DELETE_UNREFOBS_BUTTON_CLASS_ID+'">'+ObjectsToolBar.DELETE_UNREFOBS_BUTTON_VALUE+'</button>';
    }
	  if (this instanceof ModelObjectsToolBar) {
      html += '<button id="'+name+ObjectsToolBar.TEXT_BUTTON_ID+'" class="'+ObjectsToolBar.TEXT_BUTTON_CLASS_ID+'">'+ObjectsToolBar.TEXT_BUTTON_VALUE+'</button>';
	  } else {
  		if (SjamayeeFacade.APPLICATION_TYPE != SjamayeeFacade.BROWSER) {
        html += '</div>';
      } else {
	      html += '<div style="width:100px;height:100%;"/>';
	    }
	  }
    html += '</div>';
		this.parent(name,{html:html});
    this.resizeButton_clickHandler = this.resizeButton_clickHandler.bindWithEvent(this);
		this.firstButton_clickHandler = this.firstButton_clickHandler.bindWithEvent(this);
		this.previousButton_clickHandler = this.previousButton_clickHandler.bindWithEvent(this);
		this.nextButton_clickHandler = this.nextButton_clickHandler.bindWithEvent(this);
		this.lastButton_clickHandler = this.lastButton_clickHandler.bindWithEvent(this);
		this.addObjectButton_clickHandler = this.addObjectButton_clickHandler.bindWithEvent(this);
		this.deleteObjectButton_clickHandler = this.deleteObjectButton_clickHandler.bindWithEvent(this);
		this.editObjectButton_clickHandler = this.editObjectButton_clickHandler.bindWithEvent(this);
		this.undoObjectButton_clickHandler = this.undoObjectButton_clickHandler.bindWithEvent(this);
		this.redoObjectButton_clickHandler = this.redoObjectButton_clickHandler.bindWithEvent(this);
		this.clearBufferButton_clickHandler = this.clearBufferButton_clickHandler.bindWithEvent(this);
	  this.textButton_clickHandler = this.textButton_clickHandler.bindWithEvent(this);
		this.deleteUnrefObjectsButton_clickHandler = this.deleteUnrefObjectsButton_clickHandler.bindWithEvent(this);
	};

  this.initializeChildren = function() {
    //this.parent();
    var name = this.getUicName();
    this.messageText = $(name+ToolBar.MESSAGE_TEXT_ID);
    this.resizeButton = $(name+ObjectsToolBar.RESIZE_BUTTON_ID);
		this.firstButton = $(name+ObjectsToolBar.FIRST_BUTTON_ID);
		this.previousButton = $(name+ObjectsToolBar.PREVIOUS_BUTTON_ID);
		this.nextButton = $(name+ObjectsToolBar.NEXT_BUTTON_ID);
		this.lastButton = $(name+ObjectsToolBar.LAST_BUTTON_ID);
		this.updateButtons = $(name+ObjectsToolBar.UPDATE_BUTTONS_ID);
		if (SjamayeeFacade.APPLICATION_TYPE != SjamayeeFacade.BROWSER) {
		  this.addObjectButton = $(name+ObjectsToolBar.ADD_OBJECT_BUTTON_ID);
		  this.deleteObjectButton = $(name+ObjectsToolBar.DELETE_OBJECT_BUTTON_ID);
		  this.editObjectButton = $(name+ObjectsToolBar.EDIT_OBJECT_BUTTON_ID);
		  this.undoObjectButton = $(name+ObjectsToolBar.UNDO_OBJECT_BUTTON_ID);
		  this.redoObjectButton = $(name+ObjectsToolBar.REDO_OBJECT_BUTTON_ID);
		  this.clearBufferButton = $(name+ObjectsToolBar.CLEAR_BUFFER_BUTTON_ID);
  		this.deleteUnrefObjectsButton = $(name+ObjectsToolBar.DELETE_UNREFOBS_BUTTON_ID);
		}
 	  if (this instanceof ModelObjectsToolBar) {
		  this.textButton = $(name+ObjectsToolBar.TEXT_BUTTON_ID);
		}
  };

  this.childrenInitialized = function() {
    //this.parent();
    var name = this.getUicName();
    this.resizeButton.addEvent(SjamayeeFacade.CLICK, this.resizeButton_clickHandler);
		this.firstButton.addEvent(SjamayeeFacade.CLICK, this.firstButton_clickHandler);
		this.previousButton.addEvent(SjamayeeFacade.CLICK, this.previousButton_clickHandler);
		this.nextButton.addEvent(SjamayeeFacade.CLICK, this.nextButton_clickHandler);
		this.lastButton.addEvent(SjamayeeFacade.CLICK, this.lastButton_clickHandler);
		if (SjamayeeFacade.APPLICATION_TYPE != SjamayeeFacade.BROWSER) {
		  this.addObjectButton.addEvent(SjamayeeFacade.CLICK, this.addObjectButton_clickHandler);
		  this.deleteObjectButton.addEvent(SjamayeeFacade.CLICK, this.deleteObjectButton_clickHandler);
		  this.editObjectButton.addEvent(SjamayeeFacade.CLICK, this.editObjectButton_clickHandler);
		  this.undoObjectButton.addEvent(SjamayeeFacade.CLICK, this.undoObjectButton_clickHandler);
		  this.redoObjectButton.addEvent(SjamayeeFacade.CLICK, this.redoObjectButton_clickHandler);
		  this.clearBufferButton.addEvent(SjamayeeFacade.CLICK, this.clearBufferButton_clickHandler);
  		this.deleteUnrefObjectsButton.addEvent(SjamayeeFacade.CLICK, this.deleteUnrefObjectsButton_clickHandler);
		}
		if (this instanceof ModelObjectsToolBar) {
		  this.textButton.addEvent(SjamayeeFacade.CLICK, this.textButton_clickHandler);
		}
	};
/*
	this.initializationComplete = function() {
		this.setEnabled(true);
	}

	this.setEnabled = function(isEnabled)	{
    if (this.firstButton)              { this.firstButton.disabled = !isEnabled; }
    if (this.previousButton)           { this.previousButton.disabled = !isEnabled; }
    if (this.nextButton)               { this.nextButton.disabled = !isEnabled; }
    if (this.lastButton)               { this.lastButton.disabled = !isEnabled; }
    if (this.addObjectButton)          { this.addObjectButton.disabled = !isEnabled; }
    if (this.deleteObjectButton)       { this.deleteObjectButton.disabled = !isEnabled; }
    if (this.editObjectButton)         { this.editObjectButton.disabled = !isEnabled; }
    if (this.undoObjectButton)         { this.undoObjectButton.disabled = !isEnabled; }
    if (this.redoObjectButton)         { this.redoObjectButton.disabled = !isEnabled; }
    if (this.clearBufferButton)        { this.clearBufferButton.disabled = !isEnabled; }
    if (this.textButton)               { this.textButton.disabled = !isEnabled; }
    if (this.deleteUnrefObjectsButton) { this.deleteUnrefObjectsButton.disabled = !isEnabled; }
	}
*/
  this.resizeButton_clickHandler = function()	            { this.fireEvent(SjamayeeFacade.RESIZE); };
	this.firstButton_clickHandler = function()	            {	this.fireEvent(SjamayeeFacade.HOME);	};
	this.previousButton_clickHandler = function()	          {	this.fireEvent(SjamayeeFacade.PREVIOUS);	};
	this.nextButton_clickHandler = function()	              {	this.fireEvent(SjamayeeFacade.NEXT);	};
	this.lastButton_clickHandler = function()	              {	this.fireEvent(SjamayeeFacade.END); };
	this.addObjectButton_clickHandler = function()	        {	this.fireEvent(SjamayeeFacade.OBJECT_ADD);	};
	this.deleteObjectButton_clickHandler = function()	      {	this.fireEvent(SjamayeeFacade.OBJECT_DELETE); };
	this.editObjectButton_clickHandler = function()	        {	this.fireEvent(SjamayeeFacade.OBJECT_EDIT); };
	this.undoObjectButton_clickHandler = function()	        {	this.fireEvent(SjamayeeFacade.OBJECT_UNDO); };
	this.redoObjectButton_clickHandler = function()	        {	this.fireEvent(SjamayeeFacade.OBJECT_REDO); };
	this.clearBufferButton_clickHandler = function()	      {	this.fireEvent(SjamayeeFacade.OBJECT_BUFFER_CLEAR); };
	this.textButton_clickHandler = function()	              {	this.fireEvent(SjamayeeFacade.TEXT_EDIT); };
	this.deleteUnrefObjectsButton_clickHandler = function()	{	this.fireEvent(SjamayeeFacade.OBJECT_UNREFS_DELETE);	};	
};
ObjectsToolBar = new Class(new ObjectsToolBar());
ObjectsToolBar.SPECIAL_ID = "Special";
ObjectsToolBar.NAVIGATION_BUTTONS_ID = "NavigationButtons";
ObjectsToolBar.UPDATE_BUTTONS_ID = "UpdateButtons";
ObjectsToolBar.FIRST_BUTTON_ID = "firstButton";
ObjectsToolBar.FIRST_BUTTON_VALUE = "First Page";
ObjectsToolBar.PREVIOUS_BUTTON_ID = "previousButton";
ObjectsToolBar.PREVIOUS_BUTTON_VALUE = "Previous";
ObjectsToolBar.NEXT_BUTTON_ID = "nextButton";
ObjectsToolBar.NEXT_BUTTON_VALUE = "Next";
ObjectsToolBar.LAST_BUTTON_ID = "lastButton";
ObjectsToolBar.LAST_BUTTON_VALUE = "Last Page";
ObjectsToolBar.RESIZE_BUTTON_ID = "resizeButton";
ObjectsToolBar.RESIZE_BUTTON_NORMAL_VALUE = "LIST | list";
ObjectsToolBar.RESIZE_BUTTON_FULL_VALUE = "list | LIST";
ObjectsToolBar.RESIZE_BUTTON_CLASS_ID = "objectsToolBarResizeButton";
ObjectsToolBar.ADD_OBJECT_BUTTON_ID= "addObjectButton";
ObjectsToolBar.ADD_OBJECT_BUTTON_VALUE= "+";
ObjectsToolBar.DELETE_OBJECT_BUTTON_ID = "deleteObjectButton";
ObjectsToolBar.DELETE_OBJECT_BUTTON_VALUE = "-";
ObjectsToolBar.EDIT_OBJECT_BUTTON_ID = "editObjectButton";
ObjectsToolBar.EDIT_OBJECT_BUTTON_VALUE = "Edit";
ObjectsToolBar.UNDO_OBJECT_BUTTON_ID = "undoObjectButton";
ObjectsToolBar.UNDO_OBJECT_BUTTON_VALUE = "Undo";
ObjectsToolBar.REDO_OBJECT_BUTTON_ID = "redoObjectButton";
ObjectsToolBar.REDO_OBJECT_BUTTON_VALUE = "Redo";
ObjectsToolBar.CLEAR_BUFFER_BUTTON_ID = "clearObjectsBufferButton";
ObjectsToolBar.CLEAR_BUFFER_BUTTON_VALUE = "Clear Buffer...";
ObjectsToolBar.TEXT_BUTTON_ID = "textButton";
ObjectsToolBar.TEXT_BUTTON_VALUE = "Edit text...";
ObjectsToolBar.TEXT_BUTTON_CLASS_ID = "objectsToolBarTextButton";
ObjectsToolBar.DELETE_UNREFOBS_BUTTON_ID = "deleteUnreferencedObjectsButton";
ObjectsToolBar.DELETE_UNREFOBS_BUTTON_VALUE = "Delete Unreferenced Objects";
ObjectsToolBar.DELETE_UNREFOBS_BUTTON_CLASS_ID = "deleteUnreferencedObjectsButton";
