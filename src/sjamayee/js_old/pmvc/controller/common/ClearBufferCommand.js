//Abstract
var ClearBufferCommand = function() {
  this.Extends = SimpleCommand;
  this.mediator = null;
	this.execute = function(note) {
		alert("ClearBufferCommand");
    this.mediator = note.getBody();
		try {
			var content = '';
			var commandBuffer = this.mediator.getCommandBuffer();
			if (commandBuffer) {
				var buffer = commandBuffer.getBuffer();
				for (var i in buffer) {
					if (buffer[i]) {
						var command = buffer[i];
						content += command.print()+"\n";
					}
				}
				//MUST STAY *** ALERT ***
				alert("ClearBufferCommand - commandBuffer:\n"+commandBuffer.print());
			}
			//Utils.alert("ClearRelationBufferCommand:\n"+content);
			this.mediator.setCommandBuffer(new CommandBuffer());
			this.mediator.setLastCommand(null,false);
      this.mediator.setMessageText("Relation Buffer cleared.");
		} catch(error) {
			Utils.alert("ClearBufferCommand - error: "+error.message,Utils.LOG_LEVEL_ERROR);
		}
	};
};
ClearBufferCommand = new Class(new ClearBufferCommand());
