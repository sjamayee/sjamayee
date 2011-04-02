var CancelDataObjectCommand = function() {
  this.Extends = CancelObjectCommand;
	this.execute = function(note) {
		//alert("CancelDataObjectCommand");
    var mediator = this.facade.retrieveMediator(DataObjectsListMediator.ID);
    if (mediator.setDisplay() == GridListMediator.MODE_DISPLAY) {
      this.parent(note);
      //this.sendNotification(SjamayeeFacade.OBJECT_CANCELED,mediator);
      mediator.setMessageText("Object canceled.");
		  this.sendNotification(SjamayeeFacade.OLIST_DATA_SHOW);
    };
	};
};
CancelDataObjectCommand = new Class(new CancelDataObjectCommand());
