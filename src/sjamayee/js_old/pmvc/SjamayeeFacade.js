/**
 * Build: __SJA_BUILD_PREFIX__
 * Version: __SJA_BUILD_VERSION__
 * Build date: __SJA_BUILD_DATE__
 *************************************** */
var SjamayeeFacade = function() {
	this.Extends = new Class(new Facade());
	this.application = null;
	this.environment = null;
	this.currentDataModelIndex = Header.DATA_RELATIONS_INDEX;
	this.settingName = null;
	this.setting = null;
	//this.messageText = null;

	this.startup = function(app) {
		this.setApplication(app);
		this.sendNotification(SjamayeeFacade.STARTUP, app);
	  //alert("SjamayeeFacade/startup");
	};

	this.setApplication = function(app) {
		this.application = app;
	};

	this.getApplication = function() {
		return this.application;
	};

	this.isBrowser = function() {
		return (SjamayeeFacade.APPLICATION_TYPE == SjamayeeFacade.BROWSER)?true:false;
	};

	this.isExplorer = function() {
		return (SjamayeeFacade.APPLICATION_TYPE == SjamayeeFacade.EXPLORER)?true:false;
	};

	this.isComposer = function() {
		return (SjamayeeFacade.APPLICATION_TYPE == SjamayeeFacade.COMPOSER)?true:false;
	};
/*
	this.setMessageText = function(messageText) {
	  if (this.messageText === null) {
      this.messageText = this.retrieveMediator(ToolBarMediator.ID).getViewComponent().messageText;
    }
    this.messageText.value = messageText;
	}
*/
	this.initializeController = function() {
		//Always call this.parent()
		this.parent();
		this.registerCommand(SjamayeeFacade.STARTUP, StartupCommand);
		//Objects
		this.registerCommand(SjamayeeFacade.OBJECT_DATA_ADD, AddDataObjectCommand);
		this.registerCommand(SjamayeeFacade.OBJECT_MODEL_ADD, AddModelObjectCommand);
		this.registerCommand(SjamayeeFacade.OBJECT_DATA_DELETE, DeleteDataObjectCommand);
		this.registerCommand(SjamayeeFacade.OBJECT_MODEL_DELETE, DeleteModelObjectCommand);
		this.registerCommand(SjamayeeFacade.OBJECT_DATA_EDIT, EditDataObjectCommand);
		this.registerCommand(SjamayeeFacade.OBJECT_MODEL_EDIT, EditModelObjectCommand);
		this.registerCommand(SjamayeeFacade.OBJECT_DATA_SAVE, SaveDataObjectCommand);
		this.registerCommand(SjamayeeFacade.OBJECT_MODEL_SAVE, SaveModelObjectCommand);
		this.registerCommand(SjamayeeFacade.OBJECT_DATA_CANCEL, CancelDataObjectCommand);
		this.registerCommand(SjamayeeFacade.OBJECT_MODEL_CANCEL, CancelModelObjectCommand);
		this.registerCommand(SjamayeeFacade.OBJECT_SHOW, ShowObjectCommand);
		this.registerCommand(SjamayeeFacade.OBJECT_DATA_UNDO, UndoDataObjectCommand);
		this.registerCommand(SjamayeeFacade.OBJECT_MODEL_UNDO, UndoModelObjectCommand);
		this.registerCommand(SjamayeeFacade.OBJECT_DATA_REDO, RedoDataObjectCommand);
		this.registerCommand(SjamayeeFacade.OBJECT_MODEL_REDO, RedoModelObjectCommand);
		this.registerCommand(SjamayeeFacade.OBJECT_DATA_BUFFER_CLEAR, ClearDataObjectBufferCommand);
		this.registerCommand(SjamayeeFacade.OBJECT_MODEL_BUFFER_CLEAR, ClearModelObjectBufferCommand);
		this.registerCommand(SjamayeeFacade.OBJECT_DATA_UNREFS_DELETE, DeleteUnrefDataObjectsCommand);
		this.registerCommand(SjamayeeFacade.OBJECT_MODEL_UNREFS_DELETE, DeleteUnrefModelObjectsCommand);
		this.registerCommand(SjamayeeFacade.OBJECT_LIST_SHOW, ResetListCommand);
		this.registerCommand(SjamayeeFacade.OBJECT_DATA_SFDC_SHOW, ShowSFDCDataObjectCommand);
		this.registerCommand(SjamayeeFacade.OBJECT_MODEL_SFDC_SHOW, ShowSFDCModelObjectCommand);
		//Relations
		this.registerCommand(SjamayeeFacade.RELATION_DATA_ADD, AddDataRelationCommand);
		this.registerCommand(SjamayeeFacade.RELATION_MODEL_ADD, AddModelRelationCommand);
		this.registerCommand(SjamayeeFacade.RELATION_DATA_DELETE, DeleteDataRelationCommand);
		this.registerCommand(SjamayeeFacade.RELATION_MODEL_DELETE, DeleteModelRelationCommand);
		this.registerCommand(SjamayeeFacade.RELATION_DATA_EDIT, EditDataRelationCommand);
		this.registerCommand(SjamayeeFacade.RELATION_MODEL_EDIT, EditModelRelationCommand);
		this.registerCommand(SjamayeeFacade.RELATION_DATA_SAVE, SaveDataRelationCommand);
		this.registerCommand(SjamayeeFacade.RELATION_MODEL_SAVE, SaveModelRelationCommand);
		this.registerCommand(SjamayeeFacade.RELATION_DATA_CANCEL, CancelDataRelationCommand);
		this.registerCommand(SjamayeeFacade.RELATION_MODEL_CANCEL, CancelModelRelationCommand);
		this.registerCommand(SjamayeeFacade.RELATION_SHOW, ShowRelationCommand);
		this.registerCommand(SjamayeeFacade.RELATION_DATA_EXTRACT, ExtractDataRelationCommand);
		this.registerCommand(SjamayeeFacade.RELATION_MODEL_EXTRACT, ExtractModelRelationCommand);
		this.registerCommand(SjamayeeFacade.RELATION_DATA_COPY, CopyDataRelationCommand);
		this.registerCommand(SjamayeeFacade.RELATION_MODEL_COPY, CopyModelRelationCommand);
		this.registerCommand(SjamayeeFacade.RELATION_DATA_PASTE, PasteDataRelationCommand);
		this.registerCommand(SjamayeeFacade.RELATION_MODEL_PASTE, PasteModelRelationCommand);
		this.registerCommand(SjamayeeFacade.RELATION_DATA_UNDO, UndoDataRelationCommand);
		this.registerCommand(SjamayeeFacade.RELATION_MODEL_UNDO, UndoModelRelationCommand);
		this.registerCommand(SjamayeeFacade.RELATION_DATA_REDO, RedoDataRelationCommand);
		this.registerCommand(SjamayeeFacade.RELATION_MODEL_REDO, RedoModelRelationCommand);
		this.registerCommand(SjamayeeFacade.RELATION_DATA_SFDC_SHOW, ShowSFDCDataRelationCommand);
		this.registerCommand(SjamayeeFacade.RELATION_MODEL_SFDC_SHOW, ShowSFDCModelRelationCommand);
		this.registerCommand(SjamayeeFacade.GRID_DATA_BUFFER_CLEAR, ClearDataRelationBufferCommand);
		this.registerCommand(SjamayeeFacade.GRID_MODEL_BUFFER_CLEAR, ClearModelRelationBufferCommand);
		this.registerCommand(SjamayeeFacade.GRID_RESET, ResetGridCommand);
		//Texts
		this.registerCommand(SjamayeeFacade.TEXT_EDIT, EditTextCommand);
		this.registerCommand(SjamayeeFacade.TEXT_SAVE, SaveTextCommand);
		this.registerCommand(SjamayeeFacade.TEXT_CANCEL, CancelTextCommand);
		
	/*this.registerCommand(SjamayeeFacade.SELECT_TYPE, SelectTypeCommand);
		this.registerCommand(SjamayeeFacade.SELECT_ENTITY, SelectEntityCommand);
		this.registerCommand(SjamayeeFacade.SELECT_REF_OPERATOR, SelectReferenceOperatorCommand);
		this.registerCommand(SjamayeeFacade.FILTER, FilterCommand);
		this.registerCommand(SjamayeeFacade.ROOT_UNDO, RootUndoCommand);
		this.registerCommand(SjamayeeFacade.ROOT_SELECT, RootSelectCommand);
		this.registerCommand(SjamayeeFacade.ROOT_REDO, RootRedoCommand);
		this.registerCommand(SjamayeeFacade.SELECT_SETTING, SelectSettingCommand);
		this.registerCommand(SjamayeeFacade.DISPLAY_HELP, DisplayHelpCommand);

		this.registerCommand(SjamayeeFacade.LEFT, LeftCommand);
		this.registerCommand(SjamayeeFacade.RIGHT, RightCommand);
		this.registerCommand(SjamayeeFacade.UP, UpCommand);
		this.registerCommand(SjamayeeFacade.DOWN, DownCommand);
		this.registerCommand(SjamayeeFacade.HOME, HomeCommand);
		this.registerCommand(SjamayeeFacade.END, EndCommand);
		this.registerCommand(SjamayeeFacade.PREVIOUS, PreviousCommand);
		this.registerCommand(SjamayeeFacade.NEXT, NextCommand);
		this.registerCommand(SjamayeeFacade.FIRST, FirstCommand);
		this.registerCommand(SjamayeeFacade.LAST, LastCommand);
		this.registerCommand(SjamayeeFacade.SPACE, SpaceCommand);

		this.registerCommand(SjamayeeFacade.ENTER, EnterCommand);
		this.registerCommand(SjamayeeFacade.PARENT_SHOW, ShowParentCommand);
		this.registerCommand(SjamayeeFacade.PARENTANDCHILD_SHOW, ShowParentAndChildCommand);
		this.registerCommand(SjamayeeFacade.CHILD_SHOW, ShowChildCommand);
		this.registerCommand(SjamayeeFacade.ADD_RELATION, AddRelationCommand);
		this.registerCommand(SjamayeeFacade.DELETE_RELATION, DeleteRelationCommand);*/
	};
};
//Notification name constants
SjamayeeFacade.STARTUP = "startup";
SjamayeeFacade.APPLICATION_TYPE = "COMPOSER"; //"BROWSER"; //"COMPOSER"; //"EXPLORER"; //"BROWSER";
SjamayeeFacade.BROWSER = "BROWSER";
SjamayeeFacade.EXPLORER = "EXPLORER";
SjamayeeFacade.COMPOSER = "COMPOSER";

SjamayeeFacade.COLOR_DOT = "red";
SjamayeeFacade.COLOR_DOT_ROOT = "white";
SjamayeeFacade.COLOR_DOT_ROOT_FOCUSED = "black";
SjamayeeFacade.NAVIGATION_CONTROL_ID = "navigationControl";
SjamayeeFacade.PAGE_MULTIPLIER = 3;

SjamayeeFacade.DATA = "Data";
SjamayeeFacade.MODEL = "Model";
SjamayeeFacade.TYPES = "Types";
SjamayeeFacade.RELOAD = "Reload";
SjamayeeFacade.DATA_TYPES = SjamayeeFacade.DATA+SjamayeeFacade.TYPES;
SjamayeeFacade.DATA_TYPES_RELOAD = SjamayeeFacade.DATA_TYPES+SjamayeeFacade.RELOAD;
SjamayeeFacade.MODEL_TYPES = SjamayeeFacade.MODEL+SjamayeeFacade.TYPES;
SjamayeeFacade.MODEL_TYPES_RELOAD = SjamayeeFacade.MODEL_TYPES+SjamayeeFacade.RELOAD;

SjamayeeFacade.OLIST = "oList";
SjamayeeFacade.OLIST_SHOW = SjamayeeFacade.OLIST+"Show";
SjamayeeFacade.OLIST_DATA = SjamayeeFacade.OLIST+"Data";
SjamayeeFacade.OLIST_DATA_SHOW = SjamayeeFacade.OLIST_DATA+"Show";
SjamayeeFacade.OLIST_DATA_HEADER_SHOW = SjamayeeFacade.OLIST_DATA+"HeaderShow";
SjamayeeFacade.OLIST_DATA_TOOLBAR_SHOW = SjamayeeFacade.OLIST_DATA+"ToolBarShow";
SjamayeeFacade.OLIST_DATA_REFRESH = SjamayeeFacade.OLIST_DATA+"Refresh";
SjamayeeFacade.OLIST_MODEL = SjamayeeFacade.OLIST+"Model";
SjamayeeFacade.OLIST_MODEL_SHOW = SjamayeeFacade.OLIST_MODEL+"Show";
SjamayeeFacade.OLIST_MODEL_HEADER_SHOW = SjamayeeFacade.OLIST_MODEL+"HeaderShow";
SjamayeeFacade.OLIST_MODEL_TOOLBAR_SHOW = SjamayeeFacade.OLIST_MODEL+"ToolBarShow";
SjamayeeFacade.OLIST_MODEL_TEXT_HEADER_SHOW = SjamayeeFacade.OLIST_MODEL+"TextHeaderShow";
SjamayeeFacade.OLIST_MODEL_TEXT_TOOLBAR_SHOW = SjamayeeFacade.OLIST_MODEL+"TextToolBarShow";
SjamayeeFacade.OLIST_MODEL_REFRESH = SjamayeeFacade.OLIST_MODEL+"Refresh";

SjamayeeFacade.GRID = "grid";
SjamayeeFacade.GRID_SHOW = SjamayeeFacade.GRID+"Show";
SjamayeeFacade.GRID_DATA = SjamayeeFacade.GRID+"Data";
SjamayeeFacade.GRID_DATA_SHOW = SjamayeeFacade.GRID_DATA+"Show";
SjamayeeFacade.GRID_DATA_HEADER_SHOW = SjamayeeFacade.GRID_DATA+"HeaderShow";
SjamayeeFacade.GRID_DATA_TOOLBAR_SHOW = SjamayeeFacade.GRID_DATA+"ToolBarShow";
SjamayeeFacade.GRID_DATA_REFRESH = SjamayeeFacade.GRID_DATA+"Refresh";
SjamayeeFacade.GRID_MODEL = SjamayeeFacade.GRID+"Model";
SjamayeeFacade.GRID_MODEL_SHOW = SjamayeeFacade.GRID_MODEL+"Show";
SjamayeeFacade.GRID_MODEL_HEADER_SHOW = SjamayeeFacade.GRID_MODEL+"HeaderShow";
SjamayeeFacade.GRID_MODEL_TOOLBAR_SHOW = SjamayeeFacade.GRID_MODEL+"ToolBarShow";
SjamayeeFacade.GRID_MODEL_TEXT_HEADER_SHOW = SjamayeeFacade.GRID_MODEL+"TextHeaderShow";
SjamayeeFacade.GRID_MODEL_TEXT_TOOLBAR_SHOW = SjamayeeFacade.GRID_MODEL+"TextToolBarShow";
SjamayeeFacade.GRID_MODEL_REFRESH = SjamayeeFacade.GRID_MODEL+"Refresh";
SjamayeeFacade.GRID_4X_SHOW = SjamayeeFacade.GRID+"4XShow";
SjamayeeFacade.GRID_4C_SHOW = SjamayeeFacade.GRID+"4CShow";
SjamayeeFacade.GRID_5C_SHOW = SjamayeeFacade.GRID+"5CShow";
SjamayeeFacade.GRID_6C_SHOW = SjamayeeFacade.GRID+"6CShow";
SjamayeeFacade.GRID_7C_SHOW = SjamayeeFacade.GRID+"7CShow";
SjamayeeFacade.GRID_8C_SHOW = SjamayeeFacade.GRID+"8CShow";

SjamayeeFacade.SELECT = "Select";
SjamayeeFacade.TYPE = "Type";
SjamayeeFacade.SELECT_TYPE = SjamayeeFacade.SELECT+SjamayeeFacade.TYPE;
SjamayeeFacade.ENTITY = "Entity";
SjamayeeFacade.SELECT_ENTITY = SjamayeeFacade.SELECT+SjamayeeFacade.ENTITY;
SjamayeeFacade.SELECT_REF_OPERATOR = SjamayeeFacade.SELECT+"ReferenceOperator";
SjamayeeFacade.FILTER = "filter";
SjamayeeFacade.ENTITY_FILTER_MODIFIERS = "gi";
SjamayeeFacade.ENTITY_FILTER_MODIFIERS_CASE = "g";
SjamayeeFacade.OLIST_FILTER_CLICK = SjamayeeFacade.OLIST+SjamayeeFacade.FILTER+"Click";
SjamayeeFacade.OLIST_DATA_FILTER_CLICK = SjamayeeFacade.OLIST_DATA+SjamayeeFacade.FILTER+"Click";
SjamayeeFacade.OLIST_MODEL_FILTER_CLICK = SjamayeeFacade.OLIST_MODEL+SjamayeeFacade.FILTER+"Click";
SjamayeeFacade.GRID_FILTER_CLICK = SjamayeeFacade.GRID+SjamayeeFacade.FILTER+"Click";
SjamayeeFacade.GRID_DATA_FILTER_CLICK = SjamayeeFacade.GRID_DATA+SjamayeeFacade.FILTER+"Click";
SjamayeeFacade.GRID_MODEL_FILTER_CLICK = SjamayeeFacade.GRID_MODEL+SjamayeeFacade.FILTER+"Click";
SjamayeeFacade.GRID_FILTER_KEYDOWN = SjamayeeFacade.GRID+SjamayeeFacade.FILTER+"Keydown";
SjamayeeFacade.GRID_DATA_FILTER_KEYDOWN = SjamayeeFacade.GRID_DATA+SjamayeeFacade.FILTER+"Keydown";
SjamayeeFacade.GRID_MODEL_FILTER_KEYDOWN = SjamayeeFacade.GRID_MODEL+SjamayeeFacade.FILTER+"Keydown";
SjamayeeFacade.OLIST_FILTER_CHANGE = SjamayeeFacade.OLIST+SjamayeeFacade.FILTER+"Change";
SjamayeeFacade.GRID_FILTER_CHANGE = SjamayeeFacade.GRID+SjamayeeFacade.FILTER+"Change";
SjamayeeFacade.OLIST_FILTER_CASE_CLICK = SjamayeeFacade.OLIST+SjamayeeFacade.FILTER+"CaseClick";
SjamayeeFacade.GRID_FILTER_CASE_CLICK = SjamayeeFacade.GRID+SjamayeeFacade.FILTER+"CaseClick";
SjamayeeFacade.GRID_COLUMNS_CHANGE = SjamayeeFacade.GRID_COLUMNS+"Change";                           //verify !!!
SjamayeeFacade.GRID_DATA_COLUMNS_CHANGE = SjamayeeFacade.GRID_DATA_COLUMNS+"Change";                 //verify !!!
SjamayeeFacade.GRID_MODEL_COLUMNS_CHANGE = SjamayeeFacade.GRID_MODEL_COLUMNS+"Change";               //verify !!!

SjamayeeFacade.ROOT = "root";
SjamayeeFacade.ROOT_UNDO = SjamayeeFacade.ROOT+"Undo";
SjamayeeFacade.DATA_ROOT = SjamayeeFacade.DATA+SjamayeeFacade.ROOT;
SjamayeeFacade.DATA_ROOT_UNDO = SjamayeeFacade.DATA_ROOT+"Undo";
SjamayeeFacade.MODEL_ROOT = SjamayeeFacade.MODEL+SjamayeeFacade.ROOT;
SjamayeeFacade.MODEL_ROOT_UNDO = SjamayeeFacade.MODEL_ROOT+"Undo";
SjamayeeFacade.ROOT_SELECT = SjamayeeFacade.ROOT+"Select";
SjamayeeFacade.DATA_ROOT_SELECT = SjamayeeFacade.DATA_ROOT+"Select";
SjamayeeFacade.MODEL_ROOT_SELECT = SjamayeeFacade.MODEL_ROOT+"Select";
SjamayeeFacade.ROOT_REDO = SjamayeeFacade.ROOT+"Redo";
SjamayeeFacade.DATA_ROOT_REDO = SjamayeeFacade.DATA_ROOT+"Redo";
SjamayeeFacade.MODEL_ROOT_REDO = SjamayeeFacade.MODEL_ROOT+"Redo";
SjamayeeFacade.SETTING = "setting";
SjamayeeFacade.SETTING_CLICK = SjamayeeFacade.SETTING+"Click";
SjamayeeFacade.SETTING_CHANGE = SjamayeeFacade.SETTING+"Change";
SjamayeeFacade.HELP = "help";
SjamayeeFacade.HELP_CLICK = SjamayeeFacade.HELP+"Click";
SjamayeeFacade.MESSAGE = "message";
SjamayeeFacade.MESSAGE_CLICK = SjamayeeFacade.MESSAGE+"Click";

SjamayeeFacade.DATA_MODEL = SjamayeeFacade.DATA+SjamayeeFacade.MODEL;
SjamayeeFacade.DATA_MODEL_CHANGE = SjamayeeFacade.DATA_MODEL+"Change";
//SjamayeeFacade.GRID_MOUSEOVER = SjamayeeFacade.GRID+"MouseOver";
SjamayeeFacade.GRID_ENTITY = SjamayeeFacade.GRID+"Entity"; //verify !!!
SjamayeeFacade.GRID_ENTITY_CHANGE = SjamayeeFacade.GRID_ENTITY+"Change";
SjamayeeFacade.GRID_DATA_ENTITY = SjamayeeFacade.GRID_DATA+"Entity";
SjamayeeFacade.GRID_DATA_ENTITY_CHANGE = SjamayeeFacade.GRID_DATA_ENTITY+"Change";
SjamayeeFacade.GRID_MODEL_ENTITY = SjamayeeFacade.GRID_MODEL+"Entity";
SjamayeeFacade.GRID_MODEL_ENTITY_CHANGE = SjamayeeFacade.GRID_MODEL_ENTITY+"Change";
SjamayeeFacade.GRID_TYPE = SjamayeeFacade.GRID+"Type";
SjamayeeFacade.GRID_TYPE_CHANGE = SjamayeeFacade.GRID_TYPE+"Change";
SjamayeeFacade.GRID_DATA_TYPE = SjamayeeFacade.GRID_DATA+"Type";
SjamayeeFacade.GRID_DATA_TYPE_CHANGE = SjamayeeFacade.GRID_DATA_TYPE+"Change";
SjamayeeFacade.GRID_MODEL_TYPE = SjamayeeFacade.GRID_MODEL+"Type";
SjamayeeFacade.GRID_MODEL_TYPE_CHANGE = SjamayeeFacade.GRID_MODEL_TYPE+"Change";
SjamayeeFacade.GRID_DATA_TYPE_SET = SjamayeeFacade.GRID_DATA_TYPE+"Set";
SjamayeeFacade.GRID_MODEL_TYPE_SET = SjamayeeFacade.GRID_MODEL_TYPE+"Set";

SjamayeeFacade.OLIST_REFOP_CHANGE = SjamayeeFacade.OLIST+"RefOpChange"; //verify !!!
SjamayeeFacade.OLIST_DATA_REFOP_CHANGE = SjamayeeFacade.OLIST_DATA+"RefOpChange"; //verify !!!
SjamayeeFacade.OLIST_MODEL_REFOP_CHANGE = SjamayeeFacade.OLIST_MODEL+"RefOpChange"; //verify !!!
SjamayeeFacade.OLIST_TYPE = SjamayeeFacade.OLIST+"Type";
SjamayeeFacade.OLIST_TYPE_CHANGE = SjamayeeFacade.OLIST_TYPE+"Change";
SjamayeeFacade.OLIST_DATA_TYPE = SjamayeeFacade.OLIST_DATA+"Type";
SjamayeeFacade.OLIST_DATA_TYPE_CHANGE = SjamayeeFacade.OLIST_DATA_TYPE+"Change";
SjamayeeFacade.OLIST_MODEL_TYPE = SjamayeeFacade.OLIST_MODEL+"Type";
SjamayeeFacade.OLIST_MODEL_TYPE_CHANGE = SjamayeeFacade.OLIST_MODEL_TYPE+"Change";

SjamayeeFacade.LIST = "list";
SjamayeeFacade.LIST_CLICK = SjamayeeFacade.LIST+"Click";
SjamayeeFacade.LIST_LINE = SjamayeeFacade.LIST+"Line";
SjamayeeFacade.LIST_LINE_CLICK = SjamayeeFacade.LIST_LINE+"Click";
SjamayeeFacade.LIST_LINE_MOUSEOVER = SjamayeeFacade.LIST_LINE+"MouseOver";
SjamayeeFacade.LIST_LINE_MOUSEOUT = SjamayeeFacade.LIST_LINE+"MouseOut";
SjamayeeFacade.LIST_NAME = SjamayeeFacade.LIST+"Name";
SjamayeeFacade.LIST_NAME_CLICK = SjamayeeFacade.LIST_NAME+"Click";
SjamayeeFacade.LIST_VALUE = SjamayeeFacade.LIST+"Value";
SjamayeeFacade.LIST_VALUE_CLICK = SjamayeeFacade.LIST_VALUE+"Click";
SjamayeeFacade.LIST_DEACTIVATE = SjamayeeFacade.LIST+"Deactivate";
SjamayeeFacade.LIST_LEFT = SjamayeeFacade.LIST+"Left";
SjamayeeFacade.LIST_LEFT_ACTIVATE = SjamayeeFacade.LIST_LEFT+"Activate";
SjamayeeFacade.LIST_RIGHT = SjamayeeFacade.LIST+"Right";
SjamayeeFacade.LIST_RIGHT_ACTIVATE = SjamayeeFacade.LIST_RIGHT+"Activate";
SjamayeeFacade.LIST_ESCAPE = SjamayeeFacade.LIST+"Escape";
SjamayeeFacade.LIST_SPACE = SjamayeeFacade.LIST+"Space";
SjamayeeFacade.LIST_ENTER = SjamayeeFacade.LIST+"Enter";
SjamayeeFacade.LIST_HOME = SjamayeeFacade.LIST+"Home";
SjamayeeFacade.LIST_PREVIOUS = SjamayeeFacade.LIST+"Previous";
SjamayeeFacade.LIST_UP = SjamayeeFacade.LIST+"Up";
//SjamayeeFacade.LIST_LEFT = "listLeft";
//SjamayeeFacade.LIST_RIGHT = "listRight";
SjamayeeFacade.LIST_DOWN = SjamayeeFacade.LIST+"Down";
SjamayeeFacade.LIST_NEXT = SjamayeeFacade.LIST+"Next";
SjamayeeFacade.LIST_END = SjamayeeFacade.LIST+"End";
SjamayeeFacade.LIST_KEYDOWN = SjamayeeFacade.LIST+"Keydown";
SjamayeeFacade.LIST_KEYPRESS = SjamayeeFacade.LIST+"Keypress";

SjamayeeFacade.GRID_CLICK = SjamayeeFacade.GRID+"Click";
SjamayeeFacade.GRID_CELL = SjamayeeFacade.GRID+"Cell";
SjamayeeFacade.GRID_CELL_CLICK = SjamayeeFacade.GRID_CELL+"Click";
SjamayeeFacade.GRID_CELL_MOUSEOVER = SjamayeeFacade.GRID_CELL+"MouseOver";
SjamayeeFacade.GRID_CELL_MOUSEOUT = SjamayeeFacade.GRID_CELL+"MouseOut";
SjamayeeFacade.GRID_ESCAPE = SjamayeeFacade.GRID+"Escape";
SjamayeeFacade.GRID_SPACE = SjamayeeFacade.GRID+"Space";
SjamayeeFacade.GRID_ENTER = SjamayeeFacade.GRID+"Enter";
SjamayeeFacade.GRID_HOME = SjamayeeFacade.GRID+"Home";
SjamayeeFacade.GRID_PREVIOUS = SjamayeeFacade.GRID+"Previous";
SjamayeeFacade.GRID_UP = SjamayeeFacade.GRID+"Up";
SjamayeeFacade.GRID_LEFT = SjamayeeFacade.GRID+"Left";
SjamayeeFacade.GRID_RIGHT = SjamayeeFacade.GRID+"Right";
SjamayeeFacade.GRID_DOWN = SjamayeeFacade.GRID+"Down";
SjamayeeFacade.GRID_NEXT = SjamayeeFacade.GRID+"Next";
SjamayeeFacade.GRID_END = SjamayeeFacade.GRID+"End";
SjamayeeFacade.GRID_KEYDOWN = "gridKeydown";
//SjamayeeFacade.GRID_DATA_KEYDOWN = SjamayeeFacade.GRID_DATA+"Keydown";
//SjamayeeFacade.GRID_MODEL_KEYDOWN = SjamayeeFacade.GRID_MODEL+"Keydown";
SjamayeeFacade.GRID_KEYPRESS = SjamayeeFacade.GRID+"Keypress";
SjamayeeFacade.GRID_FOCUS = SjamayeeFacade.GRID+"Focus";

SjamayeeFacade.GRID_DATA_CLICK = SjamayeeFacade.GRID_DATA+"Click";
SjamayeeFacade.GRID_DATA_CELL = SjamayeeFacade.GRID_DATA+"Cell";
SjamayeeFacade.GRID_DATA_CELL_CLICK = SjamayeeFacade.GRID_DATA_CELL+"Click";
SjamayeeFacade.GRID_DATA_ESCAPE = SjamayeeFacade.GRID_DATA+"Escape";
SjamayeeFacade.GRID_DATA_SPACE = SjamayeeFacade.GRID_DATA+"Space";
SjamayeeFacade.GRID_DATA_ENTER = SjamayeeFacade.GRID_DATA+"Enter";
SjamayeeFacade.GRID_DATA_HOME = SjamayeeFacade.GRID_DATA+"Home";
SjamayeeFacade.GRID_DATA_PREVIOUS = SjamayeeFacade.GRID_DATA+"Previous";
SjamayeeFacade.GRID_DATA_UP = SjamayeeFacade.GRID_DATA+"Up";
SjamayeeFacade.GRID_DATA_LEFT = SjamayeeFacade.GRID_DATA+"Left";
SjamayeeFacade.GRID_DATA_RIGHT = SjamayeeFacade.GRID_DATA+"Right";
SjamayeeFacade.GRID_DATA_DOWN = SjamayeeFacade.GRID_DATA+"Down";
SjamayeeFacade.GRID_DATA_NEXT = SjamayeeFacade.GRID_DATA+"Next";
SjamayeeFacade.GRID_DATA_END = SjamayeeFacade.GRID_DATA+"End";

SjamayeeFacade.GRID_DATA_LEFT_CLICK = SjamayeeFacade.GRID_DATA_LEFT+"Click";
SjamayeeFacade.GRID_DATA_LEFT_KEYDOWN = SjamayeeFacade.GRID_DATA_LEFT+"Keydown";
SjamayeeFacade.GRID_DATA_LEFT_CELL = SjamayeeFacade.GRID_DATA_LEFT+"Cell";
SjamayeeFacade.GRID_DATA_LEFT_CELL_CLICK = SjamayeeFacade.GRID_DATA_LEFT_CELL+"Click";
SjamayeeFacade.GRID_DATA_LEFT_CELL_MOUSEOVER = SjamayeeFacade.GRID_DATA_LEFT_CELL+"MouseOver";
SjamayeeFacade.GRID_DATA_LEFT_CELL_MOUSEOUT = SjamayeeFacade.GRID_DATA_LEFT_CELL+"MouseOut";
SjamayeeFacade.GRID_DATA_RIGHT_CLICK = SjamayeeFacade.GRID_DATA_RIGHT+"Click";
SjamayeeFacade.GRID_DATA_RIGHT_KEYDOWN = SjamayeeFacade.GRID_DATA_RIGHT+"Keydown";
SjamayeeFacade.GRID_DATA_RIGHT_CELL = SjamayeeFacade.GRID_DATA_RIGHT+"Cell";
SjamayeeFacade.GRID_DATA_RIGHT_CELL_CLICK = SjamayeeFacade.GRID_DATA_RIGHT_CELL+"Click";
SjamayeeFacade.GRID_DATA_RIGHT_CELL_MOUSEOVER = SjamayeeFacade.GRID_DATA_RIGHT_CELL+"MouseOver";
SjamayeeFacade.GRID_DATA_RIGHT_CELL_MOUSEOUT = SjamayeeFacade.GRID_DATA_RIGHT_CELL+"MouseOut";

//SjamayeeFacade.GRID_MODEL_LEFT = SjamayeeFacade.GRID_MODEL+"Left";
SjamayeeFacade.GRID_MODEL_LEFT_CLICK = SjamayeeFacade.GRID_MODEL_LEFT+"Click";
SjamayeeFacade.GRID_MODEL_LEFT_KEYDOWN = SjamayeeFacade.GRID_MODEL_LEFT+"Keydown";
SjamayeeFacade.GRID_MODEL_LEFT_CELL = SjamayeeFacade.GRID_MODEL_LEFT+"Cell";
SjamayeeFacade.GRID_MODEL_LEFT_CELL_CLICK = SjamayeeFacade.GRID_MODEL_LEFT_CELL+"Click";
SjamayeeFacade.GRID_MODEL_LEFT_CELL_MOUSEOVER = SjamayeeFacade.GRID_MODEL_LEFT_CELL+"MouseOver";
SjamayeeFacade.GRID_MODEL_LEFT_CELL_MOUSEOUT = SjamayeeFacade.GRID_MODEL_LEFT_CELL+"MouseOut";
//SjamayeeFacade.GRID_MODEL_RIGHT = SjamayeeFacade.GRID_MODEL+"Right";
SjamayeeFacade.GRID_MODEL_RIGHT_CLICK = SjamayeeFacade.GRID_MODEL_RIGHT+"Click";
SjamayeeFacade.GRID_MODEL_RIGHT_KEYDOWN = SjamayeeFacade.GRID_MODEL_RIGHT+"Keydown";
SjamayeeFacade.GRID_MODEL_RIGHT_CELL = SjamayeeFacade.GRID_MODEL_RIGHT+"Cell";
SjamayeeFacade.GRID_MODEL_RIGHT_CELL_CLICK = SjamayeeFacade.GRID_MODEL_RIGHT_CELL+"Click";
SjamayeeFacade.GRID_MODEL_RIGHT_CELL_MOUSEOVER = SjamayeeFacade.GRID_MODEL_RIGHT_CELL+"MouseOver";
SjamayeeFacade.GRID_MODEL_RIGHT_CELL_MOUSEOUT = SjamayeeFacade.GRID_MODEL_RIGHT_CELL+"MouseOut";

SjamayeeFacade.GRID_PARENT = SjamayeeFacade.GRID+"Parent";                      //verify !!!
SjamayeeFacade.GRID_PARENT_SHOW = SjamayeeFacade.GRID_PARENT+"Show";
SjamayeeFacade.GRID_PARENTANDCHILD_SHOW = SjamayeeFacade.GRID_PARENT+"AndChildShow";
SjamayeeFacade.GRID_CHILD = SjamayeeFacade.GRID+"Child";
SjamayeeFacade.GRID_CHILD_SHOW = SjamayeeFacade.GRID_CHILD+"Show";
SjamayeeFacade.GRID_DATA_PARENT_SHOW = SjamayeeFacade.GRID_DATA+"ParentShow";
SjamayeeFacade.GRID_DATA_PARENTANDCHILD_SHOW = SjamayeeFacade.GRID_DATA+"ParentAndChildShow";
SjamayeeFacade.GRID_DATA_CHILD_SHOW = SjamayeeFacade.GRID_DATA+"ChildShow";
SjamayeeFacade.GRID_DATA_RESIZE = SjamayeeFacade.GRID_DATA+"Resize";
SjamayeeFacade.GRID_DATA_RESIZED = SjamayeeFacade.GRID_DATA+"Resized";
SjamayeeFacade.GRID_DATA_RELATION = SjamayeeFacade.GRID_DATA+SjamayeeFacade.RELATION; //verify !!!
SjamayeeFacade.GRID_DATA_RELATION_ADD = SjamayeeFacade.GRID_DATA_RELATION+"Add";
SjamayeeFacade.GRID_DATA_RELATION_DELETE = SjamayeeFacade.GRID_DATA_RELATION+"Delete";
SjamayeeFacade.GRID_DATA_RELATION_EDIT = SjamayeeFacade.GRID_DATA_RELATION+"Edit";
SjamayeeFacade.GRID_DATA_RELATION_EXTRACT = SjamayeeFacade.GRID_DATA_RELATION+"Extract";
SjamayeeFacade.GRID_DATA_RELATION_COPY = SjamayeeFacade.GRID_DATA_RELATION+"Copy";
SjamayeeFacade.GRID_DATA_RELATION_PASTE = SjamayeeFacade.GRID_DATA_RELATION+"Paste";
SjamayeeFacade.GRID_DATA_RELATION_UNDO = SjamayeeFacade.GRID_DATA_RELATION+"Undo";
SjamayeeFacade.GRID_DATA_RELATION_REDO = SjamayeeFacade.GRID_DATA_RELATION+"Redo";
SjamayeeFacade.GRID_DATA_BUFFER_CLEAR = SjamayeeFacade.GRID_DATA+"BufferClear";
SjamayeeFacade.GRID_DATA_TEXT = SjamayeeFacade.GRID_DATA+"Text";               //verify !!!
SjamayeeFacade.GRID_DATA_TEXT_EDIT = SjamayeeFacade.GRID_DATA_TEXT+"Edit";
SjamayeeFacade.GRID_DATA_RESET = SjamayeeFacade.GRID_DATA+"Reset";

//SjamayeeFacade.GRID_MODEL = SjamayeeFacade.GRID+"Model"; //verify !!!
SjamayeeFacade.GRID_MODEL_CLICK = SjamayeeFacade.GRID_MODEL+"Click";
SjamayeeFacade.GRID_MODEL_CELL = SjamayeeFacade.GRID_MODEL+"Cell"; //verify !!!
SjamayeeFacade.GRID_MODEL_CELL_CLICK = SjamayeeFacade.GRID_MODEL_CELL+"Click";
SjamayeeFacade.GRID_MODEL_ESCAPE = SjamayeeFacade.GRID_MODEL+"Escape";
SjamayeeFacade.GRID_MODEL_SPACE = SjamayeeFacade.GRID_MODEL+"Space";
SjamayeeFacade.GRID_MODEL_ENTER = SjamayeeFacade.GRID_MODEL+"Enter";
SjamayeeFacade.GRID_MODEL_HOME = SjamayeeFacade.GRID_MODEL+"Home";
SjamayeeFacade.GRID_MODEL_PREVIOUS = SjamayeeFacade.GRID_MODEL+"Previous";
SjamayeeFacade.GRID_MODEL_UP = SjamayeeFacade.GRID_MODEL+"Up";
SjamayeeFacade.GRID_MODEL_LEFT = SjamayeeFacade.GRID_MODEL+"Left";
SjamayeeFacade.GRID_MODEL_RIGHT = SjamayeeFacade.GRID_MODEL+"Right";
SjamayeeFacade.GRID_MODEL_DOWN = SjamayeeFacade.GRID_MODEL+"Down";
SjamayeeFacade.GRID_MODEL_NEXT = SjamayeeFacade.GRID_MODEL+"Next";
SjamayeeFacade.GRID_MODEL_END = SjamayeeFacade.GRID_MODEL+"End";
SjamayeeFacade.GRID_MODEL_TEXT = SjamayeeFacade.GRID_MODEL+"Text"; //verify !!!
SjamayeeFacade.GRID_MODEL_TEXT_SHOW = SjamayeeFacade.GRID_MODEL_TEXT+"Show";
SjamayeeFacade.GRID_MODEL_TEXT_EDIT = SjamayeeFacade.GRID_MODEL_TEXT+"Edit";
SjamayeeFacade.GRID_MODEL_TEXT_SAVE = SjamayeeFacade.GRID_MODEL_TEXT+"Save";
SjamayeeFacade.GRID_MODEL_TEXT_CANCEL = SjamayeeFacade.GRID_MODEL_TEXT+"Cancel";
SjamayeeFacade.GRID_MODEL_TEXT_RESIZE = SjamayeeFacade.GRID_MODEL_TEXT+"Resize";
SjamayeeFacade.GRID_MODEL_TEXT_RESIZED = SjamayeeFacade.GRID_MODEL_TEXT+"Resized";

SjamayeeFacade.GRID_MODEL_PARENT_SHOW = SjamayeeFacade.GRID_MODEL+"ParentShow";
SjamayeeFacade.GRID_MODEL_PARENTANDCHILD_SHOW = SjamayeeFacade.GRID_MODEL+"ParentAndChildShow";
SjamayeeFacade.GRID_MODEL_CHILD_SHOW = SjamayeeFacade.GRID_MODEL+"ChildShow";
SjamayeeFacade.GRID_MODEL_RESIZE = SjamayeeFacade.GRID_MODEL+"Resize";
SjamayeeFacade.GRID_MODEL_RESIZED = SjamayeeFacade.GRID_MODEL+"Resized";
SjamayeeFacade.GRID_MODEL_RELATION = SjamayeeFacade.GRID_MODEL+"Relation"; //verify !!!
SjamayeeFacade.GRID_MODEL_RELATION_ADD = SjamayeeFacade.GRID_MODEL_RELATION+"Add";
SjamayeeFacade.GRID_MODEL_RELATION_DELETE = SjamayeeFacade.GRID_MODEL_RELATION+"Delete";
SjamayeeFacade.GRID_MODEL_RELATION_EDIT = SjamayeeFacade.GRID_MODEL_RELATION+"Edit";
SjamayeeFacade.GRID_MODEL_RELATION_EXTRACT = SjamayeeFacade.GRID_MODEL_RELATION+"Extract";
SjamayeeFacade.GRID_MODEL_RELATION_COPY = SjamayeeFacade.GRID_MODEL_RELATION+"Copy";
SjamayeeFacade.GRID_MODEL_RELATION_PASTE = SjamayeeFacade.GRID_MODEL_RELATION+"Paste";
SjamayeeFacade.GRID_MODEL_RELATION_UNDO = SjamayeeFacade.GRID_MODEL_RELATION+"Undo";
SjamayeeFacade.GRID_MODEL_RELATION_REDO = SjamayeeFacade.GRID_MODEL_RELATION+"Redo";
SjamayeeFacade.GRID_MODEL_BUFFER_CLEAR = SjamayeeFacade.GRID_MODEL+"BufferClear";
SjamayeeFacade.GRID_MODEL_RESET = SjamayeeFacade.GRID_MODEL+"Reset";

SjamayeeFacade.OLIST_CLICK = SjamayeeFacade.OLIST+"Click"; //Reorder !!! VVVVV
SjamayeeFacade.OLIST_DATA_CLICK = SjamayeeFacade.OLIST_DATA+"Click";
SjamayeeFacade.OLIST_MODEL_CLICK = SjamayeeFacade.OLIST_MODEL+"Click";
SjamayeeFacade.OLIST_LINE_CLICK = SjamayeeFacade.OLIST_LINE+"Click";  //verify !!!
SjamayeeFacade.OLIST_DATA_LINE_CLICK = SjamayeeFacade.OLIST_DATA_LINE+"Click"; //verify !!!
SjamayeeFacade.OLIST_MODEL_LINE_CLICK = SjamayeeFacade.OLIST_MODEL_LINE+"Click"; //verify !!!
SjamayeeFacade.OLIST_ACTIVATE = SjamayeeFacade.OLIST+"Activate";
SjamayeeFacade.OLIST_ESCAPE = SjamayeeFacade.OLIST+"Escape";
SjamayeeFacade.OLIST_DATA_ESCAPE = SjamayeeFacade.OLIST_DATA+"Escape";
SjamayeeFacade.OLIST_MODEL_ESCAPE = SjamayeeFacade.OLIST_MODEL+"Escape";
SjamayeeFacade.OLIST_SPACE = SjamayeeFacade.OLIST+"Space";
SjamayeeFacade.OLIST_DATA_SPACE = SjamayeeFacade.OLIST_DATA+"Space";
SjamayeeFacade.OLIST_MODEL_SPACE = SjamayeeFacade.OLIST_MODEL+"Space";
SjamayeeFacade.OLIST_ENTER = SjamayeeFacade.OLIST+"Enter";
SjamayeeFacade.OLIST_DATA_ENTER = SjamayeeFacade.OLIST_DATA+"Enter";
SjamayeeFacade.OLIST_MODEL_ENTER = SjamayeeFacade.OLIST_MODEL+"Enter";
SjamayeeFacade.OLIST_HOME = SjamayeeFacade.OLIST+"Home";
SjamayeeFacade.OLIST_DATA_HOME = SjamayeeFacade.OLIST_DATA+"Home";
SjamayeeFacade.OLIST_MODEL_HOME = SjamayeeFacade.OLIST_MODEL+"Home";
SjamayeeFacade.OLIST_PREVIOUS = SjamayeeFacade.OLIST+"Previous";
SjamayeeFacade.OLIST_DATA_PREVIOUS = SjamayeeFacade.OLIST_DATA+"Previous";
SjamayeeFacade.OLIST_MODEL_PREVIOUS = SjamayeeFacade.OLIST_MODEL+"Previous";
SjamayeeFacade.OLIST_UP = SjamayeeFacade.OLIST+"Up";
SjamayeeFacade.OLIST_DATA_UP = SjamayeeFacade.OLIST_DATA+"Up";
SjamayeeFacade.OLIST_MODEL_UP = SjamayeeFacade.OLIST_MODEL+"Up";
SjamayeeFacade.OLIST_DOWN = SjamayeeFacade.OLIST+"Down";
SjamayeeFacade.OLIST_DATA_DOWN = SjamayeeFacade.OLIST_DATA+"Down";
SjamayeeFacade.OLIST_MODEL_DOWN = SjamayeeFacade.OLIST_MODEL+"Down";
SjamayeeFacade.OLIST_NEXT = SjamayeeFacade.OLIST+"Next";
SjamayeeFacade.OLIST_DATA_NEXT = SjamayeeFacade.OLIST_DATA+"Next";
SjamayeeFacade.OLIST_MODEL_NEXT = SjamayeeFacade.OLIST_MODEL+"Next";
SjamayeeFacade.OLIST_END = SjamayeeFacade.OLIST+"End";
SjamayeeFacade.OLIST_DATA_END = SjamayeeFacade.OLIST_DATA+"End";
SjamayeeFacade.OLIST_MODEL_END = SjamayeeFacade.OLIST_MODEL+"End";
SjamayeeFacade.OLIST_DATA_RESIZE = SjamayeeFacade.OLIST_DATA+"Resize";
SjamayeeFacade.OLIST_DATA_RESIZED = SjamayeeFacade.OLIST_DATA+"Resized";
SjamayeeFacade.OLIST_MODEL_RESIZE = SjamayeeFacade.OLIST_MODEL+"Resize";
SjamayeeFacade.OLIST_MODEL_RESIZED = SjamayeeFacade.OLIST_MODEL+"Resized";
SjamayeeFacade.OLIST_DATA_TEXT = SjamayeeFacade.OLIST_DATA+"Text";       //verify !!!
SjamayeeFacade.OLIST_DATA_TEXT_EDIT = SjamayeeFacade.OLIST_DATA_TEXT+"Edit";
SjamayeeFacade.OLIST_MODEL_TEXT = SjamayeeFacade.OLIST_MODEL+"Text";       //verify !!!
SjamayeeFacade.OLIST_MODEL_TEXT_EDIT = SjamayeeFacade.OLIST_MODEL_TEXT+"Edit";
SjamayeeFacade.OLIST_MODEL_TEXT_SHOW = SjamayeeFacade.OLIST_MODEL_TEXT+"Show";
SjamayeeFacade.OLIST_MODEL_TEXT_SAVE = SjamayeeFacade.OLIST_MODEL_TEXT+"Save";
SjamayeeFacade.OLIST_MODEL_TEXT_CANCEL = SjamayeeFacade.OLIST_MODEL_TEXT+"Cancel";
SjamayeeFacade.OLIST_MODEL_TEXT_RESIZE = SjamayeeFacade.OLIST_MODEL_TEXT+"Resize";
SjamayeeFacade.OLIST_MODEL_TEXT_RESIZED = SjamayeeFacade.OLIST_MODEL_TEXT+"Resized";
SjamayeeFacade.OLIST_KEYDOWN = SjamayeeFacade.OLIST+"Keydown";
//SjamayeeFacade.OLIST_DATA_KEYDOWN = SjamayeeFacade.OLIST_DATA+"Keydown";
//SjamayeeFacade.OLIST_MODEL_KEYDOWN = SjamayeeFacade.OLIST_MODEL+"Keydown";
SjamayeeFacade.OLIST_KEYPRESS = SjamayeeFacade.OLIST+"Keypress";

SjamayeeFacade.CHILD_ATTRIBUTE_LIST_CLICK = SjamayeeFacade.CHILD_ATTRIBUTE_LIST+"Click"; //verify !!!
SjamayeeFacade.CHILD_ATTRIBUTE_LINE_CLICK = SjamayeeFacade.CHILD_ATTRIBUTE_LINE+"Click"; //verify !!!
SjamayeeFacade.CHILD_ATTRIBUTE_NAME_CLICK = SjamayeeFacade.CHILD_ATTRIBUTE_NAME+"Click"; //verify !!!
SjamayeeFacade.CHILD_ATTRIBUTE_VALUE_CLICK = SjamayeeFacade.CHILD_ATTRIBUTE_VALUE+"Click"; //verify !!!
SjamayeeFacade.CHILD_ATTRIBUTE_LIST_ESCAPE = SjamayeeFacade.CHILD_ATTRIBUTE_LIST+"Escape";
SjamayeeFacade.CHILD_ATTRIBUTE_LIST_SPACE = SjamayeeFacade.CHILD_ATTRIBUTE_LIST+"Space";
SjamayeeFacade.CHILD_ATTRIBUTE_LIST_ENTER = SjamayeeFacade.CHILD_ATTRIBUTE_LIST+"Enter";
SjamayeeFacade.CHILD_ATTRIBUTE_LIST_HOME = SjamayeeFacade.CHILD_ATTRIBUTE_LIST+"Home";
SjamayeeFacade.CHILD_ATTRIBUTE_LIST_END = SjamayeeFacade.CHILD_ATTRIBUTE_LIST+"End";
SjamayeeFacade.CHILD_ATTRIBUTE_LIST_PREVIOUS = SjamayeeFacade.CHILD_ATTRIBUTE_LIST+"Previous";
SjamayeeFacade.CHILD_ATTRIBUTE_LIST_UP = SjamayeeFacade.CHILD_ATTRIBUTE_LIST+"Up";
SjamayeeFacade.CHILD_ATTRIBUTE_LIST_DOWN = SjamayeeFacade.CHILD_ATTRIBUTE_LIST+"Down";
SjamayeeFacade.CHILD_ATTRIBUTE_LIST_NEXT = SjamayeeFacade.CHILD_ATTRIBUTE_LIST+"Next";
SjamayeeFacade.CHILD_ATTRIBUTE_LIST_KEYPRESS = SjamayeeFacade.CHILD_ATTRIBUTE_LIST+"Keypress";
SjamayeeFacade.CHILD_ATTRIBUTE_LIST_ACTIVATE = "SjamayeeFacade.CHILD_ATTRIBUTE_LIST+Activate";

SjamayeeFacade.PARENT_ATTRIBUTE_LIST_CLICK = SjamayeeFacade.PARENT_ATTRIBUTE_LIST+"Click"; //verify !!!
SjamayeeFacade.PARENT_ATTRIBUTE_LINE_CLICK = SjamayeeFacade.PARENT_ATTRIBUTE_LINE+"Click"; //verify !!!
SjamayeeFacade.PARENT_ATTRIBUTE_NAME_CLICK = SjamayeeFacade.PARENT_ATTRIBUTE_NAME+"Click"; //verify !!!
SjamayeeFacade.PARENT_ATTRIBUTE_VALUE_CLICK = SjamayeeFacade.PARENT_ATTRIBUTE_VALUE+"Click"; //verify !!!
SjamayeeFacade.PARENT_ATTRIBUTE_LIST_ESCAPE = SjamayeeFacade.PARENT_ATTRIBUTE_LIST+"Escape";
SjamayeeFacade.PARENT_ATTRIBUTE_LIST_SPACE = SjamayeeFacade.PARENT_ATTRIBUTE_LIST+"Space";
SjamayeeFacade.PARENT_ATTRIBUTE_LIST_ENTER = SjamayeeFacade.PARENT_ATTRIBUTE_LIST+"Enter";
SjamayeeFacade.PARENT_ATTRIBUTE_LIST_HOME = SjamayeeFacade.PARENT_ATTRIBUTE_LIST+"Home";
SjamayeeFacade.PARENT_ATTRIBUTE_LIST_END = SjamayeeFacade.PARENT_ATTRIBUTE_LIST+"End";
SjamayeeFacade.PARENT_ATTRIBUTE_LIST_PREVIOUS = SjamayeeFacade.PARENT_ATTRIBUTE_LIST+"Previous";
SjamayeeFacade.PARENT_ATTRIBUTE_LIST_UP = SjamayeeFacade.PARENT_ATTRIBUTE_LIST+"Up";
SjamayeeFacade.PARENT_ATTRIBUTE_LIST_DOWN = SjamayeeFacade.PARENT_ATTRIBUTE_LIST+"Down";
SjamayeeFacade.PARENT_ATTRIBUTE_LIST_NEXT = SjamayeeFacade.PARENT_ATTRIBUTE_LIST+"Next";
SjamayeeFacade.PARENT_ATTRIBUTE_LIST_KEYPRESS = SjamayeeFacade.PARENT_ATTRIBUTE_LIST+"Keypress";

SjamayeeFacade.ENTITY_ATTRIBUTE_LIST_CLICK = SjamayeeFacade.ENTITY_ATTRIBUTE_LIST+"Click"; //verify !!!
SjamayeeFacade.ENTITY_ATTRIBUTE_LINE_CLICK = SjamayeeFacade.ENTITY_ATTRIBUTE_LINE+"Click"; //verify !!!
SjamayeeFacade.ENTITY_ATTRIBUTE_NAME_CLICK = SjamayeeFacade.ENTITY_ATTRIBUTE_NAME+"Click"; //verify !!!
SjamayeeFacade.ENTITY_ATTRIBUTE_VALUE_CLICK = SjamayeeFacade.ENTITY_ATTRIBUTE_VALUE+"Click"; //verify !!!
SjamayeeFacade.ENTITY_ATTRIBUTE_LIST_ESCAPE = SjamayeeFacade.ENTITY_ATTRIBUTE_LIST+"Escape";
SjamayeeFacade.ENTITY_ATTRIBUTE_LIST_SPACE = SjamayeeFacade.ENTITY_ATTRIBUTE_LIST+"Space";
SjamayeeFacade.ENTITY_ATTRIBUTE_LIST_ENTER = SjamayeeFacade.ENTITY_ATTRIBUTE_LIST+"Enter";
SjamayeeFacade.ENTITY_ATTRIBUTE_LIST_HOME = SjamayeeFacade.ENTITY_ATTRIBUTE_LIST+"Home";
SjamayeeFacade.ENTITY_ATTRIBUTE_LIST_PREVIOUS = SjamayeeFacade.ENTITY_ATTRIBUTE_LIST+"Previous";
SjamayeeFacade.ENTITY_ATTRIBUTE_LIST_UP = SjamayeeFacade.ENTITY_ATTRIBUTE_LIST+"Up";
SjamayeeFacade.ENTITY_ATTRIBUTE_LIST_DOWN = SjamayeeFacade.ENTITY_ATTRIBUTE_LIST+"Down";
SjamayeeFacade.ENTITY_ATTRIBUTE_LIST_NEXT = SjamayeeFacade.ENTITY_ATTRIBUTE_LIST+"Next";
SjamayeeFacade.ENTITY_ATTRIBUTE_LIST_END = SjamayeeFacade.ENTITY_ATTRIBUTE_LIST+"End";
SjamayeeFacade.ENTITY_ATTRIBUTE_LIST_KEYPRESS = SjamayeeFacade.ENTITY_ATTRIBUTE_LIST+"Keypress";
SjamayeeFacade.ENTITY_NAME_KEYPRESS = SjamayeeFacade.ENTITY_NAME+"Keypress";          //verify !!!
SjamayeeFacade.ENTITY_NAME_KEYDOWN = SjamayeeFacade.ENTITY_NAME+"Keydown";            //verify !!!

SjamayeeFacade.OBJECT = "object";                                                            //!!! 2X !!!
SjamayeeFacade.OBJECT_ATTRIBUTE = SjamayeeFacade.OBJECT+"Attribute";
SjamayeeFacade.OBJECT_ATTRIBUTE_LIST = SjamayeeFacade.OBJECT_ATTRIBUTE+"List";
SjamayeeFacade.OBJECT_ATTRIBUTE_LIST_CLICK = SjamayeeFacade.OBJECT_ATTRIBUTE_LIST+"Click";
SjamayeeFacade.OBJECT_ATTRIBUTE_LINE = SjamayeeFacade.OBJECT_ATTRIBUTE+"Line";
SjamayeeFacade.OBJECT_ATTRIBUTE_LINE_CLICK = SjamayeeFacade.OBJECT_ATTRIBUTE_LINE+"Click";
SjamayeeFacade.OBJECT_ATTRIBUTE_NAME = SjamayeeFacade.OBJECT_ATTRIBUTE+"Name";
SjamayeeFacade.OBJECT_ATTRIBUTE_NAME_CLICK = SjamayeeFacade.OBJECT_ATTRIBUTE_NAME+"Click";
SjamayeeFacade.OBJECT_ATTRIBUTE_VALUE = SjamayeeFacade.OBJECT_ATTRIBUTE+"Value";
SjamayeeFacade.OBJECT_ATTRIBUTE_VALUE_CLICK = SjamayeeFacade.OBJECT_ATTRIBUTE_VALUE+"Click";
SjamayeeFacade.OBJECT_ATTRIBUTE_LIST_ESCAPE = SjamayeeFacade.OBJECT_ATTRIBUTE_LIST+"Escape";
SjamayeeFacade.OBJECT_ATTRIBUTE_LIST_SPACE = SjamayeeFacade.OBJECT_ATTRIBUTE_LIST+"Space";
SjamayeeFacade.OBJECT_ATTRIBUTE_LIST_ENTER = SjamayeeFacade.OBJECT_ATTRIBUTE_LIST+"Enter";
SjamayeeFacade.OBJECT_ATTRIBUTE_LIST_HOME = SjamayeeFacade.OBJECT_ATTRIBUTE_LIST+"Home";
SjamayeeFacade.OBJECT_ATTRIBUTE_LIST_PREVIOUS = SjamayeeFacade.OBJECT_ATTRIBUTE_LIST+"Previous";
SjamayeeFacade.OBJECT_ATTRIBUTE_LIST_UP = SjamayeeFacade.OBJECT_ATTRIBUTE_LIST+"Up";
SjamayeeFacade.OBJECT_ATTRIBUTE_LIST_DOWN = SjamayeeFacade.OBJECT_ATTRIBUTE_LIST+"Down";
SjamayeeFacade.OBJECT_ATTRIBUTE_LIST_NEXT = SjamayeeFacade.OBJECT_ATTRIBUTE_LIST+"Next";
SjamayeeFacade.OBJECT_ATTRIBUTE_LIST_END = SjamayeeFacade.OBJECT_ATTRIBUTE_LIST+"End";
SjamayeeFacade.OBJECT_ATTRIBUTE_LIST_KEYPRESS = SjamayeeFacade.OBJECT_ATTRIBUTE_LIST+"Keypress";
SjamayeeFacade.OBJECT_NAME = SjamayeeFacade.OBJECT+"Name";
SjamayeeFacade.OBJECT_NAME_KEYPRESS = SjamayeeFacade.OBJECT_NAME+"Keypress";
SjamayeeFacade.OBJECT_NAME_KEYDOWN = SjamayeeFacade.OBJECT_NAME+"Keydown";

SjamayeeFacade.ATTRIBUTE = "attribute";
SjamayeeFacade.ATTRIBUTE_LIST = SjamayeeFacade.ATTRIBUTE+"List";
SjamayeeFacade.ATTRIBUTE_LIST_CLICK = SjamayeeFacade.ATTRIBUTE_LIST+"Click";
SjamayeeFacade.ATTRIBUTE_NAME = SjamayeeFacade.ATTRIBUTE+"Name";
SjamayeeFacade.ATTRIBUTE_NAME_CLICK = SjamayeeFacade.ATTRIBUTE_NAME+"Click";
SjamayeeFacade.ATTRIBUTE_VALUE = SjamayeeFacade.ATTRIBUTE+"Value";
SjamayeeFacade.ATTRIBUTE_VALUE_CLICK = SjamayeeFacade.ATTRIBUTE_VALUE+"Click";
SjamayeeFacade.ATTRIBUTE_LIST_KEYPRESS = SjamayeeFacade.ATTRIBUTE_LIST+"Keypress";

SjamayeeFacade.ENTITY = "entity";
SjamayeeFacade.ENTITY_NTD = SjamayeeFacade.ENTITY+"NTD";
SjamayeeFacade.ENTITY_NTD_CLICK = SjamayeeFacade.ENTITY_NTD+"Click";
SjamayeeFacade.ENTITY_NTD_KEYPRESS = SjamayeeFacade.ENTITY_NTD+"Keypress";
SjamayeeFacade.ENTITY_NTD_KEYDOWN = SjamayeeFacade.ENTITY_NTD+"Keydown";
SjamayeeFacade.ENTITY_NAME = SjamayeeFacade.ENTITY+"Name";
SjamayeeFacade.ENTITY_NAME_CLICK = SjamayeeFacade.ENTITY_NAME+"Click";
SjamayeeFacade.ENTITY_NAME_KEYPRESS = SjamayeeFacade.ENTITY_NAME+"Keypress";
SjamayeeFacade.ENTITY_NAME_KEYDOWN = SjamayeeFacade.ENTITY_NAME+"Keydown";

SjamayeeFacade.OBJECT = "object";
SjamayeeFacade.OBJECT_NTD = SjamayeeFacade.OBJECT+"NTD";
SjamayeeFacade.OBJECT_NTD_CLICK = SjamayeeFacade.OBJECT_NTD+"Click";
SjamayeeFacade.OBJECT_NTD_KEYPRESS = SjamayeeFacade.OBJECT_NTD+"Keypress";
SjamayeeFacade.OBJECT_NTD_KEYDOWN = SjamayeeFacade.OBJECT_NTD+"Keydown";
SjamayeeFacade.OBJECT_NAME = SjamayeeFacade.OBJECT+"Name";
SjamayeeFacade.OBJECT_NAME_CLICK = SjamayeeFacade.OBJECT_NAME+"Click";
SjamayeeFacade.OBJECT_NAME_KEYPRESS = SjamayeeFacade.OBJECT_NAME+"Keypress";
SjamayeeFacade.OBJECT_NAME_KEYDOWN = SjamayeeFacade.OBJECT_NAME+"Keydown";

SjamayeeFacade.PARENT = "parent";
SjamayeeFacade.PARENT_DETAIL = SjamayeeFacade.PARENT+"Detail";
SjamayeeFacade.PARENT_NTD = SjamayeeFacade.PARENT+"NTD";
SjamayeeFacade.PARENT_NTD_CLICK = SjamayeeFacade.PARENT_NTD+"Click";
SjamayeeFacade.PARENT_NTD_KEYPRESS = SjamayeeFacade.PARENT_NTD+"Keypress";
SjamayeeFacade.PARENT_NTD_KEYDOWN = SjamayeeFacade.PARENT_NTD+"Keydown";
SjamayeeFacade.PARENT_NAME = SjamayeeFacade.PARENT+"Name";
SjamayeeFacade.PARENT_NAME_CLICK = SjamayeeFacade.PARENT_NAME+"Click";
SjamayeeFacade.PARENT_NAME_KEYPRESS = SjamayeeFacade.PARENT_NAME+"Keypress";
SjamayeeFacade.PARENT_NAME_KEYDOWN = SjamayeeFacade.PARENT_NAME+"Keydown";
SjamayeeFacade.PARENT_NAME_DBLCLICK = SjamayeeFacade.PARENT_NAME+"DblClick";

SjamayeeFacade.CHILD = "child";
SjamayeeFacade.CHILD_DETAIL = SjamayeeFacade.CHILD+"Detail";
SjamayeeFacade.CHILD_NTD = SjamayeeFacade.CHILD+"NTD";
SjamayeeFacade.CHILD_NTD_CLICK = SjamayeeFacade.CHILD_NTD+"Click";
SjamayeeFacade.CHILD_NTD_KEYPRESS = SjamayeeFacade.CHILD_NTD+"Keypress";
SjamayeeFacade.CHILD_NTD_KEYDOWN = SjamayeeFacade.CHILD_NTD+"Keydown";
SjamayeeFacade.CHILD_NAME = SjamayeeFacade.CHILD+"Name";
SjamayeeFacade.CHILD_NAME_CLICK = SjamayeeFacade.CHILD_NAME+"Click";
SjamayeeFacade.CHILD_NAME_KEYPRESS = SjamayeeFacade.CHILD_NAME+"Keypress";
SjamayeeFacade.CHILD_NAME_KEYDOWN = SjamayeeFacade.CHILD_NAME+"Keydown";

SjamayeeFacade.GO_NTD_CLICK = "goNTDClick";
SjamayeeFacade.NOGO_NTD_CLICK = "noGoNTDClick";

SjamayeeFacade.KEYUP = "keyup";
SjamayeeFacade.KEYDOWN = "keydown";
SjamayeeFacade.KEYPRESS = "keypress";
SjamayeeFacade.MOUSEOVER = "mouseover";
SjamayeeFacade.MOUSEOUT = "mouseout";
SjamayeeFacade.DBLCLICK = "dblclick";
SjamayeeFacade.BLUR = "blur";
SjamayeeFacade.FOCUS = "focus";
SjamayeeFacade.CLICK = "click";
SjamayeeFacade.CHANGE = "change";
SjamayeeFacade.LEFT = "left";
SjamayeeFacade.RIGHT = "right";
SjamayeeFacade.UP = "up";
SjamayeeFacade.DOWN = "down";
SjamayeeFacade.HOME = "home";
SjamayeeFacade.END = "end";
SjamayeeFacade.PREVIOUS = "pup";
SjamayeeFacade.NEXT = "pdn";
SjamayeeFacade.ESCAPE = "esc";
SjamayeeFacade.SPACE = "space";
SjamayeeFacade.ENTER = "enter";
SjamayeeFacade.SIZE_NORMAL = "NORMAL";
SjamayeeFacade.SIZE_FULL = "FULL";

SjamayeeFacade.RELATION = "relation";
SjamayeeFacade.RELATION_DATA = SjamayeeFacade.RELATION+"Data";
SjamayeeFacade.RELATION_MODEL = SjamayeeFacade.RELATION+"Model";
SjamayeeFacade.RELATION_ADD = SjamayeeFacade.RELATION+"Add";
SjamayeeFacade.RELATION_DATA_ADD = SjamayeeFacade.RELATION_DATA+"Add";
SjamayeeFacade.RELATION_MODEL_ADD = SjamayeeFacade.RELATION_MODEL+"Add";
SjamayeeFacade.RELATION_DELETE = SjamayeeFacade.RELATION+"Delete";
SjamayeeFacade.RELATION_DATA_DELETE = SjamayeeFacade.RELATION_DATA+"Delete";
SjamayeeFacade.RELATION_MODEL_DELETE = SjamayeeFacade.RELATION_MODEL+"Delete";
SjamayeeFacade.RELATION_EDIT = SjamayeeFacade.RELATION+"Edit";
SjamayeeFacade.RELATION_DATA_EDIT = SjamayeeFacade.RELATION_DATA+"Edit";
SjamayeeFacade.RELATION_MODEL_EDIT = SjamayeeFacade.RELATION_MODEL+"Edit";
SjamayeeFacade.RELATION_SAVE = SjamayeeFacade.RELATION+"Save";
SjamayeeFacade.RELATION_DATA_SAVE = SjamayeeFacade.RELATION_DATA+"Save";
SjamayeeFacade.RELATION_MODEL_SAVE = SjamayeeFacade.RELATION_MODEL+"Save";
SjamayeeFacade.RELATION_CANCEL = SjamayeeFacade.RELATION+"Cancel";
SjamayeeFacade.RELATION_DATA_CANCEL = SjamayeeFacade.RELATION_DATA+"Cancel";
SjamayeeFacade.RELATION_MODEL_CANCEL = SjamayeeFacade.RELATION_MODEL+"Cancel";
SjamayeeFacade.RELATION_SAVED = SjamayeeFacade.RELATION+"Saved";
SjamayeeFacade.RELATION_DELETED = SjamayeeFacade.RELATION+"Deleted";
SjamayeeFacade.RELATION_SHOW = "RelationShow";
SjamayeeFacade.RELATION_EXTRACT = SjamayeeFacade.RELATION+"Extract";
SjamayeeFacade.RELATION_DATA_EXTRACT = SjamayeeFacade.RELATION_DATA+"Extract";
SjamayeeFacade.RELATION_MODEL_EXTRACT = SjamayeeFacade.RELATION_MODEL+"Extract";
SjamayeeFacade.RELATION_COPY = SjamayeeFacade.RELATION+"Copy";
SjamayeeFacade.RELATION_DATA_COPY = SjamayeeFacade.RELATION_DATA+"Copy";
SjamayeeFacade.RELATION_MODEL_COPY = SjamayeeFacade.RELATION_MODEL+"Copy";
SjamayeeFacade.RELATION_PASTE = SjamayeeFacade.RELATION+"Paste";
SjamayeeFacade.RELATION_DATA_PASTE = SjamayeeFacade.RELATION_DATA+"Paste";
SjamayeeFacade.RELATION_MODEL_PASTE = SjamayeeFacade.RELATION_MODEL+"Paste";
SjamayeeFacade.RELATION_UNDO = SjamayeeFacade.RELATION+"Undo";
SjamayeeFacade.RELATION_DATA_UNDO = SjamayeeFacade.RELATION_DATA+"Undo";
SjamayeeFacade.RELATION_MODEL_UNDO = SjamayeeFacade.RELATION_MODEL+"Undo";
SjamayeeFacade.RELATION_REDO = SjamayeeFacade.RELATION+"Redo";
SjamayeeFacade.RELATION_DATA_REDO = SjamayeeFacade.RELATION_DATA+"Redo";
SjamayeeFacade.RELATION_MODEL_REDO = SjamayeeFacade.RELATION_MODEL+"Redo";
SjamayeeFacade.RELATION_SFDC = SjamayeeFacade.RELATION+"SFDC";
SjamayeeFacade.RELATION_SFDC_SHOW = SjamayeeFacade.RELATION_SFDC+"Show";
SjamayeeFacade.RELATION_DATA_SFDC_SHOW = SjamayeeFacade.RELATION_DATA+SjamayeeFacade.RELATION_SFDC_SHOW;
SjamayeeFacade.RELATION_MODEL_SFDC_SHOW = SjamayeeFacade.RELATION_MODEL+SjamayeeFacade.RELATION_SFDC_SHOW;
SjamayeeFacade.GRID_BUFFER_CLEAR = SjamayeeFacade.GRID+"BufferClear";
//SjamayeeFacade.GRID_DATA = SjamayeeFacade.GRID+"Data";                   //verify !!!
SjamayeeFacade.GRID_DATA_BUFFER_CLEAR = SjamayeeFacade.GRID_DATA+"BufferClear";
//SjamayeeFacade.GRID_MODEL = SjamayeeFacade.GRID+"Model";
SjamayeeFacade.GRID_MODEL_BUFFER_CLEAR = SjamayeeFacade.GRID_MODEL+"BufferClear";
SjamayeeFacade.GRID_RESET = SjamayeeFacade.GRID+"Reset";
SjamayeeFacade.GRID_DATA_RESET = SjamayeeFacade.GRID_DATA+"Reset";
SjamayeeFacade.GRID_MODEL_RESET = SjamayeeFacade.GRID_MODEL+"Reset";
SjamayeeFacade.RESIZE = "resize";

SjamayeeFacade.OLIST = "oList";                                              //verify !!!
SjamayeeFacade.OLIST_DATA = SjamayeeFacade.OLIST+"Data";
SjamayeeFacade.OLIST_DATA_OBJECT = SjamayeeFacade.OLIST_DATA+SjamayeeFacade.OBJECT;
SjamayeeFacade.OLIST_DATA_OBJECT_ADD = SjamayeeFacade.OLIST_DATA_OBJECT+"Add";
SjamayeeFacade.OLIST_DATA_OBJECT_DELETE = SjamayeeFacade.OLIST_DATA_OBJECT+"Delete";
SjamayeeFacade.OLIST_DATA_OBJECT_EDIT = SjamayeeFacade.OLIST_DATA_OBJECT+"Edit";
SjamayeeFacade.OLIST_DATA_OBJECT_UNDO = SjamayeeFacade.OLIST_DATA_OBJECT+"Undo";
SjamayeeFacade.OLIST_DATA_OBJECT_REDO = SjamayeeFacade.OLIST_DATA_OBJECT+"Redo";
SjamayeeFacade.OLIST_DATA_BUFFER_CLEAR = SjamayeeFacade.OLIST_DATA+"BufferClear";
SjamayeeFacade.OLIST_DATA_TEXT = SjamayeeFacade.OLIST_DATA+"Text";                  //verify !!!
SjamayeeFacade.OLIST_DATA_TEXT_EDIT = SjamayeeFacade.OLIST_DATA_TEXT+"Edit";
SjamayeeFacade.OLIST_DATA_OBJECT_UNREFS_DELETE = "dataOlistDeleteUnrefObjects";

SjamayeeFacade.OLIST_MODEL = "modelOlist";
SjamayeeFacade.OLIST_MODEL_OBJECT = SjamayeeFacade.OLIST_MODEL+"Object";
SjamayeeFacade.OLIST_MODEL_OBJECT_ADD = SjamayeeFacade.OLIST_MODEL_OBJECT+"Add";
SjamayeeFacade.OLIST_MODEL_OBJECT_DELETE = SjamayeeFacade.OLIST_MODEL_OBJECT+"Delete";
SjamayeeFacade.OLIST_MODEL_OBJECT_EDIT = SjamayeeFacade.OLIST_MODEL_OBJECT+"Edit";
SjamayeeFacade.OLIST_MODEL_OBJECT_UNDO = SjamayeeFacade.OLIST_MODEL_OBJECT+"Undo";
SjamayeeFacade.OLIST_MODEL_OBJECT_REDO = SjamayeeFacade.OLIST_MODEL_OBJECT+"Redo";
SjamayeeFacade.OLIST_MODEL_BUFFER_CLEAR = SjamayeeFacade.OLIST_MODEL+"BufferClear";
SjamayeeFacade.OLIST_MODEL_TEXT_EDIT = SjamayeeFacade.OLIST_MODEL+"TextEdit";
SjamayeeFacade.OLIST_MODEL_OBJECT_UNREFS_DELETE = SjamayeeFacade.OLIST_MODEL+"DeleteUnrefObjects";

SjamayeeFacade.OBJECT = "object";
SjamayeeFacade.OBJECT_DATA = SjamayeeFacade.OBJECT+"Data";
SjamayeeFacade.OBJECT_MODEL = SjamayeeFacade.OBJECT+"Model";
SjamayeeFacade.OBJECT_DETAIL = SjamayeeFacade.OBJECT+"Detail";
SjamayeeFacade.OBJECT_DATA_DETAIL = SjamayeeFacade.OBJECT_DATA+"Detail";
SjamayeeFacade.OBJECT_MODEL_DETAIL = SjamayeeFacade.OBJECT_MODEL+"Detail";
SjamayeeFacade.OBJECT_ADD = SjamayeeFacade.OBJECT+"Add";
SjamayeeFacade.OBJECT_DATA_ADD = SjamayeeFacade.OBJECT_DATA+"Add";
SjamayeeFacade.OBJECT_MODEL_ADD = SjamayeeFacade.OBJECT_MODEL+"Add";
SjamayeeFacade.OBJECT_DELETE = SjamayeeFacade.OBJECT+"Delete";
SjamayeeFacade.OBJECT_DATA_DELETE = SjamayeeFacade.OBJECT_DATA+"Delete";
SjamayeeFacade.OBJECT_MODEL_DELETE = SjamayeeFacade.OBJECT_MODEL+"Delete";
SjamayeeFacade.OBJECT_EDIT = SjamayeeFacade.OBJECT+"Edit";
SjamayeeFacade.OBJECT_DATA_EDIT = SjamayeeFacade.OBJECT_DATA+"Edit";
SjamayeeFacade.OBJECT_MODEL_EDIT = SjamayeeFacade.OBJECT_MODEL+"Edit";
SjamayeeFacade.OBJECT_SAVE = SjamayeeFacade.OBJECT+"Save";
SjamayeeFacade.OBJECT_DATA_SAVE = SjamayeeFacade.OBJECT_DATA+"Save";
SjamayeeFacade.OBJECT_MODEL_SAVE = SjamayeeFacade.OBJECT_MODEL+"Save";
SjamayeeFacade.OBJECT_CANCEL = SjamayeeFacade.OBJECT+"Cancel";
SjamayeeFacade.OBJECT_DATA_CANCEL = SjamayeeFacade.OBJECT_DATA+"Cancel";
SjamayeeFacade.OBJECT_MODEL_CANCEL = SjamayeeFacade.OBJECT_MODEL+"Cancel";
SjamayeeFacade.OBJECT_SAVED = SjamayeeFacade.OBJECT+"Saved";
SjamayeeFacade.OBJECT_DELETED = SjamayeeFacade.OBJECT+"Deleted";
SjamayeeFacade.OBJECT_SHOW = SjamayeeFacade.OBJECT+"Show";
SjamayeeFacade.OBJECT_UNDO = SjamayeeFacade.OBJECT+"Undo";
SjamayeeFacade.OBJECT_DATA_UNDO = SjamayeeFacade.OBJECT_DATA+"Undo";
SjamayeeFacade.OBJECT_MODEL_UNDO = SjamayeeFacade.OBJECT_MODEL+"Undo";
SjamayeeFacade.OBJECT_REDO = SjamayeeFacade.OBJECT+"Redo";
SjamayeeFacade.OBJECT_DATA_REDO = SjamayeeFacade.OBJECT_DATA+"Redo";
SjamayeeFacade.OBJECT_MODEL_REDO = SjamayeeFacade.OBJECT_MODEL+"Redo";
SjamayeeFacade.OBJECT_BUFFER_CLEAR = SjamayeeFacade.OBJECT+"BufferClear";
SjamayeeFacade.OBJECT_DATA_BUFFER_CLEAR = SjamayeeFacade.OBJECT_DATA+"BufferClear";
SjamayeeFacade.OBJECT_MODEL_BUFFER_CLEAR = SjamayeeFacade.OBJECT_MODEL+"BufferClear";
SjamayeeFacade.OBJECT_UNREFS_DELETE = "deleteUnrefObjects";
SjamayeeFacade.OBJECT_DATA_UNREFS_DELETE = "deleteUnrefDataObjects";
SjamayeeFacade.OBJECT_MODEL_UNREFS_DELETE = "deleteUnrefModelObjects";
SjamayeeFacade.OBJECT_SFDC_SHOW = SjamayeeFacade.OBJECT+"SFDCShow";
SjamayeeFacade.OBJECT_DATA_SFDC_SHOW = SjamayeeFacade.OBJECT_DATA+"SFDCShow";
SjamayeeFacade.OBJECT_MODEL_SFDC_SHOW = SjamayeeFacade.OBJECT_MODEL+"SFDCShow";

SjamayeeFacade.TEXT = "text";
SjamayeeFacade.TEXT_KEYUP = SjamayeeFacade.TEXT+"Keyup";
SjamayeeFacade.TEXT_EDIT = SjamayeeFacade.TEXT+"Edit";
SjamayeeFacade.TEXT_SAVE = SjamayeeFacade.TEXT+"Save";
SjamayeeFacade.TEXT_CANCEL = SjamayeeFacade.TEXT+"Cancel";
SjamayeeFacade.TEXT_RESIZE = SjamayeeFacade.TEXT+"Resize";
SjamayeeFacade.TEXT_RELATION = SjamayeeFacade.TEXT+SjamayeeFacade.RELATION;
SjamayeeFacade.TEXT_RELATION_EDIT = SjamayeeFacade.TEXT_RELATION+"Edit";
SjamayeeFacade.TEXT_PARENT = SjamayeeFacade.TEXT+SjamayeeFacade.PARENT;         //verify !!!
SjamayeeFacade.TEXT_PARENT_EDIT = SjamayeeFacade.TEXT_PARENT+"Edit";
SjamayeeFacade.TEXT_CHILD = SjamayeeFacade.TEXT+SjamayeeFacade.CHILD;           //verify !!!
SjamayeeFacade.TEXT_CHILD_EDIT = SjamayeeFacade.TEXT_CHILD+"Edit";

SjamayeeFacade.getInstance = function() {
	if (Facade.instance === undefined)	{
		//The classFactory is used as a descriptor for the ApplicatonFacade
		//when hierarchical relationships are required as in this case.
		var classFactory = new Class(new SjamayeeFacade());
		Facade.instance = new classFactory();
	}
	return Facade.instance;
};
