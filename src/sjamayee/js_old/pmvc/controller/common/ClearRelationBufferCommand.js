//Abstract
var ClearRelationBufferCommand = function() {
  this.Extends = ClearBufferCommand;
	this.execute = function(note) {
		//alert("ClearRelationBufferCommand");
		try {
      var mediator = null; //parameter !!!
		  this.parent(note);
      //this.sendNotification(SjamayeeFacade.RELATION_BUFFER_CLEARED,mediator);
      mediator.setMessageText("Relation Buffer cleared.");
		} catch(error) {
			Utils.alert("ClearRelationBufferCommand - error: "+error.message,Utils.LOG_LEVEL_ERROR);
		}
	};
};
ClearRelationBufferCommand = new Class(new ClearRelationBufferCommand());
