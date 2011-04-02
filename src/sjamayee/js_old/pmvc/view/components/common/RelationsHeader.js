//Abstract
var RelationsHeader = function() {
  this.Extends = SjamayeeUIComponent;

	this.entitySelect = null;
	this.typeSelect = null;
	this.filter = null;
	this.filterCaseCheckBox = null;
	this.filterHelp = null;	
	this.filterButton = null;
/*	
	this.rootUndoButton = null;
	this.rootSelectButton = null;
	this.rootRedoButton = null;
 	this.columnsSelect = null;
*/
	this.initialize = function(name,properties) {
 		var html = '<div id="'+name+RelationsHeader.SPECIAL_HEADER_ID+'">'+
 		           '<label for="'+name+RelationsHeader.ENTITY_SELECT_ID+'">'+RelationsHeader.ENTITY_SELECT_LABEL+'</label>'+
							 //'<select id="'+name+RelationsHeader.ENTITY_SELECT_ID+'" class="'+RelationsHeader.ENTITY_SELECT_CLASS_ID+'"></select>'+
							 '<select id="'+name+RelationsHeader.ENTITY_SELECT_ID+'"></select>'+
						 	 '<label for="'+name+RelationsHeader.TYPE_SELECT_ID+'">'+RelationsHeader.TYPE_SELECT_LABEL+'</label>'+
							 //'<select id="'+name+RelationsHeader.TYPE_SELECT_ID+'" class="'+RelationsHeader.TYPE_SELECT_CLASS_ID+'"></select>'+
							 '<select id="'+name+RelationsHeader.TYPE_SELECT_ID+'"></select>'+
 		           '<label for="'+name+RelationsHeader.ENTITY_FILTER_ID+'">'+RelationsHeader.ENTITY_FILTER_LABEL+'</label>'+
							 '<input type="text" id="'+name+RelationsHeader.ENTITY_FILTER_ID+'" value=""/>'+
 		           '<label for="'+name+RelationsHeader.ENTITY_FILTER_CASE_CHECKBOX_ID+'">'+RelationsHeader.ENTITY_FILTER_CASE_CHECKBOX_LABEL+'</label>'+
               '<input type="checkbox" id="'+name+RelationsHeader.ENTITY_FILTER_CASE_CHECKBOX_ID+'" title="Case sensitive filter"/>'+
               '<a id="'+name+RelationsHeader.ENTITY_FILTER_HELP_ID+'" href="http://www.w3schools.com/jsref/jsref_obj_regexp.asp" title="Help on Regular Expressions." style="margin:0px 3px 0px 3px;">'+RelationsHeader.ENTITY_FILTER_HELP_TEXT+'</a>'+
							 '<button id="'+name+RelationsHeader.ENTITY_FILTER_BUTTON_ID+'" title="Filter now!">'+RelationsHeader.ENTITY_FILTER_BUTTON_LABEL+'</button>';
/*  if (SjamayeeFacade.APPLICATION_TYPE == SjamayeeFacade.COMPOSER) {
			html += '<button id="'+name+RelationsHeader.ROOT_UNDO_BUTTON_ID+'">'+RelationsHeader.ROOT_UNDO_BUTTON_LABEL+'</button>'+
							'<button id="'+name+RelationsHeader.ROOT_SELECT_BUTTON_ID+'">'+RelationsHeader.ROOT_SELECT_BUTTON_LABEL+'</button>'+
							'<button id="'+name+RelationsHeader.ROOT_REDO_BUTTON_ID+'">'+RelationsHeader.ROOT_REDO_BUTTON_LABEL+'</button>'+
           		'<label for="'+name+RelationsHeader.COLUMNS_SELECT_ID+'">'+RelationsHeader.COLUMNS_SELECT_LABEL+'</label>'+
           		'<select id="'+name+RelationsHeader.COLUMNS_SELECT_ID+'">'+
           		'<option>2</option>'+
           		'<option>3</option>'+
           		'<option>4</option>'+
           		'<option>5</option>'+
           		'<option>6</option>'+
           		'<option>7</option>'+
           		'<option>8</option>'+
           		'</select>';
    }*/
    html += '</div>';
		this.parent(name,{html:html});
		this.entitySelect_changeHandler = this.entitySelect_changeHandler.bindWithEvent(this);
		this.typeSelect_changeHandler = this.typeSelect_changeHandler.bindWithEvent(this);
		this.filter_changeHandler = this.filter_changeHandler.bindWithEvent(this);
		this.filter_keydownHandler = this.filter_keydownHandler.bindWithEvent(this);
		this.filterCaseCheckBox_clickHandler = this.filterCaseCheckBox_clickHandler.bindWithEvent(this);
		this.filterButton_clickHandler = this.filterButton_clickHandler.bindWithEvent(this);
		this.rootUndoButton_clickHandler = this.rootUndoButton_clickHandler.bindWithEvent(this);
		this.rootSelectButton_clickHandler = this.rootSelectButton_clickHandler.bindWithEvent(this);
		this.rootRedoButton_clickHandler = this.rootRedoButton_clickHandler.bindWithEvent(this);
		this.columnsSelect_changeHandler = this.columnsSelect_changeHandler.bindWithEvent(this);
	};

  this.initializeChildren = function() {
    //this.parent();
    var name = this.getUicName();
	  //alert("RelationsHeader/initializeChildren");
		this.entitySelect = $(name+RelationsHeader.ENTITY_SELECT_ID);
		this.typeSelect = $(name+RelationsHeader.TYPE_SELECT_ID);
		this.filter = $(name+RelationsHeader.ENTITY_FILTER_ID);
		this.filterCaseCheckBox = $(name+RelationsHeader.ENTITY_FILTER_CASE_CHECKBOX_ID);
		this.filterCaseCheckBox.checked = false;
		this.filterHelp = $(name+RelationsHeader.ENTITY_FILTER_HELP_ID);
		this.filterButton = $(name+RelationsHeader.ENTITY_FILTER_BUTTON_ID);
/*  if (SjamayeeFacade.APPLICATION_TYPE == SjamayeeFacade.COMPOSER) {		
		  this.rootUndoButton = $(name+RelationsHeader.ROOT_UNDO_BUTTON_ID);
		  this.rootSelectButton = $(name+RelationsHeader.ROOT_SELECT_BUTTON_ID);
		  this.rootRedoButton = $(name+RelationsHeader.ROOT_REDO_BUTTON_ID);
		  this.columnsSelect = $(name+RelationsHeader.COLUMNS_SELECT_ID);
		}*/
  };

  this.childrenInitialized = function() {
    //this.parent();
	  //alert("RelationsHeader/childrenInitialized");
		this.entitySelect.addEvent(SjamayeeFacade.CHANGE, this.entitySelect_changeHandler);
		this.typeSelect.addEvent(SjamayeeFacade.CHANGE, this.typeSelect_changeHandler);
		this.filter.addEvent(SjamayeeFacade.CHANGE, this.filter_changeHandler);
		this.filterCaseCheckBox.addEvent(SjamayeeFacade.CLICK, this.filterCaseCheckBox_clickHandler);
		this.filterButton.addEvent(SjamayeeFacade.CLICK, this.filterButton_clickHandler);
		this.filter.addEvent(SjamayeeFacade.KEYDOWN, this.filter_keydownHandler);
/*  if (SjamayeeFacade.APPLICATION_TYPE == SjamayeeFacade.COMPOSER) {		
		  this.rootUndoButton.addEvent(SjamayeeFacade.CLICK, this.rootUndoButton_clickHandler);
		  this.rootSelectButton.addEvent(SjamayeeFacade.CLICK, this.rootSelectButton_clickHandler);
		  this.rootRedoButton.addEvent(SjamayeeFacade.CLICK, this.rootRedoButton_clickHandler);
		  this.columnsSelect.addEvent(SjamayeeFacade.CHANGE, this.columnsSelect_changeHandler);
		}*/
	};

	this.initializationComplete = function() {
		this.setEnabled(true);
	};
	
	this.setEnabled = function(isEnabled)	{
		//this.objectsButton.disabled = !isEnabled;
	};

	this.entitySelect_changeHandler = function() {
	  //alert("RelationsHeader/entitySelect_changeHandler!");
	  this.fireEvent(SjamayeeFacade.GRID_ENTITY_CHANGE);
	};
	
	this.typeSelect_changeHandler = function() {
	  //alert("RelationsHeader/typeSelect_changeHandler!");
	  this.fireEvent(SjamayeeFacade.GRID_TYPE_CHANGE);	
	};
	
	this.filter_changeHandler = function()            {	this.fireEvent(SjamayeeFacade.GRID_FILTER_CHANGE);	};
	this.filterCaseCheckBox_clickHandler = function() {	this.fireEvent(SjamayeeFacade.GRID_FILTER_CASE_CLICK); };
	this.filterButton_clickHandler = function()       {	this.fireEvent(SjamayeeFacade.GRID_FILTER_CLICK);	};
	this.rootUndoButton_clickHandler = function()		  {	this.fireEvent(SjamayeeFacade.ROOT_UNDO); };
	this.rootSelectButton_clickHandler = function()   {	this.fireEvent(SjamayeeFacade.ROOT_SELECT); };
	this.rootRedoButton_clickHandler = function()		  {	this.fireEvent(SjamayeeFacade.ROOT_REDO); };
	this.filter_keydownHandler = function(evt)	      {
		switch (evt.key) {
			case SjamayeeFacade.ENTER:
			this.fireEvent(SjamayeeFacade.GRID_FILTER_KEYDOWN, evt);
			break;
		}
	};
	this.columnsSelect_changeHandler = function()     {	this.fireEvent(SjamayeeFacade.GRID_COLUMNS_CHANGE);	};
};
RelationsHeader = new Class(new RelationsHeader());
RelationsHeader.SPECIAL_HEADER_ID = "SpecialHeader";
RelationsHeader.ENTITY_SELECT_CLASS_ID = "relationsEntitySelect";
RelationsHeader.ENTITY_SELECT_ID = "EntitySelect";
RelationsHeader.ENTITY_SELECT_LABEL = "Object&nbsp;";
RelationsHeader.TYPE_SELECT_CLASS_ID = "relationsTypeSelect";
RelationsHeader.TYPE_SELECT_ID = "TypeSelect";
RelationsHeader.TYPE_SELECT_LABEL = "&nbsp;Type&nbsp;";
RelationsHeader.ENTITY_FILTER_ID = "EntityFilter";
RelationsHeader.ENTITY_FILTER_LABEL = "&nbsp;Filter(RE)&nbsp;";
RelationsHeader.ENTITY_FILTER_CASE_CHECKBOX_ID = "EntityFilterCase";
RelationsHeader.ENTITY_FILTER_CASE_CHECKBOX_LABEL = "&nbsp;Aa&nbsp;"; //"&nbsp;Case&nbsp;"; //"&nbsp;Case sensitive&nbsp;";
RelationsHeader.ENTITY_FILTER_HELP_ID = "EntityFilterHelp";
RelationsHeader.ENTITY_FILTER_HELP_TEXT = "?";
RelationsHeader.ENTITY_FILTER_BUTTON_ID = "EntityFilterButton";
RelationsHeader.ENTITY_FILTER_BUTTON_LABEL = "Filter!";
RelationsHeader.ROOT_UNDO_BUTTON_ID = "RootUndoButton";
RelationsHeader.ROOT_UNDO_BUTTON_LABEL = "Left";
RelationsHeader.ROOT_SELECT_BUTTON_ID = "RootSelectButton";
RelationsHeader.ROOT_SELECT_BUTTON_LABEL = "ROOT";
RelationsHeader.ROOT_REDO_BUTTON_ID = "RootRedoButton";
RelationsHeader.ROOT_REDO_BUTTON_LABEL = "Right";
RelationsHeader.COLUMNS_SELECT_ID = "ColumnsSelect";
RelationsHeader.COLUMNS_SELECT_LABEL = "Columns&nbsp;";
