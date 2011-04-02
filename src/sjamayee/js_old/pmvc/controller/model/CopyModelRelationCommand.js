var CopyModelRelationCommand = function() {
  this.Extends = CopyRelationCommand;
	this.execute = function(note) {
		//alert("CopyModelRelationCommand");
  	try {
      var mediator = this.facade.retrieveMediator(ModelRelationsGridMediator.ID);
      if (mediator.setDisplay() == GridListMediator.MODE_DISPLAY) {
    		//this.setStatusMessage(SjamayeeForm.STATUS_MESSAGE_COPY_LBL,true);
    		//Insert logic here ... 
    		this.parent(note); //+mediator !!!
        //this.sendNotification(SjamayeeFacade.RELATION_COPIED,mediator);
        mediator.setMessageText("Relation copied.");
      }                
  	} catch(error) {
  		Utils.alert("CopyModelRelationCommand - error: "+error.message,Utils.LOG_LEVEL_ERROR);
  	}
	};
};
CopyModelRelationCommand = new Class(new CopyModelRelationCommand());
