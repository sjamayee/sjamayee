//Abstract
var CancelRelationCommand = function() {
  this.Extends = SimpleCommand;
	this.execute = function(note) {
		//alert("CancelRelationCommand");
		//_cf.cancelEditing();              //TODO: WHAT !!! WHAT !!! WHAT !!!
    //this.sendNotification(SjamayeeFacade.RELATION_CANCELED,mediator);
	};
};
CancelRelationCommand = new Class(new CancelRelationCommand());
