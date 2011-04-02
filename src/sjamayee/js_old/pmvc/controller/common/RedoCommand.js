var RedoCommand = function() {
  this.Extends = SimpleCommand;
  this.mediator = null;
	this.execute = function(note) {
		alert("RedoCommand");
    this.mediator = note.getBody();
		try {
			//Insert logic here ... 
			//Get first UnDone-command from buffer.
			var commandBuffer = this.mediator.getCommandBuffer();
			var previousCommand = commandBuffer.getLastDoneIfNoUnDone();		
			var groupCommands = null;
			var sourceName = null;
			var groupName = null;
			var groupId = null;
			var cmd = null;
			//if ((previousCommand) && previousCommand.isUnDone()) {
			if (previousCommand) {
				switch (previousCommand.getName()) {				
					case Command.ADD:
					case Command.EDT:
					case Command.CPY:
					case Command.DEL:
					case Command.EXT:
					case Command.PST:
					case Command.NAV:
					groupCommands = commandBuffer.getAllCommandsForGroup(previousCommand);
					if ((groupCommands) && (groupCommands.length > 0)) {
						for (var i in groupCommands) {
							if (groupCommands[i]) {
								cmd = groupCommands[i];
								if (cmd.getName() != Command.NAV) {
									if (cmd.isDone() === true) { continue; }
								}							
								if (cmd.getGroupName().substr(0,3) == Command.GRP) {
									if (groupName === null) { groupName = cmd.getGroupName(); }
								}
								if (sourceName === null) { sourceName = cmd.getSourceName(); }														
								if (cmd.getSourceName() != sourceName) { break; }
								switch (cmd.getName()) {				
								  case Command.ADD: this.redo_add(cmd); break;
								  case Command.EDT: this.redo_edit(cmd); break;
								  case Command.CPY: this.redo_copy(cmd); break;
								  case Command.DEL: this.redo_delete(cmd); break;
								  case Command.EXT: this.redo_extract(cmd); break;
								  case Command.PST: this.redo_paste(cmd); break;
								  case Command.NAV: this.redo_navigation(cmd); break;
									default: break;
								}
							}
						}
					}
					break;
					default:
					break;
				}
			} else {
				Utils.beep(0);			
			}
      //this.mediator.setMessageText("Redone.");
		} catch(error) {
			Utils.alert("RedoCommand - error: "+error.message,Utils.LOG_LEVEL_ERROR);
		}
	};
	
	//Abstract
	this.redo_add = function(cmd) { return undefined; };
  this.redo_edit = function(cmd) { return undefined; };
  this.redo_copy = function(cmd) { return undefined; };
  this.redo_delete = function(cmd) { return undefined; };
  this.redo_extract = function(cmd) { return undefined; };
  this.redo_paste = function(cmd) { return undefined; };
  this.redo_navigation = function(cmd) { return undefined; };
};
RedoCommand = new Class(new RedoCommand());
