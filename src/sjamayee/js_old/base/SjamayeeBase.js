//TODO: from MOO !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
var SjamayeeBase = function() {
	this.initialize = function() {
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
		/*SjamayeeBase.COUNT++;
			//this.setSid(SjamayeeBase.COUNT);
			//Utils.alert("SjamayeeBase - count: "+SjamayeeBase.COUNT);
			if (type == "Grid") {
				Utils.alert("SjamayeeBase/constructor - type: "+type+"\ncount = "+SjamayeeBase.COUNT);
			}*/
		} catch(error) {
			Utils.alert("SjamayeeBase/constructor Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		}
	};
	//Getters & Setters
	this.getSid = function() {
		return this.sid;
	};
	this.setSid = function(sid) {
		if (sid) {
			this.sid = sid;
			if (sid > SjamayeeBase.HIGHEST_SID) {
				SjamayeeBase.HIGHEST_SID = sid;
			}
		}
		return this;
	};
	//Functions
	//Abstract
	this.clone = function() {
		Utils.alert("SjamayeeBase/clone - abstract.");
		return undefined;
	};
	this.print = function(html,keysOnly) {
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
	};
};
SjamayeeBase = new Class(new SjamayeeBase());
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
this.overload = function(name,constructors,method) {
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
    this.prototype[name] = function() {
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
