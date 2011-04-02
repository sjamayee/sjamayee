//Abstract
var DeleteObjectCommand = function() {
  this.Extends = SimpleCommand;
	this.execute = function(note) {
		//alert("DeleteObjectCommand");
  	try {
  		//var objectList = mediator.getList();    //TODO: not viewList but dataList !!!
			//Mode: DISPLAY!
			//this.setMode(SjamayeeForm.MODE_DISPLAY);
			//Insert logic here ... 
			//var object = mediator.object;
			//var command = new ObjectCommand(Command.DEL);
			//command.setObject(object);
			//mediator.setLastCommand(command,true);
      //this.sendNotification(SjamayeeFacade.OBJECT_DELETED,mediator);
  	} catch(error) {
  		Utils.alert("DeleteObjectCommand - error: "+error.message,Utils.LOG_LEVEL_ERROR);
  	}
	};
};
DeleteObjectCommand = new Class(new DeleteObjectCommand());
