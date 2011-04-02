var HeaderMediator = function() {
	this.Extends = SjamayeeMediator;

	this.initialize = function(viewComponent)	{
	  //alert("HeaderMediator/initialize - name: "+name);
		this.parent(HeaderMediator.ID,viewComponent);
  	var header = this.getViewComponent();
  	this.facade.registerMediator(new DataObjectsHeaderMediator(header.dataObjectsHeader));
  	this.facade.registerMediator(new DataRelationsHeaderMediator(header.dataRelationsHeader));
	  if (SjamayeeFacade.APPLICATION_TYPE == SjamayeeFacade.COMPOSER) {  	
  	  this.facade.registerMediator(new ModelObjectsHeaderMediator(header.modelObjectsHeader));
  	  this.facade.registerMediator(new ModelObjectsTextsHeaderMediator(header.modelObjectsTextsHeader));
  	  this.facade.registerMediator(new ModelRelationsHeaderMediator(header.modelRelationsHeader));
  	  this.facade.registerMediator(new ModelRelationsTextsHeaderMediator(header.modelRelationsTextsHeader));
  	}
  	this.onDataModelChange = this.onDataModelChange.bindWithEvent(this);
  	this.onSettingChange = this.onSettingChange.bindWithEvent(this);
  	this.onSettingClick = this.onSettingClick.bindWithEvent(this);
  	this.onHelpClick = this.onHelpClick.bindWithEvent(this);
  	header.addEvent(SjamayeeFacade.DATA_MODEL_CHANGE, this.onDataModelChange);		
  	header.addEvent(SjamayeeFacade.SETTING_CHANGE, this.onSettingChange);
  	header.addEvent(SjamayeeFacade.SETTING_CLICK, this.onSettingClick);
  	header.addEvent(SjamayeeFacade.HELP_CLICK, this.onHelpClick);
  	//Initialize SelectLists.
  	header.settingSelect.innerHTML = Setting.getSettingOptions();
	};

	this.onDataModelChange = function() {
  	var header = this.getViewComponent();
		var dataModelSelection = header.dataModelSelect.value;
    var dataModelSelectedIndex = header.dataModelSelect.selectedIndex;
	  //alert("HeaderMediator/onDataModelChange - value: "+dataModelSelection+" selectedIndex: "+dataModelSelectedIndex);
	  var properties = { "value": dataModelSelection, "index": dataModelSelectedIndex };
	  this.dataModelChange(properties);
	};
  this.onSettingChange = function()	{	this.settingChange(); };
	this.onSettingClick = function()	{	this.sendNotification(SjamayeeFacade.SETTING_CLICK); };
	this.onHelpClick = function()			{	this.sendNotification(SjamayeeFacade.HELP_CLICK); };

	this.listNotificationInterests = function()	{
    var result = this.parent();
    return result.concat([
			SjamayeeFacade.OLIST_DATA_SHOW,
			SjamayeeFacade.GRID_DATA_SHOW,
			SjamayeeFacade.OLIST_MODEL_HEADER_SHOW,
			SjamayeeFacade.GRID_MODEL_HEADER_SHOW,
  	  SjamayeeFacade.DATA_MODEL_CHANGE,
  		SjamayeeFacade.SETTING_CLICK,
  		SjamayeeFacade.HELP_CLICK
		]);
	};

	this.handleNotification = function(note)	{
	  this.parent(note);
		var app = this.facade.getApplication();
		var header = this.getViewComponent();
		switch (note.getName())	{
			case SjamayeeFacade.OLIST_DATA_SHOW:
			//alert("HeaderMediator/handleNotification - OLIST_DATA_SHOW");
			//var selectedIndex = $(Header.DATA_MODEL_SELECT_ID).selectedIndex;
      //this.setEnvironment(Header.DATA_SELECT_OPTION_VALUE);
			var selectedIndex = header.dataModelSelect.selectedIndex;			
			if (selectedIndex != Header.DATA_OBJECTS_INDEX) {
			  //$(Header.DATA_MODEL_SELECT_ID).selectedIndex = Header.DATA_OBJECTS_INDEX;
  			header.dataModelSelect.selectedIndex = Header.DATA_OBJECTS_INDEX;
			}
			break;
			case SjamayeeFacade.GRID_DATA_SHOW:
			//alert("HeaderMediator/handleNotification - GRID_DATA_SHOW");
			//var selectedIndex = $(Header.DATA_MODEL_SELECT_ID).selectedIndex;
      //this.setEnvironment(Header.DATA_SELECT_OPTION_VALUE);
			var selectedIndex = header.dataModelSelect.selectedIndex;			
			if (selectedIndex != Header.DATA_RELATIONS_INDEX) {
			  //$(Header.DATA_MODEL_SELECT_ID).selectedIndex = Header.DATA_RELATIONS_INDEX;
  			header.dataModelSelect.selectedIndex = Header.DATA_RELATIONS_INDEX;
			}
			break;
			case SjamayeeFacade.OLIST_MODEL_HEADER_SHOW:
			//alert("HeaderMediator/handleNotification - OLIST_MODEL_HEADER_SHOW");
			//var selectedIndex = $(Header.DATA_MODEL_SELECT_ID).selectedIndex;
      //this.setEnvironment(Header.MODEL_SELECT_OPTION_VALUE);
			var selectedIndex = header.dataModelSelect.selectedIndex;			
			if (selectedIndex != Header.MODEL_OBJECTS_INDEX) {
			  //$(Header.DATA_MODEL_SELECT_ID).selectedIndex = Header.MODEL_OBJECTS_INDEX;
  			header.dataModelSelect.selectedIndex = Header.MODEL_OBJECTS_INDEX;
			}
			break;
			case SjamayeeFacade.GRID_MODEL_HEADER_SHOW:
			//alert("HeaderMediator/handleNotification - GRID_MODEL_HEADER_SHOW");
			//var selectedIndex = $(Header.DATA_MODEL_SELECT_ID).selectedIndex;
      //this.setEnvironment(Header.MODEL_SELECT_OPTION_VALUE);
			var selectedIndex = header.dataModelSelect.selectedIndex;			
			if (selectedIndex != Header.MODEL_RELATIONS_INDEX) {
			  //$(Header.DATA_MODEL_SELECT_ID).selectedIndex = Header.MODEL_RELATIONS_INDEX;
  			header.dataModelSelect.selectedIndex = Header.MODEL_RELATIONS_INDEX;
			}
			break;
    	case SjamayeeFacade.DATA_MODEL_CHANGE:
    	//alert("HeaderMediator/handleNotification - DATA_MODEL_CHANGE");
    	var properties = note.getBody();
      this.dataModelChange(properties);
    	break;
  		case SjamayeeFacade.SETTING_CLICK:
  		//alert("HeaderMediator/handleNotification - SETTING_CLICK");
  		break;
  		case SjamayeeFacade.HELP_CLICK:
  		//alert("HeaderMediator/handleNotification - HELP_CLICK");
  		break;
		}
	};

  this.dataModelChange = function(properties) {
    var state = null;
	  var dataModelSelection = null;
	  var dataModelSelectedIndex = null;
  	if (properties) {
  	  if (properties.state !== undefined) { state = properties.state; }
  	  if (properties.value !== undefined) { dataModelSelection = properties.value; }
  	  if (properties.index !== undefined) { dataModelSelectedIndex = properties.index; }
  	}	  
	  //alert("HeaderMediator/dataModelChange - properties / state: "+state+" value: "+dataModelSelection+" index: "+dataModelSelectedIndex);
    //Eventually - Save TextEditor changes?
    if (dataModelSelectedIndex !== null) {
      var currentIndex = this.getCurrentDataModelIndex();
      var newIndex = dataModelSelectedIndex;
      if (currentIndex != newIndex) {
    	  //alert("HeaderMediator/dataModelChange - currentIndex: "+currentIndex+" newIndex: "+newIndex);
        var textsEditorMediator = null;
        switch (currentIndex) {
          case Header.DATA_OBJECTS_INDEX:
          break;
          case Header.DATA_RELATIONS_INDEX:
          break;
          case Header.MODEL_OBJECTS_INDEX:
          textsEditorMediator = this.facade.retrieveMediator(ModelObjectsTextsEditorMediator.ID);
          break;
          case Header.MODEL_RELATIONS_INDEX:
          textsEditorMediator = this.facade.retrieveMediator(ModelRelationsTextsEditorMediator.ID);
          break;
        }
        if (textsEditorMediator) {
        //alert("Save changes?"+"\ninitialHash: "+textsEditorMediator.getInitialTextHash()+"\ncurrentHash: "+textsEditorMediator.getTextHash());
          if (textsEditorMediator.getTextHash() != textsEditorMediator.getInitialTextHash()) {
          //alert("Save changes?"+"\ninitialHash: "+textsEditorMediator.getInitialTextHash()+"\ncurrentHash: "+textsEditorMediator.getTextHash());
          }
        }
        this.setCurrentDataModelIndex(newIndex);        
      }
    }
    //Switch to new environment!
    if (this.isData()) {
      if (this.isOlistData()) {
      	this.sendNotification(SjamayeeFacade.OLIST_DATA_SHOW);
      } else if (this.isGridData()) {
      	this.sendNotification(SjamayeeFacade.GRID_DATA_SHOW);
      }
    } else if (this.isModel()) {
      var properties = { "state": state };
      if (this.isOlistModel()) {
      	this.sendNotification(SjamayeeFacade.OLIST_MODEL_SHOW,properties);
      } else if (this.isGridModel()) {
      	this.sendNotification(SjamayeeFacade.GRID_MODEL_SHOW,properties);
      }
    }
	  return this;
	};

  this.settingChange = function() {
  	var header = this.getViewComponent();	  
  	var settingName = header.settingSelect.value;
    this.setSettingName(settingName);
    //alert("HeaderMediator/settingChange - setting: "+this.getSetting());
    return this;
  };
};
HeaderMediator = new Class(new HeaderMediator());
HeaderMediator.ID = "HeaderMediator";
