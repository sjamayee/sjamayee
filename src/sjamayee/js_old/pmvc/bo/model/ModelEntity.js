var ModelEntity = function() {
	this.Extends = EntityBO;
	this.proxy = null;
	
	this.initialize = function(vo) {
		try {
			this.parent(vo);
			this.setTid(vo.tid);
			this.proxy = SjamayeeFacade.getInstance().retrieveProxy(ModelEntityProxy.ID);			
		} catch(error) {
			Utils.alert("ModelEntity/constructor Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		}
	};
	
	//Getters & Setters
	this.getModelEntityVO = function() {
    return new ModelEntityVO(this.getId(),this.getName(),this.getDesc(),this.getTid(),this.getOid(),null,this.getReferences());
	};

	this.getTid = function() {
		var result = null;
		if ((this.tid !== undefined) && (this.tid !== null)) {
			result = this.tid.substr(0,BusinessObject.ID_MIN_LENGTH);
		}
		return result;
	};
	this.setTid = function(tid) {
		if (tid !== null) {
			if ((tid !== undefined) && (tid != 'null')) {
				this.tid = tid;
			}
		}
	};
	this.getModelType = function() {
		if (this.modelType === undefined) {
		  this.modelType = ModelType.getById(this.getTid());
		}
		return this.modelType;
	};
	//Functions
	this.clone = function() {
		Utils.alert("ModelEntity/clone");
		var result = null;
		try {
			result = new ModelEntity(this.getModelEntityVO());
			if (result) {
		  	var properties = Utils.eval(this,false); //true);
			  if (properties) {
	         for (var key in properties) {
	           result[key] = properties[key];
					}
				}
			}
		} catch(error) {
			Utils.alert("ModelEntity/clone Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	};
	this.print = function() {
		var result = null;
		try {
			//var attributeList = this.getAttributeList();
			result = "\nModelEntity:"; // - sid: "+this.getSid()+"\n";
			result += "\nid="+this.getId()+"\nname="+this.getName()+"\ndesc="+this.getDesc()+"\ntid="+this.getTid();
		/*var t1 = Type.getById(this.getTid());
			if (t1) {
				result += "\nsjamayee: "+t1.isSjamayee();
			}
			result += "\nexpanded: "+this.isExpanded();
			result += "\nscrollable: "+this.isScrollable();
			result += "\nreferences: "+this.getReferences();
			result += "\nreads: "+this.getReads();
			result += "\nattributes:\n";*/
		} catch(error) {
			Utils.alert("ModelEntity/print Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	};
};
//TODO: NOK !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
ModelEntity = new Class(new ModelEntity());
ModelEntity.getById = function(id) {
	var _id = (id !== undefined)?id:null;
	//alert("ModelEntity/getById - id: "+_id);
	var result = null;
	try {
	  if (_id) {
    	var entityProxy = SjamayeeFacade.getInstance().retrieveProxy(ModelEntityProxy.ID);
    	result = new ModelEntity(entityProxy.getById(_id));
    }
	} catch(error) {
		Utils.alert("ModelEntity/getById Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	} finally {
  	//alert("ModelEntity/getById - result: "+result.print());
		return result;
	}
};
ModelEntity.getByName = function(name) {
	var _name = (name !== undefined)?name:null;
	//alert("ModelEntity/getByName - name: "+_name);
	var result = null;
	try {
	  if (_name) {
    	var entityProxy = SjamayeeFacade.getInstance().retrieveProxy(ModelEntityProxy.ID);
    	result = new ModelEntity(entityProxy.getByName(_name));
    }
	} catch(error) {
		Utils.alert("ModelEntity/getByName Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	} finally {
		return result;
	}
};
ModelEntity.getEntityOptions = function(typeName,currentEntityName,filterValue,filterCase) {
  var _typeName = ((typeName !== undefined) && (typeName !== ModelType.ALL_TYPES))?typeName:null;
  var _filterValue = ((filterValue !== undefined) && (filterValue !== null))?filterValue:"";
  var _filterCase = ((filterCase !== undefined) && (filterCase !== null))?filterCase:false;
	var result = '';
	try {
	  var facade = SjamayeeFacade.getInstance();
  	var entityProxy = facade.retrieveProxy(ModelEntityProxy.ID);
  	var entities = entityProxy.getData();	
    var selectedTypeId = null;
    if ((_typeName !== undefined) && (_typeName !== null)) {
      var modelType = ModelType.getByName(_typeName);
      if (modelType) {
        selectedTypeId = modelType.getId();
      }
    }
    var allModelTypes = [];
  	var selectedType = ModelType.ALL_TYPES;
    if ((selectedTypeId !== undefined) && (selectedTypeId !== null)) {
      selectedType = selectedTypeId;
    } else {
    	var typeProxy = facade.retrieveProxy(ModelTypeProxy.ID);
    	allModelTypes = typeProxy.getData();
    }
    var times = 0;
    var nbrOfOptions = null;
    var re_modifiers = SjamayeeFacade.ENTITY_FILTER_MODIFIERS;
    if (_filterCase === true) {
      re_modifiers = SjamayeeFacade.ENTITY_FILTER_MODIFIERS_CASE;
    }
    var filterExpression = new RegExp(_filterValue,re_modifiers);
    do {
      nbrOfOptions = 0;
    	for (var i = 0; i < entities.length; i++) {
    		var entity = entities[i];
    		if (entity) {
          if ((filterValue !== undefined) && (filterValue !== null)) {
            if ((entity.name.match(filterExpression) === null) &&
                (entity.desc.match(filterExpression) === null)) {              
              continue;
            }
          }  
          var modelEntity = new ModelEntity(entity);
	        var entityType = modelEntity.getModelType();
          if (entityType === null) { continue; }	        
  		    if (selectedType != ModelType.ALL_TYPES) {
  		    //alert("ModelEntity/getEntityOptions - selectedType: "+selectedType+" entityType.id: "+entityType.getId());
            if (entityType.getId() != selectedType) {
              continue;
            }
    		  } else {
    		    //Select on all modelTypes used!
  		      for (var j in allModelTypes) {
  		        var modelType = allModelTypes[j];
              if (entityType.getId() == modelType.id.substr(0,BusinessObject.ID_MIN_LENGTH)) {
                break;
              }
  		      }
  		    }
      	  var selected = ((currentEntityName !== undefined) && (currentEntityName !== null) && (modelEntity.getName() == currentEntityName))?true:false;
  	  	  var optionTag = '<option';
  	  	  optionTag += (selected)?' selected="selected"':'';
  			  optionTag += '>';
  	  	  result += optionTag+modelEntity.getName50()+'</option>';
      	  nbrOfOptions++;
      	}
      }
      if (nbrOfOptions == 0) {
        if ((filterValue !== undefined) && (filterValue !== null)) {
  	      if (selectedType != ModelType.ALL_TYPES) {
  	        selectedType = ModelType.ALL_TYPES;
  	      }
  	    }
  	  }
  	  times++;
    } while ((nbrOfOptions == 0) && (times < 2));
    //Set typeSelect to "ALL_TYPES" if found with ALL_TYPES!
    if (nbrOfOptions > 0) {
      if ((_typeName !== undefined) && (_typeName !== null) && (selectedType != _typeName)) {
        if (selectedType == ModelType.ALL_TYPES) {
  	      facade.sendNotification(SjamayeeFacade.GRID_MODEL_TYPE_SET,ModelType.ALL_TYPES);
  	    }
      }
    }
	} catch(error) {
		Utils.alert("ModelEntity/getEntityOptions Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	} finally {
		return result;
	}
};
