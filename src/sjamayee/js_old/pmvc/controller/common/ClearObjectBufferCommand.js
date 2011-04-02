//Abstract
var ClearObjectBufferCommand = function() {
  this.Extends = ClearBufferCommand;
	this.execute = function(note) {
		//alert("ClearObjectBufferCommand");
		try {
		  this.parent(note);
      //this.sendNotification(SjamayeeFacade.OLIST_BUFFER_CLEARED,mediator);
      mediator.setMessageText("Object Buffer cleared.");
		} catch(error) {
			Utils.alert("ClearRelationBufferCommand - error: "+error.message,Utils.LOG_LEVEL_ERROR);
		}
	};
};
ClearObjectBufferCommand = new Class(new ClearObjectBufferCommand());
