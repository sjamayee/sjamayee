var ClearDataObjectBufferCommand = function() {
  this.Extends = ClearObjectBufferCommand;
	this.execute = function(note) {
		//alert("ClearDataObjectBufferCommand");
		try {
      var mediator = this.facade.retrieveMediator(DataObjectsListMediator.ID);
		  this.parent(note);
		  mediator.list.setRootCommand(null);
			//Reset Counter for Navigation commands.
			//TODO: !!!!!  _cNc = 0;                               //TODO: global !!!			
      //this.sendNotification(SjamayeeFacade.OLIST_BUFFER_CLEARED,mediator);
      mediator.setMessageText("Object Buffer cleared.");
		  this.sendNotification(SjamayeeFacade.OLIST_DATA_SHOW);
		} catch(error) {
			Utils.alert("ClearDataRelationBufferCommand - error: "+error.message,Utils.LOG_LEVEL_ERROR);
		}
	};
};
ClearDataObjectBufferCommand = new Class(new ClearDataObjectBufferCommand());
