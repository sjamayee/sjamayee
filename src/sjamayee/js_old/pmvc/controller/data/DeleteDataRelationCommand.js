var DeleteDataRelationCommand = function() {
  this.Extends = DeleteRelationCommand;
	this.execute = function(note) {
		//alert("DeleteDataRelationCommand");
  	try {
      var mediator = this.facade.retrieveMediator(DataRelationsGridMediator.ID);
      if (mediator.setDisplay() == GridListMediator.MODE_DISPLAY) {
    		//this.setStatusMessage(SjamayeeForm.STATUS_MESSAGE_DELETE_LBL,true);
    		//Insert logic here ... 
    		this.parent(note); //+mediator ???
        //this.sendNotification(SjamayeeFacade.RELATION_DELETED,mediator);  		
        mediator.setMessageText("Relation deleted.");
      }
  	} catch(error) {
  		Utils.alert("DeleteDataRelationCommand - error: "+error.message,Utils.LOG_LEVEL_ERROR);
  	}
	};
};
DeleteDataRelationCommand = new Class(new DeleteDataRelationCommand());
