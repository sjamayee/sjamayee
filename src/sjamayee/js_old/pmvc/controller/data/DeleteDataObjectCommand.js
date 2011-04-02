var DeleteDataObjectCommand = function() {
  this.Extends = DeleteObjectCommand;
	this.execute = function(note) {
		//alert("DeleteDataObjectCommand");
  	try {
      var mediator = this.facade.retrieveMediator(DataObjectsListMediator.ID);
  		//var objectList = mediator.getList();    //TODO: not viewList but dataList !!!
      if (mediator.setDisplay() == GridListMediator.MODE_DISPLAY) {
        this.parent(note);
        mediator.setMessageText("Object deleted.");
        //this.sendNotification(SjamayeeFacade.OBJECT_DELETED,mediator);
  		  this.sendNotification(SjamayeeFacade.OLIST_DATA_SHOW);
      }
  	} catch(error) {
  		Utils.alert("DeleteDataObjectCommand - error: "+error.message,Utils.LOG_LEVEL_ERROR);
  	}
	};
};
DeleteDataObjectCommand = new Class(new DeleteDataObjectCommand());
