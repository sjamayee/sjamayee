var SaveDataObjectCommand = function() {
  this.Extends = SaveObjectCommand;
	this.execute = function(note) {
		//alert("SaveDataObjectCommand");
  	try {
      var mediator = this.facade.retrieveMediator(DataObjectsListMediator.ID);
      this.parent(note);
      //this.sendNotification(SjamayeeFacade.OBJECT_SAVED,mediator);
      mediator.setDisplay(true);
      mediator.setMessageText("Object saved.");
		  this.sendNotification(SjamayeeFacade.OLIST_DATA_SHOW);
  	} catch(error) {
  		Utils.alert("SaveDataObjectCommand Error: "+error.message,Utils.LOG_LEVEL_ERROR);
  	} finally {
  		//Reset Globals !!!
  		//mediator.object = null;
  		//Mode: DISPLAY
  		//this.setMode(Grid.MODE_DISPLAY);
  	}
	};
};
SaveDataObjectCommand = new Class(new SaveDataObjectCommand());
