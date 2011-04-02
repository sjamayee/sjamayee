var ClearDataRelationBufferCommand = function() {
  this.Extends = ClearRelationBufferCommand;
	this.execute = function(note) {
		//alert("ClearDataRelationBufferCommand");
		try {
      var mediator = this.facade.retrieveMediator(DataRelationsGridMediator.ID);
		  this.parent(note); //+mediator !!!
		  mediator.grid.setRootCommand(null);
			//Reset Counter for Navigation commands.
			_cNc = 0;                                                 //TODO: global !!!			
      //this.sendNotification(SjamayeeFacade.RELATION_BUFFER_CLEARED,mediator);
      mediator.setMessageText("Relation Buffer cleared.");
		} catch(error) {
			Utils.alert("ClearDataRelationBufferCommand - error: "+error.message,Utils.LOG_LEVEL_ERROR);
		}
	};
};
ClearDataRelationBufferCommand = new Class(new ClearDataRelationBufferCommand());
