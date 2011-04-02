//Abstract
var EditObjectCommand = function() {
  this.Extends = SimpleCommand;
	this.execute = function(note) {
		//alert("EditObjectCommand");
  	try {
  		//var objectList = mediator.getList();    //TODO: not viewList but dataList !!!
			//Mode: EDIT!
			//this.setMode(SjamayeeForm.MODE_EDIT);
			//Insert logic here ...
  		//var olist = mediator.getList();
			//if (mediator.object) { }
    /*var object = mediator.object;
			var command = new ObjectCommand(Command.EDT);
			command.setObject(object);
			mediator.setLastCommand(command,false);*/
      //this.sendNotification(SjamayeeFacade.OBJECT_EDITED,mediator);
  	} catch(error) {
  		Utils.alert("EditObjectCommand - error: "+error.message,Utils.LOG_LEVEL_ERROR);
  	}
	};
};
EditObjectCommand = new Class(new EditObjectCommand());
