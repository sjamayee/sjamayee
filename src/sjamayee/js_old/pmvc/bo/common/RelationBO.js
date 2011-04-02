//Abstract
var RelationBO = function() {
  this.Extends = BusinessObject;

	this.initialize = function(vo) {
		this.parent(vo);
		this.setVal(vo.val);
		this.setPei(vo.pei);
		this.setCei(vo.cei);
		this.setPid(vo.pid);
		this.setNid(vo.nid);
		this.setSequence(0);
	};
	//Getters & Setters
	this.getVal = function() {
		var result = null;
		if (this.val !== undefined) {
			result = this.val;
		}
	//TEST!!!
	//if (!result) {
		  result = ((this.getId())?this.getId():'***')+'/';
			var parentEntity = this.getParentEntity();
			if (parentEntity) {
				result += parentEntity.getName();
			} else {
				result += '***';
			}
			var childEntity = this.getChildEntity();
			if (childEntity) {
				result += ' - ' + childEntity.getName();
			}
	//}
		return result;
	};
	this.setVal = function(val) {
		if (val !== null) {
			this.val = val;
		}
	};
	this.getPei = function() {
		var result = null;
		if ((this.pei !== undefined) && (this.pei !== null)) {
			result = this.pei.substr(0,BusinessObject.ID_MIN_LENGTH);
		}
		return result;
	};
	this.setPei = function(pei) {
		if (pei !== null) {
			if (pei != 'null') {
				this.pei = pei;
			}
		}
	};
	this.getCei = function() {
		var result = null;
		if ((this.cei !== undefined) && (this.cei !== null)) {
			result = this.cei.substr(0,BusinessObject.ID_MIN_LENGTH);
		}
		return result;
	};
	this.setCei = function(cei) {
		if (cei !== null) {
			if (cei != 'null') {
				this.cei = cei;
			}
		}
	};
	this.getPid = function() {
		var result = null;
		if ((this.pid !== undefined) && (this.pid !== null)) {
			result = this.pid.substr(0,BusinessObject.ID_MIN_LENGTH);
		}
		return result;
	};
	this.setPid = function(pid) {
		if (pid !== null) {
			if (pid != 'null') {
				this.pid = pid;
			}
		}
	};
	this.getNid = function() {
		var result = null;
		if ((this.nid !== undefined) && (this.nid !== null)) {
			result = this.nid.substr(0,BusinessObject.ID_MIN_LENGTH);
		}
		return result;
	};
	this.setNid = function(nid) {
		if (nid !== null) {
			if (nid != 'null') {
				this.nid = nid;
			}
		}
	};
	this.getSequence = function() {
		var result = 0;
		if ((this.sequence !== undefined) && (this.sequence !== null)) {
			result = this.sequence;
		}
		return result;
	};
	this.setSequence = function(sequence) {
		if (sequence !== null) {
			this.sequence = sequence;
		}
	};
	this.getGridCell = function() {
		var result = null;
		if (this.gridCell !== undefined) {
			result = this.gridCell;
		}
		return result;
	};
	this.setGridCell = function(gridCell) {
		if (gridCell !== null) {
			this.gridCell = gridCell;
		}
	};
	
	this.isFirst = function() {
		return (this.getPid() === null);
	};
	this.isLast = function() {
		return (this.getNid() === null);
	};
	this.hasParent = function() {
		return (this.getPei() !== null);
	};
	this.hasChild = function() {
		return (this.getCei() !== null);
	};
	this.hasParentRelations = function() {
		return (this.getFirstParentRelation() !== null);
	};
	this.hasChildRelations = function() {
		return (this.getFirstChildRelation() !== null);
	};
	
	this.isEditable = function() {
		Utils.alert("RelationBO/isEditable");
		var result = false;
		try {
			if (this.hasChild()) {
				var childEntity = this.getChildEntity();
				if (childEntity) {
					result = ((childEntity.getType().toUpperCase() == 'LEAD') ||
					          (childEntity.getType().toUpperCase() == 'USER') ||
					          (childEntity.getType().toUpperCase() == 'MAP'))?true:false;
					/*var modelEntity = childEntity.getModelEntity();
					if (modelEntity) {
					var modelType = modelEntity.getType();
					if (modelType) {
					result = (modelType.getTypeName() == 'T01')?true:false;
					}
					}*/
				}
			}
		} catch(error) {
			Utils.alert("RelationBO/isEditable Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return true; //result; // !!! FOR TEST !!!
		}
	};
	this.isSjamayee = function() {
		Utils.alert("RelationBO/isSjamayee");
		var result = null;
		try {
			var childEntity = this.getChildEntity();
			if (childEntity) {
				result = childEntity.isSjamayee();
			}
		} catch (error) {
			Utils.alert("RelationBO/isSjamayee Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	};
	this.isUnique = function() {
		Utils.alert("RelationBO/isUnique");
		var result = true;
		try {
			var relationsTopAndBottom = this.getRelationsTopAndBottom();
			if (relationsTopAndBottom) {
				if (relationsTopAndBottom.length > 0) {
					for (var i = 0; i < relationsTopAndBottom.length; i++) {
					  var r = relationsTopAndBottom[i];
					  if (r) {
							if (this.getPid() === null) {
								if (r.getPid() === null) {
									result = false;
									break;
								}
							}
							if (this.getNid() === null) {
								if (r.getNid() === null) {
									result = false;
									break;
								}
							}
						}
					}
				}
			}
		} catch (error) {
			Utils.alert("RelationBO/isUnique Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	};
	
  this.save = function(mediator) {
  	//Utils.alert("RelationBO/save");
  	try {
  		var before_pr = "\n";
  		var before_nr = "\n";
  		var after_pr = "\n";
  		var after_nr = "\n";

  		var isNew = (this.getId() === null)?true:false;

  	//this.setSfdcCall(SjamayeeForm.SFDC_EDIT_CHILD);
  	//this.writeSnapShot();

  		if (this.getPid()) {
  			mediator.previousRelation = Relation.getById(this.getPid());
  		}
  		if (this.getNid()) {
  			mediator.nextRelation = Relation.getById(this.getNid());
  		}

  		if (mediator.previousRelation) { before_pr = mediator.previousRelation.print(); }
  		if (mediator.nextRelation)     { before_nr = mediator.nextRelation.print();	}
  		if (this.getId() === null) {
  			var rid = Utils.nextId();
  			this.setKey(rid);
  		}
  		//Update entity/relation and relations !!!
  		var childEntity = this.getChildEntity();
  		if (childEntity === null) {
  /*
  			//Insert new entity!
  			var eid = Utils.nextId();
  			var type = Type.MAP;
  			if (document.getElementById(Entity.CHILD_TYPE_SELECTION_ID)) {
  				type = document.getElementById(Entity.CHILD_TYPE_SELECTION_ID).value;
  			}
  			childEntity = new Entity(eid,eid+"_name",type,eid+"_description",null,null);
  			_ec.put(childEntity);
  */
  			if (document) {
  				if (document.getElementById(Entity.CHILD_NAME_ID)) {
  					childEntity = Entity.getByName(_rf.getChildEntitySelected());
  				}
  			}
  		}
  		if (childEntity) {
  			if (isNew) {
  				if (document) {
  					if (document.getElementById(Entity.CHILD_DESC_TEXTAREA_ID) !== null) {
  						childEntity.setDesc(document.getElementById(Entity.CHILD_DESC_TEXTAREA_ID).value);
  					}
  				}
  			}
  			if (!isNew) {
  				if (document) {
  					if (document.getElementById(Entity.CHILD_NAME_TEXTAREA_ID) !== null) {
  						childEntity.setName(document.getElementById(Entity.CHILD_NAME_TEXTAREA_ID).value);
  						childEntity.setDesc(document.getElementById(Entity.CHILD_DESC_TEXTAREA_ID).value);
  					}
  				}
  			}
  			if (this.getCei() === null) {
  				this.setCei(childEntity.getId());
  			}
  		}

  		var pid = null;
  		var nid = null;
  		if (isNew) {
  			this.setPid(null);
  			this.setNid(null);
  		}		
  	/*if (!mediator.previousRelation) {
  			if (this.getPid()) { mediator.previousRelation = Relation.getById(this.getPid());	}
  		}*/
  		if (mediator.previousRelation) {
  			nid = mediator.previousRelation.getNid();
  			this.setPid(mediator.previousRelation.getId());
  			mediator.previousRelation.setNid(this.getId());
  		}
  	/*if (!mediator.nextRelation) {
  			if (this.getNid()) { mediator.nextRelation = Relation.getById(this.getNid());	}
  		}*/
  		if (mediator.nextRelation) {
  			pid = mediator.nextRelation.getPid();
  			this.setNid(mediator.nextRelation.getId());
  			mediator.nextRelation.setPid(this.getId());
  		}

  		if (isNew) {
  			if ((this.getPid() === null) ||
  					(this.getNid() === null)) {
  				if (!this.isUnique()) {
  					//Utils.alert("RelationBO/save - NOT UNIQUE\n"+this.print());
  					this.setPei(null);
  					//this.setPid(null);
  					//this.setNid(null);			
  					//this = Relation.clone(null); // TODO: !!!!!!!
  					//this = null;                                         // ???????????
  					if (nid !== null) {
  						mediator.previousRelation.setNid(nid);
  					}
  					if (pid !== null) {
  						mediator.nextRelation.setPid(pid);
  					}
  					Utils.beep(0);
  					return this;
  				}
  			}
  		}
  		//Insert new relation!
  		//_rc.put(this);		                     _rc  !!!!!!!
  		if (isNew) {
  			var gridView = mediator.grid.getGridView();
				var position = gridView.getPosition();
  			if (position) { position.down(); }
  		}

  		if (mediator.previousRelation !== null) { after_pr = mediator.previousRelation.print(); }
  		if (mediator.nextRelation !== null)     { after_nr = mediator.nextRelation.print(); }
  /*
  		Utils.alert("RelationBO/save - this: "+this.print()+"\n"+
  	//"\nParent:\n"+((this.getParentEntity() !== null)?this.getParentEntity().print():"*** null ***")+
  	//"\nChild:\n"+((this.getChildEntity() !== null)?this.getChildEntity().print():"*** null ***")+
  		"\nBEFORE:"+
  		"\nPrevious:"+before_pr+
  		"\nNext:"+before_nr+
  		"\nAFTER:"+
  		"\nPrevious:"+after_pr+
  		"\nNext:"+after_nr);

  		//Mode: DISPLAY
  		this.setMode(Grid.MODE_DISPLAY);
  		this.refresh();
  */
  		Utils.alert("RelationBO/save - this: "+((this)?this.print():"null"));		
  	} catch(error) {
  		Utils.alert("RelationBO/save Error: "+error.message,Utils.LOG_LEVEL_ERROR);
  	} finally {
  		//Reset Globals !!!
  		mediator.parentRelation = null;
  		mediator.childRelation = null;
  		mediator.previousRelation = null;
  		mediator.currentRelation = null;
  		mediator.nextRelation = null;
  		//Utils.alert("RelationBO/save finally!");
  		return this;
  	}
  };
  
  this.remove = function(mediator) {
  	//Utils.alert("RelationBO/remove");
  	try {
  		var before_pr = "\n";
  		var before_nr = "\n";
  		var after_pr = "\n";
  		var after_nr = "\n";

  		if (mediator.previousRelation) {
  			before_pr = mediator.previousRelation.print();
  		}
  		if (mediator.nextRelation) {
  			before_nr = mediator.nextRelation.print();
  		}
  		//////////////////
  		//Delete relation!
  		//////////////////
  		mediator.previousRelation = Relation.getById(this.getPid());
  		mediator.nextRelation = Relation.getById(this.getNid());
  		if (mediator.previousRelation) {
  			mediator.previousRelation.setNid((mediator.nextRelation)?mediator.nextRelation.getId():null);
  		}
  		if (mediator.nextRelation) {
  			mediator.nextRelation.setPid((mediator.previousRelation)?mediator.previousRelation.getId():null);
  		}
  		_rc.remove(this.getKey());  //TODO: _rc !!!!!
  		//////////////////
  		if (mediator.previousRelation) {
  			after_pr = mediator.previousRelation.print();
  		}
  		if (mediator.nextRelation) {
  			after_nr = mediator.nextRelation.print();
  		}
  		/*alert("RelationBO/remove - this: "+this.print()+
  		//"\nParent:\n"+((this.getParentEntity() !== null)?this.getParentEntity().print():"*** null ***")+
  		//"\nChild:\n"+((this.getChildEntity() !== null)?this.getChildEntity().print():"*** null ***")+
  		"\nBEFORE:"+
  		"\nPrevious:"+before_pr+
  		"\nNext:"+before_nr+
  		"\nAFTER:"+
  		"\nPrevious:"+after_pr+
  		"\nNext:"+after_nr);*/
  		Utils.alert("RelationBO/remove - this: "+((this)?this.print():"null"));
  	} catch(error) {
  		Utils.alert("RelationBO/remove Error: "+error.message,Utils.LOG_LEVEL_ERROR);
  	} finally {
  		//Reset Globals !!!
  		mediator.parentRelation = null;
  		mediator.childRelation = null;
  		mediator.previousRelation = null;
  		mediator.currentRelation = null;
  		mediator.nextRelation = null;
  		return this;
  	}
  };
};
RelationBO = new Class(new RelationBO());
