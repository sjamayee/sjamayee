var EditDataObjectCommand = function() {
  this.Extends = EditObjectCommand;
	this.execute = function(note) {
		//alert("EditDataObjectCommand");
  	try {
      var mediator = this.facade.retrieveMediator(DataObjectsListMediator.ID);
  		//var objectList = mediator.getList();    //TODO: not viewList but dataList !!!
      if (mediator.setDisplay() == GridListMediator.MODE_DISPLAY) {
  			//Insert logic here ...
        this.parent(note);
        mediator.setEdit(true);
        mediator.setMessageText("Edit object...");        
  		  this.sendNotification(SjamayeeFacade.OLIST_DATA_RESIZE,SjamayeeFacade.SIZE_NORMAL);
  		  this.sendNotification(SjamayeeFacade.OLIST_DATA_SHOW);
      }
  	} catch(error) {
  		Utils.alert("EditDataObjectCommand - error: "+error.message,Utils.LOG_LEVEL_ERROR);
  	}
	};
};
EditDataObjectCommand = new Class(new EditDataObjectCommand());
