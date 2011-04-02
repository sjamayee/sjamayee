var ModelObjectNTDMediator = function() {
	this.Extends = ObjectNTDMediator;

	this.initialize = function(viewComponent)	{
		this.parent(ModelObjectNTDMediator.ID,viewComponent);
	};
	
	this.onGoClick = function() {
    var objectsMediator = this.facade.retrieveMediator(ModelObjectsListMediator.ID);
    if (objectsMediator.isEdit()) {
      //objectsMediator.saveObject();
      this.sendNotification(SjamayeeFacade.OBJECT_MODEL_SAVE);
    } else {
      //objectsMediator.showSFDCObject();
      this.sendNotification(SjamayeeFacade.OBJECT_MODEL_SFDC_SHOW);
    }
	  //objectsMediator.setDisplay();
	};
	
	this.onNoGoClick = function() {
    var objectsMediator = this.facade.retrieveMediator(ModelObjectsListMediator.ID);
    //objectsMediator.cancelObject();
    this.sendNotification(SjamayeeFacade.OBJECT_MODEL_CANCEL);
	  //objectsMediator.setDisplay();
	};

	this.listNotificationInterests = function()	{
    var result = this.parent();
    return result.concat([
			SjamayeeFacade.OBJECT_MODEL_DETAIL
		]);
	};

	this.handleNotification = function(note)	{
    this.parent(note);
		var app = this.facade.getApplication();
		var ntd = this.getViewComponent();
		switch (note.getName())	{
    	case SjamayeeFacade.OBJECT_MODEL_DETAIL:
    	//alert("ModelObjectNTDMediator/handleNotification - OBJECT_MODEL_DETAIL");
    	/*var listObject = note.getBody();
    	var object = listObject.getObject();
    	ntd.setName(object.getNameTranslated());
    	ntd.setType(object.getType());
    	ntd.setDescription(object.getDescTranslated());
    	ntd.setCreatedBy(object.getCby());
    	ntd.setModifiedBy(object.getMby());*/
      //Display buttons.
      var objectsMediator = this.facade.retrieveMediator(ModelObjectsListMediator.ID);
      var goButtonLabel = DetailNTD.SALESFORCE_BUTTON_LABEL;
    	if (objectsMediator.isEdit()) {
      	goButtonLabel = DetailNTD.SAVE_BUTTON_LABEL;
      }
      ntd.goButton.innerHTML = goButtonLabel;
      var noGoStyle = "display:none;";
    	if (objectsMediator.isEdit()) { noGoStyle = "display:block;background-color:#FAE4DB;"; }
      ntd.noGoButton.setAttribute("style",noGoStyle);
    	break;
    }
  };
};
ModelObjectNTDMediator = new Class(new ModelObjectNTDMediator());
ModelObjectNTDMediator.ID = "ModelObjectNTDMediator";
