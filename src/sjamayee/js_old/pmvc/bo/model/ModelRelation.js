var ModelRelation = function() {
	this.Extends = RelationBO;
	this.proxy = null;

	this.initialize = function(vo) {
		try {
			this.parent(vo);
			this.proxy = SjamayeeFacade.getInstance().retrieveProxy(ModelRelationProxy.ID);
		} catch(error) {
			Utils.alert("ModelRelation/constructor Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		}
	};
	
	//Getters & Setters
	this.getModelRelationVO = function() {
    return new ModelRelationVO(this.getId(),this.getVal(),this.getPei(),this.getCei(),this.getPid(),this.getNid());
	};

	//Functions
	this.clone = function() {
		Utils.alert("ModelRelation/clone");
		var result = null;
		try {
			result = new ModelRelation(this.getModelRelationVO());
			if (result) {
		  	var properties = Utils.eval(this,false); //true);
			  if (properties) {
	         for (var key in properties) {
	           result[key] = properties[key];
					}
				}
			}
		} catch(error) {
			Utils.alert("ModelRelation/clone Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	};
	this.getPrevious = function() {
		Utils.alert("ModelRelation/getPrevious");
		var result = null;
		try {
			if (this.getPid() !== undefined) {
				result = ModelRelation.getById(this.getPid());
			}
		} catch(error) {
			Utils.alert("ModelRelation/getPrevious Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	};
	this.getNext = function() {
		Utils.alert("ModelRelation/getNext");
		var result = null;
		try {
			if (this.getNid() !== undefined) {
				result = ModelRelation.getById(this.getNid());
			}
		} catch(error) {
			Utils.alert("ModelRelation/getNext Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	};
	this.print = function(html,keysOnly) {
		var _html = ((html !== undefined) && (html !== null))?html:false;
		var _keysOnly = ((keysOnly !== undefined) && (keysOnly !== null))?keysOnly:false;
		var _nl = (_html)?'<br/>':'\n';
		var result = '\nModelRelation:'+_nl;
		try {
			result += this.parent();
		} catch(error) {
			Utils.alert("ModelRelation/print Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	};
	this.getParentEntity = function() {
		var result = null;
		try {
			if (this.hasParent() === true) {
				result = ModelEntity.getById(this.getPei());
			//if (!result) { alert("ModelRelation/getParentEntity - result: "+result+' cei: '+this.getPei()); }
			}
		} catch(error) {
			Utils.alert("ModelRelation/getParentEntity Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	};
	this.getChildEntity = function() {
		var result = null;
		try {
			if (this.hasChild() === true) {
				result = ModelEntity.getById(this.getCei());
			//if (!result) { alert("ModelRelation/getChildEntity - result: "+result+' cei: '+this.getCei()); }
			}
		} catch(error) {
			Utils.alert("ModelRelation/getChildEntity Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	};
	this.getFirstParentRelation = function() {
		var result = null;
		try {
			if (this.hasParent() === true) {
				var modelEntity = ModelEntity.getById(this.getPei()); //this.getCei());
				result = ModelRelation.getFirstParentForEntity(modelEntity.getModelEntityVO());
			}
		} catch(error) {
			Utils.alert("ModelRelation/getFirstParentRelation Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	};
	this.getLastParentRelation = function() {
		var result = null;
		try {
			if (this.hasParent() === true) {
				var modelEntity = ModelEntity.getById(this.getPei()); //this.getCei());
				result = ModelRelation.getLastParentForEntity(modelEntity.getModelEntityVO());
			}
		} catch(error) {
			Utils.alert("ModelRelation/getLastParentRelation Error: "+error.message,Utils.LOG_LEVEL_ERROR);
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
				var entityRelationsText = sforce.apex.execute('sja.ModelRelationService','getParentRelations',{'entityId':this.getPei(),'size':25});
  			//alert("ModelRelation/getParentRelations - entityRelationsText:\n"+entityRelationsText);
				var entityRelations = Utils.eval(entityRelationsText,true);  			
				var relations = entityRelations.relations;
  	    var i = 0;
  	    while (relations[i]) {
  	      var jso = relations[i];
  	      result.push(new ModelRelation(new ModelRelationVO(jso.id,jso.val,jso.pei,jso.cei,jso.pid,jso.nid)));
  	      i++;
  	    }
			}			
		} catch(error) {
			Utils.alert("ModelRelation/getParentRelations Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			//alert("ModelRelation/getParentRelations - result:\n"+result)
			return result;
		}
	};
	this.getPreviousParentRelation = function() {
		var result = null;
		try {
		  result = null;
			result = this.proxy.getPreviousParentRelation(this);
		} catch(error) {
			Utils.alert("ModelRelation/getPreviousParentRelation Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	};
	this.getPreviousParentRelations = function(number) {
		var result = [];
		try {
			//var _number = ((number !== undefined) && (number !== null))?number:(GridView.DEFAULT_ROWS*SjamayeeFacade.PAGE_MULTIPLIER); //RelationsGridMediator.PAGE_SIZE_MAX
			var _number = ((number !== undefined) && (number !== null))?number:(RelationsGridMediator.PAGE_SIZE_MAX*SjamayeeFacade.PAGE_MULTIPLIER);
			Utils.alert("ModelRelation/getPreviousParentRelations - number: "+_number);
			result = this.proxy.getPreviousParentRelations(this,_number);
		} catch(error) {
			Utils.alert("ModelRelation/getPreviousParentRelations Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	};
	this.getNextParentRelation = function() {
		var result = null;
		try {
		  result = null;
			//result = this.proxy.getNextParentRelation(this);
		} catch(error) {
			Utils.alert("ModelRelation/getNextParentRelation Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	};
	this.getNextParentRelations = function(number) {
		var result = [];
		try {
			//var _number = ((number !== undefined) && (number !== null))?number:(GridView.DEFAULT_ROWS*SjamayeeFacade.PAGE_MULTIPLIER); //RelationsGridMediator.PAGE_SIZE_MAX
			var _number = ((number !== undefined) && (number !== null))?number:(RelationsGridMediator.PAGE_SIZE_MAX*SjamayeeFacade.PAGE_MULTIPLIER);
			Utils.alert("ModelRelation/getNextParentRelations - number: "+_number);
			//result = this.proxy.getNextParentRelations(this,_number);
		} catch(error) {
			Utils.alert("ModelRelation/getNextParentRelations Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	};
	this.getFirstChildRelation = function() {
		var result = null;
		try {
		  result = null;
		/*if (this.hasChild() === true) {
				result = this.proxy.getFirstChildRelation(this);
			}*/
		} catch(error) {
			Utils.alert("ModelRelation/getFirstChildRelation Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	};
	this.getLastChildRelation = function() {
		var result = null;
		try {
		  result = null;
		/*if (this.hasChild() === true) {
				result = this.proxy.getLastChildRelation(this);
			}*/
		} catch(error) {
			Utils.alert("ModelRelation/getLastChildRelation Error: "+error.message,Utils.LOG_LEVEL_ERROR);
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
  		var entityRelationsText = sforce.apex.execute('sja.ModelRelationService','getChildRelations',{'entityId':this.getCei(),'size':25});
  		//alert("ModelRelation/getParentRelations - entityRelationsText:\n"+entityRelationsText);
  		var entityRelations = Utils.eval(entityRelationsText,true);  			
  		var relations = entityRelations.relations;
      var i = 0;
      while (relations[i]) {
        var jso = relations[i];
        result.push(new ModelRelation(new ModelRelationVO(jso.id,jso.val,jso.pei,jso.cei,jso.pid,jso.nid)));
        i++;
  		}			
  	} catch(error) {
  		Utils.alert("ModelRelation/getChildRelations Error: "+error.message,Utils.LOG_LEVEL_ERROR);
  	} finally {
  		//alert("ModelRelation/getChildRelations - result:\n"+result)
  		return result;
  	}
  };
	this.getPreviousChildRelations = function(number) {
		var result = [];
		try {
			//var _number = ((number !== undefined) && (number !== null))?number:(GridView.DEFAULT_ROWS*SjamayeeFacade.PAGE_MULTIPLIER); //RelationsGridMediator.PAGE_SIZE_MAX
			var _number = ((number !== undefined) && (number !== null))?number:(RelationsGridMediator.PAGE_SIZE_MAX*SjamayeeFacade.PAGE_MULTIPLIER);
			var relation = this;
		/*while (relation) {
				if (_number <= 0) { break; }
				if (relation.getPid() === null) { break; }
				var previousRelation = ModelRelation.getById(relation.getPid());
				if (!previousRelation) { break; }
				result.splice(0,0,previousRelation);
				relation = previousRelation;
				_number--;
			}*/
		} catch(error) {
			Utils.alert("ModelRelation/getPreviousChildRelations Error: "+error.message,Utils.LOG_LEVEL_ERROR);
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
		/*while (relation) {
				if (_number <= 0) { break; }
				if (relation.getNid() === null) { break; }
				var nextRelation = ModelRelation.getById(relation.getNid());
				if (nextRelation === null) { break; }
				result.push(nextRelation);
				relation = nextRelation;
				_number--;
			}*/
		} catch(error) {
			Utils.alert("ModelRelation/getNextChildRelations Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	};
	this.getRelationsTopAndBottom = function() {
		var result = [];
		try {
		  result = null;
			result = this.proxy.getRelationsTopAndBottom(this);
		} catch(error) {
			Utils.alert("ModelRelation/getRelationsTopAndBottom Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	};
};
ModelRelation = new Class(new ModelRelation());
ModelRelation.getById = function(id) {
	var _id = (id !== undefined)?id:null;
	//alert("ModelRelation/getById - id: "+_id);
	var result = null;
	try {
	  if (_id) {
    	var relationProxy = SjamayeeFacade.getInstance().retrieveProxy(ModelRelationProxy.ID);
    	result = new ModelRelation(relationProxy.getById(_id));
    }
	} catch(error) {
		Utils.alert("ModelRelation/getById Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	} finally {
  	//alert("ModelRelation/getById - result: "+result.print());
		return result;
	}
};
//TODO: !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
ModelRelation.getFirstParentForEntity = function(entity) {
	var _entity = (entity !== undefined)?entity:null;
	Utils.alert("ModelRelation/getFirstParentForEntity - entity: "+_entity);
	var result = null;
	try {
	  if (_entity) {
    	var relationProxy = SjamayeeFacade.getInstance().retrieveProxy(ModelRelationProxy.ID);
    	result = relationProxy.getFirstParentForEntity(_entity);
    }
	} catch(error) {
		Utils.alert("ModelRelation/getFirstParentForEntity Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	} finally {
		return result;
	}
};
ModelRelation.getLastParentForEntity = function(entity) {
//alert("ModelRelation/getLastParentForEntity - entity: "+entity);
	var _entity = (entity !== undefined)?entity:null;
	Utils.alert("ModelRelation/getLastParentForEntity - entity: "+_entity);
	var result = null;
	try {
	  if (_entity) {
    	var relationProxy = SjamayeeFacade.getInstance().retrieveProxy(ModelRelationProxy.ID);
    	result = relationProxy.getLastParentForEntity(_entity);
    }
	} catch(error) {
		Utils.alert("ModelRelation/getLastParentForEntity Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	} finally {
		return result;
	}
};
ModelRelation.getParentRelationsForEntity = function(entity,number,sort) {
	var _entity = (entity !== undefined)?entity:null;
	//var _number = ((number !== undefined) && (number !== null))?number:(GridView.DEFAULT_ROWS*SjamayeeFacade.PAGE_MULTIPLIER); //RelationsGridMediator.PAGE_SIZE_MAX
	var _number = ((number !== undefined) && (number !== null))?number:(RelationsGridMediator.PAGE_SIZE_MAX*SjamayeeFacade.PAGE_MULTIPLIER);
	var _sort = ((sort !== undefined) && (sort !== null))?sort:Cache.SORT_ASCENDING;
	Utils.alert("ModelRelation/getParentRelationsForEntity - entity: "+entity);
	var result = [];
	try {
	  if (_entity) {
    	var relationProxy = SjamayeeFacade.getInstance().retrieveProxy(ModelRelationProxy.ID);
    	result = relationProxy.getParentRelationsForEntity(_entity,_number,_sort);
	  }
	} catch(error) {
		Utils.alert("ModelRelation/getParentRelationsForEntity Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	} finally {
		return result;
	}
};
