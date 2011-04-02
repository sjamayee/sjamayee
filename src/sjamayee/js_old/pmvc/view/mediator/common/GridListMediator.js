//Abstract
var GridListMediator = function() {
	this.Extends = ListMediator;
	this.listSize = null;
	this.objectsListLeftWidth = 300; //null;
	this.relationsGridLeftWidth = 400; //null;
	this.splitterStyle = null;
	//Command Buffers
	this.commandBuffer = null;
  this.rootCommandBuffer = null;	
  this.lastRootCommand = null;  
	//For command naming ?!
	this.sourceName = null;
	this.groupId = null;
	//MODE: Edit/Display
	this.mode = null;

	this.hide = function() {
	  var gridList = this.getViewComponent();
	  gridList.gridListSplitter.left.dataObjectsList.setAttribute("style","display:none;");
	  gridList.gridListSplitter.left.dataRelationsGrid.setAttribute("style","display:none;");
	  gridList.gridListSplitter.left.modelObjectsList.setAttribute("style","display:none;");
	  gridList.gridListSplitter.left.modelObjectsTextsEditor.setAttribute("style","display:none;");
	  gridList.gridListSplitter.left.modelRelationsGrid.setAttribute("style","display:none;");
	  gridList.gridListSplitter.left.modelRelationsTextsEditor.setAttribute("style","display:none;");
	  gridList.gridListSplitter.right.dataObjectsList.setAttribute("style","display:none;");
	  gridList.gridListSplitter.right.dataRelationsGrid.setAttribute("style","display:none;");
	  gridList.gridListSplitter.right.modelObjectsList.setAttribute("style","display:none;");
	  gridList.gridListSplitter.right.modelObjectsTextsEditor.setAttribute("style","display:none;");
	  gridList.gridListSplitter.right.modelRelationsGrid.setAttribute("style","display:none;");
	  gridList.gridListSplitter.right.modelRelationsTextsEditor.setAttribute("style","display:none;");
    //this.setSplitterStyle(null); //gridList.gridListSplitter.getAttribute("style"));
  };
  
	this.getListSize = function() {
	  if ((this.listSize === undefined) || (this.listSize === null)) {
	    this.setListSize(SjamayeeFacade.SIZE_NORMAL);
	  }
		return this.listSize;
	};
  
  this.setListSize = function(listSize) {
    this.listSize = listSize;
  };
  
  this.getSplitterStyle = function() {
		if (this.splitterStyle === null) {
	    //splitterStyle = "background-color:white;width:100%;height:100%;display:block;";
	    this.splitterStyle = "display:block;";
	  }
    return this.splitterStyle;
  };
  
  this.setSplitterStyle = function(splitterStyle) {
    this.splitterStyle = splitterStyle;
  };
  
	this.getMode = function() {
	  if ((this.mode === undefined) || (this.mode === null)) {
	    this.setMode(GridListMediator.MODE_DISPLAY);
	  }
		return this.mode;
	};
  
  this.setMode = function(mode,forced) {
    var _forced = (forced !== undefined && forced !== null)?forced:false;
    var response = null;
    if (_forced === false) {
      if (this.mode) {
        if (this.mode == GridListMediator.MODE_EDIT) {
    		  response = confirm("Updates will be lost!\n\nAre you sure?");
        }
      }
    }
    if ((response === null) || (response === true)) {
      this.mode = mode;
    }
    return this.mode;
  };
  this.setEdit = function(forced) {
    return this.setMode(GridListMediator.MODE_EDIT,forced);
  };
  this.setDisplay = function(forced) {
    return this.setMode(GridListMediator.MODE_DISPLAY,forced);
  };

	this.isEdit = function()    { return (this.getMode() == GridListMediator.MODE_EDIT); };
	this.isDisplay = function() { return (this.getMode() == GridListMediator.MODE_DISPLAY); };
  
  this.getCommandBuffer = function() {
  	var result = null;
  	if (this.commandBuffer !== undefined) {
  		result = this.commandBuffer;
  	}
  	return result;
  };
  
  this.setCommandBuffer = function(commandBuffer) {
  	if (commandBuffer) {
  		this.commandBuffer = commandBuffer;
  	}
  };

  this.getRootCommandBuffer = function() {
  	var result = null;
  	if (this.rootCommandBuffer !== undefined) {
  		result = this.rootCommandBuffer;
  	}
  	return result;
  };
  
  this.setRootCommandBuffer = function(rootCommandBuffer) {
  	if (rootCommandBuffer) {
  		this.rootCommandBuffer = rootCommandBuffer;
  	}
  };
  
  this.getLastRootCommand = function() {
  	var result = null;
  	if (this.lastRootCommand !== undefined) {
  		result = this.lastRootCommand;
  	}
  	return result;
  };
  
  this.setLastRootCommand = function(lastRootCommand,append) {
  	var _append = ((append !== undefined) && (append !== null))?append:false;
  	var _lastRootCommand = ((lastRootCommand !== undefined) && (lastRootCommand !== null))?lastRootCommand:false;
  	this.lastRootCommand = _lastRootCommand;
  	if (this.lastRootCommand) {
  		if (_append === true) {
  			//Push into rootcommand buffer.
  			var rootCommandBuffer = this.getRootCommandBuffer();
  			if (this.lastRootCommand.getId() === null) {
  				rootCommandBuffer.push(this.lastRootCommand);
  			} else {
  				rootCommandBuffer.update(this.lastRootCommand);
  			}
  		}
  	}
  };
  
  this.getLastRealCommand = function() {
  	//alert("GridListMediator/getLastRealCommand");
  	/////////////////////////////////////////////
  	//      Real Commands: ADD,DEL,EDT,EXT,CPY //
  	//    Unreal Commands: PST								 //
  	//   Virtual Commands: GRP,UND,RDO				 //
  	//CheckPoint Commands: CKP								 //
  	//      Root Commands: ROOT 							 //
  	/////////////////////////////////////////////
  	var result = null;
  	var commandBuffer = this.getCommandBuffer();
  	if (commandBuffer) {
  		result = commandBuffer.getLastReal();
  	}
  	//alert("GridListMediator/getLastRealCommand - result: "+result.print());	
  	return result;
  };
  
  this.getLastRealCommandDone = function() {
  	var result = null;
  	var commandBuffer = this.getCommandBuffer();
  	if (commandBuffer) {
  		result = commandBuffer.getLastRealDone();
  	}
  	return result;
  };
  
  this.getLastCommandDone = function() {
  	var result = null;
  	var commandBuffer = this.getCommandBuffer();
  	if (commandBuffer) {
  		result = commandBuffer.getLastDone();
  	}
  	return result;
  };
  
  this.getLastCommand = function() {
  	var result = null;
  	if (this.lastCommand !== undefined) {
  		result = this.lastCommand;
  	}
  	return result;
  };
  
  this.getLastGroupCommand = function(command) {
  	var _command = (command !== undefined)?command:null;
  	//alert("GridListMediator/getLastGroupCommand - command: "+_command); //.print());
  	var result = null;
  	var commandBuffer = this.getCommandBuffer();
  	if (commandBuffer) {
  		result = commandBuffer.getLastGroupCommand(_command);
  	}
  	return result;
  };

  this.setLastCommand = function(lastCommand,append) {
  	var _lastCommand = (lastCommand !== undefined)?lastCommand:null;
  	var _append = ((append !== undefined) && (append !== null))?append:false;
  	//alert("GridListMediator/setLastCommand - append: "+_append+" lastCommand: "+((_lastCommand)?_lastCommand.print():null));
  	Utils.alert("GridListMediator/setLastCommand - append: "+_append+" lastCommand: "+((_lastCommand)?_lastCommand.print():"null"));
  	try {
  		if (_lastCommand === null) {
  			this.lastCommand = _lastCommand;
  			this.checkPoint = _lastCommand;
  		} else {
  			//Set lastCommand/checkPoint
  			if (_lastCommand.getName() == Command.CKP) {
  				this.checkPoint = _lastCommand;
  			} else {
  				this.lastCommand = _lastCommand;
  			}
  			var commandBuffer = this.getCommandBuffer();
  			if (commandBuffer) {
  				//Push into command buffer.
  				if (_append === true) {
  					//Wipe-out ALL navigation commands!
  					if (_lastCommand.getName() in Utils.arrayHash([Command.ADD,Command.CPY,Command.DEL,Command.EDT,Command.EXT,Command.PST])) {
  						commandBuffer.removeNavigationCommands();
  					}
  					if (_lastCommand.getId() === null) {
  						if (_lastCommand.getName() == Command.CKP) {
  							commandBuffer.push(this.checkPoint);
  						} else if (_lastCommand.getName() == Command.DEL) {  // !!!!!!!!!!!!!!!! UPDATE DELETE (undone) !!!!!!!!!!!!!!!!!!!!!!!!
  							//Try to update or append!!!
  							commandBuffer.update(this.lastCommand);
  						} else if (_lastCommand.getName() == Command.CPY) {
  							//Try to update or append!!!
  							commandBuffer.update(this.lastCommand);								
  						} else if (_lastCommand.getName() == Command.EXT) {
  							//Try to update or append!!!
  							commandBuffer.update(this.lastCommand);
  						} else {
  							if (_lastCommand.getName() != Command.NAV) {
  								commandBuffer.push(this.lastCommand);									
  							} else {
  								/////////////////////////////////////////////////////////////////////////////////////////////////
  								//	 3 Situations																																								 //
  								//1. First navigation - append																																 //
  								//2. Second navigation - append (ex. 11,17 / 16,12)																						 //
  								//3. Third navigation - append/insert depending on previous sequence													 //
  								//											11,17: ASC - 13 => 11,13,17 / 19 => 11,13,17,19 / 10 => 10,11,13,17,19 //
  								//											16,12: DSC - 13 => 16,13,12 / 19 => 19,16,13,12 / 10 => 19,16,13,12,10 //
  								/////////////////////////////////////////////////////////////////////////////////////////////////
  								//Calculate location of lastCommand.
  								var lastCommandLocation = ((_lastCommand.getNivo() * 1000) +
  																			 		 (_lastCommand.getPosition().getColumn() * 100) +
  																			  		_lastCommand.getPosition().getRow());
  								//Insert navigation command in correct sequence/position!
  								var j = null;
  								var iLow = null;
  								var iHigh = null;
  								var commandLocation = null;
  								var insertMode = null; //NavigationCommand.INSERT_ASC;
  								var buffer = commandBuffer.getBuffer();
  								for (var i in buffer) {
  									if (buffer[i]) {
  										var command = buffer[i];
  										if (command.getName() != Command.NAV) { continue; }
  										//Calculate location of command.
  										commandLocation = ((command.getNivo() * 1000) +
  																	 		 (command.getPosition().getColumn() * 100) +
  																	  		command.getPosition().getRow());
  										if (commandLocation < lastCommandLocation) {
  											if (iLow === null)  { iLow = i; }
  										} else {
  											if (iHigh === null) { iHigh = i; }
  										}
  										if (j !== null) {
  											//Determine insertMode (ASC/DSC)
  											var prevNavCmd = buffer[(j)];
  											var prevNavCmdLocation = ((prevNavCmd.getNivo() * 1000) +
  																				 		 		(prevNavCmd.getPosition().getColumn() * 100) +
  																				  			 prevNavCmd.getPosition().getRow());
  											if (prevNavCmdLocation < commandLocation) {
  												insertMode = NavigationCommand.INSERT_ASC;
  											} else {
  												insertMode = NavigationCommand.INSERT_DSC;
  											}
  										}
  										//Save previous index.
  										j = i;
  									}
  								}
  								//Determine insert/append depending on insertMode!
  								var insert = false;
  								if (commandLocation) {
  									if (insertMode !== null) {
  										if (insertMode == NavigationCommand.INSERT_ASC) {
  											if (lastCommandLocation < commandLocation) {
  												insert = true;
  											}
  										} else {
  											if (lastCommandLocation > commandLocation) {
  												insert = true;
  											}
  										}
  									}
  								}
  								var removeOnTop = true;
  								if (insert === true) {
  									if (insertMode == NavigationCommand.INSERT_ASC) {
  										commandBuffer.insert(iHigh,this.lastCommand);											
  										removeOnTop = (iHigh > (buffer.length/2))?true:false;											
  									} else {
  										commandBuffer.insert(iLow,this.lastCommand);											
  										removeOnTop = (iLow > (buffer.length/2))?false:true;																						
  									}
  									/*alert("SjamayeeForm/setLastCommand - append: "+append+" lastCommand: "+lastCommand+
  									      "\ni: "+i+
  												"\nbuffer.length/2: "+(buffer.length/2)+
  												"\nremoveOnTop: "+removeOnTop);*/
  								} else {
  									commandBuffer.push(this.lastCommand);										
  								}
  								_cNc = (_cNc + 1);                                                       //TODO: _cNc - global !!!
  								//Remove some earlier(#oldest) navigation command!
  								commandBuffer.removeNavigationOnTopOrBottom(removeOnTop);
  							}
  						}
  					} else {
  						alert("GridListMediator/setLastCommand - append: "+_append+" lastCommand: "+this.lastCommand.print());						
  						commandBuffer.update(this.lastCommand);
  					}
  				}
  			}
  		}
  	} catch(error) {
  		Utils.alert("GridListMediator/setLastCommand Error: "+error.message,Utils.LOG_LEVEL_ERROR);
  	}
  };

  this.navigationOnRelationExists = function(relation,nivo) {
  	var _relation = (relation !== undefined)?relation:null;
  	var _nivo = (nivo !== undefined)?nivo:null;
  	Utils.alert("GridListMediator/navigationOnRelationExists - nivo: "+_nivo+" relation: "+((_relation)?_relation.print():"null"));
  	var result = false;
  	try {
  		if (_relation) {
  			var commandBuffer = this.getCommandBuffer();
  			if (commandBuffer) {
  				if (commandBuffer.isEmpty() === false) {			
  					var buffer = commandBuffer.getBuffer();
  					for (var i in buffer) {
  						if (buffer[i]) {
  							var command = buffer[i];
  							if (command.getName() != Command.NAV) { continue; }
  							if (command.getNivo() != _nivo) { continue; }
  							var r1 = command.getRelation();
  							if (r1) {
  								if (r1.getId() == _relation.getId()) {
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
  		Utils.alert("GridListMediator/navigationOnRelationExists Error: "+error.message,Utils.LOG_LEVEL_ERROR);
  	} finally {
  		return result;
  	}
  };
  
	this._writeCheckPointCommand = function() {
		//Utils.alert("GridListMediator/_writeCheckPointCommand");
		var result = null;
		try {
			var writeCheckPoint = false;
			var commandBuffer = this.getCommandBuffer();
			if (commandBuffer) {
				var checkPoints = 0;
				var checkPointRecords = 0;
				var checkPointSize = (CommandBuffer.SIZE_LIMIT * (CommandBuffer.CKP_NEXT_PERCENT/100));
				var checkPointStatus = commandBuffer.getCheckPointStatus();
				if ((checkPointStatus) && (checkPointStatus > 0)) {
					checkPointRecords = (checkPointStatus % CommandBuffer.CKP_SIZE_DIVIDER);
					checkPoints = Math.floor((checkPointStatus - checkPointRecords) / CommandBuffer.CKP_SIZE_DIVIDER);
					writeCheckPoint = (checkPoints === 0)?(checkPointRecords > (CommandBuffer.SIZE_LIMIT * (CommandBuffer.CKP_FIRST_PERCENT/100))):(checkPointRecords > checkPointSize);
					if (writeCheckPoint) {
						var command = new CheckPointCommand();
						//command.setSize(checkPointRecords);
						//Utils.alert("GridListMediator/_writeCheckPointCommand - command:\n"+command.print());
						this.setLastCommand(command,true);
						result = command;
					}
				}
			}
			Utils.alert("GridListMediator/_writeCheckPointCommand - result: "+((result)?result.print():"null"));
		} catch(error) {
			Utils.alert("GridListMediator/_writeCheckPointCommand - error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	};
	
	this.writeNavigationCommand = function(list,navigation,rto,rfrom) {
		//alert("GridListMediator/writeNavigationCommand - navigation: "+navigation);
		Utils.alert("GridListMediator/writeNavigationCommand");
		var result = null;
		var _list = (list !== undefined)?list:null;
		var _navigation = (navigation !== undefined)?navigation:null;
		var _rto = (rto !== undefined)?rto:null;
		var _rfrom = (rfrom !== undefined)?rfrom:null;
		try {
			var command = new NavigationCommand(Command.NAV);
			if (command) {
				var lastNivo = _grid.getWhatUsedNivo();                            //TODO: _grid ??? mediator.grid ???
				var currentNivo = null;
				var position = null;
				command.setNavigation(_navigation);
				command.setRelationFrom(_rfrom);
				if (_list) {
					command.setList(_list);
					if (_list instanceof GridView) {                                //TODO: _list - GridView - grid/list ???
						command.setRelation(_rto);
						currentNivo = _list.getCurrentNivo();
						command.setNivo(currentNivo);
						position = _list.getPosition();
						if (position) {
							command.setPosition(position);
						}
					}
				}
				var buffer = null;
				var commandBuffer = this.getCommandBuffer();
				if (commandBuffer) {
					//alert("GridListMediator/writeNavigationCommand - 1 - navigation: "+_navigation);
					//Delete navigation commands on ENTER (switchRoot).
					if (command.getNavigation() == NavigationCommand.NAV_ENTER) {
						//alert("RelationsForm/writeNavigationCommand - 2 - navigation: "+_navigation);
						commandBuffer.removeNavigationCommands();
					}
					buffer = commandBuffer.getBuffer();
					if (this.navigationOnRelationExists(_rto,currentNivo)) {
						//Update existing navigation command.
						for (var i1 in buffer) {
							if (buffer[i1]) {
								var cmd1 = buffer[i1];
								if (cmd1.getName() != Command.NAV) { continue; }
								if (cmd1.getNivo() != currentNivo) { continue; }
								var r1 = cmd1.getRelation();
								if (r1) {
									if (r1.getId() == _rto.getId()) {
										cmd1.setUnDone(false);
										cmd1.setNavigation(command.getNavigation());
										cmd1.setList(command.getList());
										cmd1.setPosition(command.getPosition());
										break;
									}
								}
							}
						}
					} else {
						//Create new navigation command.
						this.setLastCommand(command,true);
						command.setSourceName(command.getName()+"_"+command.getId()+"/"+command.getId());
					}
					if (command.getNavigation() in Utils.arrayHash([NavigationCommand.NAV_ENTER,NavigationCommand.NAV_SPACE,
																													NavigationCommand.NAV_CLICK,
																													NavigationCommand.NAV_RIGHT,NavigationCommand.NAV_LEFT,
																													NavigationCommand.NAV_HOME,NavigationCommand.NAV_END])) {
						//Clean-up navigation commands - on left/right navigation !!!
						// 1. Leave only nav's for saved cells with nivo < lastNivo (whatUsedNivo)
						if (commandBuffer.isEmpty() === false) {
							var cmd = null;
							var cell = null;
							var column = null;
							var relation = null;
							// 1. Leave only nav's for saved cells with nivo < lastNivo (whatUsedNivo)
							var commandDeleted = true;
							while (commandDeleted) {
								commandDeleted = false;
								for (var i2 in buffer) {
									if (buffer[i2]) {
										cmd = buffer[i2];
										if (cmd.getName() != Command.NAV) { continue; }
										if (cmd.getNivo() <= Position.NIVO_ROOT()) { continue; }
										column = _grid.getColumnByNivo(cmd.getNivo());
										if (column) {
											var masterRelation = column.getMaster().getRelation();
											if ((masterRelation) && (masterRelation.getId() == cmd.getRelationFrom().getId())) { continue; } //Keep ALL if same branch.
										}
										if (command.getNavigation() == NavigationCommand.NAV_RIGHT) {
											if (cmd.getId() == command.getId()) { continue; } 															 	 //Keep only the new command !!!
										}
										relation = null;
										cell = null;
										column = _grid.getColumnByNivo(cmd.getNivo());
										if (column) {
											cell = (column.isSelected)?column.getSavedCell():column.getCell(Position.ROW_TOP());
											if (cell) {
												relation = cell.getRelation();
											}
										}
										var r2 = cmd.getRelation();
										if ((relation) && (r2) && (r2.getId() == relation.getId())) { continue; }
										buffer.splice(i2,1);
										commandDeleted = true;
										if (_cNc > 0) {	_cNc = (_cNc - 1); }                                                 //TODO: _cNc
										break;
									}
								}
							}
						}
					}
				}
				result = command;
			}
			Utils.alert("GridListMediator/writeNavigationCommand - result: "+((result)?result.print():"null"));		
		} catch(error) {
			Utils.alert("GridListMediator/writeNavigationCommand - error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	};
};
GridListMediator = new Class(new GridListMediator());
GridListMediator.MODE_DISPLAY = "DISPLAY";
GridListMediator.MODE_EDIT = "EDIT";
