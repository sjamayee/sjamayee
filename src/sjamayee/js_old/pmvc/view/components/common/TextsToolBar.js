//Abstract
var TextsToolBar = function() {
  this.Extends = SjamayeeUIComponent;

  this.messageText = null;
	this.saveButton = null;
	this.cancelButton = null;
	this.resizeButton = null;

	this.initialize = function(name,properties) {
    var html = '<div id="'+name+ToolBar.COMMON_TOOLBAR_ID+'" class="'+ToolBar.COMMON_TOOLBAR_CLASS_ID+'">'+
  		         '<input type="text" id="'+name+ToolBar.MESSAGE_TEXT_ID+'" class="'+ToolBar.MESSAGE_TEXT_CLASS_ID+'" value=""/>'+
  		         '</div>'+
	             '<div id="'+name+TextsToolBar.SPECIAL_ID+'" class="'+ToolBar.SPECIAL_CLASS_ID+'">'+
		           '<div id="'+name+TextsToolBar.NAVIGATION_BUTTONS_ID+'" class="'+TextsToolBar.NAVIGATION_BUTTONS_CLASS_ID+'">'+
 		           '<label for="'+name+TextsToolBar.LINE_DISPLAY_ID+'" style="font-size:12px;">'+TextsToolBar.LINE_DISPLAY_LABEL+'</label>'+
							 '<input type="text" id="'+name+TextsToolBar.LINE_DISPLAY_ID+'" value="4786" maxlength="4" size="4" readonly="readonly" style="font-size:12px;border:none;margin-top:6px;"/>'+
 		           '<label for="'+name+TextsToolBar.COLUMN_DISPLAY_ID+'" style="font-size:12px;">'+TextsToolBar.COLUMN_DISPLAY_LABEL+'</label>'+
							 '<input type="text" id="'+name+TextsToolBar.COLUMN_DISPLAY_ID+'" value="42" maxlength="3" size="3" readonly="readonly" style="font-size:12px;border:none;margin-top:6px;"/>'+
		           '</div>'+
							 '<div id="'+name+TextsToolBar.UPDATE_BUTTONS_ID+'" class="'+ToolBar.UPDATE_BUTTONS_CLASS_ID+'">'+
							 '<button id="'+name+TextsToolBar.SAVE_BUTTON_ID+'" class="'+ToolBar.BUTTON_CLASS_ID+'">'+TextsToolBar.SAVE_BUTTON_VALUE+'</button>'+
							 '<button id="'+name+TextsToolBar.CANCEL_BUTTON_ID+'" class="'+ToolBar.BUTTON_CLASS_ID+'" style="margin-left:10px;">'+TextsToolBar.CANCEL_BUTTON_VALUE+'</button>'+
							 '<button id="'+name+TextsToolBar.RESIZE_BUTTON_ID+'" class="'+TextsToolBar.RESIZE_BUTTON_CLASS_ID+'">'+TextsToolBar.RESIZE_BUTTON_NORMAL_VALUE+'</button>'+
							 '</div>'+
							 '</div>';
		this.parent(name,{html:html});
		this.saveButton_clickHandler = this.saveButton_clickHandler.bindWithEvent(this);
		this.cancelButton_clickHandler = this.cancelButton_clickHandler.bindWithEvent(this);
		this.resizeButton_clickHandler = this.resizeButton_clickHandler.bindWithEvent(this);
	};

  this.initializeChildren = function() {
    var name = this.getUicName();
	  //alert("TextsToolBar/initializeChildren - name: "+name);
	  this.messageText = $(name+ToolBar.MESSAGE_TEXT_ID);
		this.saveButton = $(name+TextsToolBar.SAVE_BUTTON_ID);
		this.cancelButton = $(name+TextsToolBar.CANCEL_BUTTON_ID);
		this.resizeButton = $(name+TextsToolBar.RESIZE_BUTTON_ID);
  };

  this.childrenInitialized = function() {
		this.saveButton.addEvent(SjamayeeFacade.CLICK, this.saveButton_clickHandler);
		this.cancelButton.addEvent(SjamayeeFacade.CLICK, this.cancelButton_clickHandler);
		this.resizeButton.addEvent(SjamayeeFacade.CLICK, this.resizeButton_clickHandler);
	};

	this.saveButton_clickHandler = function()	  {	this.fireEvent(SjamayeeFacade.TEXT_SAVE); };
	this.cancelButton_clickHandler = function()	{	this.fireEvent(SjamayeeFacade.TEXT_CANCEL); };
	this.resizeButton_clickHandler = function()	{ this.fireEvent(SjamayeeFacade.TEXT_RESIZE); };
};
TextsToolBar = new Class(new TextsToolBar());
TextsToolBar.SPECIAL_ID = "Special";
TextsToolBar.NAVIGATION_BUTTONS_ID = "NavigationButtons";
TextsToolBar.NAVIGATION_BUTTONS_CLASS_ID = "textsNavigationButtonsTB";
TextsToolBar.UPDATE_BUTTONS_ID = "UpdateButtons";
TextsToolBar.RESIZE_BUTTON_ID = "resizeButton";
TextsToolBar.RESIZE_BUTTON_NORMAL_VALUE = "TEXT | text";
TextsToolBar.RESIZE_BUTTON_FULL_VALUE = "text | TEXT";
TextsToolBar.RESIZE_BUTTON_CLASS_ID = "textsToolBarResizeButton";
TextsToolBar.LINE_DISPLAY_ID = "lineDisplay";
TextsToolBar.LINE_DISPLAY_LABEL = "Line:&nbsp;";
TextsToolBar.COLUMN_DISPLAY_ID = "lineDisplay";
TextsToolBar.COLUMN_DISPLAY_LABEL = "Column:&nbsp;";
TextsToolBar.SAVE_BUTTON_ID= "saveButton";
TextsToolBar.SAVE_BUTTON_VALUE= "Save";
TextsToolBar.CANCEL_BUTTON_ID = "cancelButton";
TextsToolBar.CANCEL_BUTTON_VALUE = "Cancel";
