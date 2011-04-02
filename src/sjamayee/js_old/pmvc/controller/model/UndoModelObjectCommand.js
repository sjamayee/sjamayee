var UndoModelObjectCommand = function() {
  this.Extends = UndoObjectCommand;
  
	this.execute = function(note) {
		//alert("UndoModelObjectCommand");
		try {
      this.mediator = this.facade.retrieveMediator(ModelObjectsListMediator.ID);
      if (this.mediator.setDisplay() == GridListMediator.MODE_DISPLAY) {
  			//Insert logic here ... 
    		//var grid = mediator.grid;
    		//this.parent(note);
        //this.sendNotification(SjamayeeFacade.OBJECT_UNDONE,mediator);
        this.mediator.setMessageText("Object undone.");
  		  this.mediator.sendNotification(SjamayeeFacade.OLIST_MODEL_SHOW);
      }
		} catch(error) {
			Utils.alert("UndoModelObjectCommand - error: "+error.message,Utils.LOG_LEVEL_ERROR);
		}
	};
};
UndoModelObjectCommand = new Class(new UndoModelObjectCommand());
