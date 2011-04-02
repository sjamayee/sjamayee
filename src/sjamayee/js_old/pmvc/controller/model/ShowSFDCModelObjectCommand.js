var ShowSFDCModelObjectCommand = function() {
  this.Extends = ShowSFDCObjectCommand;
	this.execute = function(note) {
		//alert("ShowSFDCModelObjectCommand");
		try {
      var mediator = this.facade.retrieveMediator(ModelObjectsListMediator.ID);
      this.parent(note);
      mediator.setMessageText("SFDC Object viewed!");
		} catch(error) {
			Utils.alert("ShowSFDCModelObjectCommand - error: "+error.message,Utils.LOG_LEVEL_ERROR);
		}
	};
};
ShowSFDCModelObjectCommand = new Class(new ShowSFDCModelObjectCommand());
