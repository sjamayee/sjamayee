var UndoDataRelationCommand = function() {
  this.Extends = UndoRelationCommand;
  this.currentNivo = null;
  this.position = null;
  
	this.execute = function(note) {
		//alert("UndoDataRelationCommand");
		try {
      this.mediator = this.facade.retrieveMediator(DataRelationsGridMediator.ID);
      if (this.mediator.setDisplay() == GridListMediator.MODE_DISPLAY) {
  			this.parent(note);
        //this.sendNotification(SjamayeeFacade.RELATION_UNDONE,this.mediator);
        this.mediator.setMessageText("Relation undone.");
      }                
		} catch(error) {
			Utils.alert("UndoDataRelationCommand - error: "+error.message,Utils.LOG_LEVEL_ERROR);
		}
	};
};
UndoDataRelationCommand = new Class(new UndoDataRelationCommand());
