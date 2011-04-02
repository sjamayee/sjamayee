var RootCommandBuffer = function() {
	this.Extends = CommandBuffer;
	this.initialize = function() {
		try {
			this.parent();
			Utils.alert("RootCommandBuffer/constructor");
		} catch(error) {
			Utils.alert("RootCommandBuffer/constructor Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		}
	};
	//Functions
	//Abstract
	this.removeExtGroups = function(command) {
		Utils.alert("RootCommandBuffer/removeExtGroups - abstract.");
		return undefined;
	};
};
RootCommandBuffer = new Class(new RootCommandBuffer());
//Statics
RootCommandBuffer.test = function() {
	var buffer = null;
	try {
		buffer = new RootCommandBuffer();
	} catch(error) {
		Utils.alert("RootCommandBuffer/test Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	}
};
