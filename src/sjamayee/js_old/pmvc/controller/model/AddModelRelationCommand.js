var AddModelRelationCommand = function() {
  this.Extends = AddRelationCommand;
	this.execute = function(note) {
		//alert("AddModelRelationCommand");
  	try {
      var mediator = this.facade.retrieveMediator(ModelRelationsGridMediator.ID);
      if (mediator.setDisplay() == GridListMediator.MODE_DISPLAY) {
    		//Mode: INSERT/EDIT!
    		mediator.setEdit();
    		//Child display
  		  this.sendNotification(SjamayeeFacade.GRID_MODEL_CHILD_SHOW);
    		//if (this.getDetailDisplay() == "PARENT") { this.showChild(); }
        this.parent(note); //+mediator ???
        //this.sendNotification(SjamayeeFacade.RELATION_ADDED,mediator);
        mediator.setMessageText("Add relation...");
      }
  	} catch(error) {
  		Utils.alert("AddModelRelationCommand - error: "+error.message,Utils.LOG_LEVEL_ERROR);
  	}
	};
};
AddModelRelationCommand = new Class(new AddModelRelationCommand());
