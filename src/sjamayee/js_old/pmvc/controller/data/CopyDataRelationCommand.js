var CopyDataRelationCommand = function() {
  this.Extends = CopyRelationCommand;
	this.execute = function(note) {
		//alert("CopyDataRelationCommand");
  	try {
      var mediator = this.facade.retrieveMediator(DataRelationsGridMediator.ID);
      if (mediator.setDisplay() == GridListMediator.MODE_DISPLAY) {
    		//this.setStatusMessage(SjamayeeForm.STATUS_MESSAGE_COPY_LBL,true);
    		//Insert logic here ... 
    		this.parent(note); //+mediator !!!
        //this.sendNotification(SjamayeeFacade.RELATION_COPIED,mediator);
        mediator.setMessageText("Relation copied.");
      }                
  	} catch(error) {
  		Utils.alert("CopyDataRelationCommand - error: "+error.message,Utils.LOG_LEVEL_ERROR);
  	}
	};
};
CopyDataRelationCommand = new Class(new CopyDataRelationCommand());
