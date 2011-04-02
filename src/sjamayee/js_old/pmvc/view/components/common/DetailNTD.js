//Abstract
var DetailNTD = function() {
  this.Extends = SjamayeeUIComponent;

	this.header = null;
	this.name = null;
	this.type = null;
	this.description = null;
	this.createdBy = null;
	this.modifiedBy = null;
	this.goButton = null;
	this.noGoButton = null;

	this.initialize = function(name,properties) {
		this.parent(name,properties);
		this.ntd_clickHandler = this.ntd_clickHandler.bindWithEvent(this);
		this.ntd_keypressHandler = this.ntd_keypressHandler.bindWithEvent(this);
		this.ntd_keydownHandler = this.ntd_keydownHandler.bindWithEvent(this);
		this.name_clickHandler = this.name_clickHandler.bindWithEvent(this);
		this.name_keypressHandler = this.name_keypressHandler.bindWithEvent(this);
		this.name_keydownHandler = this.name_keydownHandler.bindWithEvent(this);
		this.goButton_clickHandler = this.goButton_clickHandler.bindWithEvent(this);
		this.noGoButton_clickHandler = this.noGoButton_clickHandler.bindWithEvent(this);
	};

  this.childrenInitialized = function() {
		this.addEvent(SjamayeeFacade.CLICK, this.ntd_clickHandler);
		this.addEvent(SjamayeeFacade.KEYPRESS, this.ntd_keypressHandler);
		this.addEvent(SjamayeeFacade.KEYDOWN, this.ntd_keydownHandler);
		this.name.addEvent(SjamayeeFacade.CLICK, this.name_clickHandler);
		this.name.addEvent(SjamayeeFacade.KEYPRESS, this.name_keypressHandler);
		this.name.addEvent(SjamayeeFacade.KEYDOWN, this.name_keydownHandler);
	};
  
  this.getName = function() {
    return this.name.value;
  };
  
  this.setName = function(name) {
    this.name.value = name;
  };

  this.getType = function() {
    return this.type.value;
  };
  
  this.setType = function(type) {
    this.type.value = type;
  };

  this.getDescription = function() {
    return this.description.value;
  };
  
  this.setDescription = function(description) {
    this.description.value = description;
  };

  this.getCreatedBy = function() {
    return this.createdBy.value;
  };
  
  this.setCreatedBy = function(createdBy) {
    this.createdBy.value = createdBy;
  };

  this.getModifiedBy = function() {
    return this.modifiedBy.value;
  };
  
  this.setModifiedBy = function(modifiedBy) {
    this.modifiedBy.value = modifiedBy;
  };

	this.setHeader = function(id, value) {
		$(id).innerHTML = value;
	};

	this.ntd_clickHandler = function()	{
		this.fireEvent(SjamayeeFacade.ENTITY_NTD_CLICK);
	};
	
	this.ntd_keypressHandler = function()	{
		this.fireEvent(SjamayeeFacade.ENTITY_NTD_KEYPRESS);
	};

	this.ntd_keydownHandler = function()	{
		this.fireEvent(SjamayeeFacade.ENTITY_NTD_KEYDOWN);
	};

	this.name_clickHandler = function()	{
		this.fireEvent(SjamayeeFacade.ENTITY_NAME_CLICK);
	};

	this.name_keypressHandler = function()	{
		this.fireEvent(SjamayeeFacade.ENTITY_NAME_KEYPRESS);
	};
	this.name_keydownHandler = function()	{
		this.fireEvent(SjamayeeFacade.ENTITY_NAME_KEYDOWN);
	};

	this.goButton_clickHandler = function()	{
		this.fireEvent(SjamayeeFacade.GO_NTD_CLICK);
	};

	this.noGoButton_clickHandler = function()	{
		this.fireEvent(SjamayeeFacade.NOGO_NTD_CLICK);
	};
};
DetailNTD = new Class(new DetailNTD());
//DetailNTD.CLASS_ID = "detailNTD";
DetailNTD.HEADER_CLASS_ID = "detailNTDHeader";
DetailNTD.FIELD_CLASS_ID = "detailNTDField";
DetailNTD.FIELD_LABEL__CLASS_ID = "detailNTDFieldLabel";
DetailNTD.NAME_FIELD_CLASS_ID = "detailNTDTextFieldName";
DetailNTD.TYPE_FIELD_CLASS_ID = "detailNTDTextFieldType";
DetailNTD.DESC_FIELD_CLASS_ID = "detailNTDTextFieldDescription";
DetailNTD.CBY_FIELD_CLASS_ID = "detailNTDTextFieldCreatedBy";
DetailNTD.MBY_FIELD_CLASS_ID = "detailNTDTextFieldModifiedBy";
DetailNTD.NAME_FIELD_LABEL = "Name";
DetailNTD.TYPE_FIELD_LABEL = "Type";
DetailNTD.DESC_FIELD_LABEL = "Description";
DetailNTD.CBY_FIELD_LABEL = "Created By";
DetailNTD.MBY_FIELD_LABEL = "Modified By";
DetailNTD.BUTTONS_CLASS_ID = "detailNTDButtons";
DetailNTD.GO_BUTTON_CLASS_ID = "detailNTDGoButton";
DetailNTD.NOGO_BUTTON_CLASS_ID = "detailNTDNoGoButton";
DetailNTD.SAVE_BUTTON_LABEL = "Save";
DetailNTD.SALESFORCE_BUTTON_LABEL = "Salesforce";
DetailNTD.CANCEL_BUTTON_LABEL = "Cancel";
