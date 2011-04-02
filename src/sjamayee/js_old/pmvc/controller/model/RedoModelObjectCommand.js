var RedoModelObjectCommand = function() {
  this.Extends = RedoObjectCommand;
  
	this.execute = function(note) {
		//alert("RedoModelObjectCommand");
		try {
      this.mediator = this.facade.retrieveMediator(ModelObjectsListMediator.ID);
      if (this.mediator.setDisplay() == GridListMediator.MODE_DISPLAY) {
  			//Insert logic here ... 
    		//var grid = this.mediator.grid;
    		//this.parent(note);
        //this.sendNotification(SjamayeeFacade.OBJECT_REDONE,mediator);
        this.mediator.setMessageText("Object redone.");
  		  this.sendNotification(SjamayeeFacade.OLIST_MODEL_SHOW);
      }
		} catch(error) {
			Utils.alert("RedoModelObjectCommand - error: "+error.message,Utils.LOG_LEVEL_ERROR);
		}
	};
};
RedoModelObjectCommand = new Class(new RedoModelObjectCommand());
