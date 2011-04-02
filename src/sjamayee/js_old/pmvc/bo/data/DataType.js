var DataType = function() {
  this.Extends = ModelType;
  this.proxy = null;

	this.initialize = function(vo) {
		this.parent(vo);
		this.proxy = SjamayeeFacade.getInstance().retrieveProxy(DataTypeProxy.ID);		
	};

	//Getters & Setters
	this.getDataTypeVO = function() {
    return new DataTypeVO(this.getId(),this.getType(),this.getName(),this.getDesc(),this.getObjekt(),this.getInUse());
	};
	
	this.print = function(html,keysOnly) {
		var _html = ((html !== undefined) && (html !== null))?html:false;
		var _keysOnly = ((keysOnly !== undefined) && (keysOnly !== null))?keysOnly:false;
		var _nl = (_html)?'<br/>':'\n';
		var result = '\nDataType:'+_nl;
		try {
			result += this.parent();
		} catch(error) {
			Utils.alert("DataType/print Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	};
};
DataType = new Class(new DataType());
DataType.ALL_TYPES = "---- ALL TYPES ----";
/*
DataType.getById = function(id) {
	//alert("DataType/getById - id: "+id);
	var result = null;
	try {
	  result = null; //ModelType.getById(id);
	} catch(error) {
		Utils.alert("DataType/getById Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	} finally {
  	//alert("DataType/getById - result: "+result.print());
		return result;
	}
}
DataType.getByName = function(name) {
	//alert("DataType/getByName - name: "+name);
	var result = null;
	try {
	  result = null; //ModelType.getByName(name);
  	//alert("DataType/getByName - result:\n"+result.print());
	} catch(error) {
		Utils.alert("DataType/getByName Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	} finally {
		return result;
	}
}
DataType.getByType = function(type) {
	//Utils.alert("DataType/getByType - type: "+type);
	var result = null;
	try {
	  result = null; //ModelType.getByType(type);
	} catch(error) {
		Utils.alert("DataType/getByType Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	} finally {
		return result;
	}
}
*/
DataType.getTypeOptions = function(typeName) {
	var _typeName = ((typeName !== undefined) && (typeName !== null))?typeName:'';		
	Utils.alert("DataType/getTypeOptions - typeName: "+_typeName);
	var result = '<option selected="selected">'+DataType.ALL_TYPES+'</option>';	  
	var typeProxy = SjamayeeFacade.getInstance().retrieveProxy(DataTypeProxy.ID);
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
DataType.getAllOptions = function(sort) {
	var _sort = ((sort !== undefined) && (sort !== null))?sort:Cache.SORT_ASCENDING;		
	Utils.alert("DataType/getAllOptions - sort: "+_sort);
//alert("DataType/getAllOptions - _tc: "+_tc+" _cf"+_cf);
	var result = "";
	try {
    result = ""; //ModelType.getAllOptions(_sort); NOK - deleted!!!
	} catch(error) {
		Utils.alert("DataType/getAllOptions Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	} finally {
		Utils.alert("DataType/getAllOptions - result:\n"+result);
	//alert("DataType/getAllOptions - result:\n"+result);
		return result;
	}
}
DataType.getSjamayeeOptions = function(sort) {
	Utils.alert("DataType/getSjamayeeOptions - sort: "+sort);
	var result = "";
	try {
		var _sort = ((sort !== undefined) && (sort !== null))?sort:Cache.SORT_ASCENDING;		
	  result = ""; //ModelType.getSjamayeeOptions(_sort);
	} catch(error) {
		Utils.alert("DataType/getAllOptions Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	} finally {
		//Utils.alert("DataType/getAllOptions - result:\n"+result);
		return result;
	}
}
*/
