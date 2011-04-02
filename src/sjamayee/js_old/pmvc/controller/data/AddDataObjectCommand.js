var AddDataObjectCommand = function() {
  this.Extends = AddObjectCommand;
	this.execute = function(note) {
		//alert("AddDataObjectCommand");
  	try {
      var mediator = this.facade.retrieveMediator(DataObjectsListMediator.ID);
  	  //var objectList = mediator.getList();    //TODO: not viewList but dataList !!!
      if (mediator.setDisplay() == GridListMediator.MODE_DISPLAY) {
        this.parent(note);
        mediator.setEdit(true);
        mediator.setMessageText("Add object...");
  		  this.sendNotification(SjamayeeFacade.OLIST_DATA_RESIZE,SjamayeeFacade.SIZE_NORMAL);
  		  this.sendNotification(SjamayeeFacade.OLIST_DATA_SHOW);
      }
  	} catch(error) {
  		Utils.alert("AddDataObjectCommand - error: "+error.message,Utils.LOG_LEVEL_ERROR);
  	};    
  };
};
AddDataObjectCommand = new Class(new AddDataObjectCommand());
