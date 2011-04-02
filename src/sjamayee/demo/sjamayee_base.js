//////////////////////////////
// GLOBAL VARIABLES - START //
//////////////////////////////
var _test             = false; //TEST ***
var _gridFocus        = null;
var _grid             = null;  //Grid
var _dataGrid         = null;  //DataGrid
var _modelGrid        = null;  //ModelGrid
var _tc               = null;  //TypeCache
var _mec              = null;  //ModelEntityCache
var _mrc              = null;  //ModelRelationCache
var _ec               = null;  //EntityCache
var _rc               = null;  //RelationCache
var _sc               = null;  //SettingCache
var _oc               = null;  //ObjectCache
var _oe               = null;  //Original Entity ListCache
var _kb               = null;  //Keyboard
var _aq               = null;  //AsyncQueue
var _parentRelation   = null;
var _childRelation    = null;
var _previousRelation = null;
var _currentRelation  = null;
var _nextRelation     = null;
var _object           = null;
var _id               = 1000;
var _sourceName       = null;
var _groupId          = null;
var _cNc              = 0;		 //Counter for Navigation commands

var _cf               = null;  //CURRENT FORM
var _of               = null;  //ObjectsForm
var _rf               = null;  //RelationsForm

var _logger 					= null;	 //Logger
var _ste              = null;  //Simple Text Editor
////////////////////////////
// GLOBAL VARIABLES - END //
////////////////////////////
	
//Static
//Class: Utils
var Utils = new Class({
	initialize: function() { return undefined; }
});
//Statics
Utils.BEEP = null;
Utils.RETRY_MILLISECONDS = 10000; //5000;
Utils.LOG_LEVEL_DEBUG = 0;
Utils.LOG_LEVEL_INFO = 1;
Utils.LOG_LEVEL_WARN = 2;
Utils.LOG_LEVEL_ERROR = 5;
Utils.LOG_LEVEL_FATAL = 9;
Utils.LOG_LEVEL = Utils.LOG_LEVEL_DEBUG;
Utils.LOG_MODE = true;
Utils.DEBUG_MODE = true;
Utils.DISPLAY_MESSAGE_LENGTH = 80;
Utils.LOG_MESSAGE_LENGTH = 160;
Utils.now = function() {
	return new Date();
};
Utils.groupMode = function() {
	return true; //false;
};
Utils.group = function() {
	var result = Utils.groupMode();
	return (_kb.getShift() === true)?(!result):result;
};
Utils.nextId = function() {
	_id = _id + 1;
	return _id;
};
Utils.pad = function(number,length) {
  //alert("Utils/pad - number: "+number+" length: "+length);
  var result = "000000000000000" + number.toString();
  result = result.substr(result.length-length);
  //alert("Utils/pad - number: "+number+" length: "+length+" result: "+result);
  return result;
};
Utils.trim = function(value) {
	try {
		value = value.replace(/^\s+/,'');
		value = value.replace(/\s+$/,'');
	} catch(error) {
		Utils.alert("Utils/trim Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	} finally {
		return value;
	}
};
Utils.translate = function(value,language) {
	var _language = ((language !== undefined) && (language !== null))?language:'en';
	var result = value;
	try {
		result = value; //Remove !!!
/*
		//Google Translate
		google.language.translate(value, "", _language, function(v) {
  		if (!v.error) {
	  		result = v.translation;
  		}
		});
*/
	} catch(error) {
		Utils.alert("Utils/translate Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	} finally {
		return result;
	}
};
Utils.exists = function(array,key,append) {
  var _array = {};
  var _key = (key !== undefined)?key:null;
  var _append = (append !== undefined && append === true)?append:false;
  var result = false;
  if (_key !== null) {
    for (var i = 0; i < array.length; i++) { _array[array[i]] = ''; }
    var result = (key in _array);
    if (_append === true && result === false) { array.push(key); }
  }
  return result;
};
Utils.alert = function(message,logLevel,immediate) {
	var _message = (message !== undefined)?message:null;
	var _logLevel = ((logLevel !== undefined) && (logLevel !== null))?logLevel:Utils.LOG_LEVEL_DEBUG;
	var _immediate = ((immediate !== undefined) && (immediate !== null))?immediate:true;
	if (message === null) {
		_message = "Sjamayee is COOL!";		
	}
	/*
	//>alert(message);
	//>console.log(message);
	*/
/*if (Utils.DEBUG_MODE) {
		if (_logLevel <= Utils.LOG_LEVEL) {
			if (_cf) {
				_cf.setStatusMessage(_message.substr(0,Utils.DISPLAY_MESSAGE_LENGTH),_immediate,_logLevel);
			}
		}
	}
	if (Utils.LOG_MODE) {
		if (_logLevel <= Utils.LOG_LEVEL) {
			//var _logger = new Logger();
			if (_logger) {
				_logger.append(_message.substr(0,Utils.LOG_MESSAGE_LENGTH));
			}
		}
	}*/
	alert(message);
};
Utils.beep = function(immediate) {
	try {
		var _immediate = ((immediate !== undefined) && (immediate !== null))?immediate:0;
		if (_immediate === 0) {
			Utils.BEEP = 1;
		} else {
			if (_immediate == 2) {
				if (Utils.BEEP != 1) { return; }
			}
			Utils.BEEP = 1;
			if (Utils.BEEP == 1) {
				if (navigator.javaEnabled()) {
					//java.awt.Toolkit.getDefaultToolkit().beep();
					//java.awt.Toolkit.beep();
					if (document.JavaBeep) {
						document.JavaBeep.beep();
					}
				} else {
					Utils.alert("Beep! (browser not javaEnabled...)");
				}
			}
			Utils.BEEP = null;
		}
	} catch(error) {
		Utils.alert("Utils/beep Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	}
};
Utils.sleep = function(milliSeconds) {
	try {
		var _milliSeconds = ((milliSeconds !== undefined) && (milliSeconds !== null))?milliSeconds:500;
		var sleeping = true;
		var now = new Date();
		var alarm;
		var startingMSeconds = now.getTime();
		Utils.alert("starting nap at timestamp: " + startingMSeconds + "\nWill sleep for: " + _milliSeconds + " ms");
		while (sleeping === true) {
			alarm = new Date();
			alarmMSeconds = alarm.getTime();
			if ((alarmMSeconds - startingMSeconds) > _milliSeconds) { sleeping = false; }
		}        
		Utils.alert("Wakeup!");
	} catch(error) {
		Utils.alert("Utils/sleep Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	}
};
Utils.arrayHash = function(array) {
  var result = {};
	try {
  	for (var i = 0; i < array.length; i++) {
    	result[array[i]] = '';
  	}
	} catch(error) {
		Utils.alert("Utils/arrayConverter Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	} finally {
  	return result;
	}
};
Utils.getBySequence = function(relations,sequence) {
	var _relations = (relations !== undefined)?relations:null;
	var _sequence = (sequence !== undefined)?sequence:null;
	var result = null;
	try {
		if (_relations) {
			if (_sequence !== null) {
				for (var i = 0; i < _relations.length; i++) {
					var relation = _relations[i];
					if (relation) {
						if (relation.getSequence() == _sequence) {
							result = relation;
							break;
						}
					}
				}
			}
		}
	} catch(error) {
		Utils.alert("Utils/getBySequence Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	} finally {
		return result;
	}
};
/*
var types = eval('(' + typesText + ')');
var properties = eval(uneval(entity));

var types = Utils.eval(typesText);
var properties = Utils.eval(entity,true);
*/
Utils.eval = function(object,uneval) {
	var _o1 = (object)?object:null;
	var _uneval = (uneval)?uneval:false;	
  var result = null;
	try {
		if (_o1) {
			if (_uneval === true) {
				//TODO: NOK !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
				result = eval('(' + _o1 + ')');
			//result = _o1.parseJSON(); 
			//result = eval(Utils.uneval(_o1));
			//result = JSON.parse('[' + _o1 + ']');

			//var _o2 = eval(_o1);
			//result = eval(Utils.uneval(_o2));
			} else {
				result = eval(_o1);
			}
		}
	} catch(error) {
		Utils.alert("Utils/eval Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	} finally {
  	return result;
	}
};
Utils.uneval = function(object) {
	var _o1 = (object)?object:null;
  var result = null;
	try {
		result = (_o1)?uneval(_o1):null;
	} catch(error) {
		Utils.alert("Utils/uneval Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	} finally {
  	return result;
	}
};
Utils.showDetailSalesforce = function() {
	//Utils.alert("SFDC: "+"type=account"); 
};
Utils.sortAscending = function(s1,s2) {
	return (s1 > s2);
};
Utils.sortInTwoPartsAscending = function(names,values) {
	//Sort names ascending in 2 parts based on values!
	//2 parts (1: NOT_EMPTY VALUES/NAME(ASC) - 2: EMPTY VALUES/NAME(ASC)
	var result = null;
	try {
		var i = 0;
		var j = 0;
		for (i = 0; i < names.length; i++) {
		  if (names[i]) {
				if (values) {
					for (j in values) {
						if (values[j]) {
							if (values[j].n == names[i]) {
								if (values[j].length > 0) {
									names[i] = '0'+names[i];
							  } else {
									names[i] = '1'+names[i];
								}
							  break;
							}
					  }
					}
				}
			}
		}
		names.sort();
		for (i = 0; i < names.length; i++) {
		  if (names[i]) {
				if ((names[i].substr(0,1) == '0') || (names[i].substr(0,1) == '1')) {
					names[i] = names[i].substr(1);
				}
			}
		}
		result = names;
	} catch(error) {
		Utils.alert("Utils/sortInTwoPartsAscending Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	} finally {
		return result;
	}
};
Utils.disableEnterKey = function(e) {
	var _e = (e !== undefined)?e:window.event;
	try {
		var keynum;
		if (window.event) {
			//IE
			keynum = _e.keyCode;
		} else if (_e.which) {
			//Netscape/Firefox/Opera
			keynum = _e.which;
		}
	} catch(error) {
		Utils.alert("Utils/disableEnterKey Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	} finally {
		//Stop event processing!
		return this.stopEventProcessing(_e);
	}
};
Utils.keydown = function(e) {
	var _e = (e !== undefined)?e:window.event;
	var keynum;
	try {
		if (window.event) {
			//IE
			keynum = _e.keyCode;
		} else if (_e.which) {
			//Netscape/Firefox/Opera
			keynum = _e.which;
		}
		if (keynum == SKeyboard.SPACE) { //ENTER) {
			_grid.filterEntities();
			_e.cancelBubble = true;
			if (_e.stopPropagation) { _e.stopPropagation(); }
		}
	} catch(error) {
		Utils.alert("Utils/keydown Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	} finally {
		return (keynum != SKeyboard.SPACE); //ENTER);
	}
};
Utils.writeFile = function(fileName,content) {
/*//Open the file for writing
  var file = fopen(fileName,3);
  //If the file has been successfully opened
  if (file != -1) {
    fwrite(file,content);
    fclose(file);
  }*/
/*var appending = 8;
  var stateFalse = 0;
  var fso = new ActiveXObject("Scripting.FileSystemObject");
  var newFile = fso.OpenTextFile(fileName,appending,true,stateFalse);*/
  document.write('<br/>'+fileName+'<br/>');
  document.write(content);
};
Utils.print = function() {
	var i = 0;
	var jso = null;
	var result = "";
	try {
		//Types
		//var typesText = new String(sforce.apex.execute('sja.TypeService','getTypes',{}));
		var typesText = sforce.apex.execute('sja.TypeService','getTypes',{});
		//var types = eval('(' + typesText + ')');
		//var types = JSON.parse('[' + typesText + ']');
		//var types = eval('(' + typesText + ')');
		var types = Utils.eval(typesText,true);
		i = 0;
		result += "Types\n";
		while (types.types[i]) {
			jso = types.types[i];
			result += "id: "+jso.id+" type: "+jso.type+" name: "+jso.name+" desc: "+jso.desc+" inUse: "+jso.inUse+" object: "+jso.objekt+"\n";
			i++;
		}
		//Data Entities
		//var entitiesText = new String(sforce.apex.execute('sja.EntityService','getEntities',{}));
		var entitiesText = sforce.apex.execute('sja.EntityService','getEntities',{});
		//var entities = eval('(' + entitiesText + ')');
	//var entities = JSON.parse('[' + entitiesText + ']');
		//var entities = eval('(' + entitiesText + ')');	
		var entities = Utils.eval(entitiesText,true);
		i = 0;
		result += "\nEntities\n";
		while (entities.entities[i]) {
			jso = entities.entities[i];
			result += "id: "+jso.id+" name: "+jso.name+" type: "+jso.type+" desc: "+jso.desc+" mei: "+jso.mei+" oid: "+jso.oid+"n";
			i++;
		}
		//Data Relations
		//var relationsText = new String(sforce.apex.execute('sja.RelationService','getRelations',{}));
		var relationsText = sforce.apex.execute('sja.RelationService','getRelations',{});
		//var relations = eval('(' + relationsText + ')');
	//var relations = JSON.parse('[' + relationsText + ']');
		//var relations = eval('(' + relationsText + ')');
		var relations = Utils.eval(relationsText,true);
		i = 0;
		result += "\nRelations\n";
		while (relations.relations[i]) {
			jso = relations.relations[i];
			result += "id: "+jso.id+" val: "+jso.val+" pei: "+jso.pei+" cei: "+jso.cei+" pid: "+jso.pid+" nid: "+jso.nid+"\n";
			i++;
		}
	} catch(error) {
		Utils.alert(error,Utils.LOG_LEVEL_ERROR);
	} finally {
		Utils.alert("Utils/print:\n"+result);
	}
};
Utils.test = function() {
/*Utils.alert("Test Static Utils!\nNow: " + Utils.now() +
	           "Trim(   Sjamayee   is   in   the  house  !     ): " +
	           Utils.trim("   Sjamayee   is   in   the  house  !     ") +
	           " BEEP!" + Utils.beep());*/
};

//TODO: from MOO !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//Class: SjamayeeBase
var SjamayeeBase = new Class({
	initialize: function() {
	//this.parent();
	/*var type = "";
		if (this  instanceof SjamayeeBase) {
			type = "SjamayeeBase";
		} else if (this  instanceof Grid) {
			type = "Grid";
		} else if (this  instanceof EntityCache) {
			type = "EntityCache";
		} else if (this  instanceof RelationCache) {
			type = "RelationCache";
		} else if (this  instanceof TypeCache) {
			type = "TypeCache";
		} else if (this  instanceof SettingCache) {
			type = "SettingCache";
		} else if (this  instanceof Position) {
			type = "Position";
		} else if (this  instanceof Keyboard) {
			type = "Keyboard";
		} else if (this  instanceof RelationsForm) {
			type = "RelationsForm";
		}*/
		try {
			var a = "Hi";
		  //SjamayeeBase.COUNT++;
			//this.setSid(SjamayeeBase.COUNT);
		} catch(error) {
			Utils.alert("SjamayeeBase/constructor Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		}
	},
	//Getters & Setters
	getSid: function() {
		return this.sid;
	},
	setSid: function(sid) {
		if (sid) {
			this.sid = sid;
			if (sid > SjamayeeBase.HIGHEST_SID) {
				SjamayeeBase.HIGHEST_SID = sid;
			}
		}
		return this;
	},
	//Functions
	//Abstract
	clone: function() {
		return undefined;
	},
	print: function(html,keysOnly) {
		var _html = ((html !== undefined) && (html !== null))?html:false;
		var _keysOnly = ((keysOnly !== undefined) && (keysOnly !== null))?keysOnly:false;
		var _nl = (_html)?'<br/>':'\n';
		var result = 'SjamayeeBase:'+_nl;
		try {
			var i = 0;
			for (var key in this) {
				if (key.toLowerCase() == 'uber') { continue; }
				i++;
				if (eval("typeof this."+key+" == 'function'")) {
					continue;
				}
				result += (i + ' ' + key);
				if (!_keysOnly) {
					result += (': ' + this[key]);
				}
				result += _nl;
			}
		} catch(error) {
			Utils.alert("SjamayeeBase/print Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	}
});
//Statics
SjamayeeBase.COUNT = 0;
SjamayeeBase.HIGHEST_SID = 0;
SjamayeeBase.initializeRestore = function() {
	SjamayeeBase.HIGHEST_SID = 0;
};
SjamayeeBase.finalizeRestore = function() {
	SjamayeeBase.COUNT = SjamayeeBase.HIGHEST_SID;
};
/* Example in ObjectsForm (commented out !!!
//SjamayeeBase.overload = function(name,constructors,method) {
overload: function(name,constructors,method) {
  //Get overloaded name based on arguments
  //Becomes something like _originalNameStringArray
  function _getName(args,name,instance) {
    var call = '_' + name, reg = /function ([^(]+)/;
    for (var obj,r,i=0; i<args.length; i++) {
      obj = instance? args[i].constructor : args[i];
      call += ((r = reg.exec(obj.toString()))?r[1]:'Object');
    }  
    return call;
  }
  //Create the wrapper
  if (!this.prototype[name].overloaded) {
    var base = this.prototype[name];
    prototype[name]: function() {
      var call = this[_getName(arguments, name, true)] || base;
      call.apply(this, arguments);
    }
    this.prototype[name].overloaded = true;
  }
  //Store prototype 
  this.prototype[_getName(constructors, name)] = method;
}; */
SjamayeeBase.test = function() {
	return "SjamayeeBase/test";
};

//Class: List
var List = new Class({
	Extends: SjamayeeBase,
	initialize: function() {
		try {
			this.parent();
			this.clear();
		} catch(error) {
			Utils.alert("List/constructor Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		}
	},
	//Getters&Setters
	getForm: function() {
		var result = null;
		if (this.form !== undefined) {
			result = this.form;
		}
	  return result;
	},
	setForm: function(form) {
		if (form) {
			this.form = form;
		}
		return this;
	},
	getMode: function() {
		var result = List.MODE_DISPLAY;
		if ((this.mode !== undefined) && (this.mode !== null)) {
			result = this.mode;
		}
	  return result;
	},
	setMode: function(mode) {
		if (mode) {
			this.mode = mode;
		}
		return this;
	},
	isDisplay: function() {
		return (this.getMode() == List.MODE_DISPLAY);
	},
	isEdit: function() {
		return (this.getMode() == List.MODE_EDIT);
	},
	isInsert: function() {
		return (this.getMode() == List.MODE_INSERT);
	},
	//Abstract
	getMaximumLines: function() {
		return 0; //undefined;
	},
	getIndexMinimum: function() {
		return 0;
	},
	getIndexMaximum: function() {
		return (this.getMaximumLines() - 1);
	},
	getIndexLast: function() {
		var result = this.getIndexMaximum();
		try {
			var emptyLine = false;
			while (result > this.getIndexMinimum()) {
				emptyLine = (ObjectList.isLineEmpty(result));
				if (emptyLine === false) { break; }
				result = result - 1;
			}
		} catch(error) {
			Utils.alert("List/getIndexLast Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	},
	getIndex: function() {
		var result = this.getIndexMinimum();
		if ((this.index !== undefined) && (this.index !== null)) {
			result = this.index;
		}
	  return result;
	},
	setIndex: function(index) {
		try {
			if (index !== null) {
				var _index = index;
				if (index < this.getIndexMinimum()) {
					_index = this.getIndexMinimum();
				} else if (index > this.getIndexLast()) {
					_index = this.getIndexLast();
				}
				this.index = _index;
			}
		} catch(error) {
			Utils.alert("List/setIndex Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return this;
		}
	},
	getListObjects: function() {
	//alert("List/getListObjects");
		var result = [];
		try {
			var cache = this.getCache();
			if (cache) {
				result = cache.getCache();
			}
		} catch(error) {
			Utils.alert("List/getListObjects Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {  
			return result;
		}
	},
	getCache: function() {
		var result = null;
		if (this.cache !== undefined) {
			result = this.cache;
		}
		return result;
	},
	setCache: function(cache) {
		if (cache) {
			this.cache = cache;
		}
		return this;
	},
	getSize: function() {
		var result = 0;
		try {
			var cache = this.getCache();
			if (cache) {
				result = cache.getSize();
			}
		} catch(error) {
			Utils.alert("List/getSize Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {  
			return result;
		}
	},
	getMaximumSize: function() {
		var result = 0;
		try {
			var cache = this.getCache();
			if (cache) {
				result = cache.getMaximumSize();
			}
		} catch(error) {
			Utils.alert("List/getMaximumSize Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {  
			return result;
		}
	},
	getEndOfData: function() {
		var result = false;
		try {
			var cache = this.getCache();
			if (cache) {
				result = cache.getEndOfData();
			}
		} catch(error) {
			Utils.alert("List/getEndOfData Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {  
			return result;
		}
	},
	getTopOfList: function() {
		var result = false;
		var cache = this.getCache();
		try {
			//result = this.getEndOfData();
			if (cache) {
				result = (((this.getTopOid() !== null) && (cache.getTopOid() !== null)) &&
									 (this.getTopOid() == cache.getTopOid()));
			}  
		} catch(error) {
			Utils.alert("List/getTopOfList Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
		/*if (result === true) {
				Utils.alert("List/getTopOfList - result: "+result+
							"\nthis.topOid: "+this.getTopOid()+
							"\ncache.topOid: "+cache.getTopOid());
			}*/
			return result;
		}
	},
	getBottomOfList: function() {
		var result = false;
		var cache = this.getCache();
		try {
			//result = this.getEndOfData();
			if (cache) {
				result = (((this.getBottomOid() !== null) && (cache.getBottomOid() !== null)) &&
									 (this.getBottomOid() == cache.getBottomOid()));
			}
		} catch(error) {
			Utils.alert("List/getBottomOfList Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {  
		/*if (result === true) {
				Utils.alert("List/getBottomOfList - result: "+result+
							"\nthis.bottomOid: "+this.getBottomOid()+
							"\ncache.bottomOid: "+cache.getBottomOid());
			}*/
			return result;
		}
	},
	getPreviousMethod: function() {
		var result = List.METHOD_FIRST;
		if ((this.previousMethod !== undefined) && (this.previousMethod !== null)) {
			result = this.previousMethod;
		}
		return result;
	},
	setPreviousMethod: function(previousMethod) {
		if (previousMethod !== null) {
			this.previousMethod = previousMethod;
		}
		return this;
	},
	getTopOid: function() {
		var result = null;
		if (this.topOid !== undefined) {
			result = this.topOid;
		}
		return result;
	},
	setTopOid: function(topOid) {
		if (topOid !== null) {
			this.topOid = topOid;
		}
		return this;
	},
	getBottomOid: function() {
		var result = null;
		if (this.bottomOid !== undefined) {
			result = this.bottomOid;
		}
		return result;
	},
	setBottomOid: function(bottomOid) {
		if (bottomOid !== null) {
			this.bottomOid = bottomOid;
		}
		return this;
	},
	getDirectionChanged: function() {
		var result = true;
		if ((this.directionChanged !== undefined) && (this.directionChanged !== null)) {
			result = this.directionChanged;
		}
	  return result;
	},
	setDirectionChanged: function(directionChanged) {
		if (directionChanged !== null) {
			this.directionChanged = directionChanged;
		}
		return this;
	},
	isDirectionChanged: function() {
		return this.getDirectionChanged();
	},
	getCurrentOid: function() {
		var result = null;
		if (this.currentOid !== undefined) {
			result = this.currentOid;
		}
		return result;
	},
	setCurrentOid: function(currentOid) {
		if (currentOid !== null) {
			this.currentOid = currentOid;
		}
		return this;
	},
	//Functions
	clear: function() {
		try {
			//Mode: DISPLAY
			if (this.getCache() !== null) {
				this.getCache().clear();
			}
			this.setMode(List.MODE_DISPLAY);
			this.setIndex(this.getIndexMinimum());
			this.setCurrentOid(null);
			this.setTopOid(null);
			this.setBottomOid(null);
			this.setPreviousMethod(null);
			this.setDirectionChanged(false);
		} catch(error) {
			Utils.alert("List/clear Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return this;
		}
	},
	getById: function(id) {
		var result = null;
		try {
			var cache = this.getCache();
			if (cache) {
				result = cache.getById(id);
			}
		} catch(error) {
			Utils.alert("List/getById Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	},
	//Abstract
	showPage: function(method,oid) {
		return undefined;
	},
	firstPage: function() {
		var result = false;
		var form = this.getForm();
		try {
			if (form) {
				form.setStatusMessage(List.STATUS_MESSAGE_FIRST_PAGE_LBL,true);
			}
			this.changeDirection(List.METHOD_FIRST);
			if (this.getTopOfList() !== true) {
				this.clear();
				this.getCache().firstPage();
			}
			if (this.getTopOfList() === true) {
				this.setIndex(this.getIndexMinimum());
				this.setCurrentOid(this.getTopOid());
			}
			this.showPage(List.METHOD_FIRST,null);
		} catch(error) {
			Utils.alert("List/firstPage Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			if (this.getBottomOfList() === true) {
				if (form) {
					form.setStatusMessage(List.STATUS_MESSAGE_END_LBL,true);
					Utils.beep(0);
				}
			} else {
				result = true;
			}
			return result;
		}
	},
	previousPage: function() {
		var result = false;
		var form = this.getForm();
		try {
			if (form) {
				form.setStatusMessage(List.STATUS_MESSAGE_PREVIOUS_PAGE_LBL,true);
			}
			this.changeDirection(List.METHOD_PREVIOUS);
			if (this.getTopOfList() !== true) {
				if (!this.showPage(List.METHOD_PREVIOUS,this.getTopOid())) {
					this.getCache().previousPage();
					this.showPage(List.METHOD_PREVIOUS,this.getTopOid());
				}
			}
			if (this.getTopOfList() === true) {		
				this.setIndex(this.getIndexMinimum());
				this.setCurrentOid(this.getTopOid());
			}
		//this.showPage(List.METHOD_PREVIOUS,this.getTopOid());		
		} catch(error) {
			Utils.alert("List/previousPage Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			if (this.getTopOfList() === true) {
				if (form) {
					form.setStatusMessage(List.STATUS_MESSAGE_BEGIN_LBL,true);
					Utils.beep(0);
				}
			} else {
				result = true;
			}
			return result;
		}
	},
	nextPage: function() {
		var result = false;
		var form = this.getForm();
		try {
			if (form) {
				form.setStatusMessage(List.STATUS_MESSAGE_NEXT_PAGE_LBL,true);
			}
			this.changeDirection(List.METHOD_NEXT);
			if (this.getBottomOfList() !== true) {
				if (!this.showPage(List.METHOD_NEXT,this.getBottomOid())) {
					this.getCache().nextPage();
					this.showPage(List.METHOD_NEXT,this.getBottomOid());
				}
			}
			if (this.getBottomOfList() === true) {		
				this.setIndex(this.getIndexLast());
				this.setCurrentOid(this.getBottomOid());
			}
		//this.showPage(List.METHOD_NEXT,this.getBottomOid());
		} catch(error) {
			Utils.alert("List/nextPage Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally { 
			if (this.getBottomOfList() === true) {
				if (form) {
					form.setStatusMessage(List.STATUS_MESSAGE_END_LBL,true);
					Utils.beep(0);
				}
			} else {
				result = true;
			}
			return result;
		}
	},
	lastPage: function() {
		var result = false;
		var form = this.getForm();
		try {
			if (form) {
				form.setStatusMessage(List.STATUS_MESSAGE_LAST_PAGE_LBL,true);
			}
			this.changeDirection(List.METHOD_LAST);
			if (this.getBottomOfList() !== true) {
				this.clear();
				this.getCache().lastPage();
			}
			if (this.getBottomOfList() === true) {
				this.setIndex(this.getIndexLast());
				this.setCurrentOid(this.getBottomOid());
			}
			this.showPage(List.METHOD_LAST,null);
		} catch(error) {
			Utils.alert("List/lastPage Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			if (this.getTopOfList() === true) {
				if (form) {
					form.setStatusMessage(List.STATUS_MESSAGE_BEGIN_LBL,true);
					Utils.beep(0);
				}
			} else {
				result = true;
			}
			return result;
		}
	},
	down: function() {
		var result = false;
		var form = this.getForm();
		try {
			if (this.getIndex() < this.getIndexLast()) {
				this.setIndex(this.getIndex() + 1);
			} else {
				if (form) {
					form.setStatusMessage(List.STATUS_MESSAGE_DOWN_LBL,true);
				}
				this.changeDirection(List.METHOD_DOWN);
				if (this.getBottomOfList() !== true) {
					if (!this.showPage(List.METHOD_DOWN,this.getBottomOid())) {
						this.getCache().nextPage();
						this.showPage(List.METHOD_DOWN,this.getBottomOid());
					}
				}
			}
		} catch(error) {
			Utils.alert("List/down Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			if (this.getBottomOfList() === true) {
				if (form) {
					form.setStatusMessage(List.STATUS_MESSAGE_END_LBL,true);
					Utils.beep(0);
				}
			}
			return result;
		}
	},
	up: function() {
		var result = false;
		var form = this.getForm();
		try {
			if (this.getIndex() > this.getIndexMinimum()) {
				this.setIndex(this.getIndex() - 1);
			} else {
				if (form) {
					form.setStatusMessage(List.STATUS_MESSAGE_UP_LBL,true);
				}
				this.changeDirection(List.METHOD_UP);
				if (this.getTopOfList() !== true) {
					if (!this.showPage(List.METHOD_UP,this.getTopOid())) {
						this.getCache().previousPage();
						this.showPage(List.METHOD_UP,this.getTopOid());
					}
				}
			}
		} catch(error) {
			Utils.alert("List/up Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			if (this.getTopOfList() === true) {
				if (form) {
					form.setStatusMessage(List.STATUS_MESSAGE_BEGIN_LBL,true);
					Utils.beep(0);
				}
			}
			return result;
		}
	},
	changeDirection: function(method) {
		try {
			var previousMethod = this.getPreviousMethod();
			if (previousMethod === null) {
				previousMethod = method;
				this.setPreviousMethod(previousMethod);
			}
			var cache = this.getCache();
			if (cache) {
				var endOfData = cache.getEndOfData();
				switch (method) {
					case List.METHOD_FIRST:
						this.direction = List.DIRECTION_DOWN;
						if ((previousMethod == List.METHOD_UP) ||
								(previousMethod == List.METHOD_NEXT) ||
								(previousMethod == List.METHOD_PREVIOUS) ||
								(previousMethod == List.METHOD_LAST)) {
							this.setDirectionChanged(true);
							endOfData = false;
						}
						break;
					case List.METHOD_NEXT:
						this.direction = List.DIRECTION_DOWN;
						if ((previousMethod == List.METHOD_LAST) ||
								(previousMethod == List.METHOD_PREVIOUS) ||
								(previousMethod == List.METHOD_UP)) {
							this.setDirectionChanged(true);
							endOfData = false;
						}
						break;
					case List.METHOD_DOWN:
					this.direction = List.DIRECTION_DOWN;
					if ((previousMethod == List.METHOD_LAST) ||
							(previousMethod == List.METHOD_PREVIOUS) ||
							(previousMethod == List.METHOD_UP)) {
						this.setDirectionChanged(true);
						endOfData = false;
					}
					break;
				case List.METHOD_PREVIOUS:
					this.direction = List.DIRECTION_UP;
					if ((previousMethod == List.METHOD_DOWN) ||
							(previousMethod == List.METHOD_NEXT) ||
							(previousMethod == List.METHOD_FIRST)) {
						this.setDirectionChanged(true);
						endOfData = false;
					}
					break;
				case List.METHOD_UP:
					this.direction = List.DIRECTION_UP;
					if ((previousMethod == List.METHOD_DOWN) ||
							(previousMethod == List.METHOD_NEXT) ||
							(previousMethod == List.METHOD_FIRST)) {
						this.setDirectionChanged(true);
						endOfData = false;
					}
					break;
				case List.METHOD_LAST:
					this.direction = List.DIRECTION_UP;
					if ((previousMethod == List.METHOD_FIRST) ||
							(previousMethod == List.METHOD_NEXT) ||
							(previousMethod == List.METHOD_PREVIOUS) ||
							(previousMethod == List.METHOD_DOWN) ||
							(previousMethod == List.METHOD_UP)) {
						this.setDirectionChanged(true);
						endOfData = false;
						}
						break;
					default:
						break;
				}
				cache.setEndOfData(endOfData);
			}
		} catch(error) {
			Utils.alert("List/changeDirection Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return this;
		}
	},
	//Abstract
	getPaneLeft: function() {
		return undefined;
	},
	//Abstract
	getPaneRight: function() {
		return undefined;
	},
	//Abstract
	fill: function() {
		return undefined;
	},
	print: function() {
		var result = null;
		try {
			result = "List:\n";
			var listObjects = this.getListObjects();
			if (listObjects) {
				for (var i in listObjects) {
					if (listObjects[i]) {
						result += listObjects[i].print();
					}
				}
			}
		} catch(error) {
			Utils.alert("List/print Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	}
});
//Statics
List.MODE_DISPLAY = "DISPLAY";
List.MODE_EDIT = "EDIT";
List.MODE_INSERT = "INSERT";

List.METHOD_FIRST = "FIRST";
List.METHOD_NEXT = "NEXT";
List.METHOD_DOWN = "DOWN";
List.METHOD_UP = "UP";
List.METHOD_PREVIOUS = "PREVIOUS";
List.METHOD_LAST = "LAST";
List.METHOD_REFRESH = "REFRESH";

List.STATUS_MESSAGE_FIRST_PAGE_LBL = "First page...";
List.STATUS_MESSAGE_NEXT_PAGE_LBL = "Next page...";
List.STATUS_MESSAGE_DOWN_LBL = "Line down...";
List.STATUS_MESSAGE_UP_LBL = "Line up...";
List.STATUS_MESSAGE_PREVIOUS_PAGE_LBL = "Previous page...";
List.STATUS_MESSAGE_LAST_PAGE_LBL = "Last page...";
List.STATUS_MESSAGE_BEGIN_LBL = "Begin of list.";
List.STATUS_MESSAGE_END_LBL = "End of list.";

List.DIRECTION_UP = "UP";
List.DIRECTION_DOWN = "DOWN";

//List                                                           //TODO: VERIFYYYYYYYYYYYYY (method showPage) !!!!!!!
//TODO: EXTEND WITH OTHER CLASSES (listCell,listColumn,...)
//List.CELL_CONTENT_CLASS_ID = "listCellContent";
//List.OBJECT_NAME_TEXTAREA_CLASS_ID = "objectNameTextArea";     // VERIFY !!!
//List.OBJECT_DESC_TEXTAREA_CLASS_ID = "objectDescTextArea";     // VERIFY !!!
/*
List.LINES_MAX = function() {
return ListCache.PAGE_SIZE;
};
*/

//Class: Logger
var Logger = new Class({
	Extends: List,
	initialize: function() {
		try {
			this.parent();
			this.setCache([]);		
		} catch(error) {
			//*** RECURSIVE !!! *** Utils.alert("Logger/constructor Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		}
	},
	//Getters & Setters
	getSize: function() {
	  return this.getCache().length;
	},
	//Functions
	clear: function() {
		try {
			this.parent();
		} catch(error) {
			//***Utils.alert("Logger/clear Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return this;
		}
	},
	append: function(message) {
		try {
			var cache = this.getCache();
			if (cache) {
				cache.push(message);
				if (this.getSize() > Logger.MAX_SIZE) {
					cache.shift();
				}
			}
		} catch(error) {
			//***Utils.alert("Logger/append Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return this;
		}
	},
	getHtml: function() {
		var result = "";
		try {
			var cache = this.getCache();
			if (cache) {
				result += "size: "+cache.length+"<br/><br/>";
				//document.writeln("<h1>size: "+cache.length+"</h1><br/><br/>");
				var i = 1;
				cache.forEach(function(message) {
					result += ""+i+": "+message+"<br/>";
					//document.writeln("<h1>"+i+": "+message+"</h1><br/>");
					i++;
				});
			}
		} catch(error) {
			//***Utils.alert("Logger/print Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
			//return this;
		}
	},
	print: function() {
		var result = "";
		try {
			var cache = this.getCache();
			if (cache) {
				result += "Logger\n";
				result += "size: "+cache.length+"\n\n";
				var i = 1;
				cache.forEach(function(message) {
					result += i+": "+message+"\n";
					i++;
				});
			}
		} catch(error) {
			//*** RECURSIVE !!! *** Utils.alert("Logger/print Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	}	
});
//Statics
Logger.MAX_SIZE = 2000;
Logger.PAGE_SIZE = 10;

//Class: SKeyboard
var SKeyboard = new Class({
	Extends: SjamayeeBase,
	initialize: function() {
		try {
			this.parent();
			//Utils.alert("SKeyboard/constructor");
/*		
			if (document) {
				var listPaneLeft = document.getElementById(SjamayeeForm.LIST_PANE_LEFT_ID);
				var listPaneRight = document.getElementById(SjamayeeForm.LIST_PANE_RIGHT_ID);
				if (listPaneLeft && listPaneRight) {
					var mousewheelevt = (/Firefox/i.test(navigator.userAgent))?"DOMMouseScroll":"mousewheel"; //FF doesn't recognize mousewheel as of FF3.x
					if (document.attachEvent) { //if IE (and Opera depending on user setting)
					//listPaneLeft.attachEvent("on"+mousewheelevt, this.displaywheel);
					//listPaneRight.attachEvent("on"+mousewheelevt, this.displaywheel);
					  listPaneLeft.attachEvent("on"+mousewheelevt, this.mouseWheelEvent); //_kb.keydown);
					  listPaneRight.attachEvent("on"+mousewheelevt, this.mouseWheelEvent); //_kb.keydown);
					} else if (document.addEventListener) { //WC3 browsers
				  //listPaneLeft.addEventListener(mousewheelevt, this.displaywheel, false);
				  //listPaneRight.addEventListener(mousewheelevt, this.displaywheel, false);
			  	  listPaneLeft.addEventListener(mousewheelevt, this.mouseWheelEvent, false); //_kb.keydown, false);
			  	  listPaneRight.addEventListener(mousewheelevt, this.mouseWheelEvent, false); //_kb.keydown, false);
					}
				} 
			}
*/
		} catch(error) {
			Utils.alert("SKeyboard/constructor Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		}
	},
	//Getters & Setters
	setRow: function(row) {
		if (row !== null) {
			this.row = row;
		}
		return this;
	},
	getRow: function() {
		var result = Position.ROW_TOP();
		if ((this.row !== undefined) && (this.row !== null)) {
			result = this.row;
		}
		return result;
	},
	setKeyCode: function(keyCode) {
		if (keyCode !== null) {
			this.keyCode = keyCode;
		}
		return this;
	},
	getKeyCode: function() {
		var result = SKeyboard.NO_KEY;
		if ((this.keyCode !== undefined) && (this.keyCode !== null)) {
			result = this.keyCode;
		}
		return result;
	},
	setDelta: function(delta) {
		if (delta !== null) {
			this.delta = delta;
		}
		return this;
	},
	getDelta: function() {
		var result = null;
		if (this.delta !== undefined) {
			result = this.delta;
		}
		return result;
	},
	setKeyCodes: function(keyCodes) {
		if (keyCodes !== null) {
			this.keyCodes = keyCodes;
		}
		return this;
	},
	getKeyCodes: function() {
		var result = "";
		if ((this.keyCodes !== undefined) && (this.keyCodes !== null)) {
			result = this.keyCodes;
		}
		return result;
	},
	setShiftLock: function(shiftLock) {
		if (shiftLock !== null) {
			this.shiftLock = shiftLock;
		}
		return this;
	},
	getShiftLock: function() {
		var result = false;
		if ((this.shiftLock !== undefined) && (this.shiftLock !== null)) {
			result = this.shiftLock;
		}
		return result;
	},
	setShift: function(shift) {
		if (shift !== null) {
			this.shift = shift;
		}
		return this;
	},
	getShift: function() {
		var result = false;
		if ((this.shift !== undefined) && (this.shift !== null)) {
			result = this.shift;
		}
		return result;
	},
	toggleShift: function() {
		//this.setShift((this.getShift() === true)?false:true);
		return this;
	},
	setCtrl: function(ctrl) {
		if (ctrl !== null) {
			this.ctrl = ctrl;
		}
		return this;
	},
	getCtrl: function() {
		var result = false;
		if ((this.ctrl !== undefined) && (this.ctrl !== null)) {
			result = this.ctrl;
		}
		return result;
	},
	setAlt: function(alt) {
		if (alt !== null) {
			this.alt = alt;
		}
		return this;
	},
	getAlt: function() {
		var result = false;
		if ((this.alt !== undefined) && (this.alt !== null)) {
			result = this.alt;
		}
		return result;
	},
	setCmd: function(cmd) {
		if (cmd !== null) {
			this.cmd = cmd;
		}
		return this;
	},
	getCmd: function() {
		var result = false;
		if ((this.cmd !== undefined) && (this.cmd !== null)) {
			result = this.cmd;
		}
		return result;
	},
	setNumLock: function(numLock) {
		if (numLock !== null) {
			this.numLock = numLock;
		}
		return this;
	},
	getNumLock: function() {
		var result = false;
		if ((this.numLock !== undefined) && (this.numLock !== null)) {
			result = this.numLock;
		}
		return result;
	},
	toggleNumLock: function() {
		this.setNumLock((this.getNumLock() === true)?false:true);
		return this;
	},
	setScrollLock: function(scrollLock) {
		if (scrollLock !== null) {
			this.scrollLock = scrollLock;
		}
		return this;
	},
	getScrollLock: function() {
		var result = false;
		if ((this.scrollLock !== undefined) && (this.scrollLock !== null)) {
			result = this.scrollLock;
		}
		return result;
	},
	toggleScrollLock: function() {
		this.setScrollLock((this.getScrollLock() === true)?false:true);
		return this;
	},
	setCapsLock: function(capsLock) {
		if (capsLock !== null) {
			this.capsLock = capsLock;
		}
		return this;
	},
	getCapsLock: function() {
		var result = false;
		if ((this.capsLock !== undefined) && (this.capsLock !== null)) {
			result = this.capsLock;
		}
		return result;
	},
	toggleCapsLock: function() {
		this.setCapsLock((this.getCapsLock() === true)?false:true);
		return this;
	},
	//                                                           SELECT-KEY ????????
	setSelect: function(select) {
		if (select !== null) {
			this.select = select;
		}
		return this;
	},
	getSelect: function() {
		var result = false;
		if ((this.select !== undefined) && (this.select !== null)) {
			result = this.select;
		}
		return result;
	},
	//Caps = CapsLock & Shift
	getCaps: function() {
		var result = false;
		try {
			result = this.getCapsLock();
			if (this.getShift() === true) {
				result = (result === true)?false:true;
			}
		} catch(error) {
			Utils.alert("SKeyboard/getCaps Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	},
	isMouseScrolledUp: function() {
		var result = false;
		if ((this.getDelta() !== undefined) && (this.getDelta() !== null)) {
			if (this.getDelta() > 0) {
				result = true;
			}
		}
		return result;
	},
	isMouseScrolledDown: function() {
		var result = false;
		if ((this.getDelta() !== undefined) && (this.getDelta() !== null)) {
			if (this.getDelta() < 0) {
				result = true;
			}
		}
		return result;
	},
	//Virtual keys
	isVkLeft: function() {
		var result = false;
		if (this.getKeyCode() == SKeyboard.LEFT) {
			result = true;
		} else {
			if (this.getAlt() === true) {
				if (this.isMouseScrolledUp() === true) {
					result = true;
				}
			}
		}
		return result;
	},
	isVkRight: function() {
		var result = false;
		if (this.getKeyCode() == SKeyboard.RIGHT) {
			result = true;
		} else {
			if (this.getAlt() === true) {
				if (this.isMouseScrolledDown() === true) {
					result = true;
				}
			}
		}
		return result;
	},
	isVkUp: function() {
		var result = false;
		if (this.getKeyCode() == SKeyboard.UP) {
			result = true;
		} else {
			if (this.isMouseScrolledUp() === true) {
				result = true;
			}
		}
		return result;
	},
	isVkDown: function() {
		var result = false;
		if (this.getKeyCode() == SKeyboard.DOWN) {
			result = true;
		} else {
			if (this.isMouseScrolledDown() === true) {
				result = true;
			}
		}
		return result;
	},
	isVkPageUp: function() {
		var result = false;
		if (this.getShift() === true) {
			if (this.getKeyCode() == SKeyboard.UP) {
				result = true;
			} else if (this.isMouseScrolledUp() === true) {
				result = true;
			}
		}
		return result;
	},
	isVkPageDown: function() {
		var result = false;
		if (this.getShift() === true) {
			if (this.getKeyCode() == SKeyboard.DOWN) {
				result = true;
			} else if (this.isMouseScrolledDown() === true) {
				result = true;
			}
		}
		return result;
	},
	isVkPageTop: function() {
		var result = false;
		if (this.getCmd() === true) {
			if (this.getKeyCode() == SKeyboard.UP) {
				result = true;
			} else if (this.isMouseScrolledUp() === true) {
				result = true;
			}
		}
		return result;
	},
	isVkPageBottom: function() {
		var result = false;
		if (this.getCmd() === true) {
			if (this.getKeyCode() == SKeyboard.DOWN) {
				result = true;
			} else if (this.isMouseScrolledDown() === true) {
				result = true;
			}
		}
		return result;
	},
	isVkHome: function() {
		var result = false;
		if (this.getCmd() === true) {
			if (this.getKeyCode() == SKeyboard.LEFT) {
				result = true;
			} else if (this.isMouseScrolledUp() === true) {
				result = true;
			}
		}
		return result;
	},
	isVkEnd: function() {
		var result = false;
		if (this.getCmd() === true) {
			if (this.getKeyCode() == SKeyboard.RIGHT) {
				result = true;
			} else if (this.isMouseScrolledDown() === true) {
				result = true;
			}
		}
		return result;
	},
	getPosition: function() {
		var result = null;
		try {
			result =  _grid.getPosition();
		} catch(error) {
			Utils.alert("SKeyboard/getPosition Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	},
	getNivo: function() {
		//return this.getGrid().getNivo();
		return _grid.getNivo();
	},
	//Functions
	getGridView: function() {
		var result = null;
		try {
			result = _grid.getGridView();
		} catch(error) {
			Utils.alert("SKeyboard/getGridView Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	},
	stopEventProcessing: function(e) {
		var _e = (e !== undefined)?e:window.event;
		try {
			_e.cancelBubble = true;
			if (_e.stopPropagation !== null) {
				_e.stopPropagation();
				_e.preventDefault();
			}
		} catch(error) {
			Utils.alert("SKeyboard/stoprEventProcessing Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return false;
		}
	},
	mouseWheelEvent: function(e) {
		var _e = window.event || e;	
		//alert("SKeyboard/mouseWheelEvent - e: "+_e);
		var result = false;
		try {
			if (_cf) {
				//Set that an event is happened!
				_cf.setEventHappened(true);
				//Set mousewheel event.
			  var delta = _e.detail?-_e.detail/3:((window.opera)?-_e.wheelDelta/120:_e.wheelDelta/120);
				if ((delta !== null) && (delta !== 0)) {
					this.setDelta(delta);					
					if (this.isVkPageUp() === true) {
						if (Utils.group() === true) {
							if (this.getKeyCode() == SKeyboard.CHAR_C) { //Copy group.
								_cf.copyRelation();
								this.setKeyCodes(SKeyboard.UP_TEXT);
								result = list.up();
								this.stopEventProcessing(_e);
							} else if (position.getRow() == Position.ROW_TOP()) {
								this.setKeyCodes("PUP");        					//Utils.alert("PUP...");
								result = list.firstPage();     						//TODO:  CHECK gridview/objectsList/...
								this.stopEventProcessing(_e);
							}
						} else {
							this.setKeyCodes(SKeyboard.PAGE_UP_TEXT);  	//Utils.alert("PUP...");
							result = list.previousPage();
					    this.stopEventProcessing(_e);
						}
						return result;
					}			
					if (this.isVkPageDown() === true) {
						if (Utils.group() === true) {
							if (this.getKeyCode() == SKeyboard.CHAR_C) { //Copy group.
								_cf.copyRelation();
								this.setKeyCodes(SKeyboard.DOWN_TEXT);
								result = list.down();
								this.stopEventProcessing(_e);
							}
						} else {					
							this.setKeyCodes(SKeyboard.PAGE_DOWN_TEXT);  //Utils.alert("PDN...");
							result = list.nextPage();
					    this.stopEventProcessing(_e);
						}
						return result;
					}
					if (this.isVkHome() === true) {
						result = _grid.home();
				    this.stopEventProcessing(_e);
						return result;
					}
					if (this.isVkPageTop() === true) {
						this.setKeyCodes(SKeyboard.HOME_TEXT); 				//Utils.alert("HOME...");
					  result = list.firstPage();
				    this.stopEventProcessing(_e);
						return result;
					}
					if (this.isVkPageBottom() === true) {
						this.setKeyCodes(SKeyboard.END_TEXT); 					//Utils.alert("END...");
						result = list.lastPage();
				    this.stopEventProcessing(_e);
						return result;
					}
					if (this.isVkEnd() === true) {
						result = _grid.end();
				    this.stopEventProcessing(_e);
						return result;
					}				
					if (this.isVkLeft() === true) {
						if (_cf instanceof RelationsForm) {
							_cf.setFocusOnList();
							this.setKeyCodes(SKeyboard.LEFT_TEXT); 			//Utils.alert("LEFT...");
							result = mainList.left();
						} else {
							Utils.beep(0);
						}
				  //this.stopEventProcessing(_e);
				  	_cf.fillForm();
						return result;
					}
					if (this.isVkUp() === true) {
						this.setKeyCodes(SKeyboard.UP_TEXT);       		//Utils.alert("UP...");
						result = list.up();
				    this.stopEventProcessing(_e);
						return result;
					}			
					if (this.isVkDown() === true) {
						this.setKeyCodes(SKeyboard.DOWN_TEXT);    		  //Utils.alert("DOWN...");
						result = list.down();
				    this.stopEventProcessing(_e);
						return result;
					}
					if (this.isVkRight() === true) {
						if (_cf instanceof RelationsForm) {
							_cf.setFocusOnList();
							this.setKeyCodes(SKeyboard.RIGHT_TEXT); 	 	  //Utils.alert("RIGHT...");
							result = mainList.right();
						} else {
							Utils.beep(0);
						}
				  //this.stopEventProcessing(_e);
		      	_cf.fillForm();
						return result;
					}
				}
			}
		} catch(error) {
			Utils.alert("SKeyboard/mouseWheelEvent - Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			if (result === true) {
				if (_cf) {
					//REFRESH!
					_cf.setRefreshNow();
					_cf.refresh();
					if (_cf instanceof RelationsForm) {
						//Set Focus !!!
						_grid.getGridView().setFocusOnPosition();        //TODO: _cf.setFocusOnPosition() !!!
						//Set NEW focus!
						if (this.getKeyCodes() == SKeyboard.ESC_TEXT) {
							if (position) {  // !!! !== NULL !!!
								position.display();
							}
						}
					}
				}
			}		
			return result;
		}
	},
	keypressed: function(e) {
		var _e = window.event || e;	
		//var _e = (e !== undefined)?e:window.event;	
	  //alert("SKeyboard/keypressed - e: "+_e);
		var position = null;
		var result = false;
	//var stopEvent = false;
		try {
			if (_cf) {
				//Set that an event is happened!
				_cf.setEventHappened(true);
			/*var keyCode = -1;
			  if ((_e.which === undefined) || (_e.which === null)) {
			    keyCode = _e.keyCode; //String.fromCharCode(_e.keyCode);   // IE
			  } else if (_e.which !== 0) { // && _e.charCode !== 0) {
			    keyCode = _e.which;   //String.fromCharCode(_e.which);		 // All others
			  }
				this.setKeyCode(keyCode); */
				var keyCode = -1;
				if (_e == window.event) {
					keyCode = _e.keyCode; //IE
				} else if (_e.which) {
					keyCode = _e.which;   //Netscape/Firefox/Opera
				}
				this.setKeyCode(keyCode);
				//Set mousewheel event.
			  var delta = _e.detail?-_e.detail/3:((window.opera)?-_e.wheelDelta/120:_e.wheelDelta/120);
				this.setDelta(delta);

				///////////////
				// Position ???
				///////////////
				position = this.getPosition();
				if (position === null) { Utils.alert("SKeyboard/keypressed - !position"); return result; }

				/////////////////////////////////////////////////////////////
				// DETERMINE - Current List/Cell/Relation/Entity     BEGIN //
				/////////////////////////////////////////////////////////////
				var list = _cf.getList();
				var mainList = list;
				var listCell = null;
				var relation = null;
				var entity = null;
				var entityState = null;
				if (_cf.isFocusOnParentProperties() === true) {
					entityState = Entity.STATE_PARENT;
					listCell = _cf.getParentCell();
					relation = listCell.getRelation();
					if (relation) {
						entity = relation.getChildEntity();
					}
				} else if (_cf.isFocusOnChildProperties() === true) {
					entityState = Entity.STATE_CHILD;
					listCell = _cf.getChildCell();
					relation = listCell.getRelation();
					if (relation) {
						entity = relation.getChildEntity();
					}
				} else if (_cf.isFocusOnObjectProperties() === true) {
					entityState = Entity.STATE_OBJECT;
					listCell = _cf.getListObject();
					if (listCell) {
						entity = listCell.getObject();
					}
				}
				if (entity) {
					list = entity.getAttributeList();
					list.setState(entityState);
				}	
				/*if (list) {
					result = true;
				}*/
				/////////////////////////////////////////////////////////////
				// DETERMINE - Current List/Cell/Relation/Entity       END //
				/////////////////////////////////////////////////////////////

				/*
				NavigationCommand.NAV_ENTER = 1;
				NavigationCommand.NAV_SPACE = 2;
				NavigationCommand.NAV_CLICK = 3;
				NavigationCommand.NAV_UP = 4;
				NavigationCommand.NAV_DOWN = 5;
				NavigationCommand.NAV_LEFT = 6;
				NavigationCommand.NAV_RIGHT = 7;
				NavigationCommand.NAV_TOP = 8;
				NavigationCommand.NAV_BOTTOM = 9;
				NavigationCommand.NAV_HOME = 10;
				NavigationCommand.NAV_END = 11;
				RelationsForm.method('writeNavigationCommand = function(list,navigation) {
				*/

				if (this.getKeyCode() == SKeyboard.ESC) 		{ _cf.cancelEditing(); this.stopEventProcessing(_e); }				

	/////////		

	if (this.getCmd() === true) {
		if (this.getShift() === true) {
			if (this.getKeyCode() == SKeyboard.CHAR_Z) { _cf.redo(); this.stopEventProcessing(_e); }
		} else {
			if (this.getKeyCode() == SKeyboard.CHAR_Z) { _cf.undo(); this.stopEventProcessing(_e); }
		}
		if ((this.getKeyCode() == SKeyboard.INSERT) ||
				(this.getKeyCode() == SKeyboard.CHAR_A) ||
				(this.getKeyCode() == SKeyboard.CHAR_N)) {
			_cf.addRelation();
			this.stopEventProcessing(_e);
		}				
		if ((this.getKeyCode() == SKeyboard.DELETE) ||
				(this.getKeyCode() == SKeyboard.CHAR_D) ||
				(this.getKeyCode() == SKeyboard.CHAR_X)) {
			_cf.deleteRelation();
			this.stopEventProcessing(_e);
		}				
		if (this.getKeyCode() == SKeyboard.CHAR_B) { _cf.clearBuffer(); this.stopEventProcessing(_e); }
		if (this.getKeyCode() == SKeyboard.CHAR_C) { _cf.copyRelation(); this.stopEventProcessing(_e); }
		if (this.getKeyCode() == SKeyboard.CHAR_E) { _cf.editRelation(); this.stopEventProcessing(_e); }
		if (this.getKeyCode() == SKeyboard.CHAR_G) { _cf.resetGrid(); this.stopEventProcessing(_e); }
		if (this.getKeyCode() == SKeyboard.CHAR_M) { alert("Sort (TODO)"); this.stopEventProcessing(_e); }
		if (this.getKeyCode() == SKeyboard.CHAR_P) { alert("Print (TODO)"); this.stopEventProcessing(_e); }
		if (this.getKeyCode() == SKeyboard.CHAR_S) {
			if (_cf.isEdit() === true) {
			  _cf.saveRelation();
			} else {
				if (_cf.isParentDisplayed() === true) {
					_cf.showSFDCParentObject();
				} else if (_cf.isChildDisplayed() === true) {
					_cf.showSFDCChildObject();
				}
			}
			this.stopEventProcessing(_e);
			return result;
		}
		if (this.getKeyCode() == SKeyboard.CHAR_T) { _cf.extractRelation(); this.stopEventProcessing(_e); }
		if (this.getKeyCode() == SKeyboard.CHAR_V) { _cf.pasteRelation(); this.stopEventProcessing(_e); }

		if (this.getKeyCode() == SKeyboard.CHAR_1) { _cf.showParent(); this.stopEventProcessing(_e); }
		if (this.getKeyCode() == SKeyboard.CHAR_2) { _cf.showParentAndChild(); this.stopEventProcessing(_e); }
		if (this.getKeyCode() == SKeyboard.CHAR_3) { _cf.showChild(); this.stopEventProcessing(_e); }

		if (this.getKeyCode() == SKeyboard.CHAR_R) {
			_cf.gotoRoot(position);
			Utils.beep(0);
			this.stopEventProcessing(_e);
			return result;
		}
	}

	/////////

	/*
	        if (delta > 0) {
	          if (_kb.getCmd() === true) {
	            if (_kb.getAlt() === true) {
	              result = _grid.home();
						    _kb.stopEventProcessing(evt);
	            } else {
	              result = gridView.firstPage();
						    _kb.stopEventProcessing(evt);
					    }
	          } else {
	            if (_kb.getAlt() === true) {
	              result = gridView.left();
						    _kb.stopEventProcessing(evt);
	            } else if (_kb.getShift() === true) {
	              result = gridView.previousPage();
						    _kb.stopEventProcessing(evt);
	            } else {
	              result = gridView.up();
						    _kb.stopEventProcessing(evt);
	            }
	          }
	        } else {
	          if (_kb.getCmd() === true) {
	            if (_kb.getAlt() === true) {
	              result = _grid.end();
						    _kb.stopEventProcessing(evt);
	        		} else {
	          		result = gridView.lastPage();
						    _kb.stopEventProcessing(evt);
	        		}
	          } else {
	            if (_kb.getAlt() === true) {
	              result = gridView.right();
						    _kb.stopEventProcessing(evt);
	            } else if (_kb.getShift() === true) {
	              result = gridView.nextPage();
						    _kb.stopEventProcessing(evt);
	            } else {
	              result = gridView.down();
						    _kb.stopEventProcessing(evt);
	            }
	          }
	        }
	*/

					if (this.isVkPageUp() === true) {
						if (Utils.group() === true) {
							if (this.getKeyCode() == SKeyboard.CHAR_C) { //Copy group.
								_cf.copyRelation();
								this.setKeyCodes(SKeyboard.UP_TEXT);
								result = list.up();
								this.stopEventProcessing(_e);
							} else if (position.getRow() == Position.ROW_TOP()) {
								this.setKeyCodes("PUP");        					//Utils.alert("PUP...");
								result = list.firstPage();     						//TODO:  CHECK gridview/objectsList/...
								this.stopEventProcessing(_e);
							}
						} else {
							this.setKeyCodes(SKeyboard.PAGE_UP_TEXT);  	//Utils.alert("PUP...");
							result = list.previousPage();
					    this.stopEventProcessing(_e);
						}
						return result;
					}			
					if (this.isVkPageDown() === true) {
						if (Utils.group() === true) {
							if (this.getKeyCode() == SKeyboard.CHAR_C) { //Copy group.
								_cf.copyRelation();
								this.setKeyCodes(SKeyboard.DOWN_TEXT);
								result = list.down();
								this.stopEventProcessing(_e);
							}
						} else {					
							this.setKeyCodes(SKeyboard.PAGE_DOWN_TEXT);  //Utils.alert("PDN...");
							result = list.nextPage();
					    this.stopEventProcessing(_e);
						}
						return result;
					}
					if (this.isVkHome() === true) {
						result = _grid.home();
				    this.stopEventProcessing(_e);
						return result;
					}
					if (this.isVkPageTop() === true) {
						this.setKeyCodes(SKeyboard.HOME_TEXT); 				//Utils.alert("HOME...");
					  result = list.firstPage();
				    this.stopEventProcessing(_e);
						return result;
					}
					if (this.isVkPageBottom() === true) {
						this.setKeyCodes(SKeyboard.END_TEXT); 					//Utils.alert("END...");
						result = list.lastPage();
				    this.stopEventProcessing(_e);
						return result;
					}
					if (this.isVkEnd() === true) {
						result = _grid.end();
				    this.stopEventProcessing(_e);
						return result;
					}				
					if (this.isVkLeft() === true) {
						if (_cf instanceof RelationsForm) {
							_cf.setFocusOnList();
							this.setKeyCodes(SKeyboard.LEFT_TEXT); 			//Utils.alert("LEFT...");
							result = mainList.left();
						} else {
							Utils.beep(0);
						}
				  //this.stopEventProcessing(_e);
						return result;
					}
					if (this.isVkUp() === true) {
						this.setKeyCodes(SKeyboard.UP_TEXT);       		//Utils.alert("UP...");
						result = list.up();
				  //this.stopEventProcessing(_e);
						return result;
					}			
					if (this.isVkDown() === true) {
						this.setKeyCodes(SKeyboard.DOWN_TEXT);    		  //Utils.alert("DOWN...");
						result = list.down();
				  //this.stopEventProcessing(_e);
						return result;
					}
					if (this.isVkRight() === true) {
						if (_cf instanceof RelationsForm) {
							_cf.setFocusOnList();
							this.setKeyCodes(SKeyboard.RIGHT_TEXT); 	 	  //Utils.alert("RIGHT...");
							result = mainList.right();
						} else {
							Utils.beep(0);
						}
				  //this.stopEventProcessing(_e);
						return result;
					}

	/*
				if (this.getShift() === true) {
					if (this.getKeyCode() == SKeyboard.UP) {
						if (Utils.group() === true) {
							if (this.getKeyCode() == SKeyboard.CHAR_C) { //Copy group.
								_cf.copyRelation();
								this.setKeyCodes(SKeyboard.UP_TEXT);
								result = list.up();
								this.stopEventProcessing(_e);
							} else if (position.getRow() == Position.ROW_TOP()) {
								this.setKeyCodes("PUP");        					//Utils.alert("PUP...");
								result = list.firstPage();     						//TODO:  CHECK gridview/objectsList/...
								this.stopEventProcessing(_e);
							}
						} else {
							this.setKeyCodes(SKeyboard.PAGE_UP_TEXT);  	//Utils.alert("PUP...");
							result = list.previousPage();
					    this.stopEventProcessing(_e);
						}
						return result;
					}			
					if (this.getKeyCode() == SKeyboard.DOWN) {
						if (Utils.group() === true) {
							if (this.getKeyCode() == SKeyboard.CHAR_C) { //Copy group.
								_cf.copyRelation();
								this.setKeyCodes(SKeyboard.DOWN_TEXT);
								result = list.down();
								this.stopEventProcessing(_e);
							}
						} else {					
							this.setKeyCodes(SKeyboard.PAGE_DOWN_TEXT);  //Utils.alert("PDN...");
							result = list.nextPage();
					    this.stopEventProcessing(_e);
						}
						return result;
					}
				} else if (this.getCmd() === true) {
					if (this.getKeyCode() == SKeyboard.LEFT) {
						result = _grid.home();
				    this.stopEventProcessing(_e);
						return result;
					}
					if (this.getKeyCode() == SKeyboard.UP) {
						this.setKeyCodes(SKeyboard.HOME_TEXT); 				//Utils.alert("HOME...");
					  result = list.firstPage();
				    this.stopEventProcessing(_e);
						return result;
					}
					if (this.getKeyCode() == SKeyboard.DOWN) {
						this.setKeyCodes(SKeyboard.END_TEXT); 					//Utils.alert("END...");
						result = list.lastPage();
				    this.stopEventProcessing(_e);
						return result;
					}
					if (this.getKeyCode() == SKeyboard.RIGHT) {
						result = _grid.end();
				    this.stopEventProcessing(_e);
						return result;
					}				
				} else {
					if (this.getKeyCode() == SKeyboard.LEFT) {
						if (_cf instanceof RelationsForm) {
							_cf.setFocusOnList();
							this.setKeyCodes(SKeyboard.LEFT_TEXT); 			//Utils.alert("LEFT...");
							result = mainList.left();
						} else {
							Utils.beep(0);
						}
			    	this.stopEventProcessing(_e);
						return result;
					}
					if (this.getKeyCode() == SKeyboard.UP) {
						this.setKeyCodes(SKeyboard.UP_TEXT);       		//Utils.alert("UP...");
						result = list.up();
				    this.stopEventProcessing(_e);
						return result;
					}			
					if (this.getKeyCode() == SKeyboard.DOWN) {
						this.setKeyCodes(SKeyboard.DOWN_TEXT);    		  //Utils.alert("DOWN...");
						result = list.down();
				    this.stopEventProcessing(_e);
						return result;
					}
					if (this.getKeyCode() == SKeyboard.RIGHT) {
						if (_cf instanceof RelationsForm) {
							_cf.setFocusOnList();
							this.setKeyCodes(SKeyboard.RIGHT_TEXT); 				//Utils.alert("RIGHT...");
							result = mainList.right();
						} else {
							Utils.beep(0);
						}
				    this.stopEventProcessing(_e);
						return result;
					}
				}
	*/
			}
		} catch(error) {
			Utils.alert("SKeyboard/keypressed - Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	},
	specialKeysUp: function(e) {
		var _e = (e !== undefined)?e:window.event;
		//alert("SKeyboard/specialKeysUp - e: "+_e);			
		try {
			var keyCode = -1;
			if (window.event) {
				//IE
				keyCode = _e.keyCode;
			} else if (_e.which) {
				//Netscape/Firefox/Opera
				keyCode = _e.which;
			}
			this.setKeyCode(keyCode);
		/*if ((keyCode == SKeyboard.ALT) ||
					(keyCode == SKeyboard.SHIFT) ||
					(keyCode == SKeyboard.CTRL) ||
					(keyCode == SKeyboard.CMD_91) ||
					(keyCode == SKeyboard.CMD_92) ||
					(keyCode == SKeyboard.CMD_93) ||
					(keyCode == SKeyboard.CMD_219) ||
					(keyCode == SKeyboard.CMD_220) ||
					(keyCode == SKeyboard.CMD_224)) {
				alert("SKeyboard/specialKeysUp - keyCode: "+keyCode);
			}*/
			switch (this.keyCode) {
				case SKeyboard.ALT:
				this.setAlt(false);
				break;
				case SKeyboard.SHIFT:
				this.setShift(false);
				break;
				case SKeyboard.CTRL:
				this.setCtrl(false);
				break;
				case SKeyboard.CMD_91:
				case SKeyboard.CMD_92:
				case SKeyboard.CMD_93:
				case SKeyboard.CMD_219:
				case SKeyboard.CMD_220:
				case SKeyboard.CMD_224:
				this.setCmd(false);
				break;
				default:
				break;
			}
		} catch(error) {
			Utils.alert("SKeyboard/specialKeysUp - Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return this;
		}
	},
	specialKeysDown: function(e) {
		var _e = (e !== undefined)?e:window.event;
		//alert("SKeyboard/specialKeysDown - e: "+_e);
		try {
			var keyCode = -1;
			if (window.event) {
				//IE
				keyCode = _e.keyCode;
			} else if (_e.which) {
				//Netscape/Firefox/Opera
				keyCode = _e.which;
			}
			this.setKeyCode(keyCode);
		/*if ((keyCode == SKeyboard.ALT) ||
					(keyCode == SKeyboard.SHIFT) ||
					(keyCode == SKeyboard.CTRL) ||
					(keyCode == SKeyboard.CMD_91) ||
					(keyCode == SKeyboard.CMD_92) ||
					(keyCode == SKeyboard.CMD_93) ||
					(keyCode == SKeyboard.CMD_219) ||
					(keyCode == SKeyboard.CMD_220) ||
					(keyCode == SKeyboard.CMD_224)) {
				alert("SKeyboard/specialKeysDown - keyCode: "+keyCode);
			}*/
			switch (this.keyCode) {
				case SKeyboard.ALT:
				this.setAlt(true);
				break;
				case SKeyboard.SHIFT:
				this.setShift(true);
				break;
				case SKeyboard.CTRL:
				this.setCtrl(true);
				break;
				case SKeyboard.CMD_91:
				case SKeyboard.CMD_92:
				case SKeyboard.CMD_93:
				case SKeyboard.CMD_219:
				case SKeyboard.CMD_220:
				case SKeyboard.CMD_224:
				this.setCmd(true);
				break;
				default:
				break;
			}
		} catch(error) {
			Utils.alert("SKeyboard/specialKeysDown - Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return this;
		}
	},
	keydown: function(e) {
		var _e = window.event || e;	
	  //var _e = (e !== undefined)?e:window.event;	
		//alert("SKeyboard/keydown - e: "+_e);
		var position = null;
		var result = false;
		var stopEvent = false;
		try {
			if (_cf) {
				//Set that an event is happened!
				_cf.setEventHappened(true);
				var keyCode = -1;
				if (_e == window.event) {
					keyCode = _e.keyCode; //IE
				} else if (_e.which) {
					keyCode = _e.which;   //Netscape/Firefox/Opera
				}
				this.setKeyCode(keyCode);			
				//Set mousewheel event.
			  var delta = _e.detail?-_e.detail/3:((window.opera)?-_e.wheelDelta/120:_e.wheelDelta/120);
				this.setDelta(delta);

				///////////////
				// Position ???
				///////////////
				position = this.getPosition();
				//Utils.alert("Keyboard/keydown - position: "+position.print());
				if (position === null) { Utils.alert("SKeyboard/keydown - !position"); return result; }

				//Toggle CAPSLOCK.
				if (this.getKeyCode() == SKeyboard.CAPSLOCK) {
					this.toggleCapsLock();
				}
				if (this.getCapsLock()) {
					//Toggle shift!
					this.toggleShift();
				}
				//Toggle NUMLOCK.
				if (this.getKeyCode() == SKeyboard.NUMLOCK) {
					this.toggleNumLock();
				}
				//Toggle SCROLLLOCK.
				if (this.getKeyCode() == SKeyboard.SCROLLLOCK) {
					this.toggleScrollLock();
				}

				// Alt/Ctrl/Shift - Only - not allowed !!!
				if ( //((this.getAlt() === true)  && (this.getKeyCode() == SKeyboard.ALT)) || 
						 //((this.getShift() === true) && (this.getKeyCode() == SKeyboard.SHIFT)) ||
							 ((this.getCtrl() === true)  && (this.getKeyCode() == SKeyboard.CTRL))) {
					this.stopEventProcessing(_e);					
					return result;
				}

				if (this.getKeyCode() == SKeyboard.ESC) 		{ _cf.cancelEditing(); this.stopEventProcessing(_e); }

				if (this.getCmd() === true) {
					if (this.getKeyCode() == SKeyboard.ENTER) {
						_rf.showSFDCChildObject();
	 					this.stopEventProcessing(_e);					
						return result;
					} else if (  //(this.getKeyCode() == SKeyboard.ENTER) ||
							(this.getKeyCode() == SKeyboard.SPACE) ||
							(this.getKeyCode() == SKeyboard.ESC)) {
						Utils.beep(1);
						this.stopEventProcessing(_e);
						return result;
					}
				}

	/*
				if (this.getCmd() === true) {
					if (this.getShift() === true) {
						if (this.getKeyCode() == SKeyboard.CHAR_Z) { _cf.redo(); this.stopEventProcessing(_e); }
					} else {
						if (this.getKeyCode() == SKeyboard.CHAR_Z) { _cf.undo(); this.stopEventProcessing(_e); }
					}
					if ((this.getKeyCode() == SKeyboard.INSERT) ||
							(this.getKeyCode() == SKeyboard.CHAR_A) ||
							(this.getKeyCode() == SKeyboard.CHAR_N)) {
						_cf.addRelation();
						this.stopEventProcessing(_e);
					}				
					if ((this.getKeyCode() == SKeyboard.DELETE) ||
							(this.getKeyCode() == SKeyboard.CHAR_D) ||
							(this.getKeyCode() == SKeyboard.CHAR_X)) {
						_cf.deleteRelation();
						this.stopEventProcessing(_e);
					}				
					if (this.getKeyCode() == SKeyboard.CHAR_B) { _cf.clearBuffer(); this.stopEventProcessing(_e); }
					if (this.getKeyCode() == SKeyboard.CHAR_C) { _cf.copyRelation(); this.stopEventProcessing(_e); }
					if (this.getKeyCode() == SKeyboard.CHAR_E) { _cf.editRelation(); this.stopEventProcessing(_e); }
					if (this.getKeyCode() == SKeyboard.CHAR_G) { _cf.resetGrid(); this.stopEventProcessing(_e); }
					if (this.getKeyCode() == SKeyboard.CHAR_M) { alert("Sort (TODO)"); this.stopEventProcessing(_e); }
					if (this.getKeyCode() == SKeyboard.CHAR_P) { alert("Print (TODO)"); this.stopEventProcessing(_e); }
					if (this.getKeyCode() == SKeyboard.CHAR_S) { _cf.saveRelation(); this.stopEventProcessing(_e); }
					if (this.getKeyCode() == SKeyboard.CHAR_T) { _cf.extractRelation(); this.stopEventProcessing(_e); }
					if (this.getKeyCode() == SKeyboard.CHAR_V) { _cf.pasteRelation(); this.stopEventProcessing(_e); }

					if (this.getKeyCode() == SKeyboard.CHAR_1) { _cf.showParent(); this.stopEventProcessing(_e); }
					if (this.getKeyCode() == SKeyboard.CHAR_2) { _cf.showParentAndChild(); this.stopEventProcessing(_e); }
					if (this.getKeyCode() == SKeyboard.CHAR_3) { _cf.showChild(); this.stopEventProcessing(_e); }

					if (this.getKeyCode() == SKeyboard.CHAR_R) {
						_cf.gotoRoot(position);
						Utils.beep(0);
						this.stopEventProcessing(_e);
						return result;
					}
				}
	*/

	/*		
				//////////////////////////////////////////////////////////////////////////////////////
				// Navigation keys (HOME/PUP/UP/LEFT/RIGHT/DOWN/PDN/END) - executed in keypress !!! //
				//////////////////////////////////////////////////////////////////////////////////////
				if ((this.getKeyCode() >= SKeyboard.PAGE_UP) && (this.getKeyCode() <= SKeyboard.DOWN)) {
					this.stopEventProcessing(_e);
					return result;
				}
	*/

				result = this.keypressed(_e);
	/*
				if (this.getKeyCode() == SKeyboard.UP) {
					alert("Keyboard/keydown - UP - key: "+this.getKeyCode());
				}			
				if (this.getKeyCode() == SKeyboard.DOWN) {
					alert("Keyboard/keydown - DOWN - key: "+this.getKeyCode());
				}
	*/
				/////////////////////////////////////////////////////////////
				// DETERMINE - Current List/Cell/Relation/Entity     BEGIN //
				/////////////////////////////////////////////////////////////
				var list = _cf.getList();
				var mainList = list;
				var listCell = null;
				var relation = null;
				var entity = null;
				var entityState = null;
				if (_cf.isFocusOnParentProperties() === true) {
					entityState = Entity.STATE_PARENT;
					listCell = _cf.getParentCell();
					relation = listCell.getRelation();
					if (relation) {
						entity = relation.getChildEntity();
					}
				} else if (_cf.isFocusOnChildProperties() === true) {
					entityState = Entity.STATE_CHILD;
					listCell = _cf.getChildCell();
					relation = listCell.getRelation();
					if (relation) {
						entity = relation.getChildEntity();
					}
				} else if (_cf.isFocusOnObjectProperties() === true) {
					entityState = Entity.STATE_OBJECT;
					listCell = _cf.getListObject();
					if (listCell) {
						entity = listCell.getObject();
					}
				}
				if (entity) {
					list = entity.getAttributeList();
					list.setState(entityState);
				}	
			/*if (list) {
					result = true;
				}*/		
				/////////////////////////////////////////////////////////////
				// DETERMINE - Current List/Cell/Relation/Entity       END //
				/////////////////////////////////////////////////////////////

				if (this.getKeyCode() == SKeyboard.BACKSPACE) {
					this.setKeyCodes("BACKSPACE");
				}
				if (this.getKeyCode() == SKeyboard.TAB) {
					if (this.getShift() === true) {
						this.setKeyCodes("BACKTAB");
					} else {
						this.setKeyCodes("TAB");
					}
					try {
						if (_cf.isFocusOnEntityFilter() === true) {
							if ((this.getKeyCode() == SKeyboard.TAB) && this.getShift()) {
								if (_cf instanceof RelationsForm) {
									_cf.setFocusOnParentProperties();
								} else {
									_cf.setFocusOnObjectProperties();
								}
							} else {
								if (_cf instanceof ObjectsForm) {
									_cf.setFocusOnReferenceFilter();
								} else {
									_cf.setFocusOnList();
								}
							}
						} else if (_cf.isFocusOnReferenceFilter() === true) {
							if ((this.getKeyCode() == SKeyboard.TAB) && this.getShift()) {
								_cf.setFocusOnEntityFilter();
							} else {
								_cf.setFocusOnList();
							}
						} else if (_cf.isFocusOnList() === true) {
							if ((this.getKeyCode() == SKeyboard.TAB) && this.getShift()) {
								if (_cf instanceof RelationsForm) {
									_cf.setFocusOnEntityFilter();
								} else {
									_cf.setFocusOnReferenceFilter();
								}
							} else {
								if (_cf instanceof RelationsForm) {
									_cf.setFocusOnChildProperties();
								} else {
									_cf.setFocusOnObjectProperties();
								}
							}
						} else if (_cf.isFocusOnChildProperties() === true) {
							if ((this.getKeyCode() == SKeyboard.TAB) && this.getShift()) {
								_cf.setFocusOnEntityFilter();
							} else {
								_cf.setFocusOnParentProperties();
							}
						} else if (_cf.isFocusOnParentProperties() === true) {
							if ((this.getKeyCode() == SKeyboard.TAB) && this.getShift()) {
								_cf.setFocusOnChildProperties();
							} else {
								_cf.setFocusOnEntityFilter();
							}
						} else if (_cf.isFocusOnObjectProperties() === true) {
							if ((this.getKeyCode() == SKeyboard.TAB) && this.getShift()) {
								_cf.setFocusOnList();
							} else {
								_cf.setFocusOnEntityFilter();
							}
						}
					} catch(error1) {
						Utils.alert("Keyboard/keydown/TAB - Error1: "+error1.message);
					} finally {
						if (document) {
							if (_cf.isFocusOnEntityFilter() === true) {
								if (document.getElementById(Entity.FILTER_ID)) {
									document.getElementById(Entity.FILTER_ID).focus();
								}
							} else if (_cf.isFocusOnReferenceFilter() === true) {
								if (document.getElementById(ObjectsForm.OBJECT_REFERENCE_FILTER_ID)) {
									document.getElementById(ObjectsForm.OBJECT_REFERENCE_FILTER_ID).focus();
								}
							} else {
								if (document.getElementById(SjamayeeForm.NAVIGATION_CONTROL_ID)) {		
									document.getElementById(SjamayeeForm.NAVIGATION_CONTROL_ID).focus();
								}
							}
						}
	 					this.stopEventProcessing(_e);					
						result = true;
						return result;
					}
				}
	/*
				if (this.getCmd() === true) {
					if (this.getKeyCode() == SKeyboard.ENTER) {
						_rf.showSFDCChildObject();
	 					this.stopEventProcessing(_e);					
					} else if (  //(this.getKeyCode() == SKeyboard.ENTER) ||
							(this.getKeyCode() == SKeyboard.SPACE) ||
							(this.getKeyCode() == SKeyboard.ESC)) {
						Utils.beep(1);
						this.stopEventProcessing(_e);
						return result;
					}
				}
	*/
				//At anytime !!!
				if (this.getKeyCode() == SKeyboard.ESC) {
					this.setKeyCodes(SKeyboard.ESC_TEXT);
					//Mode: DISPLAY
					_cf.setMode(Grid.MODE_DISPLAY);
					this.stopEventProcessing(_e);					
					result = true;
					return result;
				}
				//SWITCH BETWEEN SJAMAYEE - SFDC!
				if ((_cf.isFocusOnList() === true) ||
						(_cf.isFocusOnChildProperties() === true) ||
						(_cf.isFocusOnParentProperties() === true)) {
					/*alert('Keyboard/keydown Focus on list: '+_cf.isFocusOnList()+'\n'+
									'detailRight: '+_cf.isFocusOnChildProperties()+'\n'+
									'detailLeft: '+_cf.isFocusOnParentProperties());*/
					//Edit - SFDC!
					if (this.getCaps() === true) {
						if (this.getKeyCode() == SKeyboard.CHAR_X) {
							if (_cf.isFocusOnChildProperties() === true) {
								_rf.editSFDCChildObject();
							}
						/*if (_cf.isFocusOnParentProperties()) {
							 	_rf.editSFDCParentObject();
							} else if (_cf.isFocusOnChildProperties()) {
						 		_rf.editSFDCChildObject();
							} else if (gridView.getCurrentNivo() > Position.NIVO_ROOT()) {
								_rf.editSFDCChildObject();
							} else {
								_rf.editSFDCParentObject();
							}*/
		 					this.stopEventProcessing(_e);					
							//return result;
						}
						/*if (this.getKeyCode() == SKeyboard.CHAR_P) {
								_rf.editSFDCParentObject();
								//Stop event processing!
								stopEvent = true;
								return result;
							}
							if (this.getKeyCode() == SKeyboard.CHAR_C) {
								_rf.editSFDCChildObject();
			 					this.stopEventProcessing(_e);					
								return result;
							}*/
					}
					//Display - SFDC!
					if (this.getKeyCode() == SKeyboard.CHAR_X) {          
						if (_cf.isFocusOnChildProperties() === true) {
							_rf.showSFDCChildObject();
						}
						/*if (_cf.isFocusOnParentProperties()) {
						_rf.showSFDCParentObject();
						} else if (_cf.isFocusOnChildProperties()) {
						_rf.showSFDCChildObject();
						} else if (gridView.getCurrentNivo() > Position.NIVO_ROOT()) {
						_rf.showSFDCChildObject();
						} else {
						_rf.showSFDCParentObject();
						}*/
	 					this.stopEventProcessing(_e);					
						return result;
					}
					/*if (this.getKeyCode() == SKeyboard.CHAR_P) {
					_rf.showSFDCParentObject();
					this.stopEventProcessing(_e);					
					return result;
					}
					if (this.getKeyCode() == SKeyboard.CHAR_C) {
					_rf.showSFDCChildObject();
					this.stopEventProcessing(_e);					
					return result;
					}*/
				}
				//Reverse sorting order (ASC/DSC) - Cmd/M.
				if ((this.getKeyCode() == SKeyboard.CHAR_M) && (this.getCmd())) {
					reverseSort(position.getNivo());
				}

				if (this.getKeyCode() == SKeyboard.ENTER) {
					this.setKeyCodes(SKeyboard.ENTER_TEXT);
					if (_cf instanceof ObjectsForm) {
						if (_of.isFocusOnList() === true) {
							_of.setFocusOnObjectProperties();
						} else {
							_of.setFocusOnList();
						}
					} else {
						_cf.setFocusOnList();
	      		// MAKE THIS ROOT !!!				
						var enterOnRoot = position.isRoot();
						var r = position.getRow();
						var c = position.getColumn();
					//_grid.switchRoot(r,c);
						var gridView = _grid.getGridView();
						if (gridView) {
							gridView.switchRoot(r,c);
						}
						if (enterOnRoot === true) {
							_grid.setFocusOnRoot();
						}
					}
					this.stopEventProcessing(_e);					
					result = true;
					return result;
				}
				if (this.getKeyCode() == SKeyboard.PAUSE) {
					this.setKeyCodes("PAUSE/BREAK");
					this.stopEventProcessing(_e);					
					result = true;
					return result;
				}
				if (this.getKeyCode() == SKeyboard.SPACE) {
					this.setKeyCodes(SKeyboard.SPACE_TEXT);
					if (_cf instanceof ObjectsForm) {
						if (_of.isFocusOnList() === true) {
							_of.setFocusOnObjectProperties();
						} else {
							_of.setFocusOnList();
						}
					} else {
						_cf.gotoRoot(position);
					}
					Utils.beep(0);			
					this.stopEventProcessing(_e);					
					result = true;
					return result;
				}

				if (this.getKeyCode() == SKeyboard.INSERT) {
					this.setKeyCodes(SKeyboard.INSERT_TEXT);
				}
				if (this.getKeyCode() == SKeyboard.DELETE) {
					this.setKeyCodes(SKeyboard.DELETE_TEXT);
				}
				//FKEYS
				if (this.getKeyCode() == SKeyboard.F1) {
					this.setKeyCodes(SKeyboard.F1_TEXT);
				}
				if (this.getKeyCode() == SKeyboard.F2) {
					this.setKeyCodes(SKeyboard.F2_TEXT);
				}
				if (this.getKeyCode() == SKeyboard.F3) {
					this.setKeyCodes(SKeyboard.F3_TEXT);
				}
				if (this.getKeyCode() == SKeyboard.F4) {
					this.setKeyCodes(SKeyboard.F4_TEXT);
				}
				if (this.getKeyCode() == SKeyboard.F5) {
					this.setKeyCodes(SKeyboard.F5_TEXT);
				}
				if (this.getKeyCode() == SKeyboard.F6) {
					this.setKeyCodes(SKeyboard.F6_TEXT);
				}
				if (this.getKeyCode() == SKeyboard.F7) {
					this.setKeyCodes(SKeyboard.F7_TEXT);
				}
				if (this.getKeyCode() == SKeyboard.F8) {
					this.setKeyCodes(SKeyboard.F8_TEXT);
				}
				if (this.getKeyCode() == SKeyboard.F9) {
					this.setKeyCodes(SKeyboard.F9_TEXT);
				}
				if (this.getKeyCode() == SKeyboard.F10) {
					this.setKeyCodes(SKeyboard.F10_TEXT);
				}
				if (this.getKeyCode() == SKeyboard.F11) {
					this.setKeyCodes(SKeyboard.F11_TEXT);
				}
				if (this.getKeyCode() == SKeyboard.F12) {
					this.setKeyCodes(SKeyboard.F12_TEXT);
				}
				if (((this.getKeyCode() >= SKeyboard.F1) && (this.getKeyCode() <= SKeyboard.F12)) ||
					 	(this.getKeyCode().length >= 3)) {
					this.setKeyCodes(this.getKeyCode());
				} else {              
					if (((this.getKeyCode() >= 65) && (this.getKeyCode() <= 90)) ||
							((this.getKeyCode() >= 97) && (this.getKeyCode() <= 122))) {
						this.setKeyCodes(String.fromCharCode(this.getKeyCode()));
						if (!this.getCaps()) {
							this.setKeyCodes(this.getKeyCodes().toLowerCase());
						}
					} else if ((this.getKeyCode() >= 48) && (this.getKeyCode() <= 57)) {
						this.setKeyCodes(String.fromCharCode(this.getKeyCode()));
					}
				}
				/*if (!((this.getKeyCode() == 16) ||
				(this.getKeyCode() == 17) ||
				(this.getKeyCode() == 18) ||
				(this.getKeyCode() == 20))) {
				if ((count < -10) || (count > 10)) {
				Utils.alert("You clicked - keyCode: " + this.getKeyCodes() + " / capsLock: " + this.getCapsLock() + " / shift: " + this.getShift() +
										" / ctrl: " + this.getCtrl() + " / alt: " + this.getAlt()); //+ "\n" +
										" VALUE = " + document.getElementById(position.id()).innerHTML + "\n" +
										" ID = " + position.id() + "\n" +
										" NIVO = " + position.getNivo() + "\n" +
										" base = " + SjamayeeForm.getNivoBase());  // *** NOK ***
				}}*/
			}
		} catch(error) {
			Utils.alert("SKeyboard/keydown - Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			if (result === true) {
			  this.stopEventProcessing(_e);			
				if (_cf) {
					//REFRESH!
					_cf.setRefreshNow();
					_cf.refresh();
					if (_cf instanceof RelationsForm) {
						//Set Focus !!!
						_grid.getGridView().setFocusOnPosition();        //TODO: _cf.setFocusOnPosition() !!!
						//Set NEW focus!
						if (this.getKeyCodes() == SKeyboard.ESC_TEXT) {
							if (position) {  // !!! !== NULL !!!
								position.display();
							}
						}
					}
				}
			}
			return result;
		}
	},
	navigateToParentOrChild: function(nivo,mode) {
		try {
			if (document) {
				var soid = null;
				if (nivo != Position.NIVO_ROOT()) {
					if (nivo < Position.NIVO_ROOT()) {
						if (document.getElementById(Entity.SFDC_OID_PARENT)) {
							soid = document.getElementById(Entity.SFDC_OID_PARENT).value;
						}
					} else {
						if (document.getElementById(Entity.SFDC_OID_CHILD)) {
							soid = document.getElementById(Entity.SFDC_OID_CHILD).value;
						}
					}
				}
				if (soid !== null) {
					document.getElementById(Entity.SFDC_OID).value = soid;
					//navigateSFDC(mode);
					sbutton.click();
				}
			}
		} catch(error) {
			Utils.alert("SKeyboard/navigateToParentOrChild Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return this;	
		}
	},
	storeJson: function() {
		var result = '';
		try {
			result = '{';
			result += '"sid":"'+this.getSid()+'"';
			var gridId = 'null';
			gridId = _grid.getSid();
			result += ',"gridId":"'+gridId+'"';
			result += '}';
			//SjamayeeForm.putBySid(this);
		} catch(error) {
			Utils.alert("SKeyboard/storeJson Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	},
	print: function(html,keysOnly) {
		var _html = ((html !== undefined) && (html !== null))?html:false;
		var _keysOnly = ((keysOnly !== undefined) && (keysOnly !== null))?keysOnly:false;
		var _nl = (_html)?'<br/>':'\n';
		var result = 'SKeyboard:'+_nl;
		try {
			result += this.parent();
		} catch(error) {
			Utils.alert("SKeyboard/print Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	}
});
//Statics
SKeyboard.NO_KEY = null;
SKeyboard.MOUSE_CLICK = 0;
SKeyboard.BACKSPACE = 8;
SKeyboard.TAB = 9;
SKeyboard.ENTER = 13;
SKeyboard.SHIFT = 16;
SKeyboard.ALT = 18;
//////////////////////////////////////////////
// Command keys					Mozilla		IE 	Opera	//
// Left Apple Command			224 		? 	 17		//
// Right Apple Command		224 		? 	 17		//
// Left Windows Start			91 			91 	 219	//
// Right Windows Start		92 			92 	 220	//
// Windows Menu						93 			93 	 0		//
//////////////////////////////////////////////
SKeyboard.CTRL = 17;
SKeyboard.CMD_91 = 91;
SKeyboard.CMD_92 = 92;
SKeyboard.CMD_93 = 93;
SKeyboard.CMD_219 = 219;
SKeyboard.CMD_220 = 220;
SKeyboard.CMD_224 = 224;
SKeyboard.PAUSE = 19;
SKeyboard.CAPSLOCK = 20;
SKeyboard.ESC = 27;
SKeyboard.SPACE = 32;
SKeyboard.PAGE_UP = 33;
SKeyboard.PAGE_DOWN = 34;
SKeyboard.END = 35;
SKeyboard.HOME = 36;
SKeyboard.LEFT = 37;
SKeyboard.UP = 38;
SKeyboard.RIGHT = 39;
SKeyboard.DOWN = 40;
SKeyboard.INSERT = 43; // + (+,A,N)
SKeyboard.DELETE = 45; // - (-,D,X)
SKeyboard.CHAR_A = 65; // Add (+,A,N)
SKeyboard.CHAR_B = 66; // Clear Buffer
SKeyboard.CHAR_C = 67; // Copy
SKeyboard.CHAR_D = 68; // Delete (-,D,X)
SKeyboard.CHAR_E = 69; // Edit
SKeyboard.CHAR_G = 71; // Reset Grid
SKeyboard.CHAR_M = 77; // Sort (TODO)
SKeyboard.CHAR_N = 78; // New
SKeyboard.CHAR_P = 80; // Print (TODO)
SKeyboard.CHAR_R = 82; // Root
SKeyboard.CHAR_S = 83; // Save
SKeyboard.CHAR_T = 84; // Extract
SKeyboard.CHAR_V = 86; // Paste
SKeyboard.CHAR_X = 88; // Delete (-,D,X)
SKeyboard.CHAR_Z = 90; // Undo/Redo
SKeyboard.CHAR_1 = 49; // Parent
SKeyboard.CHAR_2 = 50; // Parent & Child
SKeyboard.CHAR_3 = 51; // Child
SKeyboard.NUMLOCK = 144;
SKeyboard.SCROLLLOCK = 145;
SKeyboard.SELECT = 29;                 // ????? NOT FINISHED !!!
SKeyboard.F1 = 112;
SKeyboard.F2 = 113;
SKeyboard.F3 = 114;
SKeyboard.F4 = 115;
SKeyboard.F5 = 116;
SKeyboard.F6 = 117;
SKeyboard.F7 = 118;
SKeyboard.F8 = 119;
SKeyboard.F9 = 120;
SKeyboard.F10 = 121;
SKeyboard.F11 = 122;
SKeyboard.F12 = 123;
SKeyboard.CAPSLOCK_TEXT = "CAPSLOCK";
SKeyboard.NUMLOCK_TEXT = "NUMLOCK";
SKeyboard.SCROLLLOCK_TEXT = "SCROLLLOCK";
SKeyboard.BACKSPACE_TEXT = "BACKSPACE";
SKeyboard.TAB_TEXT = "TAB";
SKeyboard.ENTER_TEXT = "ENTER";
SKeyboard.ESC_TEXT = "ESC";
SKeyboard.SPACE_TEXT = "SPACE";
SKeyboard.PAGE_UP_TEXT = "PUP";
SKeyboard.PAGE_DOWN_TEXT = "PDN";
SKeyboard.END_TEXT = "END";
SKeyboard.HOME_TEXT = "HOME";
SKeyboard.LEFT_TEXT = "LEFT";
SKeyboard.UP_TEXT = "UP";
SKeyboard.RIGHT_TEXT = "RIGHT";
SKeyboard.DOWN_TEXT = "DOWN";
SKeyboard.INSERT_TEXT = "INSERT";
SKeyboard.DELETE_TEXT = "DELETE";
SKeyboard.F1_TEXT = "F01";
SKeyboard.F2_TEXT = "F02";
SKeyboard.F3_TEXT = "F03";
SKeyboard.F4_TEXT = "F04";
SKeyboard.F5_TEXT = "F05";
SKeyboard.F6_TEXT = "F06";
SKeyboard.F7_TEXT = "F07";
SKeyboard.F8_TEXT = "F08";
SKeyboard.F9_TEXT = "F09";
SKeyboard.F10_TEXT = "F10";
SKeyboard.F11_TEXT = "F11";
SKeyboard.F12_TEXT = "F12";
SKeyboard.createEvent = function(keyCode) {
	var result = null;
	try {
		if (document) {  
			result = document.createEvent("KeyboardEvent");
			result.initKeyEvent("keydown",true,true,null,true,true,false,false,keyCode,0);
			window.dispatchEvent(result);
		}
	} catch(error) {
		Utils.alert("SKeyboard/createEvent Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	} finally {
		return result;
	}
};
SKeyboard.restoreJson = function(jso) {
	var result = null;
	try {
  	if ((jso !== undefined) && (jso !== null)) {
			/*var lgrid = null;
			if (jso.gridId != 'null') {
			lgrid = SjamayeeForm.getBySid(jso.gridId);
			}*/
			result = new SKeyboard();
			if (result) {
				result.setSid(jso.sid);
				//SjamayeeForm.putBySid(result);  
			}
		}
	} catch(error) {
		Utils.alert("SKeyboard/restoreJson Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	} finally {
		return result;
	}
};
SKeyboard.test = function() {
	return "SKeyboard/test !!!";
	/*var result = '\nSKeyboard:';
	var keyboard = null;
	var lgrid = new Grid();
	if (lgrid) {
	lgrid.show();
	var gridView = lgrid.getGridView();
	if (gridView) {
	keyboard = lgrid.getKeyboard();
	if (keyboard) {
	result += '\nEnter: '+keyboard.keydown(SKeyboard.ENTER);
	result += '\nPause: '+keyboard.keydown(SKeyboard.PAUSE);
	result += '\nEsc: '+keyboard.keydown(SKeyboard.ESC);
	result += '\nSpace: '+keyboard.keydown(SKeyboard.SPACE);
	result += '\nPage_up: '+keyboard.keydown(SKeyboard.PAGE_UP);
	result += '\nPage_down: '+keyboard.keydown(SKeyboard.PAGE_DOWN);
	result += '\nEnd: '+keyboard.keydown(SKeyboard.END);
	result += '\nHome: '+keyboard.keydown(SKeyboard.HOME);
	result += '\nLeft: '+keyboard.keydown(SKeyboard.LEFT);
	result += '\nUp: '+keyboard.keydown(SKeyboard.UP);
	result += '\nRight: '+keyboard.keydown(SKeyboard.RIGHT);
	result += '\nDown: '+keyboard.keydown(SKeyboard.DOWN);
	result += '\nInsert: '+keyboard.keydown(SKeyboard.INSERT);
	result += '\nDelete: '+keyboard.keydown(SKeyboard.DELETE);
	result += '\nF1: '+keyboard.keydown(SKeyboard.ENTER);
	result += '\nF2: '+keyboard.keydown(SKeyboard.ENTER);
	result += '\nF5: '+keyboard.keydown(SKeyboard.ENTER);
	result += '\nF12: '+keyboard.keydown(SKeyboard.ENTER);
	}
	}
	}
	return result;*/
};

//Class: Cache
var Cache = new Class({
	Extends: SjamayeeBase,
	initialize: function() {
	  //alert("Cache/constructor");
		try {
			this.parent();
			this.clear();
		} catch(error) {
			Utils.alert("Cache/constructor Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		}
	},
	//Getters & Setters
	getList: function() {
		var result = null;
		try {
			if (this.list !== undefined) {
				result = this.list;
			}
		} catch(error) {
			Utils.alert("Cache/getList Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	},
	setList: function(list) {
		if (list) {
			this.list = list;
		}
		return this;
	},
	getMaximumSize: function() {
		var result = Cache.LIMIT_SIZE;
		if ((this.maximumSize !== undefined) && (this.maximumSize !== null)) {
			result = this.maximumSize;
		}
		return result;
	},
	setMaximumSize: function(maximumSize) {
		if (maximumSize !== null) {
			this.maximumSize = maximumSize;
		}
		return this;
	},
	getCache: function() {
		var result = [];
		if ((this.cache !== undefined) && (this.cache !== null)) {
			result = this.cache;
		}
		return result;
	},
	setCache: function(cache) {
		if (cache) {
			this.cache = cache;
		}
		return this;
	},
	getSize: function() {
		var result = 0;
		try {
			var cache = this.getCache();
			if (cache) {
				result = cache.length;
			}
		} catch(error) {
			Utils.alert("Cache/getSize Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	},
	//Functions
	//Abstract
	expand: function() {
		return undefined;
	},
	sortOnReads: function(sort) {
		try {
			var _sort = ((sort !== undefined) && (sort !== null))?sort:Cache.SORT_ASCENDING;				
			var oid = null;
			var cachedObject = null;
			var sortKey = null;
			var sortedIds = [];
			var cache = this.getCache();
			if (cache) {
				for (var i = 0; i < cache.length; i++) {
					cachedObject = cache[i];
					if (cachedObject) {
						sortKey = (cachedObject.getReads()+','+cachedObject.getId());
						sortedIds.push(sortKey);
					}    
				}
			}
			//Sort ASCENDING/DESCENDING
			sortedIds.sort(Utils.sortAscending);
			if (_sort == Cache.SORT_DESCENDING) {
				sortedIds.reverse();
			}
			var sortedObjects = [];
			if (sortedIds) {
				while (sortedIds.length > 0) {
					sortKey = sortedIds.shift();
					oid = sortKey.substr((sortKey.indexOf(',')+1));
					sortedObjects.push(this.get(oid));
				}
			}  
			this.setCache(sortedObjects);
		} catch(error) {
			Utils.alert("Cache/sortOnReads Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return this;
		}
	},
	clear: function() {
		try {
			this.setCache([]);
		} catch(error) {
			Utils.alert("Cache/clear Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return this;
		}
	},
	getByIndex: function(index) {
		var result = null;
		try {
			var cache = this.getCache();
			if (index < cache.length) {
				result = cache[index];
				result.incrementReads();
			}
		} catch(error) {
			Utils.alert("Cache/getByIndex Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	},   
	getById: function(id) {
		return this.get(id);
	},
	get: function(key) {
		var result = null;
		try {
			var cache = this.getCache();
			for (var i = 0; i < cache.length; i++) {
				var objekt = cache[i];
				if (objekt) {
				//if (i === 0) { alert("Cache/get - key: "+key+" object/key: "+objekt.getKey()); }
					if (objekt.getKey() == key) {
					//if (i < 2) { alert("Cache/get - key: "+key+" object/key: "+objekt.getKey()); }
						result = objekt;
						result.incrementReads();					
						break;
					}  
				}
			}
		} catch(error) {
			Utils.alert("Cache/get Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
		//alert("Cache/get - key: "+key+" result/key: "+((result)?result.getKey():null));
			return result;
		}
	},
	put: function(objekt) {
		var result = false;
		try {
			objekt.setCache(this);
			var cache = this.getCache();
			if (!this.containsKey(objekt.getKey())) {
				if (cache.length >= this.getMaximumSize()) {
					this.removeLeastReferencedObject();
				}
				cache.push(objekt);
			} else {
				this.replace(objekt);
			} 
			result = true;
		} catch(error) {
			Utils.alert("Cache/put Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	},
	replace: function(objekt) {
		var result = null;
		try {
			objekt.setCache(this);
			var cache = this.getCache();
			for (var i = 0; i < cache.length; i++) {
				var cachedObject = cache[i];
				if (cachedObject) {
					if (cachedObject.getKey() == objekt.getKey()) {
						result = cache.splice(i,1,objekt);
						break;
					}  
				}
			}
		} catch(error) {
			Utils.alert("Cache/replace Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	},
	remove: function(key) {
		var result = null;
		try {
			result = this.get(key);
			if (result) {
				var cache = this.getCache();
				for (var i = 0; i < cache.length; i++) {
					var cachedObject = cache[i];
					if (cachedObject) {
						if (cachedObject.getKey() == result.getKey()) {
							result = cache.splice(i,1);
							break;
						}  
					}  
				}
			}
		} catch(error) {
			Utils.alert("Cache/remove Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	},
	containsKey: function(key) {
		return (this.get(key) !== null);
	},
	/////////////////////////////////////////////
	//ATT.: Only remove if no more references !!!
	/////////////////////////////////////////////
	removeLeastReferencedObject: function() {
		try {
			var leastReferencedObject = null;
			var leastReferencedObjectKey;
			var cache = this.getCache();
			for (var i = 0; i < cache.length; i++) {
				var objekt = cache[i];
				if (objekt) {
					if (!leastReferencedObject) {
						leastReferencedObject = objekt;
						leastReferencedObjectKey = objekt.getKey();
					}
					if (objekt.getReferences() < leastReferencedObject.getReferences()) {
						leastReferencedObject = objekt;
						leastReferencedObjectKey = objekt.getKey();
					}
					if (leastReferencedObject.getReferences() === 0) {
						break;
					}
				}  
			}  
			if ((leastReferencedObject) && (leastReferencedObject.getReferences() === 0)) {
				this.remove(leastReferencedObjectKey);
			}
		} catch(error) {
			Utils.alert("Cache/removeLeastReferencedObject Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		}
	},
	/*
	update: function() {
	try {
	var whereUsedColumns = [];
	var whatUsedColumns = [];
	var gridView = RelationsForm.getGridViewColumns();
	if (gridView) {
	var gridColumn = null;
	var nivoBase = gridView.getNivoBase();
	var currentNivo = gridView.currentNivo;   //getCurrentNivo() ???
	**
	//ONLY IF ROOT IS NEEDED/UPDATED !!!
	var r0 = gridView.root;
	if (r0) {
	var root = new Relation(r0.id,r0.value,r0.pei,r0.cei,r0.pid,r0.nid);
	_grid.setRoot(new GridCell(root));
	}
	**
	_grid.setCurrentNivo(currentNivo);
	var gridViewColumns = gridView.getColumns();
	var gridViewColumn = null;
	for (var i = 0; i < gridViewColumns.length; i++) {
	gridViewColumn = gridViewColumns[i];
	if (gridViewColumn) {
	gridColumn = new GridColumn(gridViewColumn.getNivo(),null);  //+++ grid +++
	var r1 = null;
	for (var j = 0; j < gridViewColumn.relations.length; j++) {
	r1 = gridViewColumn.relations[j];
	if (r1) {
	var relation = new Relation(r1.id,r1.value,r1.pei,r1.cei,r1.pid,r1.nid);
	var gridCell = new GridCell(relation);
	//Append Relation to gridColumn
	gridColumn.appendCell(gridCell);
	//Update RelationCache!                      //TODO !!! REFACTOR !!!
	//this.replace(relation.getKey(),relation);
	}   
	}
	//Utils.alert(gridViewColumn.relations);
	}
	//Save where- & what-columns for grid update!
	var nivo = gridColumn.getNivo();
	var index = Math.abs(nivo) - 1;
	if (nivo < Position.NIVO_ROOT()) {
	whereUsedColumns[index] = gridColumn;
	whereUsedColumns.length++;
	} else if (nivo > Position.NIVO_ROOT()) {
	whatUsedColumns[index] = gridColumn;
	whatUsedColumns.length++;
	}
	}
	}
	} catch(error) {
	alert("Cache/update Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	}
	}
	*/
	print: function(html,keysOnly) {
		var _html = ((html !== undefined) && (html !== null))?html:false;
		var _keysOnly = ((keysOnly !== undefined) && (keysOnly !== null))?keysOnly:false;
		var _nl = (_html)?'<br/>':'\n';
		var result = 'Cache:'+_nl;
		try {
			result += this.parent();
		} catch(error) {
			Utils.alert("Cache/print Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	}	
});
//Statics
Cache.LIMIT_SIZE = 1000;
Cache.SORT_ASCENDING  = 'ASC';
Cache.SORT_DESCENDING = 'DSC';

//Class: AsyncQueue
var AsyncQueue = new Class({
	Extends: SjamayeeBase,

	initialize: function() {
		try {
			this.parent();
			this.queue = null;
			var that = this;
	  	YUI().use("async-queue", function(Y) {
				with(that) {
	  			that.queue = new Y.AsyncQueue();
					that.queue.defaults.timeout = 1000; //2000;
          /*var message = "Xjamayee is here!!!";
					that.queue.add({fn: function(message) {
						Utils.alert("AsyncQueue/constructor/add - message: "+message);
					}, args: [message], id: "expandObject" });*/
				  //that.addMessage("Xjamayee is here!!!");
					//RUN!
				  //that.queue.run();
				}
			});
			this.connect();				
		} catch(error) {
			Utils.alert("AsyncQueue/constructor Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		}
	},
	//Getters & Setters
	getQueue: function() {
		var result = null;
		if (this.queue !== undefined) {
			result = this.queue;
		}
		return result;
	},
	//Functions
	connect: function() {
		//sforce.debug.trace = true;	
		sforce.connection.login(AsyncQueue.USERNAME, AsyncQueue.PASSWORD);
	},
	promote: function(id) {
		try {
			var q = this.getQueue();
			q.promote(id);
		} catch(error) {
			Utils.alert("AsyncQueue/promote Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return this;
		}
	},
	addMessage: function(message) {
		try {
			var q = this.getQueue();
			q.add({fn: function(message) {
				Utils.alert("AsyncQueue/addMessage - message: "+message);
			}, args: [message], id: "showMessage" });
		} catch(error) {
			Utils.alert("AsyncQueue/addMessage Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return this;
		}
	},
	addExpandObject: function(object) {
		try {
			var q = this.getQueue();
			q.add({fn: function(object) {
				//object.getSfdcObject();
				if (object.getId() == 3) { Utils.alert("AsyncQueue/add - before ... object/name: "+object.getName()); }
			}, args: [object], id: "expandObject" });
		} catch(error) {
			Utils.alert("AsyncQueue/addExpandObject Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return this;
		}
	},
	addExpandType: function(id) {
		try {
			var q = this.getQueue();
			q.add({fn: function(id) {
				var type = _tc.getTypeExpanded(id);
			  var fieldNamesText = "";
			  var fieldNames = type.getFieldNames();
			  for (var i in fieldNames) {
					if (fieldNames[i]) {
						fieldNamesText += fieldNames[i]+"\n";
					}
			  }
			/*alert("AsyncQueue/addExpandType type/name: "+type.getName()+
							"\nlength: "+fieldNames.length+
				      "\nfieldNames:\n"+fieldNamesText);*/
			}, args: [id], id: "expandType" });
		} catch(error) {
			Utils.alert("AsyncQueue/addExpandType Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return this;
		}
	},
	/*
	// Send the asynchronous XHR
	Y.io(MyApp.getDataUri(), { on: {
	    success : function (xid,o) {
	        try {
	            var data = Y.JSON.parse(o.responseText);
	        }
	        catch (e) {
	            MyApp.showErrorStatus();
	            q.stop();
	        }

	        MyApp.processData(data);

	        // In the XHR callback, restart the AsyncQueue if successful
	        q.run();
	    },
	    failure : function () {
	        MyApp.showErrorStatus();
	        // Stop the AsyncQueue if anything goes wrong
	        q.stop();
	    }
	}});
	*/
/*	
	addExpandEntity: function(id,name,timeout,asynchronous) {
		try {
			var q = this.getQueue();
			if ((asynchronous === undefined) || (asynchronous === null) || (asynchronous === false)) {
				//Pause queue!
				q.pause();
			}
			q.add({fn: function(id,name) {
				AsyncQueue.connect();
				var eText = '';
				if (id !== null) {
	  			eText = sforce.apex.execute('sja.EntityService','getEntityExpandedById',{id:id }); //typeExpansion !!!
				} else if (name !== null) {
	  			eText = sforce.apex.execute('sja.EntityService','getEntityExpandedByName',{name:name }); //typeExpansion !!!
				}
				//var e = eval('(' + eText + ')');
				var e = Utils.eval(eText,true);
		    var entity = new Entity(e.entity.id,e.entity.name,e.entity.type,e.entity.desc,e.entity.mei,e.entity.oid,e.firstAttributes,e.references);
				entity.setAttributeValues(e.attributeValues); //NOK ???
				entity.setExpanded(true);
				_ec.put(entity);
	  		var attributesText = "";
	  		var attributes = entity.getAttributes();
	  		for (var i in attributes) {
					if (attributes[i]) {
						attributesText += attributes[i].n+": "+attributes[i].v+"\n";
					}
				}
	**
				Utils.alert("AsyncQueue/addExpandEntity"+
			     		"\nid: "+entity.getId()+
							"\nname: "+entity.getName()+
							"\nlength: "+attributes.length+
		      		"\nattributes:\n"+attributesText);
	**
			}, args: [id,name ], id: "expandEntity" });
			var _timeout = q.defaults.timeout;		
			if ((timeout !== undefined) || (timeout !== null)) {
				_timeout = timeout;
			}
			if ((asynchronous === undefined) || (asynchronous === null) || (asynchronous === false)) {			
				_timeout = AsyncQueue.SYNCHRONOUS;
			}
			//Resume queue!
			q.run(_timeout);
		} catch(error) {
			Utils.alert("AsyncQueue/addExpandEntity Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return this;
		}
	},
*/
	run: function(timeout) {
		try {
			var _timeout = ((timeout === undefined) || (timeout === null))?AsyncQueue.SYNCHRONOUS:timeout;		
			var q = this.getQueue();
			if (q) {
				if (timeout !== undefined) {
					q.defaults.timeout = _timeout;
				}
				q.run();
				Utils.alert("AsyncQueue/run/running...");
			}
		} catch(error) {
			Utils.alert("AsyncQueue/run Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return this;
		}
	},
	print: function(html,keysOnly) {
		var _html = ((html !== undefined) && (html !== null))?html:false;
		var _keysOnly = ((keysOnly !== undefined) && (keysOnly !== null))?keysOnly:false;
		var _nl = (_html)?'<br/>':'\n';
		var result = 'AsyncQueue:'+_nl;
		try {
			result += this.parent();
		} catch(error) {
			Utils.alert("AsyncQueue/print Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	}	
});
//Statics
AsyncQueue.USERNAME = "%usn%";
AsyncQueue.PASSWORD = "%pwd%";
AsyncQueue.SYNCHRONOUS = -1;

//Abstract
//Class: Command
var Command = new Class({
	Extends: SjamayeeBase,
	initialize: function(name) {
		try {
			this.parent();
			this.setName(name);
		} catch(error) {
			Utils.alert("Command/constructor Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		}
	},
	//Getters & Setters
	getId: function() {
		var result = null;
		if (this.id !== undefined) {
			result = this.id;
		}
		return result;
	},
	setId: function(id) {
		if (id !== null) {
			this.id = id;
		}
		return this;
	},
	getName: function() {
		var result = null;
		if (this.name !== undefined) {
			result = this.name;
		}
		return result;
	},
	setName: function(name) {
		if (name !== null) {
			this.name = name;
		}
		return this;
	},
	getSourceName: function() {
		var result = null;
		if (this.sourceName !== undefined) {
			result = this.sourceName;
		}
		return result;
	},
	setSourceName: function(sourceName) {
		if (sourceName !== null) {
			this.sourceName = sourceName;
		}
		return this;
	},
	getGroupName: function() {
		var result = null;
		var sourceName = this.getSourceName();
		if (sourceName !== null) {
			if (this.getGroupId()) {
				result = sourceName.substr(0,3)+"_"+this.getGroupId();
			} else {
				result = sourceName;
			/*var s = sourceName.split("/");
				if (s.length > 1) {
					result = s[0];
				}*/
				var s = sourceName.split("/");
				if (s.length > 0) {
					result = s[0];
				}			
			}
		}
		return result;
	},
	getSnapShot: function() {
		var result = null;
		if (this.snapShot !== undefined) {
			result = this.snapShot;
		}
		return result;
	},
	setSnapShot: function(snapShot) {
		if (snapShot !== null) {
			this.snapShot = snapShot;
		}
		return this;
	},
	setPosition: function(position) {
		if (position) {
	 		this.position = position.clone();
		}
	  return this;
	},
	getPosition: function() {
		var result = null;
		if (this.position !== undefined) {
			result = this.position;
		}
	  return result;
	},
	setNivo: function(nivo) {
		if (nivo !== null) {
	  	this.nivo = nivo;
		}
	  return this;
	},
	getNivo: function() {
		var result = Position.NIVO_ROOT();
		if (this.nivo !== undefined) {
			result = this.nivo;
		}
	  return result;
	},
	getUnDone: function() {
		var result = false;
		if ((this.unDone !== undefined) && (this.unDone !== null)) {
			result = this.unDone;
		}
		return result;
	},
	setUnDone: function(unDone) {
		if (unDone !== null) {
			this.unDone = unDone;
		}
		return this;
	},
	isDone: function() {
		//return ((this.getName() == Command.CKP)?false:(this.getUnDone() === false));
		//return ((this.getName() in Utils.arrayHash([Command.CKP,Command.NAV]))?false:(this.getUnDone() === false));
		var result = false;
		if (this.getName() == Command.CKP) {
			result = false;
		} else if (this.getName() == Command.NAV) {
			result = true;
		} else {
			result = (this.getUnDone() === false);
		}
		return result;
	},
	isUnDone: function() {
		//return ((this.getName() == Command.CKP)?false:(this.getUnDone() === true));
		//return ((this.getName() in Utils.arrayHash([Command.CKP,Command.NAV]))?false:(this.getUnDone() === true));
		var result = false;
		if (this.getName() == Command.CKP) {
			result = false;
		} else if (this.getName() == Command.NAV) {
			result = true;
		} else {
			result = (this.getUnDone() === true);
		}
		return result;
	},
	getGroupId: function() {
		var result = null;
	/*if (this.groupId !== undefined) {
			result = this.groupId;
		}*/
		var sourceName = this.getSourceName();
		if (sourceName !== null) {
			var s = sourceName.split("_");
			if (s.length > 1) {
				var s1 = s[1];
				if (s1) {
					var groupId = s1;
					var g = s1.split("/");
					if (g.length > 1) {
						groupId = g[0];
					}
					result = groupId;
				}
			}			
		}
		return result;
	},
	//Functions
	//Abstract
	clone: function() {
		return undefined;
	},
	inSameGroup: function(command) {
		var result = false;
		try {
			if (command) {
				var groupName1 = this.getGroupName();
				if (groupName1) {
					if (groupName1.substr(0,3) != Command.GRP) {
						groupName1 = this.getSourceName();
					}			
					var groupName2 = command.getGroupName();
					if (groupName2) {
						if (groupName2.substr(0,3) != Command.GRP) {
							groupName2 = command.getSourceName();
						}
						result = (groupName1 == groupName2);
					}
				}			
			}
		} catch(error) {
			Utils.alert("Command/inSameGroup Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	},
	getSeq1Id: function() {
		var result = "0";
		var sourceName = this.getSourceName();
		if (sourceName !== null) {
			var s = sourceName.split("/");
			if (s.length > 1) {
				//Split x.y => x = seq1Id / y = seq2Id
				result = s[1];
				var r = result.split(".");
				if (r.length > 1) {
					result = r[0];
				}				
			}
		}
		if (result == "0") {
			result = this.getId();
		}
		return result;
	},
	getSeq2Id: function() {
		var result = "0";
		var sourceName = this.getSourceName();
		if (sourceName !== null) {
			var s1 = sourceName.split("/");
			if (s1.length > 1) {
				//Split x.y => x = seq1Id / y = seq2Id
				result = s1[1];
				var r = result.split(".");
				if (r.length > 1) {
					result = r[1];
				}				
			}
		}
		return result;
	},
	print: function(html,keysOnly) {
		var _html = ((html !== undefined) && (html !== null))?html:false;
		var _keysOnly = ((keysOnly !== undefined) && (keysOnly !== null))?keysOnly:false;
		var _nl = (_html)?'<br/>':'\n';
		var result = 'Command:'+_nl;
		try {
			result += this.parent();
		} catch(error) {
			Utils.alert("Command/print Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	}
});
//Statics
Command.CHAR_INITIAL = "&nbsp;"; //Initial space
Command.CHAR_A = "A"; 			//Add
Command.CHAR_a = "a"; 			//add
Command.CHAR_C = "C"; 			//Copy
Command.CHAR_c = "c"; 			//copy
Command.CHAR_E = "E"; 			//Edit
Command.CHAR_e = "e"; 			//edit
Command.CHAR_N = "&nbsp;";  //"N"; 			//Navigate
//Command.CHAR_n = "&nbsp;";	//nav = space 
//Command.CHAR_n = null;			//nav = null 
Command.CHAR_n = "n";				//navigate
Command.CHAR_T = "T"; 			//exTract
Command.CHAR_t = "t"; 			//extract
Command.CHAR_V = "&nbsp;";  //"V"; 			//Paste
Command.CHAR_v = "&nbsp;";  //"v"; 			//paste
Command.CHAR_X = "X"; 			//Delete
Command.CHAR_x = "x"; 			//delete
Command.CHAR_Z = "Z"; 			//Z..
///////////////////////////////////////////////////
//      Real Commands: ADD,DEL,EDT,EXT,CPY 			 //
//    Unreal Commands: PST								 			 //
//   Virtual Commands: GRP,UND,RDO				 			 //
//CheckPoint Commands: CKP								 			 //
//      Root Commands: ROOT 							 			 //
//Navigation Commands: NAV - enter,space,click,  //
//													 up,down,left,right, //
//													 top,bottom,home,end //
///////////////////////////////////////////////////
//Real Commands (works on the grid or takes info from the grid)
Command.ADD  = "ADD";		//Add relation and save a copy in the copy_buffer.
Command.CPY  = "CPY";		//Copy relation into copy_buffer.
Command.DEL  = "DEL";		//Delete relation and save a copy in the copy_buffer.
Command.EDT  = "EDT";		//Edit relation and save a copy in the copy_buffer.
Command.EXT  = "EXT";		//Extract relation (child relations) into the copy_buffer.
//Unreal Commands (works with the result of the real commands)
Command.PST  = "PST";		//Paste content (relations) from copy_buffer.
//Virtual Commands (these commands are not stored in the commandBuffer)
Command.GRP  = "GRP";		//Group command.
Command.RDO  = "RDO";		//Redo commands from redo_buffer.
Command.UDO  = "UDO";		//Undo commands from redo_buffer.
//CheckPoint Commands (creates removable chunks in the commandBuffer)
Command.CKP	 = "CKP";		//Checkpoint for clean-up of commands from buffers.
//Root Commands (keeps history of the root switches with snapshots of the grid)
Command.ROOT = "ROOT";	//Switch root.
//Navgation commands (works on the grid and the other lists - objects,attributes)
//these commands are wiped-out by the commands (ADD,CPY,DEL,EDT,EXT,PST).
Command.NAV = "NAV";
//Command.NOOP = "NOOP";

//Class: ObjectCommand
var ObjectCommand = new Class({
	Extends: Command,
	initialize: function(name) {
		try {
			this.parent();
			this.setName(name);
		} catch(error) {
			Utils.alert("ObjectCommand/constructor Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		}
	},
	//Getters & Setters
	getObject: function() {
		var result = null;
		if (this.object !== undefined) {
			result = this.object;
		}
		return result;
	},
	setObject: function(object) {
		if (object) {
			this.object = object;
		}
		return this;
	},
	//Functions
	clone: function() {
		var result = null;
		try {
			result = new ObjectCommand(this.getName());
			if (result) {
		  	var properties = Utils.eval(this,false); //true);
			  if (properties) {
	        for (var key in properties) {
	          result[key] = properties[key];
					}
				}
			}
		} catch(error) {
			Utils.alert("ObjectCommand/clone Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	}
});
//Statics
ObjectCommand.test = function() {
	var command = null;
	try {
		command = new ObjectCommand(Command.ADD);
	} catch(error) {
		Utils.alert("ObjectCommand/test Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	} finally {
		return "ObjectCommand/test\n"+command.print();
	}
};

//Class: RelationCommand
var RelationCommand = new Class({
	Extends: Command,
	initialize: function(name) {
		try {
			this.parent();
			this.setName(name);
		} catch(error) {
			Utils.alert("RelationCommand/constructor Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		}
	},
	//Getters & Setters
	getRelation: function() {
		var result = null;
		if (this.relation !== undefined) {
			result = this.relation;
		}
		return result;
	},
	setRelation: function(relation,noCloning) {
		if (relation) {
			var _relation = relation;
			if ((noCloning !== undefined) && (noCloning === true)) {
				_relation = relation.clone();
			}
			this.relation = _relation;
		}
		return this;
	},
	getRelationFrom: function() {
		var result = null;
		if (this.relationFrom !== undefined) {
			result = this.relationFrom;
		}
		return result;
	},
	setRelationFrom: function(relationFrom) {
		if (relationFrom) {
			this.relationFrom = relationFrom;
		}
		return this;
	},
	//Functions
	clone: function() {
		var result = null;
		try {
			result = new RelationCommand(this.getName());
			if (result) {
		  	var properties = Utils.eval(this,false); //true);
			  if (properties) {
	        for (var key in properties) {
	          result[key] = properties[key];
					}
				}
			}
		} catch(error) {
			Utils.alert("RelationCommand/clone Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	},
	print: function(html,keysOnly) {
		var _html = ((html !== undefined) && (html !== null))?html:false;
		var _keysOnly = ((keysOnly !== undefined) && (keysOnly !== null))?keysOnly:false;
		var _nl = (_html)?'<br/>':'\n';
		var result = 'RelationCommand:'+_nl;
		try {
			result += this.parent();
		} catch(error) {
			Utils.alert("RelationCommand/print Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	}
});
//Statics
RelationCommand.test = function() {
	var command = null;
	try {
		command = new RelationCommand(Command.ADD);
	} catch(error) {
		Utils.alert("RelationCommand/test Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	} finally {
		return "RelationCommand/test\n"+command.print();
	}
};

//Class: RootCommand
var RootCommand = new Class({
	Extends: RelationCommand,
	initialize: function() {
		try {
			this.parent(Command.ROOT);
		//this.setName(Command.ROOT);
		} catch(error) {
			Utils.alert("RootCommand/constructor Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		}
	},
	//Functions
	clone: function() {
		var result = null;
		try {
			result = new RootCommand();
			if (result) {
		  	var properties = Utils.eval(this,false); //true);
			  if (properties) {
	        for (var key in properties) {
	          result[key] = properties[key];
					}
				}
			}
		} catch(error) {
			Utils.alert("RootCommand/clone Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	}
});
//Statics
RootCommand.test = function() {
	var command = null;
	try {
		command = new RootCommand();
	} catch(error) {
		Utils.alert("RootCommand/test Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	} finally {
		return "RootCommand/test\n"+command.print();
	}
};

//Class: NavigationCommand
var NavigationCommand = new Class({
	Extends: RelationCommand,
	initialize: function() {
		try {
			this.parent(Command.NAV);
		//this.setName(Command.NAV);
		} catch(error) {
			Utils.alert("NavigationCommand/constructor Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		}
	},
	//Getters & Setters
	getList: function() {
		var result = null;
		if (this.list !== undefined) {
			result = this.list;
		}
		return result;
	},
	setList: function(list) {
		if (list) {
			this.list = list;
		}
		return this;
	},
	getNavigation: function() {
		var result = null;
		if (this.navigation !== undefined) {
			result = this.navigation;
		}
		return result;
	},
	setNavigation: function(navigation) {
		if (navigation) {
			this.navigation = navigation;
		}
		return this;
	},
	//Functions
	clone: function() {
		var result = null;
		try {
			result = new NavigationCommand();
			if (result) {
		  	var properties = Utils.eval(this,false); //true);
			  if (properties) {
	        for (var key in properties) {
	          result[key] = properties[key];
					}
				}
			}
		} catch(error) {
			Utils.alert("NavigationCommand/clone Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	},
	print: function(html,keysOnly) {
		var _html = ((html !== undefined) && (html !== null))?html:false;
		var _keysOnly = ((keysOnly !== undefined) && (keysOnly !== null))?keysOnly:false;
		var _nl = (_html)?'<br/>':'\n';
		var result = 'NavigationCommand:'+_nl;
		try {
			result += this.parent();
		} catch(error) {
			Utils.alert("NavigationCommand/print Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	}	
});
//Statics
NavigationCommand.NAV_ENTER = 1;
NavigationCommand.NAV_SPACE = 2;
NavigationCommand.NAV_CLICK = 3;
NavigationCommand.NAV_UP = 4;
NavigationCommand.NAV_DOWN = 5;
NavigationCommand.NAV_LEFT = 6;
NavigationCommand.NAV_RIGHT = 7;
NavigationCommand.NAV_PUP = 8;
NavigationCommand.NAV_PDN = 9;
NavigationCommand.NAV_TOP = 10;
NavigationCommand.NAV_BOTTOM = 11;
NavigationCommand.NAV_HOME = 12;
NavigationCommand.NAV_END = 13;
NavigationCommand.MAX_REMEMBERED = 5; //100;
NavigationCommand.INSERT_ASC = "insertAscending";
NavigationCommand.INSERT_DSC = "insertDescending";
NavigationCommand.test = function() {
	var command = null;
	try {
		command = new NavigationCommand();
	} catch(error) {
		Utils.alert("NavigationCommand/test Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	} finally {
		return "NavigationCommand/test\n"+command.print();
	}
};

//Class: CheckPointCommand
var CheckPointCommand = new Class({
	Extends: Command,
	initialize: function() {
		try {
			this.parent(Command.CKP);
		} catch(error) {
			Utils.alert("CheckPointCommand/constructor Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		}
	},
	//Getters & Setters
	//Functions
	clone: function() {
		var result = null;
		try {
			result = new CheckPointCommand();
			if (result) {
		  	var properties = Utils.eval(this,false); //true);
			  if (properties) {
	        for (var key in properties) {
	          result[key] = properties[key];
					}
				}
			}
		} catch(error) {
			Utils.alert("CheckPointCommand/clone Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	},
	print: function(html,keysOnly) {
		var _html = ((html !== undefined) && (html !== null))?html:false;
		var _keysOnly = ((keysOnly !== undefined) && (keysOnly !== null))?keysOnly:false;
		var _nl = (_html)?'<br/>':'\n';
		var result = 'CheckPointCommand:'+_nl;
		try {
			result += this.parent();
		} catch(error) {
			Utils.alert("CheckPointCommand/print Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	}
});
//Statics
CheckPointCommand.test = function() {
	var command = null;
	try {
		command = new CheckPointCommand();
	} catch(error) {
		Utils.alert("CheckPointCommand/test Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	} finally {
		return "CheckPointCommand/test\n"+command.print();
	}
};

//Class: Position
var Position = new Class({
	Extends: SjamayeeBase,
	initialize: function(row,column) {
	  try {
			var _row = ((row !== undefined) && (row !== null))?row:Position.ROW_ROOT();
			var _column = ((column !== undefined) && (column !== null))?column:Position.COLUMN_ROOT();
			this.parent();
	    this.setRow(_row);
	    this.setColumn(_column);
	  } catch(error) {
			Utils.alert("Position/constructor Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	  }
	},
	//Getters & Setters
	initial: function() {
	  var result = false;
	  try {
	    if ((this.getRow() == Position.ROW_TOP()) && (this.getColumn() == Position.COLUMN_FIRST())) {
	      result = true;
	    }
	  } catch(error) {
			Utils.alert("Position/initial Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	  } finally {
	    return result;
	  }
	},
	setRow: function(row) {
		if (row !== null) {
	  	this.row = row;
		}
	  return this;
	},
	getRow: function() {
	  return Number(this.row);
	},
	setColumn: function(column) {
		if (column !== null) {
	  	this.column = column;
		}
	  return this;
	},
	getColumn: function() {
	  return Number(this.column);
	},
	setGridViewColumn: function(gridViewColumn) {
		if (gridViewColumn) {
	  	this.gridViewColumn = gridViewColumn;
		}
	  return this;
	},
	getGridViewColumn: function() {
	  return this.gridViewColumn;
	},
	//Functions
	clone: function() {
		var result = null;
		try {
			result = new Position(this.getRow(),this.getColumn());
			if (result) {
		  	var properties = Utils.eval(this,false); //true);
			  if (properties) {
	         for (var key in properties) {
	           result[key] = properties[key];
					}
				}
			}
		} catch(error) {
			Utils.alert("Position/clone Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	},
	init: function() {
	  try {
	    this.setRow(Position.ROW_TOP());
	    this.setColumn(Position.COLUMN_FIRST());
	  } catch(error) {
			Utils.alert("Position/init Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	  }
	},
	//ID
	id: function() {
	//return ("c"+this.getRow()+this.getColumn());
		return (Grid.CELL_ANCHOR_ID+this.getRow()+this.getColumn());
	},
	//Nivo
	getNivo: function() {
	  var result = Position.NIVO_ROOT();
	  try {
	  	result = this.getCurrentNivo();
	  } catch(error) {
			Utils.alert("Position/getNivo Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	  } finally {
	    return result;
	  }
	},
	//////////////////////////////////
	//TODO: *** Change to whatever !!!
	//////////////////////////////////
	//CurrentNivo
	getCurrentNivo: function() {
	  var result = (Position.NIVO_ROOT() + 1);
	  try {
	    result = _grid.getCurrentNivo();
	  } catch(error) {
			Utils.alert("Position/getCurrentNivo Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	  } finally {
	    return result;
	  }
	},
	isEqual: function(position) {
		var _position = (position !== undefined)?position:null;
		var result = false;
	  try {
			if (_position) {
				result = ((this.getRow() == _position.getRow()) &&
									(this.getColumn() == _position.getColumn()));
			}
	  } catch(error) {
			Utils.alert("Position/isEqual Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	  } finally {
	    return result;
	  }
	},
	/////////////////////////////////////
	//LEFT & RIGHT !!!!!ONLY !!! REDO !!!
	/////////////////////////////////////
	isRoot: function() {
	  return ((this.getRow() == Position.ROW_ROOT()) &&
	          (this.getColumn() == Position.COLUMN_ROOT()));      
	},
	root: function() {
	  try {
	  /*
	  //REFACTOR THIS !!! Grid5/6/7/8 !!!
	  //var nivoBase = SjamayeeForm.getNivoBase();   // *** NOK ***
	    var columnRoot = Position.COLUMN_ROOT();
	    if (document.getElementById(SjamayeeForm.GRID_COLUMNS_ID)) {
	      var gridColumns = RelationsForm.getGridColumns();
	      if (gridColumns) {
	        if (Math.abs(nivoBase) < 8) {
	          if (gridColumns == 6)                 { columnRoot = Position.COLUMN_ROOT() + 1; }
	          if (gridColumns == 7)                 { columnRoot = Position.COLUMN_ROOT() + 2; }
	          if (gridColumns == 8)                 { columnRoot = Position.COLUMN_ROOT() + 3; }
	          if (nivoBase == Position.NIVO_ROOT()) { columnRoot = Position.COLUMN_ROOT() - 3; }
	          if (nivoBase == -1)                   { columnRoot = Position.COLUMN_ROOT() - 2; }
	          if (nivoBase == -2)                   { columnRoot = Position.COLUMN_ROOT() - 1; }
	          if (nivoBase == -7)                   { columnRoot = Position.COLUMN_ROOT() + 4; }
	        }
	      }
	    }
	  */
	    var nivoBase = Position.NIVO_COLUMN_FIRST();
	    var gridColumns = Position.COLUMNS_WHERE_USED() + 2;
	    var gridView = _grid.getGridView();
	    if (gridView) {
	      nivoBase = gridView.getNivoBase();
	      gridColumns = gridView.getNbrOfColumns();
	    }    
	    var columnRoot = Position.COLUMN_ROOT();
	    if (Math.abs(nivoBase) < 8) {
	      if (gridColumns == 6)                 { columnRoot = Position.COLUMN_ROOT() + 1; }
	      if (gridColumns == 7)                 { columnRoot = Position.COLUMN_ROOT() + 2; }
	      if (gridColumns == 8)                 { columnRoot = Position.COLUMN_ROOT() + 3; }
	      if (nivoBase == Position.NIVO_ROOT()) { columnRoot = Position.COLUMN_ROOT() - 3; }
	      if (nivoBase == -1)                   { columnRoot = Position.COLUMN_ROOT() - 2; }
	      if (nivoBase == -2)                   { columnRoot = Position.COLUMN_ROOT() - 1; }
	      if (nivoBase == -7)                   { columnRoot = Position.COLUMN_ROOT() + 4; }
	    }
	    this.setRow(Position.ROW_ROOT());
	    this.setColumn(columnRoot);
	  } catch(error) {
			Utils.alert("Position/root Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	  } finally {
	    return this;
	  }
	},
	whatUsed: function() {
	  try {
	    this.setRow(Position.ROW_TOP());
	    this.setColumn(Position.COLUMN_WHAT_FIRST());
	  } catch(error) {
			Utils.alert("Position/whatUsed Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	  } finally {
	    return this;
	  }
	},
	whereUsed: function() {
	  try {
	    this.setRow(Position.ROW_TOP());
	    this.setColumn(Position.COLUMN_WHERE_FIRST());
	  } catch(error) {
			Utils.alert("Position/whereUsed Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	  } finally {
	    return this;
	  }
	},
	//Home: (first column/selection)
	home: function() {
	  // try {
	  // //var homePosition = SjamayeeForm.getHomePosition();
	  // //goHome();
	  // } catch(error) {
	  //   Utils.alert("Position/home Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	  // }
	},
	//Page-up.
	pup: function() {
	  try {
	    if (this.nivo() != Position.NIVO_ROOT()) {
	      if (this.getRow() > Position.ROW_TOP()) {
	        //CALL SERVER !!!
	        return this;
	      } else { Utils.beep(0); }
	    } else { Utils.beep(0); }
	  } catch(error) {
			Utils.alert("Position/pup Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	  } finally {
			return this;
	  }
	},
	//Page-down.
	pdown: function() {
	  try {
	    if (this.nivo() != Position.NIVO_ROOT()) {
	      if (this.getRow() > Position.ROW_TOP()) {
	        //CALL SERVER !!!
	        return this;
	      } else { Utils.beep(0); }
	    } else { Utils.beep(0); }
	  } catch(error) {
			Utils.alert("Position/pdown Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	  } finally {
			return this;
	  }
	},
	//Up: (1 row/column).
	up: function() {
	  try {
	    var cr = this.getRow();
	    //var cc = this.getColumn();
	    if (cr > Position.ROW_TOP()) {
	      cr--;
	      this.setRow(cr);
	    }
	  } catch(error) {
			Utils.alert("Position/up Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	  } finally {
			return this;
		}
	},
	//Left Top.
	leftTop: function() {
	  try {
	    this.setRow(Position.ROW_TOP());
	    this.setColumn(Position.COLUMN_FIRST());
	  } catch(error) {
			Utils.alert("Position/leftTop Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	  } finally {
			return this;
	  }
	},
	//Left: (1 column)
	left: function(savedCell) {
	  try {
	    var nivo = this.getNivo();
			if (nivo == Position.NIVO_ROOT()) {
			//alert("Position/left - ROOT");
				this.root();
			} else {
	    	this.setRow(Position.ROW_TOP());
				if (nivo <= Position.NIVO_ROOT()) {
			    var cc = this.getColumn();
		   		if (cc > Position.COLUMN_FIRST()) {
		     		cc--;
		   		} else {
		     		cc = Position.COLUMN_FIRST();
					}
			    this.setColumn(cc);
				}
				if ((savedCell !== undefined) && (savedCell !== null)) {
					var p = savedCell.getPosition();
					if (p) {
						this.setRow(p.getRow());
					}  
				}
	    }
		//alert("Position/left - nivo: "+nivo+" position: "+this.print());
	  } catch(error) {
			Utils.alert("Position/left Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	  } finally {
			return this;
	  }
	},
	//Right Top.
	rightTop: function() {
	  try {
	    this.setRow(Position.ROW_TOP());
	    var gridColumns = RelationsForm.getGridColumns();
	    if (gridColumns > this.getColumn()) {
	      this.setColumn(gridColumns);
	    }
	  } catch(error) {
			Utils.alert("Position/rightTop Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	  } finally {
			return this;
	  }
	},
	//Right: (1 column)
	right: function(savedCell) {
	  try {
	    var nivo = this.getNivo();
			if (nivo == Position.NIVO_ROOT()) {
			//alert("Position/right - ROOT");
				this.root();
			} else {
	    	this.setRow(Position.ROW_TOP());
				if (nivo > Position.NIVO_COLUMN_FIRST()) { 
			    var lastColumn = (Position.COLUMN_LAST() - 3); // 4(0,1,2,3,4)
			    var cc = this.getColumn();
		   		if (cc < lastColumn) {
		     		cc++;
		   		} else {
		     		cc = lastColumn;
					}
			    this.setColumn(cc);
				}
				if ((savedCell !== undefined) && (savedCell !== null)) {
				  var p = savedCell.getPosition();
					if (p) {
						this.setRow(p.getRow());
					}  
				}
	    }
		//alert("Position/right - nivo: "+nivo+" position: "+this.print());
	  } catch(error) {
			Utils.alert("Position/right Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	  } finally {
			return this;
	  }
	},
	//Down: (1 row/column)
	down: function() {
	  try {
	    var cr = this.getRow();
	  //var cc = this.getColumn();
	  //Utils.alert("position/down cr/cc "+cr+"/"+cc);
	    if (cr < Position.ROW_BOTTOM()) {
	      cr++;
	      this.setRow(cr);
	    }
	  } catch(error) {
			Utils.alert("Position/down Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	  } finally {
			return this;
	  }
	},
	//End: Last column (last column/selection).
	end: function() {
	  //TODO: last row/column !!!
	//var endPosition = SjamayeeForm.getEndPosition();
	//goEnd();
	},
	//Display current selection (ESC/Escape)
	display: function() {
	  // try {
	  // /*var gridMatrix = rf.getGridView().matrix;
	  //   Utils.alert("Position: row=" + this.getRow() + " / column=" + this.getColumn() + "\n" +
	  //               "VALUE = " + document.getElementById(this.id()).innerHTML + "\n" +
	  //               "ID = " + this.id() + "\n" +
	  //               "NIVO = " + this.nivo() + "\n" +
	  //               "Base = " + SjamayeeForm.getNivoBase() + "\n" +     // *** NOK ***
	  //               "Home : nivo = " + SjamayeeForm.getHomeNivo() +
	  //                 " position = " + SjamayeeForm.getHomePosition() + "\n" +
	  //               "-End : nivo = " + SjamayeeForm.getEndNivo() +
	  //                 " position = " + SjamayeeForm.getEndPosition() + "\n" +
	  //               "-WhereCurrent:" + whereCurrent + "\n" +
	  //               "--WhatCurrent:" + whatCurrent + "\n" +
	  //               " MATRIX: (10*8)\n" +
	  //               "- 12345678\n" +
	  //               "0 " + gridMatrix.substring(0,8) + "\n" +
	  //               "1 " + gridMatrix.substring(8,16) + "\n" +
	  //               "2 " + gridMatrix.substring(16,24) + "\n" +
	  //               "3 " + gridMatrix.substring(24,32) + "\n" +
	  //               "4 " + gridMatrix.substring(32,40) + "\n" +
	  //               "5 " + gridMatrix.substring(40,48) + "\n" +
	  //               "6 " + gridMatrix.substring(48,56) + "\n" +
	  //               "7 " + gridMatrix.substring(56,64) + "\n" +
	  //               "8 " + gridMatrix.substring(64,72) + "\n" +
	  //               "9 " + gridMatrix.substring(72,80));*/
	  // } catch(error) {
	  //   Utils.alert("Position/display Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	  // }
	},
	storeJson: function() {
	  var result = '';
	  try {
	    result = '{';
	    result += '"sid":"'+this.getSid()+'"';
	    result += ',"row":"'+this.getRow()+'"';
	    result += ',"column":"'+this.getColumn()+'"';
	    var gridId = 'null';
	    gridId = _grid.getSid();
	    result += ',"gridId":"'+gridId+'"';
		  var gridViewColumnId = 'null';
	    var gridViewColumn = this.getGridViewColumn();
	    if (gridViewColumn) {
				gridViewColumnId = gridViewColumn.getSid();
			}
	    result += ',"gridViewColumnId":"'+gridViewColumnId+'"';
	    result += '}';
	  } catch(error) {
			Utils.alert("Position/storeJson Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	  } finally {
	  //SjamayeeForm.putBySid(this);
	    return result;
	  }
	},
	print: function(html,keysOnly) {
		var _html = ((html !== undefined) && (html !== null))?html:false;
		var _keysOnly = ((keysOnly !== undefined) && (keysOnly !== null))?keysOnly:false;
		var _nl = (_html)?'<br/>':'\n';
		var result = 'Position:'+_nl;
		try {
			result += this.parent();
	  } catch(error) {
			Utils.alert("Position/print Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	  } finally {
	    return result;
	  }
	}	
});
//Statics
/************************************************
//Position.ROW_TOP = 0;
//Position.ROW_ROOT = 4;
//Position.ROW_BOTTOM = 9;
//Position.COLUMN_FIRST = 0;
//Position.NIVO_ROOT = 0;
//Position.COLUMNS_WHERE_USED = 3;
//Position.COLUMNS_WHAT_USED = 4;     //New !!!
//Position.WHERE_MAX = -15;
//Position.WHAT_MAX = 25;
//Position.NIVO_COLUMN_FIRST = -3;    //Calculated!
//Position.COLUMN_LAST = 7;           //Calculated!
//Position.COLUMN_WHERE_FIRST = 2;    //Calculated!
//Position.COLUMN_ROOT = 3;           //Calculated!
//Position.COLUMN_WHAT_FIRST = 4;     //Calculated!
//Position.COLUMNS_MAX = 8;           //Calculated!
************************************************/
Position.ROW_TOP = function() {
  return 0;
};
Position.ROW_ROOT = function() {
  return 4;
};
Position.ROW_BOTTOM = function() {
  return 9;
};
Position.COLUMN_FIRST = function() {
  return 0;
};
Position.NIVO_ROOT = function() {
  return 0;
};
Position.COLUMNS_WHERE_USED = function() {
  //return 3;
  var result = 3;
  if (GridView.MAXIMUM_COLUMNS < 5) {
    result = (GridView.MAXIMUM_COLUMNS - 2);
  }
  return result;
};
Position.COLUMNS_WHAT_USED = function() {
  return (GridView.MAXIMUM_COLUMNS - (Position.COLUMNS_WHERE_USED() + 1));
};
Position.WHERE_MAX = function() {
  return -15;
};
Position.WHAT_MAX = function() {
  return 25;
};
Position.NIVO_COLUMN_FIRST = function() {
  return (Position.NIVO_ROOT() - Position.COLUMNS_WHERE_USED());
};
Position.COLUMN_LAST = function() {
  return (Position.COLUMNS_MAX() - 1);
};
Position.COLUMN_WHERE_FIRST = function() {
  return (Position.COLUMN_ROOT() - 1);
};
Position.COLUMN_ROOT = function() {
  //return 3;
  return Position.COLUMNS_WHERE_USED();
};
Position.COLUMN_WHAT_FIRST = function() {
  return (Position.COLUMN_ROOT() + 1);
};
Position.COLUMNS_MAX = function() {
  var result = (Position.COLUMNS_WHERE_USED() + Position.COLUMNS_WHAT_USED() + 1);
  if (result > GridView.MAXIMUM_COLUMNS) {
    result = GridView.MAXIMUM_COLUMNS;
  }
  if (result < 2) { result = 2; }
  return result;
};
Position.ROWS_MAX = function() {
  return (Position.ROW_BOTTOM() + 1);
};
Position.restoreJson = function(jso) {
  var result = null;
  try {
  	if ((jso !== undefined) && (jso !== null)) {
      result = new Position(jso.row,jso.column);
      if (result) {
        result.setSid(jso.sid);
      //SjamayeeForm.putBySid(result);
      /*if (jso.gridId != 'null') {
          var lgrid = SjamayeeForm.getBySid(jso.gridId);
          if (lgrid) {
            result.setGrid(lgrid);
          }
        }
        if (jso.gridViewColumnId != 'null') {
          var gridViewColumn = SjamayeeForm.getBySid(jso.gridViewColumnId);
          if (gridViewColumn) {
            result.setGridViewColumn(gridViewColumn);
          }
        }*/
      }
    }
  } catch(error) {
		Utils.alert("Position/restoreJson Error: "+error.message,Utils.LOG_LEVEL_ERROR);
  } finally {
    return result;
  }
};
Position.test = function() {
  var result = "";
  try {
    var p1 = new Position();
    result += p1.print();
    var p2 = new Position(1,15);
    result += "\n"+p2.print();
    var p3 = new Position(2,15);
    result += "\n"+p3.print();
  } catch(error) {
		Utils.alert("Position/test Error: "+error.message,Utils.LOG_LEVEL_ERROR);
  } finally {
    return result;
  }
};

//Class: CommandBuffer
var CommandBuffer = new Class({
	Extends: SjamayeeBase,
	initialize: function() {
		try {
			this.parent();
			this.buffer = [];
		} catch(error) {
			Utils.alert("CommandBuffer/constructor Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		}
	},
	//Getters & Setters
	getBuffer: function() {
		var result = [];
		if ((this.buffer !== undefined) && (this.buffer !== null)) {
			result = this.buffer;
		}
		return result;
	},
	getLength: function() {
		var result = 0;
		if ((this.buffer !== undefined) && (this.buffer !== null)) {
			result = this.buffer.length;
		}
		return result;
	},
	getNumberDone: function() {
		var result = 0;
		try {
			if (this.isEmpty() === false) {
				for (var i in this.buffer) {
					if (this.buffer[i]) {
						var command = this.buffer[i];
						if (command.isDone() === true) { ++result; }
					}
				}
			}
		} catch(error) {
			Utils.alert("CommandBuffer/getNumberDone Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	},
	getNumberUnDone: function() {
		var result = 0;
		try {
			if (this.isEmpty() === false) {
				for (var i in this.buffer) {
					if (this.buffer[i]) {
						var command = this.buffer[i];
						if (command.isUnDone() === true) { ++result; }
					}
				}
			}
		} catch(error) {
			Utils.alert("CommandBuffer/getNumberUnDone Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	},
	getNumberOfCommands: function(name,unDone) {
		var result = 0;
		try {
			if (this.isEmpty() === false) {
				for (var i in this.buffer) {
					if (this.buffer[i]) {
						var command = this.buffer[i];
						if (command.getName() == name) {
							if (unDone !== null) {
								if (unDone === false) {
									if (command.isDone() === true) { ++result; }
								}
								if (unDone === true) {
									if (command.isUnDone() === true) { ++result; }
								}
							}
						}
					}
				}
			}
		} catch(error) {
			Utils.alert("CommandBuffer/getNumberOfCommands Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	},
	isEmpty: function() {
		return (this.getLength() === 0)?true:false;
	},
	hasDoneCommands: function() {
		return (this.getNumberDone() > 0)?true:false;
	},
	hasUnDoneCommands: function() {
		var result = (this.getNumberUnDone() > 0)?true:false;
		if (result) {
			var unDone = this.getFirstUnDone();
			result = (unDone)?true:false;
		}
		return result;
	},
	hasPastableCommands: function() {
		var result = false;
		try {
			var count = 0;
			count += this.getNumberOfCommands(Command.ADD,false);
			count += this.getNumberOfCommands(Command.DEL,false);
			count += this.getNumberOfCommands(Command.EDT,false);
			count += this.getNumberOfCommands(Command.CPY,false);
			count += this.getNumberOfCommands(Command.EXT,false);
			result = (count > 0)?true:false;
		} catch(error) {
			Utils.alert("CommandBuffer/hasPastableCommands Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	},
	isAscending: function() {
		var result = false;
		try {
			if (this.isEmpty() === false) {
				var cmdFirst = this.buffer[0];
				if (cmdFirst) {
					var cmdFirstLocation = ((cmdFirst.getNivo() * 1000) + (cmdFirst.getPosition().getColumn() * 100) + cmdFirst.getPosition().getRow());
					var cmdLast = this.buffer[(this.getLength() - 1)];
					if (cmdLast) {
						var cmdLastLocation = ((cmdLast.getNivo() * 1000) + (cmdLast.getPosition().getColumn() * 100) + cmdLast.getPosition().getRow());
						result = (cmdFirstLocation < cmdLastLocation)?true:false;
						/*alert("CommandBuffer/isAscending - result: "+result+
						      "\ncmdFirstLocation: "+cmdFirsttLocation+
									"\ncmdLastLocation: "+cmdLastLocation);*/
					}
				}
			}
		} catch(error) {
			Utils.alert("CommandBuffer/isAscending Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	},
	/*
	hasActivePasteCommandsForGroup: function(command) {
		var result = false;
		try {
			if (command) {
				var groupName = command.getGroupName();
				if (groupName.substr(0,3) != Command.GRP) {
					groupName = command.getSourceName();
				}			
				if (groupName) {
					if (this.isEmpty() === false) {
						for (var i in this.buffer) {
							if (this.buffer[i]) {
								var cmd = this.buffer[i];
								//Skip checkpoints!
								if (cmd.getName() == Command.CKP) { continue; }
								var cmdGroupName = cmd.getGroupName();
								if (cmdGroupName.substr(0,3) != Command.GRP) {
									cmdGroupName = cmd.getSourceName();
								}			
								if (cmdGroupName == groupName) {
									if ((cmd.getName() == Command.PST) &&	(cmd.isDone() === true)) {
										result = true;
										break;
									}
								}
							}
						}
					}
				}
			}		
		} catch(error) {
			Utils.alert("CommandBuffer/hasActivePasteCommandsForGroup Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	},
	*/
	//Functions
	getById: function(id) {
		var _id = (id !== undefined)?id:null;
		var result = null;
		try {
			if (_id) {
				if (this.isEmpty() === false) {
					for (var i in this.buffer) {
						if (this.buffer[i]) {
							if (this.buffer[i].getId() == _id) {
								result = this.buffer[i];
								break;
							}
						}
					}
				}		
			}
		} catch(error) {
			Utils.alert("CommandBuffer/getById Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	},
	getByNivoPositionRelation: function(command) {
		var _command = (command !== undefined)?command:null;
		var result = null;
		try {
			if (_command) {
				if (this.isEmpty() === false) {
					//Calculate command location.
					var commandLocation = ((_command.getNivo() * 1000) + (_command.getPosition().getColumn() * 100) + _command.getPosition().getRow());
					for (var i in this.buffer) {
						if (this.buffer[i]) {						
							var cmd = this.buffer[i];
							//Calculate cmd location.
							var cmdLocation = ((cmd.getNivo() * 1000) + (cmd.getPosition().getColumn() * 100) + cmd.getPosition().getRow());
							if (cmdLocation == commandLocation) {
								result = cmd;
								break;
							}
						}
					}
				}		
			}
		} catch(error) {
			Utils.alert("CommandBuffer/getByNivoPositionRelation Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	},
	checkRelation: function(id,nivo) {
		var _id = (id !== undefined)?id:null;
		var _nivo = (nivo !== undefined)?nivo:null;
		//Outputs status of relation in buffer:
		//				 done unDone
		//--------------------
		//  	  Add  	A			 a
		// 	   Copy   C			 c
		// 	 Delete   D			 d
		// 	   Edit   E			 e
		// 	  Paste   P			 p
		//  Extract  	X			 x
		// Navigate 	N			 n
		//--------------------
		var result = null;
		try {
			if (this.isEmpty() === false) {
	      for (var i = (this.buffer.length - 1); i >= 0; i--) {
					if (this.buffer[i]) {
						var command = this.buffer[i];
						//if (!(command instanceof RelationCommand)) { continue; }
						if ((command.getName() != Command.ADD) &&
								(command.getName() != Command.CPY) &&
								(command.getName() != Command.DEL) &&
								(command.getName() != Command.EDT) &&
								(command.getName() != Command.EXT) &&
								(command.getName() != Command.PST) &&
								(command.getName() != Command.NAV)) { continue; }
						var relation = command.getRelation();
						if (relation) {
							if (relation.getId() != _id) { continue; }
						//if (command.getNivo() != _nivo) { continue; }						
							switch (command.getName()) {
								case Command.ADD:
								result = (command.isDone() === true)?Command.CHAR_A:(((!result) || (result == Command.CHAR_N) || (result >= Command.CHAR_a))?Command.CHAR_a:result);
								break;
								case Command.CPY:
								result = (command.isDone() === true)?Command.CHAR_C:(((!result) || (result == Command.CHAR_N) || (result >= Command.CHAR_a))?Command.CHAR_c:result);
								break;
								case Command.DEL:
								result = (command.isDone() === true)?Command.CHAR_X:(((!result) || (result == Command.CHAR_N) || (result >= Command.CHAR_a))?Command.CHAR_x:result);
								break;
								case Command.EDT:
								result = (command.isDone() === true)?Command.CHAR_E:(((!result) || (result == Command.CHAR_N) || (result >= Command.CHAR_a))?Command.CHAR_e:result);
								break;
								case Command.EXT:
								result = (command.isDone() === true)?Command.CHAR_T:(((!result) || (result == Command.CHAR_N) || (result >= Command.CHAR_a))?Command.CHAR_t:result);
								break;
								case Command.PST:
								result = (command.isDone() === true)?Command.CHAR_V:(((!result) || (result == Command.CHAR_N) || (result >= Command.CHAR_a))?Command.CHAR_v:result);
								break;
								case Command.NAV:
								result = (result === null)?(command.isDone()?Command.CHAR_N:Command.CHAR_n):result;
								break;
								default:
								break;
							}
						}
					}
					if (result) {
						if (((result >= Command.CHAR_A) && (result <= Command.CHAR_Z)) && (result != Command.CHAR_N)) {
							break;
						}
					}
				}
			}		
		} catch(error) {
			Utils.alert("CommandBuffer/checkRelation Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	},
	remove: function(command) {
		var _command = (command !== undefined)?command:null;
		var result = null;
		try {
			if (this.isEmpty() === false) {
				for (var i in this.buffer) {
					if (this.buffer[i]) {
						if (this.buffer[i].getId() == _command.getId()) {
							result = this.buffer.splice(i,1);
							if (result.getName() == Command.NAV) {
								if (_cNc > 0) {	_cNc = (_cNc - 1); }
							}						
							break;
						}
					}
				}
			}		
		} catch(error) {
			Utils.alert("CommandBuffer/remove Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	},
	removeGroup: function(command) {
		var _command = (command !== undefined)?command:null;
		var result = [];
		try {
			if (_command) {
				var groupName = _command.getGroupName();
				if (groupName.substr(0,3) != Command.GRP) {
					groupName = _command.getSourceName();
				}			
				if (groupName) {
					while (this.isEmpty() === false) {
						var groupFound = false;
						for (var i in this.buffer) {
							if (this.buffer[i]) {
								var cmd = this.buffer[i];							
								var cmdGroupName = cmd.getGroupName();
								if (cmdGroupName.substr(0,3) != Command.GRP) {
									cmdGroupName = cmd.getSourceName();
								}			
								if (cmdGroupName == groupName) {
									groupFound = true;
									result.push(this.remove(this.buffer[i]));
								}
							}
						}
						if (groupFound === false) { break; }
					}
				}
				result.push(this.remove(command));			
			}		
		} catch(error) {
			Utils.alert("CommandBuffer/removeGroup Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	},
	removeExtGroups: function(command) {
		var _command = (command !== undefined)?command:null;
		var result = [];
		try {
			if (_command) {
				var groupName = null;
				var extractedRelation = _command.getRelation();
				if (extractedRelation) {
					groupName = _command.getGroupName(); //Command.EXT + "_" + command.getGroupId();
				}
				if (groupName) {
					while (this.isEmpty() === false) {
						var groupFound = false;
						for (var i in this.buffer) {
							if (this.buffer[i]) {
								if (this.buffer[i].getGroupName() == groupName) {								
									groupFound = true;
									result.push(this.removeGroup(this.buffer[i]));
								}
							}
						}
						if (groupFound === false) { break; }
					}
				}
				result.push(this.remove(_command));
			}		
		} catch(error) {
			Utils.alert("CommandBuffer/removeExtGroups Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	},
	removePasteCommands: function(command) {
		var _command = (command !== undefined)?command:null;
		try {
			if (_command) {
				var groupName = _command.getGroupName();
				if (groupName) {
					while (this.isEmpty() === false) {
						var cmdFound = false;					
						for (var i in this.buffer) {
							if (this.buffer[i]) {
								var cmd = this.buffer[i];							
								if (cmd.getName() != Command.PST) { continue; }
								if (cmd.getGroupName() == groupName) {
									this.buffer.splice(i,1);
									cmdFound = true;
									break;
								}
							}
						}
						if (cmdFound === false) { break; }					
					}
				}
			}		
		} catch(error) {
			Utils.alert("CommandBuffer/removePasteCommands Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return this;
		}
	},
	getAllCommandsForGroup: function(command) {
		var _command = (command !== undefined)?command:null;
		var result = [];
		try {
			if (_command) {
				var groupName = _command.getGroupName();
				if (groupName.substr(0,3) != Command.GRP) {
					groupName = _command.getSourceName();
				}
				if (groupName) {
					if (this.isEmpty() === false) {
						for (var i in this.buffer) {
							if (this.buffer[i]) {
								var cmd = this.buffer[i];							
								//Skip checkpoints!
								if (cmd.getName() == Command.CKP) { continue; }
								var cmdGroupName = cmd.getGroupName();
								if (cmdGroupName.substr(0,3) != Command.GRP) {
									cmdGroupName = cmd.getSourceName();
								}			
								if (cmdGroupName == groupName) {
									result.push(this.buffer[i]);
								}
							}
						}
					}
				}
			}		
		} catch(error) {
			Utils.alert("CommandBuffer/getAllCommandsForGroup Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	},
	removeNavigationCommands: function(nivo) {
		var _nivo = (nivo !== undefined)?nivo:null;
		try {
			if (this.isEmpty() === false) {
				var commandDeleted = true;
				while (commandDeleted === true) {
					commandDeleted = false;
					for (var i in this.buffer) {
						if (this.buffer[i]) {
							var command = this.buffer[i];
							if (command.getName() == Command.NAV) {
								if ((_nivo) && (command.getNivo() != _nivo)) { continue; } 
								this.buffer.splice(i,1);
								commandDeleted = true;
								if (_cNc > 0) {	_cNc = (_cNc - 1); }
								break;
							}
						}
					}
				}
			}
			//Reset Counter for Navigation commands.
			if (!_nivo) {
				_cNc = 0;
			}
		} catch(error) {
			Utils.alert("CommandBuffer/removeNavigationCommands Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return this;
		}
	},
	removeNavigationOnTopOrBottom: function(removeOnTop) {
		var _removeOnTop = ((removeOnTop !== undefined) && (removeOnTop !== null))?removeOnTop:true;
		try {
			//Remove some earlier(#oldest) navigation command!
			if (_cNc > NavigationCommand.MAX_REMEMBERED) {
				if (this.isEmpty() === false) {
					var _from = 0;
					var _to = this.buffer.length;
					var _increment = 1;
					if (_removeOnTop === false) {
						_from = (this.buffer.length - 1);
						_to = 0;
						_increment = -1;
					}
					for (var i = _from; ((_removeOnTop === true)?(i < _to):(i >= _to)); i = (i + _increment)) {
						if (this.buffer[i]) {
							var command = this.buffer[i];
							if (command.getName() == Command.NAV) {
								this.buffer.splice(i,1);
								if (_cNc > 0) {	_cNc = (_cNc - 1); }
								break;
							}
						}
					}
				}
			}
		} catch(error) {
			Utils.alert("CommandBuffer/removeNavigationOnTopOrBottom Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return this;
		}
	},
	pop: function() {
		var result = null;
		try {
			result = this.buffer.pop();
		} catch(error) {
			Utils.alert("CommandBuffer/pop Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	},
	getNextId: function() {
		var result = 0;
		try {
			if (this.isEmpty() === false) {
				for (var i in this.buffer) {
					if (this.buffer[i]) {
						var command = this.buffer[i];							
						if (command.getId() <= result) { continue; }
						result = command.getId();
					}
				}
			}
			//NextId
			result = (result + 1);
		} catch(error) {
			Utils.alert("CommandBuffer/getNextId Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	},
	//TODO: Refactor - remove !!! repeating for-loop !!!
	//push: function(id,command) {
	push: function(command) {
		try {
			//CheckPoint - check/drop
			if (this.getLength() > (CommandBuffer.SIZE_LIMIT * (CommandBuffer.CKP_FILL_PERCENT/100))) {
				var checkPointStatus = this.getCheckPointStatus();
				if (checkPointStatus && (checkPointStatus > 0)) {
					var checkPoints = Math.floor(checkPointStatus / CommandBuffer.CKP_SIZE_DIVIDER);
					if (checkPoints > 0) {
						var checkPointDrops = 1;
						//if (checkPoints > 3) {
							checkPointDrops = Math.floor(checkPoints * (CommandBuffer.CKP_DROP_PERCENT/100));
							if (this.isEmpty() === false) {
								while (1) {
									if (checkPointDrops <= 0) { break; }
									for (var i in this.buffer) {
										if (this.buffer[i]) {
											var cmd = this.buffer[i];							
											if (cmd.getName() == Command.CKP) { checkPointDrops = (checkPointDrops - 1); }
											if ((cmd.getName() == Command.CKP) ||
													(cmd.getName() == Command.PST)) {
												this.remove(cmd);													
												break;
											}
										}
									}
								}
							}
							//}
					}
				}
			}
			//Push new command.
			if (command.getId() === null) {
				command.setId(this.getNextId());
			}
			this.buffer.push(command);
		} catch(error) {
			Utils.alert("CommandBuffer/push Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		}
	},
	//TODO: Refactor push/insert / id = (Max + 1) ipv (getLength() + 1) ************************************* !!!
	insert: function(index,command) {
		try {
			//CheckPoint - check/drop
			if (this.getLength() > (CommandBuffer.SIZE_LIMIT * (CommandBuffer.CKP_FILL_PERCENT/100))) {
				var checkPointStatus = this.getCheckPointStatus();
				if (checkPointStatus && (checkPointStatus > 0)) {
					var checkPoints = Math.floor(checkPointStatus / CommandBuffer.CKP_SIZE_DIVIDER);
					if (checkPoints > 0) {
						var checkPointDrops = 1;
						//if (checkPoints > 3) {
							checkPointDrops = Math.floor(checkPoints * (CommandBuffer.CKP_DROP_PERCENT/100));
							if (this.isEmpty() === false) {
								while (1) {
									if (checkPointDrops <= 0) { break; }
									for (var i in this.buffer) {
										if (this.buffer[i]) {
											var cmd = this.buffer[i];							
											if (cmd.getName() == Command.CKP) { checkPointDrops = (checkPointDrops - 1); }
											if ((cmd.getName() == Command.CKP) ||
													(cmd.getName() == Command.PST)) {
												this.remove(cmd);													
												break;
											}
										}
									}
								}
							}
							//}
					}
				}
			}
			//Insert new command.
			if (command.getId() === null) {
				command.setId(this.getNextId());
			}
			this.buffer.splice(index,0,command);
		} catch(error) {
			Utils.alert("CommandBuffer/insert Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		}
	},
	update: function(command) {
		var _command = (command !== undefined)?command:null;	
		////////////////////////////////////////////////////////////
		//ATT: Normal update & special treatment for CPY and EXT. //
		////////////////////////////////////////////////////////////
		try {
			if (_command) {
				var cmd = null;
				if (_command.getId()) {
					cmd = this.getById(_command.getId());
				} else {
					cmd = this.getByNivoPositionRelation(_command);
				}
				//Special updates/appends for CPY, EXT and DEL.              !!!!!! DELETE !!!!!!
				var groupName = null;
				if (cmd) {
					var lastGroupCommand = this.getLastGroupCommand(cmd);
					if (lastGroupCommand) {
						groupName = lastGroupCommand.getGroupName();
					} else {
						groupName = (Command.GRP+"_"+cmd.getId());				
					}
					if (cmd.getName() in Utils.arrayHash([Command.CPY,Command.EXT,Command.DEL])) {  // DELETE !!!
						cmd.setUnDone(!cmd.getUnDone());
						if (cmd.getName() != _command.getName()) {
							cmd.setName(_command.getName());
							cmd.setUnDone(false);
						}
						this.removePasteCommands(cmd);
						if (Utils.group() === true) {
							if (cmd.getSourceName().substr(0,3) != Command.GRP) {
								cmd.setUnDone(false);
							}
							cmd.setSourceName(groupName+"/"+cmd.getId());							
						} else {
							if (cmd.getSourceName().substr(0,3) == Command.GRP) {
								cmd.setUnDone(false);
							}
							cmd.setSourceName(((cmd.getName() == Command.CPY)?Command.CPY:Command.EXT)+"_"+cmd.getId()+"/"+cmd.getId());
						}
						alert("CommandBuffer/update - cmd: "+_kb.getCmd()+" shift: "+_kb.getShift()+" ctrl: "+_kb.getCtrl()+ " alt: "+_kb.getAlt());
						alert("CommandBuffer/update - cmd: "+cmd.print());
					} else {
						//Normal update.
						cmd = _command;
					}
				} else {
					this.push(_command);					
				}
			}
		} catch(error) {
			Utils.alert("CommandBuffer/update Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		}
	},
	getLastDone: function() {
		var result = null;
		try {
			if (this.isEmpty() === false) {
				var buffer = this.getBuffer();
				for (var i = (this.getLength() - 1); i >= 0; --i) {
					var cmd = buffer[i];
					if (cmd.isDone() === true) {
						result = cmd;
						break;
					}
				}
			}
		} catch(error) {
			Utils.alert("CommandBuffer/getLastDone Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	},
	getLastReal: function() {
		var result = null;
		try {
			if (this.isEmpty() === false) {
				var buffer = this.getBuffer();
				for (var i = (this.getLength() - 1); i >= 0; --i) {
					var cmd = buffer[i];
					if ((cmd.getName() == Command.ADD) ||
							(cmd.getName() == Command.CPY) ||
							(cmd.getName() == Command.DEL) ||
							(cmd.getName() == Command.EDT) ||
							(cmd.getName() == Command.EXT)) {
						result = cmd;
						break;
					}
				}
			}
		} catch(error) {
			Utils.alert("CommandBuffer/getLastReal Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	},
	getLastRealDone: function() {
		var result = null;
		try {
			if (this.isEmpty() === false) {
				var buffer = this.getBuffer();
				for (var i = (this.getLength() - 1); i >= 0; --i) {
					var cmd = buffer[i];
					if ((cmd.getName() != Command.ADD) &&
							(cmd.getName() != Command.CPY) &&
							(cmd.getName() != Command.DEL) &&
							(cmd.getName() != Command.EDT) &&
							(cmd.getName() != Command.EXT) &&
							(cmd.getName() != Command.PST)) { continue; }
					//if (cmd.isDone() === true) {
						result = cmd;
						break;
					//}
				}
			}
		} catch(error) {
			Utils.alert("CommandBuffer/getLastRealDone Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	},
	getLastGroupCommand: function(command) {
		var _command = (command !== undefined)?command:null;
		//alert("CommandBuffer/getLastGroupCommand - command: "+((_command)?_command.print():null));
		var result = null;
		try {
			if (this.isEmpty() === false) {
				var buffer = this.getBuffer();
				for (var i = (this.getLength() - 1); i >= 0; i--) {
					var cmd = buffer[i];
					if (cmd.getId() === null) { continue; }
					if (cmd.getName() == Command.CKP) { continue; }
					if (cmd.getName() == Command.NAV) { continue; }
					if (cmd.getName() == Command.PST) { continue; }
					//Skip command => get last groupCommand before this command.
					if (_command) {
						if (cmd.getId() == _command.getId()) { continue; }
					}
					if (cmd.getGroupName().substr(0,3) != Command.GRP) { break; }
					result = cmd;
					break;
				}
			}
			//alert("CommandBuffer/getLastGroupCommand - result: "+result); //.print());
		} catch(error) {
			Utils.alert("CommandBuffer/getLastGroupCommand Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	},
	getNavigationsAndLastRealCommand: function(done) {
		//alert("CommandBuffer/getNavigationsAndLastRealCommand - done: "+done);
		var _done = (done !== undefined)?done:null;
		var result = [];
		try {
			if (this.isEmpty() === false) {
				var lastRealCommand = null;
				var buffer = this.getBuffer();
				for (var i = (this.getLength() - 1); i >= 0; i--) {
					var cmd = buffer[i];
					if (cmd.getName() == Command.NAV) {
						result.unshift(cmd);
						continue;
					}
					if ((cmd.getName() != Command.ADD) &&
							(cmd.getName() != Command.CPY) &&
							(cmd.getName() != Command.DEL) &&
							(cmd.getName() != Command.EDT) &&
							(cmd.getName() != Command.EXT) &&
							(cmd.getName() != Command.PST)) { continue; }
					if (lastRealCommand === null) {
						if (_done !== null) {
							if (cmd.isDone() === _done) {
								lastRealCommand = cmd;
								break;
							}
						}
					}
				}
				if (lastRealCommand) { result.unshift(lastRealCommand); }
			}
			//alert("CommandBuffer/getNavigationsAndLastRealCommand - result: "+result);
		} catch(error) {
			Utils.alert("CommandBuffer/getNavigationsAndLastRealCommand Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	},
	getCheckPointStatus: function() {
		var result = 0;
		try {
			var checkPoints = 0;
			var checkPointSize = 0;
			if (this.isEmpty() === false) {
				var buffer = this.getBuffer();
				for (var i = (this.getLength() - 1); i >= 0; --i) {
					var cmd = buffer[i];
					if (checkPoints === 0) {
						if (cmd.getName() != Command.CKP) {
							checkPointSize = (checkPointSize + 1);
						}
					}
					if (cmd.getName() == Command.CKP) {
						checkPoints = (checkPoints + 1);
					}
				}
			}
			result = ((checkPoints * CommandBuffer.CKP_SIZE_DIVIDER)+checkPointSize);
		} catch(error) {
			Utils.alert("CommandBuffer/getCheckPointStatus Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	},
	/*
	getLastUnDoneIfNoDone: function() {
		var result = null;
		try {
			result = this.getLastDone();
			//Get first UNDONE!
			if (result === null) {
				if (this.isEmpty() === false) {
					var buffer = this.getBuffer();
					for (var i = (this.getLength() - 1); i >= 0; --i) {
						var cmd = buffer[i];
						if (cmd.getName() == Command.PST) { continue; }
						if (cmd.isUnDone() === true) {
							result = cmd;
							break;
						}
					}
				}
			}
		} catch(error) {
			Utils.alert("CommandBuffer/getLastUnDoneIfNoDone Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	},
	*/
	getLastDoneIfNoUnDone: function() {
		//alert("CommandBuffer/getLastDoneIfNoUnDone");
		var result = null;
		try {
			//Get current nivo & position !!!
			var currentNivo = (Position.NIVO_ROOT() + 1);
			var position = new Position(Position.ROW_TOP(),Position.COLUMN_WHAT_FIRST());
			var gridView = _grid.getGridView();
			if (gridView) {
				currentNivo = gridView.getCurrentNivo();
				position = gridView.getPosition();						
			}
			//Calculate current location.
			var currentLocation = ((currentNivo * 1000) + (position.getColumn() * 100) + position.getRow());
			var lastRealDone = null;
			var cmds = this.getNavigationsAndLastRealCommand(false); //UnDone!
			if (cmds) {
				if (cmds.length > 0) {
					for (var i = 0; i < cmds.length; i++) {
						var cmd = cmds[i];
						if (cmd.getName() != Command.NAV) {
							if (cmd.isUnDone() === true) {
								result = cmd;
								break;
							} else {
								lastRealDone = cmd;
								continue;
							}
						}
						//Select navigation (always DONE/UNDONE).
						//Attention, think twice - 1:undo/redo 2:asc/dsc					
						//Select next navigation (navigation with location after currentLocation).
						var p1 = cmd.getPosition();
						var cmdLocation = ((cmd.getNivo() * 1000) + (p1.getColumn() * 100) + p1.getRow());
						/*alert("CommandBuffer/getLastDoneIfNoUnDone - REDO/asc="+this.isAscending()+
						      "\ncurrentLocation: "+currentLocation+
									"\ncmdLocation: "+cmdLocation);*/
						if (this.isAscending() === true) {
							if (cmdLocation <= currentLocation) { continue; }
						} else {
							if (cmdLocation >= currentLocation) { continue; }
						}
						result = cmd;
						break;
					}			
				}
			}
			//Get last DONE!
			if (!result) {
				result = (lastRealDone)?lastRealDone:this.getLastDone();
			}
			//alert("CommandBuffer/getLastDoneIfNoUnDone - result: "+result.print());
		} catch(error) {
			Utils.alert("CommandBuffer/getLastDoneIfNoUnDone Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	},

	/*
	var _from = 0;
	var _to = this.buffer.length;
	var _increment = 1;
	if (!removeOnTop) {
		_from = (this.buffer.length - 1);
		_to = 0;
		_increment = -1;
	}
	for (var i = _from; ((removeOnTop)?(i < _to):(i >= _to)); i = (i + _increment)) {
	*/

	getFirstUnDoneIfNoDone: function() {
		//alert("CommandBuffer/getFirstUnDoneIfNoDone");
		var result = null;
		try {
			//Get current nivo & position !!!
			var currentNivo = (Position.NIVO_ROOT() + 1);
			var position = new Position(Position.ROW_TOP(),Position.COLUMN_WHAT_FIRST());
			var gridView = _grid.getGridView();
			if (gridView) {
				currentNivo = gridView.getCurrentNivo();
				position = gridView.getPosition();						
			}
			//Calculate current location.
			var currentLocation = ((currentNivo * 1000) + (position.getColumn() * 100) + position.getRow());
			var lastRealUnDone = null;
			var cmds = this.getNavigationsAndLastRealCommand(true); //Done!
			if (cmds) {
				if (cmds.length > 0) {
					cmds.reverse();
					for (var i = 0; i < cmds.length; i++) {
						var cmd = cmds[i];
						if (cmd.getName() != Command.NAV) {
							if (cmd.isDone() === true) {
								result = cmd;
								break;
							} else {
								lastRealUnDone = cmd;
								continue;
							}
						}
						//Select navigation (always DONE/UNDONE).
						//Attention, think twice - 1:undo/redo 2:asc/dsc					
						//Select previous navigation (navigation with location before currentLocation).
						var p1 = cmd.getPosition();
						var cmdLocation = ((cmd.getNivo() * 1000) + (p1.getColumn() * 100) + p1.getRow());
						/*alert("CommandBuffer/getFirstUnDoneIfNoDone - UNDO/asc="+this.isAscending()+
						      "\ncurrentLocation: "+currentLocation+
									"\ncmdLocation: "+cmdLocation);*/
						if (this.isAscending() === true) {
							if (cmdLocation >= currentLocation) { continue; }
						} else {
							if (cmdLocation <= currentLocation) { continue; }
						}
						result = cmd;
						break;
					}			
				}
			}
			//Get first UNDONE!
			if (!result) {
				result = (lastRealUnDone)?lastRealUnDone:this.getFirstUnDone();			
			}
			//alert("CommandBuffer/getFirstUnDoneIfNoDone - result: "+result.print());
		} catch(error) {
			Utils.alert("CommandBuffer/getFirstUnDoneIfNoDone Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	},
	getFirstUnDone: function() {
		var result = null;
		try {
	/*  Get first unDone from the beginning, whitouth regarding later DONES !!! 
			if (this.isEmpty() === false) {
				var buffer = this.getBuffer();
				for (var i = 0; i < this.getLength(); ++i) {
					var cmd = buffer[i];
					if (cmd.isUnDone() === true) {
						result = cmd;
						break;
					}
				}
			}*/
	  	//Get first unDone from the beginning, but with no later DONES !!! 
			if (this.isEmpty() === false) {
				var buffer = this.getBuffer();
				for (var i = 0; i < this.getLength(); ++i) {
					var cmd = buffer[i];
					if (result === null) {
						if (cmd.isUnDone() === true) {
							result = cmd;
							continue;
						}
					}
					if (result) {
						if ((cmd.isDone() === true) && (cmd.getName() != Command.NAV)) {
							result = null;
							continue;
						}
					} 
				}
			}
		} catch(error) {
			Utils.alert("CommandBuffer/getFirstUnDone Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	},
	getLastUnDone: function() {
		var result = null;
		try {
			if (this.isEmpty() === false) {
				var buffer = this.getBuffer();
				for (var i = (this.getLength() - 1); i >= 0; --i) {
					var cmd = buffer[i];
					if (cmd.isUnDone() === true) {
						result = cmd;
						break;
					}
				}
			}
		} catch(error) {
			Utils.alert("CommandBuffer/getLastUnDone Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	},
	getLastPastable: function() {
		var result = null;
		try {
			if (this.isEmpty() === false) {
				var buffer = this.getBuffer();
				for (var i = (this.getLength() - 1); i >= 0; --i) {
					var cmd = buffer[i];
					if (cmd.getName() == Command.CKP) { continue; }
					if (cmd.getName() == Command.NAV) { continue; }
					if (cmd.isUnDone() === true) { continue; }
					if ((cmd.getName() != Command.ADD) &&
							(cmd.getName() != Command.DEL) &&
							(cmd.getName() != Command.EDT) &&
							(cmd.getName() != Command.CPY) &&
							(cmd.getName() != Command.EXT)) { continue; }
					result = cmd;
					break;
				}
			}
		} catch(error) {
			Utils.alert("CommandBuffer/getLastPastable Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	},
	getLastPastableGroup: function() {
		var result = [];
		try {
			if (this.isEmpty() === false) {
				var groupCmd = null;
				var buffer = this.getBuffer();
				for (var i = (this.getLength() - 1); i >= 0; --i) {
					var cmd = buffer[i];
					if (cmd.getName() == Command.CKP) { continue; }
					if (cmd.getName() == Command.NAV) { continue; }
					if (cmd.isUnDone() === true) { continue; }
					if (cmd.getName() == Command.PST) { continue; }
				//if (!groupCmd) { groupCmd = Command.clone(cmd); }
					if (groupCmd === null) { groupCmd = cmd.clone(); }
					if (cmd.inSameGroup(groupCmd) === false) { break; }
					if (cmd.isUnDone() === true) {	break; }
					if ((cmd.getName() != Command.ADD) &&
							(cmd.getName() != Command.DEL) &&
							(cmd.getName() != Command.EDT) &&
							(cmd.getName() != Command.CPY) &&
							(cmd.getName() != Command.EXT)) { continue; }
					result.unshift(cmd);
					continue;
				}
			}
		} catch(error) {
			Utils.alert("CommandBuffer/getLastPastableGroup Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	},
	print: function() {
		var result = null;
		try {
			result = "\n_id: "+_id+"\n";
			result += "\nCommandBuffer:\n";
			result += "Number of commands: "+this.getLength()+"\n";
			result += "Done: "+this.getNumberDone()+"\n";
			result += "Undone: "+this.getNumberUnDone()+"\n";
			var addDone = this.getNumberOfCommands(Command.ADD,false);
			var addUnDone = this.getNumberOfCommands(Command.ADD,true);
			var addAll = addDone + addUnDone;
			if (addAll > 0) {
				result += "Number of ADD commands: "+addAll+", done: "+addDone+", undone: "+addUnDone+"\n";
			}
			var delDone = this.getNumberOfCommands(Command.DEL,false);
			var delUnDone = this.getNumberOfCommands(Command.DEL,true);
			var delAll = delDone + delUnDone;
			if (delAll > 0) {
				result += "Number of DEL commands: "+delAll+", done: "+delDone+", undone: "+delUnDone+"\n";
			}
			var edtDone = this.getNumberOfCommands(Command.EDT,false);
			var edtUnDone = this.getNumberOfCommands(Command.EDT,true);
			var edtAll = edtDone + edtUnDone;
			if (edtAll > 0) {
				result += "Number of EDT commands: "+edtAll+", done: "+edtDone+", undone: "+edtUnDone+"\n";
			}
			var cpyDone = this.getNumberOfCommands(Command.CPY,false);
			var cpyUnDone = this.getNumberOfCommands(Command.CPY,true);
			var cpyAll = cpyDone + cpyUnDone;
			if (cpyAll > 0) {
				result += "Number of CPY commands: "+cpyAll+", done: "+cpyDone+", undone: "+cpyUnDone+"\n";
			}
			var extDone = this.getNumberOfCommands(Command.EXT,false);
			var extUnDone = this.getNumberOfCommands(Command.EXT,true);
			var extAll = extDone + extUnDone;
			if (extAll > 0) {
				result += "Number of EXT commands: "+extAll+", done: "+extDone+", undone: "+extUnDone+"\n";
			}
			var pstDone = this.getNumberOfCommands(Command.PST,false);
			var pstUnDone = this.getNumberOfCommands(Command.PST,true);
			var pstAll = pstDone + pstUnDone;
			if (pstAll > 0) {
				result += "Number of PST commands: "+pstAll+", done: "+pstDone+", undone: "+pstUnDone+"\n";
			}
			var navDone = this.getNumberOfCommands(Command.NAV,false);
			var navUnDone = this.getNumberOfCommands(Command.NAV,true);
			var navAll = navDone + navUnDone;
			if (navAll > 0) {
				result += "Number of NAV commands: "+navAll+", done: "+navDone+", undone: "+navUnDone+"\n";
			}
			var rootDone = this.getNumberOfCommands(Command.ROOT,false);
			var rootUnDone = this.getNumberOfCommands(Command.ROOT,true);
			var rootAll = rootDone + rootUnDone;
			if (rootAll > 0) {
				result += "Number of ROOT commands: "+rootAll+", done: "+rootDone+", undone: "+rootUnDone+"\n";
			}
			if (_cf) {
				//Last command.
				var lastCommand = _cf.getLastCommand();
				result += "\nLast command: "+(lastCommand)?lastCommand.print():"null";
				result += "\n";
			}		
			//List of commands.
			result += "\nList of commands:";
			result += "\n----------------------------------------------";
			result += "\nID\t| NAME | STATUS\t| SOURCE\t\t| VALUE";
			result += "\n----------------------------------------------";
			var buffer = this.getBuffer();
			if (buffer) {
				for (var i in buffer) {
					if (buffer[i]) {
						var command = buffer[i];
						var commandName = command.getName();
						if (commandName == Command.CKP) {
							//result += "\n"+command.getId()+"\t| "+commandName+"| -+-+-+-+-+-+-+-+- | size: "+command.getSize();
							result += "\n"+command.getId()+"\t| "+commandName+"| -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-";
							continue;
						}
						if ((commandName != Command.ADD) &&
							  (commandName != Command.CPY) &&
								(commandName != Command.EDT)) {
							commandName += "\t";
						}
					/*if (commandName.length <= 4) {
							commandName += "\t";
						}*/
						var relationValue = "";
						var relation = command.getRelation();
						if (relation) {
						  relationValue = ((relation.getId())?relation.getId():'***')+'/';
							var parentEntity = relation.getParentEntity();
							if (parentEntity) {
								relationValue += parentEntity.getName();
							} else {
								relationValue += '***';
							}
							var childEntity = relation.getChildEntity();
							if (childEntity) {
								var entityValues = null;
								var	commandEntityValues = _oe.getById(command.getSourceName());
								if (commandEntityValues) {
									entityValues = commandEntityValues;
								}
								if (!entityValues) {
								//entityValues = Entity.clone(childEntity);
									entityValues = childEntity.clone();
									entityValues.setTypeObject(childEntity.getTypeObject());
									entityValues.setAttributeList(childEntity.getAttributeList());
								}
								relationValue += ' - ' + entityValues.getName();							
							}
						}
						result += "\n"+command.getId()+"\t| "+commandName+"| "+((command.isDone() === true)?"DONE":"UNDONE")+"\t| "+command.getSourceName()+"\t\t| "+relationValue;
					}
				}
			}
		} catch(error) {
			Utils.alert("CommandBuffer/print Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	}
});
//Statics
CommandBuffer.SEQUENCE_ASC = "ASC";
CommandBuffer.SEQUENCE_DSC = "DSC";
CommandBuffer.SIZE_LIMIT = 25; //500; //20; //30; //50; //500;
CommandBuffer.PASTE_LIMIT = 50;
CommandBuffer.CKP_SIZE_DIVIDER = 1000000;
CommandBuffer.CKP_FIRST_PERCENT = 50;
CommandBuffer.CKP_NEXT_PERCENT = 20; //10;
CommandBuffer.CKP_DROP_PERCENT = 50;
CommandBuffer.CKP_FILL_PERCENT = 90;
CommandBuffer.test = function() {
	var buffer = null;
	try {
		buffer = new CommandBuffer();
	} catch(error) {
		Utils.alert("CommandBuffer/test Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	}
};

//Class: RootCommandBuffer
var RootCommandBuffer = new Class({
	Extends: CommandBuffer,
	initialize: function() {
		try {
			this.parent();
		} catch(error) {
			Utils.alert("RootCommandBuffer/constructor Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		}
	},
	//Functions
	//Abstract
	removeExtGroups: function(command) {
		return undefined;
	}	
});
//Statics
RootCommandBuffer.test = function() {
	var buffer = null;
	try {
		buffer = new RootCommandBuffer();
	} catch(error) {
		Utils.alert("RootCommandBuffer/test Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	}
};

//Class: ReferenceExpression
var ReferenceExpression = new Class({
	Extends: SjamayeeBase,
	initialize: function() {
		try {
			this.parent();
		} catch(error) {
			Utils.alert("ReferenceExpression/constructor Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		}
	},
	//Getters & Setters
	getOperator: function() {
		var result = ">=";
		try {
			if ((this.operator !== undefined) && (this.operator !== null)) {
				result = this.operator;
			}
		} catch(error) {
			Utils.alert("ReferenceExpression/getOperator Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	},
	setOperator: function(operator) {
		if (operator) {
			this.operator = operator;
		}
		return this;
	},
	getNumberOfReferences: function() {
		var result = 0;
		try {
			if ((this.numberOfReferences !== undefined) && (this.numberOfReferences !== null)) {
				result = this.numberOfReferences;
			}
		} catch(error) {
			Utils.alert("ReferenceExpression/getNumberOfReferences Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	},
	setNumberOfReferences: function(numberOfReferences) {
		if (numberOfReferences !== null) {
			this.numberOfReferences = numberOfReferences;
		}
		return this;
	},
	//Functions
	print: function(html,keysOnly) {
		var _html = ((html !== undefined) && (html !== null))?html:false;
		var _keysOnly = ((keysOnly !== undefined) && (keysOnly !== null))?keysOnly:false;	
		var _nl = (_html)?'<br/>':'\n';
		var result = 'ReferenceExpression:'+_nl;
		try {
			result += this.parent();
		} catch(error) {
			Utils.alert("ReferenceExpression/print Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	}
});

//Class: Criteria
var Criteria = new Class({
	Extends: SjamayeeBase,
	initialize: function() {
		try {
			this.parent();
		} catch(error) {
			Utils.alert("Criteria/constructor Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		}
	},
	//Getters & Setters
	getNumberOfRecords: function() {
		var result = 999;
		try {
			if ((this.numberOfRecords !== undefined) && (this.numberOfRecords !== null)) {
				result = this.numberOfRecords;
			}
		} catch(error) {
			Utils.alert("Criteria/getNumberOfRecords Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	},
	setNumberOfRecords: function(numberOfRecords) {
		if (numberOfRecords !== null) {
			this.numberOfRecords = numberOfRecords;
		}
		return this;
	},
	getType: function() {
		var result = '';
		try {
			if ((this.type !== undefined) && (this.type !== null)) {
				result = this.type;
			}
		} catch(error) {
			Utils.alert("Criteria/getType Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	},
	setType: function(type) {
		if (type) {
			this.type = type;
		}
		return this;
	},
	getFilter: function() {
		var result = '';
		try {
			if ((this.filter !== undefined) && (this.filter !== null)) {
				result = this.filter;
			}
		} catch(error) {
			Utils.alert("Criteria/getFilter Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	},
	setFilter: function(filter) {
		if (filter) {
			this.filter = filter;
		}
		return this;
	},
	getReferenceExpression: function() {
		var result = new ReferenceExpression();
		try {
			if ((this.referenceExpression !== undefined) && (this.referenceExpression !== null)) {
				result = this.referenceExpression;
			}
		} catch(error) {
			Utils.alert("Criteria/getReferenceExpression Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	},
	setReferenceExpression: function(referenceExpression) {
		if (referenceExpression) {
			this.referenceExpression = referenceExpression;
		}
		return this;
	},
	getOid: function() {
		var result = '';
		try {
			if ((this.oid !== undefined) && (this.oid !== null)) {
				result = this.oid;
			}
		} catch(error) {
			Utils.alert("Criteria/getOid Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	},
	setOid: function(oid) {
		if (oid !== null) {
			this.oid = oid;
		}
		return this;
	},
	//Functions
	print: function(html,keysOnly) {
		var _html = ((html !== undefined) && (html !== null))?html:false;
		var _keysOnly = ((keysOnly !== undefined) && (keysOnly !== null))?keysOnly:false;
		var _nl = (_html)?'<br/>':'\n';
		var result = 'Criteria:'+_nl;
		try {
			result += this.parent();
		} catch(error) {
			Utils.alert("Criteria/print Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	}	
});

//Class: Filter
var Filter = new Class({
	Extends: SjamayeeBase,
	initialize: function(text) {
		try {
			this.parent();
			this.setText(text);
		} catch(error) {
			Utils.alert("Filter/constructor Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		}
	},
	//Getters&Setters
	getText: function() {
		var result = null;
		if (this.text !== undefined) {
			result = this.text;
		}
	  return result;
	},
	setText: function(text) {
		if (text) {
			this.text = text;
		}
		return this;
	},
	//Functions
	filter: function(name) {
		var _name = (name !== undefined)?name.toLowerCase():null;
		var result = false;
		try {
	  //alert('Filter/filter - filter:/n'+this.print());
	  //alert('Filter/filter - filter: '+this.getText()+' name: '+_name);
			if (_name !== null) {
				var _filter = this.getText();
				if (_filter) {
					_filter = _filter.toLowerCase();
	      //alert('Filter/filter - filter '+_filter);
		      var filters = _filter.split(' ');
		      if (filters.length > 0) {
						result = true;
	        //alert('Filter/filter - filter '+_filter+' length: '+filters.length+' result: '+result);
		        var startsWithFilter = null;
		        var f1 = filters[0];
		        if (f1) {
		          if ((f1.charAt(0) == '<') && (f1.length > 1)) {
		            startsWithFilter = f1.substring(1);
		            filters.splice(0,1);
		          }
		        }         
		        var endsWithFilter = null;
		        if (filters.length > 0) {
		          var index = filters.length - 1;
		          var f2 = filters[index];
		          if (f2) {
		            if ((f2.charAt(f2.length-1) == '>') && (f2.length > 1)) {
		              endsWithFilter = f2.substring(0,(f2.length - 1));
		              filters.splice(index,1);
		            }
		          }  
		        }
	          if (startsWithFilter) {
	            if (_name.indexOf(startsWithFilter) !== 0) {
	              result = false;
	            } 
	          }   
	          if (endsWithFilter) {
	            var lasti = (_name.length - endsWithFilter.length);
	            if (_name.lastIndexOf(endsWithFilter) != lasti) {
	              result = false;
	            } 
	          }
	          for (var i2 = 0; i2 < filters.length; i2++) {
	            var filter = filters[i2];
	          //Utils.alert('Filter/filter - for filter: '+filter+' _name: '+_name);
	          //alert('Filter/filter - for i2: '+i2+' filter: '+filter+' _name: '+_name);
	            if (filter) {
	              if (_name.search(filter) == -1) {
	                result = false;
	                break;
	              }
	            } 
	          }
		      }
		    }			
			}
		} catch(error) {
			Utils.alert("Filter/filter Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	},
	print: function(html,keysOnly) {
		var _html = ((html !== undefined) && (html !== null))?html:false;
		var _keysOnly = ((keysOnly !== undefined) && (keysOnly !== null))?keysOnly:false;
		var _nl = (_html)?'<br/>':'\n';
		var result = 'Filter:'+_nl;
		try {
			result += this.parent();
		} catch(error) {
			Utils.alert("Filter/print Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	}
});

//Class: Queue
var Queue = new Class({
	Extends: SjamayeeBase,
	initialize: function() {
		try {
			this.parent();
			this.clear();
		} catch(error) {
			Utils.alert("Queue/constructor Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		}
	},
	//Getters & Setters
	getMaximumSize: function() {
		var result = Queue.LIMIT_SIZE;
		if ((this.maximumSize !== undefined) && (this.maximumSize !== null)) {
			result = this.maximumSize;
		}
		return result;
	},
	setMaximumSize: function(maximumSize) {
		if (maximumSize !== null) {
			this.maximumSize = maximumSize;
		}
		return this;
	},
	getSize: function() {
	  return this.queue.length;
	},
	//Functions
	clear: function() {
		try {
			this.queue = [];
		} catch(error) {
			Utils.alert("Queue/clear Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return this;
		}
	},
	getAll: function() {
		var result = null;
		try {
			if (this.queue !== undefined) {
				result = this.queue;
			}
		} catch(error) {
			Utils.alert("Queue/getAll Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	},
	/*
	getByIndex: function(index) {
		var result = null;
		try {
			if ((index !== undefined) && (index !== null)) {
				var queue = this.queue;
				if (queue) {
					if (index < queue.length) {
						result = queue[index];
					}
				}
			}
		} catch(error) {
			Utils.alert("Queue/getByIndex Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	},   
	getById: function(id) {
		return this.get(id);
	},
	get: function(key) {
		var result = null;
		try {
			if ((key !== undefined) && (key !== null)) {
				var queue = this.queue;
				if (queue) {
					for (var i = 0; i < queue.length; i++) {
						var objekt = queue[i];
						if (objekt) {
							if (objekt.getKey() == key) {
								result = objekt;
								break;
							}
						}
					}  
				}
			}
		} catch(error) {
			Utils.alert("Queue/get Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	},
	*/
	put: function(objekt) {
		var result = null;
		try {
			if ((objekt !== undefined) && (objekt !== null)) {
				var queue = this.queue;
				if (queue) {
					if (queue.length >= this.getMaximumSize()) {
						queue.shift();
					}
					queue.push(objekt);
				}
				result = objekt;
			} 
		} catch(error) {
			Utils.alert("Queue/put Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	},
	/*
	replace: function(objekt) {
		var result = null;
		try {
			if ((objekt !== undefined) && (objekt !== null)) {
				var queue = this.queue;
				if (queue) {
					for (var i = 0; i < queue.length; i++) {
						var q1 = queue[i];
						if (q1) {
							if (q1.getKey() == objekt.getKey()) {
								result = queue.splice(i,1,objekt);
								break;
							}
						}
					}  
				}
			}
		} catch(error) {
			Utils.alert("Queue/replace Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	},
	remove: function(key) {
		var result = null;
		try {
			if ((key !== undefined) && (key !== null)) {
				var objekt = this.get(key);
				if (objekt) {
					var queue = this.queue;
					if (queue) {
						for (var i = 0; i < queue.length; i++) {
							var q1 = queue[i];
							if (q1) {
								if (q1.getKey() == objekt.getKey()) {
									result = queue.splice(i,1);
									break;
								}
							}
						}  
					}  
				}
			}
		} catch(error) {
			Utils.alert("Queue/remove Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	},
	*/
	print: function(html,keysOnly) {
		var _html = ((html !== undefined) && (html !== null))?html:false;
		var _keysOnly = ((keysOnly !== undefined) && (keysOnly !== null))?keysOnly:false;
		var _nl = (_html)?'<br/>':'\n';
		var result = 'Queue:'+_nl;
		try {
			result += this.parent();
		} catch(error) {
			Utils.alert("Queue/print Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	}
});
//Statics
Queue.LIMIT_SIZE = 300; //30;
//Queue.SORT_ASCENDING  = 'ASC';
//Queue.SORT_DESCENDING = 'DSC';

//Class: UniqueQueue
var UniqueQueue = new Class({
	Extends: Queue,
	initialize: function() {
		try {
			this.parent();
			this.clear();
		} catch(error) {
			Utils.alert("UniqueQueue/constructor Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		}
	},
	//Getters & Setters
	//Functions
	get: function(key) {
		var result = null;
		try {
			if ((key !== undefined) && (key !== null)) {
				var queue = this.queue;
				if (queue) {
					for (var i = 0; i < queue.length; i++) {
						var relation = queue[i];
						if (relation) {
						  var someKey = relation.getSomeKey(); //getVirtualKey();
						  if (someKey === null) {
						    someKey = relation.getPei();
						  }
							if (someKey) {						
								if (someKey == key) {
									result = relation;
									break;
								}
							}
						}
					}  
				}
			}
		} catch(error) {
			Utils.alert("UniqueQueue/get Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	},
	put: function(key,relation) {
		var result = null;
		try {
			if ((key !== undefined) && (key !== null) &&
					(relation !== undefined) && (relation !== null)) {
				var queue = this.queue;
				if (queue) {
					result = this.get(key);
					if (result === null) {
						if (queue.length >= this.getMaximumSize()) {
							queue.shift();
						}
						queue.push(relation);
						result = relation;
					}
				}
			} 
		} catch(error) {
			Utils.alert("UniqueQueue/put Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	},
	containsKey: function(key) {
		var result = false;
		if ((key !== undefined) && (key !== null)) {
			result = (this.get(key) !== null);
		}
		return result;
	},
	print: function(html,keysOnly) {
		var _html = ((html !== undefined) && (html !== null))?html:false;
		var _keysOnly = ((keysOnly !== undefined) && (keysOnly !== null))?keysOnly:false;
		var _nl = (_html)?'<br/>':'\n';
		var result = 'UniqueQueue:'+_nl;
		try {
			result += this.parent();
		} catch(error) {
			Utils.alert("UniqueQueue/print Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	}
});

// +----------------------------------------------------------------+
// | SimpleTextEditor 1.0                                           |
// | Author: Cezary Tomczak [www.gosu.pl]                           |
// | Free for any use as long as all copyright messages are intact. |
// +----------------------------------------------------------------+
//Class: SimpleTextEditor
var SimpleTextEditor = new Class({
	Extends: SjamayeeBase,
	
	initialize: function(id,objectId) {
		try {
			this.parent();
      if (!id || !objectId) {
        alert("SimpleTextEditor.constructor(id, objectId) failed, two arguments are required");
      }
      //var self = this;
      this.id = id;
      this.objectId = objectId;
      this.frame;
      this.viewSource = false;
      this.path = ""; // with slash at the end
      this.cssFile = "";
      this.charset = "iso-8859-1";
      this.editorHtml = "";
      this.frameHtml = "";
      this.textareaValue = "";
      this.browser = {
        "ie": Boolean(document.body.currentStyle),
        "gecko": (navigator.userAgent.toLowerCase().indexOf("gecko") != -1)
      };
		} catch(error) {
			Utils.alert("SimpleTextEditor/constructor Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		}
	},
  init: function() {
    if (document.getElementById && document.createElement && document.designMode && (this.browser.ie || this.browser.gecko)) {
      // EDITOR
      if (!document.getElementById(this.id)) {
        alert("SimpleTextEditor "+this.objectId+".init() failed, element '"+this.id+"' does not exist");
        return;
      }
      this.textareaValue = document.getElementById(this.id).value;
      var ste = document.createElement("div");
      document.getElementById(this.id).parentNode.replaceChild(ste, document.getElementById(this.id));
      ste.id = this.id+"-ste";
      ste.innerHTML = this.editorHtml ? this.editorHtml : this.getEditorHtml();
      // BUTTONS
      var buttons = ste.getElementsByTagName("td");
      for (var i = 0; i < buttons.length; ++i) {
        if (buttons[i].className == "button") {
          buttons[i].id = this.id+'-button-'+i;
          buttons[i].onmouseover = function() { this.className = "button-hover"; }
          buttons[i].onmouseout = function() { this.className = this.className.replace(/button-hover(\s)?/, "button"); }
          buttons[i].onclick = function(id) {
            return function() {
              this.className = "button-hover button-click";
              setTimeout(function(){
                document.getElementById(id).className = document.getElementById(id).className.replace(/(\s)?button-click/, "");
              }, 100);
            }
          }(buttons[i].id);
        }
      }
      // FRAME
      if (this.browser.ie) {
        this.frame = frames[this.id+"-frame"];
      } else if (this.browser.gecko) {
        this.frame = document.getElementById(this.id+"-frame").contentWindow;
      }
      this.frame.document.designMode = "on";
      this.frame.document.open();
      this.frame.document.write(this.frameHtml ? this.frameHtml : this.getFrameHtml());
      this.frame.document.close();
      this.insertHtmlFromTextarea();
    }
  },
  lockUrls: function(s) {
    if (self.browser.gecko) { return s; }
    return s.replace(/href=["']([^"']*)["']/g, 'href="simpletexteditor://simpletexteditor/$1"');
  },
  unlockUrls: function(s) {
    if (self.browser.gecko) { return s; }
    return s.replace(/href=["']simpletexteditor:\/\/simpletexteditor\/([^"']*)["']/g, 'href="$1"');
  },
  insertHtmlFromTextarea: function() {
    try {
      self.frame.document.body.innerHTML = lockUrls(self.textareaValue);
    } catch (error) {
      setTimeout(this.insertHtmlFromTextarea, 10);
    }
  },
  getEditorHtml: function() {
    var sja_path = "https://na6.salesforce.com/resource/1285777333000/sja__";
    var html = "";
    html += '<input type="hidden" id="'+this.id+'" name="'+this.id+'" value="">';
    html += '<table class="ste" cellspacing="0" cellpadding="0" width="100%" height="100%">';
    html += '<tr><td class="bar"><table id="'+this.id+'-buttons" cellspacing="0" cellpadding="0"><tr>';
    html += '<td><select onchange="'+this.objectId+'.execCommand(\'formatblock\', this.value);this.selectedIndex=0;"><option value=""></option><option value="<h1>">Heading 1</option><option value="<h2>">Heading 2</option><option value="<h3>">Heading 3</option><option value="<p>">Paragraph</option><option value="<pre>">Preformatted</option></select></td>';
    html += '<td><div class="separator"></div></td>';
    html += '<td class="button"><img src="'+sja_path+'ste_bold_gif" width="20" height="20" alt="Bold" title="Bold" onclick="'+this.objectId+'.execCommand(\'bold\')"></td>';
    html += '<td class="button"><img src="'+sja_path+'ste_italic_gif" width="20" height="20" alt="Italic" title="Italic" onclick="'+this.objectId+'.execCommand(\'italic\')"></td>';
    html += '<td class="button"><img src="'+sja_path+'ste_underline_gif" width="20" height="20" alt="Underline" title="Underline" onclick="'+this.objectId+'.execCommand(\'underline\')"></td>';
    html += '<td><div class="separator"></div></td>';
    html += '<td class="button"><img src="'+sja_path+'ste_left_gif" width="20" height="20" alt="Align Left" title="Align Left" onclick="'+this.objectId+'.execCommand(\'justifyleft\')"></td>';
    html += '<td class="button"><img src="'+sja_path+'ste_center_gif" width="20" height="20" alt="Center" title="Center" onclick="'+this.objectId+'.execCommand(\'justifycenter\')"></td>';
    html += '<td class="button"><img src="'+sja_path+'ste_right_gif" width="20" height="20" alt="Align Right" title="Align Right" onclick="'+this.objectId+'.execCommand(\'justifyright\')"></td>';
    html += '<td><div class="separator"></div></td>';
    html += '<td class="button"><img src="'+sja_path+'ste_ol_gif" width="20" height="20" alt="Ordered List" title="Ordered List" onclick="'+this.objectId+'.execCommand(\'insertorderedlist\')"></td>';
    html += '<td class="button"><img src="'+sja_path+'ste_ul_gif" width="20" height="20" alt="Unordered List" title="Unordered List" onclick="'+this.objectId+'.execCommand(\'insertunorderedlist\')"></td>';
    html += '<td><div class="separator"></div></td>';
    html += '<td class="button"><img src="'+sja_path+'ste_outdent_gif" width="20" height="20" alt="Outdent" title="Outdent" onclick="'+this.objectId+'.execCommand(\'outdent\')"></td>';
    html += '<td class="button"><img src="'+sja_path+'ste_indent_gif" width="20" height="20" alt="Indent" title="Indent" onclick="'+this.objectId+'.execCommand(\'indent\')"></td>';
    html += '<td><div class="separator"></div></td>';
    html += '<td class="button"><img src="'+sja_path+'ste_link_gif" width="20" height="20" alt="Insert Link" title="Insert Link" onclick="'+this.objectId+'.execCommand(\'createlink\')"></td>';
    html += '<td class="button"><img src="'+sja_path+'ste_image_gif" width="20" height="20" alt="Insert Image" title="Insert Image" onclick="'+this.objectId+'.execCommand(\'insertimage\')"></td>';
    html += '<td><div class="separator"></div></td>';
    html += '<td class="button"><img src="'+sja_path+'ste_help_gif" width="20" height="20" alt="Help" title="Help" onclick="'+this.objectId+'.openWindow(\''+this.path+'help.html\', \'300\', \'300\')"></td>';
    html += '</tr></table></td></tr>';
    html += '<tr><td class="frame"><iframe id="'+this.id+'-frame" frameborder="0"></iframe></td></tr>';
    //html += '<tr><td class="source"><input id="'+this.id+'-viewSource" type="checkbox" onclick="'+this.objectId+'.toggleSource()"> View Source</td></tr>';
    html += '</table>';
    return html;
  },
/*
  "https://na6.salesforce.com/resource/1285777333000/sja__"+iconName;
  getEditorHtml: function() {
    var html = "";
    html += '<input type="hidden" id="'+this.id+'" name="'+this.id+'" value="">';
    html += '<table class="ste" cellspacing="0" cellpadding="0" width="100%" height="100%">';
    html += '<tr><td class="bar"><table id="'+this.id+'-buttons" cellspacing="0" cellpadding="0"><tr>';
    html += '<td><select onchange="'+this.objectId+'.execCommand(\'formatblock\', this.value);this.selectedIndex=0;"><option value=""></option><option value="<h1>">Heading 1</option><option value="<h2>">Heading 2</option><option value="<h3>">Heading 3</option><option value="<p>">Paragraph</option><option value="<pre>">Preformatted</option></select></td>';
    html += '<td><div class="separator"></div></td>';
    html += '<td class="button"><img src="'+this.path+'ste_bold.gif" width="20" height="20" alt="Bold" title="Bold" onclick="'+this.objectId+'.execCommand(\'bold\')"></td>';
    html += '<td class="button"><img src="'+this.path+'ste_italic.gif" width="20" height="20" alt="Italic" title="Italic" onclick="'+this.objectId+'.execCommand(\'italic\')"></td>';
    html += '<td class="button"><img src="'+this.path+'ste_underline.gif" width="20" height="20" alt="Underline" title="Underline" onclick="'+this.objectId+'.execCommand(\'underline\')"></td>';
    html += '<td><div class="separator"></div></td>';
    html += '<td class="button"><img src="'+this.path+'ste_left.gif" width="20" height="20" alt="Align Left" title="Align Left" onclick="'+this.objectId+'.execCommand(\'justifyleft\')"></td>';
    html += '<td class="button"><img src="'+this.path+'ste_center.gif" width="20" height="20" alt="Center" title="Center" onclick="'+this.objectId+'.execCommand(\'justifycenter\')"></td>';
    html += '<td class="button"><img src="'+this.path+'ste_right.gif" width="20" height="20" alt="Align Right" title="Align Right" onclick="'+this.objectId+'.execCommand(\'justifyright\')"></td>';
    html += '<td><div class="separator"></div></td>';
    html += '<td class="button"><img src="'+this.path+'ste_ol.gif" width="20" height="20" alt="Ordered List" title="Ordered List" onclick="'+this.objectId+'.execCommand(\'insertorderedlist\')"></td>';
    html += '<td class="button"><img src="'+this.path+'ste_ul.gif" width="20" height="20" alt="Unordered List" title="Unordered List" onclick="'+this.objectId+'.execCommand(\'insertunorderedlist\')"></td>';
    html += '<td><div class="separator"></div></td>';
    html += '<td class="button"><img src="'+this.path+'ste_outdent.gif" width="20" height="20" alt="Outdent" title="Outdent" onclick="'+this.objectId+'.execCommand(\'outdent\')"></td>';
    html += '<td class="button"><img src="'+this.path+'ste_indent.gif" width="20" height="20" alt="Indent" title="Indent" onclick="'+this.objectId+'.execCommand(\'indent\')"></td>';
    html += '<td><div class="separator"></div></td>';
    html += '<td class="button"><img src="'+this.path+'ste_link.gif" width="20" height="20" alt="Insert Link" title="Insert Link" onclick="'+this.objectId+'.execCommand(\'createlink\')"></td>';
    html += '<td class="button"><img src="'+this.path+'ste_image.gif" width="20" height="20" alt="Insert Image" title="Insert Image" onclick="'+this.objectId+'.execCommand(\'insertimage\')"></td>';
    html += '<td><div class="separator"></div></td>';
    html += '<td class="button"><img src="'+this.path+'ste_help.gif" width="20" height="20" alt="Help" title="Help" onclick="'+this.objectId+'.openWindow(\''+this.path+'help.html\', \'300\', \'300\')"></td>';
    html += '</tr></table></td></tr>';
    html += '<tr><td class="frame"><iframe id="'+this.id+'-frame" frameborder="0"></iframe></td></tr>';
    //html += '<tr><td class="source"><input id="'+this.id+'-viewSource" type="checkbox" onclick="'+this.objectId+'.toggleSource()"> View Source</td></tr>';
    html += '</table>';
    return html;
  },
*/
  getFrameHtml: function() {
    var html = "";
    html += '<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">';
    html += '<html><head>';
    html += '<meta http-equiv="Content-Type" content="text/html; charset='+this.charset+'">';
    html += '<title>SimpleTextEditor frame</title>';
    html += '<style type="text/css">pre { background-color: #eeeeee; padding: 0.75em 1.5em; border: 1px solid #dddddd; }</style>';
    if (this.cssFile) {
      html += '<link rel="stylesheet" type="text/css" href="'+this.cssFile+'">';
    }
    html += '<style type="text/css">html,body { cursor: text; } body { margin: 0.5em; padding: 0; }</style>';
    html += '</head><body></body></html>';
    return html;
  },
  openWindow: function(url, width, height) {
    var x = (screen.width/2-width/2);
    var y = (screen.height/2-height/2);
    window.open(url, "", "scrollbars=yes,width="+width+",height="+height+",screenX="+(x)+",screenY="+y+",left="+x+",top="+y);
  },
  toggleSource: function() {
    var html, text;
    if (this.browser.ie) {
      if (!this.viewSource) {
        html = this.frame.document.body.innerHTML;
        this.frame.document.body.innerText = unlockUrls(html);
        document.getElementById(this.id+"-buttons").style.visibility = "hidden";
        this.viewSource = true;
      } else {
        text = this.frame.document.body.innerText;
        this.frame.document.body.innerHTML = lockUrls(text);
        document.getElementById(this.id+"-buttons").style.visibility = "visible";
        this.viewSource = false;
      }
    } else if (this.browser.gecko) {
      if (!this.viewSource) {
        html = document.createTextNode(this.frame.document.body.innerHTML);
        this.frame.document.body.innerHTML = "";
        this.frame.document.body.appendChild(html);
        document.getElementById(this.id+"-buttons").style.visibility = "hidden";
        this.viewSource = true;
      } else {
        html = this.frame.document.body.ownerDocument.createRange();
        html.selectNodeContents(this.frame.document.body);
        this.frame.document.body.innerHTML = html.toString();
        document.getElementById(this.id+"-buttons").style.visibility = "visible";
        this.viewSource = false;
      }
    }
    document.getElementById(this.id+"-viewSource").checked = this.viewSource ? "checked" : "";
    document.getElementById(this.id+"-viewSource").blur();
  },
  execCommand: function(cmd, value) {
    if (cmd == "createlink" && !value) {
      var url = prompt("Enter URL:", "");
      if (url) {
        this.frame.focus();
        this.frame.document.execCommand("unlink", false, null);
        if (this.browser.ie) {
          this.frame.document.execCommand(cmd, false, "simpletexteditor://simpletexteditor/"+url);
        } else if (this.browser.gecko) {
          this.frame.document.execCommand(cmd, false, url);
        }
        this.frame.focus();
      }
    } else if (cmd == "insertimage" && !value) {
      var imageUrl = prompt("Enter Image URL:", "");
      if (imageUrl) {
        this.frame.focus();
        this.frame.document.execCommand(cmd, false, imageUrl);
        this.frame.focus();
      }
    } else {
      this.frame.focus();
      this.frame.document.execCommand(cmd, false, value);
      this.frame.focus();
    }
  },
  isOn: function() {
    return Boolean(this.frame);
  },
  getContent: function() {
    try {
      return unlockUrls(this.frame.document.body.innerHTML);
    } catch(error) {
      alert("SimpleTextEditor "+this.objectId+".getContent() failed");
    }
  },
  submit: function() {
    if (this.isOn()) {
      if (this.viewSource) {
        this.toggleSource();
      }
      document.getElementById(this.id).value = this.getContent();
    }
  }
});

/*
////////////////////
// INITIALISATION //
////////////////////
_logger    = new Logger();
_aq        = new AsyncQueue();
_gridFocus = SjamayeeForm.RIGHT;
_grid      = new Grid();
_dataGrid  = new DataGrid();
_modelGrid = new ModelGrid();
_tc        = _grid.getTypeCache();
_mec       = _grid.getModelEntityCache();
_mrc       = _grid.getModelRelationCache();
_ec        = _grid.getEntityCache();
_rc        = _grid.getRelationCache();
_sc        = _grid.getSettingCache();
_oe        = new ListCache();
_kb        = _grid.getKeyboard();
//_oc      = new ObjectCache();
*/