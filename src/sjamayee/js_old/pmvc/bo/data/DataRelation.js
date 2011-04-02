var DataRelation = function() {
	this.Extends = RelationBO;
	this.proxy = null;

	this.initialize = function(vo) {
		try {
			this.parent(vo);
			this.setMri(vo.mri);
			this.proxy = SjamayeeFacade.getInstance().retrieveProxy(DataRelationProxy.ID);
		} catch(error) {
			Utils.alert("DataRelation/constructor Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		}
	};

	//Getters & Setters
	this.getDataRelationVO = function() {
    return new DataRelationVO(this.getId(),this.getVal(),this.getMri(),this.getPei(),this.getCei(),this.getPid(),this.getNid());
	};
	
	this.getMri = function() {
		var result = null;
		if ((this.mri !== undefined) && (this.mri !== null)) {
			result = this.mri.substr(0,BusinessObject.ID_MIN_LENGTH);
		}
		return result;
	};
	this.setMri = function(mri) {
		if (mri !== null) {
			if ((mri !== undefined) && (mri != 'null')) {
				this.mri = mri;
			}
		}
	};
	this.getModelRelation = function() {
	  if (this.modelRelation === undefined) {
	    this.modelRelation = ModelRelation.getById(this.getMri());
	  }
		return this.modelRelation;
	};

	//Functions
	this.clone = function() {
		Utils.alert("DataRelation/clone");
		var result = null;
		try {
			result = new DataRelation(this.getDataRelationVO());
			if (result) {
		  	var properties = Utils.eval(this,false); //true);
			  if (properties) {
	         for (var key in properties) {
	           result[key] = properties[key];
					}
				}
			}
		} catch(error) {
			Utils.alert("DataRelation/clone Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	};
	this.getNivo = function() {
		var result = Position.NIVO_ROOT();
		try {
			/*if (this.getGridColumn()) {
				result = this.getGridColumn().getNivo();
			}*/
			if (this.getGridCell()) {
				result = this.getGridCell().getNivo();
			}
		} catch(error) {
			Utils.alert("DataRelation/getNivo Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	};
	this.deleteRelation = function() {
		Utils.alert("DataRelation/deleteRelation");
		try {
			//Dereference entities!
			if (this.hasParent()) {
				this.getParentEntity().dereference(); 
			}  
			if (this.hasChild()) {
				this.getChildEntity().dereference();
			}  
			//Dereference THIS.
			this.dereference();
		} catch(error) {
			Utils.alert("DataRelation/deleteRelation Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		}
	};
	this.getPrevious = function() {
		Utils.alert("DataRelation/getPrevious");
		var result = null;
		try {
			if (this.getPid() !== undefined) {
				result = DataRelation.getById(this.getPid());
			}
		} catch(error) {
			Utils.alert("DataRelation/getPrevious Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	};
	this.getNext = function() {
		Utils.alert("DataRelation/getNext");
		var result = null;
		try {
			if (this.getNid() !== undefined) {
				result = DataRelation.getById(this.getNid());
			}
		} catch(error) {
			Utils.alert("DataRelation/getNext Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	};
	this.storeJson = function() {
		var result = '';
		try {
			result = '{';
			result += '"sid":"'+this.getSid()+'"';
			result += ',"id":"'+this.getId()+'"';
			result += ',"val":"'+this.getVal()+'"';
			result += ',"pei":"'+this.getPei()+'"';
			result += ',"cei":"'+this.getCei()+'"';
			result += ',"pid":"'+this.getPid()+'"';
			result += ',"nid":"'+this.getNid()+'"';
			result += '}';
			//SjamayeeForm.putBySid(this);
		} catch(error) {
			Utils.alert("DataRelation/storeJson Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	};
	this.print = function(html,keysOnly) {
		var _html = ((html !== undefined) && (html !== null))?html:false;
		var _keysOnly = ((keysOnly !== undefined) && (keysOnly !== null))?keysOnly:false;
		var _nl = (_html)?'<br/>':'\n';
		var result = '\nDataRelation:'+_nl;
		try {
			result += this.parent();
		} catch(error) {
			Utils.alert("DataRelation/print Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	};
	this.getParentEntity = function() {
		var result = null;
		try {
			if (this.hasParent() === true) {
				result = DataEntity.getById(this.getPei());
			//if (!result) { alert("DataRelation/getParentEntity - result: "+result+' cei: '+this.getPei()); }
			}
		} catch(error) {
			Utils.alert("DataRelation/getParentEntity Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	};
	this.getChildEntity = function() {
		var result = null;
		try {
			if (this.hasChild() === true) {
				result = DataEntity.getById(this.getCei());
			//if (!result) { alert("DataRelation/getChildEntity - result: "+result+' cei: '+this.getCei()); }
			}
		} catch(error) {
			Utils.alert("DataRelation/getChildEntity Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	};
	this.getFirstParentRelation = function() {
	//alert("DataRelation/getFirstParentRelation - this: "+this.print());
		var result = null;
		try {
			if (this.hasParent() === true) {
				var dataEntity = DataEntity.getById(this.getPei()); //this.getCei());
				result = DataRelation.getFirstParentForEntity(dataEntity.getDataEntityVO());
			}
		} catch(error) {
			Utils.alert("DataRelation/getFirstParentRelation Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	};
	this.getLastParentRelation = function() {
		var result = null;
		try {
			if (this.hasParent() === true) {
				var dataEntity = DataEntity.getById(this.getPei()); //this.getCei());
				result = DataRelation.getLastParentForEntity(dataEntity.getDataEntityVO());
			}
		} catch(error) {
			Utils.alert("DataRelation/getLastParentRelation Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	};
	this.getParentRelations = function(number,sort) {
		var result = [];
		try {
    	//var _number = ((number !== undefined) && (number !== null))?number:(GridView.DEFAULT_ROWS*SjamayeeFacade.PAGE_MULTIPLIER); //RelationsGridMediator.PAGE_SIZE_MAX
    	var _number = ((number !== undefined) && (number !== null))?number:(RelationsGridMediator.PAGE_SIZE_MAX*SjamayeeFacade.PAGE_MULTIPLIER);			
			var _sort = ((sort !== undefined) && (sort !== null))?sort:Cache.SORT_ASCENDING;
			//result = this.proxy.getParentRelations(this,_number,_sort);    		
			if (this.hasParent() === true) {
				//result = Entity.getById(this.getPei());
				var entityRelationsText = sforce.apex.execute('sja.DataRelationService','getParentRelations',{'entityId':this.getPei(),'size':25});
  			//alert("DataRelation/getParentRelations - entityRelationsText:\n"+entityRelationsText);
				var entityRelations = Utils.eval(entityRelationsText,true);  			
				var relations = entityRelations.relations;
  	    var i = 0;
  	    while (relations[i]) {
  	      var jso = relations[i];
  	      result.push(new DataRelation(new DataRelationVO(jso.id,jso.mri,jso.val,jso.pei,jso.cei,jso.pid,jso.nid)));
  	      i++;
  	    }
			}			
		} catch(error) {
			Utils.alert("DataRelation/getParentRelations Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			//alert("DataRelation/getParentRelations - result:\n"+result)
			return result;
		}
	};
	this.getPreviousParentRelation = function() {
		var result = null;
		try {
			result = this.proxy.getPreviousParentRelation(this);
		} catch(error) {
			Utils.alert("DataRelation/getPreviousParentRelation Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	};
	this.getPreviousParentRelations = function(number) {
		var result = [];
		try {
    	//var _number = ((number !== undefined) && (number !== null))?number:(GridView.DEFAULT_ROWS*SjamayeeFacade.PAGE_MULTIPLIER); //RelationsGridMediator.PAGE_SIZE_MAX
    	var _number = ((number !== undefined) && (number !== null))?number:(RelationsGridMediator.PAGE_SIZE_MAX*SjamayeeFacade.PAGE_MULTIPLIER);
			Utils.alert("DataRelation/getPreviousParentRelations - number: "+_number);
			result = this.proxy.getPreviousParentRelations(this,_number);
		} catch(error) {
			Utils.alert("DataRelation/getPreviousParentRelations Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	};
	this.getNextParentRelation = function() {
		var result = null;
		try {
			result = this.proxy.getNextParentRelation(this);
		} catch(error) {
			Utils.alert("DataRelation/getNextParentRelation Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	};
	this.getNextParentRelations = function(number) {
		var result = [];
		try {
    	//var _number = ((number !== undefined) && (number !== null))?number:(GridView.DEFAULT_ROWS*SjamayeeFacade.PAGE_MULTIPLIER); //RelationsGridMediator.PAGE_SIZE_MAX
    	var _number = ((number !== undefined) && (number !== null))?number:(RelationsGridMediator.PAGE_SIZE_MAX*SjamayeeFacade.PAGE_MULTIPLIER);
			Utils.alert("DataRelation/getNextParentRelations - number: "+_number);
			result = this.proxy.getNextParentRelations(this,_number);
		} catch(error) {
			Utils.alert("DataRelation/getNextParentRelations Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	};
	this.getFirstChildRelation = function() {
		var result = null;
		try {
			if (this.hasChild() === true) {
				//result = this.proxy.getFirstChildRelation(this);
				var dataEntity = DataEntity.getById(this.getCei());
				result = DataRelation.getFirstChildForEntity(dataEntity.getDataEntityVO());				
			}
		} catch(error) {
			Utils.alert("DataRelation/getFirstChildRelation Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	};
	this.getLastChildRelation = function() {
		var result = null;
		try {
			if (this.hasChild() === true) {
				result = this.proxy.getLastChildRelation(this);
			}
		} catch(error) {
			Utils.alert("DataRelation/getLastChildRelation Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	};
  this.getChildRelations = function(number,sort) {
  	var result = [];
  	try {
    	//var _number = ((number !== undefined) && (number !== null))?number:(GridView.DEFAULT_ROWS*SjamayeeFacade.PAGE_MULTIPLIER); //RelationsGridMediator.PAGE_SIZE_MAX
    	var _number = ((number !== undefined) && (number !== null))?number:(RelationsGridMediator.PAGE_SIZE_MAX*SjamayeeFacade.PAGE_MULTIPLIER);			
  		var _sort = ((sort !== undefined) && (sort !== null))?sort:Cache.SORT_ASCENDING;
  		//result = this.proxy.getChildRelations(this,_number,_sort);
  		var entityRelationsText = sforce.apex.execute('sja.DataRelationService','getChildRelations',{'entityId':this.getCei(),'size':25});
  		//alert("DataRelation/getParentRelations - entityRelationsText:\n"+entityRelationsText);
  		var entityRelations = Utils.eval(entityRelationsText,true);  			
  		var relations = entityRelations.relations;
      var i = 0;
      while (relations[i]) {
        var jso = relations[i];
        result.push(new DataRelation(new DataRelationVO(jso.id,jso.val,jso.pei,jso.cei,jso.pid,jso.nid)));
        i++;
  		}			
  	} catch(error) {
  		Utils.alert("DataRelation/getChildRelations Error: "+error.message,Utils.LOG_LEVEL_ERROR);
  	} finally {
  		//alert("DataRelation/getChildRelations - result:\n"+result)
  		return result;
  	}
  };
	this.getPreviousChildRelations = function(number) {
		var result = [];
		try {
    	//var _number = ((number !== undefined) && (number !== null))?number:(GridView.DEFAULT_ROWS*SjamayeeFacade.PAGE_MULTIPLIER); //RelationsGridMediator.PAGE_SIZE_MAX
    	var _number = ((number !== undefined) && (number !== null))?number:(RelationsGridMediator.PAGE_SIZE_MAX*SjamayeeFacade.PAGE_MULTIPLIER);
			var relation = this;
			while (relation) {
				if (_number <= 0) { break; }
				if (relation.getPid() === null) { break; }
				var previousRelation = DataRelation.getById(relation.getPid());
				if (!previousRelation) { break; }
				result.splice(0,0,previousRelation);
				relation = previousRelation;
				_number--;
			}
		} catch(error) {
			Utils.alert("DataRelation/getPreviousChildRelations Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	};
	this.getNextChildRelations = function(number) {
		var result = [];
		try {
    	//var _number = ((number !== undefined) && (number !== null))?number:(GridView.DEFAULT_ROWS*SjamayeeFacade.PAGE_MULTIPLIER); //RelationsGridMediator.PAGE_SIZE_MAX
    	var _number = ((number !== undefined) && (number !== null))?number:(RelationsGridMediator.PAGE_SIZE_MAX*SjamayeeFacade.PAGE_MULTIPLIER);
			var relation = this;
			while (relation) {
				if (_number <= 0) { break; }
				if (relation.getNid() === null) { break; }
				var nextRelation = DataRelation.getById(relation.getNid());
				if (nextRelation === null) { break; }
				result.push(nextRelation);
				relation = nextRelation;
				_number--;
			}
		} catch(error) {
			Utils.alert("DataRelation/getNextChildRelations Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	};
	this.getRelationsTopAndBottom = function() {
		var result = [];
		try {
			result = this.proxy.getRelationsTopAndBottom(this);
		} catch(error) {
			Utils.alert("DataRelation/getRelationsTopAndBottom Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	};
};
DataRelation = new Class(new DataRelation());
DataRelation.getById = function(id) {
	var _id = (id !== undefined)?id:null;
	//alert("DataRelation/getById - id: "+_id);
	var result = null;
	try {
	  if (_id) {
    	var relationProxy = SjamayeeFacade.getInstance().retrieveProxy(DataRelationProxy.ID);
    	result = new DataRelation(relationProxy.getById(_id));
    }
	} catch(error) {
		Utils.alert("DataRelation/getById Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	} finally {
  	//alert("DataRelation/getById - result: "+result.print());
		return result;
	}
};
//TODO: !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
DataRelation.getFirstParentForEntity = function(entity) {
//alert("DataRelation/getFirstParentForEntity - entity: "+entity);
	var _entity = (entity !== undefined)?entity:null;
	Utils.alert("DataRelation/getFirstParentForEntity - entity: "+_entity);
	var result = null;
	try {
	  if (_entity) {
    	var relationProxy = SjamayeeFacade.getInstance().retrieveProxy(DataRelationProxy.ID);
    	result = relationProxy.getFirstParentForEntity(_entity);
    }
	} catch(error) {
		Utils.alert("DataRelation/getFirstParentForEntity Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	} finally {
		return result;
	}
};
DataRelation.getFirstChildForEntity = function(entity) {
//alert("DataRelation/getFirstChildForEntity - entity: "+entity);
	var _entity = (entity !== undefined)?entity:null;
	Utils.alert("DataRelation/getFirstChildForEntity - entity: "+_entity);
	var result = null;
	try {
	  if (_entity) {
    	var relationProxy = SjamayeeFacade.getInstance().retrieveProxy(DataRelationProxy.ID);
    	result = relationProxy.getFirstChildForEntity(_entity);
    }
	} catch(error) {
		Utils.alert("DataRelation/getFirstChildForEntity Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	} finally {
		return result;
	}
};
DataRelation.getLastParentForEntity = function(entity) {
//alert("DataRelation/getLastParentForEntity - entity: "+entity);
	var _entity = (entity !== undefined)?entity:null;
	Utils.alert("DataRelation/getLastParentForEntity - entity: "+_entity);
	var result = null;
	try {
	  if (_entity) {
    	var relationProxy = SjamayeeFacade.getInstance().retrieveProxy(DataRelationProxy.ID);
    	result = relationProxy.getLastParentForEntity(_entity);
    }
	} catch(error) {
		Utils.alert("DataRelation/getLastParentForEntity Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	} finally {
		return result;
	}
};
DataRelation.getParentRelationsForEntity = function(entity,number,sort) {
	var _entity = (entity !== undefined)?entity:null;
	//var _number = ((number !== undefined) && (number !== null))?number:(GridView.DEFAULT_ROWS*SjamayeeFacade.PAGE_MULTIPLIER); //RelationsGridMediator.PAGE_SIZE_MAX
	var _number = ((number !== undefined) && (number !== null))?number:(RelationsGridMediator.PAGE_SIZE_MAX*SjamayeeFacade.PAGE_MULTIPLIER);
	var _sort = ((sort !== undefined) && (sort !== null))?sort:Cache.SORT_ASCENDING;
	Utils.alert("DataRelation/getParentRelationsForEntity - entity: "+_entity+" number: "+_number+" sort: "+_sort);
	var result = [];
	try {
	  if (_entity) {
    	var relationProxy = SjamayeeFacade.getInstance().retrieveProxy(DataRelationProxy.ID);
    	result = relationProxy.getParentRelationsForEntity(_entity,_number,_sort);
	  }
	} catch(error) {
		Utils.alert("DataRelation/getParentRelationsForEntity Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	} finally {
		return result;
	}
};
