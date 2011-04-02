//Abstract
var UndoCommand = function() {
  this.Extends = SimpleCommand;
  this.mediator = null;
	this.execute = function(note) {
		alert("UndoCommand");
    this.mediator = note.getBody();
		try {
			//Insert logic here ... 
			//Get last Done-command from buffer.
			var commandBuffer = this.mediator.getCommandBuffer();
			var previousCommand = commandBuffer.getFirstUnDoneIfNoDone();
			//var newCommand = null;
			var sourceName = null;
			//alert("UndoRelationCommand - previousCommand: "+previousCommand.print());
			//if ((previousCommand) && previousCommand.isDone()) {
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
						//Reverse the order of the array, for UNDO !!!
						groupCommands.reverse();
						var groupName = null;
						var groupId = null;
						for (var i in groupCommands) {
							if (groupCommands[i]) {
								var cmd = groupCommands[i];
								if (cmd.getName() != Command.NAV) {
									if (cmd.isUnDone() === true) { continue; }
								}
								if (cmd.getGroupName().substr(0,3) == Command.GRP) {
									if (groupName === null) { groupName = cmd.getGroupName(); }
								}
								if (sourceName === null) { sourceName = cmd.getSourceName(); }
								if (cmd.getSourceName() != sourceName) { break; }
								switch (cmd.getName()) {				
								  case Command.ADD: this.undo_add(cmd); break;
								  case Command.EDT: this.undo_edit(cmd); break;
								  case Command.CPY: this.undo_copy(cmd); break;
								  case Command.DEL: this.undo_delete(cmd); break;
								  case Command.EXT: this.undo_extract(cmd); break;
								  case Command.PST: this.undo_paste(cmd); break;
								  case Command.NAV: this.undo_navigation(cmd); break;
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
      //this.mediator.setMessageText("Undone.");
		} catch(error) {
			Utils.alert("UndoCommand - error: "+error.message,Utils.LOG_LEVEL_ERROR);
		}
	};

	//Abstract
	this.undo_add = function(cmd) { return undefined; };
  this.undo_edit = function(cmd) { return undefined; };
  this.undo_copy = function(cmd) { return undefined; };
  this.undo_delete = function(cmd) { return undefined; };
  this.undo_extract = function(cmd) { return undefined; };
  this.undo_paste = function(cmd) { return undefined; };
  this.undo_navigation = function(cmd) { return undefined; };
};
UndoCommand = new Class(new UndoCommand());
