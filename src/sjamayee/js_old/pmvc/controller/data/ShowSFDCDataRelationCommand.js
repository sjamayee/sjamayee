var ShowSFDCDataRelationCommand = function() {
  this.Extends = ShowSFDCDataObjectCommand;
	this.execute = function(note) {
		//alert("ShowSFDCDataRelationCommand");
		try {
      var mediator = this.facade.retrieveMediator(DataRelationsGridMediator.ID);
      this.parent(note);
      mediator.setMessageText("SFDC Relation viewed!");
		} catch(error) {
			Utils.alert("ShowSFDCDataRelationCommand - error: "+error.message,Utils.LOG_LEVEL_ERROR);
		}
	};
};
ShowSFDCDataRelationCommand = new Class(new ShowSFDCDataRelationCommand());
