var RedoModelRelationCommand = function() {
  this.Extends = RedoRelationCommand;
  this.currentNivo = null;
  this.position = null;
  
	this.execute = function(note) {
		//alert("RedoModelRelationCommand");
		try {
      this.mediator = this.facade.retrieveMediator(DataRelationsGridMediator.ID);
      if (this.mediator.setDisplay() == GridListMediator.MODE_DISPLAY) {
        this.parent(note); //+mediator !!!
        //this.sendNotification(SjamayeeFacade.RELATION_REDONE,this.mediator);
        this.mediator.setMessageText("Relation redone.");
      }                
	  } catch(error) {
		  Utils.alert("RedoModelRelationCommand - error: "+error.message,Utils.LOG_LEVEL_ERROR);
	  }
	};
};
RedoModelRelationCommand = new Class(new RedoModelRelationCommand());
