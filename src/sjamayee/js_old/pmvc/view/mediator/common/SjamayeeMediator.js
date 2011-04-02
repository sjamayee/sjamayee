//Abstract
var SjamayeeMediator = function() {
	this.Extends = Mediator;
	this.uicName = null;
	this.state = SjamayeeMediator.STATE_LIST;

	this.initialize = function(name,viewComponent)	{
    this.setUicName(name);
		this.parent(name,viewComponent);
	};

	this.getState = function() {
		return this.state;
	};
	
	this.setState = function(state) {
	  if (state) {
	    this.state = state;
	  }
	};

	this.getUicName = function() {
		return this.uicName;
	};
	
	this.setUicName = function(name) {
	  this.uicName = name;
	};

  this.isData = function() {
    return (this.isOlistData() || this.isGridData())?true:false;
  };

  this.isModel = function() {
    return (this.isOlistModel() || this.isGridModel())?true:false;
  };

  this.isOlistData = function() {
    var dataModelIndex = this.getCurrentDataModelIndex();
    return (dataModelIndex == Header.DATA_OBJECTS_INDEX)?true:false;
  };

  this.isGridData = function() {
    var dataModelIndex = this.getCurrentDataModelIndex();
    return (dataModelIndex == Header.DATA_RELATIONS_INDEX)?true:false;
  };

  this.isOlistModel = function() {
    var dataModelIndex = this.getCurrentDataModelIndex();
    return (dataModelIndex == Header.MODEL_OBJECTS_INDEX)?true:false;
  };

  this.isGridModel = function() {
    var dataModelIndex = this.getCurrentDataModelIndex();
    return (dataModelIndex == Header.MODEL_RELATIONS_INDEX)?true:false;
  };

	this.getCurrentDataModelIndex = function() {
		return SjamayeeFacade.getInstance().currentDataModelIndex;
	};

	this.setCurrentDataModelIndex = function(currentDataModelIndex) {
	  SjamayeeFacade.getInstance().currentDataModelIndex = currentDataModelIndex;
	};

	this.getSetting = function() {
	  if (SjamayeeFacade.getInstance().setting === null) {
	    SjamayeeFacade.getInstance().setting = Setting.getByName(SjamayeeFacade.getInstance().settingName);
	  }
		return SjamayeeFacade.getInstance().setting;
	};

	this.setSettingName = function(settingName) {
	  //alert("SjamayeeMediator/setEnvironment - settingName: "+settingName);
	  if (SjamayeeFacade.getInstance().settingName !== null) {
	    if (SjamayeeFacade.getInstance().settingName != settingName) {
	      SjamayeeFacade.getInstance().setting = null;
	    }
	  }
    SjamayeeFacade.getInstance().settingName = settingName;
	};

  //Abstract
	this.hide = function() { return undefined; };
};
SjamayeeMediator = new Class(new SjamayeeMediator());
SjamayeeMediator.STATE_LIST = "LIST";
SjamayeeMediator.STATE_TEXT = "TEXT";
