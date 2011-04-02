var DeleteUnrefModelObjectsCommand = function() {
  this.Extends = DeleteUnrefObjectsCommand;
	this.execute = function(note) {
		//alert("DeleteUnrefModelObjectsCommand");
    var mediator = this.facade.retrieveMediator(ModelObjectsListMediator.ID);
    this.parent(note);
    //this.sendNotification(SjamayeeFacade.UNREF_OBJECTS_DELETED,mediator);  //NOK NOK NOK !!!
    mediator.setMessageText("Unreferenced Objects deleted.");
	  this.sendNotification(SjamayeeFacade.OLIST_MODEL_SHOW);
	};
};
DeleteUnrefModelObjectsCommand = new Class(new DeleteUnrefModelObjectsCommand());
