//Abstract
var DeleteUnrefObjectsCommand = function() {
  this.Extends = SimpleCommand;
	this.execute = function(note) {
		//alert("DeleteUnrefObjectsCommand");
		//_of.deleteUnreferencedObjects()		
    //this.sendNotification(SjamayeeFacade.UNREF_OBJECTS_DELETED,mediator);  //NOK NOK NOK !!!
	};
};
DeleteUnrefObjectsCommand = new Class(new DeleteUnrefObjectsCommand());
