var ShowObjectCommand = function() {
  this.Extends = SimpleCommand;
	this.execute = function(note) {
		//alert("ShowObjectCommand");
    var mediator = this.facade.retrieveMediator(DataObjectsListMediator.ID); //TODO: SPLIT >>> DATA/MODEL - OBJECT/RELATION !!!
    //this.sendNotification(SjamayeeFacade.OBJECT_SHOWED,mediator);
	};
};
ShowObjectCommand = new Class(new ShowObjectCommand());
