var ShowRelationCommand = function() {
  this.Extends = SimpleCommand;
	this.execute = function(note) {
		//alert("ShowRelationCommand");
    //var mediator = note.getBody();
    var mediator = this.facade.retrieveMediator(DataRelationsGridMediator.ID); //TODO: SPLIT >>> DATA/MODEL - OBJECT/RELATION !!!
    //this.sendNotification(SjamayeeFacade.RELATION_SHOWED,mediator);  		
	};
};
ShowRelationCommand = new Class(new ShowRelationCommand());
