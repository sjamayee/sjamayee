var CancelModelObjectCommand = function() {
  this.Extends = CancelObjectCommand;
	this.execute = function(note) {
		//alert("CancelModelObjectCommand");
    var mediator = this.facade.retrieveMediator(ModelObjectsListMediator.ID);
    if (mediator.setDisplay() == GridListMediator.MODE_DISPLAY) {
      this.parent(note);
      //this.sendNotification(SjamayeeFacade.OBJECT_CANCELED,mediator);
      mediator.setMessageText("Object canceled.");
		  this.sendNotification(SjamayeeFacade.OLIST_MODEL_SHOW);
    };
	};
};
CancelModelObjectCommand = new Class(new CancelModelObjectCommand());
