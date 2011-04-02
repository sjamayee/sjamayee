//Abstract
var PasteRelationCommand = function() {
  this.Extends = SimpleCommand;
	this.execute = function(note) {
		//alert("PasteRelationCommand");
  	//alert("PasteRelationCommand - before: "+_kb.getShift());
  	try {
      var mediator = null; //parameter !!!
  		mediator.currentRelation = null;
  		mediator.previousRelation = null;
  		mediator.nextRelation = null;
  		var grid = mediator.grid;
  		var gridView = grid.getGridView();
		//var position = Position.clone(gridView.getPosition());
			var position = (gridView.getPosition())?gridView.getPosition().clone():null;
			var currentNivo = gridView.getCurrentNivo();
			var gridColumn = grid.getColumnByNivo(currentNivo);			
			var cell = gridView.getCurrentCell();
			//Utils.alert("PasteRelationCommand - cell: "+cell);
			var parentEntity = grid.getRootEntity();			
			if (gridColumn) {
				var master = gridColumn.getMaster();
				if (master) {
					var masterRelation = master.getRelation();
					if (masterRelation) {
						parentEntity = masterRelation.getChildEntity();					
					}
				}
			}

			if ((parentEntity.isEditable() === false) || 
					(mediator.getCommandBuffer().hasPastableCommands() === false)) {
				Utils.beep(1);
				return this;                                                       //TODO: this !!!
			}

			if (cell) {
				mediator.currentRelation = cell.getRelation();
				if (mediator.currentRelation) {
					mediator.previousRelation = mediator.currentRelation;
					mediator.nextRelation = null;
					if (mediator.currentRelation.getNext()) {
						mediator.nextRelation = mediator.currentRelation.getNext();
					}
					/*TODO: !!!!!!!!!!!!!!!!!
					if (_kb.getShift() === true) {                                  //TODO: this !!!
						mediator.previousRelation = null;
						if (mediator.currentRelation.getPrevious()) {
							mediator.previousRelation = mediator.currentRelation.getPrevious();
						}
						mediator.nextRelation = mediator.currentRelation;
					}*/
				}
			}
			///////////////////////////
			// OR *** EMPTY CELL *** //
			///////////////////////////
			var commandBuffer = this.getCommandBuffer();
			if ((commandBuffer) && (commandBuffer.hasPastableCommands() === true)) {
				var commands = commandBuffer.getLastPastableGroup();
				if ((commands) && (commands.length > 0)) {
					this.setEditPasteCommand(null);
					var groupName = null;
					var groupId = null;
					for (var i in commands) {
						if (commands[i]) {
							var cmd = commands[i];
							if (cmd.getName() == Command.PST) { continue; }
							if (cmd.getName() == Command.NAV) { continue; }							
							if (cmd.isUnDone() === true) { continue; }
							///////////////////////////////////////////////
							//ATT: Group can be GRP_nnnn or EXT_nnnn !!! //
							///////////////////////////////////////////////
							if (cmd.getGroupName().substr(0,3) == Command.GRP) {
								if (groupName === null) { groupName = cmd.getGroupName(); }
							} else {
								if (groupName === null) { groupName = cmd.getSourceName(); }									
								if (cmd.getSourceName() != groupName) { break; }
							}
							switch (cmd.getName()) {
								case Command.EDT:
						    //mediator.childRelation = Relation.clone(cmd.getRelation());
						  	mediator.childRelation = (cmd.getRelation())?cmd.getRelation().clone():null;
								if (mediator.childRelation) {
									//Clone command for making the next copy only temporary (for _writePasteCommand)
									//and will NOT change the original command (ADD,EDT,CPY,DEL).
									if (cmd.getGroupName().substr(0,3) != Command.GRP) {
										var cmd1 = mediator._writePasteCommand(parentEntity);             //TODO: this !!! _writePasteCommand !!!
										if (cmd1) {
											cmd1.setSourceName(groupName);
											if (!groupId) { groupId = cmd1.getId(); }
											cmd1.setSourceName(cmd1.getGroupName()+"/"+groupId);
											/*if (!_kb.getShift() === true) {
												position.down();
											}*/
										}
									} else {
										//TODO: !!!!! groupId = mediator._saveEditPasteCommand(cmd,groupId,groupName,parentEntity);
									}
								}
								break;
								case Command.ADD:
								case Command.CPY:
								case Command.DEL:                                        //TODO: this/getEditPastCommand/.../_kb.getShift
								if (this.getEditPasteCommand()) {
									groupId = mediator._writeEditPasteCommand(mediator.getEditPasteCommand(),groupId,groupName,parentEntity);
								}
						    //mediator.childRelation = Relation.clone(cmd.getRelation());
						  	mediator.childRelation = (cmd.getRelation())?cmd.getRelation().clone():null;
								alert("PasteRelationCommand - CPY - before: "+_kb.getShift()+" childRelation: "+mediator.childRelation);
								if (mediator.childRelation) {
									//Clone command for making the next copy only temporary (for _writePasteCommand)
									//and will NOT change the original command (ADD,EDT,CPY,DEL).
									var cmd2 = mediator._writePasteCommand(parentEntity);
									if (cmd2) {
										cmd2.setSourceName(groupName);
										if (groupId === null) { groupId = cmd2.getId(); }
										cmd2.setSourceName(cmd2.getGroupName()+"/"+groupId);
										/*if (!_kb.getShift() === true) {
											position.down();
										}*/
									}
								}													
								break;
								case Command.EXT:
								if (this.getEditPasteCommand()) {
									groupId = mediator._writeEditPasteCommand(this.getEditPasteCommand(),groupId,groupName,parentEntity);
								}
							  //var extractedRelation = Relation.clone(cmd.getRelation());
								var extractedRelation = (cmd.getRelation())?cmd.getRelation().clone():null;
								if (extractedRelation) {
									var relations = extractedRelation.getChildRelations(200,Cache.SORT_ASCENDING);
									if (relations.length > 0) {
										var pasteCount = 0;
										for (var r in relations) {
											if (relations[r]) {
											  //mediator.childRelation = Relation.clone(relations[r]);
												mediator.childRelation = relations[r].clone();
												if (mediator.childRelation) {
													//Clone command for making the next copy only temporary (for _writePasteCommand).
													//and will NOT change the original command (EXT).
													var cmd3 = mediator._writePasteCommand(parentEntity);
													if (cmd3) {
														cmd3.setSourceName(groupName);														
														if (groupId === null) { groupId = cmd3.getId(); }
														cmd3.setSourceName(cmd3.getGroupName()+"/"+groupId);
														/*if (!_kb.getShift() === true) {
															position.down();
														}*/
														pasteCount = (pasteCount + 1);
														if (pasteCount >= CommandBuffer.PASTE_LIMIT) {
															Utils.alert("Copy/Paste limit ("+CommandBuffer.PASTE_LIMIT+") exceeded.\n"+
																		">Paste interrupted.\n"+
														      	">Possibly caused by recursion.");
															break;
														}
													}
												}
											}
										}
									}
								}												
								break;
								default:
								break;
							}
						}
					}
					if (mediator.getEditPasteCommand()) {                                                                    //TODO: this !!! _writeP...
						groupId = mediator._writeEditPasteCommand(mediator.getEditPasteCommand(),groupId,groupName,parentEntity);
					}
					mediator._writeCheckPointCommand();                                                                      //TODO: this._writeC
					var p1 = gridView.getPosition();
					p1.setRow(position.getRow());
					p1.setColumn(position.getColumn());
				}
  		}
      //this.sendNotification(SjamayeeFacade.RELATION_PASTED,mediator);
  	} catch(error) {
  		Utils.alert("PasteRelationCommand - error: "+error.message,Utils.LOG_LEVEL_ERROR);
  	}
	};
};
PasteRelationCommand = new Class(new PasteRelationCommand());
