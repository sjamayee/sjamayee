//Abstract
var AddObjectCommand = function() {
  this.Extends = SimpleCommand;
	this.execute = function(note) {
		//alert("AddObjectCommand");
  	try {
  		//var objectList = mediator.getList();    //TODO: not viewList but dataList !!!
			//Mode: INSERT!
			//this.setMode(SjamayeeForm.MODE_INSERT);
			//var object = new ListObject(new Entity(1,"","","",1,null));
			//mediator.object = object;
			//var command = new ObjectCommand(Command.ADD);
			//command.setObject(object);
			//mediator.setLastCommand(command,true);
      //this.sendNotification(SjamayeeFacade.OBJECT_ADDED,mediator);
  	} catch(error) {
  		Utils.alert("AddObjectCommand - error: "+error.message,Utils.LOG_LEVEL_ERROR);
  	};
  };
};
AddObjectCommand = new Class(new AddObjectCommand());
