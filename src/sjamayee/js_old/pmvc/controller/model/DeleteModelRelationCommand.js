var DeleteModelRelationCommand = function() {
  this.Extends = DeleteRelationCommand;
	this.execute = function(note) {
		//alert("DeleteModelRelationCommand");
  	try {
      var mediator = this.facade.retrieveMediator(ModelRelationsGridMediator.ID);
      if (mediator.setDisplay() == GridListMediator.MODE_DISPLAY) {
    		//if (this.getDetailDisplay() == "PARENT") { this.showChild(); }
    		//this.setStatusMessage(SjamayeeForm.STATUS_MESSAGE_DELETE_LBL,true);
    		//Insert logic here ... 
    		this.parent(note); //+mediator ???
        //this.sendNotification(SjamayeeFacade.RELATION_DELETED,mediator);  		
        mediator.setMessageText("Relation deleted.");
      }
  	} catch(error) {
  		Utils.alert("DeleteModelRelationCommand - error: "+error.message,Utils.LOG_LEVEL_ERROR);
  	}
	};
};
DeleteModelRelationCommand = new Class(new DeleteModelRelationCommand());
