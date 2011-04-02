var ShowSFDCModelRelationCommand = function() {
  this.Extends = ShowSFDCModelObjectCommand;
	this.execute = function(note) {
		//alert("ShowSFDCModelRelationCommand");
		try {
      var mediator = this.facade.retrieveMediator(ModelRelationsGridMediator.ID);
      this.parent(note);
      mediator.setMessageText("SFDC Relation viewed!");
		} catch(error) {
			Utils.alert("ShowSFDCModelRelationCommand - error: "+error.message,Utils.LOG_LEVEL_ERROR);
		}
	};
};
ShowSFDCModelRelationCommand = new Class(new ShowSFDCModelRelationCommand());
