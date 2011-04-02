var UndoDataObjectCommand = function() {
  this.Extends = UndoObjectCommand;
  
	this.execute = function(note) {
		//alert("UndoDataObjectCommand");
		try {
      this.mediator = this.facade.retrieveMediator(DataObjectsListMediator.ID);
      if (this.mediator.setDisplay() == GridListMediator.MODE_DISPLAY) {
  			//Insert logic here ... 
    		//var grid = mediator.grid;
    		//this.parent(note);
        //this.sendNotification(SjamayeeFacade.OBJECT_UNDONE,mediator);
        this.mediator.setMessageText("Object undone.");
  		  this.mediator.sendNotification(SjamayeeFacade.OLIST_DATA_SHOW);
      }
		} catch(error) {
			Utils.alert("UndoDataObjectCommand - error: "+error.message,Utils.LOG_LEVEL_ERROR);
		}
	};
};
UndoDataObjectCommand = new Class(new UndoDataObjectCommand());
