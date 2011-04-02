var SaveModelObjectCommand = function() {
  this.Extends = SaveObjectCommand;
	this.execute = function(note) {
		//alert("SaveModelObjectCommand");
  	try {
      var mediator = this.facade.retrieveMediator(ModelObjectsListMediator.ID);
      this.parent(note);
      //this.sendNotification(SjamayeeFacade.OBJECT_SAVED,mediator);
      mediator.setDisplay(true);
      mediator.setMessageText("Object saved.");
		  this.sendNotification(SjamayeeFacade.OLIST_MODEL_SHOW);
  	} catch(error) {
  		Utils.alert("SaveModelObjectCommand Error: "+error.message,Utils.LOG_LEVEL_ERROR);
  	} finally {
  		//Reset Globals !!!
  		//mediator.object = null;
  		//Mode: DISPLAY
  		//this.setMode(Grid.MODE_DISPLAY);
  	}
	};
};
SaveModelObjectCommand = new Class(new SaveModelObjectCommand());
