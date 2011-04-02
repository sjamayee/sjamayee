var RedoDataRelationCommand = function() {
  this.Extends = RedoRelationCommand;
  this.currentNivo = null;
  this.position = null;
  
	this.execute = function(note) {
		//alert("RedoDataRelationCommand");
		try {
      this.mediator = this.facade.retrieveMediator(DataRelationsGridMediator.ID);
      if (this.mediator.setDisplay() == GridListMediator.MODE_DISPLAY) {
        this.parent(note); //+mediator !!!
        //this.sendNotification(SjamayeeFacade.RELATION_REDONE,this.mediator);
        this.mediator.setMessageText("Relation redone.");
      }                
	  } catch(error) {
		  Utils.alert("RedoDataRelationCommand - error: "+error.message,Utils.LOG_LEVEL_ERROR);
	  }
	};
};
RedoDataRelationCommand = new Class(new RedoDataRelationCommand());
