var EditModelRelationCommand = function() {
  this.Extends = EditRelationCommand;
	this.execute = function(note) {
		//alert("EditModelRelationCommand");
  	try {
      var mediator = this.facade.retrieveMediator(ModelRelationsGridMediator.ID);
      if (mediator.setDisplay() == GridListMediator.MODE_DISPLAY) {
    		//Mode: EDIT!
    		mediator.setEdit();
    		//Child display
  		  this.sendNotification(SjamayeeFacade.GRID_MODEL_CHILD_SHOW);
    		//if (this.getDetailDisplay() == "PARENT") { this.showChild(); }
    		//Insert logic here ... 
        this.parent(note); //+mediator ???
        //this.sendNotification(SjamayeeFacade.RELATION_EDITING,mediator);  		
        mediator.setMessageText("Edit relation...");
      }
  	} catch(error) {
  		Utils.alert("EditModelRelationCommand - error: "+error.message,Utils.LOG_LEVEL_ERROR);
  	}
	};
};
EditModelRelationCommand = new Class(new EditModelRelationCommand());
