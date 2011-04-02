var UndoModelRelationCommand = function() {
  this.Extends = UndoRelationCommand;
  this.currentNivo = null;
  this.position = null;
  
	this.execute = function(note) {
		//alert("UndoModelRelationCommand");
		try {
      this.mediator = this.facade.retrieveMediator(ModelRelationsGridMediator.ID);
      if (this.mediator.setDisplay() == GridListMediator.MODE_DISPLAY) {
  			this.parent(note);
        //this.sendNotification(SjamayeeFacade.RELATION_UNDONE,this.mediator);
        this.mediator.setMessageText("Relation undone.");
      }                
		} catch(error) {
			Utils.alert("UndoModelRelationCommand - error: "+error.message,Utils.LOG_LEVEL_ERROR);
		}
	};
};
UndoModelRelationCommand = new Class(new UndoModelRelationCommand());
