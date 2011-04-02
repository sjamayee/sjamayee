//Abstract
var RelationsToolBar = function() {
  this.Extends = SjamayeeUIComponent;

  this.messageText = null;
 	this.resizeButton = null;
  this.parentAndChildButtons = null;
	this.parentButton = null;
	this.parentAndChildButton = null;
	this.childButton = null;
	this.updateButtons = null;
	this.addRelationButton = null;
	this.deleteRelationButton = null;
	this.editRelationButton = null;
	this.extractRelationButton = null;
	this.copyRelationButton = null;
	this.pasteRelationButton = null;
	this.undoRelationButton = null;
	this.redoRelationButton = null;
	this.clearBufferButton = null;
	this.textButton = null;
	this.resetGridButton = null;

	this.initialize = function(name,properties) {
    var html = '<div id="'+name+ToolBar.COMMON_TOOLBAR_ID+'" class="'+ToolBar.COMMON_TOOLBAR_CLASS_ID+'">'+
  		         '<input type="text" id="'+name+ToolBar.MESSAGE_TEXT_ID+'" class="'+ToolBar.MESSAGE_TEXT_CLASS_ID+'" value=""/>'+
  		         '</div>'+
		           '<div id="'+name+RelationsToolBar.SPECIAL_ID+'" class="'+ToolBar.SPECIAL_CLASS_ID+'">'+
		           '<div id="'+name+RelationsToolBar.NAVIGATION_BUTTONS_ID+'" class="'+ToolBar.NAVIGATION_BUTTONS_CLASS_ID+'">'+
               '<button id="'+name+RelationsToolBar.RESIZE_BUTTON_ID+'" class="'+RelationsToolBar.RESIZE_BUTTON_CLASS_ID+'">'+RelationsToolBar.RESIZE_BUTTON_NORMAL_VALUE+'</button>'+
		           '<div id="'+name+RelationsToolBar.PARENTANDCHILD_BUTTONS_ID+'" class="'+RelationsToolBar.PARENTANDCHILD_BUTTONS_CLASS_ID+'">'+
		           '<button id="'+name+RelationsToolBar.CHILD_BUTTON_ID+'" class="'+ToolBar.BUTTON_CLASS_ID+'" style="position:relative;float:right;">'+RelationsToolBar.CHILD_BUTTON_VALUE+'</button>'+
					     '<button id="'+name+RelationsToolBar.PARENTANDCHILD_BUTTON_ID+'" class="'+ToolBar.BUTTON_CLASS_ID+'" style="position:relative;float:right;margin-right:5px;">'+RelationsToolBar.PARENTANDCHILD_BUTTON_VALUE+'</button>'+
						   '<button id="'+name+RelationsToolBar.PARENT_BUTTON_ID+'" class="'+ToolBar.BUTTON_CLASS_ID+'" style="position:relative;float:right;margin-right:5px;">'+RelationsToolBar.PARENT_BUTTON_VALUE+'</button>'+
		           '</div>'+
		           '</div>'+
			         '<div id="'+name+RelationsToolBar.UPDATE_BUTTONS_ID+'" class="'+ToolBar.UPDATE_BUTTONS_CLASS_ID+'">';
		if (SjamayeeFacade.APPLICATION_TYPE != SjamayeeFacade.BROWSER) {
			html += '<button id="'+name+RelationsToolBar.ADD_RELATION_BUTTON_ID+'" class="'+ToolBar.BUTTON_CLASS_ID+'" style="width:25px;margin-left:20px;">'+RelationsToolBar.ADD_RELATION_BUTTON_VALUE+'</button>'+
						  '<button id="'+name+RelationsToolBar.DELETE_RELATION_BUTTON_ID+'" class="'+ToolBar.BUTTON_CLASS_ID+'" style="width:25px;margin-left:5px;">'+RelationsToolBar.DELETE_RELATION_BUTTON_VALUE+'</button>'+
						  '<button id="'+name+RelationsToolBar.EDIT_RELATION_BUTTON_ID+'" class="'+ToolBar.BUTTON_CLASS_ID+'" style="margin-left:5px;">'+RelationsToolBar.EDIT_RELATION_BUTTON_VALUE+'</button>'+
						  '<button id="'+name+RelationsToolBar.EXTRACT_RELATION_BUTTON_ID+'" class="'+ToolBar.BUTTON_CLASS_ID+'" style="margin-left:5px;">'+RelationsToolBar.EXTRACT_RELATION_BUTTON_VALUE+'</button>'+
						  '<button id="'+name+RelationsToolBar.COPY_RELATION_BUTTON_ID+'" class="'+ToolBar.BUTTON_CLASS_ID+'" style="margin-left:5px;">'+RelationsToolBar.COPY_RELATION_BUTTON_VALUE+'</button>'+
						  '<button id="'+name+RelationsToolBar.PASTE_RELATION_BUTTON_ID+'" class="'+ToolBar.BUTTON_CLASS_ID+'" style="margin-left:5px;">'+RelationsToolBar.PASTE_RELATION_BUTTON_VALUE+'</button>'+
						  '<button id="'+name+RelationsToolBar.UNDO_RELATION_BUTTON_ID+'" class="'+ToolBar.BUTTON_CLASS_ID+'" style="margin-left:5px;">'+RelationsToolBar.UNDO_RELATION_BUTTON_VALUE+'</button>'+
						  '<button id="'+name+RelationsToolBar.REDO_RELATION_BUTTON_ID+'" class="'+ToolBar.BUTTON_CLASS_ID+'" style="margin-left:5px;">'+RelationsToolBar.REDO_RELATION_BUTTON_VALUE+'</button>'+
						  '<button id="'+name+RelationsToolBar.CLEAR_BUFFER_BUTTON_ID+'" class="'+ToolBar.BUTTON_CLASS_ID+'" style="margin-left:5px;">'+RelationsToolBar.CLEAR_BUFFER_BUTTON_VALUE+'</button>';
		}
    html += '<button id="'+name+RelationsToolBar.RESET_GRID_BUTTON_ID+'" class="'+RelationsToolBar.RESET_GRID_BUTTON_CLASS_ID+'">'+RelationsToolBar.RESET_GRID_BUTTON_VALUE+'</button>';
	  if (this instanceof ModelRelationsToolBar) {
	    html += '<button id="'+name+RelationsToolBar.TEXT_BUTTON_ID+'" class="'+RelationsToolBar.TEXT_BUTTON_CLASS_ID+'">'+RelationsToolBar.TEXT_BUTTON_VALUE+'</button>';
	  }
		html += '</div>'+'</div>';							
		this.parent(name,{html:html});		
    this.resizeButton_clickHandler = this.resizeButton_clickHandler.bindWithEvent(this);
		this.parentButton_clickHandler = this.parentButton_clickHandler.bindWithEvent(this);
		this.parentAndChildButton_clickHandler = this.parentAndChildButton_clickHandler.bindWithEvent(this);
		this.childButton_clickHandler = this.childButton_clickHandler.bindWithEvent(this);
		this.addRelationButton_clickHandler = this.addRelationButton_clickHandler.bindWithEvent(this);
		this.deleteRelationButton_clickHandler = this.deleteRelationButton_clickHandler.bindWithEvent(this);
		this.editRelationButton_clickHandler = this.editRelationButton_clickHandler.bindWithEvent(this);
		this.extractRelationButton_clickHandler = this.extractRelationButton_clickHandler.bindWithEvent(this);
		this.copyRelationButton_clickHandler = this.copyRelationButton_clickHandler.bindWithEvent(this);
		this.pasteRelationButton_clickHandler = this.pasteRelationButton_clickHandler.bindWithEvent(this);
		this.undoRelationButton_clickHandler = this.undoRelationButton_clickHandler.bindWithEvent(this);
		this.redoRelationButton_clickHandler = this.redoRelationButton_clickHandler.bindWithEvent(this);
		this.clearBufferButton_clickHandler = this.clearBufferButton_clickHandler.bindWithEvent(this);
	  this.textButton_clickHandler = this.textButton_clickHandler.bindWithEvent(this);
		this.resetGridButton_clickHandler = this.resetGridButton_clickHandler.bindWithEvent(this);
	};

  this.initializeChildren = function() {
    //this.parent();
    var name = this.getUicName();
    this.messageText = $(name+ToolBar.MESSAGE_TEXT_ID);
    this.resizeButton = $(name+RelationsToolBar.RESIZE_BUTTON_ID);
		this.parentAndChildButtons = $(name+RelationsToolBar.PARENTANDCHILD_BUTTONS_ID);
		this.parentButton = $(name+RelationsToolBar.PARENT_BUTTON_ID);
		this.parentAndChildButton = $(name+RelationsToolBar.PARENTANDCHILD_BUTTON_ID);
		this.childButton = $(name+RelationsToolBar.CHILD_BUTTON_ID);
    this.updateButtons = $(name+RelationsToolBar.UPDATE_BUTTONS_ID);
 		if (SjamayeeFacade.APPLICATION_TYPE != SjamayeeFacade.BROWSER) {
		  this.addRelationButton = $(name+RelationsToolBar.ADD_RELATION_BUTTON_ID);
		  this.deleteRelationButton = $(name+RelationsToolBar.DELETE_RELATION_BUTTON_ID);
		  this.editRelationButton = $(name+RelationsToolBar.EDIT_RELATION_BUTTON_ID);
		  this.extractRelationButton = $(name+RelationsToolBar.EXTRACT_RELATION_BUTTON_ID);
		  this.copyRelationButton = $(name+RelationsToolBar.COPY_RELATION_BUTTON_ID);
		  this.pasteRelationButton = $(name+RelationsToolBar.PASTE_RELATION_BUTTON_ID);
		  this.undoRelationButton = $(name+RelationsToolBar.UNDO_RELATION_BUTTON_ID);
		  this.redoRelationButton = $(name+RelationsToolBar.REDO_RELATION_BUTTON_ID);
		  this.clearBufferButton = $(name+RelationsToolBar.CLEAR_BUFFER_BUTTON_ID);
		}
		if (this instanceof ModelRelationsToolBar) {
		  this.textButton = $(name+RelationsToolBar.TEXT_BUTTON_ID);
		}
		this.resetGridButton = $(name+RelationsToolBar.RESET_GRID_BUTTON_ID);
  };

  this.childrenInitialized = function() {
    //this.parent();
    var name = this.getUicName();
    this.resizeButton.addEvent(SjamayeeFacade.CLICK, this.resizeButton_clickHandler);
		this.parentButton.addEvent(SjamayeeFacade.CLICK, this.parentButton_clickHandler);
		this.parentAndChildButton.addEvent(SjamayeeFacade.CLICK, this.parentAndChildButton_clickHandler);
		this.childButton.addEvent(SjamayeeFacade.CLICK, this.childButton_clickHandler);
 		if (SjamayeeFacade.APPLICATION_TYPE != SjamayeeFacade.BROWSER) {
		  this.addRelationButton.addEvent(SjamayeeFacade.CLICK, this.addRelationButton_clickHandler);
		  this.deleteRelationButton.addEvent(SjamayeeFacade.CLICK, this.deleteRelationButton_clickHandler);
		  this.editRelationButton.addEvent(SjamayeeFacade.CLICK, this.editRelationButton_clickHandler);
		  this.extractRelationButton.addEvent(SjamayeeFacade.CLICK, this.extractRelationButton_clickHandler);
		  this.copyRelationButton.addEvent(SjamayeeFacade.CLICK, this.copyRelationButton_clickHandler);
		  this.pasteRelationButton.addEvent(SjamayeeFacade.CLICK, this.pasteRelationButton_clickHandler);
		  this.undoRelationButton.addEvent(SjamayeeFacade.CLICK, this.undoRelationButton_clickHandler);
		  this.redoRelationButton.addEvent(SjamayeeFacade.CLICK, this.redoRelationButton_clickHandler);
		  this.clearBufferButton.addEvent(SjamayeeFacade.CLICK, this.clearBufferButton_clickHandler);
		}
		if (this instanceof ModelRelationsToolBar) {
		  this.textButton.addEvent(SjamayeeFacade.CLICK, this.textButton_clickHandler);
		}
		this.resetGridButton.addEvent(SjamayeeFacade.CLICK, this.resetGridButton_clickHandler);
	};

  //Click handlers.
  this.resizeButton_clickHandler = function()	          { this.fireEvent(SjamayeeFacade.RESIZE); };
	this.parentButton_clickHandler = function()	          { this.fireEvent(SjamayeeFacade.GRID_PARENT_SHOW); };	
	this.parentAndChildButton_clickHandler = function()	  {	this.fireEvent(SjamayeeFacade.GRID_PARENTANDCHILD_SHOW); };	
	this.childButton_clickHandler = function()	          {	this.fireEvent(SjamayeeFacade.GRID_CHILD_SHOW); };
	this.addRelationButton_clickHandler = function()	    { this.fireEvent(SjamayeeFacade.RELATION_ADD);	};
	this.deleteRelationButton_clickHandler = function()	  {	this.fireEvent(SjamayeeFacade.RELATION_DELETE); };
	this.editRelationButton_clickHandler = function()	    {	this.fireEvent(SjamayeeFacade.RELATION_EDIT); };
	this.extractRelationButton_clickHandler = function()	{	this.fireEvent(SjamayeeFacade.RELATION_EXTRACT); };
	this.copyRelationButton_clickHandler = function()	    {	this.fireEvent(SjamayeeFacade.RELATION_COPY); };
	this.pasteRelationButton_clickHandler = function()	  {	this.fireEvent(SjamayeeFacade.RELATION_PASTE);	};
	this.undoRelationButton_clickHandler = function()	    {	this.fireEvent(SjamayeeFacade.RELATION_UNDO); };
	this.redoRelationButton_clickHandler = function()	    {	this.fireEvent(SjamayeeFacade.RELATION_REDO); };
	this.clearBufferButton_clickHandler = function()	    { this.fireEvent(SjamayeeFacade.GRID_BUFFER_CLEAR); };
	this.textButton_clickHandler = function()	            {	this.fireEvent(SjamayeeFacade.TEXT_EDIT); };
	this.resetGridButton_clickHandler = function()	      {	this.fireEvent(SjamayeeFacade.GRID_RESET); };
};
RelationsToolBar = new Class(new RelationsToolBar());
RelationsToolBar.SPECIAL_ID = "Special";
RelationsToolBar.NAVIGATION_BUTTONS_ID = "NavigationButtons";
RelationsToolBar.UPDATE_BUTTONS_ID = "UpdateButtons";
RelationsToolBar.PARENTANDCHILD_BUTTONS_ID = "ParentAndChildButtons";
RelationsToolBar.PARENT_BUTTON_ID = "parentButton";
RelationsToolBar.PARENT_BUTTON_VALUE = "Parent";
RelationsToolBar.PARENTANDCHILD_BUTTON_ID = "parentAndChildButton";
RelationsToolBar.PARENTANDCHILD_BUTTON_VALUE = "Parent | Child";
RelationsToolBar.PARENTANDCHILD_BUTTONS_CLASS_ID = "parentAndChildButtonsTB";
RelationsToolBar.CHILD_BUTTON_ID = "childButton";
RelationsToolBar.CHILD_BUTTON_VALUE = "Child";
RelationsToolBar.RESIZE_BUTTON_ID = "resizeButton";
RelationsToolBar.RESIZE_BUTTON_NORMAL_VALUE = "GRID | grid";
RelationsToolBar.RESIZE_BUTTON_FULL_VALUE = "grid | GRID";
RelationsToolBar.RESIZE_BUTTON_CLASS_ID = "relationsToolBarResizeButton";
RelationsToolBar.ADD_RELATION_BUTTON_ID = "addRelationButton";
RelationsToolBar.ADD_RELATION_BUTTON_VALUE = "+";
RelationsToolBar.DELETE_RELATION_BUTTON_ID = "deleteRelationButton";
RelationsToolBar.DELETE_RELATION_BUTTON_VALUE = "-";
RelationsToolBar.EDIT_RELATION_BUTTON_ID = "editRelationButton";
RelationsToolBar.EDIT_RELATION_BUTTON_VALUE = "Edit";
RelationsToolBar.EXTRACT_RELATION_BUTTON_ID = "extractRelationButton";
RelationsToolBar.EXTRACT_RELATION_BUTTON_VALUE = "Extract";
RelationsToolBar.COPY_RELATION_BUTTON_ID = "copyRelationButton";
RelationsToolBar.COPY_RELATION_BUTTON_VALUE = "Copy";
RelationsToolBar.PASTE_RELATION_BUTTON_ID = "pasteRelationButton";
RelationsToolBar.PASTE_RELATION_BUTTON_VALUE = "Paste";
RelationsToolBar.UNDO_RELATION_BUTTON_ID = "undoRelationButton";
RelationsToolBar.UNDO_RELATION_BUTTON_VALUE = "Undo";
RelationsToolBar.REDO_RELATION_BUTTON_ID = "redoRelationButton";
RelationsToolBar.REDO_RELATION_BUTTON_VALUE = "Redo";
RelationsToolBar.CLEAR_BUFFER_BUTTON_ID = "clearRelationsBufferButton";
RelationsToolBar.CLEAR_BUFFER_BUTTON_VALUE = "Clear Buffer...";
RelationsToolBar.TEXT_BUTTON_ID = "textButton";
RelationsToolBar.TEXT_BUTTON_VALUE = "Edit text...";
RelationsToolBar.TEXT_BUTTON_CLASS_ID = "relationsToolBarTextButton";
RelationsToolBar.RESET_GRID_BUTTON_ID = "resetRelationsGridButton";
RelationsToolBar.RESET_GRID_BUTTON_VALUE = "Reset Grid";
RelationsToolBar.RESET_GRID_BUTTON_CLASS_ID = "relationsToolBarResetButton";
