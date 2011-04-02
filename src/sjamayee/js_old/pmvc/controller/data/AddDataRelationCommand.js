var AddDataRelationCommand = function() {
  this.Extends = AddRelationCommand;
	this.execute = function(note) {
		//alert("AddDataRelationCommand");
  	try {
      var mediator = this.facade.retrieveMediator(DataRelationsGridMediator.ID);
      if (mediator.setDisplay() == GridListMediator.MODE_DISPLAY) {
    		//Mode: INSERT/EDIT!
    		mediator.setEdit();
    		//Child display
  		  this.sendNotification(SjamayeeFacade.GRID_DATA_CHILD_SHOW);
    		//if (this.getDetailDisplay() == "PARENT") { this.showChild(); }
        this.parent(note); //+mediator ???
        //this.sendNotification(SjamayeeFacade.RELATION_ADDED,mediator);
        mediator.setMessageText("Add relation...");
      }  		            
  	} catch(error) {
  		Utils.alert("AddDataRelationCommand - error: "+error.message,Utils.LOG_LEVEL_ERROR);
  	}
	};
};
AddDataRelationCommand = new Class(new AddDataRelationCommand());
