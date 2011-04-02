var SaveModelRelationCommand = function() {
  this.Extends = SaveRelationCommand;
	this.execute = function(note) {
		//alert("SaveModelRelationCommand");
  	try {
      var mediator = this.facade.retrieveMediator(ModelRelationsGridMediator.ID);
      mediator.setMessageText("Relation saving...");
      this.parent(note); //+mediator !!!
      mediator.setDisplay(true);
      //this.sendNotification(SjamayeeFacade.RELATION_SAVED,mediator);  // + !!! relation !!!
      mediator.setMessageText("Relation saved.");
  	} catch(error) {
  		Utils.alert("SaveModelRelationCommand Error: "+error.message,Utils.LOG_LEVEL_ERROR);
  	} finally {
  		mediator.sourceName = null;
  		mediator.groupId = null;		
  	}
	};
};
SaveModelRelationCommand = new Class(new SaveModelRelationCommand());
