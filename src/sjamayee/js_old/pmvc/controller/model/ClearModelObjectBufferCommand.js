var ClearModelObjectBufferCommand = function() {
  this.Extends = ClearObjectBufferCommand;
	this.execute = function(note) {
		//alert("ClearModelObjectBufferCommand");
		try {
      var mediator = this.facade.retrieveMediator(ModelObjectsListMediator.ID);
		  this.parent(note);
		  mediator.list.setRootCommand(null);
			//Reset Counter for Navigation commands.
			//TODO: !!!!!  _cNc = 0;                               //TODO: global !!!			
      //this.sendNotification(SjamayeeFacade.OLIST_BUFFER_CLEARED,mediator);
      mediator.setMessageText("Object Buffer cleared.");
		  this.sendNotification(SjamayeeFacade.OLIST_MODEL_SHOW);
		} catch(error) {
			Utils.alert("ClearModelRelationBufferCommand - error: "+error.message,Utils.LOG_LEVEL_ERROR);
		}
	};
};
ClearModelObjectBufferCommand = new Class(new ClearModelObjectBufferCommand());
