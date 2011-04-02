var EditDataRelationCommand = function() {
  this.Extends = EditRelationCommand;
	this.execute = function(note) {
		//alert("EditDataRelationCommand");
  	try {
      var mediator = this.facade.retrieveMediator(DataRelationsGridMediator.ID);
      if (mediator.setDisplay() == GridListMediator.MODE_DISPLAY) {
    		//Mode: EDIT!
    		mediator.setEdit();
    		//Child display
  		  this.sendNotification(SjamayeeFacade.GRID_DATA_CHILD_SHOW);
    		//if (this.getDetailDisplay() == "PARENT") { this.showChild(); }
    		//Insert logic here ... 
        this.parent(note); //+mediator ???
        //this.sendNotification(SjamayeeFacade.RELATION_EDITING,mediator);  		
        mediator.setMessageText("Edit relation...");
      }
  	} catch(error) {
  		Utils.alert("EditDataRelationCommand - error: "+error.message,Utils.LOG_LEVEL_ERROR);
  	}
	};
};
EditDataRelationCommand = new Class(new EditDataRelationCommand());
