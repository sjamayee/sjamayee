//Static
var Utils = function() {
	this.initialize = function() {
		return undefined;
	};
};
Utils = new Class(new Utils());
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
	if (Utils.DEBUG_MODE) {
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
	}
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
	Utils.alert("Utils/getBySequence - sequence: "+_sequence);
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
	Utils.alert("Utils/eval - object: "+_o1+" uneval: "+_uneval); 
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
	Utils.alert("Utils/uneval - object: "+_o1); 
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
		Utils.alert("keydown code: "+keynum);
		if (keynum == SKeyboard.SPACE) { //ENTER) {
			//Utils.alert("keydown code: "+keynum+" grid: "+_grid);
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
