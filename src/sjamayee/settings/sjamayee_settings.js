/*
V = &#86;
> = &#62;
*/

//////////////////////////////////////////////////////////////////////////
// Settings - Sjamayee settings.                                        //
//////////////////////////////////////////////////////////////////////////

//////////////////////////////
// Keyboard event key codes //
//////////////////////////////
//Possible Event key codes:
// backspace =
// delete =
// down = 40
// enter =
// esc = 27
// left = 37
// right = 39
// space = 32
// tab =
// up = 38
//Additional Event key codes:
Event.Keys.pup = 33;
Event.Keys.pdn = 34;
Event.Keys.end = 35;
Event.Keys.home = 36;

//Class: SettingsFacade
var SettingsFacade = function() {
	this.Extends = new Class(new Facade());
	this.application = null;
	//MODE: Edit/Display
	this.mode = null;

	this.startup = function(app) {
		this.setApplication(app);
		this.sendNotification(SettingsFacade.STARTUP, app);
	}

	this.setApplication = function(app) {
		this.application = app;
	}

	this.getApplication = function() {
		return this.application;
	}

	this.getMode = function() {
	  if ((this.mode === undefined) || (this.mode === null)) {
	    this.setMode(SettingsFacade.MODE_DISPLAY);
	  }
		return this.mode;
	}
  this.setMode = function(mode) {
    this.mode = mode;
  }

	this.initializeController = function() {
		//Always call this.parent()
		this.parent();
		this.registerCommand(SettingsFacade.STARTUP, StartupCommand);
	}
	
	this.sendNotification = function(notificationName,body,type) {
	  alert("SettingsFacade/sendNotification - note: "+notificationName);
	  this.parent(notificationName,body,type);
	}
}
//Notification name constants
SettingsFacade.STARTUP = "startup";

//SettingsFacade.APPLICATION_TYPE = "COMPOSER";
//SettingsFacade.APPLICATION_TYPE_BROWSER = "BROWSER";
//SettingsFacade.APPLICATION_TYPE_EXPLORER = "EXPLORER";
//SettingsFacade.APPLICATION_TYPE_COMPOSER = "COMPOSER";

SettingsFacade.COLOR_DOT = "red";
SettingsFacade.NAVIGATION_CONTROL_ID = "navigationControl";
SettingsFacade.PAGE_MULTIPLIER = 3;

//SettingsFacade.SIZE_NORMAL = "NORMAL";
//SettingsFacade.SIZE_FULL = "FULL";
//SettingsFacade.OBJECT_DATA_ADD = "objectDataAdd";

//Event-keys<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
SettingsFacade.EVT_KEYUP = "keyup";
SettingsFacade.EVT_KEYDOWN = "keydown";
SettingsFacade.EVT_KEYPRESS = "keypress";
SettingsFacade.EVT_MOUSEOVER = "mouseover";
SettingsFacade.EVT_MOUSEOUT = "mouseout";
SettingsFacade.EVT_DBLCLICK = "dblclick";
SettingsFacade.EVT_BLUR = "blur";
SettingsFacade.EVT_FOCUS = "focus";
SettingsFacade.EVT_CLICK = "click";
SettingsFacade.EVT_CHANGE = "change";
SettingsFacade.EVT_LEFT = "left";
SettingsFacade.EVT_RIGHT = "right";
SettingsFacade.EVT_UP = "up";
SettingsFacade.EVT_DOWN = "down";
SettingsFacade.EVT_HOME = "home";
SettingsFacade.EVT_END = "end";
SettingsFacade.EVT_PREVIOUS = "pup";
SettingsFacade.EVT_NEXT = "pdn";
SettingsFacade.EVT_ESCAPE = "esc";
SettingsFacade.EVT_SPACE = "space";
SettingsFacade.EVT_ENTER = "enter";
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

//////////////////////////////////////////////////////////////
// DICTIONARY FOR TECHNICAL NAMES like FIELDS,COMMANDS      //
// NOTE: NOT TO USE FOR Labels, Values, ... only technicals //
//////////////////////////////////////////////////////////////
SettingsFacade.ACTION = "Action";
SettingsFacade.ACTIVATE = "Activate";
SettingsFacade.ADD = "Add";
SettingsFacade.ALL = "All";
SettingsFacade.APPLICATION = "Application";
SettingsFacade.AVAILABLE = "Available";
SettingsFacade.BODY = "Body";
SettingsFacade.BUTTON = "Button";
SettingsFacade.BUTTONS = SettingsFacade.BUTTON+"s";
SettingsFacade.BY = "By";
SettingsFacade.CANCEL = "Cancel";
SettingsFacade.CHANGE = "Change";
SettingsFacade.CHARS = "Chars";
SettingsFacade.CHOSEN = "Chosen";
SettingsFacade.CLICK = "Click";
SettingsFacade.CLONE = "Clone";
SettingsFacade.COLOR = "Color";
SettingsFacade.COLUMN = "Column";
SettingsFacade.COLUMNS = SettingsFacade.COLUMN+"s";
SettingsFacade.CREATED = "Created";
SettingsFacade.DEFAULT = "Default";
SettingsFacade.DELETE = "Delete";
SettingsFacade.DETAIL = "Detail";
SettingsFacade.DISPLAY = "Display";
SettingsFacade.EDIT = "Edit";
SettingsFacade.FIRST = "First";
SettingsFacade.FOLD = "Fold";
SettingsFacade.FONT = "Font";
SettingsFacade.FOOTER = "Footer";
SettingsFacade.GROUP = "Group";
SettingsFacade.HEADER = "Header"
SettingsFacade.ITEM = "Item";
SettingsFacade.LABEL = "Label";
SettingsFacade.LENGTH = "Length";
SettingsFacade.LINE = "Line";
SettingsFacade.LIST = "List";
SettingsFacade.MAXIMUM = "Maximum";
SettingsFacade.MEDIATOR = "Mediator";
SettingsFacade.MINIMUM = "Minimum";
SettingsFacade.MODE = "Mode";
SettingsFacade.MODIFIED = "Modified";
SettingsFacade.NAME = "Name";
SettingsFacade.NEW = "New";
SettingsFacade.NO = "No";
SettingsFacade.OBJECT = "Object";
SettingsFacade.REMOVE = "Remove";
SettingsFacade.ROOT = "Root";
SettingsFacade.ROWS = "Rows";
SettingsFacade.SAVE = "Save";
SettingsFacade.SECOND = "Second";
SettingsFacade.SELECT = "Select";
SettingsFacade.SELECTED = "Selected";
SettingsFacade.SEPARATOR = "Separator";
SettingsFacade.SETTING = "Setting";
SettingsFacade.TITLE = "Title";
SettingsFacade.TRAILING = "Trailing";
SettingsFacade.TYPE = "Type";
SettingsFacade.TYPES = "Types";
SettingsFacade.WHAT_USED = "WhatUsed";
SettingsFacade.WHERE_USED = "WhereUsed";
SettingsFacade.FOLD_OPEN = true;
SettingsFacade.FOLD_OPENED = "&#86;";
SettingsFacade.FOLD_CLOSE = false;
SettingsFacade.FOLD_CLOSED = "&#62;";

SettingsFacade.CREATED_BY = SettingsFacade.CREATED+SettingsFacade.BY;
SettingsFacade.MODIFIED_BY = SettingsFacade.MODIFIED+SettingsFacade.BY;
SettingsFacade.FOLD_BUTTON = SettingsFacade.FOLD+SettingsFacade.BUTTON;
SettingsFacade.SELECT_ALL = SettingsFacade.SELECT+SettingsFacade.ALL;
SettingsFacade.SETTING_DETAIL = SettingsFacade.SETTING+SettingsFacade.DETAIL;
SettingsFacade.SETTING_DETAIL_MEDIATOR = SettingsFacade.DETAIL+SettingsFacade.MEDIATOR;
SettingsFacade.SETTING_LIST = SettingsFacade.SETTING+SettingsFacade.LIST;
SettingsFacade.SETTING_LIST_MEDIATOR = SettingsFacade.SETTING_LIST+SettingsFacade.MEDIATOR;

SettingsFacade.NEW_BUTTON = SettingsFacade.NEW+SettingsFacade.BUTTON;
SettingsFacade.SELECT_BUTTON = SettingsFacade.SELECT+SettingsFacade.BUTTON;
SettingsFacade.FOLD_SEPARATOR = SettingsFacade.FOLD+SettingsFacade.SEPARATOR;
SettingsFacade.LINE_SEPARATOR = SettingsFacade.LINE+SettingsFacade.SEPARATOR;
SettingsFacade.LINE_NO = SettingsFacade.LINE+SettingsFacade.NO;
SettingsFacade.LINE_NO_SEPARATOR = SettingsFacade.LINE_NO+SettingsFacade.SEPARATOR;
SettingsFacade.LIST_SEPARATOR = SettingsFacade.LIST+SettingsFacade.SEPARATOR;
SettingsFacade.COLUMN_FIRST = SettingsFacade.COLUMN+SettingsFacade.FIRST;
SettingsFacade.COLUMN_SECOND = SettingsFacade.COLUMN+SettingsFacade.SECOND;
SettingsFacade.MODE_EDIT = SettingsFacade.MODE+SettingsFacade.EDIT;
SettingsFacade.MODE_DISPLAY = SettingsFacade.MODE+SettingsFacade.DISPLAY;

SettingsFacade.HEADER_BUTTONS = SettingsFacade.HEADER+SettingsFacade.BUTTONS;
SettingsFacade.HEADER_EDIT = SettingsFacade.HEADER+SettingsFacade.EDIT;
SettingsFacade.HEADER_EDIT_BUTTON = SettingsFacade.HEADER_EDIT+SettingsFacade.BUTTON;
SettingsFacade.HEADER_EDIT_BUTTONS = SettingsFacade.HEADER_EDIT+SettingsFacade.BUTTONS;
SettingsFacade.HEADER_CANCEL = SettingsFacade.HEADER+SettingsFacade.CANCEL;
SettingsFacade.HEADER_CANCEL_BUTTON = SettingsFacade.HEADER_CANCEL+SettingsFacade.BUTTON;
SettingsFacade.HEADER_SAVE = SettingsFacade.HEADER+SettingsFacade.SAVE;
SettingsFacade.HEADER_SAVE_BUTTON = SettingsFacade.HEADER_SAVE+SettingsFacade.BUTTON;
SettingsFacade.HEADER_DELETE = SettingsFacade.HEADER_DELETE+SettingsFacade.DELETE;
SettingsFacade.HEADER_DELETE_BUTTON = SettingsFacade.HEADER_DELETE+SettingsFacade.BUTTON;
SettingsFacade.HEADER_CLONE = SettingsFacade.HEADER+SettingsFacade.CLONE;
SettingsFacade.HEADER_CLONE_BUTTON = SettingsFacade.HEADER_CLONE+SettingsFacade.BUTTON;
SettingsFacade.HEADER_ACTIVATE = SettingsFacade.HEADER+SettingsFacade.ACTIVATE;
SettingsFacade.HEADER_ACTIVATE_BUTTON = SettingsFacade.HEADER_ACTIVATE+SettingsFacade.BUTTON;
SettingsFacade.HEADER_ACTION = SettingsFacade.HEADER+SettingsFacade.ACTION;
SettingsFacade.HEADER_ACTION_SELECT = SettingsFacade.HEADER_ACTION+SettingsFacade.SELECT;
SettingsFacade.HEADER_ACTION_LABEL = SettingsFacade.HEADER_ACTION+SettingsFacade.LABEL;
SettingsFacade.HEADER_NAME = SettingsFacade.HEADER+SettingsFacade.NAME;
SettingsFacade.HEADER_NAME_LABEL = SettingsFacade.HEADER_NAME+SettingsFacade.LABEL;
SettingsFacade.HEADER_DEFAULT = SettingsFacade.HEADER+SettingsFacade.DEFAULT;
SettingsFacade.HEADER_DEFAULT_LABEL = SettingsFacade.HEADER_DEFAULT+SettingsFacade.LABEL;

SettingsFacade.FOOTER_BUTTONS = SettingsFacade.FOOTER+SettingsFacade.BUTTONS;
SettingsFacade.FOOTER_EDIT = SettingsFacade.FOOTER+SettingsFacade.EDIT;
SettingsFacade.FOOTER_EDIT_BUTTON = SettingsFacade.FOOTER_EDIT+SettingsFacade.BUTTON;
SettingsFacade.FOOTER_EDIT_BUTTONS = SettingsFacade.FOOTER_EDIT+SettingsFacade.BUTTONS;
SettingsFacade.FOOTER_CANCEL = SettingsFacade.FOOTER+SettingsFacade.CANCEL;
SettingsFacade.FOOTER_CANCEL_BUTTON = SettingsFacade.FOOTER_CANCEL+SettingsFacade.BUTTON;
SettingsFacade.FOOTER_SAVE = SettingsFacade.FOOTER+SettingsFacade.SAVE;
SettingsFacade.FOOTER_SAVE_BUTTON = SettingsFacade.FOOTER_SAVE+SettingsFacade.BUTTON;
SettingsFacade.FOOTER_DELETE = SettingsFacade.FOOTER_DELETE+SettingsFacade.DELETE;
SettingsFacade.FOOTER_DELETE_BUTTON = SettingsFacade.FOOTER_DELETE+SettingsFacade.BUTTON;
SettingsFacade.FOOTER_CLONE = SettingsFacade.FOOTER+SettingsFacade.CLONE;
SettingsFacade.FOOTER_CLONE_BUTTON = SettingsFacade.FOOTER_CLONE+SettingsFacade.BUTTON;
SettingsFacade.FOOTER_ACTIVATE = SettingsFacade.FOOTER+SettingsFacade.ACTIVATE;
SettingsFacade.FOOTER_ACTIVATE_BUTTON = SettingsFacade.FOOTER_ACTIVATE+SettingsFacade.BUTTON;

SettingsFacade.BODY_LINE = SettingsFacade.BODY+SettingsFacade.LINE;
SettingsFacade.LINE_ACTION = SettingsFacade.LINE+SettingsFacade.ACTION;
SettingsFacade.LINE_ACTION_SELECT = SettingsFacade.LINE_ACTION+SettingsFacade.SELECT;
SettingsFacade.LINE_ACTION_EDIT = SettingsFacade.LINE_ACTION+SettingsFacade.EDIT;
SettingsFacade.LINE_ACTION_DELETE = SettingsFacade.LINE_ACTION+SettingsFacade.DELETE;

SettingsFacade.NAME_CHANGE = SettingsFacade.NAME+SettingsFacade.CHANGE;
SettingsFacade.DEFAULT_CHANGE = SettingsFacade.DEFAULT+SettingsFacade.CHANGE;
SettingsFacade.APPLICATION_TYPE = SettingsFacade.APPLICATION+SettingsFacade.TYPE;
SettingsFacade.APPLICATION_TYPE_CHANGE = SettingsFacade.APPLICATION_TYPE+SettingsFacade.CHANGE;
SettingsFacade.COLUMNS_MINIMUM = SettingsFacade.COLUMNS+SettingsFacade.MINIMUM
SettingsFacade.COLUMNS_MINIMUM_CHANGE = SettingsFacade.COLUMNS_MINIMUM+SettingsFacade.CHANGE;
SettingsFacade.COLUMNS_MAXIMUM = SettingsFacade.COLUMNS+SettingsFacade.MAXIMUM;
SettingsFacade.COLUMNS_MAXIMUM_CHANGE = SettingsFacade.COLUMNS_MAXIMUM+SettingsFacade.CHANGE;
SettingsFacade.ROWS_CHANGE = SettingsFacade.ROWS+SettingsFacade.CHANGE;
SettingsFacade.TRAILING_CHARS = SettingsFacade.TRAILING+SettingsFacade.CHARS;
SettingsFacade.TRAILING_CHARS_CHANGE = SettingsFacade.TRAILING_CHARS+SettingsFacade.CHANGE;

SettingsFacade.WHERE_USED_COLUMNS = SettingsFacade.WHERE_USED+SettingsFacade.COLUMNS;
SettingsFacade.WHERE_USED_COLUMNS_HEADER = SettingsFacade.WHERE_USED_COLUMNS+SettingsFacade.HEADER;
SettingsFacade.WHERE_USED_COLUMNS_FOLD = SettingsFacade.WHERE_USED_COLUMNS+SettingsFacade.FOLD;
SettingsFacade.WHERE_USED_COLUMNS_FOLD_BUTTON = SettingsFacade.WHERE_USED_COLUMNS_FOLD+SettingsFacade.BUTTON;
SettingsFacade.WHERE_USED_COLUMNS_FOLD_CLICK = SettingsFacade.WHERE_USED_COLUMNS_FOLD+SettingsFacade.CLICK;
SettingsFacade.WHERE_USED_COLUMNS_TITLE = SettingsFacade.WHERE_USED_COLUMNS+SettingsFacade.TITLE;
SettingsFacade.WHERE_USED_COLUMNS_CHANGE = SettingsFacade.WHERE_USED_COLUMNS+SettingsFacade.CHANGE;
SettingsFacade.WHERE_USED_COLUMNS_GROUP = SettingsFacade.WHERE_USED_COLUMNS+SettingsFacade.GROUP;
SettingsFacade.WHERE_USED_ITEM = SettingsFacade.WHERE_USED+SettingsFacade.ITEM;
SettingsFacade.WHERE_USED_ITEM_LENGTH = SettingsFacade.WHERE_USED_ITEM+SettingsFacade.LENGTH;
SettingsFacade.WHERE_USED_ITEM_COLOR = SettingsFacade.WHERE_USED_ITEM+SettingsFacade.COLOR;
SettingsFacade.WHERE_USED_ITEM_COLOR_CHANGE = SettingsFacade.WHERE_USED_ITEM_COLOR+SettingsFacade.CHANGE;
SettingsFacade.WHERE_USED_ITEM_FONT = SettingsFacade.WHERE_USED_ITEM+SettingsFacade.FONT;
SettingsFacade.WHERE_USED_ITEM_FONT_CHANGE = SettingsFacade.WHERE_USED_ITEM_FONT+SettingsFacade.CHANGE;
SettingsFacade.WHERE_USED_ITEM_COLOR_SELECT = SettingsFacade.WHERE_USED_ITEM_COLOR+SettingsFacade.SELECT;
SettingsFacade.WHERE_USED_ITEM_COLOR_SELECT_CHANGE = SettingsFacade.WHERE_USED_ITEM_COLOR_SELECT+SettingsFacade.CHANGE;
SettingsFacade.WHERE_USED_ITEM_FONT_SELECT = SettingsFacade.WHERE_USED_ITEM_FONT+SettingsFacade.SELECT;
SettingsFacade.WHERE_USED_ITEM_FONT_SELECT_CHANGE = SettingsFacade.WHERE_USED_ITEM_FONT_SELECT+SettingsFacade.CHANGE;
SettingsFacade.WHERE_USED_ITEM_COLOR_SELECTED = SettingsFacade.WHERE_USED_ITEM_COLOR+SettingsFacade.SELECTED;
SettingsFacade.WHERE_USED_ITEM_COLOR_SELECTED_CHANGE = SettingsFacade.WHERE_USED_ITEM_COLOR_SELECTED+SettingsFacade.CHANGE;
SettingsFacade.WHERE_USED_ITEM_FONT_SELECTED = SettingsFacade.WHERE_USED_ITEM_FONT+SettingsFacade.SELECTED;
SettingsFacade.WHERE_USED_ITEM_FONT_SELECTED_CHANGE = SettingsFacade.WHERE_USED_ITEM_FONT_SELECTED+SettingsFacade.CHANGE;

SettingsFacade.ROOT_COLUMN = SettingsFacade.ROOT+SettingsFacade.COLUMN;
SettingsFacade.ROOT_COLUMN_HEADER = SettingsFacade.ROOT_COLUMN+SettingsFacade.HEADER;
SettingsFacade.ROOT_COLUMN_GROUP = SettingsFacade.ROOT_COLUMN+SettingsFacade.GROUP;
SettingsFacade.ROOT_COLUMN_TITLE = SettingsFacade.ROOT_COLUMN+SettingsFacade.TITLE;
SettingsFacade.ROOT_COLUMN_FOLD = SettingsFacade.ROOT_COLUMN+SettingsFacade.FOLD;
SettingsFacade.ROOT_COLUMN_FOLD_BUTTON = SettingsFacade.ROOT_COLUMN_FOLD+SettingsFacade.BUTTON;
SettingsFacade.ROOT_COLUMN_FOLD_CLICK = SettingsFacade.ROOT_COLUMN_FOLD+SettingsFacade.CLICK;
SettingsFacade.ROOT_ITEM = SettingsFacade.ROOT+SettingsFacade.ITEM;
SettingsFacade.ROOT_ITEM_LENGTH = SettingsFacade.ROOT_ITEM+SettingsFacade.LENGTH;
SettingsFacade.ROOT_ITEM_COLOR = SettingsFacade.ROOT_ITEM+SettingsFacade.COLOR;
SettingsFacade.ROOT_ITEM_COLOR_CHANGE = SettingsFacade.ROOT_ITEM_COLOR+SettingsFacade.CHANGE;
SettingsFacade.ROOT_ITEM_FONT = SettingsFacade.ROOT_ITEM+SettingsFacade.FONT;
SettingsFacade.ROOT_ITEM_FONT_CHANGE = SettingsFacade.ROOT_ITEM_FONT+SettingsFacade.CHANGE;
SettingsFacade.ROOT_ITEM_COLOR_SELECT = SettingsFacade.ROOT_ITEM_COLOR+SettingsFacade.SELECT;
SettingsFacade.ROOT_ITEM_COLOR_SELECT_CHANGE = SettingsFacade.ROOT_ITEM_COLOR_SELECT+SettingsFacade.CHANGE;
SettingsFacade.ROOT_ITEM_FONT_SELECT = SettingsFacade.ROOT_ITEM_FONT+SettingsFacade.SELECT;
SettingsFacade.ROOT_ITEM_FONT_SELECT_CHANGE = SettingsFacade.ROOT_ITEM_FONT_SELECT+SettingsFacade.CHANGE;
SettingsFacade.ROOT_ITEM_COLOR_SELECTED = SettingsFacade.ROOT_ITEM_COLOR+SettingsFacade.SELECTED;
SettingsFacade.ROOT_ITEM_COLOR_SELECTED_CHANGE = SettingsFacade.ROOT_ITEM_COLOR_SELECTED+SettingsFacade.CHANGE;
SettingsFacade.ROOT_ITEM_FONT_SELECTED = SettingsFacade.ROOT_ITEM_FONT+SettingsFacade.SELECTED;
SettingsFacade.ROOT_ITEM_FONT_SELECTED_CHANGE = SettingsFacade.ROOT_ITEM_FONT_SELECTED+SettingsFacade.CHANGE;

SettingsFacade.WHAT_USED_COLUMNS = SettingsFacade.WHAT_USED+SettingsFacade.COLUMNS;
SettingsFacade.WHAT_USED_COLUMNS_HEADER = SettingsFacade.WHAT_USED_COLUMNS+SettingsFacade.HEADER;
SettingsFacade.WHAT_USED_COLUMNS_GROUP = SettingsFacade.WHAT_USED_COLUMNS+SettingsFacade.GROUP;
SettingsFacade.WHAT_USED_COLUMNS_TITLE = SettingsFacade.WHAT_USED_COLUMNS+SettingsFacade.TITLE;
SettingsFacade.WHAT_USED_COLUMNS_FOLD = SettingsFacade.WHAT_USED_COLUMNS+SettingsFacade.FOLD;
SettingsFacade.WHAT_USED_COLUMNS_FOLD_BUTTON = SettingsFacade.WHAT_USED_COLUMNS_FOLD+SettingsFacade.BUTTON;
SettingsFacade.WHAT_USED_COLUMNS_FOLD_CLICK = SettingsFacade.WHAT_USED_COLUMNS_FOLD+SettingsFacade.CLICK;
SettingsFacade.WHAT_USED_COLUMNS_CHANGE = SettingsFacade.WHAT_USED_COLUMNS+SettingsFacade.CHANGE;
SettingsFacade.WHAT_USED_ITEM = SettingsFacade.WHAT_USED+SettingsFacade.ITEM;
SettingsFacade.WHAT_USED_ITEM_LENGTH = SettingsFacade.WHAT_USED_ITEM+SettingsFacade.LENGTH;
SettingsFacade.WHAT_USED_ITEM_COLOR = SettingsFacade.WHAT_USED_ITEM+SettingsFacade.COLOR;
SettingsFacade.WHAT_USED_ITEM_COLOR_CHANGE = SettingsFacade.WHAT_USED_ITEM_COLOR+SettingsFacade.CHANGE;
SettingsFacade.WHAT_USED_ITEM_FONT = SettingsFacade.WHAT_USED_ITEM+SettingsFacade.FONT;
SettingsFacade.WHAT_USED_ITEM_FONT_CHANGE = SettingsFacade.WHAT_USED_ITEM_FONT+SettingsFacade.CHANGE;
SettingsFacade.WHAT_USED_ITEM_COLOR_SELECT = SettingsFacade.WHAT_USED_ITEM_COLOR+SettingsFacade.SELECT;
SettingsFacade.WHAT_USED_ITEM_COLOR_SELECT_CHANGE = SettingsFacade.WHAT_USED_ITEM_COLOR_SELECT+SettingsFacade.CHANGE;
SettingsFacade.WHAT_USED_ITEM_FONT_SELECT = SettingsFacade.WHAT_USED_ITEM_FONT+SettingsFacade.SELECT;
SettingsFacade.WHAT_USED_ITEM_FONT_SELECT_CHANGE = SettingsFacade.WHAT_USED_ITEM_FONT_SELECT+SettingsFacade.CHANGE;
SettingsFacade.WHAT_USED_ITEM_COLOR_SELECTED = SettingsFacade.WHAT_USED_ITEM_COLOR+SettingsFacade.SELECTED;
SettingsFacade.WHAT_USED_ITEM_COLOR_SELECTED_CHANGE = SettingsFacade.WHAT_USED_ITEM_COLOR_SELECTED+SettingsFacade.CHANGE;
SettingsFacade.WHAT_USED_ITEM_FONT_SELECTED = SettingsFacade.WHAT_USED_ITEM_FONT+SettingsFacade.SELECTED;
SettingsFacade.WHAT_USED_ITEM_FONT_SELECTED_CHANGE = SettingsFacade.WHAT_USED_ITEM_FONT_SELECTED+SettingsFacade.CHANGE;

SettingsFacade.OBJECT_TYPES = SettingsFacade.OBJECT+SettingsFacade.TYPES;
SettingsFacade.OBJECT_TYPES_HEADER = SettingsFacade.OBJECT_TYPES+SettingsFacade.HEADER;
SettingsFacade.OBJECT_TYPES_GROUP = SettingsFacade.OBJECT_TYPES+SettingsFacade.GROUP;
SettingsFacade.OBJECT_TYPES_TITLE= SettingsFacade.OBJECT_TYPES+SettingsFacade.TITLE;
SettingsFacade.OBJECT_TYPES_FOLD = SettingsFacade.OBJECT_TYPES+SettingsFacade.FOLD;
SettingsFacade.OBJECT_TYPES_FOLD_BUTTON = SettingsFacade.OBJECT_TYPES_FOLD+SettingsFacade.BUTTON;
SettingsFacade.OBJECT_TYPES_FOLD_CLICK = SettingsFacade.OBJECT_TYPES_FOLD+SettingsFacade.CLICK;
SettingsFacade.OBJECT_TYPES_MAXIMUM = SettingsFacade.OBJECT_TYPES+SettingsFacade.MAXIMUM;
SettingsFacade.OBJECT_TYPES_MAXIMUM_CHANGE = SettingsFacade.OBJECT_TYPES_MAXIMUM+SettingsFacade.CHANGE;
SettingsFacade.OBJECT_TYPES_AVAILABLE = SettingsFacade.OBJECT_TYPES+SettingsFacade.AVAILABLE;
SettingsFacade.OBJECT_TYPES_SELECT_BUTTON = SettingsFacade.OBJECT_TYPES+SettingsFacade.SELECT_BUTTON;
SettingsFacade.OBJECT_TYPES_ADD = SettingsFacade.OBJECT_TYPES+SettingsFacade.ADD;
SettingsFacade.OBJECT_TYPES_ADD_BUTTON = SettingsFacade.OBJECT_TYPES_ADD+SettingsFacade.BUTTON;
SettingsFacade.OBJECT_TYPES_ADD_CLICK = SettingsFacade.OBJECT_TYPES_ADD+SettingsFacade.CLICK;
SettingsFacade.OBJECT_TYPES_REMOVE = SettingsFacade.OBJECT_TYPES+SettingsFacade.REMOVE;
SettingsFacade.OBJECT_TYPES_REMOVE_BUTTON = SettingsFacade.OBJECT_TYPES_REMOVE+SettingsFacade.BUTTON;
SettingsFacade.OBJECT_TYPES_REMOVE_CLICK = SettingsFacade.OBJECT_TYPES_REMOVE+SettingsFacade.CLICK;
SettingsFacade.OBJECT_TYPES_CHOSEN = SettingsFacade.OBJECT_TYPES+SettingsFacade.CHOSEN;

SettingsFacade.SETTING_ACTIVATE = SettingsFacade.SETTING+SettingsFacade.ACTIVATE;
SettingsFacade.SETTING_CANCEL = SettingsFacade.SETTING+SettingsFacade.CANCEL;
SettingsFacade.SETTING_CLONE = SettingsFacade.SETTING+SettingsFacade.CLONE;
SettingsFacade.SETTING_DELETE = SettingsFacade.SETTING+SettingsFacade.DELETE;
SettingsFacade.SETTING_DETAIL = SettingsFacade.SETTING+SettingsFacade.DETAIL;
SettingsFacade.SETTING_EDIT = SettingsFacade.SETTING+SettingsFacade.EDIT;
SettingsFacade.SETTING_LIST = SettingsFacade.SETTING+SettingsFacade.LIST;
SettingsFacade.SETTING_NEW = SettingsFacade.SETTING+SettingsFacade.NEW;
SettingsFacade.SETTING_SAVE = SettingsFacade.SETTING+SettingsFacade.SAVE;

SettingsFacade.getInstance = function() {
	if (Facade.instance === undefined)	{
		//The classFactory is used as a descriptor for the SettingsFacade
		//when hierarchical relationships are required as in this case.
		var classFactory = new Class(new SettingsFacade());
		Facade.instance = new classFactory();
	}
	return Facade.instance;
};

////////////////////////////////////////////////////////
//Controller ///////////////////////////////////////////
//Commands /////////////////////////////////////////////
////////////////////////////////////////////////////////
//Class: PrepModelCommand
var PrepModelCommand = function() {
  this.Extends = SimpleCommand;
	this.execute = function(note) {
		var app = note.getBody();
		//alert("PrepModelCommand - app: "+app.appName);
		this.facade.registerProxy(new SettingProxy());
		//PROXYTEST!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
	}
}
PrepModelCommand = new Class(new PrepModelCommand());

//Class: PrepViewCommand
var PrepViewCommand = function() {
  this.Extends = SimpleCommand;
	this.execute = function(note) {
		var app = note.getBody();
	  this.facade.registerMediator(new SettingDetailMediator(app.detail));
	  this.facade.registerMediator(new SettingListMediator(app.list));
		this.sendNotification(SettingsFacade.SETTING_LIST);
	}
}
PrepViewCommand = new Class(new PrepViewCommand());

//Class: StartupCommand
var StartupCommand = function() {
  this.Extends = MacroCommand;
	this.initializeMacroCommand = function(note) {		
	  //alert("StartupCommand");
	  this.addSubCommand(PrepModelCommand);
	  this.addSubCommand(PrepViewCommand);
	}
}
StartupCommand = new Class(new StartupCommand());

///////////////////////////
//COMMON (R&O) COMMANDS ***
///////////////////////////
//Abstract

//////////////////////////////////////////////////////////////////////////
///////////////////////////////// COMMON /////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////// PROXIES /////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//Abstract
//Class: CachedObjectVO
var CachedObjectVO = function() {
	this.id = null;

	this.initialize = function(id) {
		try {
			if (id !== null)
				this.id = id;
		} catch(error) {
			Utils.alert("CachedObjectVO/constructor Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		}
	}
}
CachedObjectVO = new Class(new CachedObjectVO());

//Abstract
//Class: CachingProxy
var CachingProxy = function() {
  this.Extends = Proxy;
	this.topOid = null;
	this.bottomOid = null;
	this.currentOid = null;

	this.initialize = function(name) {
		this.parent(name, new Array());
	}

	this.addItem = function(item) {
		this.getData().push(item);
	}

	this.getTopOid = function() {
	  if (this.topOid === undefined) {
	    this.topOid = null;
	  }
	  return this.topOid;
	}

  this.setTopOid = function(oid) {
    this.topOid = oid;
  }
  
	this.getBottomOid = function() {
	  if (this.bottomOid === undefined) {
	    this.bottomOid = null;
	  }
	  return this.bottomOid;
	}

  this.setBottomOid = function(oid) {
    this.bottomOid = oid;
  }
	
	this.getCurrentOid = function() {
	  if (this.currentOid === undefined) {
	    this.currentOid = null;
	  }
	  return this.currentOid;
	}
	
  this.setCurrentOid = function(oid) {
    this.currentOid = oid;
  }

  this.getById = function(id) {
  	//Utils.alert("CachingProxy/getById - id: "+id);
  	var result = null;
  	try {
  		if (id) {
  	    var items = this.getData();
  			//alert("CachingProxy/getById - items/length: "+items.length);
  	    if (items) {
  	      for (var i in items) {
  	        if (items[i]) {
  	          var item = items[i];
        		  if (item.id.substr(0,BusinessObject.ID_MIN_LENGTH) == id.substr(0,BusinessObject.ID_MIN_LENGTH)) {
  	            result = item;
  	            break;
  	          }
  	        }
  	      }
  			}
  		}
  	} catch(error) {
  		Utils.alert("CachingProxy/getById Error: "+error.message,Utils.LOG_LEVEL_ERROR);
  	} finally {
    	//alert("CachingProxy/getById - id: "+id+" result: "+result);
  		return result;
  	}
  }

  this.getByName = function(name) {
  	Utils.alert("CachingProxy/getByName - name: "+name);
  	var result = null;
  	try {
  		if (name) {
  	    var items = this.getData();
  		//alert("CachingProxy/getById - items/length: "+items.length+" name: "+name);
  	    if (items) {
  	      for (var i in items) {
  	        if (items[i]) {
  	          var item = items[i];
  	          if (item.name == name) {
  	            result = item;
  	            break;
  	          }
  	        }
  	      }
  			}
  		}
  	} catch(error) {
  		Utils.alert("CachingProxy/getByName Error: "+error.message,Utils.LOG_LEVEL_ERROR);
  	} finally {
  		return result;
  	}
  }

  //Abstract
  this.getListObject = function(vo) { return null; }	
  this.filterObject = function(object) { return null; }

	this.firstPage = function(pageSize) {
		//alert("CachingProxy/firstPage - pageSize: "+pageSize);
    var page = [];
	  var listObject = null;
	  try {
	    //var objects = this.getData(ListCache.WEBSERVICE_METHOD_FIRST);
	    var objects = this.getData();
			//alert("CachingProxy/firstPage - objects/length: "+objects.length);
	    if (objects) {
	      for (var i in objects) {
	        if (objects[i]) {
	          var object = objects[i];
	          listObject = this.getListObject(object);
						if (this.filterObject(listObject)) {
	            page.push(listObject);
	            if (page.length == 1) { this.setTopOid(listObject.getId()); }
	            this.setBottomOid(listObject.getId());
	            if (pageSize) { if (page.length > pageSize) break; }
	          }
	        }
	      }
	    }
	  } catch(error) {
			Utils.alert("CachingProxy/firstPage Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	  } finally {
			return page;
	  }
	}	

	this.previousPage = function(pageSize) {
		//alert("CachingProxy/previousPage - pageSize: "+pageSize);
    var page = [];
	  var listObject = null;
	  try {
	    //var objects = this.getData(ListCache.WEBSERVICE_METHOD_PREVIOUS);
	    var objects = this.getData();
			//alert("CachingProxy/previousPage - objects: "+objects.length);
	    if (objects) {
	      for (var i in objects) {
	        if (objects[i]) {
	          var object = objects[i];
	          listObject = this.getListObject(object);
						if (this.filterObject(listObject)) {
	            page.unshift(listObject);
	            this.setTopOid(listObject.getId());
	            if (page.length == 1) { this.setBottomOid(listObject.getId()); }
	            if (pageSize) { if (page.length > pageSize) break; }
	          }
	        }
	      }
	    }
	  } catch(error) {
			Utils.alert("CachingProxy/previousPage Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	  } finally {
			return page;
	  }
	}

	this.previousLine = function(pageSize) {
		//alert("CachingProxy/previousLine - pageSize: "+pageSize);
    var page = [];
	  var listObject = null;
		try {
	    var objects = this.getData();
			//alert("CachingProxy/previousLine - objects/length: "+objects.length);
			if (objects) {
	      for (var i in objects) {
	        if (objects[i]) {
	          var object = objects[i];
	          listObject = this.getListObject(object);
						if (this.filterObject(listObject)) {
	            page.unshift(listObject);
	            this.setTopOid(listObject.getId());
	            if (page.length == 1) { this.setBottomOid(listObject.getId()); }
	            if (pageSize) { if (page.length > pageSize) break; }
	          }
	        }
	      }
			}
		} catch(error) {
			Utils.alert("CachingProxy/previousLine Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return page;
		}
	}

	this.nextLine = function(pageSize) {
		Utils.alert("CachingProxy/nextLine - pageSize: "+pageSize);
    var page = [];
	  var listObject = null;
		try {
	    var objects = this.getData();
			//alert("CachingProxy/nextLine - objects/length: "+objects.length);
			if (objects) {
	      for (var i in objects) {
	        if (objects[i]) {
	          var object = objects[i];
	          listObject = this.getListObject(object);
						if (this.filterObject(listObject)) {
	            page.push(listObject);
	            if (page.length == 1) { this.setTopOid(listObject.getId()); }
	            this.setBottomOid(listObject.getId());
	            if (pageSize) { if (page.length > pageSize) break; }
	          }
	        }
	      }
			}
		} catch(error) {
			Utils.alert("CachingProxy/nextLine Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return page;
		}
	}

	this.nextPage = function(pageSize) {
		//alert("CachingProxy/nextPage - pageSize: "+pageSize);
    var page = [];
	  var listObject = null;
	  try {
	    //var objects = this.getData(ListCache.WEBSERVICE_METHOD_NEXT);
	    var objects = this.getData();
			//alert("CachingProxy/nextPage - objects: "+objects.length);
	    if (objects) {
	      for (var i in objects) {
	        if (objects[i]) {
	          var object = objects[i];
	          listObject = this.getListObject(object);
						if (this.filterObject(listObject)) {
	            page.push(listObject);
	            if (page.length == 1) { this.setTopOid(listObject.getId()); }
	            this.setBottomOid(listObject.getId());
	            if (pageSize) { if (page.length > pageSize) break; }
	          }
	        }
	      }
	    }
	  } catch(error) {
			Utils.alert("CachingProxy/nextPage Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	  } finally {
			return page;
	  }
	}

	this.lastPage = function(pageSize) {
		//alert("CachingProxy/lastPage - pageSize: "+pageSize);
    var page = [];
	  var listObject = null;
	  try {
	    //var objects = this.getData(ListCache.WEBSERVICE_METHOD_LAST);
	    var objects = this.getData();
			//alert("CachingProxy/lastPage - objects: "+objects.length);
	    if (objects) {
	      for (var i in objects) {
	        if (objects[i]) {
	          var object = objects[i];
	          listObject = this.getListObject(object);
						if (this.filterObject(listObject)) {
	            page.unshift(listObject);
	            this.setTopOid(listObject.getId());
	            if (page.length == 1) { this.setBottomOid(listObject.getId()); }
	            if (pageSize) { if (page.length > pageSize) break; }
	          }
	        }
	      }
	    }
	  } catch(error) {
			Utils.alert("CachingProxy/lastPage Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	  } finally {
			return page;
	  }
	}
}
CachingProxy = new Class(new CachingProxy());

//Abstract
//Class: EntityVO
var EntityVO = function() {
  this.Extends = CachedObjectVO;

	this.name = "";
	this.desc = "";
	this.oid = null;
	this.firstAttributes = [];
	this.references = [];

	this.initialize = function(id,name,desc,oid,firstAttributes,references) {
		try {
			this.parent(id);
			if (name !== null)
				this.name = name;
			if (desc !== null)
				this.desc = desc;
			if (oid !== null)
				this.oid = oid;
			if (firstAttributes !== null)
				this.firstAttributes = firstAttributes;
			if (references !== null)
				this.references = references;
		} catch(error) {
			Utils.alert("EntityVO/constructor Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		}
	}
}
EntityVO = new Class(new EntityVO());

//Abstract
//Class: EntityProxy
var EntityProxy = function() {
  this.Extends = CachingProxy;

	this.initialize = function(name) {
		this.parent(name);
	}

  this.filterObject = function(object) {
    var result = object;
    var filterValue = this.getHeaderMediator().getEntityFilterValue();
    if (filterValue) {
      var re_modifiers = SettingsFacade.ENTITY_FILTER_MODIFIERS;
      if (this.getHeaderMediator().getEntityFilterCase() === true) {
        re_modifiers = SettingsFacade.ENTITY_FILTER_MODIFIERS_CASE;
      }
      var regexp = new RegExp(filterValue,re_modifiers);
      if ((object.getName().match(regexp) === null) &&
          (object.getDesc().match(regexp) === null)) {
        result = null;
      }
    }
    if (result) {
      var modelTypeId = null;
      var modelType = this.getHeaderMediator().getTypeSelected();
      if (modelType) { modelTypeId = modelType.getId();	}
    	if (modelTypeId) {
        var typeId = null;
    	  if (object instanceof DataEntity) {
      	  typeId = object.getModelEntity().getTid();
    	  }
    	  if (object instanceof ModelEntity) {
      	  typeId = object.getTid();
    	  }
    	  if ((typeId === null) || (typeId != modelTypeId)) {
    	    result = null;
    	  }
    	}
    }
    return result;
  }
}
EntityProxy = new Class(new EntityProxy());

//Class: SettingVO
var SettingVO = function() {
  this.Extends = CachedObjectVO;

	this.name = "";
	this.desc = "";

	this.initialize = function(id,name,desc) {
		try {
			this.parent(id);
			if (name !== null)
				this.name = name;
			if (desc !== null)
				this.desc = desc;
		} catch(error) {
			Utils.alert("SettingVO/constructor Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		}
	}
}
SettingVO = new Class(new SettingVO());

//Class: SettingProxy
var SettingProxy = function() {
  this.Extends = CachingProxy;

	this.initialize = function() {
		this.parent(SettingProxy.ID);
		this.addItem(new SettingVO("1","Setting1", "Setting1 Description"));
		this.addItem(new SettingVO("2","Setting2", "Setting2 Description"));
	}
/*
	this.getAll = function(sort) {
		Utils.alert('SettingCache/getAll - sort: '+sort);
		var _sort = ((sort !== undefined) && (sort !== null))?sort:Cache.SORT_ASCENDING;
	  var result = [];
	  try {
	    var cache = this.getCache();
	    if (cache) {
	      for (var i = 0; i < cache.length; i++) {
	        result.push(cache[i]);
	      }
	      //Sort DESCENDING
	    //Utils.alert("SettingCache/getAll - A/D: "+descending+" before: "+result);  
				if (_sort == Cache.SORT_DESCENDING) {
					result.reverse();
				}
	    }
	  //Utils.alert("SettingCache/getAll - A/D: "+descending+" after: "+result);
	  } catch(error) {
			Utils.alert("SettingCache/getAll Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	  } finally {
	    return result;
	  }
	}
*/
}
SettingProxy = new Class(new SettingProxy());
SettingProxy.ID = "SettingProxy";

//////////////////////////////////////////////////////////////////////////
///////////////////////////// BUSINESS CLASSES ///////////////////////////
//////////////////////////////////////////////////////////////////////////
//Abstract
//Class: BusinessObject
var BusinessObject = function() {

	this.initialize = function(vo) {
		try {
			this.setId(vo.id);
		} catch(error) {
			Utils.alert("BusinessObject/constructor Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		}
	}
	//Getters & Setters
  this.getId = function() {
  	var result = null;
  	if ((this.id !== undefined) && (this.id !== null)) {
  		result = this.id.substr(0,BusinessObject.ID_MIN_LENGTH);
  	}
  	return result;
  }
  this.setId = function(id) {
  	if ((id !== undefined) && (id !== null)) {
  		if (id != 'null') {
  			this.id = id;
  		}
  	}
  }
	this.getSid = function() {
		return this.sid;
	}
	this.setSid = function(sid) {
		if (sid) {
			this.sid = sid;
			if (sid > BusinessObject.HIGHEST_SID) {
				BusinessObject.HIGHEST_SID = sid;
			}
		}
	}
	this.getCby = function() {
		//return this.cby;
		return "Bill Gates";
	}
	this.setCby = function(cby) {
		if (cby !== null) {
			this.cby = cby;
		}
	}
	this.getMby = function() {
		//return this.mby;
		return "Steve Jobs";
	}
	this.setMby = function(mby) {
		if (mby !== null) {
			this.mby = mby;
		}
	}
	
	//Functions
	//Abstract
	this.clone = function() {
		Utils.alert("BusinessObject/clone - abstract.");
		return undefined;
	}
	this.print = function(html,keysOnly) {
		var _html = ((html !== undefined) && (html !== null))?html:false;
		var _keysOnly = ((keysOnly !== undefined) && (keysOnly !== null))?keysOnly:false;
		var _nl = (_html)?'<br/>':'\n';
		var result = 'BusinessObject:'+_nl;
		try {
			var i = 0;
	  	var properties = Utils.eval(this,false); //true);
		  if (properties) {
        for (var key in properties) {
          i++;
   				result += (i + ' ' + key);
   				if (!_keysOnly) {
   				  result += (': ' + properties[key]);
   				}
   				result += _nl;
				}
			}
		} catch(error) {
			Utils.alert("BusinessObject/print Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	}
}
BusinessObject = new Class(new BusinessObject());
//Statics
BusinessObject.COUNT = 0;
BusinessObject.HIGHEST_SID = 0;
BusinessObject.ID_MIN_LENGTH = 15;
BusinessObject.RELATIONS_UNDEFINED = "*0*";
BusinessObject.initializeRestore = function() {
	BusinessObject.HIGHEST_SID = 0;
}
BusinessObject.finalizeRestore = function() {
	BusinessObject.COUNT = BusinessObject.HIGHEST_SID;
}
BusinessObject.test = function() {
	return "BusinessObject/test";
}

//Abstract
//Class: EntityB
var EntityB = function() {
	this.Extends = BusinessObject;
	
	this.initialize = function(vo) {
		try {
			this.parent(vo);
  		this.setName(vo.name);
  		this.setDesc(vo.desc);
			this.setOid(vo.oid);
			//this.setSfdcObject(null);
			//this.setAttributeValues(null);
			this.setExpanded(false);
			this.setReferences(vo.references);
		} catch(error) {
			Utils.alert("EntityB/constructor Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		}
	}
	this.getName = function() {
		return this.name;
	}
	this.getNameTranslated = function() {
		var result = this.getName();
		if (result) {
			result = Utils.translate(result,"es");
		}
		return result;
	}
	this.setName = function(name) {
		if (name !== null) {
			this.name = name;
		}
	}
	this.getName50 = function() {
	  var result = this.getName().substr(0,50);
	  //var i = result.length;
	  //while (i++ < 50) { result += "&nbsp;"; }
	  return result;
	}
	this.getDesc = function() {
		var result = null;
		if (this.desc !== undefined) {
			result = this.desc;
		}
		return result;
	}
	this.getDescTranslated = function() {
		var result = this.getDesc();
		if (result) {
			result = Utils.translate(result,"es");
		}
		return result;
	}
	this.setDesc = function(desc) {
		if (desc !== null) {
			this.desc = desc;
		}
	}
	this.getOid = function() {
		var result = null;
		if ((this.oid !== undefined) && (this.oid !== null)) {
			result = this.oid.substr(0,BusinessObject.ID_MIN_LENGTH);
		}
		return result;
	}
	this.setOid = function(oid) {
		if (oid !== null) {
			if ((oid !== undefined) && (oid != 'null')) {
				this.oid = oid;
			}
		}
	}
	this.getReferences = function() {
		var result = BusinessObject.RELATIONS_UNDEFINED;
		if ((this.references !== undefined) && (this.references !== null)) {
			result = this.references;
		}
		return result;
	}
	this.setReferences = function(references) {
		if (references !== null) {
			this.references = references;
		}
	}
	this.getFirstAttributes = function() {
		return [];
	}	
	this.setExpanded = function(expanded) {
		if (expanded !== null) {
			this.expanded = expanded;
			this.attributeList = null;
		}
	}
	this.isEditable = function() {
		Utils.alert("EntityB/isEditable - this: "+this);
		var result = false;
		try {
			var t1 = Type.getById(this.getTid());
			if (t1) {
				if ((t1.getType().toUpperCase() == 'LEAD') ||
						(t1.getType().toUpperCase() == 'USER') ||
						(t1.getType().toUpperCase() == 'MAP') ||
						((t1 !== null) && (t1.isSjamayee() === true))) {
					result = true;
				}
			}
		} catch(error) {
			Utils.alert("EntityB/isEditable Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return true; //result;  // !!! FOR TEST !!!
		}
	}
	this.isScrollable = function() {
		Utils.alert("EntityB/isScrollable");
		var result = false;
		//var typeObject = Type.getById(this.getTid());
		var typeObject = this.getTypeObject();
		if (typeObject) {
			result = (typeObject.isSjamayee() === true)?true:this.isExpanded();
		}
		return result;
	}
	this.isSjamayee = function() {
		var result = null;
		try {
			var typeObject = this.getTypeObject();
			if (typeObject) {
				result = typeObject.isSjamayee();
			}
		} catch (error) {
			Utils.alert("EntityB/isSjamayee Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	}
}
EntityB = new Class(new EntityB());
//Statics
//States
EntityB.STATE_PARENT = "PARENT";
EntityB.STATE_CHILD = "CHILD";
EntityB.STATE_OBJECT = "OBJECT";
//Parent
EntityB.PARENT_NAME_ID = "parentName";
EntityB.PARENT_NAME_ANCHOR_ID = "parentNameAnchor";
EntityB.PARENT_NAME_TEXTAREA_ID = "parentNameTextArea";
EntityB.PARENT_NAME_TEXTAREA_CLASS_ID = "parentNameTextArea";
EntityB.PARENT_TYPE_ID = "parentType";
EntityB.PARENT_TYPE_ANCHOR_ID = "parentTypeAnchor";
EntityB.PARENT_DESC_ID = "parentDesc";
//EntityB.PARENT_DESC_ANCHOR_ID = "parentDescAnchor";
EntityB.PARENT_DESC_DISPLAY_ID = "parentDescDisplay";
EntityB.PARENT_DESC_TEXTAREA_ID = "parentDescTextArea";
EntityB.PARENT_DESC_TEXTAREA_CLASS_ID = "parentDescTextArea";
EntityB.PARENT_CBY_ID = "parentCby";
EntityB.PARENT_CBY_ANCHOR_ID = "parentCbyAnchor";
EntityB.PARENT_MBY_ID = "parentMby";
EntityB.PARENT_MBY_ANCHOR_ID = "parentMbyAnchor";
//Child
EntityB.CHILD_NAME_ID = "childName";
EntityB.CHILD_NAME_ANCHOR_ID = "childNameAnchor";
EntityB.CHILD_NAME_TEXTAREA_ID = "childNameTextArea";
EntityB.CHILD_NAME_TEXTAREA_CLASS_ID = "childNameTextArea";
EntityB.CHILD_TYPE_ID = "childType";
EntityB.CHILD_TYPE_ANCHOR_ID = "childTypeAnchor";
EntityB.CHILD_TYPE_SELECTION_ID = "CHILD_TYPE_SELECTION_ID";
EntityB.CHILD_DESC_ID = "childDesc";
EntityB.CHILD_DESC_ANCHOR_ID = "childDescAnchor";
EntityB.CHILD_DESC_EDIT_ID = "childDescEdit";
EntityB.CHILD_DESC_DISPLAY_ID = "childDescDisplay";
EntityB.CHILD_DESC_TEXTAREA_ID = "childDescTextArea";
EntityB.CHILD_DESC_TEXTAREA_CLASS_ID = "childDescTextArea";             //TODO: parent - name, desc classes ???
EntityB.CHILD_CBY_ID = "childCby";
EntityB.CHILD_CBY_ANCHOR_ID = "childCbyAnchor";
EntityB.CHILD_MBY_ID = "childMby";
EntityB.CHILD_MBY_ANCHOR_ID = "childMbyAnchor";
//Object
EntityB.OBJECT_NAME_ID = "objectName";
EntityB.OBJECT_NAME_ANCHOR_ID = "objectNameAnchor";
EntityB.OBJECT_NAME_TEXTAREA_ID = "objectNameTextArea";
EntityB.OBJECT_NAME_TEXTAREA_CLASS_ID = "objectNameTextArea";
EntityB.OBJECT_TYPE_ID = "objectType";
EntityB.OBJECT_TYPE_ANCHOR_ID = "objectTypeAnchor";
EntityB.OBJECT_TYPE_SELECTION_ID = "OBJECT_TYPE_SELECTION_ID";
EntityB.OBJECT_DESC_ID = "objectDesc";
EntityB.OBJECT_DESC_ANCHOR_ID = "objectDescAnchor";
EntityB.OBJECT_DESC_EDIT_ID = "objectDescEdit";
EntityB.OBJECT_DESC_DISPLAY_ID = "objectDescDisplay";
EntityB.OBJECT_DESC_TEXTAREA_ID = "objectDescTextArea";
EntityB.OBJECT_DESC_TEXTAREA_CLASS_ID = "objectDescTextArea";
EntityB.OBJECT_CBY_ID = "objectCby";
EntityB.OBJECT_CBY_ANCHOR_ID = "objectCbyAnchor";
EntityB.OBJECT_MBY_ID = "objectMby";
EntityB.OBJECT_MBY_ANCHOR_ID = "objectMbyAnchor";

EntityB.SFDC_OID = "page:sja_form:soid";
EntityB.SFDC_OID_PARENT = "page:sja_form:sfdcOidParent";
EntityB.SFDC_OID_CHILD = "page:sja_form:sfdcOidChild";
EntityB.SFDC_OID_OBJECT = "page:sja_form:sfdcOidObject";

EntityB.FILTER_ID = "entityFilter";
EntityB.SELECT_ID = "selectionEntityPanel";
EntityB.SELECTION_ID = "ENTITY_SELECTION_ID";

//Class: Setting
var Setting = function() {
	this.Extends = BusinessObject; //CachedObject;
	
	//this.initialize = function(id,name,desc) {
	this.initialize = function(vo) {
		try {
			this.parent(vo);
			this.setName(vo.name);
			this.setDesc(vo.desc);
		} catch(error) {
			Utils.alert("Setting/constructor Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		}
	}
	//Getters & Setters
	this.getSettingVO = function() {
    return new SettingVO(this.getId(),this.getName(),this.getDesc());
	}

	this.getName = function() {
		var result = null;
		if (this.name !== undefined) {
			result = this.name;
		}
		return result;
	}
	this.getNameTranslated = function() {
		var result = this.getName();
		if (result) {
			result = Utils.translate(result,"es");
		}
		return result;
	}
	this.setName = function(name) {
		if (name !== null) {
			this.name = name;
		}
	}
	this.getDesc = function() {
		var result = null;
		if (this.desc !== undefined) {
			result = this.desc;
		}
		return result;
	}
	this.getDescTranslated = function() {
		var result = this.getDesc();
		if (result) {
			result = Utils.translate(result,"es");
		}
		return result;
	}
	this.setDesc = function(desc) {
		if (desc !== null) {
			this.desc = desc;
		}
	}
	//Functions
	/* ADD FUNCTIONS HERE !!!
	this.getFirstParentRelation = function() {
	return Relation.getFirstParentForSetting(this);
	}
	this.getParentRelations = function(number,sort) {
	var result = [];
	try {
	//Utils.alert("Relation/getParentRelations");
	result = Relation.getParentRelationsForSetting(this,number,sort);
	} catch(error) {
	alert("Setting/getParentRelations Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	} finally {
	return result;
	}
	}
	*/
	this.storeJson = function() {
		var result = '';
		try {
			result = '{';
			result += '"sid":"'+this.getSid()+'"';
			result += ',"id":"'+this.getId()+'"';
			result += ',"name":"'+this.getName()+'"';
			result += ',"desc":"'+this.getDesc()+'"';
			result += '}';
			//SjamayeeForm.putBySid(this);
		} catch(error) {
			Utils.alert("Setting/storeJson Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	}
	this.print = function(html,keysOnly) {
		var _html = ((html !== undefined) && (html !== null))?html:false;
		var _keysOnly = ((keysOnly !== undefined) && (keysOnly !== null))?keysOnly:false;
		var _nl = (_html)?'<br/>':'\n';
		var result = 'Setting:'+_nl;
		try {
			result += this.parent();
		} catch(error) {
			Utils.alert("Setting/print Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	}
}
Setting = new Class(new Setting());
//Statics
Setting.ACTIVE_ID = "settingActive";
Setting.getById = function(id) {
	var _id = (id !== undefined)?id:null;
	//alert("Setting/getById - id: "+_id);
	var result = null;
	try {
	  if (_id) {
    	var settingProxy = SettingsFacade.getInstance().retrieveProxy(SettingProxy.ID);
    	result = new Setting(settingProxy.getById(_id));
    }
	} catch(error) {
		Utils.alert("Setting/getById Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	} finally {
  	//alert("Setting/getById - result: "+result.print());
		return result;
	}
}
Setting.getByName = function(name) {
	var _name = (name !== undefined)?name:null;
	Utils.alert("Setting/getByName - name: "+_name);
	var result = null;
	try {
	  if (_name) {
    	var settingProxy = SettingsFacade.getInstance().retrieveProxy(SettingProxy.ID);
    	result = new Setting(settingProxy.getByName(_name));
    }
	} catch(error) {
		Utils.alert("Setting/getByName Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	} finally {
		return result;
	}
}
Setting.getSettingOptions = function(settingName) {
	var _settingName = ((settingName !== undefined) && (settingName !== null))?settingName:'';		
	Utils.alert("Setting/getSettingOptions - settingName: "+_settingName);
	var result = '';	  
	var settingProxy = SettingsFacade.getInstance().retrieveProxy(SettingProxy.ID);
	var settings = settingProxy.getData();
	var settingSelected = _settingName;
	for (var i = 0; i < settings.length; i++) {
		var setting = settings[i];
		if (setting) {
			//if (setting.inUse === false) { continue; }
			var optionTag = '<option';
	  	optionTag += (settingSelected == setting.name)?' selected="selected"':'';
			optionTag += '>';
			result += optionTag+setting.name+'</option>';
		}
	}
	return result;
}

//////////////////////////////////////////////////////////////////////////
///////////////////////////// UICOMPONENTS ///////////////////////////////
//////////////////////////////////////////////////////////////////////////
//Class: UIComponent
var UIComponent = function() {
  this.initialized = false;
  this.element = null;
	
  this.initialize = function(element, properties) {
	//alert("UIComponent/initialize - element: "+element);
		this.element = $(element);
	//this.element = document.id(element);
	//this.element = document.getElementById(element);

	//alert("Element - element: "+this.element+" "+this.element.toString());
		if (!this.element)
			this.element = new Element(element, properties);
		else
			this.element.setProperties(properties);

		//Copy methods of the Element object to 'this' and bind the functions to the element itself.
		//This creates a transparent wrapper in the UIComponent for each method of the Element.
		var e = this.element;
		for (var key in e) {
			var type = null;
			try	{
				//IE 7+ has a problem with this sometimes.
				type = typeof e[key];
			}	catch(e){ } //alert("UIComponent/initialize - IE7 - e: "+e.message); }   	//TODO: SILENT CATCH !!!
			if (type == "function" && !this[key]) {
				try	{
					//Safari has trouble here with some function binding
					this[key] = e[key].bind(e);
				}
				catch(e){ } //alert("UIComponent/initialize - Safari - e: "+e.message); }	//TODO: SILENT CATCH !!!
			}
		}
  };

  this.initializeChildren = function(){};
  this.childrenInitialized = function(){};
  this.initializationComplete = function() {
	//alert("UIComponent/initializationComplete - element: "+this.element.id);
	  this.initialized = true;
  };

  this.addChild = function(child) {
	//alert("UICompoment/addChild - child: "+child);
		this.grab(child.element);
		//Initialize child
  	child.initializeChildren();
  	child.childrenInitialized();
  	child.initializationComplete();
  	//Fire an added event
  	child.fireEvent("added");
  	return this;
  };
};
UIComponent = new Class(new UIComponent());

//**********************************************************************//
//************************ Settings (Main View) ************************//
//**********************************************************************//
//Class: Settings
var Settings = function() {
  this.Extends = UIComponent;
  //Reference to the SettingsFacade for calling 'startup'
  this.facade = null;
  this.list = null;
  this.detail = null;

  this.initialize = function(name, properties) {
		var html = '<div id="'+SettingList.ID+'"></div>'+
		           '<div id="'+SettingDetail.ID+'"></div>';
		this.facade = SettingsFacade.getInstance();
		this.parent(Settings.ID,{html:html});
  }

  this.initializeChildren = function() {
	  this.list = new SettingList();
	  this.addChild(this.list);
	  this.detail = new SettingDetail();
	  this.addChild(this.detail);
  }

  this.initializationComplete = function() {
		this.facade.startup(this);
  }
}
Settings = new Class(new Settings());
Settings.ID = "settingsForm";

//Abstract
//Class: SjamayeeUIComponent
var SjamayeeUIComponent = function() {
  this.Extends = UIComponent;
  this.uicName = null;
	
	this.initialize = function(name,properties) {
    this.setUicName(name);
		this.parent(name,properties);
	}

	this.getUicName = function() {
		return this.uicName;
	}
	
	this.setUicName = function(name) {
	  this.uicName = name;
	}	
}
SjamayeeUIComponent = new Class(new SjamayeeUIComponent());

//Class: SettingDetail
var SettingDetail = function() {
  this.Extends = SjamayeeUIComponent;

	this.display = null;
	this.edit = null;
	this.headerButtons = null;
	this.headerEditButton = null;
	this.headerDeleteButton = null;
	this.headerCloneButton = null;
	this.headerActivateButton = null;
	this.headerEditButtons = null;
	this.headerSaveButton = null;
	this.headerCancelButton = null;  
	this.name = null;
	this.defaultSetting = null;
	this.applicationType = null;
	this.columnsMinimum = null;
	this.columnsMaximum = null;
	this.rows = null;
	this.numberOfTrailingChars = null;
	this.cby = null
	this.mby = null;
  this.whereUsedColumnsFoldButton = null;
  this.whereUsedColumnsGroup = null;
  this.whereUsedColumns = null;
  this.whereUsedItemLength = null;  
  this.whereUsedItemColor = null;
  this.whereUsedItemFont = null;
  this.whereUsedItemColorSelect = null;
  this.whereUsedItemFontSelect = null;
  this.whereUsedItemColorSelected = null;
  this.whereUsedItemFontSelected = null;
  this.rootColumnFoldButton = null;
  this.rootColumnGroup = null;
  this.rootColumn = null;
  this.rootColumnItemLength = null;
  this.rootItemColor = null;
  this.rootItemFont = null;
  this.rootItemColorSelect = null;
  this.rootItemFontSelect = null;
  this.rootItemColorSelected = null;
  this.rootItemFontSelected = null;
  this.whatUsedColumnsFoldButton = null;
  this.whatUsedColumnsGroup = null;
  this.whatUsedColumns = null;
  this.whatUsedColumnsItemLength = null;
  this.whatUsedItemColorWhatUsed = null;
  this.whatUsedItemFontWhatUsed = null;
  this.whatUsedItemColorSelect = null;
  this.whatUsedItemFontSelect = null;
  this.whatUsedItemColorSelected = null;
  this.whatUsedItemFontSelected = null;
  this.objectTypesFoldButton = null;
  this.objectTypesGroup = null;
  this.objectTypesMaximum = null;
  this.objectTypesAvailable = null;
  this.objectTypesAddButton = null;
  this.objectTypesRemoveButton = null;
  this.objectTypesChosen = null;
	this.footerButtons = null;
	this.footerEditButton = null;
	this.footerDeleteButton = null;
	this.footerCloneButton = null;
	this.footerActivateButton = null;
	this.footerEditButtons = null;
	this.footerSaveButton = null;
	this.footerCancelButton = null;  

	this.initialize = function() {
	  var html = this.buildEditHtml()+this.buildDisplayHtml();
		this.parent(SettingDetail.ID,{html: html});
 		this.editButton_clickHandler = this.editButton_clickHandler.bindWithEvent(this);
 		this.deleteButton_clickHandler = this.deleteButton_clickHandler.bindWithEvent(this);
 		this.cloneButton_clickHandler = this.cloneButton_clickHandler.bindWithEvent(this);
 		this.activateButton_clickHandler = this.activateButton_clickHandler.bindWithEvent(this);
 		this.saveButton_clickHandler = this.saveButton_clickHandler.bindWithEvent(this);
 		this.cancelButton_clickHandler = this.cancelButton_clickHandler.bindWithEvent(this);
 		this.name_changeHandler = this.name_changeHandler.bindWithEvent(this);
 		this.default_changeHandler = this.default_changeHandler.bindWithEvent(this);
 		this.applicationType_changeHandler = this.applicationType_changeHandler.bindWithEvent(this);
 		this.columnsMinimum_changeHandler = this.columnsMinimum_changeHandler.bindWithEvent(this);
 		this.columnsMaximum_changeHandler = this.columnsMaximum_changeHandler.bindWithEvent(this);
 		this.rows_changeHandler = this.rows_changeHandler.bindWithEvent(this);
 		this.numberOfTrailingChars_changeHandler = this.numberOfTrailingChars_changeHandler.bindWithEvent(this);
 		this.whereUsedColumnsFoldButton_clickHandler = this.whereUsedColumnsFoldButton_clickHandler.bindWithEvent(this);
 		this.whereUsedColumns_changeHandler = this.whereUsedColumns_changeHandler.bindWithEvent(this);
 		this.whereUsedItemColor_changeHandler = this.whereUsedItemColor_changeHandler.bindWithEvent(this);
 		this.whereUsedItemFont_changeHandler = this.whereUsedItemFont_changeHandler.bindWithEvent(this);
 		this.whereUsedItemColorSelect_changeHandler = this.whereUsedItemColorSelect_changeHandler.bindWithEvent(this);
 		this.whereUsedItemFontSelect_changeHandler = this.whereUsedItemFontSelect_changeHandler.bindWithEvent(this);
 		this.whereUsedItemColorSelected_changeHandler = this.whereUsedItemColorSelected_changeHandler.bindWithEvent(this);
 		this.whereUsedItemFontSelected_changeHandler = this.whereUsedItemFontSelected_changeHandler.bindWithEvent(this);    
 		this.rootColumnFoldButton_clickHandler = this.rootColumnFoldButton_clickHandler.bindWithEvent(this);
 		this.rootItemColor_changeHandler = this.rootItemColor_changeHandler.bindWithEvent(this);
 		this.rootItemFont_changeHandler = this.rootItemFont_changeHandler.bindWithEvent(this);
 		this.rootItemColorSelect_changeHandler = this.rootItemColorSelect_changeHandler.bindWithEvent(this);
 		this.rootItemFontSelect_changeHandler = this.rootItemFontSelect_changeHandler.bindWithEvent(this);
 		this.rootItemColorSelected_changeHandler = this.rootItemColorSelected_changeHandler.bindWithEvent(this);
 		this.rootItemFontSelected_changeHandler = this.rootItemFontSelected_changeHandler.bindWithEvent(this);
 		this.whatUsedColumnsFoldButton_clickHandler = this.whatUsedColumnsFoldButton_clickHandler.bindWithEvent(this);
 		this.whatUsedColumns_changeHandler = this.whatUsedColumns_changeHandler.bindWithEvent(this);
 		this.whatUsedItemColor_changeHandler = this.whatUsedItemColor_changeHandler.bindWithEvent(this);
 		this.whatUsedItemFont_changeHandler = this.whatUsedItemFont_changeHandler.bindWithEvent(this);
 		this.whatUsedItemColorSelect_changeHandler = this.whatUsedItemColorSelect_changeHandler.bindWithEvent(this);
 		this.whatUsedItemFontSelect_changeHandler = this.whatUsedItemFontSelect_changeHandler.bindWithEvent(this);
 		this.whatUsedItemColorSelected_changeHandler = this.whatUsedItemColorSelected_changeHandler.bindWithEvent(this);
 		this.whatUsedItemFontSelected_changeHandler = this.whatUsedItemFontSelected_changeHandler.bindWithEvent(this);    
 		this.objectTypesFoldButton_clickHandler = this.objectTypesFoldButton_clickHandler.bindWithEvent(this);
 		this.objectTypesMaximum_changeHandler = this.objectTypesMaximum_changeHandler.bindWithEvent(this);
 		this.objectTypesAddButton_clickHandler = this.objectTypesAddButton_clickHandler.bindWithEvent(this);
 		this.objectTypesRemoveButton_clickHandler = this.objectTypesRemoveButton_clickHandler.bindWithEvent(this);
	}

	this.buildEditHtml = function() {
    var html = '<div id="'+SettingDetail.EDIT_ID+'">'+
               '<div id="'+SettingDetail.HEADER_ID+'" style="height:50px;">'+
               '<h1 id="'+SettingDetail.TITLE_ID+'">'+SettingDetail.DETAIL_TEXT+'</h1>'+
               '<div id="'+SettingDetail.HEADER_EDIT_BUTTONS_ID+'">'+
               '<button id="'+SettingDetail.HEADER_SAVE_BUTTON_ID+'" class="'+SettingDetail.BUTTON_CLASS_ID+'">'+SettingDetail.SAVE_BUTTON_LABEL+'</button>'+
               '<button id="'+SettingDetail.HEADER_CANCEL_BUTTON_ID+'" class="'+SettingDetail.BUTTON_CLASS_ID+'">'+SettingDetail.CANCEL_BUTTON_LABEL+'</button>'+
               '</div>'+
               '</div>'+
               '<div id="'+SettingDetail.GROUP_ID+'">'+
							 '<div class="'+SettingDetail.LINE_NO_SEPARATOR_ID+'">'+
		           '<div style="position:relative;float:left;align:left;width:20%;height:100%;text-align:right;padding-top:3px;font-weight:bold;color:gray;">'+SettingDetail.NAME_LABEL+'&nbsp;&nbsp;</div>'+
               '<div id="'+SettingDetail.NAME_ID+'" style="position:relative;float:left;align:left;width:30%;height:100%;padding-top:3px;color:gray;"><div id="'+SettingDetail.NAME_ID+'"></div></div>'+
		           '<div style="position:relative;float:left;align:left;width:20%;height:100%;text-align:right;padding-top:3px;font-weight:bold;color:gray;">'+SettingDetail.DEFAULT_LABEL+'&nbsp;&nbsp;</div>'+
               '<div id="'+SettingDetail.DEFAULT_ID+'" style="position:relative;float:left;align:left;width:30%;height:100%;padding-top:3px;color:gray;"><div id="'+SettingDetail.DEFAULT_ID+'"></div></div>'+
	             /*'<label for="'+SettingDetail.NAME_ID+'">'+SettingDetail.NAME_LABEL+'</label>'+
		           '<input type="text" id="'+SettingDetail.NAME_ID+'" class="'+SettingDetail.COLUMN_FIRST_ID+'"/>'+
	             '<label for="'+SettingDetail.DEFAULT_ID+'">'+SettingDetail.DEFAULT_LABEL+'</label>'+
		           '<input type="checkbox" id="'+SettingDetail.DEFAULT_ID+'" class="'+SettingDetail.COLUMN_SECOND_ID+'"/>'+*/
               '</div>'+
							 '<div class="'+SettingDetail.LINE_SEPARATOR_ID+'">'+
				 		 	 '<div style="position:relative;float:left;align:left;width:20%;height:100%;text-align:right;padding-top:3px;font-weight:bold;color:gray;">'+SettingDetail.APPLICATION_TYPE_LABEL+'&nbsp;&nbsp;</div>'+
               '<div id="'+SettingDetail.APPLICATION_TYPE_ID+'" style="position:relative;float:left;align:left;width:30%;height:100%;padding-top:3px;color:gray;">Explorer</div>'+
	             /*'<label for="'+SettingDetail.APPLICATION_TYPE_ID+'">'+SettingDetail.APPLICATION_TYPE_LABEL+'</label>'+
							 '<select id="'+SettingDetail.APPLICATION_TYPE_ID+'" class="'+SettingDetail.COLUMN_FIRST_ID+'">'+
							 '<option>'+SettingDetail.APPLICATION_TYPE_BROWSER_LABEL+'</option>'+
							 '<option>'+SettingDetail.APPLICATION_TYPE_EXPLORER_LABEL+'</option>'+
							 '<option>'+SettingDetail.APPLICATION_TYPE_COMPOSER_LABEL+'</option>'+
							 '</select>'+*/
               '</div>'+
							 '<div class="'+SettingDetail.LINE_SEPARATOR_ID+'">'+
				 		 	 '<div style="position:relative;float:left;align:left;width:20%;height:100%;text-align:right;padding-top:3px;font-weight:bold;color:gray;">'+SettingDetail.COLUMNS_MINIMUM_LABEL+'&nbsp;&nbsp;</div>'+
               '<div id="'+SettingDetail.COLUMNS_MINIMUM_ID+'" style="position:relative;float:left;align:left;width:30%;height:100%;padding-top:3px;color:gray;">2</div>'+
				 		 	 '<div style="position:relative;float:left;align:left;width:20%;height:100%;text-align:right;padding-top:3px;font-weight:bold;color:gray;">'+SettingDetail.COLUMNS_MAXIMUM_LABEL+'&nbsp;&nbsp;</div>'+
               '<div id="'+SettingDetail.COLUMNS_MAXIMUM_ID+'" style="position:relative;float:left;align:left;width:30%;height:100%;padding-top:3px;color:gray;">10</div>'+
               /*'<label for="'+SettingDetail.COLUMNS_MINIMUM_ID+'">'+SettingDetail.COLUMNS_MINIMUM_LABEL+'</label>'+
 		           '<input type="text" id="'+SettingDetail.COLUMNS_MINIMUM_ID+'" class="'+SettingDetail.COLUMN_FIRST_ID+'"/>'+
               '<label for="'+SettingDetail.COLUMNS_MAXIMUM_ID+'">'+SettingDetail.COLUMNS_MAXIMUM_LABEL+'</label>'+
 		           '<input type="text" id="'+SettingDetail.COLUMNS_MAXIMUM_ID+'" class="'+SettingDetail.COLUMN_SECOND_ID+'"/>'+*/
               '</div>'+
							 '<div class="'+SettingDetail.LINE_SEPARATOR_ID+'">'+
				 		 	 '<div style="position:relative;float:left;align:left;width:20%;height:100%;text-align:right;padding-top:3px;font-weight:bold;color:gray;">'+SettingDetail.ROWS_LABEL+'&nbsp;&nbsp;</div>'+
               '<div id="'+SettingDetail.ROWS_ID+'" style="position:relative;float:left;align:left;width:30%;height:100%;padding-top:3px;color:gray;">10</div>'+
				 		 	 '<div style="position:relative;float:left;align:left;width:20%;height:100%;text-align:right;padding-top:3px;font-weight:bold;color:gray;">'+SettingDetail.TRAILING_CHARS_LABEL+'&nbsp;&nbsp;</div>'+
               '<div id="'+SettingDetail.TRAILING_CHARS_ID+'" style="position:relative;float:left;align:left;width:30%;height:100%;padding-top:3px;color:gray;">5</div>'+
               /*'<label for="'+SettingDetail.ROWS_ID+'">'+SettingDetail.ROWS_LABEL+'</label>'+
 		           '<input type="text" id="'+SettingDetail.ROWS_ID+'" class="'+SettingDetail.COLUMN_FIRST_ID+'"/>'+
               '<label for="'+SettingDetail.TRAILING_CHARS_ID+'">'+SettingDetail.TRAILING_CHARS_LABEL+'</label>'+
 		           '<input type="text" id="'+SettingDetail.TRAILING_CHARS_ID+'" class="'+SettingDetail.COLUMN_SECOND_ID+'"/>'+*/
               '</div>'+
							 '<div class="'+SettingDetail.LINE_SEPARATOR_ID+'">'+
				 		 	 '<div style="position:relative;float:left;align:left;width:20%;height:100%;text-align:right;padding-top:3px;font-weight:bold;color:gray;">'+SettingDetail.CBY_LABEL+'&nbsp;&nbsp;</div>'+
               '<div id="'+SettingDetail.CBY_ID+'" style="position:relative;float:left;align:left;width:30%;height:100%;padding-top:3px;color:gray;">Alma VandenBroeck 2011-10-17 23:14:12</div>'+
				 		 	 '<div style="position:relative;float:left;align:left;width:20%;height:100%;text-align:right;padding-top:3px;font-weight:bold;color:gray;">'+SettingDetail.MBY_LABEL+'&nbsp;&nbsp;</div>'+
               '<div id="'+SettingDetail.MBY_ID+'" style="position:relative;float:left;align:left;width:30%;height:100%;padding-top:3px;color:gray;">Alma VandenBroeck 2011-10-17 23:14:12</div>'+
               '</div>'+
							 '<div class="'+SettingDetail.LINE_NO_SEPARATOR_ID+'" style="height:15px;">&nbsp;</div>'+
               '</div>'+
							 '<hr class="'+SettingDetail.FOLD_SEPARATOR_ID+'"/>'+
							 '<div id="'+SettingDetail.WHERE_USED_COLUMNS_HEADER_ID+'">'+
               '<button id="'+SettingDetail.WHERE_USED_COLUMNS_FOLD_BUTTON_ID+'" class="'+SettingDetail.FOLD_BUTTON_CLASS_ID+'">'+SettingsFacade.FOLD_CLOSED+'</button>'+
               '<h1 id="'+SettingDetail.WHERE_USED_COLUMNS_TITLE_ID+'">'+SettingDetail.WHERE_USED_COLUMNS_TITLE_VALUE+'</h1>'+
               '</div>'+
               '<div id="'+SettingDetail.WHERE_USED_COLUMNS_GROUP_ID+'">'+
							 '<div class="'+SettingDetail.LINE_NO_SEPARATOR_ID+'">'+
				 		 	 '<div style="position:relative;float:left;align:left;width:20%;height:100%;text-align:right;padding-top:3px;font-weight:bold;color:gray;">'+SettingDetail.WHERE_USED_COLUMNS_LABEL+'&nbsp;&nbsp;</div>'+
               '<div id="'+SettingDetail.WHERE_USED_COLUMNS_ID+'" style="position:relative;float:left;align:left;width:30%;height:100%;padding-top:3px;color:gray;">15</div>'+
				 		 	 '<div style="position:relative;float:left;align:left;width:20%;height:100%;text-align:right;padding-top:3px;font-weight:bold;color:gray;">'+SettingDetail.WHERE_USED_ITEM_LENGTH_LABEL+'&nbsp;&nbsp;</div>'+
               '<div id="'+SettingDetail.WHERE_USED_ITEM_LENGTH_ID+'" style="position:relative;float:left;align:left;width:30%;height:100%;padding-top:3px;color:gray;">123</div>'+
               /*'<label for="'+SettingDetail.WHERE_USED_COLUMNS_ID+'">'+SettingDetail.WHERE_USED_COLUMNS_LABEL+'</label>'+
 		           '<input type="text" id="'+SettingDetail.WHERE_USED_COLUMNS_ID+'" class="'+SettingDetail.COLUMN_FIRST_ID+'"/>'+
               '<label for="'+SettingDetail.WHERE_USED_ITEM_LENGTH_ID+'">'+SettingDetail.WHERE_USED_ITEM_LENGTH_LABEL+'</label>'+
 		           '<input type="text" id="'+SettingDetail.WHERE_USED_ITEM_LENGTH_ID+'" class="'+SettingDetail.COLUMN_SECOND_ID+'"/>'+*/
               '</div>'+
							 '<div class="'+SettingDetail.LINE_SEPARATOR_ID+'">'+
				 		 	 '<div style="position:relative;float:left;align:left;width:20%;height:100%;text-align:right;padding-top:3px;font-weight:bold;color:gray;">'+SettingDetail.WHERE_USED_ITEM_COLOR_LABEL+'&nbsp;&nbsp;</div>'+
               '<div id="'+SettingDetail.WHERE_USED_ITEM_COLOR_ID+'" style="position:relative;float:left;align:left;width:30%;height:100%;padding-top:3px;color:gray;">15</div>'+
				 		 	 '<div style="position:relative;float:left;align:left;width:20%;height:100%;text-align:right;padding-top:3px;font-weight:bold;color:gray;">'+SettingDetail.WHERE_USED_ITEM_FONT_LABEL+'&nbsp;&nbsp;</div>'+
               '<div id="'+SettingDetail.WHERE_USED_ITEM_FONT_ID+'" style="position:relative;float:left;align:left;width:30%;height:100%;padding-top:3px;color:gray;">123</div>'+
	             /*'<label for="'+SettingDetail.WHERE_USED_ITEM_COLOR_ID+'">'+SettingDetail.WHERE_USED_ITEM_COLOR_LABEL+'</label>'+
							 '<select id="'+SettingDetail.WHERE_USED_ITEM_COLOR_ID+'" class="'+SettingDetail.COLUMN_FIRST_ID+'"></select>'+
	             '<label for="'+SettingDetail.WHERE_USED_ITEM_FONT_ID+'">'+SettingDetail.WHERE_USED_ITEM_FONT_LABEL+'</label>'+
							 '<select id="'+SettingDetail.WHERE_USED_ITEM_FONT_ID+'" class="'+SettingDetail.COLUMN_SECOND_ID+'"></select>'+*/
               '</div>'+
							 '<div class="'+SettingDetail.LINE_SEPARATOR_ID+'">'+
				 		 	 '<div style="position:relative;float:left;align:left;width:20%;height:100%;text-align:right;padding-top:3px;font-weight:bold;color:gray;">'+SettingDetail.WHERE_USED_ITEM_COLOR_SELECT_LABEL+'&nbsp;&nbsp;</div>'+
               '<div id="'+SettingDetail.WHERE_USED_ITEM_COLOR_SELECT_ID+'" style="position:relative;float:left;align:left;width:30%;height:100%;padding-top:3px;color:gray;">15</div>'+
				 		 	 '<div style="position:relative;float:left;align:left;width:20%;height:100%;text-align:right;padding-top:3px;font-weight:bold;color:gray;">'+SettingDetail.WHERE_USED_ITEM_FONT_SELECT_LABEL+'&nbsp;&nbsp;</div>'+
               '<div id="'+SettingDetail.WHERE_USED_ITEM_FONT_SELECT_ID+'" style="position:relative;float:left;align:left;width:30%;height:100%;padding-top:3px;color:gray;">123</div>'+
	             /*'<label for="'+SettingDetail.WHERE_USED_ITEM_COLOR_SELECT_ID+'">'+SettingDetail.WHERE_USED_ITEM_COLOR_SELECT_LABEL+'</label>'+
							 '<select id="'+SettingDetail.WHERE_USED_ITEM_COLOR_SELECT_ID+'" class="'+SettingDetail.COLUMN_FIRST_ID+'"></select>'+
	             '<label for="'+SettingDetail.WHERE_USED_ITEM_FONT_SELECT_ID+'">'+SettingDetail.WHERE_USED_ITEM_FONT_SELECT_LABEL+'</label>'+
							 '<select id="'+SettingDetail.WHERE_USED_ITEM_FONT_SELECT_ID+'" class="'+SettingDetail.COLUMN_SECOND_ID+'"></select>'+*/
               '</div>'+
							 '<div class="'+SettingDetail.LINE_SEPARATOR_ID+'">'+
				 		 	 '<div style="position:relative;float:left;align:left;width:20%;height:100%;text-align:right;padding-top:3px;font-weight:bold;color:gray;">'+SettingDetail.WHERE_USED_ITEM_COLOR_SELECTED_LABEL+'&nbsp;&nbsp;</div>'+
               '<div id="'+SettingDetail.WHERE_USED_ITEM_COLOR_SELECTED_ID+'" style="position:relative;float:left;align:left;width:30%;height:100%;padding-top:3px;color:gray;">15</div>'+
				 		 	 '<div style="position:relative;float:left;align:left;width:20%;height:100%;text-align:right;padding-top:3px;font-weight:bold;color:gray;">'+SettingDetail.WHERE_USED_ITEM_FONT_SELECTED_LABEL+'&nbsp;&nbsp;</div>'+
               '<div id="'+SettingDetail.WHERE_USED_ITEM_FONT_SELECTED_ID+'" style="position:relative;float:left;align:left;width:30%;height:100%;padding-top:3px;color:gray;">123</div>'+
	             /*'<label for="'+SettingDetail.WHERE_USED_ITEM_COLOR_SELECTED_ID+'">'+SettingDetail.WHERE_USED_ITEM_COLOR_SELECTED_LABEL+'</label>'+
							 '<select id="'+SettingDetail.WHERE_USED_ITEM_COLOR_SELECTED_ID+'" class="'+SettingDetail.COLUMN_FIRST_ID+'"></select>'+
	             '<label for="'+SettingDetail.WHERE_USED_ITEM_FONT_SELECTED_ID+'">'+SettingDetail.WHERE_USED_ITEM_FONT_SELECTED_LABEL+'</label>'+
							 '<select id="'+SettingDetail.WHERE_USED_ITEM_FONT_SELECTED_ID+'" class="'+SettingDetail.COLUMN_SECOND_ID+'"></select>'+*/
               '</div>'+
							 '<div class="'+SettingDetail.LINE_NO_SEPARATOR_ID+'" style="height:15px;">&nbsp;</div>'+
               '</div>'+
							 '<hr class="'+SettingDetail.FOLD_SEPARATOR_ID+'"/>'+
							 '<div id="'+SettingDetail.ROOT_COLUMN_HEADER_ID+'">'+							 
               '<button id="'+SettingDetail.ROOT_COLUMN_FOLD_BUTTON_ID+'" class="'+SettingDetail.FOLD_BUTTON_CLASS_ID+'">'+SettingsFacade.FOLD_CLOSED+'</button>'+
               '<h1 id="'+SettingDetail.ROOT_COLUMN_TITLE_ID+'">'+SettingDetail.ROOT_COLUMN_TITLE_VALUE+'</h1>'+
               '</div>'+
               '<div id="'+SettingDetail.ROOT_COLUMN_GROUP_ID+'">'+
							 '<div class="'+SettingDetail.LINE_NO_SEPARATOR_ID+'">'+
				 		 	 '<div style="position:relative;float:left;align:left;width:20%;height:100%;text-align:right;padding-top:3px;font-weight:bold;color:gray;">'+SettingDetail.ROOT_COLUMN_TYPE_INCLUDED_LABEL+'&nbsp;&nbsp;</div>'+
               '<div id="'+SettingDetail.ROOT_COLUMN_TYPE_INCLUDED_ID+'" style="position:relative;float:left;align:left;width:30%;height:100%;padding-top:3px;color:gray;"></div>'+
				 		 	 '<div style="position:relative;float:left;align:left;width:20%;height:100%;text-align:right;padding-top:3px;font-weight:bold;color:gray;">'+SettingDetail.ROOT_ITEM_LENGTH_LABEL+'&nbsp;&nbsp;</div>'+
               '<div id="'+SettingDetail.ROOT_ITEM_LENGTH_ID+'" style="position:relative;float:left;align:left;width:30%;height:100%;padding-top:3px;color:gray;">20</div>'+
               /*'<label for="'+SettingDetail.ROOT_COLUMN_TYPE_INCLUDED_ID+'">'+SettingDetail.ROOT_COLUMN_TYPE_INCLUDED_LABEL+'</label>'+
 		           '<input type="text" id="'+SettingDetail.ROOT_COLUMN_TYPE_INCLUDED_ID+'" class="'+SettingDetail.COLUMN_FIRST_ID+'"/>'+
               '<label for="'+SettingDetail.ROOT_ITEM_LENGTH_ID+'">'+SettingDetail.ROOT_ITEM_LENGTH_LABEL+'</label>'+
 		           '<input type="text" id="'+SettingDetail.ROOT_ITEM_LENGTH_ID+'" class="'+SettingDetail.COLUMN_SECOND_ID+'"/>'+*/
               '</div>'+
							 '<div class="'+SettingDetail.LINE_SEPARATOR_ID+'">'+
				 		 	 '<div style="position:relative;float:left;align:left;width:20%;height:100%;text-align:right;padding-top:3px;font-weight:bold;color:gray;">'+SettingDetail.ROOT_ITEM_COLOR_LABEL+'&nbsp;&nbsp;</div>'+
               '<div id="'+SettingDetail.ROOT_ITEM_COLOR_ID+'" style="position:relative;float:left;align:left;width:30%;height:100%;padding-top:3px;color:gray;"></div>'+
				 		 	 '<div style="position:relative;float:left;align:left;width:20%;height:100%;text-align:right;padding-top:3px;font-weight:bold;color:gray;">'+SettingDetail.ROOT_ITEM_FONT_LABEL+'&nbsp;&nbsp;</div>'+
               '<div id="'+SettingDetail.ROOT_ITEM_FONT_ID+'" style="position:relative;float:left;align:left;width:30%;height:100%;padding-top:3px;color:gray;">20</div>'+
	             /*'<label for="'+SettingDetail.ROOT_ITEM_COLOR_ID+'">'+SettingDetail.ROOT_ITEM_COLOR_LABEL+'</label>'+
							 '<select id="'+SettingDetail.ROOT_ITEM_COLOR_ID+'" class="'+SettingDetail.COLUMN_FIRST_ID+'"></select>'+
	             '<label for="'+SettingDetail.ROOT_ITEM_FONT_ID+'">'+SettingDetail.ROOT_ITEM_FONT_LABEL+'</label>'+
							 '<select id="'+SettingDetail.ROOT_ITEM_FONT_ID+'" class="'+SettingDetail.COLUMN_SECOND_ID+'"></select>'+*/
               '</div>'+
							 '<div class="'+SettingDetail.LINE_SEPARATOR_ID+'">'+
				 		 	 '<div style="position:relative;float:left;align:left;width:20%;height:100%;text-align:right;padding-top:3px;font-weight:bold;color:gray;">'+SettingDetail.ROOT_ITEM_COLOR_SELECT_LABEL+'&nbsp;&nbsp;</div>'+
               '<div id="'+SettingDetail.ROOT_ITEM_COLOR_SELECT_ID+'" style="position:relative;float:left;align:left;width:30%;height:100%;padding-top:3px;color:gray;"></div>'+
				 		 	 '<div style="position:relative;float:left;align:left;width:20%;height:100%;text-align:right;padding-top:3px;font-weight:bold;color:gray;">'+SettingDetail.ROOT_ITEM_FONT_SELECT_LABEL+'&nbsp;&nbsp;</div>'+
               '<div id="'+SettingDetail.ROOT_ITEM_FONT_SELECT_ID+'" style="position:relative;float:left;align:left;width:30%;height:100%;padding-top:3px;color:gray;">20</div>'+
	             /*'<label for="'+SettingDetail.ROOT_ITEM_COLOR_SELECT_ID+'">'+SettingDetail.ROOT_ITEM_COLOR_SELECT_LABEL+'</label>'+
							 '<select id="'+SettingDetail.ROOT_ITEM_COLOR_SELECT_ID+'" class="'+SettingDetail.COLUMN_FIRST_ID+'"></select>'+
	             '<label for="'+SettingDetail.ROOT_ITEM_FONT_SELECT_ID+'">'+SettingDetail.ROOT_ITEM_FONT_SELECT_LABEL+'</label>'+
							 '<select id="'+SettingDetail.ROOT_ITEM_FONT_SELECT_ID+'" class="'+SettingDetail.COLUMN_SECOND_ID+'"></select>'+*/
               '</div>'+
							 '<div class="'+SettingDetail.LINE_SEPARATOR_ID+'">'+
				 		 	 '<div style="position:relative;float:left;align:left;width:20%;height:100%;text-align:right;padding-top:3px;font-weight:bold;color:gray;">'+SettingDetail.ROOT_ITEM_COLOR_SELECTED_LABEL+'&nbsp;&nbsp;</div>'+
               '<div id="'+SettingDetail.ROOT_ITEM_COLOR_SELECTED_ID+'" style="position:relative;float:left;align:left;width:30%;height:100%;padding-top:3px;color:gray;"></div>'+
				 		 	 '<div style="position:relative;float:left;align:left;width:20%;height:100%;text-align:right;padding-top:3px;font-weight:bold;color:gray;">'+SettingDetail.ROOT_ITEM_FONT_SELECTED_LABEL+'&nbsp;&nbsp;</div>'+
               '<div id="'+SettingDetail.ROOT_ITEM_FONT_SELECTED_ID+'" style="position:relative;float:left;align:left;width:30%;height:100%;padding-top:3px;color:gray;">20</div>'+
	             /*'<label for="'+SettingDetail.ROOT_ITEM_COLOR_SELECTED_ID+'">'+SettingDetail.ROOT_ITEM_COLOR_SELECTED_LABEL+'</label>'+
							 '<select id="'+SettingDetail.ROOT_ITEM_COLOR_SELECTED_ID+'" class="'+SettingDetail.COLUMN_FIRST_ID+'"></select>'+
	             '<label for="'+SettingDetail.ROOT_ITEM_FONT_SELECTED_ID+'">'+SettingDetail.ROOT_ITEM_FONT_SELECTED_LABEL+'</label>'+
							 '<select id="'+SettingDetail.ROOT_ITEM_FONT_SELECTED_ID+'" class="'+SettingDetail.COLUMN_SECOND_ID+'"></select>'+*/
               '</div>'+
							 '<div class="'+SettingDetail.LINE_NO_SEPARATOR_ID+'" style="height:15px;">&nbsp;</div>'+
               '</div>'+
							 '<hr class="'+SettingDetail.FOLD_SEPARATOR_ID+'"/>'+
							 '<div id="'+SettingDetail.WHAT_USED_COLUMNS_HEADER_ID+'">'+
               '<button id="'+SettingDetail.WHAT_USED_COLUMNS_FOLD_BUTTON_ID+'" class="'+SettingDetail.FOLD_BUTTON_CLASS_ID+'">'+SettingsFacade.FOLD_CLOSED+'</button>'+
               '<h1 id="'+SettingDetail.WHAT_USED_COLUMNS_TITLE_ID+'">'+SettingDetail.WHAT_USED_COLUMNS_TITLE_VALUE+'</h1>'+
               '</div>'+
               '<div id="'+SettingDetail.WHAT_USED_COLUMNS_GROUP_ID+'">'+
							 '<div class="'+SettingDetail.LINE_NO_SEPARATOR_ID+'">'+
				 		 	 '<div style="position:relative;float:left;align:left;width:20%;height:100%;text-align:right;padding-top:3px;font-weight:bold;color:gray;">'+SettingDetail.WHAT_USED_COLUMNS_LABEL+'&nbsp;&nbsp;</div>'+
               '<div id="'+SettingDetail.WHAT_USED_COLUMNS_ID+'" style="position:relative;float:left;align:left;width:30%;height:100%;padding-top:3px;color:gray;"></div>'+
				 		 	 '<div style="position:relative;float:left;align:left;width:20%;height:100%;text-align:right;padding-top:3px;font-weight:bold;color:gray;">'+SettingDetail.WHAT_USED_ITEM_LENGTH_LABEL+'&nbsp;&nbsp;</div>'+
               '<div id="'+SettingDetail.WHAT_USED_ITEM_LENGTH_ID+'" style="position:relative;float:left;align:left;width:30%;height:100%;padding-top:3px;color:gray;">20</div>'+
               /*'<label for="'+SettingDetail.WHAT_USED_COLUMNS_ID+'">'+SettingDetail.WHAT_USED_COLUMNS_LABEL+'</label>'+
 		           '<input type="text" id="'+SettingDetail.WHAT_USED_COLUMNS_ID+'" class="'+SettingDetail.COLUMN_FIRST_ID+'"/>'+
               '<label for="'+SettingDetail.WHAT_USED_ITEM_LENGTH_ID+'">'+SettingDetail.WHAT_USED_ITEM_LENGTH_LABEL+'</label>'+
 		           '<input type="text" id="'+SettingDetail.WHAT_USED_ITEM_LENGTH_ID+'" class="'+SettingDetail.COLUMN_SECOND_ID+'"/>'+*/
               '</div>'+
							 '<div class="'+SettingDetail.LINE_SEPARATOR_ID+'">'+
				 		 	 '<div style="position:relative;float:left;align:left;width:20%;height:100%;text-align:right;padding-top:3px;font-weight:bold;color:gray;">'+SettingDetail.WHAT_USED_ITEM_COLOR_LABEL+'&nbsp;&nbsp;</div>'+
               '<div id="'+SettingDetail.WHAT_USED_ITEM_COLOR_ID+'" style="position:relative;float:left;align:left;width:30%;height:100%;padding-top:3px;color:gray;"></div>'+
				 		 	 '<div style="position:relative;float:left;align:left;width:20%;height:100%;text-align:right;padding-top:3px;font-weight:bold;color:gray;">'+SettingDetail.WHAT_USED_ITEM_FONT_LABEL+'&nbsp;&nbsp;</div>'+
               '<div id="'+SettingDetail.WHAT_USED_ITEM_FONT_ID+'" style="position:relative;float:left;align:left;width:30%;height:100%;padding-top:3px;color:gray;">20</div>'+
	             /*'<label for="'+SettingDetail.WHAT_USED_ITEM_COLOR_ID+'">'+SettingDetail.WHAT_USED_ITEM_COLOR_LABEL+'</label>'+
							 '<select id="'+SettingDetail.WHAT_USED_ITEM_COLOR_ID+'" class="'+SettingDetail.COLUMN_FIRST_ID+'"></select>'+
	             '<label for="'+SettingDetail.WHAT_USED_ITEM_FONT_ID+'">'+SettingDetail.WHAT_USED_ITEM_FONT_LABEL+'</label>'+
							 '<select id="'+SettingDetail.WHAT_USED_ITEM_FONT_ID+'" class="'+SettingDetail.COLUMN_SECOND_ID+'"></select>'+*/
               '</div>'+
							 '<div class="'+SettingDetail.LINE_SEPARATOR_ID+'">'+
				 		 	 '<div style="position:relative;float:left;align:left;width:20%;height:100%;text-align:right;padding-top:3px;font-weight:bold;color:gray;">'+SettingDetail.WHAT_USED_ITEM_COLOR_SELECT_LABEL+'&nbsp;&nbsp;</div>'+
               '<div id="'+SettingDetail.WHAT_USED_ITEM_COLOR_SELECT_ID+'" style="position:relative;float:left;align:left;width:30%;height:100%;padding-top:3px;color:gray;"></div>'+
				 		 	 '<div style="position:relative;float:left;align:left;width:20%;height:100%;text-align:right;padding-top:3px;font-weight:bold;color:gray;">'+SettingDetail.WHAT_USED_ITEM_FONT_SELECT_LABEL+'&nbsp;&nbsp;</div>'+
               '<div id="'+SettingDetail.WHAT_USED_ITEM_FONT_SELECT_ID+'" style="position:relative;float:left;align:left;width:30%;height:100%;padding-top:3px;color:gray;">20</div>'+
	             /*'<label for="'+SettingDetail.WHAT_USED_ITEM_COLOR_SELECT_ID+'">'+SettingDetail.WHAT_USED_ITEM_COLOR_SELECT_LABEL+'</label>'+
							 '<select id="'+SettingDetail.WHAT_USED_ITEM_COLOR_SELECT_ID+'" class="'+SettingDetail.COLUMN_FIRST_ID+'"></select>'+
	             '<label for="'+SettingDetail.WHAT_USED_ITEM_FONT_SELECT_ID+'">'+SettingDetail.WHAT_USED_ITEM_FONT_SELECT_LABEL+'</label>'+
							 '<select id="'+SettingDetail.WHAT_USED_ITEM_FONT_SELECT_ID+'" class="'+SettingDetail.COLUMN_SECOND_ID+'"></select>'+*/
               '</div>'+
							 '<div class="'+SettingDetail.LINE_SEPARATOR_ID+'">'+
				 		 	 '<div style="position:relative;float:left;align:left;width:20%;height:100%;text-align:right;padding-top:3px;font-weight:bold;color:gray;">'+SettingDetail.WHAT_USED_ITEM_COLOR_SELECTED_LABEL+'&nbsp;&nbsp;</div>'+
               '<div id="'+SettingDetail.WHAT_USED_ITEM_COLOR_SELECTED_ID+'" style="position:relative;float:left;align:left;width:30%;height:100%;padding-top:3px;color:gray;"></div>'+
				 		 	 '<div style="position:relative;float:left;align:left;width:20%;height:100%;text-align:right;padding-top:3px;font-weight:bold;color:gray;">'+SettingDetail.WHAT_USED_ITEM_FONT_SELECTED_LABEL+'&nbsp;&nbsp;</div>'+
               '<div id="'+SettingDetail.WHAT_USED_ITEM_FONT_SELECTED_ID+'" style="position:relative;float:left;align:left;width:30%;height:100%;padding-top:3px;color:gray;">20</div>'+
	             /*'<label for="'+SettingDetail.WHAT_USED_ITEM_COLOR_SELECTED_ID+'">'+SettingDetail.WHAT_USED_ITEM_COLOR_SELECTED_LABEL+'</label>'+
							 '<select id="'+SettingDetail.WHAT_USED_ITEM_COLOR_SELECTED_ID+'" class="'+SettingDetail.COLUMN_FIRST_ID+'"></select>'+
	             '<label for="'+SettingDetail.WHAT_USED_ITEM_FONT_SELECTED_ID+'">'+SettingDetail.WHAT_USED_ITEM_FONT_SELECTED_LABEL+'</label>'+
							 '<select id="'+SettingDetail.WHAT_USED_ITEM_FONT_SELECTED_ID+'" class="'+SettingDetail.COLUMN_SECOND_ID+'"></select>'+*/
               '</div>'+
							 '<div class="'+SettingDetail.LINE_NO_SEPARATOR_ID+'" style="height:15px;">&nbsp;</div>'+
               '</div>'+
							 '<hr class="'+SettingDetail.FOLD_SEPARATOR_ID+'"/>'+
               '<div id="'+SettingDetail.OBJECT_TYPES_HEADER_ID+'">'+
               '<button id="'+SettingDetail.OBJECT_TYPES_FOLD_BUTTON_ID+'" class="'+SettingDetail.FOLD_BUTTON_CLASS_ID+'">'+SettingsFacade.FOLD_CLOSED+'</button>'+
               '<h1 id="'+SettingDetail.OBJECT_TYPES_TITLE_ID+'">'+SettingDetail.OBJECT_TYPES_TITLE_VALUE+'</h1>'+               
               '</div>'+
               '<div id="'+SettingDetail.OBJECT_TYPES_GROUP_ID+'">'+
				 		 	 '<div style="position:relative;float:left;align:left;width:20%;height:100%;text-align:right;padding-top:3px;font-weight:bold;color:gray;">'+SettingDetail.OBJECT_TYPES_MAXIMUM_LABEL+'&nbsp;&nbsp;</div>'+
               '<div id="'+SettingDetail.OBJECT_TYPES_MAXIMUM_ID+'" style="position:relative;float:left;align:left;width:30%;height:100%;padding-top:3px;color:gray;">10</div>'+
               '<select id="'+SettingDetail.OBJECT_TYPES_AVAILABLE_ID+'" multiple="multiple"></select>'+
               '<button id="'+SettingDetail.OBJECT_TYPES_ADD_BUTTON_ID+'" class="'+SettingDetail.OBJECT_TYPES_SELECT_BUTTON_CLASS_ID+'"/>'+
               '<button id="'+SettingDetail.OBJECT_TYPES_REMOVE_BUTTON_ID+'" class="'+SettingDetail.OBJECT_TYPES_SELECT_BUTTON_CLASS_ID+'"/>'+
               '<select id="'+SettingDetail.OBJECT_TYPES_CHOSEN_ID+'" multiple="multiple"></select>'+
               /*'<label for="'+SettingDetail.OBJECT_TYPES_MAXIMUM_ID+'">'+SettingDetail.OBJECT_TYPES_MAXIMUM_LABEL+'</label>'+
 		           '<input type="text" id="'+SettingDetail.OBJECT_TYPES_MAXIMUM_ID+'"/>'+
               '<select id="'+SettingDetail.OBJECT_TYPES_AVAILABLE_ID+'" multiple="multiple"></select>'+
               '<button id="'+SettingDetail.OBJECT_TYPES_ADD_BUTTON_ID+'" class="'+SettingDetail.OBJECT_TYPES_SELECT_BUTTON_CLASS_ID+'"/>'+
               '<button id="'+SettingDetail.OBJECT_TYPES_REMOVE_BUTTON_ID+'" class="'+SettingDetail.OBJECT_TYPES_SELECT_BUTTON_CLASS_ID+'"/>'+
               '<select id="'+SettingDetail.OBJECT_TYPES_CHOSEN_ID+'" multiple="multiple"></select>'+*/
               '</div>'+
               '<div id="'+SettingDetail.FOOTER_ID+'">'+
               '<div id="'+SettingDetail.FOOTER_EDIT_BUTTONS_ID+'">'+
               '<button id="'+SettingDetail.FOOTER_SAVE_BUTTON_ID+'" class="'+SettingDetail.BUTTON_CLASS_ID+'">'+SettingDetail.SAVE_BUTTON_LABEL+'</button>'+
               '<button id="'+SettingDetail.FOOTER_CANCEL_BUTTON_ID+'" class="'+SettingDetail.BUTTON_CLASS_ID+'">'+SettingDetail.CANCEL_BUTTON_LABEL+'</button>'+
               '</div>'+
               '</div>'; //EDIT
    return html;
  }

	this.buildDisplayHtml = function() {
    var html = '<div id="'+SettingDetail.DISPLAY_ID+'">'+
               '<div style="height:50px;">'+ //HEADER
               '<h1>'+SettingDetail.DETAIL_TEXT+'</h1>'+ //TITLE
               '<div>'+ //HEADER_BUTTONS
               '<button id="'+SettingDetail.HEADER_EDIT_BUTTON_ID+'" class="'+SettingDetail.BUTTON_CLASS_ID+'">'+SettingDetail.EDIT_BUTTON_LABEL+'</button>'+
               '<button id="'+SettingDetail.HEADER_DELETE_BUTTON_ID+'" class="'+SettingDetail.BUTTON_CLASS_ID+'">'+SettingDetail.DELETE_BUTTON_LABEL+'</button>'+
               '<button id="'+SettingDetail.HEADER_CLONE_BUTTON_ID+'" class="'+SettingDetail.BUTTON_CLASS_ID+'">'+SettingDetail.CLONE_BUTTON_LABEL+'</button>'+
               '<button id="'+SettingDetail.HEADER_ACTIVATE_BUTTON_ID+'" class="'+SettingDetail.BUTTON_CLASS_ID+'">'+SettingDetail.ACTIVATE_BUTTON_LABEL+'</button>'+
               '</div>'+ //HEADER_BUTTONS
               '</div>'+ //HEADER
               '<div>'+ //FOOTER
               '<div>'+ //FOOTER_BUTTONS
               '<button id="'+SettingDetail.FOOTER_EDIT_BUTTON_ID+'" class="'+SettingDetail.BUTTON_CLASS_ID+'">'+SettingDetail.EDIT_BUTTON_LABEL+'</button>'+
               '<button id="'+SettingDetail.FOOTER_DELETE_BUTTON_ID+'" class="'+SettingDetail.BUTTON_CLASS_ID+'">'+SettingDetail.DELETE_BUTTON_LABEL+'</button>'+
               '<button id="'+SettingDetail.FOOTER_CLONE_BUTTON_ID+'" class="'+SettingDetail.BUTTON_CLASS_ID+'">'+SettingDetail.CLONE_BUTTON_LABEL+'</button>'+
               '<button id="'+SettingDetail.FOOTER_ACTIVATE_BUTTON_ID+'" class="'+SettingDetail.BUTTON_CLASS_ID+'">'+SettingDetail.ACTIVATE_BUTTON_LABEL+'</button>'+
               '</div>'+ //FOOTER_BUTTONS
               '</div>'+ //FOOTER
               '</div>'; //DISPLAY
/*
               '<div>'+ //GROUP
							 '<div class="'+SettingDetail.LINE_NO_SEPARATOR_ID+'">'+
		           '<div style="position:relative;float:left;align:left;width:20%;height:100%;text-align:right;padding-top:3px;font-weight:bold;color:gray;">'+SettingDetail.NAME_LABEL+'&nbsp;&nbsp;</div>'+
               '<div style="position:relative;float:left;align:left;width:30%;height:100%;padding-top:3px;color:gray;"></div>'+
		           '<div style="position:relative;float:left;align:left;width:20%;height:100%;text-align:right;padding-top:3px;font-weight:bold;color:gray;">'+SettingDetail.DEFAULT_LABEL+'&nbsp;&nbsp;</div>'+
               '<div style="position:relative;float:left;align:left;width:30%;height:100%;padding-top:3px;color:gray;"></div>'+
               '</div>'+
							 '<div class="'+SettingDetail.LINE_SEPARATOR_ID+'">'+
				 		 	 '<div style="position:relative;float:left;align:left;width:20%;height:100%;text-align:right;padding-top:3px;font-weight:bold;color:gray;">'+SettingDetail.APPLICATION_TYPE_LABEL+'&nbsp;&nbsp;</div>'+
               '<div style="position:relative;float:left;align:left;width:30%;height:100%;padding-top:3px;color:gray;"></div>'+
               '</div>'+
							 '<div class="'+SettingDetail.LINE_SEPARATOR_ID+'">'+
				 		 	 '<div style="position:relative;float:left;align:left;width:20%;height:100%;text-align:right;padding-top:3px;font-weight:bold;color:gray;">'+SettingDetail.COLUMNS_MINIMUM_LABEL+'&nbsp;&nbsp;</div>'+
               '<div style="position:relative;float:left;align:left;width:30%;height:100%;padding-top:3px;color:gray;"></div>'+
				 		 	 '<div style="position:relative;float:left;align:left;width:20%;height:100%;text-align:right;padding-top:3px;font-weight:bold;color:gray;">'+SettingDetail.COLUMNS_MAXIMUM_LABEL+'&nbsp;&nbsp;</div>'+
               '<div style="position:relative;float:left;align:left;width:30%;height:100%;padding-top:3px;color:gray;"></div>'+
               '</div>'+
							 '<div class="'+SettingDetail.LINE_SEPARATOR_ID+'">'+
				 		 	 '<div style="position:relative;float:left;align:left;width:20%;height:100%;text-align:right;padding-top:3px;font-weight:bold;color:gray;">'+SettingDetail.ROWS_LABEL+'&nbsp;&nbsp;</div>'+
               '<div style="position:relative;float:left;align:left;width:30%;height:100%;padding-top:3px;color:gray;"></div>'+
				 		 	 '<div style="position:relative;float:left;align:left;width:20%;height:100%;text-align:right;padding-top:3px;font-weight:bold;color:gray;">'+SettingDetail.TRAILING_CHARS_LABEL+'&nbsp;&nbsp;</div>'+
               '<div style="position:relative;float:left;align:left;width:30%;height:100%;padding-top:3px;color:gray;"></div>'+
               '</div>'+
							 '<div class="'+SettingDetail.LINE_SEPARATOR_ID+'">'+
				 		 	 '<div style="position:relative;float:left;align:left;width:20%;height:100%;text-align2045:right;padding-top:3px;font-weight:bold;color:gray;">'+SettingDetail.CBY_LABEL+'&nbsp;&nbsp;</div>'+
               '<div style="position:relative;float:left;align:left;width:30%;height:100%;padding-top:3px;color:gray;"></div>'+
				 		 	 '<div style="position:relative;float:left;align:left;width:20%;height:100%;text-align:right;padding-top:3px;font-weight:bold;color:gray;">'+SettingDetail.MBY_LABEL+'&nbsp;&nbsp;</div>'+
               '<div style="position:relative;float:left;align:left;width:30%;height:100%;padding-top:3px;color:gray;"></div>'+
               '</div>'+
							 '<div class="'+SettingDetail.LINE_NO_SEPARATOR_ID+'" style="height:15px;">&nbsp;</div>'+ //SPACE
               '</div>'+
							 '<hr class="'+SettingDetail.FOLD_SEPARATOR_ID+'"/>'+
							 **'<div id="'+SettingDetail.WHERE_USED_COLUMNS_HEADER_ID+'">'+
               '<button id="'+SettingDetail.WHERE_USED_COLUMNS_FOLD_BUTTON_ID+'" class="'+SettingDetail.FOLD_BUTTON_CLASS_ID+'">'+SettingsFacade.FOLD_CLOSED+'</button>'+
               '<h1 id="'+SettingDetail.WHERE_USED_COLUMNS_TITLE_ID+'">'+SettingDetail.WHERE_USED_COLUMNS_TITLE_VALUE+'</h1>'+
               '</div>'+**
               '<div>'+ //WHERE_USED_COLUMNS_GROUP_ID
							 '<div class="'+SettingDetail.LINE_NO_SEPARATOR_ID+'">'+
				 		 	 '<div style="position:relative;float:left;align:left;width:20%;height:100%;text-align:right;padding-top:3px;font-weight:bold;color:gray;">'+SettingDetail.WHERE_USED_COLUMNS_LABEL+'&nbsp;&nbsp;</div>'+
               '<div style="position:relative;float:left;align:left;width:30%;height:100%;padding-top:3px;color:gray;"></div>'+
				 		 	 '<div style="position:relative;float:left;align:left;width:20%;height:100%;text-align:right;padding-top:3px;font-weight:bold;color:gray;">'+SettingDetail.WHERE_USED_ITEM_LENGTH_LABEL+'&nbsp;&nbsp;</div>'+
               '<div style="position:relative;float:left;align:left;width:30%;height:100%;padding-top:3px;color:gray;"></div>'+
               '</div>'+
							 '<div class="'+SettingDetail.LINE_SEPARATOR_ID+'">'+
				 		 	 '<div style="position:relative;float:left;align:left;width:20%;height:100%;text-align:right;padding-top:3px;font-weight:bold;color:gray;">'+SettingDetail.WHERE_USED_ITEM_COLOR_LABEL+'&nbsp;&nbsp;</div>'+
               '<div style="position:relative;float:left;align:left;width:30%;height:100%;padding-top:3px;color:gray;"></div>'+
				 		 	 '<div style="position:relative;float:left;align:left;width:20%;height:100%;text-align:right;padding-top:3px;font-weight:bold;color:gray;">'+SettingDetail.WHERE_USED_ITEM_FONT_LABEL+'&nbsp;&nbsp;</div>'+
               '<div style="position:relative;float:left;align:left;width:30%;height:100%;padding-top:3px;color:gray;"></div>'+
               '</div>'+
							 '<div class="'+SettingDetail.LINE_SEPARATOR_ID+'">'+
				 		 	 '<div style="position:relative;float:left;align:left;width:20%;height:100%;text-align:right;padding-top:3px;font-weight:bold;color:gray;">'+SettingDetail.WHERE_USED_ITEM_COLOR_SELECT_LABEL+'&nbsp;&nbsp;</div>'+
               '<div style="position:relative;float:left;align:left;width:30%;height:100%;padding-top:3px;color:gray;"></div>'+
				 		 	 '<div style="position:relative;float:left;align:left;width:20%;height:100%;text-align:right;padding-top:3px;font-weight:bold;color:gray;">'+SettingDetail.WHERE_USED_ITEM_FONT_SELECT_LABEL+'&nbsp;&nbsp;</div>'+
               '<div style="position:relative;float:left;align:left;width:30%;height:100%;padding-top:3px;color:gray;"></div>'+
               '</div>'+
							 '<div class="'+SettingDetail.LINE_SEPARATOR_ID+'">'+
				 		 	 '<div style="position:relative;float:left;align:left;width:20%;height:100%;text-align:right;padding-top:3px;font-weight:bold;color:gray;">'+SettingDetail.WHERE_USED_ITEM_COLOR_SELECTED_LABEL+'&nbsp;&nbsp;</div>'+
               '<div style="position:relative;float:left;align:left;width:30%;height:100%;padding-top:3px;color:gray;"></div>'+
				 		 	 '<div style="position:relative;float:left;align:left;width:20%;height:100%;text-align:right;padding-top:3px;font-weight:bold;color:gray;">'+SettingDetail.WHERE_USED_ITEM_FONT_SELECTED_LABEL+'&nbsp;&nbsp;</div>'+
               '<div style="position:relative;float:left;align:left;width:30%;height:100%;padding-top:3px;color:gray;"></div>'+
               '</div>'+
							 '<div class="'+SettingDetail.LINE_NO_SEPARATOR_ID+'" style="height:15px;">&nbsp;</div>'+
               '</div>'+
							 '<hr class="'+SettingDetail.FOLD_SEPARATOR_ID+'"/>'+
							 **'<div id="'+SettingDetail.ROOT_COLUMN_HEADER_ID+'">'+							 
               '<button id="'+SettingDetail.ROOT_COLUMN_FOLD_BUTTON_ID+'" class="'+SettingDetail.FOLD_BUTTON_CLASS_ID+'">'+SettingsFacade.FOLD_CLOSED+'</button>'+
               '<h1 id="'+SettingDetail.ROOT_COLUMN_TITLE_ID+'">'+SettingDetail.ROOT_COLUMN_TITLE_VALUE+'</h1>'+
               '</div>'+**
               '<div>'+ //ROOT_COLUMN_GROUP
							 '<div class="'+SettingDetail.LINE_NO_SEPARATOR_ID+'">'+
				 		 	 '<div style="position:relative;float:left;align:left;width:20%;height:100%;text-align:right;padding-top:3px;font-weight:bold;color:gray;">'+SettingDetail.ROOT_COLUMN_TYPE_INCLUDED_LABEL+'&nbsp;&nbsp;</div>'+
               '<div style="position:relative;float:left;align:left;width:30%;height:100%;padding-top:3px;color:gray;"></div>'+
				 		 	 '<div style="position:relative;float:left;align:left;width:20%;height:100%;text-align:right;padding-top:3px;font-weight:bold;color:gray;">'+SettingDetail.ROOT_ITEM_LENGTH_LABEL+'&nbsp;&nbsp;</div>'+
               '<div style="position:relative;float:left;align:left;width:30%;height:100%;padding-top:3px;color:gray;"></div>'+
               '</div>'+
							 '<div class="'+SettingDetail.LINE_SEPARATOR_ID+'">'+
				 		 	 '<div style="position:relative;float:left;align:left;width:20%;height:100%;text-align:right;padding-top:3px;font-weight:bold;color:gray;">'+SettingDetail.ROOT_ITEM_COLOR_LABEL+'&nbsp;&nbsp;</div>'+
               '<div style="position:relative;float:left;align:left;width:30%;height:100%;padding-top:3px;color:gray;"></div>'+
				 		 	 '<div style="position:relative;float:left;align:left;width:20%;height:100%;text-align:right;padding-top:3px;font-weight:bold;color:gray;">'+SettingDetail.ROOT_ITEM_FONT_LABEL+'&nbsp;&nbsp;</div>'+
               '<div style="position:relative;float:left;align:left;width:30%;height:100%;padding-top:3px;color:gray;"></div>'+
               '</div>'+
							 '<div class="'+SettingDetail.LINE_SEPARATOR_ID+'">'+
				 		 	 '<div style="position:relative;float:left;align:left;width:20%;height:100%;text-align:right;padding-top:3px;font-weight:bold;color:gray;">'+SettingDetail.ROOT_ITEM_COLOR_SELECT_LABEL+'&nbsp;&nbsp;</div>'+
               '<div style="position:relative;float:left;align:left;width:30%;height:100%;padding-top:3px;color:gray;"></div>'+
				 		 	 '<div style="position:relative;float:left;align:left;width:20%;height:100%;text-align:right;padding-top:3px;font-weight:bold;color:gray;">'+SettingDetail.ROOT_ITEM_FONT_SELECT_LABEL+'&nbsp;&nbsp;</div>'+
               '<div style="position:relative;float:left;align:left;width:30%;height:100%;padding-top:3px;color:gray;"></div>'+
               '</div>'+
							 '<div class="'+SettingDetail.LINE_SEPARATOR_ID+'">'+
				 		 	 '<div style="position:relative;float:left;align:left;width:20%;height:100%;text-align:right;padding-top:3px;font-weight:bold;color:gray;">'+SettingDetail.ROOT_ITEM_COLOR_SELECTED_LABEL+'&nbsp;&nbsp;</div>'+
               '<div style="position:relative;float:left;align:left;width:30%;height:100%;padding-top:3px;color:gray;"></div>'+
				 		 	 '<div style="position:relative;float:left;align:left;width:20%;height:100%;text-align:right;padding-top:3px;font-weight:bold;color:gray;">'+SettingDetail.ROOT_ITEM_FONT_SELECTED_LABEL+'&nbsp;&nbsp;</div>'+
               '<div style="position:relative;float:left;align:left;width:30%;height:100%;padding-top:3px;color:gray;"></div>'+
               '</div>'+
							 '<div class="'+SettingDetail.LINE_NO_SEPARATOR_ID+'" style="height:15px;">&nbsp;</div>'+
               '</div>'+
							 '<hr class="'+SettingDetail.FOLD_SEPARATOR_ID+'"/>'+
							 **'<div id="'+SettingDetail.WHAT_USED_COLUMNS_HEADER_ID+'">'+
               '<button id="'+SettingDetail.WHAT_USED_COLUMNS_FOLD_BUTTON_ID+'" class="'+SettingDetail.FOLD_BUTTON_CLASS_ID+'">'+SettingsFacade.FOLD_CLOSED+'</button>'+
               '<h1 id="'+SettingDetail.WHAT_USED_COLUMNS_TITLE_ID+'">'+SettingDetail.WHAT_USED_COLUMNS_TITLE_VALUE+'</h1>'+
               '</div>'+**
               '<div>'+ //WHAT_USED_COLUMNS_GROUP_ID
							 '<div class="'+SettingDetail.LINE_NO_SEPARATOR_ID+'">'+
				 		 	 '<div style="position:relative;float:left;align:left;width:20%;height:100%;text-align:right;padding-top:3px;font-weight:bold;color:gray;">'+SettingDetail.WHAT_USED_COLUMNS_LABEL+'&nbsp;&nbsp;</div>'+
               '<div style="position:relative;float:left;align:left;width:30%;height:100%;padding-top:3px;color:gray;"></div>'+
				 		 	 '<div style="position:relative;float:left;align:left;width:20%;height:100%;text-align:right;padding-top:3px;font-weight:bold;color:gray;">'+SettingDetail.WHAT_USED_ITEM_LENGTH_LABEL+'&nbsp;&nbsp;</div>'+
               '<div style="position:relative;float:left;align:left;width:30%;height:100%;padding-top:3px;color:gray;"></div>'+
               '</div>'+
							 '<div class="'+SettingDetail.LINE_SEPARATOR_ID+'">'+
				 		 	 '<div style="position:relative;float:left;align:left;width:20%;height:100%;text-align:right;padding-top:3px;font-weight:bold;color:gray;">'+SettingDetail.WHAT_USED_ITEM_COLOR_LABEL+'&nbsp;&nbsp;</div>'+
               '<div style="position:relative;float:left;align:left;width:30%;height:100%;padding-top:3px;color:gray;"></div>'+
				 		 	 '<div style="position:relative;float:left;align:left;width:20%;height:100%;text-align:right;padding-top:3px;font-weight:bold;color:gray;">'+SettingDetail.WHAT_USED_ITEM_FONT_LABEL+'&nbsp;&nbsp;</div>'+
               '<div style="position:relative;float:left;align:left;width:30%;height:100%;padding-top:3px;color:gray;"></div>'+
               '</div>'+
							 '<div class="'+SettingDetail.LINE_SEPARATOR_ID+'">'+
				 		 	 '<div style="position:relative;float:left;align:left;width:20%;height:100%;text-align:right;padding-top:3px;font-weight:bold;color:gray;">'+SettingDetail.WHAT_USED_ITEM_COLOR_SELECT_LABEL+'&nbsp;&nbsp;</div>'+
               '<div style="position:relative;float:left;align:left;width:30%;height:100%;padding-top:3px;color:gray;"></div>'+
				 		 	 '<div style="position:relative;float:left;align:left;width:20%;height:100%;text-align:right;padding-top:3px;font-weight:bold;color:gray;">'+SettingDetail.WHAT_USED_ITEM_FONT_SELECT_LABEL+'&nbsp;&nbsp;</div>'+
               '<div style="position:relative;float:left;align:left;width:30%;height:100%;padding-top:3px;color:gray;"></div>'+
               '</div>'+
							 '<div class="'+SettingDetail.LINE_SEPARATOR_ID+'">'+
				 		 	 '<div style="position:relative;float:left;align:left;width:20%;height:100%;text-align:right;padding-top:3px;font-weight:bold;color:gray;">'+SettingDetail.WHAT_USED_ITEM_COLOR_SELECTED_LABEL+'&nbsp;&nbsp;</div>'+
               '<div style="position:relative;float:left;align:left;width:30%;height:100%;padding-top:3px;color:gray;"></div>'+
				 		 	 '<div style="position:relative;float:left;align:left;width:20%;height:100%;text-align:right;padding-top:3px;font-weight:bold;color:gray;">'+SettingDetail.WHAT_USED_ITEM_FONT_SELECTED_LABEL+'&nbsp;&nbsp;</div>'+
               '<div style="position:relative;float:left;align:left;width:30%;height:100%;padding-top:3px;color:gray;"></div>'+
               '</div>'+
							 '<div class="'+SettingDetail.LINE_NO_SEPARATOR_ID+'" style="height:15px;">&nbsp;</div>'+
               '</div>'+
							 '<hr class="'+SettingDetail.FOLD_SEPARATOR_ID+'"/>'+
               **'<div id="'+SettingDetail.OBJECT_TYPES_HEADER_ID+'">'+
               '<button id="'+SettingDetail.OBJECT_TYPES_FOLD_BUTTON_ID+'" class="'+SettingDetail.FOLD_BUTTON_CLASS_ID+'">'+SettingsFacade.FOLD_CLOSED+'</button>'+
               '<h1>'+SettingDetail.OBJECT_TYPES_TITLE_VALUE+'</h1>'+
               '</div>'+**
               '<div>'+ //OBJECT_TYPES_GROUP
				 		 	 '<div style="position:relative;float:left;align:left;width:20%;height:100%;text-align:right;padding-top:3px;font-weight:bold;color:gray;">'+SettingDetail.OBJECT_TYPES_MAXIMUM_LABEL+'&nbsp;&nbsp;</div>'+
               '<div style="position:relative;float:left;align:left;width:30%;height:100%;padding-top:3px;color:gray;"></div>'+
               **'<select id="'+SettingDetail.OBJECT_TYPES_AVAILABLE_ID+'" multiple="multiple"></select>'+
               '<button id="'+SettingDetail.OBJECT_TYPES_ADD_BUTTON_ID+'" class="'+SettingDetail.OBJECT_TYPES_SELECT_BUTTON_CLASS_ID+'"/>'+
               '<button id="'+SettingDetail.OBJECT_TYPES_REMOVE_BUTTON_ID+'" class="'+SettingDetail.OBJECT_TYPES_SELECT_BUTTON_CLASS_ID+'"/>'+
               '<select id="'+SettingDetail.OBJECT_TYPES_CHOSEN_ID+'" multiple="multiple"></select>'+**
               '</div>'+
               '<div>'+ //FOOTER
               '<div>'+ //FOOTER_BUTTONS
               '<button id="'+SettingDetail.FOOTER_EDIT_BUTTON_ID+'" class="'+SettingDetail.BUTTON_CLASS_ID+'">'+SettingDetail.EDIT_BUTTON_LABEL+'</button>'+
               '<button id="'+SettingDetail.FOOTER_DELETE_BUTTON_ID+'" class="'+SettingDetail.BUTTON_CLASS_ID+'">'+SettingDetail.DELETE_BUTTON_LABEL+'</button>'+
               '<button id="'+SettingDetail.FOOTER_CLONE_BUTTON_ID+'" class="'+SettingDetail.BUTTON_CLASS_ID+'">'+SettingDetail.CLONE_BUTTON_LABEL+'</button>'+
               '<button id="'+SettingDetail.FOOTER_ACTIVATE_BUTTON_ID+'" class="'+SettingDetail.BUTTON_CLASS_ID+'">'+SettingDetail.ACTIVATE_BUTTON_LABEL+'</button>'+
               '</div>'+ //FOOTER_BUTTONS
               '</div>'+ //FOOTER
               '</div>'; //DISPLAY
*/
    return html;
  }

  this.initializeChildren = function() {
    this.display = $(SettingDetail.DISPLAY_ID);
    this.edit = $(SettingDetail.EDIT_ID);
		this.headerButtons = $(SettingDetail.HEADER_BUTTONS_ID);
		this.headerEditButton = $(SettingDetail.HEADER_EDIT_BUTTON_ID);
		this.headerDeleteButton = $(SettingDetail.HEADER_DELETE_BUTTON_ID);
		this.headerCloneButton = $(SettingDetail.HEADER_CLONE_BUTTON_ID);
		this.headerActivateButton = $(SettingDetail.HEADER_ACTIVATE_BUTTON_ID);
		this.headerEditButtons = $(SettingDetail.HEADER_EDIT_BUTTONS_ID);
		this.headerSaveButton = $(SettingDetail.HEADER_SAVE_BUTTON_ID);
		this.headerCancelButton = $(SettingDetail.HEADER_CANCEL_BUTTON_ID);
		this.name = $(SettingDetail.NAME_ID);
		this.defaultSetting = $(SettingDetail.DEFAULT_ID);
		this.applicationType = $(SettingDetail.APPLICATION_TYPE_ID);
		this.columnsMinimum = $(SettingDetail.COLUMNS_MINIMUM_ID);
		this.columnsMaximum = $(SettingDetail.COLUMNS_MAXIMUM_ID);
		this.rows = $(SettingDetail.ROWS_ID);
		this.numberOfTrailingChars = $(SettingDetail.TRAILING_CHARS_ID);
		this.cby = $(SettingDetail.CBY_ID);
		this.mby = $(SettingDetail.MBY_ID);
		this.whereUsedColumnsFoldButton = $(SettingDetail.WHERE_USED_COLUMNS_FOLD_BUTTON_ID);
		this.whereUsedColumnsGroup = $(SettingDetail.WHERE_USED_COLUMNS_GROUP_ID);
		this.whereUsedColumns = $(SettingDetail.WHERE_USED_COLUMNS_ID);
		this.whereUsedItemLength = $(SettingDetail.WHERE_USED_ITEM_LENGTH_ID);
		this.whereUsedItemColor = $(SettingDetail.WHERE_USED_ITEM_COLOR_ID);
		this.whereUsedItemFont = $(SettingDetail.WHERE_USED_ITEM_FONT_ID);
		this.whereUsedItemColorSelect = $(SettingDetail.WHERE_USED_ITEM_COLOR_SELECT_ID);
		this.whereUsedItemFontSelect = $(SettingDetail.WHERE_USED_ITEM_FONT_SELECT_ID);
		this.whereUsedItemColorSelected = $(SettingDetail.WHERE_USED_ITEM_COLOR_SELECTED_ID);
		this.whereUsedItemFontSelected = $(SettingDetail.WHERE_USED_ITEM_FONT_SELECTED_ID);
		this.rootColumnFoldButton = $(SettingDetail.ROOT_COLUMN_FOLD_BUTTON_ID);
		this.rootColumnGroup = $(SettingDetail.ROOT_COLUMN_GROUP_ID);
		this.rootItemLength = $(SettingDetail.ROOT_ITEM_LENGTH_ID);
		this.rootItemColor = $(SettingDetail.ROOT_ITEM_COLOR_ID);
		this.rootItemFont = $(SettingDetail.ROOT_ITEM_FONT_ID);
		this.rootItemColorSelect = $(SettingDetail.ROOT_ITEM_COLOR_SELECT_ID);
		this.rootItemFontSelect = $(SettingDetail.ROOT_ITEM_FONT_SELECT_ID);
		this.rootItemColorSelected = $(SettingDetail.ROOT_ITEM_COLOR_SELECTED_ID);
		this.rootItemFontSelected = $(SettingDetail.ROOT_ITEM_FONT_SELECTED_ID);
		this.whatUsedColumnsFoldButton = $(SettingDetail.WHAT_USED_COLUMNS_FOLD_BUTTON_ID);
		this.whatUsedColumnsGroup = $(SettingDetail.WHAT_USED_COLUMNS_GROUP_ID);
		this.whatUsedColumns = $(SettingDetail.WHAT_USED_COLUMNS_ID);
		this.whatUsedItemLength = $(SettingDetail.WHAT_USED_ITEM_LENGTH_ID);
		this.whatUsedItemColor = $(SettingDetail.WHAT_USED_ITEM_COLOR_ID);
		this.whatUsedItemFont = $(SettingDetail.WHAT_USED_ITEM_FONT_ID);
		this.whatUsedItemColorSelect = $(SettingDetail.WHAT_USED_ITEM_COLOR_SELECT_ID);
		this.whatUsedItemFontSelect = $(SettingDetail.WHAT_USED_ITEM_FONT_SELECT_ID);
		this.whatUsedItemColorSelected = $(SettingDetail.WHAT_USED_ITEM_COLOR_SELECTED_ID);
		this.whatUsedItemFontSelected = $(SettingDetail.WHAT_USED_ITEM_FONT_SELECTED_ID);
		this.objectTypesFoldButton = $(SettingDetail.OBJECT_TYPES_FOLD_BUTTON_ID);
		this.objectTypesGroup = $(SettingDetail.OBJECT_TYPES_GROUP_ID);
		this.objectTypesMaximum = $(SettingDetail.OBJECT_TYPES_MAXIMUM_ID);
		this.objectTypesAvailable = $(SettingDetail.OBJECT_TYPES_AVAILABLE_ID);
		this.objectTypesAddButton = $(SettingDetail.OBJECT_TYPES_ADD_BUTTON_ID);
		this.objectTypesRemoveButton = $(SettingDetail.OBJECT_TYPES_REMOVE_BUTTON_ID);
		this.objectTypesChosen = $(SettingDetail.OBJECT_TYPES_CHOSEN_ID);
		this.footerButtons = $(SettingDetail.FOOTER_BUTTONS_ID);
		this.footerEditButton = $(SettingDetail.FOOTER_EDIT_BUTTON_ID);
		this.footerDeleteButton = $(SettingDetail.FOOTER_DELETE_BUTTON_ID);
		this.footerCloneButton = $(SettingDetail.FOOTER_CLONE_BUTTON_ID);
		this.footerActivateButton = $(SettingDetail.FOOTER_ACTIVATE_BUTTON_ID);
		this.footerEditButtons = $(SettingDetail.FOOTER_EDIT_BUTTONS_ID);
		this.footerSaveButton = $(SettingDetail.FOOTER_SAVE_BUTTON_ID);
		this.footerCancelButton = $(SettingDetail.FOOTER_CANCEL_BUTTON_ID);
  }

  this.childrenInitialized = function() {
		this.headerEditButton.addEvent(SettingsFacade.EVT_CLICK, this.editButton_clickHandler);
		this.headerDeleteButton.addEvent(SettingsFacade.EVT_CLICK, this.deleteButton_clickHandler);
		this.headerCloneButton.addEvent(SettingsFacade.EVT_CLICK, this.cloneButton_clickHandler);
		this.headerActivateButton.addEvent(SettingsFacade.EVT_CLICK, this.activateButton_clickHandler);
		this.headerSaveButton.addEvent(SettingsFacade.EVT_CLICK, this.saveButton_clickHandler);
		this.headerCancelButton.addEvent(SettingsFacade.EVT_CLICK, this.cancelButton_clickHandler);
 		this.name.addEvent(SettingsFacade.EVT_CHANGE, this.name_changeHandler);
 		this.defaultSetting.addEvent(SettingsFacade.EVT_CHANGE, this.default_changeHandler);
 		this.applicationType.addEvent(SettingsFacade.EVT_CHANGE, this.applicationType_changeHandler);
 		this.columnsMinimum.addEvent(SettingsFacade.EVT_CHANGE, this.columnsMinimum_changeHandler);
 		this.columnsMaximum.addEvent(SettingsFacade.EVT_CHANGE, this.columnsMaximum_changeHandler);
 		this.rows.addEvent(SettingsFacade.EVT_CHANGE, this.rows_changeHandler);
 		this.numberOfTrailingChars.addEvent(SettingsFacade.EVT_CHANGE, this.numberOfTrailingChars_changeHandler);
 		this.whereUsedColumnsFoldButton.addEvent(SettingsFacade.EVT_CLICK, this.whereUsedColumnsFoldButton_clickHandler);
 		this.whereUsedColumns.addEvent(SettingsFacade.EVT_CHANGE, this.whereUsedColumns_changeHandler);
 		this.whereUsedItemLength.addEvent(SettingsFacade.EVT_CHANGE, this.whereUsedItemLength_changeHandler);
 		this.whereUsedItemColor.addEvent(SettingsFacade.EVT_CHANGE, this.whereUsedItemColor_changeHandler);
 		this.whereUsedItemFont.addEvent(SettingsFacade.EVT_CHANGE, this.whereUsedItemFont_changeHandler);
 		this.whereUsedItemColorSelect.addEvent(SettingsFacade.EVT_CHANGE, this.whereUsedItemColorSelect_changeHandler);
 		this.whereUsedItemFontSelect.addEvent(SettingsFacade.EVT_CHANGE, this.whereUsedItemFontSelect_changeHandler);
 		this.whereUsedItemColorSelected.addEvent(SettingsFacade.EVT_CHANGE, this.whereUsedItemColorSelected_changeHandler);
 		this.whereUsedItemFontSelected.addEvent(SettingsFacade.EVT_CHANGE, this.whereUsedItemFontSelected_changeHandler);
 		this.rootColumnFoldButton.addEvent(SettingsFacade.EVT_CLICK, this.rootColumnFoldButton_clickHandler);
 		this.rootItemLength.addEvent(SettingsFacade.EVT_CHANGE, this.rootItemLength_changeHandler);
 		this.rootItemColor.addEvent(SettingsFacade.EVT_CHANGE, this.rootItemColor_changeHandler);
 		this.rootItemFont.addEvent(SettingsFacade.EVT_CHANGE, this.rootItemFont_changeHandler);
 		this.rootItemColorSelect.addEvent(SettingsFacade.EVT_CHANGE, this.rootItemColorSelect_changeHandler);
 		this.rootItemFontSelect.addEvent(SettingsFacade.EVT_CHANGE, this.rootItemFontSelect_changeHandler);
 		this.rootItemColorSelected.addEvent(SettingsFacade.EVT_CHANGE, this.rootItemColorSelected_changeHandler);
 		this.rootItemFontSelected.addEvent(SettingsFacade.EVT_CHANGE, this.rootItemFontSelected_changeHandler);
 		this.whatUsedColumnsFoldButton.addEvent(SettingsFacade.EVT_CLICK, this.whatUsedColumnsFoldButton_clickHandler);
 		this.whatUsedColumns.addEvent(SettingsFacade.EVT_CHANGE, this.whatUsedColumns_changeHandler);
 		this.whatUsedItemLength.addEvent(SettingsFacade.EVT_CHANGE, this.whatUsedItemLength_changeHandler);
 		this.whatUsedItemColor.addEvent(SettingsFacade.EVT_CHANGE, this.whatUsedItemColor_changeHandler);
 		this.whatUsedItemFont.addEvent(SettingsFacade.EVT_CHANGE, this.whatUsedItemFont_changeHandler);
 		this.whatUsedItemColorSelect.addEvent(SettingsFacade.EVT_CHANGE, this.whatUsedItemColorSelect_changeHandler);
 		this.whatUsedItemFontSelect.addEvent(SettingsFacade.EVT_CHANGE, this.whatUsedItemFontSelect_changeHandler);
 		this.whatUsedItemColorSelected.addEvent(SettingsFacade.EVT_CHANGE, this.whatUsedItemColorSelected_changeHandler);
 		this.whatUsedItemFontSelected.addEvent(SettingsFacade.EVT_CHANGE, this.whatUsedItemFontSelected_changeHandler);
 		this.objectTypesFoldButton.addEvent(SettingsFacade.EVT_CLICK, this.objectTypesFoldButton_clickHandler);
 		this.objectTypesMaximum.addEvent(SettingsFacade.EVT_CHANGE, this.objectTypesMaximum_changeHandler);
 		this.objectTypesAddButton.addEvent(SettingsFacade.EVT_CLICK, this.objectTypesAddButton_clickHandler);
 		this.objectTypesRemoveButton.addEvent(SettingsFacade.EVT_CLICK, this.objectTypesRemoveButton_clickHandler);
		this.footerEditButton.addEvent(SettingsFacade.EVT_CLICK, this.editButton_clickHandler);
		this.footerDeleteButton.addEvent(SettingsFacade.EVT_CLICK, this.deleteButton_clickHandler);
		this.footerCloneButton.addEvent(SettingsFacade.EVT_CLICK, this.cloneButton_clickHandler);
		this.footerActivateButton.addEvent(SettingsFacade.EVT_CLICK, this.activateButton_clickHandler);
		this.footerSaveButton.addEvent(SettingsFacade.EVT_CLICK, this.saveButton_clickHandler);
		this.footerCancelButton.addEvent(SettingsFacade.EVT_CLICK, this.cancelButton_clickHandler);
	}

	this.editButton_clickHandler = function() 	               {	this.fireEvent(SettingsFacade.SETTING_EDIT);	}
	this.deleteButton_clickHandler = function() 	             {	this.fireEvent(SettingsFacade.SETTING_DELETE);	}
	this.cloneButton_clickHandler = function() 	               {	this.fireEvent(SettingsFacade.SETTING_CLONE);	}
	this.activateButton_clickHandler = function()              {	this.fireEvent(SettingsFacade.SETTING_ACTIVATE);	}
	this.saveButton_clickHandler = function() 	               {	this.fireEvent(SettingsFacade.SETTING_SAVE);	}
	this.cancelButton_clickHandler = function() 	             {	this.fireEvent(SettingsFacade.SETTING_CANCEL);	}
	this.name_changeHandler = function()                       {	this.fireEvent(SettingsFacade.NAME_CHANGE);	}
	this.default_changeHandler = function()                    {	alert("DEFAULT CHANGED!!!"); this.fireEvent(SettingsFacade.DEFAULT_CHANGE);	}
	this.applicationType_changeHandler = function()            {	this.fireEvent(SettingsFacade.APPLICATION_TYPE_CHANGE);	}
	this.columnsMinimum_changeHandler = function()             {	this.fireEvent(SettingsFacade.COLUMNS_MINIMUM_CHANGE);	}
	this.columnsMaximum_changeHandler = function()             {	this.fireEvent(SettingsFacade.COLUMNS_MAXIMUM_CHANGE);	}
	this.rows_changeHandler = function()                       {	this.fireEvent(SettingsFacade.ROWS_CHANGE);	}
	this.numberOfTrailingChars_changeHandler = function()      {	this.fireEvent(SettingsFacade.TRAILING_CHARS_CHANGE);	}
	this.whereUsedColumnsFoldButton_clickHandler = function()  {  this.fireEvent(SettingsFacade.WHERE_USED_COLUMNS_FOLD);	}
	this.whereUsedColumns_changeHandler = function()           {	this.fireEvent(SettingsFacade.WHERE_USED_COLUMNS_CHANGE);	}
	this.whereUsedItemLength_changeHandler = function()        {	this.fireEvent(SettingsFacade.WHERE_USED_ITEM_LENGTH_CHANGE);	}
	this.whereUsedItemColor_changeHandler = function()         {	this.fireEvent(SettingsFacade.WHERE_USED_ITEM_COLOR_CHANGE);	}
	this.whereUsedItemFont_changeHandler = function()          {	this.fireEvent(SettingsFacade.WHERE_USED_ITEM_FONT_CHANGE);	}
	this.whereUsedItemColorSelect_changeHandler = function()   {	this.fireEvent(SettingsFacade.WHERE_USED_ITEM_COLOR_SELECT_CHANGE);	}
	this.whereUsedItemFontSelect_changeHandler = function()    {	this.fireEvent(SettingsFacade.WHERE_USED_ITEM_FONT_SELECT_CHANGE);	}
	this.whereUsedItemColorSelected_changeHandler = function() {	this.fireEvent(SettingsFacade.WHERE_USED_ITEM_COLOR_SELECTED_CHANGE);	}
	this.whereUsedItemFontSelected_changeHandler = function()  {	this.fireEvent(SettingsFacade.WHERE_USED_ITEM_FONT_SELECTED_CHANGE);	}
	this.rootColumnFoldButton_clickHandler = function()        {	this.fireEvent(SettingsFacade.ROOT_COLUMN_FOLD);	}
	this.rootItemLength_changeHandler = function()             {	this.fireEvent(SettingsFacade.ROOT_ITEM_LENGTH_CHANGE);	}
	this.rootItemColor_changeHandler = function()              {	this.fireEvent(SettingsFacade.ROOT_ITEM_COLOR_CHANGE);	}
	this.rootItemFont_changeHandler = function()               {	this.fireEvent(SettingsFacade.ROOT_ITEM_FONT_CHANGE);	}
	this.rootItemColorSelect_changeHandler = function()        {	this.fireEvent(SettingsFacade.ROOT_ITEM_COLOR_SELECT_CHANGE);	}
	this.rootItemFontSelect_changeHandler = function()         {	this.fireEvent(SettingsFacade.ROOT_ITEM_FONT_SELECT_CHANGE);	}
	this.rootItemColorSelected_changeHandler = function()      {	this.fireEvent(SettingsFacade.ROOT_ITEM_COLOR_SELECTED_CHANGE);	}
	this.rootItemFontSelected_changeHandler = function()       {	this.fireEvent(SettingsFacade.ROOT_ITEM_FONT_SELECTED_CHANGE);	}
	this.whatUsedColumnsFoldButton_clickHandler = function()   {	this.fireEvent(SettingsFacade.WHAT_USED_COLUMNS_FOLD);	}
	this.whatUsedColumns_changeHandler = function()            {	this.fireEvent(SettingsFacade.WHAT_USED_COLUMNS_CHANGE);	}
	this.whatUsedItemLength_changeHandler = function()         {	this.fireEvent(SettingsFacade.WHAT_USED_ITEM_LENGTH_CHANGE);	}
	this.whatUsedItemColor_changeHandler = function()          {	this.fireEvent(SettingsFacade.WHAT_USED_ITEM_COLOR_CHANGE);	}
	this.whatUsedItemFont_changeHandler = function()           {	this.fireEvent(SettingsFacade.WHAT_USED_ITEM_FONT_CHANGE);	}
	this.whatUsedItemColorSelect_changeHandler = function()    {	this.fireEvent(SettingsFacade.WHAT_USED_ITEM_COLOR_SELECT_CHANGE);	}
	this.whatUsedItemFontSelect_changeHandler = function()     {	this.fireEvent(SettingsFacade.WHAT_USED_ITEM_FONT_SELECT_CHANGE);	}
	this.whatUsedItemColorSelected_changeHandler = function()  {	this.fireEvent(SettingsFacade.WHAT_USED_ITEM_COLOR_SELECTED_CHANGE);	}
	this.whatUsedItemFontSelected_changeHandler = function()   {	this.fireEvent(SettingsFacade.WHAT_USED_ITEM_FONT_SELECTED_CHANGE);	}
	this.objectTypesFoldButton_clickHandler = function()       {	this.fireEvent(SettingsFacade.OBJECT_TYPES_FOLD);	}
	this.objectTypesMaximum_changeHandler = function()         {	this.fireEvent(SettingsFacade.OBJECT_TYPES_MAXIMUM_CHANGE);	}
	this.objectTypesAddButton_clickHandler = function()        {	this.fireEvent(SettingsFacade.OBJECT_TYPES_ADD_CLICK);	}
	this.objectTypesRemoveButton_clickHandler = function()     {	this.fireEvent(SettingsFacade.OBJECT_TYPES_REMOVE_CLICK);	}
}
SettingDetail = new Class(new SettingDetail());
SettingDetail.ID = SettingsFacade.SETTING+SettingsFacade.DETAIL; //"settingDetail";
SettingDetail.DISPLAY_ID = SettingDetail.ID+SettingsFacade.DISPLAY; //"settingDetailDisplay";
SettingDetail.EDIT_ID = SettingDetail.ID+SettingsFacade.EDIT; //"settingDetailEdit";
SettingDetail.HEADER_ID = SettingDetail.ID+SettingsFacade.HEADER;
SettingDetail.TITLE_ID = SettingDetail.ID+SettingsFacade.TITLE; //"settingDetailTitle";
SettingDetail.GROUP_ID = SettingDetail.ID+SettingsFacade.GROUP; //"settingDetailGroup";
SettingDetail.FOLD_SEPARATOR_ID = SettingDetail.ID+SettingsFacade.FOLD_SEPARATOR;
SettingDetail.LINE_SEPARATOR_ID = SettingDetail.ID+SettingsFacade.LINE_SEPARATOR;
SettingDetail.LINE_NO_SEPARATOR_ID = SettingDetail.ID+SettingsFacade.LINE_NO_SEPARATOR;
SettingDetail.LIST_SEPARATOR_ID = SettingDetail.ID+SettingsFacade.LIST_SEPARATOR;
SettingDetail.COLUMN_FIRST_ID = SettingDetail.ID+SettingsFacade.COLUMN_FIRST;
SettingDetail.COLUMN_SECOND_ID = SettingDetail.ID+SettingsFacade.COLUMN_SECOND;
SettingDetail.DETAIL_TEXT = "Setting Detail";
SettingDetail.EDIT_TEXT = "Setting Edit";
SettingDetail.BUTTON_CLASS_ID = SettingDetail.ID+SettingsFacade.BUTTON;
SettingDetail.EDIT_BUTTON_LABEL = "Edit";
SettingDetail.DELETE_BUTTON_LABEL = "Delete";
SettingDetail.CLONE_BUTTON_LABEL = "Clone";
SettingDetail.ACTIVATE_BUTTON_LABEL = "Activate";
SettingDetail.SAVE_BUTTON_LABEL = "Save";
SettingDetail.CANCEL_BUTTON_LABEL = "Cancel";
SettingDetail.HEADER_BUTTONS_ID = SettingDetail.ID+SettingsFacade.HEADER_BUTTONS; //"SettingDetailHeaderButtons";
SettingDetail.HEADER_EDIT_BUTTONS_ID = SettingDetail.ID+SettingsFacade.HEADER_EDIT_BUTTONS; //"SettingDetailHeaderEditButtons";
SettingDetail.HEADER_EDIT_BUTTON_ID = SettingDetail.ID+SettingsFacade.HEADER_EDIT_BUTTON; //"settingDetailHeaderEditButton";
SettingDetail.HEADER_DELETE_BUTTON_ID = SettingDetail.ID+SettingsFacade.HEADER_DELETE_BUTTON; //"settingDetailHeaderDeleteButton";
SettingDetail.HEADER_CLONE_BUTTON_ID = SettingDetail.ID+SettingsFacade.HEADER_CLONE_BUTTON; //"settingDetailHeaderCloneButton";
SettingDetail.HEADER_ACTIVATE_BUTTON_ID = SettingDetail.ID+SettingsFacade.HEADER_ACTIVATE_BUTTON; //"settingDetailHeaderActivateButton";
SettingDetail.HEADER_SAVE_BUTTON_ID = SettingDetail.ID+SettingsFacade.HEADER_SAVE_BUTTON; //"settingDetailHeaderSaveButton";
SettingDetail.HEADER_CANCEL_BUTTON_ID = SettingDetail.ID+SettingsFacade.HEADER_CANCEL_BUTTON; //"settingDetailHeaderCancelButton";
SettingDetail.NAME_ID = SettingDetail.ID+SettingsFacade.NAME; //"Name";
SettingDetail.NAME_LABEL = "Name";
SettingDetail.DEFAULT_ID = SettingDetail.ID+SettingsFacade.DEFAULT; //"Default";
SettingDetail.DEFAULT_LABEL = "Is default";
SettingDetail.APPLICATION_TYPE_ID = SettingDetail.ID+SettingsFacade.APPLICATION_TYPE; //"ApplicationType";
SettingDetail.APPLICATION_TYPE_LABEL = "Application type";
SettingDetail.APPLICATION_TYPE_BROWSER_LABEL = "Browser";
SettingDetail.APPLICATION_TYPE_EXPLORER_LABEL = "Explorer";
SettingDetail.APPLICATION_TYPE_COMPOSER_LABEL = "Composer";
SettingDetail.COLUMNS_MINIMUM_ID = SettingDetail.ID+SettingsFacade.COLUMNS_MINIMUM; //"ColumnsMinimum";
SettingDetail.COLUMNS_MINIMUM_LABEL = "Columns Minimum";
SettingDetail.COLUMNS_MAXIMUM_ID = SettingDetail.ID+SettingsFacade.COLUMNS_MAXIMUM; //"ColumnsMaximum";
SettingDetail.COLUMNS_MAXIMUM_LABEL = "Columns Maximum";
SettingDetail.ROWS_ID = SettingDetail.ID+SettingsFacade.ROWS; //"Rows";
SettingDetail.ROWS_LABEL = "Rows";
SettingDetail.TRAILING_CHARS_ID = SettingDetail.ID+SettingsFacade.TRAILING_CHARS; //"TrailingChars";
SettingDetail.TRAILING_CHARS_LABEL = "Item Trailing Characters Removed";
SettingDetail.CBY_ID = SettingDetail.ID+SettingsFacade.CREATED_BY; //"CreatedBy";
SettingDetail.CBY_LABEL = "Created By";
SettingDetail.MBY_ID = SettingDetail.ID+SettingsFacade.MODIFIED_BY; //"ModifiedBy";
SettingDetail.MBY_LABEL = "Last Modified By";
SettingDetail.FOLD_BUTTON_CLASS_ID = SettingDetail.ID+SettingsFacade.FOLD_BUTTON; //"FoldButton";
SettingDetail.WHERE_USED_COLUMNS_HEADER_ID = SettingDetail.ID+SettingsFacade.WHERE_USED_COLUMNS_HEADER;
SettingDetail.WHERE_USED_COLUMNS_FOLD_BUTTON_ID = SettingDetail.ID+SettingsFacade.WHERE_USED_COLUMNS_FOLD_BUTTON;
SettingDetail.WHERE_USED_COLUMNS_TITLE_ID = SettingDetail.ID+SettingsFacade.WHERE_USED_COLUMNS_TITLE; //"WhereUsedColumnsTitle";
SettingDetail.WHERE_USED_COLUMNS_TITLE_VALUE = "Where-used Columns";
SettingDetail.WHERE_USED_COLUMNS_GROUP_ID = SettingDetail.ID+SettingsFacade.WHERE_USED_COLUMNS_GROUP; //"WhereUsedColumnsGroup";
SettingDetail.WHERE_USED_COLUMNS_ID = SettingDetail.ID+SettingsFacade.WHERE_USED_COLUMNS; //"WhereUsedColumns";
SettingDetail.WHERE_USED_COLUMNS_LABEL = "Columns";
SettingDetail.WHERE_USED_ITEM_LENGTH_ID = SettingDetail.ID+SettingsFacade.WHERE_USED_ITEM_LENGTH; //"WhereUsedItemLength";
SettingDetail.WHERE_USED_ITEM_COLOR_ID = SettingDetail.ID+SettingsFacade.WHERE_USED_ITEM_COLOR; //"WhereUsedItemColor";
SettingDetail.WHERE_USED_ITEM_COLOR_LABEL = "Item Color";
SettingDetail.WHERE_USED_ITEM_FONT_ID = SettingDetail.ID+SettingsFacade.WHERE_USED_ITEM_FONT; //"WhereUsedItemFont";
SettingDetail.WHERE_USED_ITEM_FONT_LABEL = "Font";
SettingDetail.WHERE_USED_ITEM_COLOR_SELECT_ID = SettingDetail.ID+SettingsFacade.WHERE_USED_ITEM_COLOR_SELECT; //"WhereUsedItemColorSelect";
SettingDetail.WHERE_USED_ITEM_COLOR_SELECT_LABEL = "Item Select Color";
SettingDetail.WHERE_USED_ITEM_FONT_SELECT_ID = SettingDetail.ID+SettingsFacade.WHERE_USED_ITEM_FONT_SELECT; //"WhereUsedItemFontSelect";
SettingDetail.WHERE_USED_ITEM_FONT_SELECT_LABEL = "Font";
SettingDetail.WHERE_USED_ITEM_COLOR_SELECTED_ID = SettingDetail.ID+SettingsFacade.WHERE_USED_ITEM_COLOR_SELECTED; //"WhereUsedItemColorSelected";
SettingDetail.WHERE_USED_ITEM_COLOR_SELECTED_LABEL = "Item Selected Color";
SettingDetail.WHERE_USED_ITEM_FONT_SELECTED_ID = SettingDetail.ID+SettingsFacade.WHERE_USED_ITEM_FONT_SELECTED; //"WhereUsedItemFontSelected";
SettingDetail.WHERE_USED_ITEM_FONT_SELECTED_LABEL = "Font";
SettingDetail.ROOT_COLUMN_HEADER_ID = SettingDetail.ID+SettingsFacade.ROOT_COLUMN_HEADER;
SettingDetail.ROOT_COLUMN_FOLD_BUTTON_ID = SettingDetail.ID+SettingsFacade.ROOT_COLUMN_FOLD_BUTTON; //"RootColumnFoldButton";
SettingDetail.ROOT_COLUMN_TITLE_ID = SettingDetail.ID+SettingsFacade.ROOT_COLUMN_TITLE; //"RootColumnTitle";
SettingDetail.ROOT_COLUMN_TITLE_VALUE = "Root Column";
SettingDetail.ROOT_COLUMN_GROUP_ID = SettingDetail.ID+SettingsFacade.ROOT_COLUMN_GROUP; //"RootColumnGroup";
SettingDetail.ROOT_COLUMN_ID = SettingDetail.ID+SettingsFacade.ROOT_COLUMN; //"RootColumn";
SettingDetail.ROOT_COLUMN_LABEL = "Columns";
SettingDetail.ROOT_ITEM_LENGTH_ID = SettingDetail.ID+SettingsFacade.ROOT_ITEM_LENGTH; //"RootItemLength";
SettingDetail.ROOT_ITEM_COLOR_ID = SettingDetail.ID+SettingsFacade.ROOT_ITEM_COLOR; //"RootItemColor";
SettingDetail.ROOT_ITEM_COLOR_LABEL = "Item Color";
SettingDetail.ROOT_ITEM_FONT_ID = SettingDetail.ID+SettingsFacade.ROOT_ITEM_FONT; //"RootItemFont";
SettingDetail.ROOT_ITEM_FONT_LABEL = "Font";
SettingDetail.ROOT_ITEM_COLOR_SELECT_ID = SettingDetail.ID+SettingsFacade.ROOT_ITEM_COLOR_SELECT; //"RootItemColorSelect";
SettingDetail.ROOT_ITEM_COLOR_SELECT_LABEL = "Item Select Color";
SettingDetail.ROOT_ITEM_FONT_SELECT_ID = SettingDetail.ID+SettingsFacade.ROOT_ITEM_FONT_SELECT; //"RootItemFontSelect";
SettingDetail.ROOT_ITEM_FONT_SELECT_LABEL = "Font";
SettingDetail.ROOT_ITEM_COLOR_SELECTED_ID = SettingDetail.ID+SettingsFacade.ROOT_ITEM_COLOR_SELECTED; //"RootItemColorSelected";
SettingDetail.ROOT_ITEM_COLOR_SELECTED_LABEL = "Item Selected Color";
SettingDetail.ROOT_ITEM_FONT_SELECTED_ID = SettingDetail.ID+SettingsFacade.ROOT_ITEM_FONT_SELECTED; //"RootItemFontSelected";
SettingDetail.ROOT_ITEM_FONT_SELECTED_LABEL = "Font";
SettingDetail.WHAT_USED_COLUMNS_HEADER_ID = SettingDetail.ID+SettingsFacade.WHAT_USED_COLUMNS_HEADER;
SettingDetail.WHAT_USED_COLUMNS_FOLD_BUTTON_ID = SettingDetail.ID+SettingsFacade.WHAT_USED_COLUMNS_FOLD_BUTTON; //"WhatUsedColumnsFoldButton";
SettingDetail.WHAT_USED_COLUMNS_TITLE_ID = SettingDetail.ID+SettingsFacade.WHAT_USED_COLUMNS_TITLE; //"WhatUsedColumnsTitle";
SettingDetail.WHAT_USED_COLUMNS_TITLE_VALUE = "What-used Columns";
SettingDetail.WHAT_USED_COLUMNS_GROUP_ID = SettingDetail.ID+SettingsFacade.WHAT_USED_COLUMNS_GROUP; //"WhatUsedColumnsGroup";
SettingDetail.WHAT_USED_COLUMNS_ID = SettingDetail.ID+SettingsFacade.WHAT_USED_COLUMNS; //"WhatUsedColumns";
SettingDetail.WHAT_USED_COLUMNS_LABEL = "Columns";
SettingDetail.WHAT_USED_ITEM_LENGTH_ID = SettingDetail.ID+SettingsFacade.WHAT_USED_ITEM_LENGTH; //"WhatUsedItemLength";
SettingDetail.WHAT_USED_ITEM_COLOR_ID = SettingDetail.ID+SettingsFacade.WHAT_USED_ITEM_COLOR; //"WhatUsedItemColor";
SettingDetail.WHAT_USED_ITEM_COLOR_LABEL = "Item Color";
SettingDetail.WHAT_USED_ITEM_FONT_ID = SettingDetail.ID+SettingsFacade.WHAT_USED_ITEM_FONT; //"WhatUsedItemFont";
SettingDetail.WHAT_USED_ITEM_FONT_LABEL = "Font";
SettingDetail.WHAT_USED_ITEM_COLOR_SELECT_ID = SettingDetail.ID+SettingsFacade.WHAT_USED_ITEM_COLOR_SELECT; //"WhatUsedItemColorSelect";
SettingDetail.WHAT_USED_ITEM_COLOR_SELECT_LABEL = "Item Select Color";
SettingDetail.WHAT_USED_ITEM_FONT_SELECT_ID = SettingDetail.ID+SettingsFacade.WHAT_USED_ITEM_FONT_SELECT; //"WhatUsedItemFontSelect";
SettingDetail.WHAT_USED_ITEM_FONT_SELECT_LABEL = "Font";
SettingDetail.WHAT_USED_ITEM_COLOR_SELECTED_ID = SettingDetail.ID+SettingsFacade.WHAT_USED_ITEM_COLOR_SELECTED; //"WhatUsedItemColorSelected";
SettingDetail.WHAT_USED_ITEM_COLOR_SELECTED_LABEL = "Item Selected Color";
SettingDetail.WHAT_USED_ITEM_FONT_SELECTED_ID = SettingDetail.ID+SettingsFacade.WHAT_USED_ITEM_FONT_SELECTED; //"WhatUsedItemFontSelected";
SettingDetail.WHAT_USED_ITEM_FONT_SELECTED_LABEL = "Font";
SettingDetail.OBJECT_TYPES_HEADER_ID = SettingDetail.ID+SettingsFacade.OBJECT_TYPES_HEADER;
SettingDetail.OBJECT_TYPES_FOLD_BUTTON_ID = SettingDetail.ID+SettingsFacade.OBJECT_TYPES_FOLD_BUTTON; //"ObjectTypesFoldButton";
SettingDetail.OBJECT_TYPES_TITLE_ID = SettingDetail.ID+SettingsFacade.OBJECT_TYPES_TITLE; //"ObjectTypesTitle";
SettingDetail.OBJECT_TYPES_TITLE_VALUE = "Object Types";
SettingDetail.OBJECT_TYPES_GROUP_ID = SettingDetail.ID+SettingsFacade.OBJECT_TYPES_GROUP; //"ObjectTypesGroup";
SettingDetail.OBJECT_TYPES_MAXIMUM_ID = SettingDetail.ID+SettingsFacade.OBJECT_TYPES_MAXIMUM; //"ObjectTypesMaximum";
SettingDetail.OBJECT_TYPES_MAXIMUM_LABEL = "Types Maximum";
SettingDetail.OBJECT_TYPES_LABEL = "Types";
SettingDetail.OBJECT_TYPES_SELECT_BUTTON_CLASS_ID = SettingDetail.ID+SettingsFacade.OBJECT_TYPES_SELECT_BUTTON; //"ObjectTypesSelectButton";
SettingDetail.OBJECT_TYPES_AVAILABLE_ID = SettingDetail.ID+SettingsFacade.OBJECT_TYPES_AVAILABLE; //"ObjectTypesAvailable";
SettingDetail.OBJECT_TYPES_ADD_BUTTON_ID = SettingDetail.ID+SettingsFacade.OBJECT_TYPES_ADD_BUTTON; //"ObjectTypesAddButton";
SettingDetail.OBJECT_TYPES_REMOVE_BUTTON_ID = SettingDetail.ID+SettingsFacade.OBJECT_TYPES_REMOVE_BUTTON; //"ObjectTypesRemoveButton";
SettingDetail.OBJECT_TYPES_CHOSEN_ID = SettingDetail.ID+SettingsFacade.OBJECT_TYPES_CHOSEN; //"ObjectTypesChosen";
SettingDetail.FOOTER_ID = SettingDetail.ID+SettingsFacade.FOOTER;
SettingDetail.FOOTER_BUTTONS_ID = SettingDetail.ID+SettingsFacade.FOOTER_BUTTONS; //"SettingDetailFooterButtons";
SettingDetail.FOOTER_EDIT_BUTTONS_ID = SettingDetail.ID+SettingsFacade.FOOTER_EDIT_BUTTONS; //"SettingDetailFooterEditButtons";
SettingDetail.FOOTER_EDIT_BUTTON_ID = SettingDetail.ID+SettingsFacade.FOOTER_EDIT_BUTTON; //"settingDetailFooterEditButton";
SettingDetail.FOOTER_DELETE_BUTTON_ID = SettingDetail.ID+SettingsFacade.FOOTER_DELETE_BUTTON; //"settingDetailFooterDeleteButton";
SettingDetail.FOOTER_CLONE_BUTTON_ID = SettingDetail.ID+SettingsFacade.FOOTER_CLONE_BUTTON; //"settingDetailFooterCloneButton";
SettingDetail.FOOTER_ACTIVATE_BUTTON_ID = SettingDetail.ID+SettingsFacade.FOOTER_ACTIVATE_BUTTON; //"settingDetailFooterActivateButton";
SettingDetail.FOOTER_SAVE_BUTTON_ID = SettingDetail.ID+SettingsFacade.FOOTER_SAVE_BUTTON; //"settingDetailFooterSaveButton";
SettingDetail.FOOTER_CANCEL_BUTTON_ID = SettingDetail.ID+SettingsFacade.FOOTER_CANCEL_BUTTON; //"settingDetailFooterCancelButton";

//Class: SettingList
var SettingList = function() {
  this.Extends = SjamayeeUIComponent;

	this.newButton = null;
	this.selectAll = null;
	this.lines = null;

	this.initialize = function() {
    //var html = '<div id="'+SettingList.TITLE_ID+'">&nbsp;</div>'+
    //var html = '<h1 id="'+SettingList.TITLE_ID+'">'+SettingList.TITLE_VALUE+'</h1>'+
    var html = '<div style="width:100%;height:25px;">'+
               '<div id="'+SettingList.TITLE_ID+'">'+SettingList.TITLE_VALUE+'</div>'+
               '<div id="'+SettingList.BUTTONS_ID+'">'+
               //'<button id="'+SettingList.NEW_BUTTON_ID+'" class="'+SettingList.BUTTON_CLASS_ID+'">'+SettingList.NEW_BUTTON_LABEL+'</button>'+
               '<button id="'+SettingList.NEW_BUTTON_ID+'">'+SettingList.NEW_BUTTON_LABEL+'</button>'+
               '</div>'+
               '</div>'+
               '<div id="'+SettingList.HEADER_ID+'">'+
               '<div id="'+SettingList.HEADER_ACTION_ID+'">'+
               '<input id="'+SettingList.HEADER_ACTION_SELECT_ID+'" type="checkbox"/>'+
               '<div id="'+SettingList.HEADER_ACTION_LABEL_ID+'">'+SettingList.HEADER_ACTION_TEXT+'</div>'+
               '</div>'+
               '<div id="'+SettingList.HEADER_NAME_ID+'">'+
               '<div id="'+SettingList.HEADER_NAME_LABEL_ID+'">'+SettingList.HEADER_NAME_TEXT+'</div>'+
               '</div>'+
               '<div id="'+SettingList.HEADER_DEFAULT_ID+'">'+
               '<div id="'+SettingList.HEADER_DEFAULT_LABEL_ID+'">'+SettingList.HEADER_DEFAULT_TEXT+'</div>'+
               '</div>'+               
               '</div>'+               
               '<div id="'+SettingList.BODY_ID+'">'+
               '<div id="'+SettingList.BODY_LINE_ID+'">'+
               '<div id="'+SettingList.LINE_ACTION_ID+'">'+
               '<input id="'+SettingList.LINE_ACTION_SELECT_ID+'" type="checkbox"/>'+
               '<a id="'+SettingList.LINE_ACTION_EDIT_ID+'" href="#">&nbsp;|&nbsp;'+SettingList.LINE_ACTION_EDIT_TEXT+'</a>'+
               '<a id="'+SettingList.LINE_ACTION_DELETE_ID+'" href="#">&nbsp;|&nbsp;'+SettingList.LINE_ACTION_DELETE_TEXT+'</a>'+
               '</div>'+
               '<div id="'+SettingList.LINE_NAME_ID+'"><a href="#"/></div>'+
               '<div id="'+SettingList.LINE_DEFAULT_ID+'"><input type="checkbox"></input></div>'+
               '</div>'+
               '</div>';
    this.parent(SettingList.ID,{html: html});
    this.newButton_clickHandler = this.newButton_clickHandler.bindWithEvent(this);
    this.selectAll_clickHandler = this.selectAll_clickHandler.bindWithEvent(this);
    this.name_clickHandler = this.name_clickHandler.bindWithEvent(this);
  }

  this.initializeChildren = function() {
		this.newButton = $(SettingList.NEW_BUTTON_ID);
		this.selectAll = $(SettingList.HEADER_ACTION_SELECT_ID);
  }

  this.childrenInitialized = function() {
 		this.newButton.addEvent(SettingsFacade.EVT_CLICK, this.newButton_clickHandler);
 		this.selectAll.addEvent(SettingsFacade.EVT_CLICK, this.selectAll_clickHandler);
  }

  this.newButton_clickHandler = function() { this.fireEvent(SettingsFacade.SETTING_NEW);	}
  this.selectAll_clickHandler = function() { this.fireEvent(SettingsFacade.SELECT_ALL);	}
  this.name_clickHandler = function()      { this.fireEvent(SettingsFacade.SETTING_DETAIL);	}
}
SettingList = new Class(new SettingList());
SettingList.ID = SettingsFacade.SETTING+SettingsFacade.LIST; //"settingList";
SettingList.TITLE_ID = SettingList.ID+SettingsFacade.TITLE; //"settingListTitle";
SettingList.TITLE_VALUE = "Settings";
SettingList.BUTTON_CLASS_ID = SettingList.ID+SettingsFacade.BUTTON; //"settingListButton";
SettingList.BUTTONS_ID = SettingList.ID+SettingsFacade.BUTTONS; //"settingListButtons";
SettingList.NEW_BUTTON_ID = SettingList.ID+SettingsFacade.NEW_BUTTON; //"settingListNewButton";
SettingList.NEW_BUTTON_LABEL = "New";
SettingList.HEADER_ID = SettingList.ID+SettingsFacade.HEADER; //"settingListHeader";
SettingList.HEADER_ACTION_ID = SettingList.ID+SettingsFacade.HEADER_ACTION; //"settingListHeaderAction";
SettingList.HEADER_ACTION_SELECT_ID = SettingList.ID+SettingsFacade.HEADER_ACTION_SELECT; //"settingListHeaderActionSelect";
SettingList.HEADER_ACTION_LABEL_ID = SettingList.ID+SettingsFacade.HEADER_ACTION_LABEL; //"settingListHeaderActionLabel";
SettingList.HEADER_ACTION_TEXT = "Action";
SettingList.HEADER_NAME_ID = SettingList.ID+SettingsFacade.HEADER_NAME; //"settingListHeaderName";
SettingList.HEADER_NAME_LABEL_ID = SettingList.ID+SettingsFacade.HEADER_NAME_LABEL; //"settingListHeaderNameLabel";
SettingList.HEADER_NAME_TEXT = "Name";
SettingList.HEADER_DEFAULT_ID = SettingList.ID+SettingsFacade.HEADER_DEFAULT; //"settingListHeaderDefault";
SettingList.HEADER_DEFAULT_LABEL_ID = SettingList.ID+SettingsFacade.HEADER_DEFAULT_LABEL; //"settingListHeaderDefaultLabel";
SettingList.HEADER_DEFAULT_TEXT = "Is Default";
SettingList.BODY_ID = SettingList.ID+SettingsFacade.BODY; //"settingListBody";
SettingList.BODY_LINE_ID = SettingList.ID+SettingsFacade.BODY_LINE; //"settingListBodyLine";
SettingList.LINE_ACTION_ID = SettingList.ID+SettingsFacade.LINE_ACTION; //"settingListLineAction";
SettingList.LINE_ACTION_SELECT_ID = SettingList.ID+SettingsFacade.LINE_ACTION_SELECT; //"settingListLineActionSelect";
SettingList.LINE_ACTION_EDIT_ID = SettingList.ID+SettingsFacade.LINE_ACTION_EDIT; //"settingListLineActionEdit";
SettingList.LINE_ACTION_EDIT_TEXT = "Edit";
SettingList.LINE_ACTION_DELETE_ID = SettingList.ID+SettingsFacade.LINE_ACTION_DELETE; //"settingListLineActionDelete";
SettingList.LINE_ACTION_DELETE_TEXT = "Del";
SettingList.LINE_NAME_ID = SettingList.ID+SettingsFacade.NAME; //"settingListLineName";
SettingList.LINE_DEFAULT_ID = SettingList.ID+SettingsFacade.DEFAULT; //"settingListLineDefault";

////////////////////////////////////////////////////////
//Mediators ////////////////////////////////////////////
////////////////////////////////////////////////////////
//Abstract
//Class: SettingsMediator
var SettingsMediator = function() {
	this.Extends = Mediator;

	this.initialize = function(name,viewComponent)	{
		this.parent(name,viewComponent);
	}

	this.hide = function() {
		var list = this.facade.retrieveMediator(SettingListMediator.ID).getViewComponent();
    list.setAttribute("style","display:none;");
		var detail = this.facade.retrieveMediator(SettingDetailMediator.ID).getViewComponent();
    detail.setAttribute("style","display:none;");
	}

  this.setEdit = function() {
    this.facade.setMode(SettingsFacade.MODE_EDIT);
		var detail = this.facade.retrieveMediator(SettingDetailMediator.ID).getViewComponent();    
    detail.display.setAttribute("style","display:none;");    
    detail.edit.setAttribute("style","display:block;");    
  }
  this.setDisplay = function() {
    this.facade.setMode(SettingsFacade.MODE_DISPLAY);
		var detail = this.facade.retrieveMediator(SettingDetailMediator.ID).getViewComponent();    
    detail.edit.setAttribute("style","display:none;");    
    detail.display.setAttribute("style","display:block;");
  }

	this.isEdit = function()    { return (this.facade.getMode() == SettingsFacade.MODE_EDIT); }
	this.isDisplay = function() { return (this.facade.getMode() == SettingsFacade.MODE_DISPLAY); }	
}
SettingsMediator = new Class(new SettingsMediator());

//Class: SettingListMediator
var SettingListMediator = function() {
	this.Extends = SettingsMediator;
	this.list = null;

	this.initialize = function(viewComponent)	{
	  //alert("SettingDetailMediator");
		this.parent(SettingListMediator.ID,viewComponent);
  	this.list = this.getViewComponent();
  	this.onNewButtonClick = this.onNewButtonClick.bindWithEvent(this);
  	this.onSelectAllClick = this.onSelectAllClick.bindWithEvent(this);
  	this.onNameClick = this.onNameClick.bindWithEvent(this);
  	this.list.addEvent(SettingsFacade.SETTING_NEW, this.onNewButtonClick);
  	this.list.addEvent(SettingsFacade.SELECT_ALL, this.onSelectAllClick);		
  	this.list.addEvent(SettingsFacade.SETTING_DETAIL, this.onNameClick);
  	//Mode - Display
  	this.setEdit(); //Display();
	}

	this.onNewButtonClick = function() { this.sendNotification(SettingsFacade.SETTING_NEW); }
	this.onSelectAllClick = function() {
	  //*** Select All ***
	}
	this.onNameClick = function()      { this.sendNotification(SettingsFacade.SETTING_DETAIL); }

  this.listNotificationInterests = function()	{
    var result = this.parent();
    return result.concat([
      SettingsFacade.SETTING_LIST
		]);
	}

	this.handleNotification = function(note)	{
	  this.parent(note);
		var app = this.facade.getApplication();
		switch (note.getName())	{
    	case SettingsFacade.SETTING_LIST:
    	alert("SettingLISTMediator/handleNotification - SETTING_LIST");
    	this.hide();
    	this.list.setAttribute("style","width:100%;height:700px;display:block;");			
    	break;
		}
	}
}
SettingListMediator = new Class(new SettingListMediator());
SettingListMediator.ID = SettingsFacade.SETTING_LIST_MEDIATOR; //"SettingListMediator";

//Class: SettingDetailMediator
var SettingDetailMediator = function() {
	this.Extends = SettingsMediator;
	this.detail = null;
	this.whereUsedColumnsFolded = false;
	this.rootColumnFolded = false;
	this.whatUsedColumnsFolded = false;
	this.objectTypesFolded = false;

  this.initialize = function(viewComponent)	{
    //alert("SettingListMediator");
  	this.parent(SettingDetailMediator.ID,viewComponent);
  	this.detail = this.getViewComponent();
  	this.onEditButtonClick = this.onEditButtonClick.bindWithEvent(this);
  	this.onDeleteButtonClick = this.onDeleteButtonClick.bindWithEvent(this);
  	this.onCloneButtonClick = this.onCloneButtonClick.bindWithEvent(this);
  	this.onActivateButtonClick = this.onActivateButtonClick.bindWithEvent(this);
  	this.onSaveButtonClick = this.onSaveButtonClick.bindWithEvent(this);
  	this.onCancelButtonClick = this.onCancelButtonClick.bindWithEvent(this);
  	this.onWhereUsedColumnsFoldButtonClick = this.onWhereUsedColumnsFoldButtonClick.bindWithEvent(this);
  	this.onRootColumnFoldButtonClick = this.onRootColumnFoldButtonClick.bindWithEvent(this);
  	this.onWhatUsedColumnsFoldButtonClick = this.onWhatUsedColumnsFoldButtonClick.bindWithEvent(this);
  	this.onObjectTypesFoldButtonClick = this.onObjectTypesFoldButtonClick.bindWithEvent(this);
  	this.detail.addEvent(SettingsFacade.SETTING_EDIT, this.onEditButtonClick);
  	this.detail.addEvent(SettingsFacade.SETTING_DELETE, this.onDeleteButtonClick);		
  	this.detail.addEvent(SettingsFacade.SETTING_CLONE, this.onCloneButtonClick);		
  	this.detail.addEvent(SettingsFacade.SETTING_ACTIVATE, this.onActivateButtonClick);		
  	this.detail.addEvent(SettingsFacade.SETTING_SAVE, this.onSaveButtonClick);
  	this.detail.addEvent(SettingsFacade.SETTING_CANCEL, this.onCancelButtonClick);
  	this.detail.addEvent(SettingsFacade.WHERE_USED_COLUMNS_FOLD, this.onWhereUsedColumnsFoldButtonClick);
  	this.detail.addEvent(SettingsFacade.ROOT_COLUMN_FOLD, this.onRootColumnFoldButtonClick);
  	this.detail.addEvent(SettingsFacade.WHAT_USED_COLUMNS_FOLD, this.onWhatUsedColumnsFoldButtonClick);
  	this.detail.addEvent(SettingsFacade.OBJECT_TYPES_FOLD, this.onObjectTypesFoldButtonClick);
  }

  this.onEditButtonClick = function()                 { this.sendNotification(SettingsFacade.SETTING_EDIT); }
  this.onDeleteButtonClick = function()               { this.sendNotification(SettingsFacade.SETTING_DELETE); }
  this.onCloneButtonClick = function()                { this.sendNotification(SettingsFacade.SETTING_CLONE); }
  this.onActivateButtonClick = function()             { this.sendNotification(SettingsFacade.SETTING_ACTIVATE); }
  this.onSaveButtonClick = function()                 { this.sendNotification(SettingsFacade.SETTING_SAVE); }
  this.onCancelButtonClick = function()               { this.sendNotification(SettingsFacade.SETTING_CANCEL); }
  this.onWhereUsedColumnsFoldButtonClick = function() { this.sendNotification(SettingsFacade.WHERE_USED_COLUMNS_FOLD); }
  this.onRootColumnFoldButtonClick = function()       { this.sendNotification(SettingsFacade.ROOT_COLUMN_FOLD); }
  this.onWhatUsedColumnsFoldButtonClick = function()  { this.sendNotification(SettingsFacade.WHAT_USED_COLUMNS_FOLD); }
  this.onObjectTypesFoldButtonClick = function()      { this.sendNotification(SettingsFacade.OBJECT_TYPES_FOLD); }

  this.listNotificationInterests = function()	{
    var result = this.parent();
    return result.concat([
      SettingsFacade.SETTING_ACTIVATE,
      SettingsFacade.SETTING_CANCEL,
      SettingsFacade.SETTING_CLONE,
      SettingsFacade.SETTING_DELETE,
      SettingsFacade.SETTING_DETAIL,
      SettingsFacade.SETTING_EDIT,
      SettingsFacade.SETTING_NEW,
      SettingsFacade.SETTING_SAVE,
      SettingsFacade.WHERE_USED_COLUMNS_FOLD,
      SettingsFacade.ROOT_COLUMN_FOLD,
      SettingsFacade.WHAT_USED_COLUMNS_FOLD,
      SettingsFacade.OBJECT_TYPES_FOLD
		]);
	}

	this.handleNotification = function(note)	{
	  this.parent(note);
		var app = this.facade.getApplication();
		switch (note.getName())	{
    	case SettingsFacade.SETTING_ACTIVATE:
    	alert("SettingDetailMediator/handleNotification - SETTING_ACTIVATE");
    	this.setDisplay();
    	break;
    	case SettingsFacade.SETTING_CANCEL:
    	alert("SettingDetailMediator/handleNotification - SETTING_CANCEL");
    	this.setDisplay();
      this.sendNotification(SettingsFacade.SETTING_LIST);
    	break;
    	case SettingsFacade.SETTING_CLONE:
    	alert("SettingDetailMediator/handleNotification - SETTING_CLONE");
    	break;
    	case SettingsFacade.SETTING_DELETE:
    	alert("SettingDetailMediator/handleNotification - SETTING_DELETE");
    	this.hide();
    	this.setDisplay();
    	this.detail.setAttribute("style","display:block;");
    	break;
    	case SettingsFacade.SETTING_DETAIL:
    	alert("SettingDetailMediator/handleNotification - SETTING_DETAIL");
    	this.hide();
    	this.setDisplay();
    	this.detail.setAttribute("style","display:block;");
    	break;
    	case SettingsFacade.SETTING_EDIT:
    	alert("SettingDetailMediator/handleNotification - SETTING_EDIT");
    	this.hide();
    	this.setEdit();
    	this.detail.setAttribute("style","display:block;");
    	break;
    	case SettingsFacade.SETTING_NEW:
    	alert("SettingDetailMediator/handleNotification - SETTING_NEW");
    	this.hide();
    	this.setEdit();
      /*this.sendNotification(SettingsFacade.WHERE_USED_COLUMNS_FOLD,SettingsFacade.FOLD_OPEN);
      this.sendNotification(SettingsFacade.ROOT_COLUMN_FOLD,SettingsFacade.FOLD_OPEN);
      this.sendNotification(SettingsFacade.WHAT_USED_COLUMNS_FOLD,SettingsFacade.FOLD_OPEN);
      this.sendNotification(SettingsFacade.OBJECT_TYPES_FOLD,SettingsFacade.FOLD_OPEN);*/
    	/*this.detail.headerButtons.setAttribute("style","display:none;");
    	this.detail.headerEditButtons.setAttribute("style","display:block;");
    	this.detail.footerButtons.setAttribute("style","display:none;");
    	this.detail.footerEditButtons.setAttribute("style","display:block;");*/
    	this.detail.setAttribute("style","width:100%;height:700px;display:block;");
    	break;
    	case SettingsFacade.SETTING_SAVE:
    	alert("SettingDetailMediator/handleNotification - SETTING_SAVE");
    	this.setDisplay();
      this.sendNotification(SettingsFacade.SETTING_LIST);
    	break;
    	case SettingsFacade.WHERE_USED_COLUMNS_FOLD:
    	//alert("SettingDetailMediator/handleNotification - WHERE_USED_COLUMNS_FOLD");
    	this.whereUsedColumnsFolded = !this.whereUsedColumnsFolded;
    	var forced = note.getBody();
    	if (forced !== undefined && forced !== null) { this.whereUsedColumnsFolded = forced; }
      var foldStyle = "display:none";
      var foldLabel = SettingsFacade.FOLD_CLOSED;
    	if (this.whereUsedColumnsFolded) {
    	  foldStyle = "display:block;"
    	  foldLabel = SettingsFacade.FOLD_OPENED;
    	}
  	  this.detail.whereUsedColumnsFoldButton.innerHTML = foldLabel;
  	  this.detail.whereUsedColumnsGroup.setAttribute("style",foldStyle);
    	break;
    	case SettingsFacade.ROOT_COLUMN_FOLD:
    	//alert("SettingDetailMediator/handleNotification - ROOT_COLUMN_FOLD");
    	this.rootColumnFolded = !this.rootColumnFolded;
    	var forced = note.getBody();
    	if (forced !== undefined && forced !== null) { this.rootColumnFolded = forced; }
      var foldStyle = "display:none";
      var foldLabel = SettingsFacade.FOLD_CLOSED;
    	if (this.rootColumnFolded) {
    	  foldStyle = "display:block;"
    	  foldLabel = SettingsFacade.FOLD_OPENED;
    	}
  	  this.detail.rootColumnFoldButton.innerHTML = foldLabel;
    	this.detail.rootColumnGroup.setAttribute("style",foldStyle);
    	break;
    	case SettingsFacade.WHAT_USED_COLUMNS_FOLD:
    	//alert("SettingDetailMediator/handleNotification - WHAT_USED_COLUMNS_FOLD");
    	this.whatUsedColumnsFolded = !this.whatUsedColumnsFolded;
    	var forced = note.getBody();
    	if (forced !== undefined && forced !== null) { this.whatUsedColumnsFolded = forced; }
      var foldStyle = "display:none";
      var foldLabel = SettingsFacade.FOLD_CLOSED;
    	if (this.whatUsedColumnsFolded) {
    	  foldStyle = "display:block;"
    	  foldLabel = SettingsFacade.FOLD_OPENED;
    	}
  	  this.detail.whatUsedColumnsFoldButton.innerHTML = foldLabel;
    	this.detail.whatUsedColumnsGroup.setAttribute("style",foldStyle);
    	break;
    	case SettingsFacade.OBJECT_TYPES_FOLD:
    	//alert("SettingDetailMediator/handleNotification - OBJECT_TYPES_FOLD");
    	this.objectTypesFolded = !this.objectTypesFolded;
    	var forced = note.getBody();
    	if (forced !== undefined && forced !== null) { this.objectTypesFolded = forced; }
      var foldStyle = "display:none";
      var foldLabel = SettingsFacade.FOLD_CLOSED;
    	if (this.objectTypesFolded) {
    	  foldStyle = "display:block;"
    	  foldLabel = SettingsFacade.FOLD_OPENED;
    	}
  	  this.detail.objectTypesFoldButton.innerHTML = foldLabel;
    	this.detail.objectTypesGroup.setAttribute("style",foldStyle);
    	break;
		}
	}
}
SettingDetailMediator = new Class(new SettingDetailMediator());
SettingDetailMediator.ID = SettingsFacade.SETTING_DETAIL_MEDIATOR; //"SettingDetailMediator";
