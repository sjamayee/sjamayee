var DeleteUnrefDataObjectsCommand = function() {
  this.Extends = DeleteUnrefObjectsCommand;
	this.execute = function(note) {
		//alert("DeleteUnrefDataObjectsCommand");
    var mediator = this.facade.retrieveMediator(DataObjectsListMediator.ID);
    this.parent(note);
    //this.sendNotification(SjamayeeFacade.UNREF_OBJECTS_DELETED,mediator);  //NOK NOK NOK !!!
    mediator.setMessageText("Unreferenced Objects deleted.");
	  this.sendNotification(SjamayeeFacade.OLIST_DATA_SHOW);
	};
};
DeleteUnrefDataObjectsCommand = new Class(new DeleteUnrefDataObjectsCommand());
