//Abstract
var CancelObjectCommand = function() {
  this.Extends = SimpleCommand;
	this.execute = function(note) {
		//alert("CancelObjectCommand");
    //this.sendNotification(SjamayeeFacade.OBJECT_CANCELED,mediator);
	};
};
CancelObjectCommand = new Class(new CancelObjectCommand());
