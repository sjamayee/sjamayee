//Abstract
var SaveObjectCommand = function() {
  this.Extends = SimpleCommand;
	this.execute = function(note) {
		//alert("SaveObjectCommand");
  	try {
  		//var objectList = mediator.getList();    //TODO: not viewList but dataList !!!
  		/*var object = mediator.object;
			if (object !== null) {
				object = object.getObject();
				//this.setSfdcCall(SjamayeeForm.SFDC_EDIT_CHILD);
				//this.writeSnapShot();
				//TODO: BETTER !!! IN EDIT MODE !!!
				**
				if (document.getElementById(Entity.OBJECT_NAME_TEXTAREA_ID) !== null) {
					object.setName(document.getElementById(Entity.OBJECT_NAME_TEXTAREA_ID).value);
					object.setDesc(document.getElementById(Entity.OBJECT_DESC_TEXTAREA_ID).value);
					object.save(mediator);
				}**
				if (object.getId() === null) {
					var oid = Utils.nextId();
					object.setKey(oid);
					object.setVal(oid+"_value");
					//Insert new object!
					//TODO: !!!!   _oc.put(object);                      //TODO: _oc > proxy !!!
				}
				//object.save(mediator);
				Utils.alert("SaveObjectCommand - object: "+object.print());
			}*/
      //this.sendNotification(SjamayeeFacade.OBJECT_SAVED,mediator);
  	} catch(error) {
  		Utils.alert("SaveObjectCommand Error: "+error.message,Utils.LOG_LEVEL_ERROR);
  	}
	};
};
SaveObjectCommand = new Class(new SaveObjectCommand());
