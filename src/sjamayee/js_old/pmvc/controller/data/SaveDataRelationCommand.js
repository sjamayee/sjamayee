var SaveDataRelationCommand = function() {
  this.Extends = SaveRelationCommand;
	this.execute = function(note) {
		//alert("SaveDataRelationCommand");
  	try {
      var mediator = this.facade.retrieveMediator(DataRelationsGridMediator.ID);
      mediator.setMessageText("Relation saving...");
      this.parent(note); //+mediator !!!
      mediator.setDisplay(true);      
      //this.sendNotification(SjamayeeFacade.RELATION_SAVED,mediator);  // + !!! relation !!!
      mediator.setMessageText("Relation saved.");
  	} catch(error) {
  		Utils.alert("SaveDataRelationCommand Error: "+error.message,Utils.LOG_LEVEL_ERROR);
  	} finally {
  		mediator.sourceName = null;
  		mediator.groupId = null;		
  	}
	};
};
SaveDataRelationCommand = new Class(new SaveDataRelationCommand());
