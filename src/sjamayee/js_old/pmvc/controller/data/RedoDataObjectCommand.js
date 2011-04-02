var RedoDataObjectCommand = function() {
  this.Extends = RedoObjectCommand;
  
	this.execute = function(note) {
		//alert("RedoDataObjectCommand");
		try {
      this.mediator = this.facade.retrieveMediator(DataObjectsListMediator.ID);
      if (this.mediator.setDisplay() == GridListMediator.MODE_DISPLAY) {
  			//Insert logic here ... 
    		//var grid = this.mediator.grid;
    		//this.parent(note);
        //this.sendNotification(SjamayeeFacade.OBJECT_REDONE,mediator);
        this.mediator.setMessageText("Object redone.");
  		  this.sendNotification(SjamayeeFacade.OLIST_DATA_SHOW);
      }
		} catch(error) {
			Utils.alert("RedoDataObjectCommand - error: "+error.message,Utils.LOG_LEVEL_ERROR);
		}
	};
};
RedoDataObjectCommand = new Class(new RedoDataObjectCommand());
