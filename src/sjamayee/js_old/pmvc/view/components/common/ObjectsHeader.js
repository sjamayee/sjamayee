//Abstract
var ObjectsHeader = function() {
  this.Extends = SjamayeeUIComponent;

	this.referenceOperatorSelect = null;
	this.referenceFilter = null;
	this.typeSelect = null;
	this.filter = null;
	this.filterCaseCheckBox = null;
	this.filterHelp = null;
	this.filterButton = null;

	this.initialize = function(name,properties) {
		var html = '<div id="'+name+ObjectsHeader.SPECIAL_HEADER_ID+'">'+
		           '<label for="'+name+ObjectsHeader.REFERENCE_OPERATOR_SELECT_ID+'">'+ObjectsHeader.REFERENCE_OPERATOR_SELECT_LABEL+'</label>'+
		 					 '<select id="'+name+ObjectsHeader.REFERENCE_OPERATOR_SELECT_ID+'">'+
							 '<option>'+ObjectsHeader.REFERENCE_OPERATOR_EQUAL+'</option>'+		//== : equal
							 '<option>'+ObjectsHeader.REFERENCE_OPERATOR_GTEQ+'</option>'+		//>= : greater than or equal
							 '<option>'+ObjectsHeader.REFERENCE_OPERATOR_GT+'</option>'+			//>  : greater than
							 '<option>'+ObjectsHeader.REFERENCE_OPERATOR_LTEQ+'</option>'+		//<= : less than or equal
							 '<option>'+ObjectsHeader.REFERENCE_OPERATOR_LT+'</option>'+			//<  : less than
							 '</select>'+		
							 '<input type="text" id="'+name+ObjectsHeader.REFERENCE_FILTER_ID+'" value=""/>'+
						 	 '<label for="'+name+ObjectsHeader.TYPE_SELECT_ID+'">'+ObjectsHeader.TYPE_SELECT_LABEL+'</label>'+
							 '<select id="'+name+ObjectsHeader.TYPE_SELECT_ID+'"></select>'+
 		           '<label for="'+name+ObjectsHeader.ENTITY_FILTER_ID+'">'+ObjectsHeader.ENTITY_FILTER_LABEL+'</label>'+
							 '<input type="text" id="'+name+ObjectsHeader.ENTITY_FILTER_ID+'" value=""/>'+
 		           '<label for="'+name+ObjectsHeader.ENTITY_FILTER_CASE_CHECKBOX_ID+'">'+ObjectsHeader.ENTITY_FILTER_CASE_CHECKBOX_LABEL+'</label>'+
               '<input type="checkbox" id="'+name+ObjectsHeader.ENTITY_FILTER_CASE_CHECKBOX_ID+'" title="'+ObjectsHeader.ENTITY_FILTER_CASE_TITLE+'"/>'+
               '<a id="'+name+ObjectsHeader.ENTITY_FILTER_HELP_ID+'" href="http://www.w3schools.com/jsref/jsref_obj_regexp.asp" title="'+ObjectsHeader.ENTITY_FILTER_FILTER_TITLE+'" style="margin:0px 3px 0px 3px;">'+ObjectsHeader.ENTITY_FILTER_HELP_TEXT+'</a>'+
							 '<button id="'+name+ObjectsHeader.ENTITY_FILTER_BUTTON_ID+'" title="'+ObjectsHeader.ENTITY_FILTER_BUTTON_TITLE+'">'+ObjectsHeader.ENTITY_FILTER_BUTTON_LABEL+'</button>'+
							 '</div>';
		this.parent(name,{html:html});
		this.referenceOperatorSelect_changeHandler = this.referenceOperatorSelect_changeHandler.bindWithEvent(this);
		this.typeSelect_changeHandler = this.typeSelect_changeHandler.bindWithEvent(this);
		this.filter_changeHandler = this.filter_changeHandler.bindWithEvent(this);
		this.filterCaseCheckBox_clickHandler = this.filterCaseCheckBox_clickHandler.bindWithEvent(this);
		this.filterButton_clickHandler = this.filterButton_clickHandler.bindWithEvent(this);
	};

  this.initializeChildren = function() {
    //this.parent();
    var name = this.getUicName();
	  //alert("ObjectsHeader/initializeChildren - name: "+name);
		this.referenceOperatorSelect = $(name+ObjectsHeader.REFERENCE_OPERATOR_SELECT_ID);
		this.referenceFilter = $(name+ObjectsHeader.REFERENCE_FILTER_ID);
		this.typeSelect = $(name+ObjectsHeader.TYPE_SELECT_ID);
		this.filter = $(name+ObjectsHeader.ENTITY_FILTER_ID);
		this.filterCaseCheckBox = $(name+ObjectsHeader.ENTITY_FILTER_CASE_CHECKBOX_ID);
		this.filterCaseCheckBox.checked = false;
		this.filterHelp = $(name+ObjectsHeader.ENTITY_FILTER_HELP_ID);
		this.filterButton = $(name+ObjectsHeader.ENTITY_FILTER_BUTTON_ID);
  };

  this.childrenInitialized = function() {
    this.parent();
	  //alert("ObjectsHeader/childrenInitialized");
		this.referenceOperatorSelect.addEvent(SjamayeeFacade.CHANGE, this.referenceOperatorSelect_changeHandler);
		this.typeSelect.addEvent(SjamayeeFacade.CHANGE, this.typeSelect_changeHandler);
		this.filter.addEvent(SjamayeeFacade.CHANGE, this.filter_changeHandler);
		this.filterCaseCheckBox.addEvent(SjamayeeFacade.CLICK, this.filterCaseCheckBox_clickHandler);
		this.filterButton.addEvent(SjamayeeFacade.CLICK, this.filterButton_clickHandler);
	};

	this.referenceOperatorSelect_changeHandler = function() {	this.fireEvent(SjamayeeFacade.OLIST_REFOP_CHANGE);	};
	this.typeSelect_changeHandler = function() {
	  //alert("ObjectsHeader/typeSelect_changeHandler!");
	  this.fireEvent(SjamayeeFacade.OLIST_TYPE_CHANGE);
	};
	this.filter_changeHandler = function()                  {	this.fireEvent(SjamayeeFacade.OLIST_FILTER_CHANGE);	};
	this.filterCaseCheckBox_clickHandler = function()    		{	this.fireEvent(SjamayeeFacade.OLIST_FILTER_CASE_CLICK); };
	this.filterButton_clickHandler = function() 	      		{	this.fireEvent(SjamayeeFacade.OLIST_FILTER_CLICK); };
};
ObjectsHeader = new Class(new ObjectsHeader());
ObjectsHeader.SPECIAL_HEADER_ID = "SpecialHeader";
ObjectsHeader.SPECIAL_HEADER_CLASS_ID = "objectsSpecialHeader";
ObjectsHeader.REFERENCE_OPERATOR_SELECT_ID = "ReferenceOperatorSelect";
ObjectsHeader.REFERENCE_OPERATOR_SELECT_CLASS_ID = "objectsReferenceOperatorSelect";
ObjectsHeader.REFERENCE_OPERATOR_SELECT_LABEL = "References&nbsp;";
ObjectsHeader.REFERENCE_FILTER_ID = "ReferenceFilter";
ObjectsHeader.REFERENCE_FILTER_CLASS_ID = "objectsReferenceFilter";
ObjectsHeader.TYPE_SELECT_ID = "TypeSelect";
ObjectsHeader.TYPE_SELECT_CLASS_ID = "objectsTypeSelect";
ObjectsHeader.TYPE_SELECT_LABEL = "&nbsp;Type&nbsp;";
ObjectsHeader.ENTITY_FILTER_ID = "EntityFilter";
ObjectsHeader.ENTITY_FILTER_CLASS_ID = "objectsEntityFilter";
ObjectsHeader.ENTITY_FILTER_LABEL = "&nbsp;Filter(RE)&nbsp;";
ObjectsHeader.ENTITY_FILTER_CASE_CHECKBOX_ID = "EntityFilterCase";
ObjectsHeader.ENTITY_FILTER_CASE_CHECKBOX_CLASS_ID = "objectsEntityFilterCase";
ObjectsHeader.ENTITY_FILTER_CASE_CHECKBOX_LABEL = "&nbsp;Aa&nbsp;"; //"&nbsp;Case&nbsp;"; //"&nbsp;Case sensitive&nbsp;";
ObjectsHeader.ENTITY_FILTER_CASE_CHECKBOX_TITLE = "Case sensitive filter";
ObjectsHeader.ENTITY_FILTER_HELP_ID = "EntityFilterHelp";
ObjectsHeader.ENTITY_FILTER_HELP_CLASS_ID = "objectsEntityFilterHelp";
ObjectsHeader.ENTITY_FILTER_HELP_TEXT = "?";
ObjectsHeader.ENTITY_FILTER_HELP_TITLE = "Help on Regular Expressions";
ObjectsHeader.ENTITY_FILTER_BUTTON_ID = "EntityFilterButton";
ObjectsHeader.ENTITY_FILTER_BUTTON_CLASS_ID = "objectsEntityFilterButton";
ObjectsHeader.ENTITY_FILTER_BUTTON_LABEL = "Filter!";
ObjectsHeader.ENTITY_FILTER_BUTTON_TITLE = "Filter now!";
ObjectsHeader.REFERENCE_OPERATOR_EQUAL = "&#61;&#61;";
ObjectsHeader.REFERENCE_OPERATOR_EQUAL_CHAR = "==";
ObjectsHeader.REFERENCE_OPERATOR_GTEQ = "&#62;&#61;";
ObjectsHeader.REFERENCE_OPERATOR_GTEQ_CHAR = ">=";
ObjectsHeader.REFERENCE_OPERATOR_GT = "&#62;&#32;";
ObjectsHeader.REFERENCE_OPERATOR_GT_CHAR = ">";
ObjectsHeader.REFERENCE_OPERATOR_LTEQ = "&#60;&#61;";
ObjectsHeader.REFERENCE_OPERATOR_LTEQ_CHAR = "<=";
ObjectsHeader.REFERENCE_OPERATOR_LT = "&#60;&#32;";
ObjectsHeader.REFERENCE_OPERATOR_LT_CHAR  = "<";
