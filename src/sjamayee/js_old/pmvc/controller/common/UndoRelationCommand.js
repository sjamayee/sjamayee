//Abstract
var UndoRelationCommand = function() {
  this.Extends = UndoCommand;
  this.currentNivo = null;
  this.position = null;
  
	this.execute = function(note) {
		//alert("UndoRelationCommand");
		try {
			var mediator = null; //parameter !!!
			this.mediator.currentRelation = null;
			this.mediator.previousRelation = null;
			this.mediator.nextRelation = null;
  		var grid = this.mediator.grid;
  		var gridView = grid.getGridView();
			this.currentNivo = gridView.getCurrentNivo();
			this.position = (gridView.getPosition())?gridView.getPosition().clone():null;  		
  		this.parent(note);
			//RESTORE broken links for undone DELETES, some (pid,nid) are still NULL!!!
			for (var j in groupCommands) {
				if (groupCommands[j]) {
					if (groupCommands[j].getName() != Command.DEL) { continue; }				
			  	var r1 = Relation.getById(groupCommands[j].getRelation().getId());
					if (r1) {
						this.mediator.previousRelation = null;
						this.mediator.nextRelation = null;
						if (this.mediator.previousRelation === null) {
							if (r1.getPid()) {
								this.mediator.previousRelation = Relation.getById(r1.getPid());
							}
						}
						if (this.mediator.previousRelation) {
							r1.setPid(this.mediator.previousRelation.getId());
							this.mediator.previousRelation.setNid(r1.getId());
						}
						if (this.mediator.nextRelation === null) {
							if (r1.getNid()) {
								this.mediator.nextRelation = Relation.getById(r1.getNid());
							}
						}
						if (this.mediator.nextRelation) {
							r1.setNid(this.mediator.nextRelation.getId());
							this.mediator.nextRelation.setPid(r1.getId());
						}
					}
				}
			}
			gridView.setCurrentNivo(this.currentNivo);
			var p_gvw = gridView.getPosition();
			p_gvw.setRow(this.position.getRow());
			p_gvw.setColumn(this.position.getColumn());
      //this.sendNotification(SjamayeeFacade.RELATION_UNDONE,this.mediator);
		} catch(error) {
			Utils.alert("UndoRelationCommand - error: "+error.message,Utils.LOG_LEVEL_ERROR);
		}
	};
	
	this.undo_add = function(cmd) {
		//Execute new command (add->del).
	  //this.mediator.childRelation = Relation.clone(cmd.getRelation());
  	this.mediator.childRelation = cmd.getRelation()?cmd.getRelation().clone():null;
		if (this.mediator.childRelation) {
			this.mediator.childRelation.remove(this.mediator);
			if (cmd.getNivo() !== null) {
				this.currentNivo = cmd.getNivo();
			}
			var p_add = cmd.getPosition();
			if ((this.position) && (p_add)) {
				this.position.setRow(p_add.getRow());
				this.position.setColumn(p_add.getColumn());
			}
			cmd.setUnDone(true);
		}
		this.mediator.setLastCommand(cmd,false);
	};
	
  this.undo_edit = function(cmd) {
	  this.mediator.childRelation = Relation.getById(cmd.getRelation().getId());
		if (this.mediator.childRelation) {
		  //var currentEntityValues = Entity.clone(Entity.getById(this.mediator.childRelation.getCei()));
			var currentEntityValues = (this.mediator.childRelation.getCei())?Entity.getById(this.mediator.childRelation.getCei()).clone():null;
			if (currentEntityValues) {
			  //TODO: _oe !!!
				var previousEntityValues = _oe.popById(cmd.getSourceName()); //Command.EDT+"_"+this.mediator.childRelation.getCei()+"/"+cmd.getId());
				if (previousEntityValues) {
					var childEntity = this.mediator.childRelation.getChildEntity();
					if (childEntity) {
						childEntity.setName(previousEntityValues.getName());
						childEntity.setDesc(previousEntityValues.getDesc());
					}
					previousEntityValues.setName(currentEntityValues.getName());
					previousEntityValues.setDesc(currentEntityValues.getDesc());
					_oe.push(previousEntityValues);												         //TODO: this !!!
				}
			}
			this.mediator.previousRelation = null;
			this.mediator.nextRelation = null;
			//var relation = this.mediator.childRelation.save(this.mediator); //Is return needed here ???
			this.mediator.childRelation.save(this.mediator);
			if (cmd.getNivo() !== null) {
				this.currentNivo = cmd.getNivo();
			}									
			var p_edt = cmd.getPosition();
			if ((this.position) && (p_edt)) {
				this.position.setRow(p_edt.getRow());
				this.position.setColumn(p_edt.getColumn());
			}
		}
		//////////////////////////////////////////////////////////////////////////
		//ATT: Forced UNDO, even when relation does not exist (after deletion). //
		//////////////////////////////////////////////////////////////////////////
		cmd.setUnDone(true);								
		this.mediator.setLastCommand(cmd,false);
	};
	
  this.undo_copy = function(cmd) {
		if (cmd.getNivo() !== null) {
			this.currentNivo = cmd.getNivo();
		}
		var p_cpy = cmd.getPosition();
		if ((this.position) && (p_cpy)) {
			this.position.setRow(p_cpy.getRow());
			this.position.setColumn(p_cpy.getColumn());
		}
		cmd.setUnDone(true);				
		this.mediator.setLastCommand(cmd,false);
	};
	
  this.undo_delete = function(cmd) {
		//Execute new command (del->add).
	  //this.mediator.childRelation = Relation.clone(cmd.getRelation());
	  this.mediator.childRelation = (cmd.getRelation())?cmd.getRelation().clone():null;
		if (this.mediator.childRelation) {
			//Utils.alert("UndoRelationCommand/undo_delete - relation:\n"+this.mediator.childRelation.print());
			//this.mediator.childRelation.setKey(null);
			this.mediator.previousRelation = null;
			this.mediator.nextRelation = null;
			//var relation = this.mediator.childRelation.save(mediator);   // Is return needed here ???
			this.mediator.childRelation.save(this.mediator);
			if (cmd.getNivo() !== null) {
				this.currentNivo = cmd.getNivo();
			}
			var p_del = cmd.getPosition();
			if ((this.position) && (p_del)) {
				this.position.setRow(p_del.getRow());
				this.position.setColumn(p_del.getColumn());
			}
			cmd.setUnDone(true);				
		}
		this.mediator.setLastCommand(cmd,false);
	};
	
  this.undo_extract = function(cmd) {
		if (cmd.getNivo() !== null) {
			this.currentNivo = cmd.getNivo();
		}
		var p_ext = cmd.getPosition();
		if ((this.position) && (p_ext)) {
			this.position.setRow(p_ext.getRow());
			this.position.setColumn(p_ext.getColumn());
		}
		cmd.setUnDone(true);
		this.mediator.setLastCommand(cmd,false);
	};
	
  this.undo_paste = function(cmd) {
		//Execute command (PST/ADD->DEL).
    //this.mediator.childRelation = Relation.clone(cmd.getRelation());
  	this.mediator.childRelation = (cmd.getRelation())?cmd.getRelation().clone():null;
		if (this.mediator.childRelation) {
			this.mediator.childRelation.remove(this.mediator);
			if (cmd.getNivo() !== null) {
				this.currentNivo = cmd.getNivo();
			}
			var p_pst = cmd.getPosition();
			if ((this.position) && (p_pst)) {
				this.position.setRow(p_pst.getRow());
				this.position.setColumn(p_pst.getColumn());
			}
			cmd.setUnDone(true);
			this.mediator.setLastCommand(cmd,false);
		}
	};
	
  this.undo_navigation = function(cmd) {
		cmd.setUnDone(true);	
		this.mediator.setLastCommand(cmd,false);
		if (cmd.getNivo() !== null) {
			this.currentNivo = cmd.getNivo();
		}
		var p_nav = cmd.getPosition();
		if ((this.position) && (p_nav)) {
			this.position.setRow(p_nav.getRow());
			this.position.setColumn(p_nav.getColumn());
		}
	};	
};
UndoRelationCommand = new Class(new UndoRelationCommand());
