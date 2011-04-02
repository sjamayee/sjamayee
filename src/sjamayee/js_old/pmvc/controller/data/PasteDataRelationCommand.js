var PasteDataRelationCommand = function() {
  this.Extends = PasteRelationCommand;
	this.execute = function(note) {
		//alert("PasteDataRelationCommand");
  	//alert("PasteDataRelationCommand - before: "+_kb.getShift());
  	try {
      var mediator = this.facade.retrieveMediator(DataRelationsGridMediator.ID);
      if (mediator.setDisplay() == GridListMediator.MODE_DISPLAY) {
    		//this.setStatusMessage(SjamayeeForm.STATUS_MESSAGE_PASTE_LBL,true);
    		this.parent(note); //+mediator !!!
        //this.sendNotification(SjamayeeFacade.RELATION_PASTED,mediator);
        mediator.setMessageText("Relation pasted.");
      }                
  	} catch(error) {
  		Utils.alert("PasteDataRelationCommand - error: "+error.message,Utils.LOG_LEVEL_ERROR);
  	}
	};
};
PasteDataRelationCommand = new Class(new PasteDataRelationCommand());
