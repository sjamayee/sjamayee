var AddModelObjectCommand = function() {
  this.Extends = AddObjectCommand;
	this.execute = function(note) {
		//alert("AddModelObjectCommand");
  	try {
      var mediator = this.facade.retrieveMediator(ModelObjectsListMediator.ID);
  		//var objectList = mediator.getList();    //TODO: not viewList but dataList !!!
      if (mediator.setDisplay() == GridListMediator.MODE_DISPLAY) {
        this.parent(note);
        mediator.setEdit(true);
        mediator.setMessageText("Add object...");
  		  this.sendNotification(SjamayeeFacade.OLIST_MODEL_RESIZE,SjamayeeFacade.SIZE_NORMAL);
  		  this.sendNotification(SjamayeeFacade.OLIST_MODEL_SHOW);
      }
  	} catch(error) {
  		Utils.alert("AddModelObjectCommand - error: "+error.message,Utils.LOG_LEVEL_ERROR);
  	};  
  };
};
AddModelObjectCommand = new Class(new AddModelObjectCommand());
