var Setting = function() {
	this.Extends = BusinessObject;
	
	//this.initialize = function(id,name,desc) {
	this.initialize = function(vo) {
		try {
			this.parent(vo);
			this.setName(vo.name);
			this.setDesc(vo.desc);
		} catch(error) {
			Utils.alert("Setting/constructor Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		}
	};
	//Getters & Setters
	this.getSettingVO = function() {
    return new SettingVO(this.getId(),this.getName(),this.getDesc());
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
	//Functions
	/* ADD FUNCTIONS HERE !!!
	this.getFirstParentRelation = function() {
	return Relation.getFirstParentForSetting(this);
	}
	this.getParentRelations = function(number,sort) {
	var result = [];
	try {
	//Utils.alert("Relation/getParentRelations");
	result = Relation.getParentRelationsForSetting(this,number,sort);
	} catch(error) {
	alert("Setting/getParentRelations Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	} finally {
	return result;
	}
	}
	*/
	this.storeJson = function() {
		var result = '';
		try {
			result = '{';
			result += '"sid":"'+this.getSid()+'"';
			result += ',"id":"'+this.getId()+'"';
			result += ',"name":"'+this.getName()+'"';
			result += ',"desc":"'+this.getDesc()+'"';
			result += '}';
			//SjamayeeForm.putBySid(this);
		} catch(error) {
			Utils.alert("Setting/storeJson Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	};
	this.print = function(html,keysOnly) {
		var _html = ((html !== undefined) && (html !== null))?html:false;
		var _keysOnly = ((keysOnly !== undefined) && (keysOnly !== null))?keysOnly:false;
		var _nl = (_html)?'<br/>':'\n';
		var result = 'Setting:'+_nl;
		try {
			result += this.parent();
		} catch(error) {
			Utils.alert("Setting/print Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	};
};
Setting = new Class(new Setting());
//Statics
Setting.ACTIVE_ID = "settingActive";
Setting.getById = function(id) {
	var _id = (id !== undefined)?id:null;
	//alert("Setting/getById - id: "+_id);
	var result = null;
	try {
	  if (_id) {
    	var settingProxy = SjamayeeFacade.getInstance().retrieveProxy(SettingProxy.ID);
    	result = new Setting(settingProxy.getById(_id));
    }
	} catch(error) {
		Utils.alert("Setting/getById Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	} finally {
  	//alert("Setting/getById - result: "+result.print());
		return result;
	}
};
Setting.getByName = function(name) {
	var _name = (name !== undefined)?name:null;
	Utils.alert("Setting/getByName - name: "+_name);
	var result = null;
	try {
	  if (_name) {
    	var settingProxy = SjamayeeFacade.getInstance().retrieveProxy(SettingProxy.ID);
    	result = new Setting(settingProxy.getByName(_name));
    }
	} catch(error) {
		Utils.alert("Setting/getByName Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	} finally {
		return result;
	}
};
Setting.getSettingOptions = function(settingName) {
	var _settingName = ((settingName !== undefined) && (settingName !== null))?settingName:'';		
	Utils.alert("Setting/getSettingOptions - settingName: "+_settingName);
	var result = '';	  
	var settingProxy = SjamayeeFacade.getInstance().retrieveProxy(SettingProxy.ID);
	var settings = settingProxy.getData();
	var settingSelected = _settingName;
	for (var i = 0; i < settings.length; i++) {
		var setting = settings[i];
		if (setting) {
			//if (setting.inUse === false) { continue; }
			var optionTag = '<option';
	  	optionTag += (settingSelected == setting.name)?' selected="selected"':'';
			optionTag += '>';
			result += optionTag+setting.name+'</option>';
		}
	}
	return result;
};
