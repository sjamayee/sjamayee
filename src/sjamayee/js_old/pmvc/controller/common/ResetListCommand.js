var ResetListCommand = function() {
  this.Extends = ResetViewCommand;
	this.execute = function(note) {
		//alert("ResetListCommand");
		//alert("ResetListCommand - nivo: "+nivo+" percent: "+percent);
    //var mediator = note.getBody();
    var mediator = this.facade.retrieveMediator(DataObjectsListMediator.ID); //TODO: SPLIT >>> DATA/MODEL - OBJECT/RELATION !!!
		var list = mediator.list;
		try {
			this.parent(note);
      //this.sendNotification(SjamayeeFacade.LIST_RESETED,mediator);
      mediator.setMessageText("List reset.");
		} catch(error) {
			Utils.alert("ResetListCommand - error: "+error.message,Utils.LOG_LEVEL_ERROR);
		}
	};
};
ResetListCommand = new Class(new ResetListCommand());
