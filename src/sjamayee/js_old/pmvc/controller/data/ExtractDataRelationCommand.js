var ExtractDataRelationCommand = function() {
  this.Extends = ExtractRelationCommand;
	this.execute = function(note) {
		//alert("ExtractDataRelationCommand");
  	var nok = false;
  	try {
      var mediator = this.facade.retrieveMediator(DataRelationsGridMediator.ID);
      if (mediator.setDisplay() == GridListMediator.MODE_DISPLAY) {
    		//this.setStatusMessage(SjamayeeForm.STATUS_MESSAGE_EXTRACT_LBL,true);
    		//Insert logic here ... 
    		nok = this.parent(note); //+mediator !!!
        //this.sendNotification(SjamayeeFacade.RELATION_EXTRACTED,mediator);
        mediator.setMessageText("Relation extracted.");
      }          
  	} catch(error) {
  		Utils.alert("ExtractDataRelationCommand - error: "+error.message,Utils.LOG_LEVEL_ERROR);
  	} finally {
  		if (nok) { Utils.beep(1); }
  	}
	};
};
ExtractDataRelationCommand = new Class(new ExtractDataRelationCommand());
