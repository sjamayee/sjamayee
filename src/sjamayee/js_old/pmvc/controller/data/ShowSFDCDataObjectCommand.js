var ShowSFDCDataObjectCommand = function() {
  this.Extends = ShowSFDCObjectCommand;
	this.execute = function(note) {
		//alert("ShowSFDCDataObjectCommand");
		try {
      var mediator = this.facade.retrieveMediator(DataObjectsListMediator.ID);
      this.parent(note);
      mediator.setMessageText("SFDC Object viewed!");
		} catch(error) {
			Utils.alert("ShowSFDCDataObjectCommand - error: "+error.message,Utils.LOG_LEVEL_ERROR);
		}
	};
};
ShowSFDCDataObjectCommand = new Class(new ShowSFDCDataObjectCommand());
