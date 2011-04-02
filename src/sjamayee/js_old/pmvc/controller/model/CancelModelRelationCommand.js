var CancelModelRelationCommand = function() {
  this.Extends = CancelRelationCommand;
	this.execute = function(note) {
		//alert("CancelModelRelationCommand");
    var mediator = this.facade.retrieveMediator(ModelRelationsGridMediator.ID);
    if (mediator.setDisplay() == GridListMediator.MODE_DISPLAY) {
      this.parent(note); //+mediator !!!
      //this.sendNotification(SjamayeeFacade.RELATION_CANCELED,mediator);
      mediator.setMessageText("Relation canceled.");
    }    
	};
};
CancelModelRelationCommand = new Class(new CancelModelRelationCommand());
