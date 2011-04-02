var DataObjectNTDMediator = function() {
	this.Extends = ObjectNTDMediator;

	this.initialize = function(viewComponent)	{
		this.parent(DataObjectNTDMediator.ID,viewComponent);
	};

	this.onGoClick = function() {
    var objectsMediator = this.facade.retrieveMediator(DataObjectsListMediator.ID);
    if (objectsMediator.isEdit()) {
      //objectsMediator.saveObject();
      this.sendNotification(SjamayeeFacade.OBJECT_DATA_SAVE);
    } else {
      //objectsMediator.showSFDCObject();
      this.sendNotification(SjamayeeFacade.OBJECT_DATA_SFDC_SHOW);
    }
	  //objectsMediator.setDisplay();
	};
	this.onNoGoClick = function() {
    var objectsMediator = this.facade.retrieveMediator(DataObjectsListMediator.ID);
    //objectsMediator.cancelObject();
    this.sendNotification(SjamayeeFacade.OBJECT_DATA_CANCEL);
	  //objectsMediator.setDisplay();
	};

	this.listNotificationInterests = function()	{
    var result = this.parent();
    return result.concat([
			SjamayeeFacade.OBJECT_DATA_DETAIL
		]);
	};

	this.handleNotification = function(note)	{
    this.parent(note);
		var app = this.facade.getApplication();
		var ntd = this.getViewComponent();
		switch (note.getName())	{
    	case SjamayeeFacade.OBJECT_DATA_DETAIL:
    	//alert("DataObjectNTDMediator/handleNotification - OBJECT_DATA_DETAIL");
    	/*var listObject = note.getBody();
    	var object = listObject.getObject();
    	ntd.setName(object.getNameTranslated());
    	ntd.setType(object.getType());
    	ntd.setDescription(object.getDescTranslated());
    	ntd.setCreatedBy(object.getCby());
    	ntd.setModifiedBy(object.getMby());*/
      //Display buttons.
      var objectsMediator = this.facade.retrieveMediator(DataObjectsListMediator.ID);
      var goButtonLabel = DetailNTD.SALESFORCE_BUTTON_LABEL;
    	if (objectsMediator.isEdit()) {
      	goButtonLabel = DetailNTD.SAVE_BUTTON_LABEL;
      }
      ntd.goButton.innerHTML = goButtonLabel;
      var noGoStyle = "display:none;";
    	if (objectsMediator.isEdit()) { noGoStyle = "display:block;background-color:lightblue;"; }
      ntd.noGoButton.setAttribute("style",noGoStyle);
    	break;
    }
  };
};
DataObjectNTDMediator = new Class(new DataObjectNTDMediator());
DataObjectNTDMediator.ID = "DataObjectNTDMediator";
