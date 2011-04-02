var EditTextCommand = function() {
  this.Extends = SimpleCommand;
	this.execute = function(note) {
		//alert("EditTextCommand");
    var mediator = note.getBody();
    //this.sendNotification(SjamayeeFacade.TEXT_EDITED,mediator);
    mediator.setMessageText("Edit text...");
	};
};
EditTextCommand = new Class(new EditTextCommand());
