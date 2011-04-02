var DeleteModelObjectCommand = function() {
  this.Extends = DeleteObjectCommand;
	this.execute = function(note) {
		//alert("DeleteModelObjectCommand");
  	try {
      var mediator = this.facade.retrieveMediator(ModelObjectsListMediator.ID);
  		//var objectList = mediator.getList();    //TODO: not viewList but dataList !!!
      if (mediator.setDisplay() == GridListMediator.MODE_DISPLAY) {
        this.parent(note);
        mediator.setMessageText("Object deleted.");
        //this.sendNotification(SjamayeeFacade.OBJECT_DELETED,mediator);
  		  this.sendNotification(SjamayeeFacade.OLIST_MODEL_SHOW);
      }
  	} catch(error) {
  		Utils.alert("DeleteModelObjectCommand - error: "+error.message,Utils.LOG_LEVEL_ERROR);
  	}
	};
};
DeleteModelObjectCommand = new Class(new DeleteModelObjectCommand());
