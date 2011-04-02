var CommandBuffer = function() {
	this.Extends = SjamayeeBase;
	this.initialize = function() {
		try {
			this.parent();
			this.buffer = [];
		} catch(error) {
			Utils.alert("CommandBuffer/constructor Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		}
	};
	//Getters & Setters
	this.getBuffer = function() {
		var result = [];
		if ((this.buffer !== undefined) && (this.buffer !== null)) {
			result = this.buffer;
		}
		return result;
	};
	this.getLength = function() {
		var result = 0;
		if ((this.buffer !== undefined) && (this.buffer !== null)) {
			result = this.buffer.length;
		}
		return result;
	};
	this.getNumberDone = function() {
		var result = 0;
		try {
			if (this.isEmpty() === false) {
				for (var i in this.buffer) {
					if (this.buffer[i]) {
						var command = this.buffer[i];
						if (command.isDone() === true) { ++result; }
					}
				}
			}
		} catch(error) {
			Utils.alert("CommandBuffer/getNumberDone Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	};
	this.getNumberUnDone = function() {
		var result = 0;
		try {
			if (this.isEmpty() === false) {
				for (var i in this.buffer) {
					if (this.buffer[i]) {
						var command = this.buffer[i];
						if (command.isUnDone() === true) { ++result; }
					}
				}
			}
		} catch(error) {
			Utils.alert("CommandBuffer/getNumberUnDone Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	};
	this.getNumberOfCommands = function(name,unDone) {
		var result = 0;
		try {
			if (this.isEmpty() === false) {
				for (var i in this.buffer) {
					if (this.buffer[i]) {
						var command = this.buffer[i];
						if (command.getName() == name) {
							if (unDone !== null) {
								if (unDone === false) {
									if (command.isDone() === true) { ++result; }
								}
								if (unDone === true) {
									if (command.isUnDone() === true) { ++result; }
								}
							}
						}
					}
				}
			}
		} catch(error) {
			Utils.alert("CommandBuffer/getNumberOfCommands Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	};
	this.isEmpty = function() {
		return (this.getLength() === 0)?true:false;
	};
	this.hasDoneCommands = function() {
		return (this.getNumberDone() > 0)?true:false;
	};
	this.hasUnDoneCommands = function() {
		var result = (this.getNumberUnDone() > 0)?true:false;
		if (result) {
			var unDone = this.getFirstUnDone();
			result = (unDone)?true:false;
		}
		return result;
	};
	this.hasPastableCommands = function() {
		var result = false;
		try {
			var count = 0;
			count += this.getNumberOfCommands(Command.ADD,false);
			count += this.getNumberOfCommands(Command.DEL,false);
			count += this.getNumberOfCommands(Command.EDT,false);
			count += this.getNumberOfCommands(Command.CPY,false);
			count += this.getNumberOfCommands(Command.EXT,false);
			result = (count > 0)?true:false;
		} catch(error) {
			Utils.alert("CommandBuffer/hasPastableCommands Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	};
	this.isAscending = function() {
		var result = false;
		try {
			if (this.isEmpty() === false) {
				var cmdFirst = this.buffer[0];
				if (cmdFirst) {
					var cmdFirstLocation = ((cmdFirst.getNivo() * 1000) + (cmdFirst.getPosition().getColumn() * 100) + cmdFirst.getPosition().getRow());
					var cmdLast = this.buffer[(this.getLength() - 1)];
					if (cmdLast) {
						var cmdLastLocation = ((cmdLast.getNivo() * 1000) + (cmdLast.getPosition().getColumn() * 100) + cmdLast.getPosition().getRow());
						result = (cmdFirstLocation < cmdLastLocation)?true:false;
						/*alert("CommandBuffer/isAscending - result: "+result+
						      "\ncmdFirstLocation: "+cmdFirsttLocation+
									"\ncmdLastLocation: "+cmdLastLocation);*/
					}
				}
			}
		} catch(error) {
			Utils.alert("CommandBuffer/isAscending Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	};
	/*
	this.hasActivePasteCommandsForGroup = function(command) {
		var result = false;
		try {
			if (command) {
				var groupName = command.getGroupName();
				if (groupName.substr(0,3) != Command.GRP) {
					groupName = command.getSourceName();
				}			
				if (groupName) {
					if (this.isEmpty() === false) {
						for (var i in this.buffer) {
							if (this.buffer[i]) {
								var cmd = this.buffer[i];
								//Skip checkpoints!
								if (cmd.getName() == Command.CKP) { continue; }
								var cmdGroupName = cmd.getGroupName();
								if (cmdGroupName.substr(0,3) != Command.GRP) {
									cmdGroupName = cmd.getSourceName();
								}			
								if (cmdGroupName == groupName) {
									if ((cmd.getName() == Command.PST) &&	(cmd.isDone() === true)) {
										result = true;
										break;
									}
								}
							}
						}
					}
				}
			}		
		} catch(error) {
			Utils.alert("CommandBuffer/hasActivePasteCommandsForGroup Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	};
	*/
	//Functions
	this.getById = function(id) {
		var _id = (id !== undefined)?id:null;
		var result = null;
		try {
			if (_id) {
				if (this.isEmpty() === false) {
					for (var i in this.buffer) {
						if (this.buffer[i]) {
							if (this.buffer[i].getId() == _id) {
								result = this.buffer[i];
								break;
							}
						}
					}
				}		
			}
		} catch(error) {
			Utils.alert("CommandBuffer/getById Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	};
	this.getByNivoPositionRelation = function(command) {
		var _command = (command !== undefined)?command:null;
		Utils.alert("CommandBuffer/getByNivoPositionRelation - command: "+((_command)?_command.print():"null"));
		var result = null;
		try {
			if (_command) {
				if (this.isEmpty() === false) {
					//Calculate command location.
					var commandLocation = ((_command.getNivo() * 1000) + (_command.getPosition().getColumn() * 100) + _command.getPosition().getRow());
					for (var i in this.buffer) {
						if (this.buffer[i]) {						
							var cmd = this.buffer[i];
							//Calculate cmd location.
							var cmdLocation = ((cmd.getNivo() * 1000) + (cmd.getPosition().getColumn() * 100) + cmd.getPosition().getRow());
							if (cmdLocation == commandLocation) {
								result = cmd;
								break;
							}
						}
					}
				}		
			}
		} catch(error) {
			Utils.alert("CommandBuffer/getByNivoPositionRelation Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	};
	this.checkRelation = function(id,nivo) {
		var _id = (id !== undefined)?id:null;
		var _nivo = (nivo !== undefined)?nivo:null;
		Utils.alert("CommandBuffer/checkRelation - id: "+_id+" nivo: "+_nivo);
		//Outputs status of relation in buffer:
		//				 done unDone
		//--------------------
		//  	  Add  	A			 a
		// 	   Copy   C			 c
		// 	 Delete   D			 d
		// 	   Edit   E			 e
		// 	  Paste   P			 p
		//  Extract  	X			 x
		// Navigate 	N			 n
		//--------------------
		var result = null;
		try {
			if (this.isEmpty() === false) {
	      for (var i = (this.buffer.length - 1); i >= 0; i--) {
					if (this.buffer[i]) {
						var command = this.buffer[i];
						//if (!(command instanceof RelationCommand)) { continue; }
						if ((command.getName() != Command.ADD) &&
								(command.getName() != Command.CPY) &&
								(command.getName() != Command.DEL) &&
								(command.getName() != Command.EDT) &&
								(command.getName() != Command.EXT) &&
								(command.getName() != Command.PST) &&
								(command.getName() != Command.NAV)) { continue; }
						var relation = command.getRelation();
						if (relation) {
							if (relation.getId() != _id) { continue; }
						//if (command.getNivo() != _nivo) { continue; }						
							switch (command.getName()) {
								case Command.ADD:
								result = (command.isDone() === true)?Command.CHAR_A:(((!result) || (result == Command.CHAR_N) || (result >= Command.CHAR_a))?Command.CHAR_a:result);
								break;
								case Command.CPY:
								result = (command.isDone() === true)?Command.CHAR_C:(((!result) || (result == Command.CHAR_N) || (result >= Command.CHAR_a))?Command.CHAR_c:result);
								break;
								case Command.DEL:
								result = (command.isDone() === true)?Command.CHAR_X:(((!result) || (result == Command.CHAR_N) || (result >= Command.CHAR_a))?Command.CHAR_x:result);
								break;
								case Command.EDT:
								result = (command.isDone() === true)?Command.CHAR_E:(((!result) || (result == Command.CHAR_N) || (result >= Command.CHAR_a))?Command.CHAR_e:result);
								break;
								case Command.EXT:
								result = (command.isDone() === true)?Command.CHAR_T:(((!result) || (result == Command.CHAR_N) || (result >= Command.CHAR_a))?Command.CHAR_t:result);
								break;
								case Command.PST:
								result = (command.isDone() === true)?Command.CHAR_V:(((!result) || (result == Command.CHAR_N) || (result >= Command.CHAR_a))?Command.CHAR_v:result);
								break;
								case Command.NAV:
								result = (result === null)?(command.isDone()?Command.CHAR_N:Command.CHAR_n):result;
								break;
								default:
								break;
							}
						}
					}
					if (result) {
						if (((result >= Command.CHAR_A) && (result <= Command.CHAR_Z)) && (result != Command.CHAR_N)) {
							break;
						}
					}
				}
			}		
		} catch(error) {
			Utils.alert("CommandBuffer/checkRelation Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	};
	this.remove = function(command) {
		var _command = (command !== undefined)?command:null;
		Utils.alert("CommandBuffer/remove - command: "+((_command)?_command.print():"null"));	
		var result = null;
		try {
			if (this.isEmpty() === false) {
				for (var i in this.buffer) {
					if (this.buffer[i]) {
						if (this.buffer[i].getId() == _command.getId()) {
							result = this.buffer.splice(i,1);
							if (result.getName() == Command.NAV) {
								if (_cNc > 0) {	_cNc = (_cNc - 1); }
							}						
							break;
						}
					}
				}
			}		
		} catch(error) {
			Utils.alert("CommandBuffer/remove Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	};
	this.removeGroup = function(command) {
		var _command = (command !== undefined)?command:null;
		Utils.alert("CommandBuffer/removeGroup - command: "+((_command)?_command.print():"null"));	
		var result = [];
		try {
			if (_command) {
				var groupName = _command.getGroupName();
				if (groupName.substr(0,3) != Command.GRP) {
					groupName = _command.getSourceName();
				}			
				if (groupName) {
					while (this.isEmpty() === false) {
						var groupFound = false;
						for (var i in this.buffer) {
							if (this.buffer[i]) {
								var cmd = this.buffer[i];							
								var cmdGroupName = cmd.getGroupName();
								if (cmdGroupName.substr(0,3) != Command.GRP) {
									cmdGroupName = cmd.getSourceName();
								}			
								if (cmdGroupName == groupName) {
									groupFound = true;
									result.push(this.remove(this.buffer[i]));
								}
							}
						}
						if (groupFound === false) { break; }
					}
				}
				result.push(this.remove(command));			
			}		
		} catch(error) {
			Utils.alert("CommandBuffer/removeGroup Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	};
	this.removeExtGroups = function(command) {
		var _command = (command !== undefined)?command:null;
		Utils.alert("CommandBuffer/removeExtGroups - command: "+((_command)?_command.print():"null"));	
		var result = [];
		try {
			if (_command) {
				var groupName = null;
				var extractedRelation = _command.getRelation();
				if (extractedRelation) {
					groupName = _command.getGroupName(); //Command.EXT + "_" + command.getGroupId();
				}
				if (groupName) {
					while (this.isEmpty() === false) {
						var groupFound = false;
						for (var i in this.buffer) {
							if (this.buffer[i]) {
								if (this.buffer[i].getGroupName() == groupName) {								
									groupFound = true;
									result.push(this.removeGroup(this.buffer[i]));
								}
							}
						}
						if (groupFound === false) { break; }
					}
				}
				result.push(this.remove(_command));
			}		
		} catch(error) {
			Utils.alert("CommandBuffer/removeExtGroups Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	};
	this.removePasteCommands = function(command) {
		var _command = (command !== undefined)?command:null;
		Utils.alert("CommandBuffer/removePasteCommands - command: "+((_command)?_command.print():"null"));
		try {
			if (_command) {
				var groupName = _command.getGroupName();
				if (groupName) {
					while (this.isEmpty() === false) {
						var cmdFound = false;					
						for (var i in this.buffer) {
							if (this.buffer[i]) {
								var cmd = this.buffer[i];							
								if (cmd.getName() != Command.PST) { continue; }
								if (cmd.getGroupName() == groupName) {
									this.buffer.splice(i,1);
									cmdFound = true;
									break;
								}
							}
						}
						if (cmdFound === false) { break; }					
					}
				}
			}		
		} catch(error) {
			Utils.alert("CommandBuffer/removePasteCommands Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return this;
		}
	};
	this.getAllCommandsForGroup = function(command) {
		var _command = (command !== undefined)?command:null;
		Utils.alert("CommandBuffer/getAllCommandsForGroup - command: "+((_command)?_command.print():"null"));
		var result = [];
		try {
			if (_command) {
				var groupName = _command.getGroupName();
				if (groupName.substr(0,3) != Command.GRP) {
					groupName = _command.getSourceName();
				}
				if (groupName) {
					if (this.isEmpty() === false) {
						for (var i in this.buffer) {
							if (this.buffer[i]) {
								var cmd = this.buffer[i];							
								//Skip checkpoints!
								if (cmd.getName() == Command.CKP) { continue; }
								var cmdGroupName = cmd.getGroupName();
								if (cmdGroupName.substr(0,3) != Command.GRP) {
									cmdGroupName = cmd.getSourceName();
								}			
								if (cmdGroupName == groupName) {
									result.push(this.buffer[i]);
								}
							}
						}
					}
				}
			}		
		} catch(error) {
			Utils.alert("CommandBuffer/getAllCommandsForGroup Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	};
	this.removeNavigationCommands = function(nivo) {
		var _nivo = (nivo !== undefined)?nivo:null;
		Utils.alert("CommandBuffer/removeNavigationCommands - nivo: "+_nivo);
		try {
			if (this.isEmpty() === false) {
				var commandDeleted = true;
				while (commandDeleted === true) {
					commandDeleted = false;
					for (var i in this.buffer) {
						if (this.buffer[i]) {
							var command = this.buffer[i];
							if (command.getName() == Command.NAV) {
								if ((_nivo) && (command.getNivo() != _nivo)) { continue; } 
								this.buffer.splice(i,1);
								commandDeleted = true;
								if (_cNc > 0) {	_cNc = (_cNc - 1); }
								break;
							}
						}
					}
				}
			}
			//Reset Counter for Navigation commands.
			if (!_nivo) {
				_cNc = 0;
			}
		} catch(error) {
			Utils.alert("CommandBuffer/removeNavigationCommands Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return this;
		}
	};
	this.removeNavigationOnTopOrBottom = function(removeOnTop) {
		var _removeOnTop = ((removeOnTop !== undefined) && (removeOnTop !== null))?removeOnTop:true;
		Utils.alert("CommandBuffer/removeNavigationOnTopOrBottom - removeOnTop: "+_removeOnTop);
		try {
			//Remove some earlier(#oldest) navigation command!
			if (_cNc > NavigationCommand.MAX_REMEMBERED) {
				if (this.isEmpty() === false) {
					var _from = 0;
					var _to = this.buffer.length;
					var _increment = 1;
					if (_removeOnTop === false) {
						_from = (this.buffer.length - 1);
						_to = 0;
						_increment = -1;
					}
					for (var i = _from; ((_removeOnTop === true)?(i < _to):(i >= _to)); i = (i + _increment)) {
						if (this.buffer[i]) {
							var command = this.buffer[i];
							if (command.getName() == Command.NAV) {
								this.buffer.splice(i,1);
								if (_cNc > 0) {	_cNc = (_cNc - 1); }
								break;
							}
						}
					}
				}
			}
		} catch(error) {
			Utils.alert("CommandBuffer/removeNavigationOnTopOrBottom Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return this;
		}
	};
	this.pop = function() {
		var result = null;
		try {
			result = this.buffer.pop();
		} catch(error) {
			Utils.alert("CommandBuffer/pop Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	};
	this.getNextId = function() {
		var result = 0;
		try {
			if (this.isEmpty() === false) {
				for (var i in this.buffer) {
					if (this.buffer[i]) {
						var command = this.buffer[i];							
						if (command.getId() <= result) { continue; }
						result = command.getId();
					}
				}
			}
			//NextId
			result = (result + 1);
		} catch(error) {
			Utils.alert("CommandBuffer/getNextId Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	};
	//TODO: Refactor - remove !!! repeating for-loop !!!
	//this.push = function(id,command) {
	this.push = function(command) {
		Utils.alert("CommandBuffer/push - command: "+command);
		try {
			//CheckPoint - check/drop
			if (this.getLength() > (CommandBuffer.SIZE_LIMIT * (CommandBuffer.CKP_FILL_PERCENT/100))) {
				var checkPointStatus = this.getCheckPointStatus();
				if (checkPointStatus && (checkPointStatus > 0)) {
					var checkPoints = Math.floor(checkPointStatus / CommandBuffer.CKP_SIZE_DIVIDER);
					if (checkPoints > 0) {
						var checkPointDrops = 1;
						//if (checkPoints > 3) {
							checkPointDrops = Math.floor(checkPoints * (CommandBuffer.CKP_DROP_PERCENT/100));
							if (this.isEmpty() === false) {
								while (1) {
									if (checkPointDrops <= 0) { break; }
									for (var i in this.buffer) {
										if (this.buffer[i]) {
											var cmd = this.buffer[i];							
											if (cmd.getName() == Command.CKP) { checkPointDrops = (checkPointDrops - 1); }
											if ((cmd.getName() == Command.CKP) ||
													(cmd.getName() == Command.PST)) {
												this.remove(cmd);													
												break;
											}
										}
									}
								}
							}
							//}
					}
				}
			}
			//Push new command.
			if (command.getId() === null) {
				command.setId(this.getNextId());
			}
			this.buffer.push(command);
		} catch(error) {
			Utils.alert("CommandBuffer/push Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		}
	};
	//TODO: Refactor push/insert / id = (Max + 1) ipv (getLength() + 1) ************************************* !!!
	this.insert = function(index,command) {
		Utils.alert("CommandBuffer/insert - index: "+index+" command: "+command);
		try {
			//CheckPoint - check/drop
			if (this.getLength() > (CommandBuffer.SIZE_LIMIT * (CommandBuffer.CKP_FILL_PERCENT/100))) {
				var checkPointStatus = this.getCheckPointStatus();
				if (checkPointStatus && (checkPointStatus > 0)) {
					var checkPoints = Math.floor(checkPointStatus / CommandBuffer.CKP_SIZE_DIVIDER);
					if (checkPoints > 0) {
						var checkPointDrops = 1;
						//if (checkPoints > 3) {
							checkPointDrops = Math.floor(checkPoints * (CommandBuffer.CKP_DROP_PERCENT/100));
							if (this.isEmpty() === false) {
								while (1) {
									if (checkPointDrops <= 0) { break; }
									for (var i in this.buffer) {
										if (this.buffer[i]) {
											var cmd = this.buffer[i];							
											if (cmd.getName() == Command.CKP) { checkPointDrops = (checkPointDrops - 1); }
											if ((cmd.getName() == Command.CKP) ||
													(cmd.getName() == Command.PST)) {
												this.remove(cmd);													
												break;
											}
										}
									}
								}
							}
							//}
					}
				}
			}
			//Insert new command.
			if (command.getId() === null) {
				command.setId(this.getNextId());
			}
			this.buffer.splice(index,0,command);
		} catch(error) {
			Utils.alert("CommandBuffer/insert Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		}
	};
	this.update = function(command) {
		var _command = (command !== undefined)?command:null;	
		////////////////////////////////////////////////////////////
		//ATT: Normal update & special treatment for CPY and EXT. //
		////////////////////////////////////////////////////////////
		Utils.alert("CommandBuffer/update - command: "+((_command)?_command.print():"null"));
		try {
			if (_command) {
				var cmd = null;
				if (_command.getId()) {
					cmd = this.getById(_command.getId());
				} else {
					cmd = this.getByNivoPositionRelation(_command);
				}
				//Special updates/appends for CPY, EXT and DEL.              !!!!!! DELETE !!!!!!
				var groupName = null;
				if (cmd) {
					var lastGroupCommand = this.getLastGroupCommand(cmd);
					if (lastGroupCommand) {
						groupName = lastGroupCommand.getGroupName();
					} else {
						groupName = (Command.GRP+"_"+cmd.getId());				
					}
					if (cmd.getName() in Utils.arrayHash([Command.CPY,Command.EXT,Command.DEL])) {  // DELETE !!!
						cmd.setUnDone(!cmd.getUnDone());
						if (cmd.getName() != _command.getName()) {
							cmd.setName(_command.getName());
							cmd.setUnDone(false);
						}
						this.removePasteCommands(cmd);
						if (Utils.group() === true) {
							if (cmd.getSourceName().substr(0,3) != Command.GRP) {
								cmd.setUnDone(false);
							}
							cmd.setSourceName(groupName+"/"+cmd.getId());							
						} else {
							if (cmd.getSourceName().substr(0,3) == Command.GRP) {
								cmd.setUnDone(false);
							}
							cmd.setSourceName(((cmd.getName() == Command.CPY)?Command.CPY:Command.EXT)+"_"+cmd.getId()+"/"+cmd.getId());
						}
						alert("CommandBuffer/update - cmd: "+_kb.getCmd()+" shift: "+_kb.getShift()+" ctrl: "+_kb.getCtrl()+ " alt: "+_kb.getAlt());
						alert("CommandBuffer/update - cmd: "+cmd.print());
					} else {
						//Normal update.
						cmd = _command;
					}
				} else {
					this.push(_command);					
				}
			}
		} catch(error) {
			Utils.alert("CommandBuffer/update Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		}
	};
	this.getLastDone = function() {
		Utils.alert("CommandBuffer/getLastDone");
		var result = null;
		try {
			if (this.isEmpty() === false) {
				var buffer = this.getBuffer();
				for (var i = (this.getLength() - 1); i >= 0; --i) {
					var cmd = buffer[i];
					if (cmd.isDone() === true) {
						result = cmd;
						break;
					}
				}
			}
		} catch(error) {
			Utils.alert("CommandBuffer/getLastDone Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	};
	this.getLastReal = function() {
		Utils.alert("CommandBuffer/getLastReal");
		var result = null;
		try {
			if (this.isEmpty() === false) {
				var buffer = this.getBuffer();
				for (var i = (this.getLength() - 1); i >= 0; --i) {
					var cmd = buffer[i];
					if ((cmd.getName() == Command.ADD) ||
							(cmd.getName() == Command.CPY) ||
							(cmd.getName() == Command.DEL) ||
							(cmd.getName() == Command.EDT) ||
							(cmd.getName() == Command.EXT)) {
						result = cmd;
						break;
					}
				}
			}
		} catch(error) {
			Utils.alert("CommandBuffer/getLastReal Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	};
	this.getLastRealDone = function() {
		Utils.alert("CommandBuffer/getLastRealDone");
		var result = null;
		try {
			if (this.isEmpty() === false) {
				var buffer = this.getBuffer();
				for (var i = (this.getLength() - 1); i >= 0; --i) {
					var cmd = buffer[i];
					if ((cmd.getName() != Command.ADD) &&
							(cmd.getName() != Command.CPY) &&
							(cmd.getName() != Command.DEL) &&
							(cmd.getName() != Command.EDT) &&
							(cmd.getName() != Command.EXT) &&
							(cmd.getName() != Command.PST)) { continue; }
					//if (cmd.isDone() === true) {
						result = cmd;
						break;
					//}
				}
			}
		} catch(error) {
			Utils.alert("CommandBuffer/getLastRealDone Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	};
	this.getLastGroupCommand = function(command) {
		var _command = (command !== undefined)?command:null;
		//alert("CommandBuffer/getLastGroupCommand - command: "+((_command)?_command.print():null));
		Utils.alert("CommandBuffer/getLastGroupCommand - command: "+((_command)?_command.print():"null"));
		var result = null;
		try {
			if (this.isEmpty() === false) {
				var buffer = this.getBuffer();
				for (var i = (this.getLength() - 1); i >= 0; i--) {
					var cmd = buffer[i];
					if (cmd.getId() === null) { continue; }
					if (cmd.getName() == Command.CKP) { continue; }
					if (cmd.getName() == Command.NAV) { continue; }
					if (cmd.getName() == Command.PST) { continue; }
					//Skip command => get last groupCommand before this command.
					if (_command) {
						if (cmd.getId() == _command.getId()) { continue; }
					}
					if (cmd.getGroupName().substr(0,3) != Command.GRP) { break; }
					result = cmd;
					break;
				}
			}
			//alert("CommandBuffer/getLastGroupCommand - result: "+result); //.print());
		} catch(error) {
			Utils.alert("CommandBuffer/getLastGroupCommand Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	};
	this.getNavigationsAndLastRealCommand = function(done) {
		//alert("CommandBuffer/getNavigationsAndLastRealCommand - done: "+done);
		var _done = (done !== undefined)?done:null;
		Utils.alert("CommandBuffer/getNavigationsAndLastRealCommand - done: "+_done);
		var result = [];
		try {
			if (this.isEmpty() === false) {
				var lastRealCommand = null;
				var buffer = this.getBuffer();
				for (var i = (this.getLength() - 1); i >= 0; i--) {
					var cmd = buffer[i];
					if (cmd.getName() == Command.NAV) {
						result.unshift(cmd);
						continue;
					}
					if ((cmd.getName() != Command.ADD) &&
							(cmd.getName() != Command.CPY) &&
							(cmd.getName() != Command.DEL) &&
							(cmd.getName() != Command.EDT) &&
							(cmd.getName() != Command.EXT) &&
							(cmd.getName() != Command.PST)) { continue; }
					if (lastRealCommand === null) {
						if (_done !== null) {
							if (cmd.isDone() === _done) {
								lastRealCommand = cmd;
								break;
							}
						}
					}
				}
				if (lastRealCommand) { result.unshift(lastRealCommand); }
			}
			//alert("CommandBuffer/getNavigationsAndLastRealCommand - result: "+result);
		} catch(error) {
			Utils.alert("CommandBuffer/getNavigationsAndLastRealCommand Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	};
	this.getCheckPointStatus = function() {
		Utils.alert("CommandBuffer/getCheckPointStatus");
		var result = 0;
		try {
			var checkPoints = 0;
			var checkPointSize = 0;
			if (this.isEmpty() === false) {
				var buffer = this.getBuffer();
				for (var i = (this.getLength() - 1); i >= 0; --i) {
					var cmd = buffer[i];
					if (checkPoints === 0) {
						if (cmd.getName() != Command.CKP) {
							checkPointSize = (checkPointSize + 1);
						}
					}
					if (cmd.getName() == Command.CKP) {
						checkPoints = (checkPoints + 1);
					}
				}
			}
			result = ((checkPoints * CommandBuffer.CKP_SIZE_DIVIDER)+checkPointSize);
		} catch(error) {
			Utils.alert("CommandBuffer/getCheckPointStatus Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	};
	/*
	this.getLastUnDoneIfNoDone = function() {
		var result = null;
		try {
			result = this.getLastDone();
			//Get first UNDONE!
			if (result === null) {
				if (this.isEmpty() === false) {
					var buffer = this.getBuffer();
					for (var i = (this.getLength() - 1); i >= 0; --i) {
						var cmd = buffer[i];
						if (cmd.getName() == Command.PST) { continue; }
						if (cmd.isUnDone() === true) {
							result = cmd;
							break;
						}
					}
				}
			}
		} catch(error) {
			Utils.alert("CommandBuffer/getLastUnDoneIfNoDone Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	};
	*/
	this.getLastDoneIfNoUnDone = function() {
		//alert("CommandBuffer/getLastDoneIfNoUnDone");
		Utils.alert("CommandBuffer/getLastDoneIfNoUnDone");
		var result = null;
		try {
			//Get current nivo & position !!!
			var currentNivo = (Position.NIVO_ROOT() + 1);
			var position = new Position(Position.ROW_TOP(),Position.COLUMN_WHAT_FIRST());
			var gridView = _grid.getGridView();
			if (gridView) {
				currentNivo = gridView.getCurrentNivo();
				position = gridView.getPosition();						
			}
			//Calculate current location.
			var currentLocation = ((currentNivo * 1000) + (position.getColumn() * 100) + position.getRow());
			var lastRealDone = null;
			var cmds = this.getNavigationsAndLastRealCommand(false); //UnDone!
			if (cmds) {
				if (cmds.length > 0) {
					for (var i = 0; i < cmds.length; i++) {
						var cmd = cmds[i];
						if (cmd.getName() != Command.NAV) {
							if (cmd.isUnDone() === true) {
								result = cmd;
								break;
							} else {
								lastRealDone = cmd;
								continue;
							}
						}
						//Select navigation (always DONE/UNDONE).
						//Attention, think twice - 1:undo/redo 2:asc/dsc					
						//Select next navigation (navigation with location after currentLocation).
						var p1 = cmd.getPosition();
						var cmdLocation = ((cmd.getNivo() * 1000) + (p1.getColumn() * 100) + p1.getRow());
						/*alert("CommandBuffer/getLastDoneIfNoUnDone - REDO/asc="+this.isAscending()+
						      "\ncurrentLocation: "+currentLocation+
									"\ncmdLocation: "+cmdLocation);*/
						if (this.isAscending() === true) {
							if (cmdLocation <= currentLocation) { continue; }
						} else {
							if (cmdLocation >= currentLocation) { continue; }
						}
						result = cmd;
						break;
					}			
				}
			}
			//Get last DONE!
			if (!result) {
				result = (lastRealDone)?lastRealDone:this.getLastDone();
			}
			//alert("CommandBuffer/getLastDoneIfNoUnDone - result: "+result.print());
		} catch(error) {
			Utils.alert("CommandBuffer/getLastDoneIfNoUnDone Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	};
	
	/*
	var _from = 0;
	var _to = this.buffer.length;
	var _increment = 1;
	if (!removeOnTop) {
		_from = (this.buffer.length - 1);
		_to = 0;
		_increment = -1;
	}
	for (var i = _from; ((removeOnTop)?(i < _to):(i >= _to)); i = (i + _increment)) {
	*/

	this.getFirstUnDoneIfNoDone = function() {
		//alert("CommandBuffer/getFirstUnDoneIfNoDone");
		Utils.alert("CommandBuffer/getFirstUnDoneIfNoDone");
		var result = null;
		try {
			//Get current nivo & position !!!
			var currentNivo = (Position.NIVO_ROOT() + 1);
			var position = new Position(Position.ROW_TOP(),Position.COLUMN_WHAT_FIRST());
			var gridView = _grid.getGridView();
			if (gridView) {
				currentNivo = gridView.getCurrentNivo();
				position = gridView.getPosition();						
			}
			//Calculate current location.
			var currentLocation = ((currentNivo * 1000) + (position.getColumn() * 100) + position.getRow());
			var lastRealUnDone = null;
			var cmds = this.getNavigationsAndLastRealCommand(true); //Done!
			if (cmds) {
				if (cmds.length > 0) {
					cmds.reverse();
					for (var i = 0; i < cmds.length; i++) {
						var cmd = cmds[i];
						if (cmd.getName() != Command.NAV) {
							if (cmd.isDone() === true) {
								result = cmd;
								break;
							} else {
								lastRealUnDone = cmd;
								continue;
							}
						}
						//Select navigation (always DONE/UNDONE).
						//Attention, think twice - 1:undo/redo 2:asc/dsc					
						//Select previous navigation (navigation with location before currentLocation).
						var p1 = cmd.getPosition();
						var cmdLocation = ((cmd.getNivo() * 1000) + (p1.getColumn() * 100) + p1.getRow());
						/*alert("CommandBuffer/getFirstUnDoneIfNoDone - UNDO/asc="+this.isAscending()+
						      "\ncurrentLocation: "+currentLocation+
									"\ncmdLocation: "+cmdLocation);*/
						if (this.isAscending() === true) {
							if (cmdLocation >= currentLocation) { continue; }
						} else {
							if (cmdLocation <= currentLocation) { continue; }
						}
						result = cmd;
						break;
					}			
				}
			}
			//Get first UNDONE!
			if (!result) {
				result = (lastRealUnDone)?lastRealUnDone:this.getFirstUnDone();			
			}
			//alert("CommandBuffer/getFirstUnDoneIfNoDone - result: "+result.print());
		} catch(error) {
			Utils.alert("CommandBuffer/getFirstUnDoneIfNoDone Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	};
	this.getFirstUnDone = function() {
		Utils.alert("CommandBuffer/getFirstUnDone");
		var result = null;
		try {
	/*  Get first unDone from the beginning, whitouth regarding later DONES !!! 
			if (this.isEmpty() === false) {
				var buffer = this.getBuffer();
				for (var i = 0; i < this.getLength(); ++i) {
					var cmd = buffer[i];
					if (cmd.isUnDone() === true) {
						result = cmd;
						break;
					}
				}
			}*/
	  	//Get first unDone from the beginning, but with no later DONES !!! 
			if (this.isEmpty() === false) {
				var buffer = this.getBuffer();
				for (var i = 0; i < this.getLength(); ++i) {
					var cmd = buffer[i];
					if (result === null) {
						if (cmd.isUnDone() === true) {
							result = cmd;
							continue;
						}
					}
					if (result) {
						if ((cmd.isDone() === true) && (cmd.getName() != Command.NAV)) {
							result = null;
							continue;
						}
					} 
				}
			}
		} catch(error) {
			Utils.alert("CommandBuffer/getFirstUnDone Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	};
	this.getLastUnDone = function() {
		Utils.alert("CommandBuffer/getLastUnDone");
		var result = null;
		try {
			if (this.isEmpty() === false) {
				var buffer = this.getBuffer();
				for (var i = (this.getLength() - 1); i >= 0; --i) {
					var cmd = buffer[i];
					if (cmd.isUnDone() === true) {
						result = cmd;
						break;
					}
				}
			}
		} catch(error) {
			Utils.alert("CommandBuffer/getLastUnDone Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	};
	this.getLastPastable = function() {
		Utils.alert("CommandBuffer/getLastPastable");
		var result = null;
		try {
			if (this.isEmpty() === false) {
				var buffer = this.getBuffer();
				for (var i = (this.getLength() - 1); i >= 0; --i) {
					var cmd = buffer[i];
					if (cmd.getName() == Command.CKP) { continue; }
					if (cmd.getName() == Command.NAV) { continue; }
					if (cmd.isUnDone() === true) { continue; }
					if ((cmd.getName() != Command.ADD) &&
							(cmd.getName() != Command.DEL) &&
							(cmd.getName() != Command.EDT) &&
							(cmd.getName() != Command.CPY) &&
							(cmd.getName() != Command.EXT)) { continue; }
					result = cmd;
					break;
				}
			}
		} catch(error) {
			Utils.alert("CommandBuffer/getLastPastable Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	};
	this.getLastPastableGroup = function() {
		Utils.alert("CommandBuffer/getLastPastableGroup");
		var result = [];
		try {
			if (this.isEmpty() === false) {
				var groupCmd = null;
				var buffer = this.getBuffer();
				for (var i = (this.getLength() - 1); i >= 0; --i) {
					var cmd = buffer[i];
					if (cmd.getName() == Command.CKP) { continue; }
					if (cmd.getName() == Command.NAV) { continue; }
					if (cmd.isUnDone() === true) { continue; }
					if (cmd.getName() == Command.PST) { continue; }
				//if (!groupCmd) { groupCmd = Command.clone(cmd); }
					if (groupCmd === null) { groupCmd = cmd.clone(); }
					if (cmd.inSameGroup(groupCmd) === false) { break; }
					if (cmd.isUnDone() === true) {	break; }
					if ((cmd.getName() != Command.ADD) &&
							(cmd.getName() != Command.DEL) &&
							(cmd.getName() != Command.EDT) &&
							(cmd.getName() != Command.CPY) &&
							(cmd.getName() != Command.EXT)) { continue; }
					result.unshift(cmd);
					continue;
				}
			}
		} catch(error) {
			Utils.alert("CommandBuffer/getLastPastableGroup Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	};
	this.print = function() {
		var result = null;
		try {
			result = "\n_id: "+_id+"\n";
			result += "\nCommandBuffer:\n";
			result += "Number of commands: "+this.getLength()+"\n";
			result += "Done: "+this.getNumberDone()+"\n";
			result += "Undone: "+this.getNumberUnDone()+"\n";
			var addDone = this.getNumberOfCommands(Command.ADD,false);
			var addUnDone = this.getNumberOfCommands(Command.ADD,true);
			var addAll = addDone + addUnDone;
			if (addAll > 0) {
				result += "Number of ADD commands: "+addAll+", done: "+addDone+", undone: "+addUnDone+"\n";
			}
			var delDone = this.getNumberOfCommands(Command.DEL,false);
			var delUnDone = this.getNumberOfCommands(Command.DEL,true);
			var delAll = delDone + delUnDone;
			if (delAll > 0) {
				result += "Number of DEL commands: "+delAll+", done: "+delDone+", undone: "+delUnDone+"\n";
			}
			var edtDone = this.getNumberOfCommands(Command.EDT,false);
			var edtUnDone = this.getNumberOfCommands(Command.EDT,true);
			var edtAll = edtDone + edtUnDone;
			if (edtAll > 0) {
				result += "Number of EDT commands: "+edtAll+", done: "+edtDone+", undone: "+edtUnDone+"\n";
			}
			var cpyDone = this.getNumberOfCommands(Command.CPY,false);
			var cpyUnDone = this.getNumberOfCommands(Command.CPY,true);
			var cpyAll = cpyDone + cpyUnDone;
			if (cpyAll > 0) {
				result += "Number of CPY commands: "+cpyAll+", done: "+cpyDone+", undone: "+cpyUnDone+"\n";
			}
			var extDone = this.getNumberOfCommands(Command.EXT,false);
			var extUnDone = this.getNumberOfCommands(Command.EXT,true);
			var extAll = extDone + extUnDone;
			if (extAll > 0) {
				result += "Number of EXT commands: "+extAll+", done: "+extDone+", undone: "+extUnDone+"\n";
			}
			var pstDone = this.getNumberOfCommands(Command.PST,false);
			var pstUnDone = this.getNumberOfCommands(Command.PST,true);
			var pstAll = pstDone + pstUnDone;
			if (pstAll > 0) {
				result += "Number of PST commands: "+pstAll+", done: "+pstDone+", undone: "+pstUnDone+"\n";
			}
			var navDone = this.getNumberOfCommands(Command.NAV,false);
			var navUnDone = this.getNumberOfCommands(Command.NAV,true);
			var navAll = navDone + navUnDone;
			if (navAll > 0) {
				result += "Number of NAV commands: "+navAll+", done: "+navDone+", undone: "+navUnDone+"\n";
			}
			var rootDone = this.getNumberOfCommands(Command.ROOT,false);
			var rootUnDone = this.getNumberOfCommands(Command.ROOT,true);
			var rootAll = rootDone + rootUnDone;
			if (rootAll > 0) {
				result += "Number of ROOT commands: "+rootAll+", done: "+rootDone+", undone: "+rootUnDone+"\n";
			}
			if (_cf) {
				//Last command.
				var lastCommand = _cf.getLastCommand();
				result += "\nLast command: "+(lastCommand)?lastCommand.print():"null";
				result += "\n";
			}		
			//List of commands.
			result += "\nList of commands:";
			result += "\n----------------------------------------------";
			result += "\nID\t| NAME | STATUS\t| SOURCE\t\t| VALUE";
			result += "\n----------------------------------------------";
			var buffer = this.getBuffer();
			if (buffer) {
				for (var i in buffer) {
					if (buffer[i]) {
						var command = buffer[i];
						var commandName = command.getName();
						if (commandName == Command.CKP) {
							//result += "\n"+command.getId()+"\t| "+commandName+"| -+-+-+-+-+-+-+-+- | size: "+command.getSize();
							result += "\n"+command.getId()+"\t| "+commandName+"| -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-";
							continue;
						}
						if ((commandName != Command.ADD) &&
							  (commandName != Command.CPY) &&
								(commandName != Command.EDT)) {
							commandName += "\t";
						}
					/*if (commandName.length <= 4) {
							commandName += "\t";
						}*/
						var relationValue = "";
						var relation = command.getRelation();
						if (relation) {
						  relationValue = ((relation.getId())?relation.getId():'***')+'/';
							var parentEntity = relation.getParentEntity();
							if (parentEntity) {
								relationValue += parentEntity.getName();
							} else {
								relationValue += '***';
							}
							var childEntity = relation.getChildEntity();
							if (childEntity) {
								var entityValues = null;
								var	commandEntityValues = _oe.getById(command.getSourceName());
								if (commandEntityValues) {
									entityValues = commandEntityValues;
								}
								if (!entityValues) {
								//entityValues = Entity.clone(childEntity);
									entityValues = childEntity.clone();
									entityValues.setTypeObject(childEntity.getTypeObject());
									entityValues.setAttributeList(childEntity.getAttributeList());
								}
								relationValue += ' - ' + entityValues.getName();							
							}
						}
						result += "\n"+command.getId()+"\t| "+commandName+"| "+((command.isDone() === true)?"DONE":"UNDONE")+"\t| "+command.getSourceName()+"\t\t| "+relationValue;
					}
				}
			}
		} catch(error) {
			Utils.alert("CommandBuffer/print Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	};
};
CommandBuffer = new Class(new CommandBuffer());
//Statics
CommandBuffer.SEQUENCE_ASC = "ASC";
CommandBuffer.SEQUENCE_DSC = "DSC";
CommandBuffer.SIZE_LIMIT = 25; //500; //20; //30; //50; //500;
CommandBuffer.PASTE_LIMIT = 50;
CommandBuffer.CKP_SIZE_DIVIDER = 1000000;
CommandBuffer.CKP_FIRST_PERCENT = 50;
CommandBuffer.CKP_NEXT_PERCENT = 20; //10;
CommandBuffer.CKP_DROP_PERCENT = 50;
CommandBuffer.CKP_FILL_PERCENT = 90;
CommandBuffer.test = function() {
	var buffer = null;
	try {
		buffer = new CommandBuffer();
	} catch(error) {
		Utils.alert("CommandBuffer/test Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	}
};
