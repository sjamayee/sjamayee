var DataEntity = function() {
	this.Extends = EntityBO;
	this.proxy = null;
	
	this.initialize = function(vo) {
		try {
			this.parent(vo);
			this.setMei(vo.mei);
			this.proxy = SjamayeeFacade.getInstance().retrieveProxy(DataEntityProxy.ID);
		} catch(error) {
			Utils.alert("DataEntity/constructor Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		}
	};
	//Getters & Setters
	this.getDataEntityVO = function() {
    return new DataEntityVO(this.getId(),this.getName(),this.getDesc(),this.getMei(),null,null,this.getReferences());
	};

	this.getMei = function() {
		var result = null;
		if ((this.mei !== undefined) && (this.mei !== null)) {
			result = this.mei.substr(0,BusinessObject.ID_MIN_LENGTH);
		}
		return result;
	};
	this.setMei = function(mei) {
		if (mei !== null) {
			if ((mei !== undefined) && (mei != 'null')) {
				this.mei = mei;
			}
		}
	};
	this.getModelEntity = function() {
	  if (this.modelEntity === undefined) {
	    this.modelEntity = ModelEntity.getById(this.getMei());
	  }
		return this.modelEntity;
	};

	//Functions
	this.clone = function() {
		Utils.alert("DataEntity/clone");
		var result = null;
		try {
			result = new DataEntity(this.getDataEntityVO());
			if (result) {
		  	var properties = Utils.eval(this,false); //true);
			  if (properties) {
	         for (var key in properties) {
	           result[key] = properties[key];
					}
				}
			}
		} catch(error) {
			Utils.alert("DataEntity/clone Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	}; 
	this.print = function() {
		var result = null;
		try {
			//var attributeList = this.getAttributeList();
			result = "\nDataEntity:"; // - sid: "+this.getSid()+"\n";
			result += "\nid="+this.getId()+"\nname="+this.getName()+"\ndesc="+this.getDesc()+"\nmei="+this.getMei()+"\noid="+this.getOid();
		/*var t1 = Type.getById(this.getTid());
			if (t1) {
				result += "\nsjamayee: "+t1.isSjamayee();
			}
			result += "\nexpanded: "+this.isExpanded();
			result += "\nscrollable: "+this.isScrollable();
			result += "\nreferences: "+this.getReferences();
			result += "\nreads: "+this.getReads();
			result += "\nattributes:\n";
			var attributeNames = this.getAttributeNames();
			if (attributeNames) {
				var attributeValues = this.attributeValues; //ATTENTION: RECURSION !!! DON'T USE method: getAttributeValues()
				if (attributeValues) {
	  			for (var i in attributeValues) {
						if (attributeValues[i]) {
							var attribute = attributeValues[i];
		  				result += "\n"+attribute.n+": "+attribute.v;
						}
					}
				}
			}
			**            "\nAttributeList:"+
			"\nsize: "+attributeList.getMaximumSize()+
			"\neod: "+attributeList.getEndOfData();**   */
		} catch(error) {
			Utils.alert("DataEntity/print Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	};
};
DataEntity = new Class(new DataEntity());
DataEntity.getById = function(id) {
	var _id = (id !== undefined)?id:null;
	//alert("DataEntity/getById - id: "+_id);
	var result = null;
	try {
	  if (_id) {
    	var entityProxy = SjamayeeFacade.getInstance().retrieveProxy(DataEntityProxy.ID);
    	result = new DataEntity(entityProxy.getById(_id));
    }
	} catch(error) {
		Utils.alert("DataEntity/getById Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	} finally {
  	//alert("DataEntity/getById - result: "+result.print());
		return result;
	}
};
DataEntity.getByName = function(name) {
	var _name = (name !== undefined)?name:null;
	//alert("DataEntity/getByName - name: "+_name);
	var result = null;
	try {
	  if (_name) {
    	var entityProxy = SjamayeeFacade.getInstance().retrieveProxy(DataEntityProxy.ID);
    	result = new DataEntity(entityProxy.getByName(_name));
    }
	} catch(error) {
		Utils.alert("DataEntity/getByName Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	} finally {
		return result;
	}
};
DataEntity.getEntityOptions = function(typeName,currentEntityName,filterValue,filterCase) {
  var _typeName = ((typeName !== undefined) && (typeName !== ModelType.ALL_TYPES))?typeName:null;
  var _filterValue = ((filterValue !== undefined) && (filterValue !== null))?filterValue:"";
  var _filterCase = ((filterCase !== undefined) && (filterCase !== null))?filterCase:false;
	var result = '';
	try {
	  var facade = SjamayeeFacade.getInstance();
  	var entityProxy = facade.retrieveProxy(DataEntityProxy.ID);
  	var entities = entityProxy.getData();	
    var selectedTypeId = null;
    if ((_typeName !== undefined) && (_typeName !== null)) {
      var modelType = ModelType.getByName(_typeName);
      if (modelType) {
        selectedTypeId = modelType.getId();
      }
    }
    var allDataTypes = [];
  	var selectedType = ModelType.ALL_TYPES;
    if ((selectedTypeId !== undefined) && (selectedTypeId !== null)) {
      selectedType = selectedTypeId;
    } else {
    	var typeProxy = facade.retrieveProxy(DataTypeProxy.ID);
    	allDataTypes = typeProxy.getData();
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
          var dataEntity = new DataEntity(entity);
		      var entityType = dataEntity.getModelEntity().getModelType();
          if (entityType === null) { continue; }
    		  if (selectedType != ModelType.ALL_TYPES) {
            if (entityType.getId() != selectedType) {
              continue;
            }
    		  } else {
    		    //Select on all dataTypes used!
  		      for (var j in allDataTypes) {
  		        var dataType = allDataTypes[j];
              if (entityType.getId() == dataType.id.substr(0,BusinessObject.ID_MIN_LENGTH)) {
                break;
    		      }
    		    }
    		  }
      	  var selected = ((currentEntityName !== undefined) && (currentEntityName !== null) && (entity.name == currentEntityName))?true:false;
      	  var optionTag = '<option';
      	  optionTag += (selected)?' selected="selected"':'';
    		  optionTag += '>';
    		  var entityName = entity.name.substr(0,50);
    		  //var j = entityName.length;
    		  //while (j++ < 50) { entityName += "&nbsp;"; }
      	  result += optionTag+entityName+'</option>';
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
  	      facade.sendNotification(SjamayeeFacade.GRID_DATA_TYPE_SET,ModelType.ALL_TYPES);
  	    }
      }
    }
	} catch(error) {
		Utils.alert("DataEntity/getEntityOptions Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	} finally {
		return result;
	}
};
