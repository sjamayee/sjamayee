var CancelDataRelationCommand = function() {
  this.Extends = CancelRelationCommand;
	this.execute = function(note) {
		//alert("CancelDataRelationCommand");
    var mediator = this.facade.retrieveMediator(DataRelationsGridMediator.ID);
    if (mediator.setDisplay() == GridListMediator.MODE_DISPLAY) {
      this.parent(note); //+mediator !!!
      //this.sendNotification(SjamayeeFacade.RELATION_CANCELED,mediator);
      mediator.setMessageText("Relation canceled.");
    }    
	};
};
CancelDataRelationCommand = new Class(new CancelDataRelationCommand());
