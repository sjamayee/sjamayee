var EditModelObjectCommand = function() {
  this.Extends = EditObjectCommand;
	this.execute = function(note) {
		//alert("EditModelObjectCommand");
  	try {
      var mediator = this.facade.retrieveMediator(ModelObjectsListMediator.ID);
  		//var objectList = mediator.getList();    //TODO: not viewList but dataList !!!
      if (mediator.setDisplay() == GridListMediator.MODE_DISPLAY) {
  			//Insert logic here ...
        this.parent(note);
        mediator.setEdit(true);
        mediator.setMessageText("Edit object...");
  		  this.sendNotification(SjamayeeFacade.OLIST_MODEL_RESIZE,SjamayeeFacade.SIZE_NORMAL);
  		  this.sendNotification(SjamayeeFacade.OLIST_MODEL_SHOW);
      }
  	} catch(error) {
  		Utils.alert("EditModelObjectCommand - error: "+error.message,Utils.LOG_LEVEL_ERROR);
  	}
	};
};
EditModelObjectCommand = new Class(new EditModelObjectCommand());
