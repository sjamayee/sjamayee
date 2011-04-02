var ModelType = function() {
  this.Extends = BusinessObject;
  this.proxy = null;

	this.initialize = function(vo) {
		this.parent(vo);
		this.setType(vo.type);
		this.setName(vo.name);
		this.setDesc(vo.desc);
		this.setInUse(vo.inUse);
		this.setSjamayee(vo.sjamayee);
		this.setObjekt(vo.objekt);
		this.setFieldNames(null);
		this.proxy = SjamayeeFacade.getInstance().retrieveProxy(ModelTypeProxy.ID);		
	};

	//Getters & Setters
	this.getModelTypeVO = function() {
    return new ModelTypeVO(this.getId(),this.getType(),this.getName(),this.getDesc(),this.getObjekt(),this.getInUse());
	};
	
	this.getType = function() {
		var result = null;
		if (this.type !== undefined) {
			result = this.type; //.toUpperCase();
		}
		return result;
	};
	this.setType = function(type) {
		if (type) {
			this.type = type;
		}
	};
	this.getName = function() {
		var result = null;
		if (this.name !== undefined) {
			result = this.name;
		}
		return result;
	};
	this.getNameTranslated = function() {
		var result = this.getName();
		if (result) {
			result = Utils.translate(result,"es");
		}
		return result;
	};
	this.setName = function(name) {
		if (name !== null) {
			this.name = name;
		}
	};
	this.getDesc = function() {
		var result = null;
		if (this.desc !== undefined) {
			result = this.desc;
		}
		return result;
	};
	this.getDescTranslated = function() {
		var result = this.getDesc();
		if (result) {
			result = Utils.translate(result,"es");
		}
		return result;
	};
	this.setDesc = function(desc) {
		if (desc !== null) {
			this.desc = desc;
		}
	};
	this.isInUse = function() {
		var result = false;
		if (this.inUse !== undefined) {
			result = this.inUse;
		}
		return result;
	};
	this.setInUse = function(inUse) {
		if (inUse !== null) {
			this.inUse = inUse;
		}
	};
	this.isSjamayee = function() {
		var result = false;
		if ((this.sjamayee !== undefined) && (this.sjamayee !== null)) {
			result = this.sjamayee;
		}
		return result;
	};
	this.setSjamayee = function(sjamayee) {
		if (sjamayee !== null) {
			this.sjamayee = sjamayee;
		}
	};
	this.getObjekt = function() {
		var result = null;
		if (this.objekt !== undefined) {
			result = this.objekt;
		}
		return result;
	};
	this.setObjekt = function(objekt) {
		if (objekt) {
			this.objekt = objekt;
		}
	};
	this.getFieldNames = function() {
		Utils.alert("ModelType/getFieldNames");
		try {
			if ((this.fieldNames === undefined) || (this.fieldNames === null)) {
				//AsyncQueue.connect(); // impliciet by creation of _aq
				var fieldNamesJson = sforce.apex.execute('sja.TypeService','getSfdcFieldNames',{type:this.getName()});
				//Utils.alert("ModelType/getFieldNames - fieldNamesJson: "+fieldNamesJson);
			//var fieldNames = JSON.parse(fieldNamesJson);
				//var fieldNames = eval('(' + fieldNamesJson + ')');	
				var fieldNames = Utils.eval(fieldNamesJson,true);	
				/*i = 0;
				while (fieldNamesText[i]) {
				var fieldName = fieldNamesText[i];
				fieldNames.push(fieldName);
				i++;
				}*/
				this.setFieldNames(fieldNames); //.sort());
	/*
				var type = this.getTypeExpanded();
				if (type) {
					this.setFieldNames(type.getFieldNames());
				}
	*/
			}
		} catch(error) {
			Utils.alert("ModelType/getFieldNames Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return this.fieldNames;
		}
	};
	this.setFieldNames = function(fieldNames) {
		if (fieldNames !== null) {
			this.fieldNames = fieldNames;
		}
	};
	this.print = function(html,keysOnly) {
		var _html = ((html !== undefined) && (html !== null))?html:false;
		var _keysOnly = ((keysOnly !== undefined) && (keysOnly !== null))?keysOnly:false;
		var _nl = (_html)?'<br/>':'\n';
		var result = '\nModelType:'+_nl;
		try {
			result += this.parent();
		} catch(error) {
			Utils.alert("ModelType/print Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	};
};
ModelType = new Class(new ModelType());
//Statics
ModelType.SELECT_ID = "selectionTypePanel";
ModelType.SELECTION_ID = "TYPE_SELECTION_ID";
ModelType.ALL_TYPES = "---- ALL TYPES ----";
ModelType.DOC = "DOC";
ModelType.DOC_NAME = "DOCUMENT";
ModelType.DOC_DESC = "Word Document";
ModelType.MAP = "MAP";
ModelType.MAP_NAME = "MAP/FOLDER";
ModelType.MAP_DESC = "Map/Folder";
ModelType.NOTE = "NOTE";
ModelType.NOTE_NAME = "NOTE";
ModelType.NOTE_DESC = "Note";
ModelType.PDF = "PDF";
ModelType.PDF_NAME = "PDF";
ModelType.PDF_DESC = "Portable Document Format";
ModelType.HTML = "HTML";
ModelType.HTML_NAME = "HTML";
ModelType.HTML_DESC = "Html Web Page";
ModelType.ACCT = "Account"; //"ACCT";
ModelType.ASET = "Asset"; //"ASET";
ModelType.LEAD = "Lead"; //"LEAD";
ModelType.CAMP = "Campaign"; //"CAMP";
ModelType.CASE = "Case"; //"CASE";
ModelType.CONT = "Contact"; //"CONT";
ModelType.CNTR = "Contract"; //"CNTR";
ModelType.OPPO = "Opportunity"; //"OPPO";
ModelType.SOLU = "Solution"; //"SOLU";
ModelType.USER = "User"; //"USER";
ModelType.getById = function(id) {
	var _id = (id !== undefined)?id:null;
	//alert("ModelType/getById - id: "+_id);
	var result = null;
	try {
	  if (_id) {
    	var typeProxy = SjamayeeFacade.getInstance().retrieveProxy(ModelTypeProxy.ID);
    	result = new ModelType(typeProxy.getById(_id));
    }
	} catch(error) {
		Utils.alert("ModelType/getById Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	} finally {
  	//alert("ModelType/getById - result: "+result.print());
		return result;
	}
};
ModelType.getByName = function(name) {
	var _name = (name !== undefined)?name:null;
	//alert("ModelType/getByName - name: "+_name);
	var result = null;
	try {
	  if (_name) {
    	var typeProxy = SjamayeeFacade.getInstance().retrieveProxy(ModelTypeProxy.ID);
    	result = new ModelType(typeProxy.getByName(_name));
    }
	} catch(error) {
		Utils.alert("ModelType/getByName Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	} finally {
		return result;
	}
};
ModelType.getByType = function(type) {
	var _type = (type !== undefined)?type:null;
	//Utils.alert("ModelType/getByType - type: "+_type);
	var result = null;
	try {
	  if (_type) {
  	  var typeProxy = SjamayeeFacade.getInstance().retrieveProxy(ModelTypeProxy.ID);
  	  result = new ModelType(typeProxy.getByType(_type));
  	}
	} catch(error) {
		Utils.alert("ModelType/getByType Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	} finally {
		return result;
	}
};
ModelType.getTypeOptions = function(typeName) {
	var _typeName = ((typeName !== undefined) && (typeName !== null))?typeName:'';		
	Utils.alert("ModelType/getTypeOptions - typeName: "+_typeName);
	var result = '<option>'+ModelType.ALL_TYPES+'</option>';
	var typeProxy = SjamayeeFacade.getInstance().retrieveProxy(ModelTypeProxy.ID);
	var types = typeProxy.getTypes();
	var typeSelected = _typeName;
	for (var i = 0; i < types.length; i++) {
		var type = types[i];
		if (type) {
			//if (type.inUse === false) { continue; }
			var optionTag = '<option';
	  	optionTag += (typeSelected == type.name)?' selected="selected"':'';
			optionTag += '>';
			result += optionTag+type.name+'</option>';
		}
	}
	return result;
};
/*
ModelType.getDataTypeOptions = function(typeName) {
	var _typeName = ((typeName !== undefined) && (typeName !== null))?typeName:'';		
	Utils.alert("ModelType/getDataTypeOptions - typeName: "+_typeName);
	var result = '<option>'+ModelType.ALL_TYPES+'</option>';	  
	var typeProxy = SjamayeeFacade.getInstance().retrieveProxy(ModelTypeProxy.ID);
	var types = typeProxy.getDataTypes();
	var typeSelected = _typeName;
	for (var i = 0; i < types.length; i++) {
		var type = types[i];
		if (type) {
			//if (type.inUse === false) { continue; }
			var optionTag = '<option';
	  	optionTag += (typeSelected == type.name)?' selected="selected"':'';
			optionTag += '>';
			result += optionTag+type.name+'</option>';
		}
	}
	return result;
}
*/
/*
ModelType.getAllOptions = function(sort) {
	var _sort = ((sort !== undefined) && (sort !== null))?sort:Cache.SORT_ASCENDING;		
	Utils.alert("ModelType/getAllOptions - sort: "+_sort);
//alert("ModelType/getAllOptions - _tc: "+_tc+" _cf"+_cf);
	var result = "";
	try {
	  var optionTag = null;
		var types = null;
		if (_tc) {
			types = _tc.getAll(_sort);
			if (types) {
			//alert("ModelType/getAllOptions - types: "+types.length);
			//if (_cf) {
					var typeSelected = ''; //_cf.getTypeSelected();
					//optionTag = '<option';
			  	//optionTag += (typeSelected == ModelType.ALL_TYPES)?' selected="selected">':'>';
					//result += optionTag+ModelType.ALL_TYPES+'</option>';
					for (var i = 0; i < types.length; i++) {
						var type = types[i];
						if (type) {
							//option += (!type.isInUse())?' disabled="disabled"':'';
							if (type.isInUse() === false) { continue; }
							optionTag = '<option';
					  	optionTag += (typeSelected == type.getName())?' selected="selected"':'';
						//optionTag += ' value="'+type.getName()+'"';
						//optionTag += ' title="'+type.getImageHtml(SjamayeeForm.IMAGE_SMALL)+'"';
						
						//optionTag += ' title="https://na6.salesforce.com/resource/1285791005000/sja__pdf16x16_gif"';							
							optionTag += '>';
							result += optionTag+type.getName()+'</option>'; //getType();
						}
					}
			//}
			}
		}
	} catch(error) {
		Utils.alert("ModelType/getAllOptions Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	} finally {
		Utils.alert("ModelType/getAllOptions - result:\n"+result);
	//alert("ModelType/getAllOptions - result:\n"+result);
		return result;
	}
}
*/
ModelType.getSjamayeeOptions = function(sort) {
	Utils.alert("ModelType/getSjamayeeOptions - sort: "+sort);
	var result = "";
	try {
		var _sort = ((sort !== undefined) && (sort !== null))?sort:Cache.SORT_ASCENDING;		
  	var typeProxy = SjamayeeFacade.getInstance().retrieveProxy(ModelTypeProxy.ID);
  	var types = typeProxy.getData(); //_sort !!!
		for (var i = 0; i < types.length; i++) {
			var type = types[i];
			if (type.isSjamayee() === false) { continue; }
			if (type) {
				var option = '<option';
				option += (type.inUse === false)?' disabled="disabled"':'';
				option += (type.type == ModelType.MAP)?' selected="selected"':'';
				option += '>';
				option += type.name; //getType();
				option += '</option>';
				result += option;
			}
		}
	} catch(error) {
		Utils.alert("ModelType/getSjamayeeOptions Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	} finally {
		//Utils.alert("ModelType/getSjamayeeOptions - result:\n"+result);
		return result;
	}
};
