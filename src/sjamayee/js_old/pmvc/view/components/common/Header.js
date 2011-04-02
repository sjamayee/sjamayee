var Header = function() {
  this.Extends = SjamayeeUIComponent;

  this.dataModelSelect = null;
  this.dataObjectsHeader = null;
  this.dataRelationsHeader = null;
  this.modelObjectsHeader = null;
  this.modelObjectsTextsHeader = null;
  this.modelRelationsHeader = null;
  this.modelRelationsTextsHeader = null;
	this.settingSelect = null;
	this.settingButton = null;
	this.helpLink = null;
	
	this.initialize = function(properties) {
	  var dataObjectsOptionValue = Header.OBJECTS_SELECT_OPTION_VALUE;
	  var dataRelationsOptionValue = Header.RELATIONS_SELECT_OPTION_VALUE;
	  if (SjamayeeFacade.APPLICATION_TYPE == SjamayeeFacade.COMPOSER) {
  	  dataObjectsOptionValue = Header.DATA_SELECT_OPTION_VALUE+' '+Header.OBJECTS_SELECT_OPTION_VALUE;
  	  dataRelationsOptionValue = Header.DATA_SELECT_OPTION_VALUE+' '+Header.RELATIONS_SELECT_OPTION_VALUE;
	  }
    var html = '<div id="'+Header.DATA_MODEL_HEADER_ID+'">'+
               '<select id="'+Header.DATA_MODEL_SELECT_ID+'">'+
               '<option>'+dataObjectsOptionValue+'</option>'+
               '<option>'+dataRelationsOptionValue+'</option>';
 	  if (SjamayeeFacade.APPLICATION_TYPE == SjamayeeFacade.COMPOSER) {
      html += '<option>'+Header.MODEL_SELECT_OPTION_VALUE+' '+Header.OBJECTS_SELECT_OPTION_VALUE+'</option>'+
              '<option>'+Header.MODEL_SELECT_OPTION_VALUE+' '+Header.RELATIONS_SELECT_OPTION_VALUE+'</option>';
    }
    html += '</select>'+
            '</div>'+
            '<div id="'+DataObjectsHeader.ID+'" class="'+Header.CLASS_ID+'"></div>'+
            '<div id="'+DataRelationsHeader.ID+'" class="'+Header.CLASS_ID+'"></div>';
	  if (SjamayeeFacade.APPLICATION_TYPE == SjamayeeFacade.COMPOSER) {            
      html += '<div id="'+ModelObjectsHeader.ID+'" class="'+Header.CLASS_ID+'"></div>'+
              '<div id="'+ModelObjectsTextsHeader.ID+'" class="'+Header.CLASS_ID+'"></div>'+
              '<div id="'+ModelRelationsHeader.ID+'" class="'+Header.CLASS_ID+'"></div>'+
              '<div id="'+ModelRelationsTextsHeader.ID+'" class="'+Header.CLASS_ID+'"></div>';
    }
		html += '<div id="'+Header.COMMON_HEADER_ID+'">'+
           	'<label for="'+Header.SETTING_SELECT_ID+'">'+Header.SETTING_SELECT_LABEL+'</label>'+
           	'<select id="'+Header.SETTING_SELECT_ID+'"><option>S1</option><option>S2</option></select>'+
           	'<button id="'+Header.HELP_BUTTON_ID+'">'+Header.HELP_BUTTON_LABEL+'</button>'+
           	'<button id="'+Header.SETTING_BUTTON_ID+'">'+Header.SETTING_BUTTON_LABEL+'</button>'+
					 	'</div>';
		//alert("Header/initialize - name: "+name+" html:\n"+html);
		this.parent(Header.ID,{html: html});
    this.dataModelSelect_changeHandler = this.dataModelSelect_changeHandler.bindWithEvent(this);
 		this.settingSelect_changeHandler = this.settingSelect_changeHandler.bindWithEvent(this);
 		this.settingButton_clickHandler = this.settingButton_clickHandler.bindWithEvent(this);
 		this.helpLink_clickHandler = this.helpLink_clickHandler.bindWithEvent(this);
	};

  this.initializeChildren = function() {
	  //alert("Header/initializeChildren - name: "+name);
    this.dataModelSelect = $(Header.DATA_MODEL_SELECT_ID);
	  this.dataObjectsHeader = new DataObjectsHeader();
	  this.addChild(this.dataObjectsHeader);
		this.dataRelationsHeader = new DataRelationsHeader();
	  this.addChild(this.dataRelationsHeader);
	  if (SjamayeeFacade.APPLICATION_TYPE == SjamayeeFacade.COMPOSER) {	  
		  this.modelObjectsHeader = new ModelObjectsHeader();
	    this.addChild(this.modelObjectsHeader);
	    this.modelObjectsTextsHeader = new ModelObjectsTextsHeader();
	    this.addChild(this.modelObjectsTextsHeader);
		  this.modelRelationsHeader = new ModelRelationsHeader();
	    this.addChild(this.modelRelationsHeader);
	    this.modelRelationsTextsHeader = new ModelRelationsTextsHeader();
  	  this.addChild(this.modelRelationsTextsHeader);
	  }
		this.settingSelect = $(Header.SETTING_SELECT_ID);
		this.settingButton = $(Header.SETTING_BUTTON_ID);
		this.helpLink = $(Header.HELP_BUTTON_ID);
  };

  this.childrenInitialized = function() {
	  //alert("Header/childrenInitialized");
    this.dataModelSelect.addEvent(SjamayeeFacade.CHANGE, this.dataModelSelect_changeHandler);
		this.settingSelect.addEvent(SjamayeeFacade.CHANGE, this.settingSelect_changeHandler);
		this.settingButton.addEvent(SjamayeeFacade.CLICK, this.settingButton_clickHandler);
		this.helpLink.addEvent(SjamayeeFacade.CLICK, this.helpLink_clickHandler);
	};

  this.dataModelSelect_changeHandler = function() {	this.fireEvent(SjamayeeFacade.DATA_MODEL_CHANGE);	};
	this.settingSelect_changeHandler = function()   {	this.fireEvent(SjamayeeFacade.SETTING_CHANGE);	};
	this.settingButton_clickHandler = function() 	  {	this.fireEvent(SjamayeeFacade.SETTING_CLICK);	};
	this.helpLink_clickHandler = function()			 	  {	this.fireEvent(SjamayeeFacade.HELP_CLICK);	};
};
Header = new Class(new Header());
Header.ID = "headerPane";
Header.CLASS_ID = "header";
Header.COMMON_HEADER_ID = "commonHeader";
Header.DATA_MODEL_HEADER_ID = "dataModelHeader";
Header.DATA_MODEL_SELECT_ID = "dataModelSelect";
Header.DATA_SELECT_OPTION_VALUE = "DATA";
Header.MODEL_SELECT_OPTION_VALUE = "MODEL";
Header.OBJECTS_SELECT_OPTION_VALUE = "Objects";
Header.RELATIONS_SELECT_OPTION_VALUE = "Relations";
Header.DATA_OBJECTS_INDEX = 0;
Header.DATA_RELATIONS_INDEX = 1;
Header.MODEL_OBJECTS_INDEX = 2;
Header.MODEL_RELATIONS_INDEX = 3;
Header.DATA_TYPE_SELECT_ALL_TYPES_INDEX = 0;
Header.MODEL_TYPE_SELECT_ALL_TYPES_INDEX = 0;
Header.SETTING_SELECT_ID = "settingSelect";            //TODO: VERIFY CommonHeader > Header > RENAME!
Header.SETTING_SELECT_LABEL = "Setting&nbsp;";
Header.SETTING_BUTTON_ID = "settingButton";
Header.SETTING_BUTTON_LABEL = "Setting...";
Header.HELP_BUTTON_ID = "helpButton";
Header.HELP_BUTTON_LABEL = "Help";
